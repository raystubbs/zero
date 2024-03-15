(ns zero.dom
  (:require
   [zero.impl.dom :as dom]
   [zero.impl.base :refer [IDisposable dispose!]]
   [zero.config :as config]
   [zero.core :refer [<< <<ctx act]:as z]
   [clojure.string :as str]))

(defn bind [k ^js/Node dom prop-name watchable]
  (dom/bind k dom prop-name watchable))

(defn unbind [k]
  (dom/unbind k))

(defn listen [k ^js/Node dom-or-doms event-name listener-fn & {:keys [once? capture? passive? signal] :as opts}]
  (dom/listen k dom-or-doms event-name listener-fn opts))

(defn unlisten [k]
  (dom/unlisten k))

(config/reg-effects
  ::listen listen
  ::unlisten unlisten
  ::bind bind
  ::unbind unbind)

(config/reg-injections
  ::select-doms
  (fn [{root ::root} selector & {:keys [^js/Node from default]}]
    (or
      (some-> (.querySelectorAll (or from root) (z/css-selector selector)) vec not-empty)
      default))

  ::select-dom
  (fn [{root ::root} selector & {:keys [^js/Node from default]}]
    (or
      (some-> (.querySelector (or from root) (z/css-selector selector)))
      default))

  ::host-parent-dom
  (fn [{^js/Node host ::z/host}]
    (.-parentElement host))

  ::host-root-dom
  (fn [{^js/Node host ::z/host}]
    (.getRootNode host)))

(config/reg-components
  ::echo
  {:props #{:vdom}
   :view (fn [{:keys [vdom]}]
           vdom)}
  
  ::listen
  {:props #{:sel :evt :act}
   :view (fn [{:keys [sel evt] action :act :as props}]
           (let [action (cond
                          (string? action) (js/Function. "event" action)
                          (fn? action) action
                          :else (throw (ex-info "'act' is not a function" {:act action})))]
             [:root>
              ::z/style {:display "none"}
              ::z/on {:connect (act
                                 [::listen
                                  (<<ctx ::z/host)
                                  (<< ::select-doms sel :from (<< ::host-root-dom) :default (<< ::host-parent-dom))
                                  evt action])
                      :update (act
                                [::unlisten (<<ctx ::z/host)]
                                [::listen
                                 (<<ctx ::z/host)
                                 (<< ::select-doms sel :from (<< ::host-root-dom) :default (<< ::host-parent-dom))
                                 evt action])
                      :disconnect (act [::unlisten (<<ctx ::z/host)])}]))}

  ::bind
  {:props #{:sel :prop :ref}
   :view (fn [{:keys [sel prop ref]}]
           [:root>
            ::z/style {:display "none"}
            ::z/on {:connect (act
                               [::bind
                                (<<ctx ::z/host)
                                (<< ::select-dom sel :from (<< ::host-root-dom) :default (<< ::host-parent-dom))
                                prop ref])
                    :update (act
                              [::unbind (<<ctx ::z/host)]
                              [::bind
                               (<<ctx ::z/host)
                               (<< ::select-dom sel :from (<< ::host-root-dom) :default (<< ::host-parent-dom))
                               prop ref])
                    :disconnect (act [::unbind (<<ctx ::z/host)])}])})

(defn slotted-prop [& {:keys [selector slots]}]
  (let [slotted-selector (some-> selector z/css-selector)
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