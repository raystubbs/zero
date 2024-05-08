(ns ^:no-doc zero.impl.signals
  (:require
   [zero.impl.base :refer [dissoc-in]])
  (:import
   (clojure.lang IFn)))

(defonce !listeners (atom {}))

(deftype Signal [key]
  Object
  (equals [_ other]
    (and
      (instance? Signal other)
      (= key (.-key other))))
  (toString [_]
    (pr-str (list 'sig key)))
  (hashCode [_]
    (hash key))

  IFn
  (invoke
    [sig]
    (doseq [{:keys [f arg]} (some-> (get @!listeners (.-key sig)) vals)]
      (f arg))
    nil))

(defn listen
  [sig k f arg]
  (swap! !listeners assoc-in [(.-key sig) k] {:f f :arg arg})
  nil)

(defn unlisten
  [sig k]
  (swap! !listeners dissoc-in [(.-key sig) k])
  nil)