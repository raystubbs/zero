(ns zero.impl.base
  (:require
   [clojure.string :as str]))

(defn words [s]
  (str/split s #"\W+|(?<=[a-z])(?=[A-Z])"))

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