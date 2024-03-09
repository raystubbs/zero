(ns zero.html
  (:require
   [clojure.string :as str]
   [zero.impl.markup :refer [preproc-vnode clj->css-property kw->el-name flatten-body]]
   [zero.impl.injection :refer [apply-injections]]
   [zero.core :as z]
   [zero.dom :as-alias dom]
   [zero.config :as zconfig]))

(defn- vnode->html [vnode]
  (cond
    (vector? vnode)
    (let [[tag props body] (preproc-vnode vnode)
          write-attribute (zconfig/get-attr-writer tag)
          html-attrs (reduce-kv
                       (fn [agg k v]
                         (cond
                           (= k ::z/class)
                           (assoc agg (name k)
                             (cond
                               (coll? v) (str/join " " (flatten v))
                               (or (symbol? v) (keyword? v)) (name v)
                               :else (str v)))

                           (= k ::z/style)
                           (do
                             (assert (map? v))
                             (assoc agg (name k)
                               (str/join (map #(str (name (key %)) ":" (clj->css-property (val %)) ";") v))))

                           (and (some? v) (nil? (namespace k)))
                           (let [attr-name (name k)
                                 attr-value (write-attribute v attr-name tag)]
                             (cond-> agg
                               (some? attr-value)
                               (assoc (name k) attr-value)))

                           :else
                           agg))
                       {}
                       props)
          html-attrs (cond-> html-attrs
                       (and (nil? (get html-attrs "id")) (or (some? (::z/bind props)) (some? (::z/on props))))
                       (assoc "id" (name (gensym))))
          html-tag (kw->el-name tag)]
      (str
        "<" html-tag
        (when (seq html-attrs)
          (str " "
            (->> html-attrs
              (map #(str (key %) "=\"" (str/replace (str (val %)) #"\"" "&quot;") "\""))
              (str/join " "))))
        ">"
        (cond
          (= "script" html-tag)
          (->> body str/join)
          
          :else
          (->> body (map vnode->html) str/join))
        "</" html-tag ">"
        (->>
          (concat
            (map
              (fn [[k v]]
                [::dom/listen
                 {:sel (str "#" (get html-attrs "id"))
                  :evt k
                  :act v}])
              (::z/on props))
            (map
              (fn [[k v]]
                [::dom/bind
                 {:sel (str "#" (get html-attrs "id"))
                  :prop k
                  :ref v}])
              (::z/bind props)))
          (map vnode->html)
          str/join)))

    :else
    (-> vnode str (str/replace #"[<>]" #(case % "<" "&gt;" ">" "&lt;")))))

(defn html [& markup]
  (str/join (map vnode->html (flatten-body (apply-injections markup {})))))