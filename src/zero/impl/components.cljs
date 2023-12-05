(ns zero.impl.components
  (:require
   [zero.impl.base :as base]
   [zero.config :as config]
   [clojure.string :as str]
   [goog.object :as gobj]
   [goog :refer [DEBUG]]))

;; generic unique id seq
(defonce ^:private uid-seq (atom (js/BigInt 0)))

(defn- gen-uid []
  (swap! uid-seq + (js/BigInt 1)))

(defn- flatten-body [body]
  (mapcat
    (fn flattener [item]
      (cond
        (seq? item) (mapcat flattener item)
        (nil? item) nil
        :else [item]))
    body))

(defn- normalize-vnode "
Given a vnode like `[tag-or-tags {...props}|...props & body]`
yields `[tag-or-tags props body]`.
" [vnode]
  (if (map? (nth vnode 1 nil))
    [(nth vnode 0) (nth vnode 1) (flatten-body (nthrest vnode 2))]
    (loop [props {}
           [prop-name prop-val & other :as all] (rest vnode)]
      (if-not (keyword? prop-name)
        [(nth vnode 0) props (flatten-body all)]
        (recur (assoc props prop-name prop-val)
               other)))))

(comment
  (normalize-vnode
   [:div
    :on-click "blah"
    :z/class :none
    "Something else"]))

(defn- extract-tag-props "
Given a normalized vnode, parses the ids and classes
out of the tag and into the props, adding a `:z/sel`
prop containing the original
tag.
" [[tag props body]]
  (if-let [[_ type id classes] (re-matches #"^([^#.]+)([#][^.]+)?([.].+)?$" (name tag))] 
    [(keyword (namespace tag) type)
     (-> props
         (assoc :z/sel tag)
         (assoc :id (some-> id (subs 1)))
         (assoc :z/class (->> [(some-> classes (str/split #"[.]")) (:z/class props)] flatten (remove str/blank?) not-empty)))
     body]
    (throw (ex-info "Invalid tag" {:tag tag}))))

(comment
  (extract-tag-props
   [:div#my-thing.foo.bar {:z/class "something"} (list "body")]))

(defn- preproc-vnode "
Simplifies the vnode, parsing out the classes and id from
the tag, and converting compound tags (i.e `[:div :span]`)
into nested vnodes, and accumulating the whole body into
one sequence.
" [vnode]
  (let [[tag-or-tags props body] (normalize-vnode vnode)]
    (->
     (cond
       (keyword? tag-or-tags)
       [tag-or-tags props body]
       
       (vector? tag-or-tags)
       (case (count tag-or-tags)
         0 (throw (ex-info "Invalid tag" {:tag tag-or-tags}))
         1 [(first tag-or-tags) props body]
         [(first tag-or-tags) (select-keys props [:z/key])
          (list
           (reduce
            (fn [m middle-tag]
              (extract-tag-props [middle-tag {} (list m)]))
            (extract-tag-props [(last tag-or-tags) (dissoc props :z/key) body])
            (-> tag-or-tags butlast rest)))]))
     extract-tag-props)))

(comment
  (preproc-vnode
   [[:div.foo :span#thing.bar :i]
    :on-click :do-something
    "The" "body"])
  (preproc-vnode
   [::foo :on-click "my-thing"]))


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
                             [[(keyword (base/snake-case prop-name)) prop-name]
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
  (let [all-keys (set (concat (keys new-props) (keys old-props)))]
    (as-> all-keys $
      (disj $ :z/style :z/on)
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

(defn- ->css-value [x]
  (cond
    (or (keyword? x) (symbol? x))
    (name x)

    (vector? x)
    (str/join " " (map ->css-value x))

    (seq? x)
    (str/join ", " (map ->css-value x))

    :else
    (str x)))

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
              (.setProperty style-obj (name k) (->css-value new-val))))))
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
                           (if-not prop-value
                             (.removeAttribute dom (name prop-key))
                             (.setAttribute dom (name prop-key) (if (true? adjusted-value) "" (str adjusted-value)))))))
            normal-props-diff (remove (comp namespace key) diff)]
        (doseq [[k [old-val new-val]] normal-props-diff]
          ;; when a binding expires
          (when (satisfies? IWatchable old-val)
            (let [binders (disj (get-in @!instance-state [:binds old-val :binders]) [dom k])]
              (cond
                (empty? binders)
                (do
                  (remove-watch old-val (get @!instance-state [:binds old-val :uid]))
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
                (set-prop dom k @(:current existing)))
              (let [watch-uid (gen-uid)
                    !current (atom (if (satisfies? IDeref new-val) (deref new-val) nil))
                    binders #{[dom k]}]
                (add-watch
                  new-val watch-uid
                  (fn [_ _ _ x]
                    (reset! !current x)
                    (doseq [[binder-dom binder-prop] (get-in @!instance-state [:binds new-val :binders])]
                      (set-prop binder-dom binder-prop x))))
                (swap! !instance-state assoc-in [:binds new-val] {:uid watch-uid :current !current :binders binders})
                (set-prop dom k @!current)))

            :else
            (set-prop dom k new-val)))
        
        ;; patch styles
        (when-let [style-diff (diff :z/style)]
          (let [style-obj (.-style dom)]
            (doseq [[k [_ new-val]] style-diff]
              (if-not new-val
                (.removeProperty style-obj (name k))
                (.setProperty style-obj (name k) (->css-value new-val))))))
        
        ;; patch classes
        (when-let [[_ class] (diff :z/class)]
          (if (nil? class)
            (.removeAttribute dom "class")
            (.setAttribute dom "class" (cond->> class (sequential? class) flatten :always (str/join " ")))))
        (gobj/set dom PROPS-SYM props)))))

(defn- kw->el-name [tag]
  (->
   (if-let [ns (namespace tag)]
     (str ns "-" (name tag))
     (name tag))
   (str/replace #"[^A-Za-z0-9._-]+" "-")
   str/lower-case))

(defn- cleanup-dom [^js/Node dom !instance-state]
  (doseq [[k v] (gobj/get dom PROPS-SYM)]
    (when (and v (not (namespace k)))
      (when (satisfies? IWatchable v)
        (let [binders (disj (get-in @!instance-state [:binds v :binders]) [dom k])]
          (cond
            (empty? binders)
            (do
              (remove-watch v (get @!instance-state [:binds v :uid]))
              (swap! !instance-state update :binds dissoc v))
            
            :else
            (swap! !instance-state assoc-in [:binds v :binders] binders))))))
  (doseq [child-dom (-> dom .-childNodes array-seq)]
    (cleanup-dom child-dom !instance-state))
  (when (and DEBUG (= (.-nodeName dom) "LINK"))
    (swap! !css-links disj dom)))

(defn- patch-children [^js/Node dom !instance-state children]
  (let [!child-doms (atom
                     (group-by
                      (fn [child-dom]
                        (if (-> child-dom .-nodeType (= js/Node.TEXT_NODE))
                          :text
                          (let [props (gobj/get child-dom PROPS-SYM)]
                            [(:z/sel props) (:z/key props)])))
                      (-> dom .-childNodes array-seq)))
        !dom-cursor (atom (.-firstChild dom))

        mark-and-inject (fn [^js/Node child-dom]
                          (cond
                            (not= child-dom @!dom-cursor)
                            (if @!dom-cursor
                              (.insertBefore dom child-dom @!dom-cursor)
                              (.appendChild dom child-dom))

                            :else
                            (reset! !dom-cursor (.-nextSibling @!dom-cursor)))
                          (gobj/set child-dom MARK-SYM true))

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
                          (js/document.createTextNode "")))]
    (doseq [vnode children]
      (cond
        (vector? vnode)
        (let [[tag props body] (preproc-vnode vnode)
              child-dom (take-el-dom tag props)
              old-props (gobj/get child-dom PROPS-SYM)]
          (when (or config/disable-tags? (nil? (:z/tag props)) (not= (:z/tag props) (:z/tag old-props)))
            (patch-props child-dom !instance-state props)
            (patch-children child-dom !instance-state body))
          (mark-and-inject child-dom)
          
          ;; keep track of <link> elements so we can make them
          ;; react to hot reloads
          (when (and DEBUG
                  (= (.-nodeName child-dom) "LINK")
                  (contains? #{"stylesheet" "preload"} (.-rel child-dom)))
            (swap! !css-links conj child-dom)))
        
        :else
        (let [child-dom (take-text-dom)]
          (set! (.-nodeValue child-dom) (str vnode))
          (mark-and-inject child-dom))))
    (doseq [dom-child (-> dom .-childNodes js/Array.from)]
      (when-not (gobj/get dom-child MARK-SYM)
        (cleanup-dom dom-child !instance-state)
        (.removeChild dom dom-child))
      (gobj/set dom-child MARK-SYM false))))

(defn- render [^js/ShadowRoot dom ^js/ElementInternals internals !instance-state vnode]
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
      (patch-children dom !instance-state body))))

(defn- normalize-prop-spec [prop-name prop-spec]
  (case prop-spec
    :attr {:attr (-> prop-name name base/snake-case)
           :field (-> prop-name name base/cammel-case)
           :prop prop-name}
    :field {:field (-> prop-name name base/cammel-case)
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

(defn- do-render []
  (reset! !render-frame-id nil)
  (while (seq @!dirty)
    (let [batch @!dirty]
      (reset! !dirty #{})
      (doseq [^js/Node dom batch]
        (let [!static-state (-> dom .-constructor (gobj/get PRIVATE-SYM))
              !instance-state (gobj/get dom PRIVATE-SYM)
              ^js/ShadowDom shadow (:shadow @!instance-state)
              rendered-props (gobj/get dom PROPS-SYM)]

          ;; if it needs to be focusable, but explicit tabIndex wasn't set
          (when (and
                  (= (:focus @!static-state) :self)
                  (not (or (contains? rendered-props :tab-index) (contains? rendered-props :tabindex)))
                  (< (.-tabIndex dom) 0))
            (set! (.-tabIndex dom) 0))

          ;; render the thing
          (try
            (render
              shadow
              (:internals @!instance-state)
              !instance-state
              ((:view @!static-state) (:props @!instance-state)))
            (catch :default e
              (js/console.error "Error rendering component" (:name @!static-state) e)))

          ;; dispatch lifecycle events
          (let [event-type (if (:connected @!instance-state)
                             "update"
                             (do
                               (swap! !instance-state assoc :connected true)
                               "connect"))]
            (js/setTimeout
              (fn []
                (.dispatchEvent shadow (js/Event. event-type #js{:bubbles false}))
                (.dispatchEvent shadow (js/Event. "render" #js{:bubbles false}))))))))))

(defn- request-render [^js/Node dom]
  (swap! !dirty conj dom)
  (when-not @!render-frame-id
    (reset! !render-frame-id (js/requestAnimationFrame do-render))))

(defn- patch-el-class [class {:keys [props view focus name inherit-doc-css?]}]
  (let [^js proto (.-prototype class)
        !static-state (gobj/get class PRIVATE-SYM)
        props-map (cond
                    (set? props) (->> props (map #(vector % :field)) (into {}))
                    (map? props) props
                    (nil? props) {}
                    :else (throw (ex-info "Props must be either a map or a set" {:props props :component name})))
        normalized-prop-specs (keep #(normalize-prop-spec (key %) (val %)) props-map)
        attr->prop-spec (->> normalized-prop-specs
                          (keep
                            (fn [prop-spec]
                              (when (and (:attr prop-spec) (nil? (:state-factory prop-spec)))
                                [(:attr prop-spec) prop-spec])))
                          (into {}))
        state-prop-specs (filter :state-factory normalized-prop-specs)
        init-state-props (fn [^js/Node instance]
                           (let [!instance-state (gobj/get instance PRIVATE-SYM)]
                             (doseq [prop-spec state-prop-specs]
                               (when-not (contains? (:props @!instance-state) (:prop prop-spec))
                                 (try
                                   (let [state ((:state-factory prop-spec) instance)
                                         watch-key [::state-prop (:prop prop-spec) instance]]
                                     (when-not (satisfies? IWatchable state)
                                       (throw (ex-info "State factory produced something not watchable" {:state state :component name})))
                                     (when (satisfies? IDeref state)
                                       (swap! !instance-state update :props assoc (:prop prop-spec) @state))
                                     (add-watch state watch-key
                                       (fn [_ _ _ new-val]
                                         (swap! !instance-state assoc-in [:props (:prop prop-spec)] new-val)
                                         (when (:connected @!instance-state)
                                           (request-render instance))))
                                     (.addEventListener (:shadow @!instance-state) "disconnect"
                                       (fn []
                                         (remove-watch state watch-key)
                                         (when-let [state-cleanup (:state-cleanup prop-spec)]
                                           (state-cleanup state instance)))))
                                   (catch :default e
                                     (js/console.error "Error initializing state prop" e)))))))
        default-css (cond-> [DEFAULT-CSS]
                      inherit-doc-css?
                      (into (->> (js/document.querySelectorAll "link[rel=\"stylesheet\"]")
                              .values es6-iterator-seq
                              (map (fn [^js link-dom] (.getAttribute link-dom "href")))
                              (remove str/blank?)
                              (mapv ->stylesheet-object))))]
    (swap! !static-state merge {:view view :focus focus :name name :default-css default-css})
    
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
                  (init-state-props this)
                  (request-render this)))
              :configurable true}
          :disconnectedCallback
          #js{:value
              (fn []
                (let [^js/Node this (js* "this")
                      !instance-state (gobj/get this PRIVATE-SYM)
                      ^js/ShadowRoot shadow (:shadow @!instance-state)]
                  (.dispatchEvent shadow (js/Event. "disconnect" #js{:bubbles false}))
                  (swap! !dirty disj this)
                  (swap! !static-state update :instances disj this)
                  (swap! !instance-state assoc :connected false)
                  (doseq [^js/Node child-dom (-> shadow .-childNodes js/Array.from)]
                    (cleanup-dom child-dom !instance-state)
                    (.remove child-dom))
                  (assert (= {} (:binds @!instance-state)))))
              :configurable true}

          :attributeChangedCallback
          #js{:value
              (fn [name _old-val new-val]
                (let [^js/Node this (js* "this")
                      !instance-state (gobj/get this PRIVATE-SYM)]
                  (when-let [prop-spec (get attr->prop-spec name)]
                    (cond
                      (nil? new-val)
                      (swap! !instance-state update :props dissoc (:prop prop-spec))

                      :else
                      (let [final-val (if-let [mapper (:attr-mapper prop-spec)]
                                        (mapper new-val)
                                        new-val)]
                        (swap! !instance-state assoc-in [:props (:prop prop-spec)] final-val)))
                    (when (:connected @!instance-state)
                      (request-render this)))))
              :configurable true}})
    (doseq [prop-spec (filter :field normalized-prop-specs)]
      (js/Object.defineProperty
        proto
        (:field prop-spec)
        #js{:get
            (fn []
              (-> (js* "this") (gobj/get PRIVATE-SYM) .-props (get (:prop prop-spec))))
            :set
            (if (:state-factory prop-spec)
              (js* "undefined")
              (fn [x]
                (let [!instance-state (-> (js* "this") (gobj/get PRIVATE-SYM))]
                  (cond
                    (js* "~{} === undefined" x)
                    (swap! !instance-state update :props dissoc (:prop prop-spec)) 

                    :else
                    (swap! !instance-state assoc-in [:props (:prop prop-spec)] x))
                  (when (:connected @!instance-state)
                    (request-render (js* "this"))))))
            :configurable true}))
    (js/Object.defineProperty
      proto
      "elementName"
      #js{:value        (kw->el-name name)
          :writable     false
          :configurable true})
    (js/Object.defineProperty
      proto
      "componentName"
      #js{:value        name
          :writable     false
          :configurable true})
    (doseq [instance (:instances @!static-state)]
      (init-state-props instance)
      (request-render instance))))

(defn component [{:keys [name props view focus] :as things}]
  (let [el-name (kw->el-name name)]
    (if-let [existing (js/customElements.get el-name)]
      (patch-el-class existing things)
      (let [new-class (js* "(class extends HTMLElement {
                                constructor() {
                                    super();
                                    this.init()
                                }
                            })")]
        (gobj/set new-class PRIVATE-SYM (atom {:instances #{}}))
        (js/Object.defineProperty (.-prototype new-class) "init"
          #js{:value (fn []
                       (let [^js this (js* "this")]
                         (gobj/set this PRIVATE-SYM
                           (atom
                             {:shadow (.attachShadow this #js{:mode "open" :delegatesFocus (= focus :delegate)})
                              :internals (.attachInternals this)
                              :props {}}))))
              :configurable false
              :writable false})
        (patch-el-class new-class things)
        (js/customElements.define el-name new-class))))
  nil)

(defn component-name [k]
  (kw->el-name k))

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