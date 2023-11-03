(ns zero.impl.injection
  (:require
   [clojure.walk :refer [postwalk]]))

(def ^:private !injectors (atom {}))

(deftype Injection [injector-key args]
  Object
  (injected [this context !cache]
    (let [cache-key [injector-key args]]
      (if (contains? @!cache cache-key)
        (get @!cache cache-key)
        (try
          (let [injector (or (get @!injectors injector-key)
                           (throw (ex-info "No injector registered for key" {:injector-key injector-key})))
                r (apply injector context (postwalk #(if (instance? Injection %) (.injected % context !cache) %) args))]
            (swap! !cache assoc cache-key r)
            r)
          (catch :default e
            (js/console.error e {:injection this})
            nil)))))

  IEquiv
  (-equiv [_ ^Injection other]
    (and
      (instance? Injection other)
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
            (.injected form context !cache)
            form))
        x))))

(defn reg-injector [injector-key f]
  (swap! !injectors assoc injector-key f))