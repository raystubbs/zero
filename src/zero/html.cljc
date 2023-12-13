(ns zero.html
  (:require
    [clojure.string :as str]
    [zero.impl.markup :refer [preproc-vnode clj->css-property kw->el-name flatten-body]]
    [zero.config :as zconfig]))

(declare html)

(defn- vnode->html [vnode]
  (cond
    (vector? vnode)
    (let [[tag props body] (preproc-vnode vnode)
          html-attrs (reduce-kv
                       (fn [agg k v]
                         (cond
                           (= k :z/class)
                           (assoc agg (name k)
                             (cond
                               (coll? v) (str/join " " (flatten v))
                               (or (symbol? v) (keyword? v)) (name v)
                               :else (str v)))

                           (= k :z/style)
                           (do
                             (assert (map? v))
                             (assoc agg (name k)
                               (str/join (map #(str (name (key %)) ":" (clj->css-property (val %)) ";") v))))

                           (and (some? v) (nil? (namespace k)))
                           (let [attr-name (name k)
                                 attr-value (zconfig/write-attribute tag attr-name v)]
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
    (str vnode)))

(defn html [& markup]
  (str/join (map vnode->html (flatten-body markup))))