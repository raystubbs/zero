(ns zero.impl.base
  (:require
    [clojure.string :as str]))

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

(defn log! [level & items]
  #?(:cljs (case level
             :error (apply js/console.error items)
             :info (apply js/console.info items)
             :debug (apply js/console.debug items))
     :clj  (do
             ;; FIXME: how should this be handled?  Maybe something in zero.config?
             (print (-> level name str/upper-case) " " (str/join " " items)))))