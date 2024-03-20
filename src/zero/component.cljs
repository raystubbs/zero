(ns zero.component
  (:require
    [clojure.set :as set]
    [zero.impl.base :as base]
    [zero.impl.markup :refer [preproc-vnode clj->css-property kw->el-name]]
    [zero.impl.injection :refer [apply-injections]]
    [zero.impl.dom :as dom]
    [zero.config :as config]
    [clojure.string :as str]
    [goog.object :as gobj]
    [goog :refer [DEBUG]]
    [zero.logger :as log]))

(defn- css [s]
  (doto (js/CSSStyleSheet.) (.replaceSync s)))

(defonce ^:private HTML-NS "http://www.w3.org/1999/xhtml")
(defonce ^:private SVG-NS "http://www.w3.org/2000/svg")
(defonce ^:private HOST-CSS-SYM (js/Symbol "zHostCss"))
(def ^:private DEFAULT-CSS (css ":host { display: contents; }"))
(def ^:private JS-UNDEFINED (js* "undefined"))

(defn- default-ns [tag]
  (case tag
    :svg SVG-NS
    nil))

(defn- diff-shallow [map-a map-b ks]
  (reduce
    (fn [diff key]
      (let [val-a (get map-a key)
            val-b (get map-b key)]
        (if (= val-a val-b)
          diff
          (assoc diff key [val-a val-b]))))
    {} ks))

(defn diff-props [old-props new-props]
  (let [all-keys (merge old-props new-props)
        deep-keys [:zero.core/style :zero.core/on :zero.core/internals :zero.core/bind]]
    (as-> all-keys $
      (apply dissoc $ deep-keys)
      (keys $)
      (diff-shallow old-props new-props $)
      (reduce
        (fn [diff key]
          (if-not (contains? all-keys key)
            diff
            (let [old-inner-map (get old-props key)
                  new-inner-map (get new-props key)
                  inner-diff (diff-shallow old-inner-map new-inner-map (keys (merge old-inner-map new-inner-map)))]
              (if (empty? inner-diff)
                diff
                (assoc diff key inner-diff)))))
        $ deep-keys))))

(defn coll->validity-flags-obj [coll]
  (let [obj #js{}]
    (doseq [field-name (->> coll (filter base/named?) (map (comp base/cammel-case name)))]
      (gobj/set obj field-name true))
    obj))

(defonce ^:private internals-fields-index (dom/class->fields-index js/ElementInternals))

(defn- patch-root-props [^js/ShadowRoot dom ^js/ElementInternals internals ^js class props]
  (let [old-props (gobj/get dom dom/PROPS-SYM)
        diff (diff-props old-props props)
        ^js host-css (or (gobj/get dom HOST-CSS-SYM)
                       (let [x (js/CSSStyleSheet.)]
                         (.replaceSync x ":host {}")
                         (gobj/set dom HOST-CSS-SYM x)
                         x))]
    (when-not (empty? diff)
      (when-let [style-diff (diff :zero.core/style)]
        (let [style-obj (-> host-css .-cssRules (.item 0) .-style)]
          (doseq [[k [_ new-val]] style-diff]
            (if-not new-val
              (.removeProperty style-obj (name k))
              (.setProperty style-obj (name k) (clj->css-property new-val))))))
      (when-some [[_ css-prop] (get diff :zero.core/css)]
        (set! (.-adoptedStyleSheets dom) (->> (conj css-prop host-css) (mapv dom/->stylesheet-object) to-array)))

      ;; patch listeners
      (doseq [[k [old-val new-val]] (diff :zero.core/on)]
        (when (some? old-val)
          (dom/unlisten [old-val dom k]))
        (when (some? new-val)
          (dom/listen [new-val dom k] dom k new-val)))

      ;; patch internals
      (doseq [[k [_ new-val]] (diff :zero.core/internals)]
        (case k
          :zero.core/states
          (when-some [states ^js/CustomStateSet (.-states internals)]
            (.clear states)
            (doseq [state-val new-val]
              (.add states (name state-val))))

          :zero.core/value
          (when (.-formAssociated class)
            (let [[value state] (if (map? new-val)
                                  [(:value new-val) (:state new-val)]
                                  [new-val nil])]
              (.setFormValue (or value "") (or state ""))))

          :zero.core/validity
          (when (.-formAssociated class)
            (.setValidity internals
              (coll->validity-flags-obj (:flags new-val))
              (or (:message new-val) JS-UNDEFINED)
              (or (:anchor new-val) JS-UNDEFINED))
            (when (:report? new-val)
              (.reportValidity internals)))

          (when-some [field-name (get internals-fields-index k)]
            (gobj/set internals field-name new-val)))))

      ;; TODO: element internals (i.e aria, etc.)

    (gobj/set dom dom/PROPS-SYM props)))

(defn- patch-props [^js/Node dom props]
  (let [diff (diff-props (or (gobj/get dom dom/PROPS-SYM) {}) props)]
    (when-not (empty? diff)
      (let [fields-index (-> dom .-constructor dom/class->fields-index)
            normal-props-diff (remove (comp namespace key) diff)]

        ;; normal props
        (doseq [[k [_old-val new-val]] normal-props-diff]
          (dom/set-prop fields-index dom k new-val))

        ;; patch listeners
        (doseq [[k [old-val new-val]] (diff :zero.core/on)]
          (when (some? old-val)
            (dom/unlisten [old-val dom k]))
          (when (some? new-val)
            (dom/listen [new-val dom k] dom k new-val)))

        ;; patch binds
        (doseq [[k [old-val new-val]] (diff :zero.core/bind)]
          (when (some? old-val)
            (dom/unbind [old-val dom k]))
          (when (some? new-val)
            (dom/bind [new-val dom k] dom k new-val)))

        ;; patch styles
        (when-let [style-diff (diff :zero.core/style)]
          (let [style-obj (.-style dom)]
            (doseq [[k [_ new-val]] style-diff]
              (if-not new-val
                (.removeProperty style-obj (name k))
                (.setProperty style-obj (name k) (clj->css-property new-val))))))

        ;; patch classes
        (when-let [[_ class] (diff :zero.core/class)]
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
        (gobj/set dom dom/PROPS-SYM props)))))

(defn- prepare-dom-to-be-detached [^js/Node dom !instance-state]
  (let [props (gobj/get dom dom/PROPS-SYM)]
    (doseq [[k watchable] (:zero.core/bind props)]
      (dom/unbind [watchable dom k]))
    (gobj/set dom dom/PROPS-SYM (dissoc props :zero.core/bind)))
  (doseq [child-dom (-> dom .-childNodes array-seq)]
    (prepare-dom-to-be-detached child-dom !instance-state))
  (when (and DEBUG (= (.-nodeName dom) "LINK"))
    (dom/on-css-link-removed! dom)))

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
          ;; and both its old and new indices are greater than boundary-index.  Pivots
          ;; are 'stable', we don't move them, instead everything else moves
          ;; around them.
          (and
            (< boundary-index next-target-index)
            (< boundary-index next-source-index)
            (<= (dec next-source-index) next-target-index (inc next-source-index)))
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
                            (let [props (gobj/get child-dom dom/PROPS-SYM)]
                              [(:zero.core/sel props) (:zero.core/key props)])))
                        source-layout))

        take-el-dom (fn [tag props]
                      (let [matcher [(:zero.core/sel props) (:zero.core/key props)]
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
                                  old-props (gobj/get child-dom dom/PROPS-SYM)]
                              (when (or
                                      config/disable-tags?
                                      (nil? (:zero.core/tag props))
                                      (not= (:zero.core/tag props) (:zero.core/tag old-props)))
                                (patch-props child-dom props)
                                (when-not (:zero.core/opaque? props)
                                  (patch-children child-dom !instance-state body)))
                              child-dom)

                            :else
                            (let [child-dom (take-text-dom)
                                  text-value (str vnode)]
                              (when-not (identical? (.-nodeValue child-dom) text-value)
                                (set! (.-nodeValue child-dom) text-value))
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
        (dom/on-css-link-created! child-dom)))

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
  (let [class (-> dom .-host .-constructor)
        !static-state (gobj/get class dom/PRIVATE-SYM)
        default-css (:default-css @!static-state)
        old-props (gobj/get dom dom/PROPS-SYM)
        [props body] (cond
                       (and (vector? vnode) (= (first vnode) :root>))
                       (rest (preproc-vnode vnode))

                       (seq? vnode)
                       [{} vnode]

                       :else
                       [{} (list vnode)])]
    (when (or
            config/disable-tags?
            (nil? (:zero.core/tag props))
            (not= (:zero.core/tag props) (:zero.core/tag old-props)))
      (patch-root-props dom internals class
        (update props :zero.core/css #(cond (coll? %) (into default-css %) (some? %) (conj default-css %) :else default-css)))
      (when-not (:zero.core/opaque? props)
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

        (:state prop-spec)
        (-> (assoc :state-factory (constantly (:state prop-spec))) (dissoc :state-cleanup))

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
        (let [!static-state (-> dom .-constructor (gobj/get dom/PRIVATE-SYM))
              !instance-state (gobj/get dom dom/PRIVATE-SYM)
              ^js/ShadowDom shadow (:shadow @!instance-state)
              rendered-props (gobj/get dom dom/PROPS-SYM)
              vdom (try
                     ((:view @!static-state) (:props @!instance-state))
                     (catch :default e
                       (log/error :msg "Error in component :view" :component (:name @!static-state) :error e)
                       nil))
              vdom (apply-injections vdom {:z.host dom :z.root shadow})]

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

(defn- patch-el-class [class component-name {:keys [props view focus inherit-doc-css? form-associated?]}]
  (let [^js proto (.-prototype class)
        !static-state (gobj/get class dom/PRIVATE-SYM)
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
                     (let [!instance-state (gobj/get instance dom/PRIVATE-SYM)
                           attr-reader (config/get-attr-reader component-name)]
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

                           (and (:attr prop-spec) (-> @!instance-state :props (contains? (:prop prop-spec)) not))
                           (swap! !instance-state assoc-in [:props (:prop prop-spec)]
                             (some-> (.getAttribute instance (:attr prop-spec))
                               (attr-reader (:attr prop-spec) component-name)))))))
        default-css (cond-> [DEFAULT-CSS]
                      inherit-doc-css?
                      (into (->> (js/document.querySelectorAll "link[rel=\"stylesheet\"]")
                              .values es6-iterator-seq
                              (map (fn [^js link-dom] (.getAttribute link-dom "href")))
                              (remove str/blank?)
                              (mapv dom/->stylesheet-object))))]
    (swap! !static-state merge {:view view :focus focus :name component-name :default-css default-css})

    ;; If this component's fields have been indexed,
    ;; remove it from the index since its fields may have changed
    (dom/purge-class-index class)

    (js/Object.defineProperties
      class
      #js{:observedAttributes
          #js{:value (to-array (keys attr->prop-spec))
              :configurable true}
          :formAssociated
          #js{:value (boolean form-associated?)
              :configurable true}})

    (js/Object.defineProperties
      proto
      #js{:connectedCallback
          #js{:value
              (fn []
                (let [^js/Node this (js* "this")]
                  (swap! !static-state update :instances conj this)
                  (init-props this)
                  (request-render this)))
              :configurable true}
          :disconnectedCallback
          #js{:value
              (fn []
                (let [^js/Node this (js* "this")
                      !instance-state (gobj/get this dom/PRIVATE-SYM)
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
                    (prepare-dom-to-be-detached child-dom !instance-state))))
              :configurable true}

          :attributeChangedCallback
          #js{:value
              (fn [attr-name _old-val new-val]
                (let [^js/Node this (js* "this")
                      !instance-state (gobj/get this dom/PRIVATE-SYM)
                      attr-reader (config/get-attr-reader component-name)]
                  (when-let [prop-spec (get attr->prop-spec attr-name)]
                    (swap! !instance-state assoc-in [:props (:prop prop-spec)]
                      (some-> new-val
                        (attr-reader attr-name component-name)))
                    (when (:connected @!instance-state)
                      (request-render this)))))
              :configurable true}

          :elementName
          #js{:value (kw->el-name component-name)
              :writable false
              :configurable true}

          :componentName
          #js{:value component-name
              :writable false
              :configurable true}})
    (doseq [prop-spec (filter :field normalized-prop-specs)
            :let [prop-name (:prop prop-spec)]]
      (js/Object.defineProperty
        proto
        (:field prop-spec)
        #js{:get
            (fn []
              (-> (js* "this") (gobj/get dom/PRIVATE-SYM) deref :props (get prop-name)))
            :set
            (if (:state-factory prop-spec)
              (js* "undefined")
              (fn [x]
                (let [!instance-state (-> (js* "this") (gobj/get dom/PRIVATE-SYM))]
                  (when-not (identical? x (get-in @!instance-state [:props prop-name]))
                    (swap! !instance-state assoc-in [:props prop-name] x)
                    (when (:connected @!instance-state)
                      (request-render (js* "this")))))))
            :configurable true}))
    (doseq [instance (:instances @!static-state)]
      (init-props instance)
      (request-render instance))))

(defn update-component [component-name {:keys [props view focus] :as things}]
  (let [el-name (kw->el-name component-name)]
    (if-let [existing (js/customElements.get el-name)]
      (patch-el-class existing component-name things)
      (let [new-class (js* "(class extends HTMLElement {
                                constructor() {
                                    super();
                                    this['init']()
                                }
                            })")]
        (gobj/set new-class dom/PRIVATE-SYM (atom {:instances #{}}))
        (js/Object.defineProperty (.-prototype new-class) "init"
          #js{:value
              (fn []
                (let [^js this (js* "this")
                      ^js shadow (.attachShadow this #js{:mode "open" :delegatesFocus (= focus :delegate)})
                      !instance-state (atom
                                        {:shadow shadow
                                         :internals (.attachInternals this)
                                         :form-state {}
                                         :props {}
                                         :lifecycle-event-listener-counts {}
                                         :doms-on-focus-path #{}})]
                  (gobj/set this dom/PRIVATE-SYM !instance-state)
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
                              :writable false}
                          :removeEventListener
                          #js{:value
                              (fn remove-event-listener-override [type & others]
                                (case type
                                  ("connect" "disconnect" "update" "render")
                                  (swap! !instance-state update-in [:lifecycle-event-listener-counts type] (fnil dec 0))
                                  nil)
                                (apply orig-remove-event-listener type others))
                              :configurable false
                              :writable false}}))))
              :configurable false
              :writable false})
        (patch-el-class new-class component-name things)
        (js/customElements.define el-name new-class))))
  nil)

(defn update-components [{old-components :components} {new-components :components}]
  (when-not (identical? old-components new-components)
    (doseq [[component-name component-spec :as new-component-entry] new-components
            :when (not= new-component-entry (find old-components component-name))]
      (update-component component-name component-spec))))

(add-watch config/!registry ::update-components #(update-components %3 %4))
(update-components {} @config/!registry)

(defonce ^:private _only-do-this-once
  (when DEBUG (dom/enable-live-reload)))