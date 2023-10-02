(ns zero.impl.bindings
  (:require
   [zero.impl.injection :refer [with-injections]]
   [cljs.core.async :refer [chan go-loop put! alts! <! go]]))

(defonce !stream-states (atom {}))
(defmulti stream identity)

(def || `||)

(defn- boot-stream [[stream-key args :as stream-ident] new-watch]
  (go
    (let [args-w-injections (<! (with-injections args {} {:timeout 30000}))]
      (cond
        (= args-w-injections ::error)
        false
        
        :else
        (let [!stream-ch (chan)
              !kill-ch (chan)
              kill-fn (stream stream-key #(put! !stream-ch (if (some? %) % ::nil)) args-w-injections)]
          (swap! !stream-states assoc stream-ident
                 {:kill-ch !kill-ch
                  :kill-fn kill-fn
                  :stream-ch !stream-ch
                  :watches (cond-> {} (some? new-watch) (conj new-watch))
                  :current nil})

          (loop [[value ch] (alts! [!stream-ch !kill-ch])]
            (if (= ch !kill-ch)
              nil
              (when value
                (let [new-val (if (= value ::nil) nil value)
                      {old-val :current watches :watches} (get @!stream-states stream-ident)]
                  (swap! !stream-states assoc-in [stream-ident :current] new-val)
                  (doseq [[[binding key] f] watches]
                    (try
                      (f key binding old-val new-val)
                      (catch :default e
                        (js/console.error
                         "Error in stream watcher"
                         (prn {:stream stream-ident})
                         e)))))
                (recur (alts! [!stream-ch !kill-ch])))))
          true)))))

(defn- kill-stream [stream-ident]
  (let [{:keys [kill-ch kill-fn]} (get @!stream-states stream-ident)]
    (put! kill-ch true)
    (when (fn? kill-fn) (kill-fn)))
  (swap! @!stream-states dissoc stream-ident))

(deftype Binding [stream-key args default]
  IDeref
  (-deref [_this]
    (get-in @!stream-states [[stream-key args] :current] default))
  
  IWatchable
  (-add-watch [this key f]
    (let [old-watches (get-in @!stream-states [[stream-key args] :watches])]
      (if (empty? old-watches)
        (boot-stream [stream-key args] [[this key] f])
        (swap! !stream-states assoc-in [[stream-key args] :watches [this key]] f))))
  (-remove-watch [this key]
    (let [old-watches (get-in @!stream-states [[stream-key args] :watches])
          new-watches (dissoc old-watches [this key])]
      (if (empty? new-watches)
        (kill-stream [stream-key args])
        (swap! !stream-states assoc-in [[stream-key args] :watches] new-watches))))
  
  IEquiv
  (-equiv [_this other]
    (and
     (= stream-key (.-stream-key other))
     (= args (.-args other))
     (= default (.-default other))))
  
  IHash
  (-hash [_this]
    (hash [stream-key args default]))
  
  IPrintWithWriter
  (-pr-writer [_this writer opts] 
    (-pr-writer (concat (list 'bnd args) (when default [|| default]))
                writer opts)))