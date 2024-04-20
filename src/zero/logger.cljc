(ns zero.logger
  #?(:cljs (:require-macros zero.logger))
  (:require
   #?(:clj [clojure.stacktrace :as stacktrace])))

(defmulti log (fn log-dispatch [level _msg & _opts] level))

(defmethod log :default [level msg {:keys [data ex file line]}]
  #?(:cljs (let [log-fn (case level
                          :error js/console.error
                          :warn js/console.warn
                          :info js/console.info
                          :debug js/console.debug)]
             (if (some? ex)
               (.call log-fn js/console msg data :line line :file file "\n" ex)
               (.call log-fn js/console msg data :line line :file file)))
     :clj (binding [*out* *err*]
            (printf "%s %s%n"
              (case level
                :error "ERROR"
                :warn "WARN"
                :info "INFO"
                :debug "DEBUG")
              (str msg))
            (doseq [[k v] (into {:line line :file file} data)]
              (printf "  %s %s%n" k v))
            (when ex
              (stacktrace/print-stack-trace ex))
            (flush))))

(defmacro error
  [msg & {:as opts}]
  `(log :error ~msg
     ~(merge opts (-> &form meta (select-keys [:file :line])) {:ns `'~(ns-name *ns*)})))

(defmacro warn
  [msg & {:as opts}]
  `(log :warn ~msg
     ~(merge opts (-> &form meta (select-keys [:file :line])) {:ns `'~(ns-name *ns*)})))

(defmacro info
  [msg & {:as opts}]
  `(log :info ~msg
     ~(merge opts (-> &form meta (select-keys [:file :line])) {:ns `'~(ns-name *ns*)})))

(defmacro debug
  [msg & {:as opts}]
  `(log :debug ~msg
     ~(merge opts (-> &form meta (select-keys [:file :line])) {:ns `'~(ns-name *ns*)})))

(defmacro spy
  ([x]
   `(let [v# ~x]
      (log :debug v#
        ~(merge
           {:data {:spy '~x}}
           (-> &form meta (select-keys [:file :line]))
           {:ns `'~(ns-name *ns*)}))
      v#))
  ([spy-name x]
   `(let [v# ~x]
      (log :debug v#
        ~(merge
           {:data {:spy spy-name}}
           (-> &form meta (select-keys [:file :line]))
           {:ns `'~(ns-name *ns*)}))
      v#)))