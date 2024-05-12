(ns zero-to-one.server
  (:require
   [reitit.ring :as rr]
   [ring.middleware.defaults :as def]
   [ring.adapter.jetty :as adapter]
   [ring.util.response :as resp]
   [zero.html :as h]))

(def home
  [:html
   [:head
    [:title "Zero to One"]
    [:link {:href "/css/styles.css"
            :rel "stylesheet"}]
    [:script {:src "/js/main.js"}]]
   [:body
    [:incrementing-button {:clicks 0}]]])

(defn home-handler [_request]
  (-> home
      h/html
      (resp/response)
      (resp/content-type "text/html")
      (resp/charset "UTF-8")))

(def handler
  (rr/ring-handler
   (rr/router ["/" home-handler])
   (rr/routes
    (rr/create-resource-handler {:path "/"})
    (rr/create-default-handler))
   {:middleware [[def/wrap-defaults def/site-defaults]]}))

(defn run-server [options]
  (adapter/run-jetty #'handler options))
