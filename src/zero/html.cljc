(ns zero.html
  (:require
    [clojure.string :as str]
    [zero.impl.markup :refer [preproc-vnode clj->css-property kw->el-name flatten-body]]
    [zero.impl.injection :refer [apply-injections]]
    [zero.config :as zconfig]))

(declare html)

(defn- vnode->html [vnode]
  (cond
    (vector? vnode)
    (let [[tag props body] (preproc-vnode vnode)
          write-attribute (zconfig/get-attr-writer tag)
          html-attrs (reduce-kv
                       (fn [agg k v]
                         (cond
                           (= k :zero.core/class)
                           (assoc agg (name k)
                             (cond
                               (coll? v) (str/join " " (flatten v))
                               (or (symbol? v) (keyword? v)) (name v)
                               :else (str v)))

                           (= k :zero.core/style)
                           (do
                             (assert (map? v))
                             (assoc agg (name k)
                               (str/join (map #(str (name (key %)) ":" (clj->css-property (val %)) ";") v))))

                           (and (some? v) (nil? (namespace k)))
                           (let [attr-name (name k)
                                 attr-value (write-attribute v attr-name)]
                             (cond-> agg
                               (some? attr-value)
                               (assoc (name k) attr-value)))

                           :else
                           agg))
                       {}
                       props)
          html-tag (kw->el-name tag)]
      (str
        "<" html-tag
        (when (seq html-attrs)
          (str " "
            (->> html-attrs
              (map #(str (key %) "=\"" (str/replace (str (val %)) #"\"" "&quot;") "\""))
              (str/join " "))))
        ">"
        (->> body (map vnode->html) str/join)
        "</" html-tag ">"))

    :else
    (-> vnode str (str/replace #"[<>]" #(case % "<" "&gt;" ">" "&lt;")))))

(defn html [& markup]
  (str/join (map vnode->html (flatten-body (apply-injections markup {})))))