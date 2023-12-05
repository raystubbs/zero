(ns zero.extras.stream)

(defn derived [f & deps]
  (fn [rx & args]
    (let [watch-id (random-uuid)
          !dep-vals (atom (mapv deref deps))
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
