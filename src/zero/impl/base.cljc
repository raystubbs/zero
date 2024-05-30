(ns ^:no-doc zero.impl.base
  (:require
    [subzero.logger :as log])
  #?(:clj
     (:import
      (clojure.lang Named)
      (java.io StringWriter Writer)
      (java.util Timer TimerTask))
     :cljs
     (:import
      (goog.string StringBuffer))))

(defn try-catch
  [try-fn catch-fn]
  (try
    (try-fn)
    (catch #?(:cljs :default :clj Exception) ex
      (catch-fn ex))))

(defn can-deref? [x]
  #?(:cljs (satisfies? IDeref x)
     :clj (instance? clojure.lang.IRef x)))

(defn can-watch? [x]
  #?(:cljs (satisfies? IWatchable x)
     :clj (instance? clojure.lang.IRef x)))

(defn try-deref [x]
  (when (can-deref? x)
    (deref x)))

(defprotocol IDisposable
  (dispose! [disposable]))

(defn named? [x]
  (or (string? x)
    #?(:cljs (satisfies? INamed x)
       :clj (instance? Named x))))

#?(:clj (defn str-writer [] (StringWriter.))
   :cljs (defn str-writer [] (->StringBufferWriter (StringBuffer.))))

#?(:clj (defn write [^Writer w & vs]
          (doseq [v vs]
            (if (char? v)
              (.write w (int v))
              (.write w (str v)))))
   :cljs (defn write [w & vs]
           (doseq [v vs]
             (-write w (str v)))))

#?(:clj (defn str-writer->str [w] (.toString w))
   :cljs (defn str-writer->str [w] (-> ^js w .-sb .toString)))

(defn dissoc-in
  [m [k & ks]]
  (if (seq ks)
    (let [new (dissoc-in (get m k) ks)]
      (if (seq new)
        (assoc m k new)
        (dissoc m k)))
    (dissoc m k)))


#?(:cljs
   (do
     (defn schedule
       [delay f & args]
       (js/setTimeout #(apply f args) delay))
     
     (defn schedule-every
       [delay f & args]
       (js/setInterval #(apply f args) delay))
     
     (defn cancel-scheduled
       [handle]
       (js/clearTimeout handle)))
   
   :clj
   (do
     (defonce ^:private timer (Timer.))
     
     (defn schedule
       [delay f & args]
       (let [tt (proxy [TimerTask] [] (run [] (apply f args)))]
         (.schedule timer ^long delay)
         tt))
     
     (defn schedule-every
       [delay f & args]
       (let [tt (proxy [TimerTask] [] (run [] (apply f args)))]
         (.schedule timer ^long delay ^long delay)
         tt))
     
     (defn cancel-scheduled
       [^TimerTask handle]
       (.cancel handle))))

#?(:clj
   (defn callable [x] x)
   
   :cljs
   (defn callable [x]
     (js* "new Proxy(~{}, ~{})" x
       #js{:apply
           (fn [target _ args]
             (apply target args))})))

(defn convert-patch "
Convert from legacy zero.extras.db/patch! format to subzero.rstore/patch!
format for any changes not in the correct format.
"
  [patch]
  (cond
    (and (map? patch) (or (contains? patch :subpatch) (contains? patch :change)))
    patch

    (map? patch)
    (cond->
      (cond
        (ifn? (:fn patch))
        {:path (:path patch)
         :change (into [:call (:fn patch)] (:args patch))}

        (map? (:merge patch))
        {:path (:path patch)
         :change [:assoc (:merge patch)]}

        (coll? (:clear patch))
        {:path (:path patch)
         :change (into [:clear] (:clear patch))}

        (contains? patch :conj)
        {:path (:path patch)
         :change (into [:conj (:conj patch)])}

        (coll? (:into patch))
        {:path (:path patch)
         :change [:into (:into patch)]}

        (coll? (:patch patch))
        {:path (:path patch)
         :subpatch (convert-patch (:patch patch))}

        :else
        {:path (:path patch)
         :change [:value (:value patch)]})
      (contains? patch :fnil)
      (assoc :fnil (:fnil patch)))

    (sequential? patch)
    (mapv convert-patch patch)

    :else
    (throw (ex-info "Invalid patch" {:patch patch}))))