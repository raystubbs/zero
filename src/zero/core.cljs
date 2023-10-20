(ns zero.core
  (:require
   [zero.impl.actions :as act]
   [zero.impl.bindings :as bnd]
   [zero.impl.components :as c]
   [zero.impl.injection :as inj]))

(defn act "
Construct an action.

```clojure
[:button
 :on-click (act [:do-something (<< :inject-something)]
                [:do-something-else \"some data\"])
 \"Click Me!\"]

```

An action is a representation of a collection of
effects as data.  Actions can be called, and expect
a `js/Event` as input.  Actions can be compared, hashed,
printed, etc. as data.
" [& things]
  (let [[props effects] (if (map? (first things))
                          [(first things) (rest things)]
                          [{} things])]
    (zero.impl.actions/Action. props effects)))

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
" act/effect)

(defn bnd "
Construct a binding.

```clojure
[:input
 :value (bnd {:default \"foo\"} :db/something)]
```

A binding is a reference to an external data stream.
Bindings are IWatchable, and any updates in the
underlying data stream will be reflected in the properties
they're bound to.  Bindings can also be compared, hashed,
printed, etc. as data.
" [& things]
  (let [[props stream-key args] (if (map? (first things))
                                   [(first things) (second things) (nthrest things 2)]
                                   [{} (first things) (rest things)])]
    (zero.impl.bindings/Binding. props stream-key (vec args))))

(def stream "
MultiFn used to define data streams.

```clojure
(defonce !db (atom {}))

(defmethod stream :db [_ rx path]
  (rx (get-in @!db path)))
```

If a function is returned it will be called to cleanup
the stream when it's spun down.

Each pair of `[stream-key args]` represents a unique
stream instance, so the method will be called only once
for each set of args used with the stream; until the
stream has been spun down and must be restarted.
" bnd/stream)

(defn << "
Used to indicate an injection point in actions or bindings.
```clojure
  (act :do-something (<< :inject-some-data))
  (bnd :something (<< :inject-some-data))

  (defmethod inject :inject-some-data [_ _ctx]
    \"Some data\")
```
" [injector-key & args]
  (zero.impl.injection/Injection. injector-key args))

(def inject "
MultiFn used to define injection handlers.
```clojure
(defmethod inject :event/data [_ {:keys [event]}]
  (.-data event))

(act ::echo (<< :event/data))
```

When dispatched from an action, injectors will receive
an `event` context value containing captured fields from
the original event.
" inj/inject)

(defn component "
Create a component.

```clojure
(component
  :name ::my-thing
  :props {:foo :attr :bar :field :baz :prop}
  :view (fn [{:keys [foo bar baz]}]
          (list
            [:h1 foo]
            [:h2 bar]
            [:h3 baz])))
```
Zero components are native web components, so creating
one adds it to the browser's custom element registry.

Props must be declared, and can be embodied as either
an attribute, a field on the generated class, or both.
For non-string props it can be useful to map from an
attribute string to something more useful, this can be
done with an `attr-mapper` function like so:

```clojure
:props {:foo {:attr \"foo\" :field \"foo\" :attr-mapper js/parseInt}}
```
" [&{:keys [name props view focus] :as things}]
  (c/component things))

(defn component-name "
The custom element name that will be generated for a given
keyword.
"[kw]
  (c/component-name kw))