(ns zero.demo.db
  (:require
   [zero.core :as z]))

(defonce !db (atom {:todo-items []}))

(defmethod z/effect :db/add-todo [_ todo-item]
  (swap! !db update :todo-items conj todo-item))

(defmethod z/effect :db/rm-todo [_ index]
  (swap! !db update :todo-items #(into (subvec % 0 index) (subvec % (inc index)))))

(defmethod z/effect :db/replace-todo [_ index todo-item]
  (swap! !db assoc-in [:todo-items index] todo-item))

(defmethod z/effect :db/replace-todos [_ todo-items]
  (swap! !db assoc :todo-items todo-items))

(defmethod z/stream :db/todo-items [_ rx]
  (rx (get @!db :todo-items))
  (add-watch !db ::todo-items
    (fn [_ _ {old-todo-items :todo-items} {new-todo-items :todo-items}]
      (when (not= old-todo-items new-todo-items)
        (rx new-todo-items))))

  #(remove-watch !db ::todo-items))