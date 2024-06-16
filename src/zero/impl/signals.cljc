(ns ^:no-doc zero.impl.signals
  (:require
   [subzero.logger :as log]
   [zero.impl.base :refer [dissoc-in]]
   [zero.impl.default-db :refer [!default-db]]
   [zero.core :as-alias z]
   [subzero.rstore :as rstore])
  #?(:clj
     (:import
      (clojure.lang IFn))))

(defrecord Signal [key]
  #?@(:clj
      [IFn
       (invoke
         [sig !db]
         (doseq [f (some-> (get-in @!db [::z/state ::listeners (.-key sig)]) vals)]
           (f))
         nil)
       (invoke
         [sig]
         (.invoke sig !default-db)
         nil)]))

(defn listen
  ([^Signal sig k f]
   (listen !default-db sig k f))
  ([!db ^Signal sig k f]
   (rstore/patch! !db
     {:path [::z/state ::listeners (.-key sig) k]
      :change [:value f]})
   nil))

(defn unlisten
  ([^Signal sig k]
   (unlisten !default-db sig k))
  ([!db ^Signal sig k]
   (rstore/patch! !db
     {:path [::z/state ::listeners]
      :change [:call dissoc-in [(.-key sig) k]]})
   nil))

#?(:cljs
   (extend-type Signal
     IFn
     (-invoke
       ([sig !db]
        (doseq [f (some-> (get-in @!db [::z/state ::listeners (.-key sig)]) vals)]
          (f))
        nil)
       ([sig]
        (sig !default-db)))))


(def ^:no-doc after-render-sig (Signal. ::z/after-render))
(def ^:no-doc before-render-sig (Signal. ::z/before-render))