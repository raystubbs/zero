(ns zero.impl.actions
  (:require
   [zero.impl.injection :refer [with-injections] :as inj]
   [goog.object :as gobj]
   [cljs.core.async :refer [go <!]]))

(defonce ^js Action (js* "
(class Action extends Function {
  __props__, __effects__
  constructor(props, effects) {
    super()
    this.__props__ = props
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
    (let [context {:event (gobj/clone ev)}
          props (.-__props__ this)
          effects (.-__effects__ this)]
      (when (:prevent-default? props)
        (.preventDefault ev))
      (when (:stop-propagation? props)
        (.preventDefault ev))
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
    (and (instance? Action other)
         (= (.-__props__ this) (.-__props__ other))
         (= (.-__effects__ this) (.-__effects__ other))))
  
  IHash
  (-hash [^js this]
    (hash [(.-__effects__ this) (.-__props__ this)]))
  
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