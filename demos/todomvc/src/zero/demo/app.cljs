(ns zero.demo.app
  (:require
   [clojure.string :as str]
   [zero.core :refer [<< act bnd] :as z]
   [zero.extras.all]))

(z/reg-injector
  :event.kb/match-key?
  (fn [{:keys [data]} {:keys [key mods code]}]
    (and
      (or (nil? key) (= key (:key data)))
      (or (nil? code) (= code (:code data)))
      (= (set (:mods data)) (set mods))))
  
  :dom.input/value
  (fn [{:keys [root]} selector]
    (-> root
      (.querySelector
        (cond-> selector
          (keyword? selector)
          (-> z/component-name (str/replace #"[.]" "\\."))))
      .-value)))

(z/component
  :name :z/app
  :props {:items (bnd :ze.db/path [:todo-items])}
  :view (fn [{:keys [items]}]
          (let [completed-items (vec (filter :completed? items))]
            [:root>
             :z/css [(js/URL. "node_modules/todomvc-common/base.css" js/document.baseURI)
                     (js/URL. "node_modules/todomvc-app-css/index.css" js/document.baseURI)]
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
                :z/on {:keydown (act [:ze/cond
                                      [(<< :event.kb/match-key? {:key "Enter"})
                                       [:ze.db/patch
                                        [{:path [:todo-items]
                                          :conj {:text       (<< :dom.input/value :input)
                                                 :completed? false
                                                 :editing?   false}}]]]])}]]
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
                "TodoMVC"]]]])))