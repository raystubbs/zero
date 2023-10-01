(ns demo
  (:require
   ["react" :as react]
   [zero.impl.comp :refer [component component-name] :as comp]
   [devtools.core :as devtools]))

(let [{:keys [cljs-land-style]} (devtools/get-prefs)]
  (devtools/set-pref! :cljs-land-style (str "filter:invert(1);" cljs-land-style)))
(devtools/install!)

(defn zero-card [kw !data]
  (apply
   react/createElement
   (component-name kw)
   (clj->js @!data)))

(def !text (atom "Hello, World!"))

(component
 :name ::todo
 :props {:theme :prop}
 :view (fn [{:keys [theme]}]
         [:div [::comp/render {:vdom !text}]]))

(def cards
  [{:name "Todo"
    :comp ::todo
    :props {:theme :dark}
    :description "Testing"}])

(component
 :name :z-app
 :view (fn []
         (map
          (fn [{:keys [name description comp props]}]
            [:div
             [:h2 name]
             [:p description]
             [comp props]])
          cards)))

(defn init []
  )