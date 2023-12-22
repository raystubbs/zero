(ns zero.impl.bindings)

(deftype Binding [props stream-key args]
  Object
  (equals [_ ^Binding other]
    (and
      (instance? Binding other)
      (= stream-key (.-stream-key other))
      (= args (.-args other))
      (= props (.-props other))))
  (hashCode [_]
    (hash [props stream-key args]))
  (toString [_]
    (pr-str
      (concat
        ['bnd stream-key]
        (when (seq props)
          [props])
        args))))