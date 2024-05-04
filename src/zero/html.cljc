(ns zero.html "
Functions for rendering Zero markup as HTML.

For vector forms with tags matching registered
elements, and whose registration includes a
`:zero.html/render? true` option; the components
view will be rendered as a declarative shadow DOM.
"
  (:require
   [clojure.string :as str]
   [zero.impl.markup :refer [preproc-vnode clj->css-property kw->el-name flatten-body]]
   [zero.impl.injection :refer [apply-injections]]
   [zero.impl.base :refer [str-writer str-writer->str write] :as base]
   [zero.core :as z]
   [zero.dom :as-alias dom]
   [zero.config :as zconfig]
   [zero.logger :as log])
  #?(:clj
     (:import
      [java.net URI URL])))

(declare ^:private write-vnode)

(defn- maybe-write-shadow-dom
  [w tag markup-props opts]
  (let [spec (get-in @zconfig/!registry [:components tag])]
    (when (::render? spec)
      (let [spec-props (if (set? (:props spec))
                         (into {} (map (juxt identity (constantly :default)) (:props spec)))
                         (:props spec))
            view-props (->> spec-props
                         (keep
                           (fn [[k v]]
                             (cond
                               (or
                                 (= v :default)
                                 (= v :field)
                                 (and
                                   (map? v)
                                   (string? (:field v))
                                   (not (:state v))
                                   (not (:state-factory v))))
                               [k (get markup-props (-> k name str/lower-case))]

                               (or
                                 (= v :attr)
                                 (and
                                   (map? v)
                                   (string? (:attr v))
                                   (not (:state v))
                                   (not (:state-factory v))))
                               (let [writer (zconfig/get-attr-writer tag)
                                     reader (zconfig/get-attr-reader tag)]
                                 [k (reader (writer (get markup-props (-> k name str/lower-case))))])

                               (:state v)
                               [k (base/try-deref v)])))
                         (into {}))
            view-result ((:view spec) view-props)
            [shadow-root-props
             shadow-root-body] (cond
                                 (and
                                   (vector? view-result)
                                   (= (first view-result) :root>))
                                 (-> view-result preproc-vnode rest)

                                 (seq? view-result)
                                 [{} view-result]

                                 :else
                                 [{} [view-result]])]
        (write-vnode w
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
                  [(::z/css shadow-root-props)]))))
          opts)))))

(defn- normalize-prop-names
  [props]
  (persistent!
    (reduce-kv
      (fn [m k v]
        (if (or (string? k) (nil? (namespace k)))
          (assoc! m (-> k name str/lower-case) v)
          (assoc! m k v)))
      (transient {})
      props)))

(defn- escape-quotes
  [s]
  (str/replace s #"\"" "&quot;"))

(defn- write-vnode
  [w vnode opts]
  (cond
    (vector? vnode)
    (let [[tag props body] (preproc-vnode vnode)
          write-attribute (zconfig/get-attr-writer tag)
          props (normalize-prop-names props)
          needs-id? (some some? (concat (vals (::z/bind props)) (vals (::z/on props))))
          has-id? (contains? props "id")
          props (cond-> props (and needs-id? (not has-id?)) (assoc "id" (name (gensym)))) 
          html-tag (kw->el-name tag)]
      (write w \< html-tag)
      (when (seq props)
        (doseq [[k v] props :when (keyword k)]
          (cond
            (or (string? k) (nil? (namespace k))) 
            (let [attr-name (name k)
                  attr-val (-> v (write-attribute attr-name tag) str)]
              (write w \space attr-name \= \" (escape-quotes attr-val) \"))
            
            :else
            (case k
              ::z/class
              (let [classes (flatten (::z/class props))]
                (when (seq classes)
                  (write w " class=\"" (-> classes first name escape-quotes))
                  (doseq [class (rest classes)]
                    (write w \space (-> class name escape-quotes)))
                  (write w \")))
              
              ::z/style
              (let [style (::z/style props)]
                (when (seq style)
                  (write w " style=\"")
                  (doseq [[k v] (::z/style props) :when (some? v)]
                    (write w (name k) \: (-> v clj->css-property escape-quotes) \;))
                  (write w \")))
              
              nil))))
      (write w \>)
      (maybe-write-shadow-dom w tag props opts)
      (cond
        (= "script" html-tag)
        (doseq [x body]
          (write w x))
        
        :else
        (doseq [x body]
          (write-vnode w x opts)))
      (write w \< \/ html-tag \>)
      
      (let [node-selector (str "#" (get props "id"))]
        (doseq [[k v] (::z/on props)]
          (write-vnode w
            [::dom/listen
             {:sel node-selector
              :evt k
              :act v}]
            opts))
        
        (doseq [[k v] (::z/bind props)]
          (write-vnode w
            [::dom/bind
             {:sel node-selector
              :prop k
              :ref v}]
            opts))))

    :else
    (write w (-> vnode str (str/replace #"[<>]" #(case % "<" "&gt;" ">" "&lt;"))))))

(defn write-html "
Write Zero markup to a writer as HTML.
"
  {:arglists
   '[[w & markup]
     [w & {:keys [doctype]} & markup]]}
  [w & args]
  (let [[opts markup] (if (map? (first args)) [(first args) (rest args)] [{} args])]
    (when-let [doctype (:doctype opts)]
      (write w "<!DOCTYPE " doctype ">"))
    (doseq [vnode (flatten-body (apply-injections markup (or (:context opts) {})))]
      (write-vnode w vnode opts))))

(defn html "
Format Zero markup as an HTML string.
"
  {:arglists
   '[[& markup]
     [{:keys [doctype]} & markup]]}
  [& args]
  (let [w (str-writer)]
    (apply write-html w args)
    (str-writer->str w)))