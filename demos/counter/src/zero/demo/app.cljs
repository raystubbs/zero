(ns zero.demo.app
  (:require
   [zero.core :refer [<< act bnd] :as z]
   [zero.config :as zc]
   [zero.extras.all]))

(defonce !count (atom nil))

(zc/reg-streams
  ::count
  (fn count-stream-setup [rx & _args]
    (let [interval (js/setInterval #(swap! !count inc) 1000)]
      (reset! !count 0)
      (rx @!count)
      (add-watch !count ::count (fn [_ _ _ v] (rx v)))

      ;; cleanup when the stream winds down
      (fn count-stream-cleanup []
        (js/clearInterval interval)))))

(zc/reg-effects
  ::dispatch-event
  (fn dispatch-event! [target type]
    (.dispatchEvent target (js/Event. (name type))))

  ::reset-count
  (fn reset-count! []
    (reset! !count 0)))

(zc/reg-components
  ::counter
  {:props #{:count}
   :view  (fn [{:keys [count]}]
            [:root>
             count
             [:button
              :z/style {:margin-left "1rem"}
              :z/on {:click (act {:log? true} [::dispatch-event (<< :ze/ctx :host) :reset])}
              "Reset"]])}

  :z/app
  {:view (fn []
           [::counter
            :count (bnd ::count)
            :z/on {:reset (act {:log? true} [::reset-count])}])})