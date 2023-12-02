(ns zero.impl.bindings
  (:require
    [zero.impl.injection :refer [apply-injections]]
    [cljs.core.async :refer [chan put! alts! go]]))

(defonce !stream-states (atom {}))
(defonce !stream-fns (atom {}))

(defn- kill-stream [stream-ident]
  (let [{:keys [kill-ch kill-fn]} (get @!stream-states stream-ident)]
    (when kill-ch (put! kill-ch true))
    (when (fn? kill-fn)
      (try
        (kill-fn)
        (catch :default e
          (js/console.error "Error in stream cleanup fn" {:stream-key (nth stream-ident 0) :args (nth stream-ident 1)} e)))))
  (swap! !stream-states dissoc stream-ident))

(defn- boot-stream [[stream-key args :as stream-ident] new-watch]
  (swap! !stream-states assoc stream-ident {:watches (conj {} new-watch)})
  (go
    (let [!stream-ch (chan)
          !kill-ch (chan)
          stream-fn (or (get @!stream-fns stream-key) (throw (ex-info "No stream registered for key" {:stream-key stream-key})))
          kill-fn (apply stream-fn #(put! !stream-ch (if (some? %) % ::nil)) (apply-injections args {}))]
      (swap! !stream-states update stream-ident merge
        {:kill-ch !kill-ch
         :kill-fn kill-fn
         :stream-ch !stream-ch})

      (loop [[value ch] (alts! [!stream-ch !kill-ch])]
        (if (= ch !kill-ch)
          nil
          (when (some? value)
            (let [new-val (if (= value ::nil) nil value)
                  {old-val :current watches :watches} (get @!stream-states stream-ident)]
              (swap! !stream-states assoc-in [stream-ident :current] new-val)
              (doseq [[[binding key] f] watches]
                (try
                  (f key binding old-val new-val)
                  (catch :default e
                    (js/console.error
                      "Error in stream watcher"
                      {:stream stream-ident}
                      e)))))
            (recur (alts! [!stream-ch !kill-ch])))))
      true)))

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
      (if (nil? (get @!stream-states [stream-key args]))
        (boot-stream [stream-key args] [[this key] actual-fun])
        (swap! !stream-states assoc-in [[stream-key args] :watches [this key]] actual-fun))))
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
          ['bnd]
          (when (seq props)
            [props])
          args)))))

(defn reg-stream [stream-key f]
  (swap! !stream-fns assoc stream-key f)
  (doseq [[[_ args :as stream-ident] {!stream-ch :stream-ch kill-fn :kill-fn}] (filter #(= stream-key (-> % key first)) @!stream-states)]
    (when (fn? kill-fn)
      (try
        (kill-fn)
        (catch :default e
          (js/console.error "Error in stream cleanup fn" {:stream-key (nth stream-ident 0) :args (nth stream-ident 1)} e))))
    (swap! !stream-states assoc-in [stream-ident :kill-fn]
      (apply f #(put! !stream-ch (if (some? %) % ::nil)) (apply-injections args {})))))