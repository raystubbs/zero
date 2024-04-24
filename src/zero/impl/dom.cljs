(ns zero.impl.dom
  (:require
   [goog.object :as gobj]
   [goog :refer [DEBUG]]
   [zero.impl.base :as base]
   [zero.config :as config]
   [clojure.string :as str]))

(defonce PRIVATE-SYM (js/Symbol "zPrivate"))
(defonce PROPS-SYM (js/Symbol "zProps"))

(defonce !class->fields-index (atom {}))

(defn- prop-writable? [^js obj prop]
  (if (nil? obj)
    false
    (if-let [prop-def (js/Object.getOwnPropertyDescriptor obj prop)]
      (or (.-writable prop-def) (some? (.-set prop-def)))
      (prop-writable? (js/Object.getPrototypeOf obj) prop))))

(defn class->fields-index [^js class]
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

(defn purge-class-index [^js class]
  (swap! !class->fields-index dissoc class))

(defonce ^:private !css-links (atom #{}))
(defonce ^:private !css-stylesheet-objects (atom {}))
(defonce ^:private !css-href-overrides (atom {}))

(defn- ensure-top-level-css-link! [css-url]
  (when DEBUG
    (let [full-css-url (js/URL. (str css-url) js/location.origin)]
      (when (= js/location.origin (.-origin full-css-url))
        (let [top-level-css-link-doms (array-seq (js/document.querySelectorAll "link[rel=\"stylesheet\"]"))
              existing-link-dom (some
                                  (fn [^js/HTMLLinkElement dom]
                                    (let [link-url (js/URL. (.-href dom) js/location.origin)]
                                      (when
                                        (and
                                          (= (.-origin full-css-url) (.-origin link-url))
                                          (= (.-pathname full-css-url) (.-pathname link-url)))
                                        dom)))
                                  top-level-css-link-doms)]
          (or existing-link-dom
            (let [new-link-dom (js/document.createElement "link")]
              ;; impossible media query, so link will never apply
              (set! (.-media new-link-dom) "screen and print")
              (set! (.-href new-link-dom) (.-pathname full-css-url))
              (set! (.-rel new-link-dom) "stylesheet")
              (js/document.head.append new-link-dom)
              new-link-dom)))))))

(defn- load-stylesheet [stylesheet-object url]
  (gobj/set stylesheet-object PRIVATE-SYM {:href (.toString url)})
  (-> (js/fetch url)
    (.then #(.text %))
    (.then (fn [css-text]
             (let [{:keys [href]} (gobj/get stylesheet-object PRIVATE-SYM)]
               (when (= href (.toString url))
                 (.replace stylesheet-object css-text)))))))

(defn ->stylesheet-object [x]
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
          (ensure-top-level-css-link! absolute-url-str)
          (.replaceSync new-css-obj "* { display: none; }")
          (load-stylesheet new-css-obj actual-url-str)
          (swap! !css-stylesheet-objects assoc absolute-url-str new-css-obj)
          new-css-obj)))

    :else
    (throw (ex-info "Can't convert given object to CSSStyleSheet" {:given x}))))


(defn set-prop [fields-index dom prop-name prop-value]
  (let [adjusted-value (if (and DEBUG (= (.-nodeName dom) "LINK") (= prop-name :href))
                         (get @!css-href-overrides prop-value prop-value)
                         prop-value)]
    (if-let [field-name (get fields-index prop-name)]
      (gobj/set dom field-name adjusted-value)
      (let [attr-name (name prop-name)
            component-name (or ^Keyword (.-componentName dom) (-> dom .-nodeName str/lower-case keyword))
            attr-value (when (some? adjusted-value) ((config/get-attr-writer component-name) adjusted-value attr-name component-name))]
        (if (nil? attr-value)
          (.removeAttribute dom attr-name)
          (.setAttribute dom (name prop-name) attr-value))))))

(defonce !binds (atom {}))
(defonce !bound-props (atom #{}))

(defn bind [k ^js/Node dom prop-name watchable]
  (when (contains? @!binds k)
    (throw (ex-info "Bind key already exists" {:key k})))
  (when (contains? @!bound-props [dom prop-name])
    (throw (ex-info "Property already bound" {:dom dom :prop-name prop-name})))

  (let [fields-index (-> dom .-constructor class->fields-index)]
    (add-watch watchable [::bind k]
      (fn [_ _ _ x] (set-prop fields-index dom prop-name x)))
    (swap! !binds assoc k {:watchable watchable :prop-name prop-name :dom dom})
    (swap! !bound-props conj [dom prop-name])

    ;; deref must be done _after_ add-watch to ensure that, if `new-val` is
    ;; a binding, the underlying data stream has been booted up
    (let [current (when (satisfies? IDeref watchable) @watchable)]
      (set-prop fields-index dom prop-name current))))

(defn unbind [k]
  (if-let [{:keys [watchable prop-name ^js/Node dom]} (get @!binds k)]
    (do
      (remove-watch watchable [::bind k])
      (swap! !binds dissoc k)
      (swap! !bound-props disj [dom prop-name]))
    (throw (ex-info "Bind key doesn't exist" {:key k}))))

(defonce !listener-aborters (atom {}))

(defn on-css-link-created! [^js/HTMLLinkElement link-dom]
  (ensure-top-level-css-link! (.-href link-dom))
  (swap! !css-links conj link-dom))

(defn on-css-link-removed! [^js/HTMLLinkElement link-dom]
  (swap! !css-links disj link-dom))

(defn listen [k ^js/Node dom-or-doms event-name listener-fn & {:keys [once? capture? passive? signal]}]
  (when (contains? @!listener-aborters k)
    (throw (ex-info "Listener key already exists" {:key k})))
  (let [aborter (js/AbortController.)]
    (when (some? signal)
      (.addEventListener signal "abort" (fn [_] (.abort aborter))
        #js{:once true :signal (.-signal aborter)}))
    (doseq [dom (cond-> dom-or-doms (not (or (coll? dom-or-doms) (instance? js/NodeList dom-or-doms))) vector)]
      (.addEventListener dom (name event-name)
        (if once? #(do (.abort aborter) (listener-fn %)) listener-fn)
        #js{:once once? :capture capture? :passive passive? :signal (.-signal aborter)}))
    (swap! !listener-aborters assoc k aborter)
    (.addEventListener (.-signal aborter) "abort"
      (fn []
        (swap! !listener-aborters dissoc k)))))

(defn unlisten [k]
  (if-let [aborter ^js/AbortController (get @!listener-aborters k)]
    (.abort aborter)
    (throw (ex-info "Listener key doesn't exist" {:key k}))))

(defn enable-live-reload []
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
                 :when (and (= "LINK" (.-nodeName node)) (= "stylesheet" (.-rel node)))
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
        #js{:once true}))))