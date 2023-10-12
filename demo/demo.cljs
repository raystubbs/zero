(ns demo
  (:require
   [zero.core :refer [<< ||] :as z]))

(defonce !db (atom {}))

(defmethod z/effect :db/add-todo [_ todo-item _]
  (swap! !db update :todo-items (fnil conj (list)) todo-item))

(defmethod z/stream :db/todo-items [_ rx]
  (rx (get @!db :todo-items))
  (add-watch !db ::todo-items
    (fn [_ _ {old-todo-items :todo-items} {new-todo-items :todo-items}]
      (when (not= old-todo-items new-todo-items)
        (rx new-todo-items))))
  
  #(remove-watch !db ::todo-items))

(defmethod z/effect :when [_ [condition & effects] context]
  (when (if (vector? condition) (every? identity condition) condition)
    (doseq [[effect-key payload] (partition 2 effects)]
      (z/effect effect-key payload context))))

(defmethod z/inject :dom.kbevent/match? [_ rx [{:keys [key mods code]}] {:keys [^js/InputEvent event]}]
  (rx (and
        (or (nil? key) (= key (.-key event)))
        (or (nil? code) (= code (.-code event)))
        (or (not (contains? mods :ctrl)) (.-ctrlKey event))
        (or (not (contains? mods :shift)) (.-shiftKey event))
        (or (not (contains? mods :alt)) (.-altKey event))
        (or (not (contains? mods :meta)) (.-metaKey event)))))

(defmethod z/inject :dom.input/value [_ rx _ {:keys [^js/Event event]}]
  (rx (-> event .-target .-value)))

(z/component
  :name ::todo
  :props {:items :prop}
  :view (fn [{:keys [items]}]
          [:z/root:block
           :z/css "/css/main.css"
           [:style ":host { height: 100vh; width: 100vw; }"]
           [:div.flex.flex-col.items-center.justify-center
            [:h1 "Todos"]
            [:div
             [:input
              :z/on {:keyup (z/act :when [(<< :dom.kbevent/match? {:key "Enter"})
                                          :db/add-todo (<< :dom.input/value)])}]
             [:ul
              (map
                (fn [item]
                  [:li item])
                items)]]]]))

(z/component
 :name :z/app
 :view (fn []
         [:z/echo :vdom [::todo :items (z/bnd :db/todo-items || [])]]))

(defn init []
  )