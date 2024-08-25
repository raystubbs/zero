(ns zero.wcconfig
  (:require
   [zero.config]
   [zero.core :as z]
   [zero.impl.actions :refer [Action] :as act]
   [zero.impl.bindings :refer [Binding] :as bnd]
   [zero.impl.signals :refer [Signal]]
   [subzero.plugins.web-components :refer [IListenKey IListenValue IBindValue]:as web-components]
   [subzero.rstore :as rstore]))

(defn default-event-harvester [^js/Event event]
  (case (.-type event)
    ("keyup" "keydown" "keypress")
    {:key (.-key event)
     :code (.-code event)
     :mods (cond-> #{}
             (.-altKey event) (conj :alt)
             (.-shiftKey event) (conj :shift)
             (.-ctrlKey event) (conj :ctrl)
             (.-metaKey event) (conj :meta))}

    ("input" "change")
    (let [target (.-target event)]
      (when (or (instance? js/HTMLInputElement target) (instance? js/HTMLTextAreaElement target))
        (case (.-type target)
          "checkbox"
          (.-checked target)

          "file"
          (-> target .-files array-seq vec)

          (.-value target))))

    "submit"
    (let [target (.-target event)]
      (when (instance? js/HTMLFormElement target)
        (js/FormData. target)))

    ("drop")
    (->> event .-dataTransfer .-items array-seq
      (mapv #(if (= "file" (.-kind %)) (.getAsFile %) (js/Blob. [(.getAsString %)] #js{:type (.-type %)}))))

       ;; TODO: others

    (or
      (.-detail event)
         ;; TODO: others
      )))

(def default-opts
  {:harvest-event default-event-harvester
   :hot-reload? true})

(defn install!
  [!db & {:as opts}]
  (let [merged-opts (merge default-opts opts)
        after-render-sig (resolve 'zero.impl.signals/after-render-sig)
        before-render-sig (resolve 'zero.impl.signals/before-render-sig)]
    (web-components/install! !db js/document js/customElements
      :hot-reload? (:hot-reload? merged-opts)
      :disable-tags? false
      :after-render after-render-sig
      :before-render #(do (before-render-sig) (bnd/flush! !db))
      :ignore-if-already-installed? true)
    (rstore/patch! !db
      {:path [::z/state ::act/harvest-event]
       :change [:value (:harvest-event merged-opts)]}))
  nil)

(extend-type Signal
  IListenKey
  (listen
    [sig !db target listener-fun]
    (zero.impl.signals/listen !db sig [sig target]
      (fn []
        (let [root (.getRootNode target)]
          (listener-fun
            {::z/current target
             ::z/root root
             ::z/host (when (instance? js/ShadowRoot root) (.-host root))})))))
  (unlisten
    [sig !db target]
    (zero.impl.signals/unlisten !db sig [sig target])))

(extend-type Binding
  IBindValue
  (get-bind-watchable
    [bnd !db]
    (bnd !db)))

(extend-type Action
  IListenValue
  (get-listener-fun
    [action !db]
    #(action % !db)))
