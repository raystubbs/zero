(ns demo
  (:require
   [zero.core :refer [<< ||] :as z]
   [devtools.core :as devtools]))

(let [{:keys [cljs-land-style]} (devtools/get-prefs)]
  (devtools/set-pref! :cljs-land-style (str "filter:invert(1);" cljs-land-style)))
(devtools/install!)

(def !db (atom {}))

(defmethod z/effect :db/assoc [_ [path value]]
  (swap! !db assoc-in path value))

(defmethod z/stream :db/path [_ rx path]
  (let [!prev (atom (get-in @!db path))]
    (rx @!prev)
    (add-watch
     !db [:db/path path]
     (fn [_ _ db]
       (let [new-val (get-in db path)]
         (when (not= new-val @!prev)
           (reset! !prev new-val)
           (rx new-val)))))
    #(remove-watch !db [:db/path path])))

(defmethod z/effect ::todo-setup []
  ;; TODO
  )

(defmethod z/effect ::todo-teardown []
  ;; TODO
  )

(z/component
 :name ::todo
 :props {:state :prop}
 :view (fn [{:keys [state]}]
         [:z/root
          :z/on {:connect (z/act ::todo-setup)
                 :disconnect (z/act ::todo-teardown)}
          [:ul
           (map (fn [{:keys [item]}]
                  [:li [:z/echo :vdom item]])
                (:items state))]]))

(z/component
 :name :z-app
 :view (fn []
         (map
          (fn [{:keys [name description comp props code demo]}]
            [:div
             [:h2 name]
             [:p description]
             [::demo
              :name name
              :tab (z/bnd ::current-tab name || "Demo")
              [:code :slot "demo-view"
               (pr-str demo)]
              [:div :slot "demo"
               demo]
              [:code :slot "code"]]])
          @!demos)))

(defn init []
  )