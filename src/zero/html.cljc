(ns zero.html
  (:require
   [clojure.string :as str]
   [zero.impl.markup :refer [preproc-vnode clj->css-property kw->el-name flatten-body]]
   [zero.impl.injection :refer [apply-injections]]
   [zero.impl.base :as base]
   [zero.core :as z]
   [zero.dom :as-alias dom]
   [zero.config :as zconfig])
  #?(:clj
     (:import
      [java.net URI URL])))

(declare vnode->html)

(defn maybe-shadow-dom [tag markup-props]
  (let [spec (get-in @zconfig/!registry [:components tag])]
    (when (::render? spec)
      (let [spec-props (if (set? (:props spec))
                         (into {} (map (juxt identity (constantly :default)) (:props spec)))
                         (:props spec))
            view-props (->> spec-props
                         (keep
                           (fn [[k v]]
                             [k
                              (cond
                                (or
                                  (= v :default)
                                  (= v :field)
                                  (and
                                    (map? v)
                                    (::use? v)
                                    (string? (:field v))
                                    (not (:state v))
                                    (not (:state-factory v))))
                                (get markup-props k)

                                (or
                                  (= v :attr)
                                  (and
                                    (map? v)
                                    (::use? v)
                                    (string? (:attr v))
                                    (not (:state v))
                                    (not (:state-factory v))))
                                (let [writer (zconfig/get-attr-writer tag)
                                      reader (zconfig/get-attr-reader tag)]
                                  (reader (writer (get markup-props k))))

                                (and (map? v) (::use? v))
                                (if-let [state (:state v)]
                                  (base/try-deref state)
                                  (throw
                                    (ex-info "Prop marked as usable for `zero.html`, but isn't"
                                      {:component tag :prop k}))))]))
                         vec
                         (into {}))
            view-result ((:view spec) view-props)
            [shadow-root-props shadow-root-body] (cond
                                                   (and (vector? view-result) (= (first view-result) :root>))
                                                   (let [[_ props body] (preproc-vnode view-result)]
                                                     [props body])

                                                   (seq? view-result)
                                                   [{} view-result]

                                                   :else
                                                   [{} [view-result]])]
        (vnode->html
          (into [:template :shadowrootmode "open"]
            (concat shadow-root-body
              (keep
                (fn [css-val]
                  (when
                    (or (string? css-val)
                      #?(:cljs (instance? js/URL css-val)
                         :clj (or (instance? URI css-val) (instance? URL css-val))))
                    [:link :rel "stylesheet" :href (str css-val)]))
                (if (coll? (::z/css shadow-root-props))
                  (::z/css shadow-root-props)
                  [(::z/css shadow-root-props)])))))))))

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
        (maybe-shadow-dom tag props)
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