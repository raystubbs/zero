(ns zero.impl.actions
  (:require
   [zero.impl.injection :refer [with-injections] :as inj]
   [cljs.core.async :refer [go <!]]))

(defonce ^js Action (js* "
(class Action extends Function {
  __effects__
  constructor(effects) {
    super()
    this.__effects__ = effects
    return new Proxy(this, {apply: (target, thisArg, args) => zero.impl.actions.perform_BANG_(target, args[0])})
  }
})"))

(defprotocol IAction
  (perform! [this ^js/Event ev]))

(defmulti effect identity)

(extend-type Action
  IAction
  (perform! [^js this ^js/Event ev]
    (.stopPropagation ev)
    (.preventDefault ev)
    (let [context {:event ev}
          effects (.-__effects__ this)]
      (go
        (let [w-injections (<! (with-injections effects context {:timeout 30000}))]
          (cond
            (= ::error w-injections)
            nil
            
            :else
            (doseq [[effect-key payloads] w-injections, payload payloads]
              (try
                (effect effect-key payload context)
                (catch :default e
                  (js/console.error
                   "Error in effect handler"
                   {:effect [effect-key payload]}
                   e)))))))))
  
  IEquiv
  (-equiv [^js this ^js other]
    (and (instance? other Action) (= (.-__effects__ this) (.-__effects__ other))))
  
  IHash
  (-hash [^js this]
    (hash (.-__effects__ this)))
  
  IPrintWithWriter
  (-pr-writer [^js this writer opts]
    (-pr-writer
     (concat
      ['act]
      (mapcat
       (fn [[effect-key payloads]]
         (mapcat #(vector effect-key %) payloads))
       (.-__effects__ this)))
     writer
     opts)))

(defmethod effect ::dispatch-clone [_ _ {:keys [^js/Event event]}]
  (let [Constr (.-constructor event)
        clone (Constr. (.-type event) event)]
    (some-> event .-target .getRootNode .-host (.dispatchEvent clone))))

(defmethod effect ::dispatch [_ [constructor type opts] {:keys [^js/Event event]}]
  (some-> event .-target .getRootNode .-host (.dispatchEvent (constructor. type opts))))