(ns zero.clj.html-test
  (:require
   [clojure.string :as str]
   [clojure.test :refer [deftest is]]
   [zero.html :as html]
   [zero.core :as-alias z]
   [zero.config :as zc]))

(deftest simple-rendering
  (is
    (=
      (html/html [:div :foo "bar" "BAZ"])
      "<div foo=\"bar\">BAZ</div>"))
  (is
    (=
      (html/html [:div :foo "bar" "BAZ"])
      (html/html [:div {:foo "bar"} "BAZ"]))))

(deftest quote-escaping
  (is
    (=
      (html/html [:div :foo "\"bar\""])
      "<div foo=\"&quot;bar&quot;\"></div>"))
  (is
    (not
      (str/includes?
        (html/html
          [:div
           ::z/class ["something" "\"other\""]
           ::z/style {:font-family "\"Something\""}])
        "\""))))

(deftest doctype
  (is
    (str/starts-with?
      (html/html {:doctype "html"}
        [:div "foo"])
      "<!DOCTYPE html>")))

(deftest declarative-shadow
  (zc/reg-components
    :x/something
    {::html/render? true
     :props #{:foo}
     :view (fn [{:keys [foo]}] [:div foo])})
  (is
    (=
      (html/html
        [:x/something :foo "BAR"])
      "<x-something foo=\"BAR\"><template shadowrootmode=\"open\"><div>BAR</div></template></x-something>")))