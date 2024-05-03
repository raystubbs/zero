(ns zero.impl.base
  #?(:cljs (:require-macros zero.impl.base))
  (:require
   [clojure.string :as str])
  #?(:clj
     (:import
      (clojure.lang Named)
      (java.io StringWriter Writer))
     :cljs
     (:import
      (goog.string StringBuffer))))

(defn words [s]
  (str/split s #"\s+|(?<=[^_-])[_-]+(?=[^_-])|(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])"))

(defn cammel-case [s]
  (let [[first-word & rest-words] (words s)]
    (str
      (str/lower-case first-word)
      (->> rest-words
        (map
          (fn [word]
            (str (str/upper-case (subs word 0 1)) (str/lower-case (subs word 1)))))
        str/join))))

(defn snake-case [s]
  (->> s
    words
    (map str/lower-case)
    (str/join "-")))

(defn index-of [pred coll]
  (->>
    (keep-indexed
      (fn [idx v] (when (pred v) idx))
      coll)
    first))

(defn env-type [env] (if (:ns env) :cljs :clj))

#?(:clj 
   (defmacro env-case
     [& {:as clauses}]
     (clojure.core/get clauses (env-type &env))))

#?(:clj
   (defmacro try-catch
     [try-body catch-body]
     `(env-case
        :clj (try ~try-body (catch Throwable ~'% ~catch-body))
        :cljs (try ~try-body (catch :default ~'% ~catch-body)))))

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