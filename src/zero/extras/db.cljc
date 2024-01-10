(ns zero.extras.db
  (:require
    [zero.config :as zc]))

(defonce !db (atom {}))
(defonce ^:private !db-watches (atom {}))

(zc/reg-streams
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

(zc/reg-injections
  :ze.db/path
  (fn [_ path]
    (get-in @!db path)))

(defn- super-paths [path]
  (map #(subvec path 0 %) (range 0 (count path))))

(defn- watched-sub-paths [path]
  (letfn [(collect-all-sub-paths [cur-path watch-node]
            (cons
              cur-path
              (mapcat
                (fn [[k sub-node]]
                  (collect-all-sub-paths (conj cur-path k) sub-node))
                (:sub watch-node))))]
    (collect-all-sub-paths path
      (if (empty? path)
        @!db-watches
        (get-in (:sub @!db-watches) (interpose :sub path))))))

(defn- paths-affected-by-change-to [path]
  (concat
    (super-paths path)
    (watched-sub-paths path)))

(defn apply-patch [m patch]
  (reduce
    (fn [[m-agg affected-paths-agg] {:keys [path fnil] :as patch-entry}]
      (let [path (vec path)
            orig-target-val (get-in m-agg path)
            fnil-target-val (if (nil? orig-target-val) fnil orig-target-val)
            
            [new-target-val new-affected-paths]
            (cond
              (ifn? (:fn patch-entry))
              [(apply (:fn patch-entry) fnil-target-val (:args patch-entry))
               (paths-affected-by-change-to path)]

              (map? (:merge patch-entry))
              [(merge fnil-target-val (:merge patch-entry))
               (concat
                 (super-paths path)
                 [path]
                 (mapcat #(watched-sub-paths (conj path %)) (keys (:merge patch-entry))))]

              (coll? (:clear patch-entry))
              (cond
                (set? fnil-target-val)
                [(apply disj fnil-target-val (:clear patch-entry))
                 (paths-affected-by-change-to path)]

                (map? fnil-target-val)
                [(apply dissoc fnil-target-val (:clear patch-entry))
                 (cond
                   (seq (:clear patch-entry))
                   (concat
                     (super-paths path)
                     [path]
                     (mapcat #(watched-sub-paths (conj path %)) (:clear patch-entry)))

                   (not= orig-target-val fnil-target-val)
                   (paths-affected-by-change-to path)

                   :else
                   nil)]

                (vector? fnil-target-val)
                (let [to-clear (set (:clear patch-entry))]
                  [(cond
                     (= 0 (count to-clear))
                     fnil-target-val

                     (= 1 (count to-clear))
                     (let [idx (first to-clear)]
                       (into (subvec fnil-target-val 0 idx) (subvec fnil-target-val (inc idx))))

                     :else
                     (->> fnil-target-val
                       (keep-indexed
                         (fn [idx x]
                           (when-not (contains? to-clear idx)
                             x)))
                       vec))
                   (cond
                     (seq to-clear)
                     (concat
                       (super-paths path)
                       [path]
                       (mapcat #(watched-sub-paths (conj path %)) to-clear))

                     (not= orig-target-val fnil-target-val)
                     (paths-affected-by-change-to path)

                     :else
                     nil)])

                :else
                [orig-target-val nil])

              (some? (:conj patch-entry))
              [(conj fnil-target-val (:conj patch-entry))
               (paths-affected-by-change-to path)]

              (coll? (:into patch-entry))
              [(into fnil-target-val (:into patch-entry))
               (paths-affected-by-change-to path)]

              (coll? (:patch patch-entry))
              (let [[patched-target-val affected-target-paths] (apply-patch fnil-target-val (:patch patch-entry))]
                [patched-target-val
                 (concat
                   (super-paths path)
                   (mapcat #(watched-sub-paths (into path %)) affected-target-paths))])

              :else
              [(:value patch-entry)
               (paths-affected-by-change-to path)])]
        [(if (empty? path)
           new-target-val
           (assoc-in m-agg path new-target-val))
         (into affected-paths-agg new-affected-paths)]))
    [m #{}]
    patch))

(defn patch! [patch]
  (let [[new-db affected-paths] (apply-patch @!db patch)]
    (reset! !db new-db)
    (doseq [path affected-paths
            rx (:rxs (get-in @!db-watches (if (empty? path) [] (into [:sub] (interpose :sub path)))))]
      (rx (get-in @!db path)))))

(zc/reg-effects
  :ze.db/patch
  (fn [patch]
    (patch! patch)))
