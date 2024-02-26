# Zero Configuration
Zero configuration consists of registering components, streams, effects, and injections.  Telling Zero
how to read attributes for particular components.  And customizing how Zero harvests useful data from
DOM events.  All of Zero's configuration functionality is in `zero.config`, assumed to be aliased as
`zc` in this doc.

## Components
Use `zc/reg-components` to register a set of web components.  This function takes a sequence of `name + options`
pairs, with the `:view` option being the only one required.  Here's what each option does:
- `:view` - Gives the function used to render the component.  Said function receives a map of props, and should
  return the component's markup with the notation described [here](Markup.md).
- `:props` - Tells Zero which it should pass to the `:view` function, and where to get them.  The simplest form
  for this prop is simply a set of keywords `#{:foo :bar :baz}`.  This will tell Zero to add fields with the given
  names (or the cammelCase variant of the same name) to the web component class it generates, and also to observe
  attributes of the same name.  If further customization is required, a map can be given instead of a set.  The map
  consists of `name -> spec` mappings, where the `spec` can look like:
    + literally `:attr` - Zero won't create a field for the prop, it'll source the value only from the attribute
      of the same name.
    + literally `:field` - Zero will generate a field for the prop.
    + literally `:default` - Zero will generate a field for the prop as well as observing the attribute of the same name
      for values.
    + an `IWatchable` (any maybe `IDeref`), or a factory function for the same - Zero will add logic to have every
      instance of the component watch (and source the prob value from) the given object.  If said object satisfies
      `IDeref` then it'll be deref'd for an initial value before the component's first render.  If the given value
      is a function (factory for an `IWatchable`) then it'll receive the component instance.
    + a map with the following optional fields:
      * `:attr <attr-name>` - The name of an attribute (should be a string) that the prop's value can be sourced from.
      * `:field <field-name>` - The name of the field Zero should generate for this prop.
      * `:state IWatchable` - An `IWatchable` thing to pull the value from.  If a `:field` is also specified, then the
         generated field will be read-only.  If it satisfies `IDeref` then it'll be deref'd for an initial value.
      * `:state-factory IFn` - A state factory.  Receives the component instance, should yield something that can be
         used as `:state`.  Ignored if `:state` is given explicitly.
      * `:state-cleanup IFn` - A cleanup function for state created by a state factory.  Receives the state and
        the component instance.
- `:inherit-doc-css?` - If true, Zero will try to pull in CSS linked in the root document.  The referenced CSS
  resources are pulled in as `CSSStyleSheet` instances; which _ignore imports_.  So beware.
- `:focus` - Can be one of:
  + `:delegate` - Zero will create the component's ShadowRoot with the [delegatesFocus][delegatesFocus] option,
    causing any clicks (or other attempts to focus) the component to instead focus its first focusable child.  Useful
    for components that wrap native input elements.
  + `:self` - Causes Zero to attach an implicit `tabIndex = 0` to instances of the component if the field hasn't
    been set to something else explicitly.  This makes the component focusable.

Here's an example:
```clojure
(zc/reg-components
  :example/button
  {:props #{:text}
   :inherit-doc-css? true
   :focus :delegate
   :derive :example/Button
   :view (fn [{:keys [text]}
              [:button text]])}

  :example/input
   {:props #{:type :value}
    :inherit-doc-css? true
    :focus :delegate
    :view (fn [{:keys [type value]}]
            [:input :type type :value value])})
```

## Reading & Writing Attributes
TODO

## Harvesting Events
TODO

## Data Streams and Bindings
TODO: make this better

Zero's data streams fill a similar role to subscriptions from other frameworks (eh, re-frame, that is).  But they
work at a lower level, and integrate well with the rest of ClojureScript through the `IWatchable` and `IDeref`
protocols.  In essence, data streams are the source nodes for push-based reactive data pipelines.  They boot up when needed
(when they have active watches), push data changes into the pipeline as they occur, then spin down when no longer needed.

We tap into data streams by creating bindings (e.g `(bnd :stream-key ...args)`), which are `IWatchable` and `IDeref`,
and have value semantics.  Watching or deref'ing a binding _actually_ watches or derefs the underlying data stream; so
if the stream is not active a deref will yield `nil`.

```clojure
(zc/reg-streams
  :random
  (fn [rx max]
    (let [interval (js/setInterval #(rx (js/Math.floor (* (js/Math.random) max))) 10000)]
      (fn cleanup []
        (js/clearInterval interval)))))

(add-watch (bnd :random 100) ::my-watch
  (fn [_ _ old-val new-val]
    (js/console.log :random new-val)))
```

Since bindings are `IWatchable`, Zero will automatically bind them when passed as element props, causing said props
to react to changes in the binding.

### Derived Streams and Watches
Though the default API works at a lower level, Zero provides some convenient utilities for creating _derived_ streams
(streams whose value is derived from one or more other streams) or setting up a watch to perform some action when one
or more streams change.  These utilities, along with others, are provided in `zero.extras.util`; assumed to be aliased
to `zu` in the following examples:

```clojure
(zc/reg-streams
  :derived-stream
  (zu/derived
    (fn [[foo bar] & _args]
      (+ foo bar))
    (bnd :foo-stream)
    (bnd :bar-stream)))

(zu/watch ::my-watch-key
  (fn [foo bar]
    (do-something! foo bar))
  (bnd :foo-stream)
  (bnd :bar-stream))

(js/setTimeout #(zu/unwatch ::my-watch-key) 10000)
```

_Note_ that although these utilities are designed with streams in mind, they're based on the `IWatchable` and `IDeref`
protocols; so will work on anything data source that's `IWatchable`.

## Injections
Injections are placeholders for data meant to be lazily substituted into Zero markup, an action, or a binding.
An injection is created with `(<< :injection-key ..args)`, and will be substituted at a time depending on where
said injection is found:
- Injections in an action get substituted before its effects are dispatched
- Injections in a component's markup are substituted before the DOM is patched
- Injections in a binding are substituted before the underlying data stream is booted

Multiple instances of the same injection (same injection key and args) found in the same context, will share a
single evaluation, so the injection handler will only be called once for a particular set or arguments, within
a given context.

Register injection handlers with `zc/reg-injections`.

```clojure
(zc/reg-injections
  :event-data
  (fn [context & _args]
    (-> context :z.event/data)))
```

Injection handlers receive a context map, representing the context in which said injection is being evaluated.  For
actions dispatched on an event, this context will look like this:

```clojure
{:zero.core/event.data (comment "data harvested from the event")
 :zero.core/event.target (comment "event target at time of action dispatch")
 :zero.core/event.current (comment "event currentTarget at time of action dispatch")
 :zero.core/event (comment "the event with which the action was dispatched")
 :zero.core/host (comment "if :z/root is a ShadowRoot, then its host; generally this is the current component's DOM node")
 :zero.core/root (comment "the root node of :z/event.current, usually the ShadowRoot of the current component")}
```

For injections in a component's markup, the context will have:

```clojure
{:zero.core/host (comment "the DOM node of the component being rendered")
 :zero.core/root (comment "the ShadowRoot of the component being rendered")}
```

For injections bindings, the context will be empty.

## Actions and Effects
Actions are callable objects with value semantics.  They allow us to give a sequence of declarative side effects
to be invoked when the action is dispatched.  The benefits of actions over regular functions include the following:
- Actions can include injections, which allow context specific objects (like DOM nodes) to be easily included in a dispatch
- Actions can be structurally compared, which allows for optimizations when rendering
- Actions have built-in utilities for logging and throttling, which often make life that much easier
- Actions are simple, declarative, easy to reason about; they keep complexity out of our component rendering logic

Actions are created like this `(act ?options ...effects)`, where `effects` is a sequence of vectors representing
the ordered effects to be invoked when the action is dispatched.  The `options` are optional, any may be
provided as a map to customize the behavior of the action.  The following options are supported:
- `:prevent-default?` - If true, and the action is dispatched on an event, the event's `preventDefault()` method will be called
- `:stop-propagation?` - If true, and the action is dispatched on an event, the event's `stopPropagation()` method will be called
- `:log?` - If true then various bits of useful info will be logged to the console when the action is dispatched
- `:dispatch` - The dispatch strategy.  One of `:default`, `:immediate`, `:throttle`, `:debounce`.  If `:throttle` or `:debounce`
  are given then the action's dispatches will be regulated accordingly.  The `:immediate` dispatch strategy causes the action's
  side effects (and injections) to be invoked immediately when the action is dispatched, as opposed to the `:default`, which does
  so later after the event has become stale
- `:delta` - If the `:throttle` or `:debounce` dispatch strategies are used, this controls the throttle time (in ms)

Effects are registered with `zc/reg-effects`.

```clojure
(zc/reg-effects
  :do-something
  (fn [x]
    (js/console.log (str "doing something (" x ")")))

  :do-something-else
  (fn [x]
    (js/console.log (str "doing something else (" x ")"))))

(def my-act (act {:log? true} [:do-something "foo"] [:do-something-else "bar"]))

(my-act)
;> doing something (foo)
;> doing something else (bar)
```

[delegatesFocus]: https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus