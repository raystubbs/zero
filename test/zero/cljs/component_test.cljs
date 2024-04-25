(ns zero.cljs.component-test
  (:require
   [zero.testing :refer [deftest testing is]]
   [zero.core :as z]
   [zero.config :as zc]
   [zero.component]))

(defn inspect-after-render [el]
  (js/Promise.
    (fn [resolve reject]
      (.addEventListener (.-shadowRoot el) "render"
        (fn []
          (try
            (resolve (.-shadowRoot el))
            (catch :default ex
              (reject ex))))
        #js{:once true}))))

(deftest component-renders
  (zc/reg-components
    ::something
    {:props #{:foo}
     :view (fn [{:keys [foo]}]
             [:div foo])})
  (let [el (js/document.createElement (z/element-name ::something))]
    (js/document.body.append el)
    (set! (.-foo el) "BAR")
    (-> (inspect-after-render el)
      (.then
        (fn [shadow-dom]
          (let [first-el (.-firstChild shadow-dom)]
            (is (= "DIV" (.-nodeName first-el)))
            (is (= "BAR" (.-innerText first-el)))))))))