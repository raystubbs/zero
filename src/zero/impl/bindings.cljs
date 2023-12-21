(ns zero.impl.bindings
  (:require
    [zero.config :as config]
    [zero.impl.injection :refer [apply-injections]]
    [zero.impl.base :refer [log!]]))

(defonce !stream-states (atom {}))

(defn- kill-stream [stream-ident]
  (when-let [kill-fn (get-in @!stream-states [stream-ident :kill-fn])]
    (try
      (kill-fn)
      (catch :default e
        (log! :error "Error in stream cleanup fn" {:stream-key (nth stream-ident 0) :args (nth stream-ident 1)} e))))
  (swap! !stream-states dissoc stream-ident)
  nil)

(defn- rx-fn [stream-ident]
  (fn rx [new-val]
    (let [{old-val :current watches :watches} (get @!stream-states stream-ident)]
      (swap! !stream-states assoc-in [stream-ident :current] new-val)
      (doseq [[[binding key] f] watches]
        (try
          (f key binding old-val new-val)
          (catch :default e
            (log! :error "Error in stream watcher" {:stream stream-ident} e)))))))

(defn- boot-stream [[stream-key args :as stream-ident]]
  (swap! !stream-states assoc stream-ident {:watches {}})
  (let [stream-fn (or (get-in @config/!registry [:stream-handlers stream-key]) (throw (ex-info "No stream registered for key" {:stream-key stream-key})))
        kill-fn (apply stream-fn (rx-fn stream-ident) (apply-injections args {}))]
    (swap! !stream-states assoc-in [stream-ident :kill-fn] kill-fn)
    nil))

(deftype Binding [props stream-key args]
  IDeref
  (-deref [_this]
    (let [v (get-in @!stream-states [[stream-key args] :current] (:default props))]
      (if (and (:default-nil? props) (nil? v)) (:default props) v)))

  IWatchable
  (-add-watch [this key f]
    (let [actual-fun (if (:default-nil? props)
                       (fn [ref key old-val new-val]
                         (f ref key old-val (if (nil? new-val) (:default props) new-val)))
                       f)]
      (when (nil? (get @!stream-states [stream-key args]))
        (boot-stream [stream-key args]))
      (swap! !stream-states assoc-in [[stream-key args] :watches [this key]] actual-fun)))
  (-remove-watch [this key]
    (let [old-watches (get-in @!stream-states [[stream-key args] :watches])
          new-watches (dissoc old-watches [this key])]
      (if (empty? new-watches)
        (kill-stream [stream-key args])
        (swap! !stream-states assoc-in [[stream-key args] :watches] new-watches))))

  IEquiv
  (-equiv [_this ^Binding other]
    (and
      (instance? Binding other)
      (= stream-key (.-stream-key other))
      (= args (.-args other))
      (= props (.-props other))))

  IHash
  (-hash [_this]
    (hash [props stream-key args]))

  IPrintWithWriter
  (-pr-writer [_this writer opts]
    (-write writer
      (pr-str
        (concat
          ['bnd stream-key]
          (when (seq props)
            [props])
          args)))))

(defn- update-streams! [{old-stream-handlers :stream-handlers} {new-stream-handlers :stream-handlers}]
  (when-not (identical? old-stream-handlers new-stream-handlers)
    (doseq [[stream-key stream-handler] new-stream-handlers
            :when (not= stream-handler (get old-stream-handlers stream-key))
            [[_ args :as stream-ident] {kill-fn :kill-fn}] (filter #(= stream-key (-> % key first)) @!stream-states)]
      (when (fn? kill-fn)
        (try
          (kill-fn)
          (catch :default e
            (log! :error "Error in stream cleanup fn" {:stream-key (nth stream-ident 0) :args (nth stream-ident 1)} e))))
      (swap! !stream-states assoc-in [stream-ident :kill-fn]
        (apply stream-handler (rx-fn stream-ident) (apply-injections args {}))))))
(add-watch config/!registry ::update-streams #(update-streams! %3 %4))
(update-streams! {} @config/!registry)