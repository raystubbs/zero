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
(defonce ^:private CHILDREN-SYM (js/Symbol "zChildren"))
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
          ;; setting className is faster than .setAttribute, but there
          ;; doesn't seem to be a way to remove the attribute this way,
          ;; so use .removeAttribute to remove it
          (if (nil? class)
            (.removeAttribute dom "class")
            (set! (.-className dom) (str/join " " class))))
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
  (doseq [child-dom (gobj/get dom CHILDREN-SYM)]
    (cleanup-dom child-dom !instance-state))
  (when (and DEBUG (= (.-nodeName dom) "LINK"))
    (swap! !css-links disj dom)))

(defn- calc-child-dom-changes [source-dom-seq target-dom-seq inserted]
  (cond
    (empty? source-dom-seq)
    (if (seq target-dom-seq)
      [{:op :insert :doms target-dom-seq}]
      [])

    (empty? target-dom-seq)
    [{:op :remove :doms (remove inserted source-dom-seq)}]

    (= (first source-dom-seq) (first target-dom-seq))
    (let [same-count (->> (map vector source-dom-seq target-dom-seq)
                       (take-while (fn [[s t]] (= s t)))
                       count)
          remaining-source-doms (drop same-count source-dom-seq)
          remaining-target-doms (drop same-count target-dom-seq)]
      (into
        (if (or (seq remaining-source-doms) (seq remaining-target-doms))
          [{:op :skip :count same-count}]
          [])
        (calc-child-dom-changes remaining-source-doms remaining-target-doms inserted)))

    (contains? inserted (first source-dom-seq))
    (calc-child-dom-changes (drop-while inserted source-dom-seq) target-dom-seq inserted)

    :else
    (let [not-same-count (->> (map vector source-dom-seq target-dom-seq)
                           (take-while (fn [[s t]] (not= s t)))
                           count)
          [to-insert remaining] (split-at not-same-count target-dom-seq)]
      (into [{:op :insert :doms to-insert}]
        (calc-child-dom-changes source-dom-seq remaining (into inserted to-insert))))))

(defn- apply-dom-changes [^js/Node dom ^js/Node start-child changes !instance-state]
  (let [!cursor (atom start-child)]
    (doseq [{:keys [op] :as change} changes]
      (case op
        :skip
        (dotimes [_ (:count change)]
          (swap! !cursor #(some-> % .-nextSibling)))

        :insert
        (cond
          (nil? @!cursor)
          (do
            (.apply (.-append dom) dom (to-array (:doms change)))
            (reset! !cursor (.-lastChild dom)))

          (.-before @!cursor)
          (do
            (.apply (.-before @!cursor) @!cursor (to-array (:doms change))))

          :else
          (doseq [dom-to-insert (:doms change)]
            (.insertBefore @!cursor dom-to-insert)))

        :remove
        (doseq [dom-to-remove (:doms change)]
          (.removeChild dom dom-to-remove)
          (cleanup-dom dom-to-remove !instance-state))))))

(defn- patch-children [^js/Node dom !instance-state children]
  (let [old-child-doms (or (gobj/get dom CHILDREN-SYM) [])

        !child-doms (atom
                     (group-by
                      (fn [child-dom]
                        (if (-> child-dom .-nodeType (= js/Node.TEXT_NODE))
                          :text
                          (let [props (gobj/get child-dom PROPS-SYM)]
                            [(:z/sel props) (:z/key props)])))
                      old-child-doms))

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

        new-child-doms (mapv
                         (fn process-children [vnode]
                           (cond
                             (vector? vnode)
                             (let [[tag props body] (preproc-vnode vnode)
                                   child-dom (take-el-dom tag props)
                                   old-props (gobj/get child-dom PROPS-SYM)]
                               (when (or config/disable-tags? (nil? (:z/tag props)) (not= (:z/tag props) (:z/tag old-props)))
                                 (patch-props child-dom !instance-state props)
                                 (patch-children child-dom !instance-state body))
                               child-dom)

                             :else
                             (let [child-dom (take-text-dom)]
                               (set! (.-nodeValue child-dom) (str vnode))
                               child-dom)))
                         children)

        focused-doms (:doms-on-focus-path @!instance-state)
        index-of-focused-child-in-new (when (seq focused-doms) (base/index-of (partial contains? focused-doms) new-child-doms))]

    ;; keep track of <link> elements so we can make them
    ;; react to hot reloads
    (when DEBUG
      (doseq [child-dom new-child-doms
              :when (and
                      (= (.-nodeName child-dom) "LINK")
                      (contains? #{"stylesheet" "preload"} (.-rel child-dom)))]
        (swap! !css-links conj child-dom)))

    ;; apply changes
    (if (nil? index-of-focused-child-in-new)
      (apply-dom-changes dom (.-firstChild dom) (calc-child-dom-changes old-child-doms new-child-doms #{}) !instance-state)
      (let [focused-child-dom (get new-child-doms index-of-focused-child-in-new)
            index-of-focused-child-in-old (or (base/index-of (partial = focused-child-dom) old-child-doms) (count old-child-doms))
            changes-before-focused-dom (calc-child-dom-changes
                                         (subvec old-child-doms 0 index-of-focused-child-in-old)
                                         (subvec new-child-doms 0 index-of-focused-child-in-new)
                                         #{})
            changes-after-focused-dom (calc-child-dom-changes
                                        (subvec old-child-doms (inc index-of-focused-child-in-old))
                                        (subvec new-child-doms (inc index-of-focused-child-in-new))
                                        #{})]
        (apply-dom-changes dom (.-firstChild dom) changes-before-focused-dom !instance-state)
        (apply-dom-changes dom (.-nextSibling focused-child-dom) changes-after-focused-dom !instance-state)))

    (gobj/set dom CHILDREN-SYM new-child-doms)))

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
                                         watch-key [::state-prop (:prop prop-spec) instance]
                                         cleanup-fn (fn []
                                                      (swap! !instance-state update :props dissoc (:prop prop-spec))
                                                      (remove-watch state watch-key)
                                                      (when-let [state-cleanup (:state-cleanup prop-spec)]
                                                        (state-cleanup state instance)))]
                                     (when-not (satisfies? IWatchable state)
                                       (throw (ex-info "State factory produced something not watchable" {:state state :component name})))
                                     (when (satisfies? IDeref state)
                                       (swap! !instance-state update :props assoc (:prop prop-spec) @state))
                                     (add-watch state watch-key
                                       (fn [_ _ _ new-val]
                                         (swap! !instance-state assoc-in [:props (:prop prop-spec)] new-val)
                                         (when (:connected @!instance-state)
                                           (request-render instance))))
                                     (swap! !instance-state update :cleanup-fns (fnil conj #{}) cleanup-fn))
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
                  (when (pos? (get-in @!instance-state [:lifecycle-event-listener-counts "disconnect"]))
                    (.dispatchEvent shadow (js/Event. "disconnect" #js{:bubbles false})))
                  (swap! !dirty disj this)
                  (swap! !static-state update :instances disj this)
                  (swap! !instance-state assoc :connected false)
                  (doseq [cleanup-fn (:cleanup-fns @!instance-state)]
                    (cleanup-fn))
                  (swap! !instance-state assoc :cleanup-fns #{})
                  (doseq [^js/Node child-dom (gobj/get shadow CHILDREN-SYM)]
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