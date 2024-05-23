(ns zero.extras.util
  (:require 
   [zero.impl.base :refer [try-catch try-deref]]
   [subzero.logger :as log]))

(defn derived
  [f & deps]
  (fn [rx & args]
    (let [watch-id (random-uuid)
          !dep-vals (atom nil)
          on-deps (fn [dep-vals]
                    (try-catch
                      #(rx (apply f dep-vals args))
                      (fn [ex]
                        (log/error "Error in derived stream function" :ex ex))))]
      (doseq [[idx dep] (map-indexed vector deps)]
        (add-watch dep watch-id
          (fn [_ _ _ new-val]
            (swap! !dep-vals assoc idx new-val))))

      (reset! !dep-vals (mapv try-deref deps))
      (on-deps @!dep-vals)
      (add-watch !dep-vals watch-id
        (fn [_ _ _ new-val]
          (on-deps new-val)))

      (fn cleanup-derived []
        (doseq [dep deps]
          (remove-watch dep watch-id))))))

(defonce ^:private !watch-deps (atom {}))

(defn unwatch
  [key]
  (when-let [deps (get @!watch-deps key)]
    (doseq [dep deps]
      (remove-watch dep [::watch key])))
  (swap! !watch-deps dissoc key)
  nil)

(defn watch
  [key f & deps]
  (unwatch key)
  (swap! !watch-deps assoc key deps)
  (let [!dep-vals (atom nil)
        on-deps (fn [dep-vals]
                  (try-catch
                    #(apply f dep-vals)
                    (fn [ex]
                      (log/error "Error in watch function" :ex ex))))]
    (doseq [[idx dep] (map-indexed vector deps)]
      (add-watch dep [::watch key]
        (fn [_ _ _ new-val]
          (swap! !dep-vals assoc idx new-val))))

    (reset! !dep-vals (mapv try-deref deps))
    (add-watch !dep-vals [::watch key]
      (fn [_ _ _ new-val]
        (on-deps new-val))))
  nil)

(defn when-all
  [k f & deps]
  (let [init-dep-vals (map try-deref deps)]
    (if (every? some? init-dep-vals)
      (apply f init-dep-vals)
      (apply watch k
        (fn inner-fn [& dep-vals]
          (when (every? some? dep-vals)
            (unwatch k)
            (apply f dep-vals)
            true))
        deps)))
  nil)

(defn when-any
  [k f & deps]
  (let [init-dep-vals (map try-deref deps)]
    (if (some some? init-dep-vals)
      (apply f init-dep-vals)
      (apply watch k
        (fn [& dep-vals]
          (when (some some? dep-vals)
            (unwatch k)
            (apply f dep-vals)))
        deps)))
  nil)