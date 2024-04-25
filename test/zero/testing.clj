(ns zero.testing
  (:require
   [clojure.test]))

(defmacro testing
  [s & body]
  (if (:ns &env)
    `(js/describe s (fn [] (js/Promise.all (into-array ~@(vec body)))))
    `(clojure.test/testing ~s ~@body)))

(defmacro deftest
  {:clj-kondo/lint-as 'clojure.test/deftest}
  [name & body]
  (if (:ns &env)
    `(js/it ~(str *ns* "/" (clojure.core/name name)) (fn ~name [] ~@body))
    `(clojure.test/deftest ~name ~@body)))

(defmacro is
  [& args]
  (if (:ns &env)
    `(clojure.core/assert ~@args)
    `(clojure.test/is ~@args)))