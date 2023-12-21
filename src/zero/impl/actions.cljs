(ns zero.impl.actions
  (:require
    [clojure.string :as str]
    [zero.impl.injection :refer [apply-injections]]
    [goog.object :as gobj]
    [goog :refer [DEBUG]]
    [zero.config :as config]))

(defonce Action (js* "
(class extends Function {
  props; effects;
  constructor(props, effects) {
    super();
    this.props = props;
    this.effects = effects;
    return new Proxy(this, {apply: (target, thisArg, args) => {
      if(args[0] instanceof Event) {
        zero.impl.actions.invoke_with_event_BANG_(target, args[0]);
      } else {
        zero.impl.actions._invoke(target, args[0]);
      }
    }});
  }
})"))

(defn invoke-with-event! [^Action act ^js/Event ev]
  (let [props (.-props act)]
    (when (:prevent-default? props)
      (.preventDefault ev))
    (when (:stop-propagation? props)
      (.stopPropagation ev))
    (let [^js root (.getRootNode (.-currentTarget ev))]
      (apply act
        {:shape   :z/event-context
         :event   ev
         :data    (config/harvest-event ev)
         :target  (.-target ev)
         :root    root
         :host    (when (instance? js/ShadowRoot root) (.-host root))
         :current (.-currentTarget ev)}
        nil))))

(defonce ^:private THROTTLE-STATE (js/Symbol "zThrottleState"))

(defn do-effect! [[effect-key & args :as effect]]
  (let [effect-fn (or (get-in @config/!registry [:effect-handlers effect-key])
                    (throw (ex-info "No effect registered for key" {:effect-key effect-key})))]
    (apply effect-fn args)))

(extend-type Action
  IFn
  (-invoke
    ([action context]
     (let [{:keys [log? throttle throttle-strategy]} (.-props action)
           should-log? (and DEBUG log?)
           actually-perform! (fn actually-perform! []
                               (when should-log?
                                 (js/console.groupCollapsed (pr-str action))
                                 (js/console.info :context context))
                               (let [!errors (atom [])]
                                 (doseq [effect (apply-injections (.-effects action) context)]
                                   (try
                                     (do-effect! effect)
                                     (when should-log?
                                       (js/console.info :effect effect))
                                     (catch :default e
                                       (js/console.error :effect effect e)
                                       (swap! !errors conj e))))
                                 (when should-log?
                                   (js/console.groupEnd)
                                   (doseq [error @!errors]
                                     (js/console.error error)))))]
       (cond
         (number? throttle)
         (cond
           (nil? (gobj/get action THROTTLE-STATE))
           (do
             (case (or throttle-strategy :default)
               :default (js/setTimeout actually-perform!)
               :debounce nil)

             (let [interval-id
                   (js/setInterval
                     (fn []
                       (let [{:keys [hit? interval-id] :as state} (gobj/get action THROTTLE-STATE)]
                         (cond
                           hit?
                           (do
                             (js/setTimeout actually-perform!)
                             (gobj/set action THROTTLE-STATE (assoc state :hit? false)))

                           :else
                           (do
                             (gobj/set action THROTTLE-STATE nil)
                             (js/clearInterval interval-id))))))]
               (gobj/set action THROTTLE-STATE {:hit? (= throttle-strategy :debounce) :interval-id interval-id})))

           :else
           (gobj/set action THROTTLE-STATE (assoc (gobj/get action THROTTLE-STATE) :hit? true)))

         :else
         (js/setTimeout actually-perform!))
       nil)))

  IEquiv
  (-equiv [action ^Action other]
    (and (instance? Action other)
         (= (.-props action) (.-props other))
         (= (.-effects action) (.-effects other))))
  
  IHash
  (-hash [action]
    (hash [(.-effects action) (.-props action)]))
  
  IPrintWithWriter
  (-pr-writer [action writer _opts]
    (-write writer
      (pr-str
        (concat
          ['act]
          (when (seq (.-props action)) [(.-props action)])
          (.-effects action))))))