(ns zero.extras.db
  (:require
    [zero.core :as z]))

(defonce !db (atom {}))
(defonce ^:private !db-watches (atom {}))

(z/reg-stream
  :ze.db/path
  (fn [rx path & {:keys [transform]}]
    (let [path (vec path)
          watch-node-path (if (empty? path) [] (into [:sub] (interpose :sub path)))
          rx (if (ifn? transform) (comp rx transform) rx)]
      (rx (get-in @!db path))
      (swap! !db-watches update-in (conj watch-node-path :rxs) (fnil conj #{}) rx)
      (fn db-stream-cleanup []
        (let [watch-node (update (get-in @!db-watches watch-node-path) :rxs disj rx)]
          (swap! !db-watches assoc-in watch-node-path watch-node)
          (loop [cur-watch-node watch-node
                 cur-watch-path watch-node-path]
            (cond
              (and (seq cur-watch-path) (empty? (:rxs cur-watch-node)) (empty? (:sub cur-watch-node)))
              (let [parent-watch-path (-> cur-watch-path pop pop)
                    parent-watch-node (-> (get-in @!db-watches parent-watch-path)
                                        (update :sub dissoc (-> cur-watch-path peek)))]
                (swap! !db-watches assoc parent-watch-path parent-watch-node)
                (recur parent-watch-node parent-watch-path))

              :else
              nil)))))))

(defn get [path]
  (get-in @!db path))

(z/reg-injector
  :ze.db/path
  (fn [_ path]
    (get-in @!db path)))

(z/reg-injector
  :ze.db/prefixed-patch
  (fn [_ prefix patch]
    (mapv
      (fn [patch]
        (update patch :path (partial into (vec prefix))))
      patch)))

(defn- affected-paths [changed-path]
  (concat
    (map #(subvec changed-path 0 %) (range 0 (count changed-path)))
    (letfn [(collect-all-sub-paths [cur-path watch-node]
              (cons
                cur-path
                (mapcat
                  (fn [[k sub-node]]
                    (collect-all-sub-paths (conj cur-path k) (:sub sub-node)))
                  watch-node)))]
      (collect-all-sub-paths changed-path
        (if (empty? changed-path)
          @!db-watches
          (get-in @!db-watches (into [:sub] (interpose :sub changed-path))))))))

(defn patch! [patch]
  (let [[new-db affected-paths]
        (reduce
          (fn [[db-agg affected-paths-agg] {:keys [path fnil] :as patch-entry}]
            (let [path (vec path)
                  orig-target-val (get-in db-agg path)
                  fnil-target-val (if (nil? orig-target-val) fnil orig-target-val)
                  new-target-val (cond
                                   (ifn? (:fn patch-entry)) (apply (:fn patch-entry) fnil-target-val (:args patch-entry))
                                   (map? (:merge patch-entry)) (merge fnil-target-val (:merge patch-entry))
                                   (coll? (:clear patch-entry)) (apply (cond (set? fnil-target-val) disj (map? fnil-target-val) dissoc :else identity) fnil-target-val (:clear patch-entry))
                                   (some? (:conj patch-entry)) (conj fnil-target-val (:conj patch-entry))
                                   (coll? (:into patch-entry)) (into fnil-target-val (:into patch-entry))
                                   :else (:value patch-entry))]
              [(if (empty? path)
                 new-target-val
                 (assoc-in db-agg path new-target-val))
               (into affected-paths-agg (affected-paths path))]))
          [@!db #{}]
          patch)]
    (reset! !db new-db)
    (doseq [path affected-paths
            rx (:rxs (get-in @!db-watches (if (empty? path) [] (into [:sub] (interpose :sub path)))))]
      (rx (get-in @!db path)))))

(z/reg-effect
  :ze.db/patch
  (fn [patch]
    (patch! patch)))
