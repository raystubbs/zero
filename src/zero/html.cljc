(ns ^:deprecated zero.html "
Functions for rendering Zero markup as HTML.

For vector forms with tags matching registered
elements, and whose registration includes a
`:zero.html/render? true` option; the components
view will be rendered as a declarative shadow DOM.

This namespace is deprecated, use [[subzero.plugins.html]]
instead.
"
  (:require
   [zero.dom :as-alias dom]
   [zero.config :as zc]
   [subzero.plugins.html :as html]))

(defn write-html "
Write Zero markup to a writer as HTML.
"
  {:arglists
   '[[w & markup]
     [w {:keys [doctype]} & markup]]}
  [w & args]
  (apply html/write-html zc/!default-db w args))

(defn html "
Format Zero markup as an HTML string.
"
  {:arglists
   '[[& markup]
     [{:keys [doctype]} & markup]]}
  [& args]
  (apply html/html zc/!default-db args))