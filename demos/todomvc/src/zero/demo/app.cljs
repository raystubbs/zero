(ns zero.demo.app
  (:require
   [clojure.string :as str]
   [zero.core :refer [<< act bnd] :as z]
   [zero.config :as zc]
   [zero.extras.util :as zu]
   [zero.extras.all]
   [zero.demo.view :as view]))

(zc/reg-injections
  ::view/css-urls
  (fn []
    [(js/URL. "node_modules/todomvc-common/base.css" js/document.baseURI)
     (js/URL. "node_modules/todomvc-app-css/index.css" js/document.baseURI)])

  :event.kb/match-key?
  (fn [{:keys [data]} {:keys [key mods code]}]
    (and
      (or (nil? key) (= key (:key data)))
      (or (nil? code) (= code (:code data)))
      (= (set (:mods data)) (set mods))))

  :dom.input/value
  (fn [{:keys [root]} selector]
    (some-> root
      (.querySelector (zu/css-selector selector))
      .-value)))

(zc/reg-components
  :z/app
  {:props {:items (bnd :ze.db/path [:todo-items])
           :new-item (bnd :ze.db/path [:new-item])}
   :view view/app-view})