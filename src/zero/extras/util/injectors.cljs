(ns zero.extras.util.injectors
  (:require
    [zero.core :as z]))

(z/reg-injector
  :ze/ctx
  (fn [context & path]
    (get-in context path))

  :ze/call
  (fn [_ f & args]
    (apply f args))

  :ze/act
  (fn [_ & args]
    (apply z/act args))

  :ze/<<
  (fn [_ & args]
    (apply z/<< args)))
