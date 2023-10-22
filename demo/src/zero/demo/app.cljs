(ns zero.demo.app
  (:require
   [zero.core :refer [<< bnd act] :as z]
   [zero.demo.db]))


(defmethod z/effect :when [_ condition & effects]
  (when (if (vector? condition) (every? identity condition) condition)
    (doseq [effect effects]
      (apply z/effect effect))))

(defmethod z/inject :event.kb/match-key? [_ {:keys [^js event]} {:keys [key mods code]}]
  (and
    (or (nil? key) (= key (.-key event)))
    (or (nil? code) (= code (.-code event)))
    (or (not (contains? mods :ctrl)) (.-ctrlKey event))
    (or (not (contains? mods :shift)) (.-shiftKey event))
    (or (not (contains? mods :alt)) (.-altKey event))
    (or (not (contains? mods :meta)) (.-metaKey event))))

(defmethod z/inject :dom.input/value [_ {:keys [^js event]}]
  (-> event .-target .-value))

(defmethod z/inject :dom.input/checked? [_ {:keys [^js event]}]
  (-> event .-target .-checked))

(z/component
  :name ::todo
  :props #{:items}
  :view (fn [{:keys [items]}]
          (let [completed-items (vec (filter :completed? items))]
            [:z/root:block
             :z/css ["/css/app.css"
                     "/node_modules/todomvc-common/base.css"
                     "/node_modules/todomvc-app-css/index.css"]
             [:section.todoapp
              [:header.header
               [:h1 "todos"]
               [:input.new-todo
                :placeholder "What needs to be done?"
                :autofocus true
                :z/on {:keydown (act [:when (<< :event.kb/match-key? {:key "Enter"})
                                      [:db/add-todo {:text (<< :dom.input/value)
                                                     :completed? false
                                                     :editing? false}]])}]]
              (when (seq items)
                [:section.main
                 [:input#toggle-all.toggle-all
                  :type "checkbox"
                  :z/on {:change (act [:db/replace-todos (mapv #(assoc % :completed? (<< :dom.input/checked?)) items)])}]
                 [:label {:for "toggle-all"}
                  "Mark all as complete"]
                 [:ul.todo-list
                  (map-indexed
                    (fn [idx {:keys [text editing? completed?] :as item}]
                      [:li
                       :z/class (cond-> []
                                  editing? (conj "editing")
                                  completed? (conj "completed"))
                       (if editing?
                         [:input.edit
                          :value text]
                         [:div.view
                          [:input.toggle
                           :type "checkbox"
                           :checked completed?
                           :z/on {:change (act [:db/replace-todo idx (update item :completed? not)])}]
                          [:label text]
                          [:button.destroy
                           :z/on {:click (act [:db/rm-todo idx])}]])])
                    items)]])
              (when (seq items)
                [:footer.footer
                 [:span.todo-count
                  [:strong (count items)]
                  (if (= 1 (count items)) " item " " items ")
                  "left"]
                 (when (seq completed-items)
                   [:button.clear-completed
                    :z/on {:click (act [:db/replace-todos (vec (remove :completed? items))])}
                    "Clear completed"])])]
             [:footer.info
              [:p "Double-click to edit a todo"] 
              [:p
               "Created by "
               [:a {:href "http://github.com/raystubbs"}
                "Ray"]]
              [:p
               "Part of "
               [:a {:href "http://todomvc.com"}
                "TodoMVC"]]]])))

(z/component
 :name :z/app
 :view (fn []
         [:z/echo :vdom [::todo :items (bnd {:default []} :db/todo-items)]]))