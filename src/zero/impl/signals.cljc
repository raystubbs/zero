(ns ^:no-doc zero.impl.signals
  (:require
   [zero.impl.base :refer [dissoc-in]]
   [zero.core :as-alias z]
   [subzero.rstore :as rstore]
   #?(:cljs [subzero.plugins.web-components :refer [IListenKey]])
   [zero.config :as zc])
  #?(:clj
     (:import
      (clojure.lang IFn))))

(defrecord Signal [key])

(defn listen
  ([^Signal sig k f]
   (listen zc/!default-db sig k f))
  ([!db ^Signal sig k f]
   (rstore/patch! !db
     {:path [::z/state ::listeners (.-key sig) k]
      :change [:value f]})
   nil))

(defn unlisten
  ([^Signal sig k]
   (unlisten zc/!default-db sig k))
  ([!db ^Signal sig k]
   (rstore/patch! !db
     {:path [::z/state ::listeners]
      :change [:call dissoc-in [(.-key sig) k]]})
   nil))

#?(:cljs
   (extend-type Signal
     IFn
     (-invoke
       ([sig]
        (-invoke sig zc/!default-db))
       ([sig !db]
        (doseq [{:keys [f arg]} (some-> (get-in @!db [::z/state ::listeners (.-key sig)]) vals)]
          (f arg))
        nil))

     IListenKey
     (listen
       [sig !db target listener-fun]
       (zero.impl.signals/listen !db sig [sig target] listener-fun))
     (unlisten
       [sig !db target]
       (zero.impl.signals/unlisten !db sig [sig target])))
   
   :clj
   (extend-type Signal
     IFn
     (invoke
       [sig !db]
       (doseq [f (some-> (get-in @!db [::z/state ::listeners (.-key sig)]) vals)]
         (f))
       nil)
     (invoke
       [sig]
       (.invoke sig zc/!default-db)
       nil)))


(def ^:no-doc after-render-sig (Signal. ::z/after-render))
(def ^:no-doc before-render-sig (Signal. ::z/before-render))