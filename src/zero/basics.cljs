(ns zero.basics
  (:require
    [zero.core :as z]))

(z/reg-effect
  :cond
  (fn [& cases]
    (when-let [[_ & effects] (first (filter first cases))]
      (doseq [effect effects]
        (z/do-effect effect))))

  :effects
  (fn [effects]
    (doseq [effect effects]
      (z/do-effect effect))))

(z/reg-injector
  :context
  (fn [context & path]
    (get-in context path)))

(z/reg-injector
  :call
  (fn [_ f & args]
    (apply f args)))

