(ns ^:deprecated zero.extras.db "
Deprecated.  Use SubZero's rstore instead.
"
  (:refer-clojure :exclude [get])
  (:require
    [zero.config :as zc]
    [subzero.rstore :as rstore]
    [zero.impl.base :as base]))

(defonce ^:private !db (rstore/rstore {}))

(zc/reg-streams
  ::path
  (fn [rx path]
    (rstore/watch !db [::path path] path
      (fn [_ new-val _]
        (rx new-val)))
    (rx (get-in @!db path))
    (fn db-path-stream-cleanup []
      (rstore/unwatch !db [::path path]))))

(defn get
  [path]
  (get-in @!db path))

(zc/reg-injections
  ::path
  (fn [_ path]
    (get-in @!db path)))

(defn apply-patch [m patch]
  (rstore/calc-patch rstore/default-operators m (base/convert-patch patch)))

(defn patch!
  [patch]
  (rstore/patch! !db (base/convert-patch patch)))

(zc/reg-effects
  ::patch
  (fn [patch]
    (patch! patch)))
