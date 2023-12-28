(ns zero.extras.util
  (:require
    [clojure.string :as str]
    [zero.config :as zc]
    [zero.core :as z]))

(zc/reg-injections
  :ze/ctx
  (fn [context & path]
    (get-in context path))

  :ze/act
  (fn [_ & args]
    (apply z/act args))

  :ze/<<
  (fn [_ & args]
    (apply z/<< args)))

(zc/reg-effects
  :ze/cond
  (fn [& cases]
    (when-let [[_ & effects] (first (filter first cases))]
      ((apply z/act effects) nil)))

  :ze/effects
  (fn [effects]
    ((apply z/act effects) nil)))

(zc/reg-components
  :ze/echo
  {:inherit-doc-css? true
   :props #{:vdom}
   :view (fn [{:keys [vdom]}] vdom)})

(defn <<act [& args]
  (apply z/<< :ze/act args))

(defn <<< [& args]
  (apply z/<< :ze/<< args))

(defn derived [f & deps]
  (fn [rx & args]
    (let [watch-id (random-uuid)
          !dep-vals (atom nil)
          on-deps (fn [dep-vals]
                    (try
                      (rx (apply f dep-vals args))
                      (catch :default e
                        (js/console.error e))))]
      (doseq [[idx dep] (map-indexed vector deps)]
        (add-watch dep watch-id
          (fn [_ _ _ new-val]
            (swap! !dep-vals assoc idx new-val))))

      (reset! !dep-vals (mapv #(when (satisfies? IDeref %) (deref %)) deps))
      (on-deps @!dep-vals)
      (add-watch !dep-vals watch-id
        (fn [_ _ _ new-val]
          (on-deps new-val)))

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
  (let [!dep-vals (atom nil)
        on-deps (fn [dep-vals]
                  (try
                    (apply f dep-vals)
                    (catch :default e
                      (js/console.error e))))]
    (doseq [[idx dep] (map-indexed vector deps)]
      (add-watch dep [::watch key]
        (fn [_ _ _ new-val]
          (swap! !dep-vals assoc idx new-val))))

    (reset! !dep-vals (mapv #(when (satisfies? IDeref %) (deref %)) deps))
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

#?(:cljs
   (defn slotted-elements-prop [& {:keys [selector slots]}]
     (let [slotted-selector (some-> selector css-selector)
           slot-selector (if slots (->> slots (map #(str "slot[name=\"" (name %) "\"]")) (str/join ",")) "slot")]
       {:state-factory
        (fn slotted-prop-state-factory [^js/HTMLElement dom]
          (let [shadow (.-shadowRoot dom)
                !slotted (atom nil)
                update-slotted! (fn update-slotted! []
                                  (let [now-slotted (set
                                                      (for [slot (array-seq (.querySelectorAll shadow slot-selector))
                                                            node (array-seq (.assignedNodes slot))
                                                            :when (or (nil? slotted-selector) (and (instance? js/HTMLElement node) (.matches node slotted-selector)))]
                                                        node))]
                                    (when (not= now-slotted @!slotted)
                                      (reset! !slotted now-slotted))))
                abort-controller (js/AbortController.)]
            (update-slotted!)

            (.addEventListener shadow "slotchange" update-slotted! #js{:signal (.-signal abort-controller)})
            #_(.addEventListener shadow "render" update-slotted! #js{:signal (.-signal abort-controller)})

            (reify
              IDeref
              (-deref [_]
                @!slotted)

              IWatchable
              (-add-watch [_ k f]
                (-add-watch !slotted k f))
              (-remove-watch [_ k]
                (-remove-watch !slotted k))

              IDisposable
              (-dispose [_]
                (.abort abort-controller)))))

        :state-cleanup
        (fn slotted-prop-state-cleanup [state _]
          (-dispose state))})))