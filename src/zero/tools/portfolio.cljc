(ns zero.tools.portfolio
  #?(:cljs (:require-macros zero.tools.portfolio))
  (:require
   #?(:clj [portfolio.core :as portfolio])
   [subzero.plugins.html :as html]
   [zero.config :as zc]
   [subzero.logger :as log]))

#?(:cljs
   (def ^:private component-impl
     {'portfolio.adapter/render-component
      (fn [{:keys [component]} el]
        (try
          (set! (.-innerHTML el) (html/html zc/!default-db component))
          (catch :default ex
            (log/error "Render error" :ex ex))))}))

#?(:clj
   (defmacro defscene
     {:clj-kondo/lint-as 'clj-kondo.lint-as/def-catch-all}
     [id & opts]
     (when (portfolio/portfolio-active?)
       `(portfolio.data/register-scene!
          (portfolio.adapter/prepare-scene ~(portfolio/get-options-map id (:line &env) opts) component-impl)))))
