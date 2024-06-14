(ns zero-to-one.client-test
  (:require [cljs.test :refer [deftest async is use-fixtures]]
            [zero-to-one.client :as client]
            [zero.component]))

(defn- make-incrementing-button
  []
  (.createElement js/document "incrementing-button"))

(defn- get-incrementing-button
  []
  (.querySelector js/document "incrementing-button"))

(defn- attach-to-dom!
  [el on-complete]
  (js/document.body.append el)
  (js/Promise.
   (fn [resolve reject]
     (.addEventListener (.-shadowRoot el) "render"
                        (fn []
                          (try
                            (on-complete)
                            (resolve el)
                            (catch :default ex
                              (reject ex)))
                          #js {:once true})))))

(use-fixtures :each
  {:before #(async done
                   (-> (make-incrementing-button)
                       (attach-to-dom! done)))
   :after #(async done
                  (.remove (get-incrementing-button))
                  (reset! client/clicks* 0)
                  (done))})

(deftest incrementing-button-is-registered
  (is (js/customElements.get "incrementing-button")))

(deftest incrementing-button-test
  (async done
         (let [button         (get-incrementing-button)
               contents       (.-firstChild (.-shadowRoot button))
               initial-clicks @client/clicks*]
           (.click contents)
           (-> (js/Promise.resolve contents)
               (.then
                (fn []
                  (let [clicks @client/clicks*]
                    (is (= 0 initial-clicks))
                    (is (= 1 clicks)))
                  (done)))))))

