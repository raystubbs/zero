(ns zero.impl.actions
  (:require
    [clojure.string :as str]
    [zero.impl.injection :refer [apply-injections]]
    [goog.object :as gobj]
    [goog :refer [DEBUG]]))

(defonce ^js Action (js* "
(class extends Function {
  props; effects;
  constructor(props, effects) {
    super();
    this.props = props;
    this.effects = effects;
    return new Proxy(this, {apply: (target, thisArg, args) => zero.impl.actions.perform_BANG_(target, args[0])});
  }
})"))

(defprotocol IAction
  (perform! [this ^js/Event ev]))

(defmulti effect identity)

(extend-type Action
  IAction
  (perform! [^js this ^js/Event ev]
    (let [context {:event (gobj/clone ev)}
          props (.-props this) 
          effects (.-effects this)]
      (when (or (not (:skip-bubbled? props)) (= (.-currentTarget ev) (.-target ev)))
        (when (:prevent-default? props)
          (.preventDefault ev))
        (when (:stop-propagation? props)
          (.stopPropagation ev))
        (js/setTimeout
          (fn []
            (let [effects-w-injections (apply-injections effects context)]
              (when DEBUG
                (js/console.groupCollapsed this)
                (js/console.info "Event:" ev))
              (doseq [[effect-key & args :as fx] effects-w-injections]
                (try
                  (when DEBUG
                    (js/console.info "Effect:" fx))
                  (apply effect effect-key args)
                  (catch :default e
                    (js/console.error
                      "Error in effect handler"
                      {:effect fx}
                      e))))
              (when DEBUG
                (js/console.groupEnd))))))))
  
  IEquiv
  (-equiv [^js this ^js other]
    (and (instance? Action other)
         (= (.-props this) (.-props other))
         (= (.-effects this) (.-effects other))))
  
  IHash
  (-hash [^js this]
    (hash [(.-effects this) (.-props this)]))
  
  IPrintWithWriter
  (-pr-writer [^js this writer _opts]
    (-write writer
      (str (concat
             ['act]
             (when (seq (.-props this)) [(.-props this)])
             (.-effects this))))))