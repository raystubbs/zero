(ns zero.impl.components
  (:require
    [clojure.set :as set]
    [zero.impl.base :as base]
    [zero.impl.markup :refer [preproc-vnode clj->css-property kw->el-name]]
    [zero.impl.injection :refer [apply-injections]]
    [zero.config :as config]
    [clojure.string :as str]
    [goog.object :as gobj]
    [goog :refer [DEBUG]]))

;; generic unique id seq
(defonce ^:private uid-seq (atom (js/BigInt 0)))

(defn- gen-uid []
  (swap! uid-seq + (js/BigInt 1)))

(defn- css [s]
  (doto (js/CSSStyleSheet.) (.replaceSync s)))

(defonce ^:private PROPS-SYM (js/Symbol "zProps"))
(defonce ^:private LISTENER-ABORT-CONTROLLERS-SYM (js/Symbol "zListenerAbortControllers"))
(defonce ^:private MARK-SYM (js/Symbol "zMark"))
(defonce ^:private HTML-NS "http://www.w3.org/1999/xhtml")
(defonce ^:private SVG-NS "http://www.w3.org/2000/svg")
(defonce ^:private PRIVATE-SYM (js/Symbol "zPrivate"))
(defonce ^:private HOST-CSS-SYM (js/Symbol "zHostCss"))
(def ^:private DEFAULT-CSS (css ":host { display: contents; }"))

(defn- default-ns [tag]
  (case tag
    :svg SVG-NS
    nil))

(defn- patch-listeners [^js/Node dom diff]
  (doseq [[type [old-listener new-listener]] diff]
    (let [type-str (name type)]
      (when old-listener
        (let [abort-controllers (gobj/get dom LISTENER-ABORT-CONTROLLERS-SYM)
              abort-controller (get abort-controllers [type old-listener])]
          (.abort abort-controller)
          (gobj/set dom LISTENER-ABORT-CONTROLLERS-SYM (dissoc abort-controllers old-listener))))
      (when new-listener
        (let [abort-controller (js/AbortController.)
              abort-controllers (assoc (gobj/get dom LISTENER-ABORT-CONTROLLERS-SYM) [type new-listener] abort-controller)]
          (gobj/set dom LISTENER-ABORT-CONTROLLERS-SYM abort-controllers)
          (.addEventListener dom type-str new-listener #js{:signal (.-signal abort-controller)}))))))

(defonce !class->fields-index (atom {}))

(defn- prop-writable? [^js obj prop]
  (if (nil? obj)
    false
    (if-let [prop-def (js/Object.getOwnPropertyDescriptor obj prop)]
      (or (.-writable prop-def) (some? (.-set prop-def)))
      (prop-writable? (js/Object.getPrototypeOf obj) prop))))

(defn- class->fields-index [^js class]
  (let [parent-class (js/Object.getPrototypeOf class)
        proto (.-prototype class)]
    (when proto
      (or
        (get @!class->fields-index class)
        (let [index (->> proto
                         js/Object.getOwnPropertyNames
                         (filter #(prop-writable? proto %))
                         (mapcat
                           (fn [prop-name]
                             [[(keyword prop-name) prop-name]
                              [(keyword (base/snake-case prop-name)) prop-name]
                              [(keyword (base/cammel-case prop-name)) prop-name]]))
                         (into {})
                         (merge (some-> parent-class class->fields-index)))]
          (swap! !class->fields-index assoc class index)
          index)))))

(defonce ^:private !css-links (atom #{}))
(defonce ^:private !css-stylesheet-objects (atom {}))
(defonce ^:private !css-href-overrides (atom {}))

(defn- load-stylesheet [stylesheet-object url]
  (gobj/set stylesheet-object PRIVATE-SYM {:href (.toString url)})
  (-> (js/fetch url)
    (.then #(.text %))
    (.then (fn [css-text]
             (let [{:keys [href]} (gobj/get stylesheet-object PRIVATE-SYM)]
               (when (= href (.toString url))
                 (.replace stylesheet-object css-text)))))))

(defn- ->stylesheet-object [x]
  (cond
    (instance? js/CSSStyleSheet x)
    x

    (or (string? x) (instance? js/URL x))
    (let [absolute-url (js/URL. x js/location.href)
          absolute-url-str (.toString absolute-url)]
      (or
        (get @!css-stylesheet-objects absolute-url-str)

        (let [actual-url-str (if (= js/location.origin (.-origin absolute-url))
                               (get @!css-href-overrides (.-pathname absolute-url) absolute-url-str)
                               absolute-url-str)
              new-css-obj (js/CSSStyleSheet.)]
          (load-stylesheet new-css-obj actual-url-str)
          (swap! !css-stylesheet-objects assoc absolute-url-str new-css-obj)
          new-css-obj)))

    :else
    (throw (ex-info "Can't convert given object to CSSStyleSheet" {:given x}))))

(defn- diff-shallow [map-a map-b]
  (reduce
    (fn [diff key]
      (let [val-a (get map-a key)
            val-b (get map-b key)]
        (if (= val-a val-b)
          diff
          (assoc diff key [val-a val-b]))))
    {} (set (concat (keys map-a) (keys map-b)))))

(defn diff-props [old-props new-props]
  (let [all-keys (merge old-props new-props)]
    (as-> all-keys $
      (dissoc $ :z/style :z/on)
      (keys $)
      (reduce
        (fn [diff key]
          (let [new-val (get new-props key)
                old-val (get old-props key)]
            (if (= new-val old-val)
              diff
              (assoc diff key [old-val new-val]))))
        {} $)
      (reduce
        (fn [diff key]
          (if-not (contains? all-keys key)
            diff
            (let [inner-diff (diff-shallow (get old-props key) (get new-props key))]
              (if (empty? inner-diff)
                diff
                (assoc diff key inner-diff)))))
        $ [:z/style :z/on :z/aria]))))

(defn- patch-root-props [^js/ShadowRoot dom ^js/ElementInternals _internals props]
  (let [old-props (gobj/get dom PROPS-SYM)
        diff (diff-props old-props props)
        ^js host-css (or (gobj/get dom HOST-CSS-SYM)
                       (let [x (js/CSSStyleSheet.)]
                         (.replaceSync x ":host {}")
                         (gobj/set dom HOST-CSS-SYM x)
                         x))]
    (when-not (empty? diff)
      (when-let [style-diff (diff :z/style)]
        (let [style-obj (-> host-css .-cssRules (.item 0) .-style)]
          (doseq [[k [_ new-val]] style-diff]
            (if-not new-val
              (.removeProperty style-obj (name k))
              (.setProperty style-obj (name k) (clj->css-property new-val))))))
      (when-let [[_ css-prop] (get diff :z/css)]
        (set! (.-adoptedStyleSheets dom) (->> (conj css-prop host-css) (mapv ->stylesheet-object) to-array)))
      (when-let [listeners-diff (diff :z/on)]
        (patch-listeners dom listeners-diff)))

      ;; TODO: element internals (i.e aria, etc.)
      
    (gobj/set dom PROPS-SYM props)))

(defn- patch-props [^js/Node dom !instance-state props]
  (let [diff (diff-props (or (gobj/get dom PROPS-SYM) {}) props)]
    (when-not (empty? diff)
      (when-some [listeners-diff (diff :z/on)]
        (patch-listeners dom listeners-diff))
      (let [fields-index (-> dom .-constructor class->fields-index)
            set-prop (fn [dom prop-key prop-value]
                       (let [adjusted-value (if (and DEBUG (= (.-nodeName dom) "LINK") (= prop-key :href))
                                              (get @!css-href-overrides prop-value prop-value)
                                              prop-value)]
                         (if-let [field-name (get fields-index prop-key)]
                           (gobj/set dom field-name adjusted-value)
                           (let [attr-name (name prop-key)
                                 component-name (or ^Keyword (.-componentName dom) (-> dom .-nodeName str/lower-case keyword))
                                 attr-value (when (some? adjusted-value) (config/write-attribute component-name attr-name adjusted-value))]
                             (if (nil? attr-value)
                               (.removeAttribute dom attr-name)
                               (.setAttribute dom (name prop-key) attr-value))))))
            normal-props-diff (remove (comp namespace key) diff)]
        (doseq [[k [old-val new-val]] normal-props-diff]
          ;; when a binding expires
          (when (satisfies? IWatchable old-val)
            (let [binders (disj (get-in @!instance-state [:binds old-val :binders]) [dom k])]
              (cond
                (empty? binders)
                (do
                  (remove-watch old-val (get-in @!instance-state [:binds old-val :uid]))
                  (swap! !instance-state update :binds dissoc old-val))
                
                :else
                (swap! !instance-state assoc-in [:binds old-val :binders] binders))))
          
          ;; now set the actual prop, setting up a new
          ;; binding if necessary
          (cond
            (satisfies? IWatchable new-val)
            (if-let [existing (get-in @!instance-state [:binds new-val])]
              (do
                (swap! !instance-state update-in [:binds new-val :binders] conj [dom k])
                (set-prop dom k (:current existing)))
              (let [watch-uid (gen-uid)]
                (add-watch
                  new-val watch-uid
                  (fn [_ _ _ x]
                    (swap! !instance-state assoc-in [:binds new-val :current] x)
                    (doseq [[binder-dom binder-prop] (get-in @!instance-state [:binds new-val :binders])]
                      (set-prop binder-dom binder-prop x))))
                ;; deref must be done _after_ add-watch to ensure that, if `new-val` is
                ;; a binding, the underlying data stream has been booted up
                (let [current (when (satisfies? IDeref new-val) @new-val)]
                  (swap! !instance-state assoc-in [:binds new-val]
                    {:uid watch-uid :current current :binders #{[dom k]}})
                  (set-prop dom k current))))

            :else
            (set-prop dom k new-val)))
        
        ;; patch styles
        (when-let [style-diff (diff :z/style)]
          (let [style-obj (.-style dom)]
            (doseq [[k [_ new-val]] style-diff]
              (if-not new-val
                (.removeProperty style-obj (name k))
                (.setProperty style-obj (name k) (clj->css-property new-val))))))
        
        ;; patch classes
        (when-let [[_ class] (diff :z/class)]
          ;; setting className is faster than .setAttribute, but there
          ;; doesn't seem to be a way to remove the attribute this way,
          ;; so use .removeAttribute to remove it
          (cond
            (nil? class)
            (.removeAttribute dom "class")

            (coll? class)
            (set! (.-className dom) (str/join " " class))

            :else
            (set! (.-className dom) (str class))))
        (gobj/set dom PROPS-SYM props)))))

(defn- prepare-dom-to-be-detached [^js/Node dom !instance-state]
  ;; replace all bindings with their current value
  (gobj/set dom PROPS-SYM
    (persistent!
      (reduce-kv
        (fn [new-props k v]
          (if (or (not (satisfies? IWatchable v)) (some? (namespace k)))
            new-props
            (let [current (get-in @!instance-state [:binds v :current])
                  binders (disj (get-in @!instance-state [:binds v :binders]) [dom k])]
              (cond
                (empty? binders)
                (do
                  (remove-watch v (get-in @!instance-state [:binds v :uid]))
                  (swap! !instance-state update :binds dissoc v))

                :else
                (swap! !instance-state assoc-in [:binds v :binders] binders))
              (assoc! new-props k current))))
        (transient (or (gobj/get dom PROPS-SYM) {}))
        (gobj/get dom PROPS-SYM))))
  (doseq [child-dom (-> dom .-childNodes array-seq)]
    (prepare-dom-to-be-detached child-dom !instance-state))
  (when (and DEBUG (= (.-nodeName dom) "LINK"))
    (swap! !css-links disj dom)))

(defn insert-child! [^js/Node dom ^js/Node reference ^js/Node child]
  (cond
    (nil? reference)
    (if (fn? (.-prepend dom))
      (.prepend dom child)
      (if-let [first-child (.-firstChild dom)]
        (.insertBefore dom child first-child)
        (.appendChild dom child)))

    (fn? (.-after reference))
    (.after reference child)

    :else
    (if-let [next-child (.-nextSibling reference)]
      (.insertBefore dom child next-child)
      (.appendChild dom child))))

(defn- apply-layout-changes [^js/Node dom start-index stop-index child-dom->source-index target-layout]
  (loop [boundary-index (dec start-index)
         next-target-index start-index]
    (if (<= stop-index next-target-index)
      nil
      (let [next-child-dom (get target-layout next-target-index)
            next-source-index (get child-dom->source-index next-child-dom)
            boundary-dom (get target-layout boundary-index)]
        (cond
          ;; new child, just insert it in the right place
          (nil? next-source-index)
          (do
            (insert-child! dom boundary-dom next-child-dom)
            (recur next-target-index (inc next-target-index)))

          ;; It's a pivot node if it's only been shifted by 1 in either direction,
          ;; and its new index doesn't cross (is greater than) boundary-index.  Pivots
          ;; are considered 'stable', we don't move them, instead everything else moves
          ;; around them.
          (and (< boundary-index next-target-index) (<= (dec next-source-index) next-target-index (inc next-source-index)))
          (recur next-target-index (inc next-target-index))

          :else
          (do
            (insert-child! dom boundary-dom next-child-dom)
            (recur boundary-index (inc next-target-index))))))))

(defn- patch-children [^js/Node dom !instance-state children]
  (let [source-layout (-> dom .-childNodes array-seq vec)
        !child-doms (atom
                     (group-by
                      (fn [child-dom]
                        (if (-> child-dom .-nodeType (= js/Node.TEXT_NODE))
                          :text
                          (let [props (gobj/get child-dom PROPS-SYM)]
                            [(:z/sel props) (:z/key props)])))
                      source-layout))

        take-el-dom (fn [tag props]
                      (let [matcher [(:z/sel props) (:z/key props)]
                            match (->> matcher (get @!child-doms) first)]
                        (if match
                          (do
                            (swap! !child-doms update matcher subvec 1)
                            match) 
                          (js/document.createElementNS
                            (or
                              (:xmlns props)
                              (default-ns tag)
                              (.-namespaceURI dom)
                              HTML-NS)
                            (kw->el-name tag)))))
        
        take-text-dom (fn []
                        (if-let [existing (first (get @!child-doms :text))]
                          (do
                            (swap! !child-doms update :text subvec 1)
                            existing)
                          (js/document.createTextNode "")))

        target-layout (mapv
                        (fn process-children [vnode]
                          (cond
                            (vector? vnode)
                            (let [[tag props body] (preproc-vnode vnode)
                                  child-dom (take-el-dom tag props)
                                  old-props (gobj/get child-dom PROPS-SYM)]
                              (when (or config/disable-tags? (nil? (:z/tag props)) (not= (:z/tag props) (:z/tag old-props)))
                                (patch-props child-dom !instance-state props)
                                (when-not (:z/opaque? props)
                                  (patch-children child-dom !instance-state body)))
                              child-dom)

                            :else
                            (let [child-dom (take-text-dom)]
                              (set! (.-nodeValue child-dom) (str vnode))
                              child-dom)))
                        children)

        focused-doms (:doms-on-focus-path @!instance-state)
        index-of-focused-child-in-target (when (seq focused-doms) (base/index-of (partial contains? focused-doms) target-layout))
        child-dom->source-index (set/map-invert source-layout)
        preserved-child-doms (set target-layout)]

    ;; keep track of <link> elements, so we can make them react to hot reloads
    (when DEBUG
      (doseq [child-dom target-layout
              :when (and
                      (= (.-nodeName child-dom) "LINK")
                      (contains? #{"stylesheet" "preload"} (.-rel child-dom)))]
        (swap! !css-links conj child-dom)))

    ;; apply layout changes
    (if (nil? index-of-focused-child-in-target)
      (apply-layout-changes dom 0 (count target-layout) child-dom->source-index target-layout)
      (do
        (apply-layout-changes dom 0 index-of-focused-child-in-target child-dom->source-index target-layout)
        (apply-layout-changes dom (inc index-of-focused-child-in-target) (count target-layout) child-dom->source-index target-layout)))

    ;; remove expired children
    (doseq [child-dom source-layout :when (not (contains? preserved-child-doms child-dom))]
      (.removeChild dom child-dom)
      (prepare-dom-to-be-detached child-dom !instance-state))))

(defn- patch-root [^js/ShadowRoot dom ^js/ElementInternals internals !instance-state vnode]
  (let [!static-state (-> dom .-host .-constructor (gobj/get PRIVATE-SYM))
        default-css (:default-css @!static-state)
        old-props (gobj/get dom PROPS-SYM)
        [props body] (cond
                       (and (vector? vnode) (= (first vnode) :root>))
                       (rest (preproc-vnode vnode))

                       (seq? vnode)
                       [{} vnode]

                       :else
                       [{} (list vnode)])]
    (when (or config/disable-tags? (nil? (:z/tag props)) (not= (:z/tag props) (:z/tag old-props)))
      (patch-root-props dom internals
        (update props :z/css #(cond (coll? %) (into default-css %) (some? %) (conj default-css %) :else default-css)))
      (when-not (:z/opaque? props)
        (patch-children dom !instance-state body)))))

(defn- normalize-prop-spec [prop-name prop-spec]
  (case prop-spec
    :attr {:attr (-> prop-name name base/snake-case)
           :prop prop-name}
    :field {:field (-> prop-name name base/cammel-case)
            :prop prop-name}
    :default {:field (-> prop-name name base/cammel-case)
              :attr (-> prop-name name base/snake-case)
              :prop prop-name}
    (cond
      (satisfies? IWatchable prop-spec)
      {:state-factory (constantly prop-spec) :prop prop-name}

      (fn? prop-spec)
      {:state-factory prop-spec :prop prop-name}

      (map? prop-spec)
      (cond-> prop-spec
        :always
        (assoc :prop prop-name)

        (not (or (:field prop-spec) (:state prop-spec) (:state-factory prop-spec)))
        (assoc :field (-> prop-name name base/cammel-case))))))

(defonce ^:private !dirty (atom #{}))
(defonce ^:private !render-frame-id (atom nil))

(defn- render []
  (reset! !render-frame-id nil)
  (while (seq @!dirty)
    (let [batch @!dirty]
      (reset! !dirty #{})
      (doseq [^js/Node dom batch]
        (let [!static-state (-> dom .-constructor (gobj/get PRIVATE-SYM))
              !instance-state (gobj/get dom PRIVATE-SYM)
              ^js/ShadowDom shadow (:shadow @!instance-state)
              rendered-props (gobj/get dom PROPS-SYM)
              vdom (apply-injections ((:view @!static-state) (:props @!instance-state)) {:z.host dom :z.root shadow})]

          ;; if it needs to be focusable, but explicit tabIndex wasn't set
          (when (and
                  (= (:focus @!static-state) :self)
                  (not (or (contains? rendered-props :tab-index) (contains? rendered-props :tabindex)))
                  (< (.-tabIndex dom) 0))
            (set! (.-tabIndex dom) 0))

          ;; render the thing
          (try
            (patch-root
              shadow
              (:internals @!instance-state)
              !instance-state
              vdom)
            (catch :default e
              (js/console.error "Error rendering component" (:name @!static-state) e)))

          ;; dispatch lifecycle events
          (let [event-type (if (:connected @!instance-state)
                             "update"
                             (do
                               (swap! !instance-state assoc :connected true)
                               "connect"))
                observed-events (set (keep #(when (pos? (val %)) (key %)) (get @!instance-state :lifecycle-event-listener-counts)))]
            (when (seq observed-events)
              (js/setTimeout
                (fn []
                  (when (contains? observed-events event-type)
                    (.dispatchEvent shadow (js/Event. event-type #js{:bubbles false})))
                  (when (contains? observed-events "render")
                    (.dispatchEvent shadow (js/Event. "render" #js{:bubbles false}))))))))))))

(defn- request-render [^js/Node dom]
  (swap! !dirty conj dom)
  (when-not @!render-frame-id
    (reset! !render-frame-id (js/requestAnimationFrame render))))

(defn- patch-el-class [class component-name {:keys [props view focus inherit-doc-css?]}]
  (let [^js proto (.-prototype class)
        !static-state (gobj/get class PRIVATE-SYM)
        props-map (cond
                    (set? props) (->> props (map #(vector % :default)) (into {}))
                    (map? props) props
                    (nil? props) {}
                    :else (throw (ex-info "Props must be either a map or a set" {:props props :component component-name})))
        normalized-prop-specs (keep #(normalize-prop-spec (key %) (val %)) props-map)
        attr->prop-spec (->> normalized-prop-specs
                          (keep
                            (fn [prop-spec]
                              (when (and (:attr prop-spec) (nil? (:state-factory prop-spec)))
                                [(:attr prop-spec) prop-spec])))
                          (into {}))
        init-props (fn [^js/Node instance]
                     (let [!instance-state (gobj/get instance PRIVATE-SYM)]
                       (doseq [prop-spec normalized-prop-specs
                               :when (not (contains? (:props @!instance-state) (:prop prop-spec)))]
                         (cond
                           (:state-factory prop-spec)
                           (try
                             (let [state ((:state-factory prop-spec) instance)
                                   watch-key [::state-prop (:prop prop-spec) instance]
                                   cleanup-fn (fn []
                                                (swap! !instance-state update :props dissoc (:prop prop-spec))
                                                (remove-watch state watch-key)
                                                (when-let [state-cleanup (:state-cleanup prop-spec)]
                                                  (state-cleanup state instance)))]
                               (when-not (satisfies? IWatchable state)
                                 (throw (ex-info "State factory produced something not watchable" {:state state :component component-name})))
                               (add-watch state watch-key
                                 (fn [_ _ _ new-val]
                                   (swap! !instance-state assoc-in [:props (:prop prop-spec)] new-val)
                                   (when (:connected @!instance-state)
                                     (request-render instance))))
                               (when (satisfies? IDeref state)
                                 (swap! !instance-state update :props assoc (:prop prop-spec) @state))
                               (swap! !instance-state update :cleanup-fns (fnil conj #{}) cleanup-fn))
                             (catch :default e
                               (js/console.error "Error initializing state prop" e)))

                           (:attr prop-spec)
                           (swap! !instance-state assoc-in [:props (:prop prop-spec)]
                             (some->> (.getAttribute instance (:attr prop-spec)) (config/read-attribute component-name (:attr prop-spec))))

                           :else
                           (swap! !instance-state assoc-in [:props (:prop prop-spec)] nil)))))
        default-css (cond-> [DEFAULT-CSS]
                      inherit-doc-css?
                      (into (->> (js/document.querySelectorAll "link[rel=\"stylesheet\"]")
                              .values es6-iterator-seq
                              (map (fn [^js link-dom] (.getAttribute link-dom "href")))
                              (remove str/blank?)
                              (mapv ->stylesheet-object))))]
    (swap! !static-state merge {:view view :focus focus :name component-name :default-css default-css})
    
    ;; If this component's fields have been indexed,
    ;; remove it from the index since its fields may have changed
    (swap! !class->fields-index dissoc class)

    (js/Object.defineProperty
      class "observedAttributes"
      #js{:value (to-array (keys attr->prop-spec))
          :configurable true})

    (js/Object.defineProperties
      proto
      #js{:connectedCallback
          #js{:value
              (fn []
                (let [^js/Node this (js* "this")
                      !instance-state (gobj/get this PRIVATE-SYM)]
                  (swap! !static-state update :instances conj this)
                  (swap! !instance-state assoc :binds {})
                  (init-props this)
                  (request-render this)))
              :configurable true}
          :disconnectedCallback
          #js{:value
              (fn []
                (let [^js/Node this (js* "this")
                      !instance-state (gobj/get this PRIVATE-SYM)
                      ^js/ShadowRoot shadow (:shadow @!instance-state)]
                  (when (pos? (get-in @!instance-state [:lifecycle-event-listener-counts "disconnect"]))
                    (.dispatchEvent shadow (js/Event. "disconnect" #js{:bubbles false})))
                  (swap! !dirty disj this)
                  (swap! !static-state update :instances disj this)
                  (swap! !instance-state assoc :connected false)
                  (doseq [cleanup-fn (:cleanup-fns @!instance-state)]
                    (cleanup-fn))
                  (swap! !instance-state assoc :cleanup-fns #{})
                  (doseq [^js/Node child-dom (-> shadow .-childNodes array-seq)]
                    (prepare-dom-to-be-detached child-dom !instance-state))
                  (assert (= {} (:binds @!instance-state)))))
              :configurable true}

          :attributeChangedCallback
          #js{:value
              (fn [attr-name _old-val new-val]
                (let [^js/Node this (js* "this")
                      !instance-state (gobj/get this PRIVATE-SYM)]
                  (when-let [prop-spec (get attr->prop-spec attr-name)]
                    (swap! !instance-state assoc-in [:props (:prop prop-spec)]
                      (config/read-attribute component-name attr-name new-val))
                    (when (:connected @!instance-state)
                      (request-render this)))))
              :configurable true}})
    (doseq [prop-spec (filter :field normalized-prop-specs)
            :let [prop-name (:prop prop-spec)]]
      (js/Object.defineProperty
        proto
        (:field prop-spec)
        #js{:get
            (fn []
              (-> (js* "this") (gobj/get PRIVATE-SYM) deref :props (get prop-name)))
            :set
            (if (:state-factory prop-spec)
              (js* "undefined")
              (fn [x]
                (let [!instance-state (-> (js* "this") (gobj/get PRIVATE-SYM))]
                  (when-not (identical? x (get-in @!instance-state [:props prop-name]))
                    (swap! !instance-state assoc-in [:props prop-name] x)
                    (when (:connected @!instance-state)
                      (request-render (js* "this")))))))
            :configurable true}))
    (js/Object.defineProperty
      proto
      "elementName"
      #js{:value        (kw->el-name component-name)
          :writable     false
          :configurable true})
    (js/Object.defineProperty
      proto
      "componentName"
      #js{:value        component-name
          :writable     false
          :configurable true})
    (doseq [instance (:instances @!static-state)]
      (init-props instance)
      (request-render instance))))

(defn update-component [component-name {:keys [props view focus derive] :as things}]
  (let [el-name (kw->el-name component-name)]
    (if-let [existing (js/customElements.get el-name)]
      (patch-el-class existing component-name things)
      (let [new-class (js* "(class extends HTMLElement {
                                constructor() {
                                    super();
                                    this['init']()
                                }
                            })")]
        (gobj/set new-class PRIVATE-SYM (atom {:instances #{}}))
        (when-let [ns (namespace component-name)]
          (config/derive component-name (or derive (keyword ns "Component"))))
        (js/Object.defineProperty (.-prototype new-class) "init"
          #js{:value
              (fn []
                (let [^js this (js* "this")
                      ^js shadow (.attachShadow this #js{:mode "open" :delegatesFocus (= focus :delegate)})
                      !instance-state (atom
                                        {:shadow                          shadow
                                         :internals                       (.attachInternals this)
                                         :props                           {}
                                         :lifecycle-event-listener-counts {}
                                         :doms-on-focus-path              #{}})]
                  (gobj/set this PRIVATE-SYM !instance-state)
                  (.addEventListener shadow "focusin"
                    (fn [^js event]
                      (let [event-path (.composedPath event)
                            shadow-index (.indexOf event-path (:shadow @!instance-state))]
                        (swap! !instance-state assoc :doms-on-focus-path (set (.slice event-path 0 shadow-index)))))
                    true)
                  (.addEventListener shadow "focusout"
                    (fn [^js event]
                      (when (or (nil? (.-relatedTarget event)) (not (.contains shadow (.-relatedTarget event))))
                        (swap! !instance-state assoc :doms-on-focus-path #{})))
                    true)
                  (let [orig-add-event-listener (.bind (.-addEventListener shadow) shadow)
                        orig-remove-event-listener (.bind (.-removeEventListener shadow) shadow)]
                    (js/Object.defineProperties shadow
                      #js{:addEventListener
                          #js{:value
                              (fn add-event-listener-override [type & others]
                                (case type
                                  ("connect" "disconnect" "update" "render")
                                  (swap! !instance-state update-in [:lifecycle-event-listener-counts type] (fnil inc 0))
                                  nil)
                                (apply orig-add-event-listener type others))
                              :configurable false
                              :writable     false}
                          :removeEventListener
                          #js{:value
                              (fn remove-event-listener-override [type & others]
                                (case type
                                  ("connect" "disconnect" "update" "render")
                                  (swap! !instance-state update-in [:lifecycle-event-listener-counts type] (fnil dec 0))
                                  nil)
                                (apply orig-remove-event-listener type others))
                              :configurable false
                              :writable     false}}))))
              :configurable false
              :writable     false})
        (patch-el-class new-class component-name things)
        (js/customElements.define el-name new-class))))
  nil)

(defn update-components! [{old-components :components} {new-components :components}]
  (when-not (identical? old-components new-components)
    (doseq [[component-name component-spec :as new-component-entry] new-components
            :when (not= new-component-entry (find old-components component-name))]
      (update-component component-name component-spec))))

(add-watch config/!registry ::update-components #(update-components! %3 %4))
(update-components! {} @config/!registry)

(defonce ^:private
  _only-do-this-once
  (when DEBUG
    (letfn
      [(update-link [^js/Node link-dom url]
         (let [^js/Node clone (.cloneNode link-dom)]
           (set! (.-href clone) url)
           (gobj/set clone PROPS-SYM (gobj/get link-dom PROPS-SYM))
           (.insertAdjacentElement link-dom "beforebegin" clone)
           (.addEventListener clone "load"
             (fn [_]
               (.remove link-dom))
             #js{:once true})
           (swap! !css-links disj link-dom)
           (swap! !css-links conj clone)))
       (observer-cb [^js/Array records]
         (let [path->links (delay
                             (group-by
                               (fn [^js/Node x]
                                 (-> x .-href (js/URL. js/location.href) .-pathname))
                               @!css-links))]
           (doseq [^js record records, ^js/Node node (-> record .-addedNodes array-seq)
                   :when (and (= "LINK" (.-nodeName node)) (contains? #{"stylesheet" "preload"} (.-rel node)))
                   :let [created-link-url (js/URL. (.-href node) js/location.href)
                         href (.getAttribute node "href")]
                   :when (= js/location.origin (.-origin created-link-url))]
             (doseq [^js/Node matching-link (get @path->links (.-pathname created-link-url))]
               (swap! !css-href-overrides assoc (-> matching-link (gobj/get PROPS-SYM) :href) href)
               (update-link matching-link href))
             (doseq [[original-url-str stylesheet-object] @!css-stylesheet-objects
                     :let [original-url (js/URL. original-url-str)]
                     :when (and
                             (= js/location.origin (.-origin original-url))
                             (= (.-pathname original-url) (.-pathname created-link-url)))]
               (load-stylesheet stylesheet-object href)))))]
      (let [observer (js/MutationObserver. observer-cb)
            opts #js{:childList true}]
        (js/addEventListener "load"
          (fn [_]
            (.observe observer js/document.head opts)
            (.observe observer js/document.body opts))
          #js{:once true})))))