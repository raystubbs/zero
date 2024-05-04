(ns ^:no-doc zero.impl.bindings
  (:require
   [zero.config :as config]
   [zero.impl.injection :refer [apply-injections]]
   [zero.impl.base :refer [try-catch]]
   [zero.logger :as log]))

(defonce !stream-states (atom {}))

(defn- rx-fn [stream-ident]
  (fn rx [new-val]
    (let [{old-val :current watches :watches} (get @!stream-states stream-ident)]
      (swap! !stream-states assoc-in [stream-ident :current] new-val)
      (doseq [[[binding key] f] watches]
        (try-catch
          (f key binding old-val new-val)
          (log/error "Error in stream watcher"
            :data {:stream stream-ident}
            :ex %))))))

(defprotocol IBinding
  (^:private -bnd-deref [b])
  (^:private -bnd-add-watch [b key f])
  (^:private -bnd-remove-watch [b key])
  (^:private -bnd-equiv [b other])
  (^:private -bnd-hash [b])
  (^:private -bnd-write ^String [b]))

#?(:cljs
   (deftype Binding [props stream-key args]
     IDeref
     (-deref [this] (-bnd-deref this))

     IWatchable
     (-add-watch [this key f] (-bnd-add-watch this key f))
     (-remove-watch [this key] (-bnd-remove-watch this key))

     IEquiv
     (-equiv [this ^Binding other] (-bnd-equiv this other))

     IHash
     (-hash [this] (-bnd-hash this))

     IPrintWithWriter
     (-pr-writer [this writer opts]
       (-write writer (-bnd-write this))))

   :clj
   (deftype Binding [props stream-key args]
     clojure.lang.IDeref
     (deref [this] (-bnd-deref this))

     clojure.lang.IRef
     (addWatch [this key f] (-bnd-add-watch this key f))
     (removeWatch [this key] (-bnd-remove-watch this key))
     (getWatches [this] (throw (UnsupportedOperationException.)))
     (getValidator [this] (throw (UnsupportedOperationException.)))
     (setValidator [this f] (throw (UnsupportedOperationException.)))

     Object
     (equals [this other] (-bnd-equiv this other))
     (toString [this] (-bnd-write this))
     (hashCode [this] (-bnd-hash this))))

(extend-type Binding
  IBinding
  (-bnd-deref [^Binding b]
    (let [v (get-in @!stream-states [[(.-stream-key b) (.-args b)] :current] (:default (.-props b)))]
      (if (and (:default-nil? (.-props b)) (nil? v)) (:default (.-props b)) v)))
  (-bnd-add-watch [^Binding b key f]
    (let [actual-fun (if (:default-nil? (.-props b))
                       (fn [ref key old-val new-val]
                         (f ref key old-val (if (nil? new-val) (:default (.-props b)) new-val)))
                       f)]
      (let [stream-ident [(.-stream-key b) (.-args b)]
            [old _] (swap-vals! !stream-states assoc-in [stream-ident :watches [b key]] actual-fun)]
        (when (nil? (get old stream-ident))
          (try-catch
            (let [stream-fn (or (get-in @config/!registry [:stream-handlers (.-stream-key b)]) (throw (ex-info "No stream registered for key" {:stream-key (.-stream-key b)})))
                  kill-fn (apply stream-fn (rx-fn stream-ident) (apply-injections (.-args b) {}))]
              (swap! !stream-states assoc-in [stream-ident :kill-fn] kill-fn)
              nil)
            (do
              (log/error "Error booting stream"
                :data {:stream (.-stream-key b)
                       :args (.-args b)}
                :ex %)
              (swap! !stream-states dissoc stream-ident)))))))
  (-bnd-remove-watch [^Binding b key]
    (let [stream-ident [(.-stream-key b) (.-args b)]
          [old new] (swap-vals! !stream-states
                      (fn [stream-states]
                        (let [new-watches (dissoc (get-in stream-states [stream-ident :watches]) [b key])]
                          (if (empty? new-watches)
                            (dissoc stream-states stream-ident)
                            (assoc-in stream-states [stream-ident :watches] new-watches)))))]
      (when (nil? (get new stream-ident))
        (when-let [kill-fn (get-in old [stream-ident :kill-fn])]
          (try-catch
            (kill-fn)
            (log/error "Error in stream cleanup fn"
              :data {:stream (nth stream-ident 0)
                     :args (nth stream-ident 1)}
              :ex %))))))
  (-bnd-equiv [^Binding b ^Binding other]
    (and
      (instance? Binding other)
      (= (.-stream-key b) (.-stream-key other))
      (= (.-args b) (.-args other))
      (= (.-props b) (.-props other))))
  (-bnd-hash [^Binding b]
    (hash [(.-props b) (.-stream-key b) (.-args b)]))
  (-bnd-write [^Binding b]
    (pr-str
      (concat
        ['bnd (.-stream-key b)]
        (when (seq (.-props b))
          [(.-props b)])
        (.-args b)))))

(defn- update-streams! [{old-stream-handlers :stream-handlers} {new-stream-handlers :stream-handlers}]
  (when-not (identical? old-stream-handlers new-stream-handlers)
    (doseq [[stream-key stream-handler] new-stream-handlers
            :when (not= stream-handler (get old-stream-handlers stream-key))
            [[_ args :as stream-ident] {kill-fn :kill-fn}] (filter #(= stream-key (-> % key first)) @!stream-states)]
      (when (fn? kill-fn)
        (try-catch
          (kill-fn)
          (log/error "Error in stream cleanup fn"
            :data {:stream stream-key :args args}
            :ex %)))
      (try-catch
        (swap! !stream-states assoc-in [stream-ident :kill-fn]
          (apply stream-handler (rx-fn stream-ident) (apply-injections args {}))) 
        (log/error "Error in stream boot fn, hot swap failed"
          :data {:stream stream-key :args args}
          :ex %)))))
(add-watch config/!registry ::update-streams #(update-streams! %3 %4))
(update-streams! {} @config/!registry)

#?(:clj
   (defmethod print-method Binding [bnd w] (.write w (-bnd-write bnd))))