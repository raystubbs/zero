(ns ^:deprecated zero.extras.dom
  (:require
   [zero.core :as z]
   [zero.config :as zc]))

(zc/reg-components
  ::echo
  {:inherit-doc-css? true
   :props #{:vdom}
   :view (fn [{:keys [vdom]}]
           vdom)})

(defn ^:deprecated slotted-elements-prop [& {:keys [selector slots] :as opts}]
  (z/slotted-prop opts))