(ns zero.config
  (:require
   [subzero.rstore :as rstore]
   [zero.core :as-alias z]
   [zero.impl.default-db :as default-db]
   [zero.impl.bindings :as bnd]
   [zero.impl.signals :as sig]
   [zero.impl.actions :as-alias act]
   [zero.impl.injection :as-alias inj]
   [subzero.plugins.component-registry :as component-registry]
   [subzero.plugins.html :as html]
   #?(:cljs [subzero.plugins.web-components :as web-components])))

(def !default-db default-db/!default-db)

#?(:cljs
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
         ))))

(defn- resolve-db-keyvals-args
  [args]
  (if (rstore/rstore? (first args))
    [(first args) (apply array-map (rest args))]
    [!default-db (apply array-map args)]))

(defn reg-effects "
  Register one or more effects.
  
  ```clojure
  (reg-effect
   ::echo
   (fn [& args]
     (prn args))
  
   ::echo2
   (fn [& args]
    (prn args)))
  
  (act ::echo \"Hello, World!\")
  ```
" {:arglists '[[!db & keyvals] [& keyvals]]}
  [& args]
  (let [[!db effect-specs] (resolve-db-keyvals-args args)]
    (rstore/patch! !db
      {:path [::z/state ::act/effect-handlers]
       :fnil {}
       :change [:into effect-specs]}))
  nil)

(defn reg-streams "
  Register one or more data streams.
  
  ```clojure
  (defonce !db (atom {}))
  
  (reg-stream
   :db
   (fn [rx path]
    (rx (get-in @!db path)))
  
   :other
   (fn [rx]
    (rx \"thing\")))
  ```
  
  If a function is returned it will be called to cleanup
  the stream once it's spun down.
  
  Each pair of `[stream-key args]` represents a unique
  stream instance, so the method will be called only once
  for each set of args used with the stream; until the
  stream has been spun down and must be restarted.
" {:arglists '[[!db & keyvals] [& keyvals]]}
  [& args]
  (let [[!db stream-specs] (resolve-db-keyvals-args args)]
    (rstore/patch! !db
      {:path [::z/state ::bnd/stream-handlers]
       :fnil {}
       :change [:into stream-specs]}))
  nil)

(defn reg-injections
  {:arglists '[[!db & keyvals] [& keyvals]]}
  [& args]
  (let [[!db injection-specs] (resolve-db-keyvals-args args)]
    (rstore/patch! !db
      {:path [::z/state ::inj/injection-handlers]
       :fnil {}
       :change [:into injection-specs]}))
  nil)

(defn reg-components
  {:arglists '[[!db & keyvals] [& keyvals]]}
  [& args]
  (let [[!db component-specs] (resolve-db-keyvals-args args)]
    (when-not (rstore/patch! !db
                {:path [::z/state ::pending-components]
                 :fnil {}
                 :change [:assoc component-specs]}
                :when #(nil? (::component-registry/state %)))
      (doseq [[component-name component-spec] component-specs]
        (component-registry/reg-component !db component-name component-spec))))
  nil)

(defn reg-attr-writers
  {:arglists '[[!db & keyvals] [& keyvals]]}
  [& args]
  (let [[!db keyvals] (resolve-db-keyvals-args args)]
    (when-not (rstore/patch! !db
                {:path [::z/state ::pending-attr-writers]
                 :fnil {}
                 :change [:assoc keyvals]}
                :when #(nil? (::component-registry/state %)))
      (component-registry/reg-attribute-writers !db keyvals)))
  nil)

(defn reg-attr-readers
  {:arglists '[[!db & keyvals] [& keyvals]]}
  [& args]
  (let [[!db keyvals] (resolve-db-keyvals-args args)]
    (when-not (rstore/patch! !db
                {:path [::z/state ::pending-attr-readers]
                 :fnil {}
                 :change [:assoc keyvals]}
                :when #(nil? (::component-registry/state %)))
      (component-registry/reg-attribute-readers !db keyvals)))
  nil)

(def ^:private default-opts
  {:html? true
   :web-components? true
   :hot-reload? true
   :harvest-event #?(:cljs default-event-harvester :clj nil)})

(defn- preproc-vnode
  [vnode]
  (update vnode 1
    (fn [props]
      (cond-> props
        (contains? props :zero.core/class)
        (->
          (update :#class (fnil into []) (if (coll? (:zero.core/class props)) (:zero.core/class props) [(:zero.core/class props)]))
          (dissoc :zero.core/class))

        true
        (update-keys
          (fn [k]
            (if (and (keyword? k) (= "zero.core" (namespace k)))
              (keyword (str "#" (name k)))
              k)))

        (contains? props :zero.core/internals)
        (update :#internals
          (fn [internals]
            (update-keys internals
              (fn [k]
                (if (and (keyword? k) (= "zero.core" (namespace k)))
                  (keyword (str "#" (name k)))
                  k)))))))))

(defn install!
  [!db & {:as opts}]
  (let [merged-opts (merge default-opts opts)]
    (component-registry/install! !db :ignore-if-already-installed? true)

    (when-let [[old-db _] (rstore/patch! !db {:path [::z/state] :fnil {} :change [:clear ::pending-components ::pending-attr-readers ::pending-attr-writers]})]
      (component-registry/reg-attribute-readers !db (get-in old-db [::z/state ::pending-attr-readers] {}))
      (component-registry/reg-attribute-writers !db (get-in old-db [::z/state ::pending-attr-writers] {}))
      (doseq [[component-name component-spec] (get-in old-db [::z/state ::pending-components])]
        (component-registry/reg-component !db component-name component-spec)))

    (when (:html? merged-opts)
      (html/install! !db
        :render-listener
        (fn [node-id k v]
          [:zero.dom/listen
           :sel (str "#" node-id)
           :evt k
           :act v])

        :render-binding
        (fn [node-id k v]
          [:zero.dom/bind
           :sel (str "#" node-id)
           :prop k
           :ref v])

        :preproc-vnode
        preproc-vnode

        :ignore-if-already-installed?
        true))

    #?(:cljs
       (when
         (and
           js/document
           js/customElements
           (:web-components? merged-opts))
         (let [after-render-sig (resolve 'zero.impl.signals/after-render-sig)
               before-render-sig (resolve 'zero.impl.signals/before-render-sig)]
           (web-components/install! !db js/document js/customElements
             :hot-reload? (:hot-reload? merged-opts)
             :disable-tags? false
             :preproc-vnode preproc-vnode
             :after-render after-render-sig
             :before-render #(do (before-render-sig) (bnd/flush! !db))
             :ignore-if-already-installed? true))))

    (rstore/patch! !db
      {:path [::z/state ::act/harvest-event]
       :change [:value (:harvest-event merged-opts)]}))
  nil)