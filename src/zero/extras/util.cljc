(ns zero.extras.util
  (:require
   [clojure.string :as str]
   [zero.config :as zc]
   [zero.core :as z]
   [zero.impl.base :refer [try-catch try-deref]]
   [zero.impl.logger :as log]))

(zc/reg-injections
  ::ctx
  (fn [context & path]
    (get-in context path))

  ::act
  (fn [_ & args]
    (apply z/act args))

  ::<<
  (fn [_ & args]
    (apply z/<< args)))

(zc/reg-effects
  ::cond
  (fn [& cases]
    (when-let [[_ & effects] (first (filter first cases))]
      ((apply z/act effects) nil)))

  ::effects
  (fn [effects]
    ((apply z/act effects) nil)))

(defn <<act [& args]
  (apply z/<< ::act args))

(defn <<ctx [& path]
  (apply z/<< ::ctx path))

(defn <<< [& args]
  (apply z/<< ::<< args))

(defn derived [f & deps]
  (fn [rx & args]
    (let [watch-id (random-uuid)
          !dep-vals (atom nil)
          on-deps (fn [dep-vals]
                    (try-catch
                      (rx (apply f dep-vals args)) 
                      (log/error :exception %)))]
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
                  (try-catch
                    (apply f dep-vals) 
                    (log/error :exception %)))]
    (doseq [[idx dep] (map-indexed vector deps)]
      (add-watch dep [::watch key]
        (fn [_ _ _ new-val]
          (swap! !dep-vals assoc idx new-val))))

    (reset! !dep-vals (mapv try-deref deps))
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