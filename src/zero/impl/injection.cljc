(ns zero.impl.injection
  (:require
   [clojure.walk :refer [postwalk]]
   [zero.impl.base :refer [log!]]
   [zero.config :as config]))

(defprotocol IInjection
  (injected [injection context !cache]))

(declare Injection)

(defn- injection-injected [^Injection injection context !cache]
  (let [cache-key [(.-injector-key injection) (.-args injection)]]
    (if (contains? @!cache cache-key)
      (get @!cache cache-key)
      (try
        (let [injector (or (get-in @config/!registry [:injection-handlers (.-injector-key injection)])
                         (throw (ex-info "No injector registered for key" {:injector-key (.-injector-key injection)})))
              r (apply injector context (postwalk #(if (instance? Injection %) (injected % context !cache) %) (.-args injection)))]
          (swap! !cache assoc cache-key r)
          r)
        (catch :default e
          (log! :error e {:injection injection})
          nil)))))

(defn- injection-str [^Injection injection]
  (pr-str (concat ['<< (.-injector-key injection)] (.-args injection))))

(defn- injection-equiv [^Injection injection ^Injection other]
  (and
    (instance? Injection other)
    (= (.-injector-key injection) (.-injector-key other))
    (= (.-args injection) (.-args other))))

(defn- injection-hash [^Injection injection]
  (hash [(.-injector-key injection) (.-args injection)]))

#?(:cljs
   (deftype Injection [injector-key args]
     IInjection
     (injected [this context !cache]
       (injection-injected this context !cache))

     IEquiv
     (-equiv [this ^Injection other]
       (injection-equiv this other))

     IHash
     (-hash [this]
       (injection-hash this))

     IPrintWithWriter
     (-pr-writer [this writer _opts]
       (-write writer (injection-str this))))

   :clj
   (deftype Injection [injector-key args]
     IInjection
     (injected [this context !cache]
       (injection-injected this context !cache))

     Object
     (equals [this other]
       (injection-equiv this other))
     (toString [this]
       (injection-str this))
     (hashCode [this]
       (injection-hash this))))

(defn apply-injections [x context]
  (let [!cache (atom {})]
    (postwalk
      (fn [form]
        (if (instance? Injection form)
          (injected form context !cache)
          form))
      x)))