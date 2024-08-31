(ns snapshots-test
  (:require
   [cljs.test :refer [deftest is]]
   [cljs.pprint :refer [pprint]]
   [zero.demos.todo.todo]
   ["node:fs" :as fs]
   ["node:path" :as path]))

(defn- snap
  [k data]
  (let [common-path (str (munge (namespace k)) "/" (munge (name k)) ".edn")
        accepted-snapshot-path (str "test/snapshots/accepted/" common-path)
        current-snapshot-path (str "test/snapshots/current/" common-path)
        current-snapshot (with-out-str (pprint data))
        accepted-snapshot (when (fs/existsSync accepted-snapshot-path) (-> (fs/readFileSync accepted-snapshot-path) .toString))]
    (fs/mkdirSync (path/dirname current-snapshot-path) #js{:recursive true})
    (fs/writeFileSync current-snapshot-path current-snapshot)
    (if (some? accepted-snapshot)
      (is (= current-snapshot accepted-snapshot))
      (do
        (fs/mkdirSync (path/dirname accepted-snapshot-path) #js{:recursive true})
        (fs/writeFileSync accepted-snapshot-path current-snapshot)))))


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
