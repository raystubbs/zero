(ns zero.impl.logger
  (:require
   [zero.impl.base :refer [env-case]]))

(defn log*
  [level obj]
  ;; TODO: plug into log4j if available
  (binding [*out* *err*]
    (printf "%s %s%n"
      (case level
        :error "ERROR"
        :warn "WARN"
        :info "INFO"
        :debug "DEBUG")
      (pr-str obj))
    (flush)))

(defmacro error
  [& {:as kvs}]
  `(env-case
     :cljs (js/console.error ~kvs)
     :clj (log* :error ~kvs)))

(defmacro warn
  [& {:as kvs}]
  `(env-case
     :cljs (js/console.warn ~kvs)
     :clj (log* :warn ~kvs)))

(defmacro info
  [& {:as kvs}]
  `(env-case
     :cljs (js/console.info ~kvs)
     :clj (log* :info ~kvs)))

(defmacro debug
  [& {:as kvs}]
  `(env-case
     :cljs (js/console.debug ~kvs)
     :clj (log* :debug ~kvs)))

(defmacro spy
  ([x]
   `(let [v# ~x]
      (debug :spy '~x :value v#)
      v#))
  ([spy-name x]
   `(let [v# ~x]
      (debug :spy ~spy-name :value v#)
      v#)))