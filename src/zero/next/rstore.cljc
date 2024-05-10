(ns zero.next.rstore "
A simple data store suitable for reactive applications.
It's just an atom that tracks some extra stuff to enable
change tracking patches.
")

(declare ^:private calc-patch)

(defn- assoc-op
  [basis & {:as other-map}]
  {:pre [(map? basis) (map? other-map)]}
  (mapv persistent!
    (reduce-kv
      (fn [[merged changed-paths] k v]
        (let [current-val (get basis k)]
          (if (identical? current-val v)
            [merged changed-paths]
            [(assoc! merged k v)
             (conj! changed-paths [k])])))
      [(transient basis) (transient #{})]
      other-map)))

(defn- clear-op
  [basis & other-vals]
  {:pre [(or
           (set? basis)
           (map? basis)
           (and (vector? basis) (every? int? other-vals)))]}
  (cond
    (set? basis)
    [(apply disj basis other-vals) #{[]}]
    
    (map? basis)
    [(apply dissoc basis other-vals)
     (set (map vector other-vals))]
    
    (vector? basis)
    (let [num-to-clear (count other-vals)]
      (case num-to-clear
        0
        [basis #{}]
        
        1
        (let [idx (first other-vals)]
          [(into (subvec basis 0 idx) (subvec basis (inc idx)))
           #{[idx]}])
        
        :else
        [(let [vals-to-clear (set other-vals)]
           (->> basis
             (keep-indexed
               (fn [idx x]
                 (when-not (contains? vals-to-clear idx)
                   x)))
             vec))
         (set (map vector other-vals))]))))

(defn- conj-op
  [basis other-val]
  {:pre [(coll? basis)]}
  [(conj basis other-val)
   (cond-> #{[]}
     (vector? basis)
     (conj [(count basis)])
     
     (map? other-val)
     (conj [(first other-val)]))])

(defn- into-op
  [basis other-val]
  {:pre [(coll? basis)]}
  [(into basis other-val)
   (cond-> #{[]}
     (vector? basis)
     (into (map vector (range (count basis) (+ (count basis) (count other-val)))))
     
     (map? basis)
     (into (map (comp vector first) other-val)))])

(defn- call-op
  [basis f & args]
  {:pre [(ifn? f)]}
  [(apply f basis args)
   #{[]}])

(def default-operators
  {:assoc assoc-op
   :clear clear-op
   :conj conj-op
   :into into-op
   :call call-op})

(defn rstore
  [x & {:keys [operators extra-operators]}]
  {:pre [(map? x)]}
  (atom x
    :meta
    {::rstore? true
     ::watches (atom {})
     ::operators (-> (or default-operators operators) (merge  extra-operators))}))

(defn- calc-patch
  [operators basis patch]
  (reduce
    (fn [[patching changed-paths] {:keys [path change fnil]}]
      (let [[op & args] change
            op-fn (if (= :patch op)
                    (partial calc-patch operators)
                    (get operators op))
            _ (assert (ifn? op-fn))
            _ (assert (vector? path))
            inner-basis (get-in patching path)
            inner-basis (if (some? inner-basis) inner-basis fnil)
            [new-inner-basis inner-changed-paths] (apply op-fn inner-basis args)]
        [(if (seq path)
           (assoc-in patching path new-inner-basis)
           new-inner-basis)
         (concat changed-paths (map #(into path %) inner-changed-paths))]))
    [basis nil]
    (if (map? patch)
      [patch]
      patch)))

(defn- watched-sub-paths
  [watches path]
  (letfn [(collect-all-sub-paths [cur-path watch-node]
            (cons
              cur-path
              (mapcat
                (fn [[k sub-node]]
                  (collect-all-sub-paths (conj cur-path k) sub-node))
                watch-node)))]
    (collect-all-sub-paths path
      (get-in watches path))))

(defn- super-paths
  [path]
  (map #(subvec path 0 %) (range 0 (count path))))

(defn- all-paths-affected-by-change-at
  [watches path]
  (concat
    (super-paths path)
    (watched-sub-paths watches path)))

(defn patch!
  [!rstore patch]
  {:pre [(::rstore? (meta !rstore))]}
  (swap! !rstore
    (fn [basis]
      (let [rstore-meta (meta !rstore)
            watches @(::watches rstore-meta)
            operators (::operators rstore-meta)
            [patched changed-paths] (calc-patch operators basis patch)
            affected-paths (set (mapcat (partial all-paths-affected-by-change-at watches) (set changed-paths)))]
        (vary-meta patched assoc ::affected-paths affected-paths)))))

(defn watch-path
  [!rstore k path f]
  {:pre [(::rstore? (meta !rstore)) (vector? path)]}
  (swap! (::watches (meta !rstore)) assoc-in path {})
  (add-watch !rstore k
    (fn [k ref old-val new-val]
      (f k ref old-val new-val (some-> new-val meta ::affected-paths)))))