(ns zero.dom
  (:require
    [subzero.logger :as log]
    [zero.impl.base :as base]
    [zero.impl.base :refer [IDisposable dispose!]]
    [zero.config :as zc]
    [zero.core :as z]
    [zero.impl.signals :as sig]
    [subzero.core :as sz]
    [subzero.rstore :as rstore]
    [subzero.plugins.web-components :refer [IListenValue IBindValue] :as web-components]
    [clojure.string :as str]
    [goog.object :as gobj]))

(defonce ^:private internal-state-sym (js/Symbol "zInternalState"))

(defn- get-internal-state!
  [^js/HTMLElement el init-new]
  (or (gobj/get el internal-state-sym)
    (let [!state (rstore/rstore (cond (fn? init-new) (init-new el) (map? init-new) init-new))]
      (gobj/set el internal-state-sym !state)
      !state)))

(defn slotted-prop
  [& {:keys [selector slots]}]
  (let [slotted-selector (some-> selector z/css-selector)
        slot-selector (if slots (->> slots (map #(str "slot[name=\"" (name %) "\"]")) (str/join ",")) "slot")]
    {:state-factory
     (fn slotted-prop-state-factory [^js/HTMLElement dom]
       (let [shadow (.-shadowRoot dom)
             !slotted (atom nil)
             update-slotted! (fn update-slotted! []
                               (let [now-slotted
                                     (set
                                       (for [slot (array-seq (.querySelectorAll shadow slot-selector))
                                             node (array-seq (.assignedNodes slot))
                                             :when (or (nil? slotted-selector)
                                                     (and (instance? js/HTMLElement node)
                                                       (.matches node slotted-selector)))]
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

(defn internal-state-prop
  [initial]
  {:state-factory
   (fn [^js/HTMLElement element]
     (get-internal-state! element initial))})

(defn ^:deprecated set-internal-state
  [^js/HTMLElement element new-state]
  (reset! (get-internal-state! element {}) new-state))

(defn patch-internal-state!
  [^js/HTMLElement element patch]
  (rstore/patch! (get-internal-state! element {}) (base/convert-patch patch)))

(defn listen-view
  [!db {:keys [sel evt] action :act :as props {!mut :mut} :state}]
  (let [action
        (cond
          (string? action) (js/Function. "event" action)
          (fn? action) action
          (satisfies? web-components/IListenValue action) action
          :else (throw (ex-info "'act' is not a function" {:act action})))]
    [:root>
     :#style {:display :none}
     :#on {:render
           (fn [^js/Event ev]
             (let [target (.querySelector (.getRootNode (.-host (.-target ev))) (z/css-selector sel))]
               (when-let [{:keys [old-props old-target]} @!mut]
                 (when-not (and (= old-props props) (= old-target target))
                   (web-components/unlisten (:evt old-props) !db old-target)))
               (when target
                 (web-components/listen evt !db target
                   (if (satisfies? IListenValue action)
                     (web-components/get-listener-fun action !db)
                     action))
                 (swap! !mut assoc :old-props props :old-target target))))

           :disconnect
           (fn [_]
             (when-let [{:keys [old-props old-target]} @!mut]
               (web-components/unlisten (:evt old-props) !db old-target)))}]))

(defn bind-view
  [!db {:keys [sel prop ref] :as props {!mut :mut} :state}]
  [:root>
   :#style {:display :none}
   :#on {:render
         (fn [^js/Event ev]
           (let [target (.querySelector (.getRootNode (.-host (.-target ev))) (z/css-selector sel))]
             (when-let [{:keys [old-props old-target]} @!mut]
               (when-not (and (= old-props props) (= old-target target))
                 (web-components/unbind (:prop old-props) !db old-target)))
             (when target
               (web-components/bind prop !db target
                 (if (satisfies? IBindValue ref)
                   (web-components/get-bind-watchable ref !db)
                   ref))
               (swap! !mut assoc :old-props props :old-target target))))

         :disconnect
         (fn [_]
           (when-let [{:keys [old-props old-target]} @!mut]
             (web-components/unbind (:prop old-props) !db old-target)))}])

(defn- delayed
  [!db delay f & args]
  (js/Promise.
    (fn [resolve reject]
      (try
        (case delay
          :after-render
          (let [k (gensym)
                after-render-sig (z/sig ::z/after-render)]
            (sig/listen !db after-render-sig k
              (fn []
                (sig/unlisten !db after-render-sig k)
                (resolve (apply f args)))))

          :before-render
          (let [k (gensym)
                before-render-sig (z/sig ::z/before-render)]
            (sig/listen !db before-render-sig k
              (fn []
                (sig/unlisten !db before-render-sig k)
                (resolve (apply f args)))))
          
          (nil :none)
          (resolve (apply f args)))
        (catch :default ex
          (reject ex))))))

(defn select-one
  [{^js/Node root ::z/root !db ::z/db}
   selector
   & {:keys [deep? delay]}]
  (letfn [(select-fn
            [^js/Node root]
            (or
              (.querySelector root (z/css-selector selector))
              (when deep?
                (some
                  (fn [^js/Node node]
                    (when-let [inner-root (.-shadowRoot node)]
                      (select-fn inner-root)))
                  (array-seq (.-childNodes root))))))]
    (delayed !db delay select-fn root)))

(defn select-all
  [{^js/Node root ::z/root !db ::z/db}
   selector
   & {:keys [deep? delay]}]
  (letfn [(select-fn
            [^js/Node root]
            (concat
              (array-seq (.querySelectorAll root (z/css-selector selector)))
              (when deep?
                (mapcat
                  (fn [^js/Node node]
                    (when-let [inner-root (.-shadowRoot node)]
                      (select-fn inner-root)))
                  (array-seq (.-childNodes root))))))]
    (delayed !db delay select-fn root)))

(defn select-closest
  [{^js/Node root ::z/root ^js/Node current ::z/current !db ::z/db}
   selector
   & {:keys [breach? delay]}]
  (letfn [(select-fn
            [^js/Node root ^js/Node current]
            (or
              (.closest current (z/css-selector selector))
              (when breach?
                (when (instance? js/ShadowRoot root)
                  (let [new-current (.-host root)
                        new-root (.getRootNode new-current)]
                    (select-fn new-root new-current))))))]
    (delayed !db delay select-fn root current)))

(defn install!
  [!db]
  (zc/reg-effects !db
    ::patch-internal-state patch-internal-state!
    ::set-internal-state set-internal-state)
  
  (zc/reg-injections !db
    ::select-one select-one
    ::select-all select-all
    ::select-closest select-closest)
  
  (zc/reg-components !db
    ::echo
    {:props #{:vdom}
     :inherit-doc-css? true
     :view (fn [{:keys [vdom]}]
             vdom)}

    ::listen
    {:props {:sel :default
             :evt :default
             :act :default
             :state (internal-state-prop (fn [] {:mut (atom nil)}))}
     :view (partial listen-view !db)}

    ::bind
    {:props {:sel :default
             :prop :default
             :ref :default
             :state (internal-state-prop (fn [] {:mut (atom nil)}))}
     :view (partial bind-view !db)})
  nil)