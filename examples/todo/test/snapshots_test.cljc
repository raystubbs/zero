(ns snapshots-test
  (:require
   [cljs.test :refer [deftest]]
   [zero.demos.todo.todo]
   [zero.tools.test :refer [snap]]))

(deftest todo-view-snapshots
  (let [todo-view @(resolve 'zero.demos.todo.todo/view)]
    (snap ::todo-view-initial
      (todo-view {:model {:items [] :input ""}}))
    (snap ::todo-view-w-input
      (todo-view {:model {:items [] :input "Foo"}}))
    (snap ::todo-view-w-completed-item
      (todo-view {:model {:items [{:text "Foo" :completed? true}] :input ""}}))
    (snap ::todo-view-w-editing-item
      (todo-view {:model {:items [{:text "Foo" :editing? true}] :input ""}}))
    (snap ::todo-view-w-items
          (todo-view {:model {:items [{:text "Foo"} {:text "Bar"}] :input ""}}))))
