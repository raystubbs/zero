(ns ^:no-doc zero.impl.markup
  (:require
   [clojure.string :as str]))

(defn flatten-body [body]
  (mapcat
    (fn flattener [item]
      (cond
        (seq? item) (mapcat flattener item)
        (nil? item) nil
        :else [item]))
    body))

(defn- normalize-vnode "
Given a vnode like `[tag-or-tags {...props}|...props & body]`
yields `[tag-or-tags props body]`.
" [vnode]
  (if (map? (nth vnode 1 nil))
    [(nth vnode 0) (nth vnode 1) (flatten-body (nthrest vnode 2))]
    (loop [props {}
           [prop-name prop-val & other :as all] (rest vnode)]
      (if-not (keyword? prop-name)
        [(nth vnode 0) props (flatten-body all)]
        (recur (assoc props prop-name prop-val)
          other)))))

(comment
  (normalize-vnode
    [:div
     :on-click "blah"
     :zero.core/class :none
     "Something else"]))

(defn- extract-tag-props "
Given a normalized vnode, parses the ids and classes
out of the tag and into the props, adding a `:zero.core/sel`
prop containing the original
tag.
" [[tag props body]]
  (if-let [[_ type id classes] (re-matches #"^([^#.]+)([#][^.]+)?([.].+)?$" (name tag))]
    [(keyword (namespace tag) type)
     (cond-> props
       true (assoc :zero.core/sel tag)
       (not (str/blank? id)) (assoc :id (subs id 1))
       (not (str/blank? classes)) (assoc :zero.core/class
                                    (->> [(some-> classes (str/split #"[.]")) (:zero.core/class props)]
                                      flatten (remove str/blank?) (map name) vec not-empty)))
     body]
    (throw (ex-info "Invalid tag" {:tag tag}))))

(comment
  (extract-tag-props
    [:div#my-thing.foo.bar {:zero.core/class "something"} (list "body")]))

(defn preproc-vnode "
Simplifies the vnode, parsing out the classes and id from
the tag, and converting compound tags (i.e `[:div :span]`)
into nested vnodes, and accumulating the whole body into
one sequence.
" [vnode]
  (let [[tag-or-tags props body] (normalize-vnode vnode)]
    (->
      (cond
        (keyword? tag-or-tags)
        [tag-or-tags props body]

        (vector? tag-or-tags)
        (case (count tag-or-tags)
          0 (throw (ex-info "Invalid tag" {:tag tag-or-tags}))
          1 [(first tag-or-tags) props body]
          [(first tag-or-tags) (select-keys props [:zero.core/key])
           (list
             (reduce
               (fn [m middle-tag]
                 (extract-tag-props [middle-tag {} (list m)]))
               (extract-tag-props [(last tag-or-tags) (dissoc props :zero.core/key) body])
               (-> tag-or-tags butlast rest)))]))
      extract-tag-props)))

(comment
  (preproc-vnode
    [[:div.foo :span#thing.bar :i]
     :on-click :do-something
     "The" "body"])
  (preproc-vnode
    [::foo :on-click "my-thing"]))

(defn clj->css-property [x]
  (cond
    (or (keyword? x) (symbol? x))
    (name x)

    (vector? x)
    (str/join " " (map clj->css-property x))

    (seq? x)
    (str/join ", " (map clj->css-property x))

    :else
    (str x)))

(defn kw->el-name [tag]
  (->
    (if-let [ns (namespace tag)]
      (str ns "-" (name tag))
      (name tag))
    (str/replace #"[^A-Za-z0-9._-]+" "-")
    str/lower-case))