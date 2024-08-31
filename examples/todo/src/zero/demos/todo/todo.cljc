(ns zero.demos.todo.todo
  (:require
   [zero.core :refer [<<ctx act] :as z]
   [zero.config :as zc]
   [zero.dom :as-alias zd]))

(defn- view
  [{:keys [model]}]
  (let [all-completed? (every? :completed? (:items model))
        any-completed? (boolean (some :completed? (:items model)))
        num-items (count (:items model))]
    [:root>
     :#css ["/node_modules/todomvc-common/base.css"
            "/node_modules/todomvc-app-css/index.css"]
     :#style {:display "block"}

     [:section.todoapp
      [:header.header
       [:h1 "todos"]
       [:input.new-todo
        :placeholder "What needs to be done?"
        :autofocus true
        :value (:input model)
        :#on {:input
              (act
                [::zd/dispatch :patch
                 :data {:path [:input]
                        :change [:value (<<ctx ::z/data)]}])

              :keydown
              (act
                [::z/choose
                 {"Enter"
                  [[::zd/dispatch :patch
                    :data [{:path [:items]
                            :change [:conj {:text (:input model)}]}
                           {:path [:input]
                            :change [:value ""]}]]]}
                 (<<ctx ::z/data :key)])}]]

      (when (pos? num-items)
        [:section.main
         [:input#toggle-all.toggle-all
          :type "checkbox"
          :checked all-completed?
          :#on {:change
                (act
                  [::zd/dispatch :patch
                   :data (map
                           (fn [index]
                             {:path [:items index :completed?]
                              :change [:value (not all-completed?)]})
                           (range 0 (count (:items model))))])}]
         [:label {:for "toggle-all"}
          "Mark all as complete"]
         [:ul.todo-list
          (map-indexed
            (fn [idx {:keys [text completed? editing?]}]
              [:li
               :#class (cond-> [] editing? (conj "editing") completed? (conj "completed"))
               (if editing?
                 [:input.edit
                  :value text
                  :#on {:change
                        (act
                          [::zd/dispatch :patch
                           :data {:path [:items idx]
                                  :change [:assoc :editing? false :text (<<ctx ::z/data)]}])}]
                 [:div.view
                  :#on {:dblclick
                        (act
                          [::zd/dispatch :patch
                           :data {:path [:items idx :editing?]
                                  :change [:value true]}]
                          [::zd/invoke (<<ctx ::zd/select-one :input.edit :delay :after-render) "select"])}
                  [:input.toggle
                   :type "checkbox"
                   :checked completed?
                   :#on {:change
                         (act
                           [::zd/dispatch :patch
                            :data {:path [:items idx :completed?]
                                   :change [:value (not completed?)]}])}]
                  [:label text]
                  [:button.destroy
                   :#on {:click
                         (act
                           [::zd/dispatch :patch
                            :data {:path [:items]
                                   :change [:clear idx]}])}]])])
            (:items model))]])
      (when (pos? num-items)
        [:footer.footer
         [:span.todo-count
          [:strong num-items]
          (if (= 1 num-items) " item " " items ")
          "left"]
         (when any-completed?
           [:button.clear-completed
            :#on {:click
                  (act
                    [::zd/dispatch :patch
                     :data {:path [:items]
                            :change [:value (vec (remove :completed? (:items model)))]}])}
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

(zc/reg-components
  :zero.todo/todo
  {:props #{:model}
   :view view})
