(ns zero.demo.view
  (:require
    [zero.core :refer [act bnd <<]]))

(defn app-view [{:keys [items new-item]}]
  (let [completed-items (vec (filter :completed? items))]
    [:root>
     :z/css (<< ::css-urls)
     :z/style {:display "block"}
     :z/on {:connect (act [:ze.db/patch
                           [{:path [:todo-items]
                             :value []}]])}
     [:section.todoapp
      [:header.header
       [:h1 "todos"]
       [:input.new-todo
        :placeholder "What needs to be done?"
        :autofocus true
        :value new-item
        :z/on {:input (act [:ze.db/patch [{:path [:new-item] :value (<< :dom.input/value :input)}]])
               :keydown (act [:ze/cond
                              [(<< :event.kb/match-key? {:key "Enter"})
                               [:ze.db/patch
                                [{:path [:todo-items]
                                  :conj {:text       new-item
                                         :completed? false
                                         :editing?   false}}
                                 {:path [:new-item]
                                  :value ""}]]]])}]]
      (when (seq items)
        [:section.main
         [:input#toggle-all.toggle-all
          :type "checkbox"
          :z/on {:change (act [:ze.db/patch
                               [{:path [:todo-items]
                                 :value (mapv #(assoc % :completed? (<< :ze/ctx :data)) items)}]])}]
         [:label {:for "toggle-all"}
          "Mark all as complete"]
         [:ul.todo-list
          (map-indexed
            (fn [idx {:keys [text editing? completed?]}]
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
                   :z/on {:change (act [:ze.db/patch
                                        [{:path [:todo-items]
                                          :value (update-in items [idx :completed?] not)}]])}]
                  [:label text]
                  [:button.destroy
                   :z/on {:click (act [:ze.db/patch
                                       [{:path [:todo-items]
                                         :value (into (subvec items 0 idx) (subvec items (inc idx)))}]])}]])])
            items)]])
      (when (seq items)
        [:footer.footer
         [:span.todo-count
          [:strong (count items)]
          (if (= 1 (count items)) " item " " items ")
          "left"]
         (when (seq completed-items)
           [:button.clear-completed
            :z/on {:click (act [:ze.db/patch
                                [{:path [:todo-items]
                                  :value (vec (remove :completed? items))}]])}
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
        "TodoMVC"]]]]))
