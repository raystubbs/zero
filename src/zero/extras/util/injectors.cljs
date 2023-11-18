(ns zero.extras.util.injectors
  (:require
    [zero.core :as z]))

(z/reg-injector
  :ze/ctx
  (fn [context & path]
    (get-in context path)))

(z/reg-injector
  :ze/call
  (fn [_ f & args]
    (apply f args)))
