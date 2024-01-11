(ns zero.core
  (:require
   [zero.impl.actions :as act #?@(:cljs [:refer [Action]])]
   [zero.impl.bindings #?@(:cljs [:refer [Binding]])]
   [zero.impl.injection #?@(:cljs [:refer [Injection]])]
   [zero.impl.markup :as markup]
   #?(:cljs [zero.impl.components])
   [zero.config :as config])
  #?(:clj
     (:import
       (zero.impl.actions Action)
       (zero.impl.bindings Binding)
       (zero.impl.injection Injection))))

(defn act "
Construct an action.

```clojure
[:button
 :on-click (act [:do-something (<< :inject-something)]
                [:do-something-else \"some data\"])
 \"Click Me!\"]

```

Actions are declarative sequences of events.  They can be
called, and have value semantics.  If called with a `js/Event`
Zero will automatically extract an 'action context' from the
event, which will be a map with the following:

```clojure
{:z.event/data (comment \"event-type-dependent data extracted from the event via `zero.config/harvest-event`\")
 :z.event/target (comment \"the event target\")
 :z.event/current (comment \"the current element which the event is being dispatched on\")
 :z/event (comment \"the original event, this will generally be stale\")
 :z/host (comment \"if `:root` is a ShadowRoot, then this will be its host element, otherwise `nil`\")
 :z/root (comment \"the root element of `:current`)}
```

The context will be passed to injectors found within the action, which can extract useful info from
the context and 'inject` it into the action's effect forms before each dispatch.

This function may also take a 'props' map as its first argument, the following props are supported
in a ClojureScript context:

- `:log?` - log various bits of useful info when this action is dispatched, useful for debugging
- `:prevent-default?` - call `.preventDefault()` on the event, when dispatched with an event
- `:stop-propagation?` - call `.stopPropagation()` on the event, when dispatched with an event
- `:dispatch` - the dispatch strategy, one of (`:default`, `:immediate`, `:throttle`, `:debounce`)
- `:delta` - if `:dispatch` is `:throttle` or `:debounce`, specifies the delta for each dispatch

In a ClojureScript context, and when dispatching with an event, the action dispatch will be scheduled
with `setTimeout` rather than invoked directly.  This improves consistency between throttled vs non-throttled
dispatches; the event will always be stale.  Use `:immediate` dispatch to have the action dispatch immediately
when called.
" [& things]
  (let [[props effects] (if (map? (first things))
                          [(first things) (rest things)]
                          [{} things])]
    (Action. props (filterv some? effects))))

(def ^:deprecated reg-effect "
Register one or more effects.

```clojure
(reg-effect
 ::echo
 (fn [& args]
   (prn args))

 ::echo2
 (fn [& args]
  (prn args)))

(act ::echo \"Hello, World!\")
```
" config/reg-effects)

(defn bnd "
Construct a binding.

```clojure
[:input
 :value (bnd {:default \"foo\"} :db/something)]
```

A binding is a declarative reference to a registered data stream.  When
said data stream is active (has watchers) the binding can be deref'd for
the current value of the stream; otherwise a deref yields nil.  Bindings
are `IWatchable` and have value semantics.  When watching an instance of a
binding, what's really being watched is the underlying data stream; so any
instance is fine to add and remove watches, particular instances don't need
to be held on to.
" [& things]
  (let [[props stream-key args] (if (map? (first things))
                                   [(first things) (second things) (nthrest things 2)]
                                   [{} (first things) (rest things)])]
    (Binding. props stream-key (vec args))))

(def ^:deprecated reg-stream "
Register one or more data streams.

```clojure
(defonce !db (atom {}))

(reg-stream
 :db
 (fn [rx path]
  (rx (get-in @!db path)))

 :other
 (fn [rx]
  (rx \"thing\")))
```

If a function is returned it will be called to cleanup
the stream once it's spun down.

Each pair of `[stream-key args]` represents a unique
stream instance, so the method will be called only once
for each set of args used with the stream; until the
stream has been spun down and must be restarted.
" config/reg-streams)

(defn << "
Creates an injection.  These can be placed in actions, bindings,
and markup; and nested in other injectors. Injectors will be substituted
by the value returned by the registered injection handler.

```clojure
  (act :do-something (<< :inject-some-data))
  (bnd :something (<< :inject-some-data))
```

As a convenience, injectors can be chained without nesting:

```clojure
(<< :inject-something 1 2 << :inject-something-else)
;; is equivalent to
(<< :inject-something 1 2 (<< :inject-something-else))
```
" [injection-key & things]
  (let [[args others] (split-with (partial not= <<) things)]
    (Injection. injection-key (cond-> (vec args) (seq others) (conj (apply << (rest others)))))))

(def ^:deprecated reg-injector "
Register one or more data injectors.
```clojure
(reg-injector
  :event/data (fn [{:keys [event]}] (.-data event))
  :event/type (fn [{:keys [event]}] (.-type event)))

(act ::echo (<< :event/data))
```

When dispatched from an action, injectors will receive
an `event` context value containing captured fields from
the original event.
" config/reg-injections)

#?(:cljs
   (defn ^:deprecated component "
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
" [& {:keys [name props view focus] :as things}]
     (config/reg-components (:name things) things)))

(defn ^:deprecated component-name "
The custom element name that will be generated for a given
keyword.
"[kw]
  (markup/kw->el-name kw))

(defn element-name "
Given a keyword, returns the custom element name that'll be generated
for a component with this name.
" [kw]
  (markup/kw->el-name kw))

#?(:cljs
   (defn ^:deprecated do-effects! [& effects]
     (doseq [effect effects]
       (act/do-effect! effect))))