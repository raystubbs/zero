(ns zero.impl.injection
  (:require
   [clojure.walk :refer [postwalk]]))

(defmulti inject identity)

(defprotocol IInjection
  (injected [o context !cache]))

(deftype Injection [injector-key args]
  IInjection
  (injected [this context !cache]
    (let [cache-key [injector-key args]]
      (if (contains? @!cache cache-key)
        (get @!cache cache-key)
        (try
          (let [r (apply inject injector-key context (postwalk #(if (instance? Injection %) (injected % context !cache) %) args))]
            (swap! !cache assoc cache-key r)
            r)
          (catch :default e
            (js/console.error e {:injection this})
            nil)))))

  IEquiv
  (-equiv [_ ^Injection other]
    (and
      (= injector-key (.-injector-key other))
      (= args (.-args other))))

  IHash
  (-hash [_]
    (hash [injector-key args]))

  IPrintWithWriter
  (-pr-writer [_ writer _opts]
    (-write writer (str (concat ['<< injector-key] args)))))

(def ^:dynamic ^:private *context* nil)

(defn apply-injections [x context]
  (let [!cache (atom {})]
    (binding [*context* context]
      (postwalk
        (fn [form]
          (if (instance? Injection form)
            (injected form context !cache)
            form))
        x))))