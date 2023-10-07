(ns zero.impl.actions
  (:require
   [zero.impl.injection :refer [with-injections] :as inj]
   [goog.object :as gobj]
   [goog :refer [DEBUG]]
   [cljs.core.async :refer [go <!]]))

(defonce ^js Action (js* "
(class Action extends Function {
  __props__; __effects__
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
      (when (or (not (:skip-bubbled? props)) (= (.-currentTarget ev) (.-target ev)))
        (when (:prevent-default? props)
          (.preventDefault ev))
        (when (:stop-propagation? props)
          (.stopPropagation ev))
        (go
          (let [effects-w-injections (<! (with-injections effects context {:timeout 5000}))]
            (cond
              (= ::inj/error effects-w-injections)
              nil

              :else
              (do
                (when DEBUG
                  (js/console.groupCollapsed this)
                  (js/console.info "Event:" ev))
                (doseq [[effect-key payload] effects-w-injections]
                  (try
                    (when DEBUG
                      (js/console.info "Effect:" [effect-key payload]))
                    (effect effect-key payload context)
                    (catch :default e
                      (js/console.error
                        "Error in effect handler"
                        {:effect [effect-key payload]}
                        e))))
                (when DEBUG
                  (js/console.groupEnd)))))))))
  
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
      (some->> (.-__props__ this) not-empty (conj []))
      (mapcat identity (.-__effects__ this)))
     writer
     opts)))