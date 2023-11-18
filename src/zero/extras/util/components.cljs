(ns zero.extras.util.components
  (:require
    [zero.core :as z]))

(z/component
  :name :ze/echo
  :inherit-doc-css? true
  :props #{:vdom}
  :view (fn [{:keys [vdom]}] vdom))
