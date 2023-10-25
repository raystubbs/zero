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

(def ^:private !effects (atom {}))

(defn do-effect [[effect-key & args :as effect]]
  (let [effect-fn (or (get @!effects effect-key)
                    (throw (ex-info "No effect registered for key" {:effect-key effect-key})))]
    (when DEBUG
      (js/console.info :effect effect))
    (apply effect-fn args)))

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
                (js/console.info :event ev))
              (doseq [effect effects-w-injections]
                (try
                  (do-effect effect)
                  (catch :default e
                    (js/console.error
                      "Error in effect handler"
                      {:effect effect}
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

(defn reg-effect [effect-key f]
  (swap! !effects assoc effect-key f))

(reg-effect
  :cond
  (fn [& cases]
    (when-let [[_ & effects] (first (filter first cases))]
      (doseq [effect effects]
        (do-effect effect)))))

(reg-effect
  :effects
  (fn [effects]
    (doseq [effect effects]
      (do-effect effect))))