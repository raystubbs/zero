(ns zero.demos.todo.app
  (:require
   [zero.config :as zc]
   [zero.wcconfig :as zwc]
   [zero.dom :as zd]
   [zero.core :refer [<<ctx act] :as z]
   [subzero.rstore :as rstore]
   [zero.demos.todo.todo]))

(defonce !store (rstore/rstore {:items [] :input ""}))

(zc/reg-effects
  ::patch
  (fn [patch]
    (rstore/patch! !store patch)))

(defn- view
  []
  [:zero.todo/todo
   :#bind {:model !store}
   :#on {:patch (act [::patch (<<ctx ::z/data)])}])

(zc/reg-components
  :zero.todo/app
  {:view view})

(defn init
  []
  (zc/install! zc/!default-db)
  (zwc/install! zc/!default-db)
  (zd/install! zc/!default-db))
