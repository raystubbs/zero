(ns ^:no-doc zero.impl.actions
  (:require
    [zero.impl.injection :refer [apply-injections]]
    [zero.config :as config])
  (:import
    (clojure.lang IFn)))

(deftype Action [props effects]
  Object
  (equals [action other]
    (and (instance? Action other)
      (= (.-props action) (.-props other))
      (= (.-effects action) (.-effects other))))
  (hashCode [action]
    (hash [(.-effects action) (.-props action)]))
  (toString [action]
    (pr-str
      (concat
        ['act]
        (when (seq (.-props action)) [(.-props action)])
        (.-effects action))))

  IFn
  (invoke [_ context]
    (doseq [[effect-key & args] (apply-injections effects context)]
      (let [effect-fn (or (get-in @config/!registry [:effect-handlers effect-key])
                        (throw (ex-info "No effect registered for key" {:effect-key effect-key})))]
        (apply effect-fn args)))))

(defmethod print-method Action [act w] (.write w (.toString act)))