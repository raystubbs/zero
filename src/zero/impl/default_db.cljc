(ns zero.impl.default-db
  (:require
    [subzero.core :as sz]))

(defonce !default-db (sz/create-db))
