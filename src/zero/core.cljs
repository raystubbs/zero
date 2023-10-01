(ns zero.core
  (:require
   [zero.impl.actions :as act]
   [zero.impl.bindings :as bnd]
   [zero.impl.comp :as comp]
   [zero.impl.injection :as inj]))

(defn act "
Construct an action.

```clojure
[:button
 :on-click (act :do-something (<< :inject-something)
                :do-something-else \"some data\")
 \"Click Me!\"]

```

An action is a representation of a collection of
effects as data.  Actions can be called, and expect
a `js/Event` as input.  Actions can be compared, hashed,
printed, etc. as data.
"
  [& effects]
  (as-> effects $
    (partition-all 2 $)
    (reduce
     (fn [agg effect]
       (cond
         (not= 2 (count effect))
         (throw (ex-info "Missing payload for effect" {:effect-key (first effect)}))
  
         :else
         (let [[effect-key effect-payload] effect]
           (update agg effect-key #(conj (or % []) effect-payload)))))
     {} $)
    (act/Action. $)))

(def effect "
MultiFn used to define effects.

```clojure
(defmethod effect ::echo [_ payload _]
  (prn payload))

(act ::echo \"Hello, World!\")

(defmethod effect :event/trace [_ _ {:keys [event]}]
  (js/console.log event))

(act :event/trace nil)
```
"
  act/effect)

(defn bnd "
Construct a binding.

```clojure
[:input
 :value (bnd :db/something || \"Default Value\")]
```

A binding is a reference to an external data stream,
represented as data.  Bindings are IWatchable, and
any updates in the underlying data stream will be
reflected in the properties they're bound to.  Bindings
can also be compared, hashed, printed, etc. as data.
"
  [stream-key & other]
  (let [sep-index (loop [cur-idx 0
                         [x & xs] other]
                    (cond
                      (= x bnd/||) cur-idx
                      (nil? x) nil
                      :else (recur (inc cur-idx) xs)))
        [args [_ default]] (if sep-index
                             (split-at sep-index other)
                             [other nil])]
    (bnd/Binding. stream-key (vec args) default)))

(def stream "
MultiFn used to define data streams.

```clojure
(defonce !db (atom {}))

(defmethod :db [_ rx path]
  (rx (get-in @!db path)))
```

If a function is returned it will be called to cleanup
the stream when it's spun down.

Each pair of `[stream-key args]` represents a unique
stream instance, so the method will be called only once
for each set of args used with the stream; until the
stream has been spun down and must be restarted.
"
  bnd/stream)

(def || "
Used as a marker to separate bindings args from the
default value.
"
  bnd/||)

(defn << "
Used to indicate an injection point in actions or bindings.
```clojure
  (act :do-something (<< :inject-some-data))
  (bnd :something (<< :inject-some-data))

  (defmethod inject :inject-some-data [_ _args _ctx]
    \"Some data\")
```

For actions the injection occurs for the full action
(all effects) before any of the effects can be dispatched. If
an error occurs in the injection then the action will be abandoned.

For bindings the injection occurs before spinning up
the respective data stream.  If an injection error occurs
the stream will fail to spin up.
"
  [injector & args]
  `(inj/<< ~injector ~@args))

(def inject "
MultiFn used to define injection handlers.
```clojure
(defmethod :event/data [_ _ {:keys [event]}]
  (.-data event))

(act ::echo (<< :event/data))
```

For action injections these will receive an `event`
context value with the event that triggered the
action.
"
  inj/inject)