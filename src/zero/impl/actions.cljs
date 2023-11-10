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
    return new Proxy(this, {apply: (target, thisArg, args) => {
      if(args[0] instanceof Event) {
        zero.impl.actions.perform_with_event_BANG_(target, args[0]);
      } else {
        zero.impl.actions.perform_BANG_(target, args[0]);
      }
    }});
  }
})"))

(defprotocol IAction
  (perform! [act context]))

(defn perform-with-event! [^Action act ^js/Event ev]
  (let [props (.-props act)]
    (when (:prevent-default? props)
      (.preventDefault ev))
    (when (:stop-propagation? props)
      (.stopPropagation ev))
    (perform! act
      {:event ev
       :target (.-target ev)
       :root (.getRootNode (.-currentTarget ev))
       :current (.-currentTarget ev)})))

(def ^:private !effects (atom {}))

(defn do-effect [[effect-key & args :as effect]]
  (let [effect-fn (or (get @!effects effect-key)
                    (throw (ex-info "No effect registered for key" {:effect-key effect-key})))]
    (apply effect-fn args)))

(extend-type Action
  IAction
  (perform! [^Action this context]
    (let [effects (apply-injections (.-effects this) context)
          {:keys [log?]} (.-props this)
          should-log? (and DEBUG log?)]
      (js/setTimeout
        (fn []
          (when should-log?
            (js/console.groupCollapsed this)
            (js/console.info :context context))
          (let [!errors (atom [])]
            (doseq [effect effects]
              (try
                (do-effect effect)
                (when should-log?
                  (js/console.info :effect effect))
                (catch :default e
                  (js/console.error :effect effect e)
                  (swap! !errors conj e))))
            (when should-log?
              (js/console.groupEnd)
              (doseq [error @!errors]
                (js/console.error error))))))))
  
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