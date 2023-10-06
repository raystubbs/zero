(ns demo
  (:require
   [zero.core :refer [<< ||] :as z]
   [devtools.core :as devtools]))

(let [{:keys [cljs-land-style]} (devtools/get-prefs)]
  (devtools/set-pref! :cljs-land-style (str "filter:invert(1);" cljs-land-style)))
(devtools/install!)


(z/component
 :name :z-app
 :view (fn []
         [:div.target
          [:link :rel "stylesheet" :href "/css/main.css"]
          "Hello, World!"]))

(defn init []
  )