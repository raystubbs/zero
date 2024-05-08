(ns ^:no-doc zero.impl.signals
  (:require
   [zero.impl.base :refer [dissoc-in]]))

(defonce Signal
  (js* "
(class extends Function {
  key;
  constructor(key) {
    super();
    this.key = key;
    return new Proxy(this, {apply: (target, thisArg, args) => {
      cljs.core._invoke(target);
    }});
  }
})"))

(defonce !listeners (atom {}))

(extend-type Signal
  IFn
  (-invoke
    ([sig]
     (doseq [{:keys [f arg]} (some-> (get @!listeners (.-key sig)) vals)]
       (f arg))
      nil))

  IEquiv
  (-equiv [sig other]
    (and
      (instance? Signal other)
      (= (.-key sig) (.-key other))))

  IHash
  (-hash [sig]
    (hash (.-key sig)))

  IPrintWithWriter
  (-pr-writer [sig writer _opts]
    (-write writer
      (pr-str (list 'sig (.-key sig))))))

(defn listen
  [sig k f arg]
  (swap! !listeners assoc-in [(.-key sig) k] {:f f :arg arg})
  nil)

(defn unlisten
  [sig k]
  (swap! !listeners dissoc-in [(.-key sig) k])
  nil)