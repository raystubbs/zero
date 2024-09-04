# State Management
Zero's state management is built on three concepts: injections, actions, and
bindings.  The types representing these have value semantics, so they work well
with the virtual DOM model, and make snapshot testing your UIs a breeze.

## Injections
An injection is a placeholder for some yet-unknown value, to be resolved at
a later time.  The concept is universal, but you'll mostly use these within
actions to reference things that'll be resolved when the action is dispatched.

```clojure
(ns example
  (:require
    [zero.core :refer [<<] :as z]
    [zero.config :as zc]))

(zc/reg-injections
  ::user
  (fn [context & _args]
    (:user context)))

(z/inject
  {:user "Ray"}
  ["Hello, " (<< ::user) "!"])
;==> ["Hello, " "Ray" "!"]
```

Zero also defines a few convenience injections (and respective constructor
functions) for common use cases:
- `::z/ctx`/`<<ctx` - Injects the value from some path in the injection context.
  For example `(<<ctx ::user)` would do the same as the `::user` injector above.
- `::z/call`/`<<call` - Calls a function and injects the result.
  For example `(<<call my-fun my-arg)`.
- `::z/act`/`<<act` - Injects an action.  Takes the same args as `act`.  Useful for
  building up an action from things in the injection context.
- `::z/<<`/`<<<` - Injects an injector.  Useful for adding injectors to actions
  built with `<<act`, since plain injectors would be resolved here.

Injectors can be nested, and for convenience, can be chained.  So for example
`(<< :my-injector arg1 arg2 << :my-other-injector arg3)` would be equivalent
to `(<< :my-injector arg1 arg2 (<< :my-other-injector arg3))`.

Injections are cached, so if the same injection with the same args is seen within
the form undergoing injection; the injection handler will only be invoked
once, and the result reused.

## Actions
Actions are data-oriented packets of side effects that'll be executed after the
action is invoked.  Their main purpose is as an alternative to functions for
event handlers.

```clojure
(ns example
  (:require
    [zero.core :refer [ctx act] :as z]
    [zero.config :as zc]))

(defn my-custom-input-view
  [{:keys [value]}]
  [:input
   :value value
   :#on {:input (act [::dispatch (<<ctx ::z/host) :value (<< ::value <<ctx ::z/current)])}])

;; This is how we register effect handlers, which are invoked from our actions
(zc/reg-effects
  ;; This effect will dispatch an event on the given DOM node
  ::dispatch
  (fn [^js/HTMLElement target event-type event-value]
    (.dispatchEvent target
      (js/CustomEvent.
        (name event-type)
        #js{:detail event-value})))
  
  ;; This effect will log whatever value it receives
  ::log
  (fn [data]
    (js/console.log data)))

;; An injector, which grabs the `.-value` of whatever DOM node it receives
(zc/reg-injections
  ::value
  (fn [_ ^js/HTMLElement target]
    (.-value target)))

(zc/reg-components
  :my-custom-input
  {:view my-custom-input-view
   :props #{:value})

(comment
  ;; This can now be used within another component like this  
  [:my-custom-input
   :#on {:value (act [::log (<<ctx ::z/data)])}])
```

Actions can be invoked like any function.  They expect a context map, which all injections
will be resolved against, and which will be passed to contextual side effects (see below).
All injectors are resolved before effects are executed.

In ClojureScript, actions can also be called with a `js/Event` instance.  In which case
a context map will be inferred, which will include the following:

```clojure
:zero.core/event.target ;; the event target when the action was invoked
:zero.core/event        ;; the event itself (usually stale)
:zero.core/current      ;; the thing the event handler (action) is attached to
:zero.core/root         (.getRootNode current) ;; usually the shadow root of the element the action was rendered within
:zero.core/host         (.-host root)          ;; usually the component in which the action was rendered
:zero.core/data         ;; data harvested from the event, depends on the event type and (if provided) custom event harvester
:zero.core/db           ;; the SubZero database instance associated with the component this action was rendered in
```

Actions can also include a props map.  The overall usage for `zero.core/act` looks like:

```clojure
(act {:as props}? & effects)
```

Any `nil`s in `effects` will be filtered out, and `seq?`s will be concatentated.  The `props`
map can include:

- `:prevent-default?` - Only works when the action is invoked with a `js/Event`.  If `true`
  then `preventDefault` will be called on the event.
- `:stop-propagation?` - Only works when the action is invoked with a `js/Event`.  If `true`
  then `stopPropagation` will be called on the event.
- `:log?` - If `true` then a log will be emitted with various bits of useful info when the
  action is invoked.  Very useful for debugging.
- `:delta` - Determines the throttling interval for the `:throttle` and `:debounce` dispatch
  strategies.
- `:dispatch` - Determines how/when the action will execute its effects.  Can be one of:
  
  - `:default` - The effects will be queued, to be executed 'sometime soon'.
  - `:immediate` - The effects will be executed before the action's call returns.
  - `:throttle` - Execution will be throttled.  The effects will be executed at most
    once per interval.  If the action is called multiple times in that interval then
    both the first and last call will go through, all intermediate calls will not
    trigger the effects.
  - `:debounce` - Like `:throttle`, but only the last call in the interval makes
    it through.  Given in milliseconds.  Defaults to `300`.
  
  The following are only available in browser contexts (with Zero's web component logic installed).
  
  - `:after-render` - The effects will be executed after the next DOM reconciliation.
  - `:before-render` - The effects will be executed before the next DOM reconciliation.

By default, effect functions receive only the arguments given in the action's effect vector.
This makes it easier to define functions in a way that's agnostic to whether it's used as
an effect handler or called directly.  However, it's sometimes useful to allow an effect to
access the action's context.  This can be achieved by adding `:zero.core/contextual true` to
the effect handler function's metadata:

```clojure
(zc/reg-effects
  :my-contextual-effect
  (with-meta
    (fn [{root ::z/root host ::z/host :as ctx} & _args]
      #_"Do Something")
    {::z/contextual true}))
```

## Bindings
Bindings tap into reactive 'data streams.'  They're watchable and dereferenceable, and
serve as a basis for reactivity in Zero.

```clojure
(ns example
  (:require
    [zero.core :refer [bnd]]
    [zero.config :as zc]))

(zc/reg-streams
  ::my-random-data-stream
  (fn [rx & max]
    ;; call `rx` to push a value into the stream
    (let [interval (js/setInterval #(rx (rand-int max)) 5000)]
      ;; return a cleanup function
      (fn []
        (js/clearInterval interval)))))

;; derefing a binding while its stream is 'shut down' yields `nil`
@(bnd ::my-random-data-stream 10) ;; -> nil

;; watch the binding like you'd do with any watchable thing
(add-watch (bnd ::my-random-data-stream 10) ::my-watch-key
  (fn [_ _ _ new-val]
    (js/console.log new-val)))

;; then when you're done, shut it unwatch, it'll shut down when the
;; watch count reaches 0
(remove-watch (bnd ::my-random-data-stream 10) ::my-watch-key)
```

The `zero.util/derived` function can help create a data stream that derives
its values from several other watchable things.

```clojure
(ns example
  (:require
    [zero.config :as zc]
    [zero.util :as zu]
    [zero.core :refer [bnd] :as z]))

(defonce !src-1 (atom 0))

(zc/reg-streams
  :my-derived-stream
  (zu/derived
    (fn [[src-1 src-2] & _args]
      (+ src-1 src-2))
    !src-1
    (bnd :src-2)))
```

Bindings can be setup as state props on a component:

```clojure
(zc/reg-components
  :my-random-number
  {:props {:rand (bnd ::my-random-data-stream 10)}
   :view (fn [{:keys [rand]}]
           rand)})
```

Or bound to regular props within
[SubZero markup](https://github.com/raystubbs/subzero?tab=readme-ov-file#markup).

```clojure
(zc/reg-components
  :my-random-number
  {:view
   (fn [{:keys [rand]}]
    [:input
     :#bind {:value (bnd ::my-random-data-stream 10)}])})
```

Bindings can also take a prop map.  The full usage for `zero.core/bnd` is:

```clojure
(bnd {:as props}? data-stream-key & args)
```

Available props are:

- `:default` - The default value.  Dereferencing the binding will yield this
  value while its data stream isn't active, or hasn't yet produced a value.
- `:default-nil?` - If `true` then the default value will be substituted for
  any `nil` values produced by the data stream.

## Conclusion
Zero's state management facilities are designed to make your component's
views more data oriented, and to improve DOM reconciliation performance.
The benefits generally make these things worth using.  However, like anything,
they have limitations.  So just use a function for your event handler if
an action won't work.  Use an atom (or some other watchable thing) for reactivity
if a binding isn't appropriate.  These are _extra_ tools, they don't replace
what's otherwise available.

