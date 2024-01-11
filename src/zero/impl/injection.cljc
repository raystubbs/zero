(ns zero.impl.injection
  (:require
   [clojure.walk :refer [postwalk]]
   [zero.impl.base :refer [log!]]
   [zero.config :as config]))

(defprotocol IInjection
  (^:private -inj-injected [inj context !cache])
  (^:private -inj-equiv [inj other])
  (^:private -inj-hash [inj])
  (^:private -inj-write [inj]))

#?(:cljs
   (deftype Injection [injector-key args]
     IEquiv
     (-equiv [this other] (-inj-equiv this other))

     IHash
     (-hash [this] (-inj-hash this))

     IPrintWithWriter
     (-pr-writer [this writer _opts]
       (-write writer (-inj-write this))))

   :clj
   (deftype Injection [injector-key args]
     Object
     (equals [this other] (-inj-equiv this other))
     (toString [this] (-inj-write this))
     (hashCode [this] (-inj-hash this))))

(extend-type Injection
  IInjection
  (-inj-injected [^Injection inj context !cache]
    (let [cache-key [(.-injector-key inj) (.-args inj)]]
      (if (contains? @!cache cache-key)
        (get @!cache cache-key)
        (try
          (let [injector (or (get-in @config/!registry [:injection-handlers (.-injector-key inj)])
                           (throw (ex-info "No injector registered for key" {:injector-key (.-injector-key inj)})))
                r (apply injector context (postwalk #(if (instance? Injection %) (-inj-injected % context !cache) %) (.-args inj)))]
            (swap! !cache assoc cache-key r)
            r)
          (catch #?(:clj Exception :cljs :default) e
            (log! :error e {:injection inj})
            nil)))))
  (-inj-equiv [^Injection inj other]
    (and
      (instance? Injection other)
      (= (.-injector-key inj) (.-injector-key other))
      (= (.-args inj) (.-args other))))
  (-inj-hash [^Injection inj]
    (hash [(.-injector-key inj) (.-args inj)]))
  (-inj-write [^Injection inj]
    (pr-str (concat ['<< (.-injector-key inj)] (.-args inj)))))

(defn apply-injections [x context]
  (let [!cache (atom {})]
    (postwalk
      (fn [form]
        (if (instance? Injection form)
          (-inj-injected form context !cache)
          form))
      x)))

#?(:clj
   (defmethod print-method Injection [inj w] (.write w (-inj-write inj))))