(ns zero.extras.util.effects
  (:require
    [zero.core :as z]))

(z/reg-effect
  :ze/cond
  (fn [& cases]
    (when-let [[_ & effects] (first (filter first cases))]
      (doseq [effect effects]
        (z/do-effects! effect))))

  :ze/effects
  (fn [effects]
    (doseq [effect effects]
      (z/do-effects! effect))))
