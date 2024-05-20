(ns ^:no-doc zero.impl.injection
  (:require
   [clojure.walk :refer [postwalk]]
   [subzero.logger :as log]
   [zero.impl.base :refer [try-catch]]
   [zero.core :as-alias z]))

(defrecord Injection [key args])

(defn apply-injections [!db context x]
  (let [!cache (atom {})]
    (postwalk
      (fn walker [form]
        (if-not (instance? Injection form)
          form
          (let [inj ^Injection form
                cache-key [(.-key inj) (.-args inj)]]
            (if (contains? @!cache cache-key)
              (get @!cache cache-key)
              (try-catch
                (fn []
                  (let [injector (or (get-in @!db [::z/state ::injection-handlers (.-key inj)])
                                   (throw (ex-info "No injector registered for key" {:key (.-key inj)})))
                        r (apply injector context (postwalk walker (.-args inj)))]
                    (swap! !cache assoc cache-key r)
                    r))
                (fn [ex]
                  (log/error "Error injecting"
                    :data {:injection inj}
                    :ex ex)))))))
      x)))