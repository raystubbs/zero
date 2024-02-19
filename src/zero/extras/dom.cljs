(ns zero.extras.dom
  (:require
   [zero.core :as z]
   [zero.config :as zc]
   [zero.extras.util :as zu]
   [zero.impl.base :refer [IDisposable dispose!]]
   [goog.object :as gobj]
   [clojure.string :as str]))

(defonce KEYED-LISTENERS-SYM (js/Symbol "zKeyedListeners"))
(defonce LISTENER-ABORTER-SYM (js/Symbol "zListenerAborter"))

(defn- keyed-listeners [^js/EventTarget target]
  (or (gobj/get target KEYED-LISTENERS-SYM)
    (let [!keyed-listeners (atom {})]
      (gobj/set target KEYED-LISTENERS-SYM !keyed-listeners)
      !keyed-listeners)))

(defn unlisten [^js/EventTarget target key]
  (let [!keyed-listeners (keyed-listeners target)
        {:keys [aborter]} (get @!keyed-listeners key)]
    (some-> aborter .abort)
    (swap! !keyed-listeners dissoc key)))

(defn listen
  [^js/EventTarget target event-name key f & {:keys [capture? passive? once?]}]
  (let [!keyed-listeners (keyed-listeners target)]
    (when-let [{:keys [aborter]} (get @!keyed-listeners key)]
      (.abort aborter))
    (let [aborter (js/AbortController.)]
      (swap! !keyed-listeners assoc key {:aborter aborter})
      (.addEventListener target event-name
        (if once? #(do (unlisten target key) (f %)) f)
        #js{:signal (.-signal aborter)
            :capture (boolean capture?)
            :passive (boolean passive?)
            :once (boolean once?)}))))

(zc/reg-effects
  ::listen listen
  ::unlisten unlisten)

(zc/reg-components
  ::echo
  {:inherit-doc-css? true
   :props #{:vdom}
   :view (fn [{:keys [vdom]}] vdom)}

  ::listen
  {:props #{:target :event :action}
   :view (fn [{:keys [target event action]}]
           [:root>
            ::z/style {:display :none}
            ::z/on {:render (fn [^js/Event ev]
                              (when-let [aborter ^js/AbortController (gobj/get (.-currentTarget ev) LISTENER-ABORTER-SYM)]
                                (.abort aborter))
                              (let [aborter (js/AbortController.)
                                    target-doms (cond
                                                  (nil? target)
                                                  [(-> ev .-target .-host .-parentElement)]

                                                  (instance? js/Node target)
                                                  [target]

                                                  (instance? js/NodeList target)
                                                  (vec (array-seq target))
                                                  
                                                  (or (string? target) (keyword? target))
                                                  (.querySelectorAll
                                                    (-> ev .-currentTarget .-host .getRootNode)
                                                    (zu/css-selector target)))]
                                (gobj/set (.-currentTarget ev) LISTENER-ABORTER-SYM aborter)
                                (doseq [^js/Node dom target-doms]
                                  (.addEventListener dom (name event) action #js{:signal (.-signal aborter)}))))
                    :disconnect (fn [^js/Event ev]
                                  (when-let [aborter ^js/AbortController (gobj/get (.-currentTarget ev) LISTENER-ABORTER-SYM)]
                                    (.abort aborter)))}])})

(defn slotted-elements-prop [& {:keys [selector slots]}]
  (let [slotted-selector (some-> selector zu/css-selector)
        slot-selector (if slots (->> slots (map #(str "slot[name=\"" (name %) "\"]")) (str/join ",")) "slot")]
    {:state-factory
     (fn slotted-prop-state-factory [^js/HTMLElement dom]
       (let [shadow (.-shadowRoot dom)
             !slotted (atom nil)
             update-slotted! (fn update-slotted! []
                               (let [now-slotted (set
                                                   (for [slot (array-seq (.querySelectorAll shadow slot-selector))
                                                         node (array-seq (.assignedNodes slot))
                                                         :when (or (nil? slotted-selector) (and (instance? js/HTMLElement node) (.matches node slotted-selector)))]
                                                     node))]
                                 (when (not= now-slotted @!slotted)
                                   (reset! !slotted now-slotted))))
             abort-controller (js/AbortController.)]
         (update-slotted!)

         (.addEventListener shadow "slotchange" update-slotted! #js{:signal (.-signal abort-controller)})
         #_(.addEventListener shadow "render" update-slotted! #js{:signal (.-signal abort-controller)})

         (reify
           IDeref
           (-deref [_]
             @!slotted)

           IWatchable
           (-add-watch [_ k f]
             (-add-watch !slotted k f))
           (-remove-watch [_ k]
             (-remove-watch !slotted k))

           IDisposable
           (dispose! [_]
             (.abort abort-controller)))))

     :state-cleanup
     (fn slotted-prop-state-cleanup [state _]
       (dispose! state))}))