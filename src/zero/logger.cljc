(ns zero.logger
  #?(:cljs (:require-macros zero.logger)))

#?(:clj
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
   :cljs
   (defn log*
     [level obj]
     (case level
       :error (js/console.error obj)
       :warn (js/console.warn obj)
       :info (js/console.info obj)
       :debug (js/console.debug obj))))

(defmacro error
  [& {:as kvs}]
  `(log* :error ~kvs))

(defmacro warn
  [& {:as kvs}]
  `(log* :warn ~kvs))

(defmacro info
  [& {:as kvs}]
  `(log* :info ~kvs))

(defmacro debug
  [& {:as kvs}]
  `(log* :debug ~kvs))

(defmacro spy
  ([x]
   `(let [v# ~x]
      (debug :spy '~x :value v#)
      v#))
  ([spy-name x]
   `(let [v# ~x]
      (debug :spy ~spy-name :value v#)
      v#)))