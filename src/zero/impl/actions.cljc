(ns ^:no-doc zero.impl.actions
  (:require
   [zero.impl.injection :refer [apply-injections]]
   [zero.impl.signals :as sig]
   [zero.impl.default-db :refer [!default-db]]
   [zero.impl.base :as base]
   [subzero.logger :as log]
   [zero.core :as-alias z]
   [subzero.rstore :as rstore]
   #?(:cljs [subzero.plugins.web-components :refer [IListenValue]]))
  #?(:clj
     (:import
      [clojure.lang IFn])))

(defn ^:no-doc do-effect!
  [!db ctx [effect-key & args :as effect]]
  (let [effect-fn (or (get-in @!db [::z/state ::effect-handlers effect-key])
                    (throw
                      (ex-info "No effect registered for key"
                        {:effect effect})))]
    (if (::z/contextual (meta effect-fn))
      (apply effect-fn ctx args)
      (apply effect-fn args))))

#?(:cljs
   (defn event->context [!db ^js/Event ev]
     (let [^js root (.getRootNode (.-currentTarget ev))
           ^js host (when (instance? js/ShadowRoot root) (.-host root))
           harvest-event (get-in @!db [::z/state ::harvest-event])
           data (harvest-event ev)]
       {:zero.core/event.data data
        :zero.core/event.target (.-target ev)
        :zero.core/event.current (.-currentTarget ev) ;; deprecated
        :zero.core/event ev
        :zero.core/current (.-currentTarget ev)
        :zero.core/host host
        :zero.core/root root
        :subzero.core/db !db})))

(declare ^:private throttle)

(defrecord Action [props effects]
  #?@(:clj
      [IFn
       (invoke
         [action context]
         (.invoke action context !default-db))
       (invoke
         [action context !db]
         (let [{:keys [log? dispatch]} (.-props action)

               actually-perform!
               (fn actually-perform! []
                 (doseq [effect (apply-injections !db context (.-effects action))]
                   (try
                     (do-effect! !db context effect)
                     (catch Exception ex
                       (log/error "Error in effect handler" :ex ex))))
                 (when log?
                   (log/info (str action) :data {:context context})))]
           (case (or dispatch :default)
             (:throttle :debounce)
             (throttle !db action actually-perform! dispatch)

             :immediate
             (actually-perform!)

             :default
             (base/schedule 0 actually-perform!))
           nil))]))

#?(:cljs
   (extend-type Action
     IFn
     (-invoke
       ([action context]
        (action context !default-db))
       ([action context !db]
        (let [{:keys [log? dispatch] :as props} (.-props action)

              context
              (cond
                (instance? js/Event context)
                (do
                  (when (:prevent-default? props)
                    (.preventDefault ^js/Event context))
                  (when (:stop-propagation? props)
                    (.stopPropagation ^js/Event context))
                  (event->context !db context))

                :else
                (merge {:subzero.core/db !db} context))

              actually-perform!
              (fn actually-perform! []
                (when log?
                  (js/console.groupCollapsed (pr-str action))
                  (js/console.info :context context))
                (let [!errors (atom [])]
                  (doseq [effect (apply-injections !db context (.-effects action))]
                    (try
                      (do-effect! !db context effect)
                      (when log?
                        (js/console.info :effect effect))
                      (catch :default e
                        (js/console.error :effect effect e)
                        (swap! !errors conj e))))
                  (when log?
                    (js/console.groupEnd)
                    (doseq [error @!errors]
                      (js/console.error error)))))]
          (case (or dispatch :default)
            (:throttle :debounce)
            (throttle !db action actually-perform! dispatch)

            :after-render
            (sig/listen !db sig/after-render-sig [::act action]
              (fn []
                (sig/unlisten !db sig/after-render-sig [::act action])
                (actually-perform!)))

            :before-render
            (let [!complete? (atom false)
                  timeout (js/setTimeout
                            (fn []
                              (reset! !complete? true)
                              (sig/unlisten !db sig/before-render-sig [::act action])
                              (actually-perform!)))]
              (sig/listen !db sig/before-render-sig [::act action]
                (fn []
                  (sig/unlisten !db sig/before-render-sig [::act action])
                  (js/clearTimeout timeout)
                  (actually-perform!))))

            :immediate
            (actually-perform!)

            :default
            (js/setTimeout actually-perform!))
          nil)))

     IListenValue
     (get-listener-fun
       [action !db]
       #(action % !db))))

(defn- throttle
  [!db ^Action action actually-perform! kind]
  (let [{:keys [delta]} (.-props action)
        
        [old-db _]
        (rstore/patch! !db
          {:path [::z/state ::throttling action :fn]
           :change [:value actually-perform!]})]
    (when-not (get-in old-db [::z/state ::throttling action])
      (let [interval
            (base/schedule-every
              (or delta 300)
              (fn [] 
                (if-let [perform-fn (get-in @old-db [::z/state ::throttling action :fn])]
                  (perform-fn)
                  (when-let [[old-db _]
                             (rstore/patch! !db
                               {:path [::z/state ::throttling]
                                :change [:clear action]}
                               :when #(nil? (get-in % [::z/state ::throttling action :fn])))]
                    (base/cancel-scheduled (get-in old-db [::z/state ::throttling action :interval]))))))]
        (rstore/patch! !db
          {:path [::z/state ::throttling action :interval]
           :change [:value interval]})
        (when (= :throttle kind)
          (base/schedule 0 actually-perform!))))))