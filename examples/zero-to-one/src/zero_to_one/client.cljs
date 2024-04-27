(ns zero-to-one.client
  (:require [zero.core :as z]
            [zero.config :as zc]
            [zero.component]))

(defonce clicks*
  (atom 0))

(defn on-click
  [_event]
  (swap! clicks* inc))

(defn button-view
  [{:keys [clicks]}]
  [:root>
   ::z/on {:click on-click}
   ::z/css "/css/styles.css"
   [:button (str "Clicked " clicks " times")]])

(zc/reg-components
 :incrementing-button {:view button-view
                       :props {:clicks clicks*}})
