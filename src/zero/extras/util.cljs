(ns zero.extras.util
  (:require
    [clojure.string :as str]
    [zero.core :as z]))

(z/reg-injector
  :ze/ctx
  (fn [context & path]
    (get-in context path))

  :ze/call
  (fn [_ f & args]
    (apply f args))

  :ze/act
  (fn [_ & args]
    (apply z/act args))

  :ze/<<
  (fn [_ & args]
    (apply z/<< args)))

(z/reg-effect
  :ze/cond
  (fn [& cases]
    (when-let [[_ & effects] (first (filter first cases))]
      (doseq [effect effects]
        (z/do-effects! effect))))

  :ze/effects
  (fn [effects]
    (doseq [effect effects]
      (z/do-effects! effect))))

(z/component
  :name :ze/echo
  :inherit-doc-css? true
  :props #{:vdom}
  :view (fn [{:keys [vdom]}] vdom))

(defn <<act [& args]
  (apply z/<< :z/act args))

(defn <<< [& args]
  (apply z/<< :z/<< args))

(defn derived [f & deps]
  (fn [rx & args]
    (let [watch-id (random-uuid)
          !dep-vals (atom (mapv #(when (satisfies? IDeref %) (deref %)) deps))
          on-deps (fn [dep-vals]
                    (try
                      (rx (apply f dep-vals args))
                      (catch :default e
                        (js/console.error e))))]
      (on-deps @!dep-vals)
      (add-watch !dep-vals watch-id
        (fn [_ _ _ new-val]
          (on-deps new-val)))
      (doseq [[idx dep] (map-indexed vector deps)]
        (add-watch dep watch-id
          (fn [_ _ _ new-val]
            (swap! !dep-vals assoc idx new-val))))

      (fn cleanup-derived []
        (doseq [dep deps]
          (remove-watch dep watch-id))))))

(defonce !watch-deps (atom {}))

(defn unwatch [key]
  (when-let [deps (get @!watch-deps key)]
    (doseq [dep deps]
      (remove-watch dep [::watch key])))
  (swap! !watch-deps dissoc key))

(defn watch [key f & deps]
  (unwatch key)
  (swap! !watch-deps assoc key deps)
  (let [!dep-vals (atom (mapv #(when (satisfies? IDeref %) (deref %)) deps))
        on-deps (fn [dep-vals]
                  (try
                    (apply f dep-vals)
                    (catch :default e
                      (js/console.error e))))]
    (doseq [[idx dep] (map-indexed vector deps)]
      (add-watch dep [::watch key]
        (fn [_ _ _ new-val]
          (swap! !dep-vals assoc idx new-val))))
    (add-watch !dep-vals [::watch key]
      (fn [_ _ _ new-val]
        (on-deps new-val)))))

(defn css-selector [x]
  (cond
    (string? x)
    x

    (keyword? x)
    (if-let [ns (namespace x)]
      (str (str/replace ns #"[.]" "\\.") "-" (name x))
      (name x))))

(defprotocol IDisposable
  (-dispose [disposable]))

(defn slotted-elements-prop [& {:keys [selector slots]}]
  (let [slotted-selector (some-> selector css-selector)
        slot-selector (if slots (->> slots (map #(str "slot[name=\"" (name %) "\"]")) (str/join ",")) "slot")]
    {:state-factory
     (fn slotted-prop-state-factory [^js/HTMLElement dom]
       (let [shadow (.-shadowRoot dom)
             !slotted (atom nil)
             update-slotted! (fn update-slotted! []
                               (reset! !slotted
                                 (set
                                   (for [slot (array-seq (.querySelectorAll shadow slot-selector))
                                         node (array-seq (.assignedNodes slot))
                                         :when (or (nil? slotted-selector) (and (instance? js/HTMLElement node) (.matches node slotted-selector)))]
                                     node))))
             abort-controller (js/AbortController.)]
         (update-slotted!)

         (.addEventListener shadow "slotchange" update-slotted! #js{:signal (.-signal abort-controller)})
         (.addEventListener shadow "render" update-slotted! #js{:signal (.-signal abort-controller)})

         (reify
           IDeref
           (-deref [_]
             @!slotted)

           IWatchable
           (-add-watch [_ k f]
             (-add-watch !slotted k f))
           (-remove-watch [_ k]
             (-remove-watch !slotted k))

           IDispose
           (-dispose [_]
             (.abort abort-controller)))))

     :state-cleanup
     (fn slotted-prop-state-cleanup [state _]
       (-dispose state))}))