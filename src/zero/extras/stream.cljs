(ns zero.extras.stream)

(defn derived [f & deps]
  (fn [rx & args]
    (let [watch-id (random-uuid)
          !dep-vals (atom (mapv #(when (satisfies? IDeref %) (deref %)) deps))
          on-deps (fn [dep-vals] (rx (apply f dep-vals args)))]
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
      (remove-watch dep [::watch key]))))

(defn watch [key f & deps]
  (unwatch key)
  (swap! !watch-deps assoc key deps)
  (let [!dep-vals (atom (mapv #(when (satisfies? IDeref %) %) deps))
        on-deps (fn [dep-vals] (apply f dep-vals))]
    (doseq [[idx dep] (map-indexed vector deps)]
      (add-watch dep [::watch key] (fn [_ _ _ new-val] (swap! !dep-vals assoc idx new-val))))
    (add-watch !dep-vals [::watch key] (fn [_ _ _ new-val] (on-deps new-val)))))