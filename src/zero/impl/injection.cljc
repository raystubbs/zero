(ns ^:no-doc zero.impl.injection
  (:require
   [clojure.walk :as walk]
   [subzero.logger :as log]
   [zero.impl.base :refer [try-catch]]
   [zero.core :as-alias z]))

(defprotocol CustomInject
  (custom-inject [ci inject]))

(defrecord Injection [key args])

(defn apply-injections [!db context x]
  (let [!cache (atom {})
        walker (fn walker [form]
                 (cond
                   (instance? Injection form)
                   (let [inj ^Injection form
                         cache-key [(.-key inj) (.-args inj)]]
                     (if (contains? @!cache cache-key)
                       (get @!cache cache-key)
                       (try-catch
                         (fn []
                           (let [injector (or (get-in @!db [::z/state ::injection-handlers (.-key inj)])
                                            (throw (ex-info "No injector registered for key" {:key (.-key inj)})))
                                 r (apply injector context (walk/walk walker identity (.-args inj)))]
                             (swap! !cache assoc cache-key r)
                             r))
                         (fn [ex]
                           (log/error "Error injecting"
                             :data {:injection inj}
                             :ex ex)))))

                   (satisfies? CustomInject form)
                   (custom-inject form #(walker %))

                   :else
                   (walk/walk walker identity form)))]
    (walker x)))