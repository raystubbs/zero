# Zero
A toolkit for building web component based
front-ends in ClojureScript.

- Uses modern APIs, works on the latest versions of all
  major browsers... but will break in some not-so-old
  versions.  In particular, it depends on:
  + [`CSSStyleSheet` constructor](https://caniuse.com/mdn-api_cssstylesheet_cssstylesheet)
  + [`ElementInternals`](https://caniuse.com/mdn-api_elementinternals)
- Depends only on ClojureScript core
- Small, with optional 'extras' modules
- Hot reload friendly

## Rationale
- Web components have many advantages over React and friends, including, not limited to:
    - Easy to render server-side
    - Seamless interop with other frameworks and libraries
    - Encapsulation, no style bleed, better performance
    - Easy mapping from DOM to implementation
        - Consider an unfamiliar FE project, you open it up, open dev tools,
          find the component you're interested in; search the codebase for
          its implementation by name
- Web components are cool, but their native API is designed for
  framework creators, not laypeople
    - Zero makes it easier to build most kinds of components,
      but the native API is still there for more complex cases

## Project Status
This project is in a _very early_ stage and the API is likely to change
in the future.  Use at your own risk.  Not available in a package
repo yet, [use the SHA](https://clojure.org/news/2018/01/05/git-deps).

## Useful Links
- [TodoMVC Demo](demos/todomvc)
  - [Live][todomvc-demo]
  - [Build Report](https://raystubbs.github.io/zero/demos/todomvc/pub/js/report.html)
- [Counter Demo](demos/counter)
  - [Live][counter-demo]
  - [Build Report](https://raystubbs.github.io/zero/demos/counter/pub/js/report.html)
- [The Cookbook (Coming Soon)](COOKBOOK.md)
- [Markup Syntax][markup-doc]

## Organization
- `zero.core` has all the essentials
- `zero.extras.*` has stuff that's optional, but nice to have
  + Require `zero.extras.all` to pull everything into the build

## Basic Concepts
Zero is built around three main concepts: components, actions, and bindings.
The components produced by Zero are just ordinary [web components][wc], they're
configured via properties and attributes, and dispatch their own events.  So really
Zero components can be used and created without the other state management facilities...
actions and bindings are just the cherry on top, they help build robust
and clean web components.

Let's take a look at a simple example that demonstrates these three concepts working in concert:
```clojure
(ns zero.demo.app
  (:require
    [zero.core :refer [<< act bnd] :as z]
    [zero.extras.all]))

(defonce !count (atom nil))

(z/reg-stream
  ::count
  (fn count-stream-setup [rx & _args]
    (let [interval (js/setInterval #(swap! !count inc) 1000)]
      (reset! !count 0)
      (rx @!count)
      (add-watch !count ::count (fn [_ _ _ v] (rx v)))

      ;; cleanup when the stream winds down
      (fn count-stream-cleanup []
        (js/clearInterval interval)))))

(z/reg-effect
  ::dispatch-event
  (fn dispatch-event! [target type]
    (.dispatchEvent target (js/Event. (name type))))

  ::reset-count
  (fn reset-count! []
    (reset! !count 0)))

(z/component
  :name ::counter
  :props #{:count}
  :view (fn [{:keys [count]}]
          [:root>
           count
           [:button
            :z/style {:margin-left "1rem"}
            :z/on {:click (act {:log? true} [::dispatch-event (<< :ze/ctx :host) :reset])}
            "Reset"]]))

(z/component
  :name :z/app
  :view (fn []
          [::counter
           :count (bnd ::count)
           :z/on {:reset (act {:log? true} [::reset-count])}]))
```
See it working [here][counter-demo].

### Actions
Actions are 'callable values' in the sense that they have value semantics, but
can be called and used as event handlers.  The value semantics are important
since it means actions can be compared, and only swapped out if they actually
change; which isn't necessarily the case for functions.

In essence, an action is a sequence of side effects to be performed when invoked.
And these side effects may include 'injectors', which can grab a value from the
action's execution context and pass it into the effect handler.  In the above
example injector `(<< :ze/ctx :host)` grabs the `:host` (the component's DOM node)
from the action's execution context and passes it to the `::dispatch-event` effect
handler.

### Bindings
In the same way that actions are 'callable values', bindings are 'watchable values'.
This is significant because when you give an `IWatchable` as a component's prop, Zero
binds the prop to that thing; updating the prop when its underlying value changes.

When a binding instance is watched or deref'd, the actual value that will be received
from it is that of the underlying data stream; so when we give a binding as a component's
prop, what actually gets bound to is a data stream.

## Defining Components
As mentioned above, Zero components are just regular web components.  So when we call
`z/component`, Zero generates a web component class and registers it with the browser's
custom element registry.

```clojure
(z/component
 :name ::hello
 :props {:whom {:field "whom" :attr  "whom"}}
 :view (fn [{:keys [whom]}]
         [:div "Hello, " whom "!"]))
```

### `:name`
This is the name used to reference the component when rendering it from another
Zero component, it _must_ be a keyword. This is also what the actual web component
name is derived from. To get the web component name from the Zero name, just replace
the namespace delimiter `/` (if present) with `-`.  Custom element names _must_
contain a hyphen, so if the keyword given for `:name` isn't namespace'd then the name
portion of the keyword must contain a hyphen.

### `:view`
This is the function that actually renders the component.  It'll be passed a map
of props, and should return a virtual DOM that Zero will use to patch the component's
actual shadow DOM.  See the [markup doc][markup-doc] for details on the shape of its
return value.

### `:props` (optional)
This tells Zero how to build a prop map for the `:view` function, and what kinds of
changes to observe (i.e. when to re-render the component).

In its most verbose configuration this should be a map of `prop name -> prop spec map`,
where the `prop spec map` can include the following options:

- `:field` (string, optional) <br>
   This gives the field name to generate for the prop.  Zero will add a property to
   the generated element class with the given name; when said property changes this
   prop will update, causing the component to re-render.  If a `:field` option isn't
   explicitly given, _and_ this isn't a state prop (doesn't have `:state` or `:state-factory`)
   then Zero default this to the cammelCase form of the prop name.  If this _is_ a state
   prop, and the `:field` option is omitted, then no property will be added to the class
   for this prop.  If this _is_ a state prop, and the `:field` option is given explicitly,
   then a _read only_ property will be generated for the prop, with its actual value coming
   from the bound state.
- `:attr` (string, optional) <br>
   This gives an attribute name that Zero should map to this prop.  If given, Zero will
   observe updates to said attribute on a component instance, and update the prop accordingly;
   causing the component to be re-rendered.  If no `:attr` is given, then this prop will
   not be mapped to an attribute.
- `:attr-mapper` (function, optional) <br>
   If given, _and_ an `:attr` option is set, this function will be called to map the attribute's
   raw string value to a more useful prop value.
- `:state` (`IWatchable`, optional) <br>
   Equivalent to `:state-factory (constantly <the state>)`.  See below.
- `:state-factory` (function, optional) <br>
   If present then this prop is classified as a 'state prop', driven by some external
   state instead of the instance's attributes or properties.  This is a function which,
   given a reference to the component instance (an `HTMLElement`), returns an `IWatchable`
   thing.  The prop will react to changes to said thing.  If the thing is also `IDeref`,
   then it'll be deref'd for an initial value; otherwise the initial value will be `nil`.
- `:state-cleanup` (function, optional) <br>
   If this prop is a state prop, then this function will be called to clean up the
   state when the component instance disconnects from the browser DOM.  It'll be
   passed the prop's state object and the component instance.  Ignored for non-state props.

As a convenience, Zero also supports several short hands for common prop configurations:
- `#{<prop names>...}` <br>
  If the `:prop` option is given as a set of prop names instead of a map, Zero sees it
  as equivalent to: `{<prop name> {:field <cammel cased prop name>} ...}`
- `{<prop name> :field}`<br>
  Equivalent to `{<prop name> {:field <cammel cased prop name>}}`.
- `{<prop name> :attr}`<br>
  Equivalent to `{<prop name> {:attr (name <prop name>)}}`.
- `{<prop name> <IWatchable thing>}`<br>
  Equivalent to `{<prop name> {:state <IWatchable thing>}}`.

### `:focus` (optional)
This option can be given as one of:

- `:self` - if no tab index is set for the component, then it'll be implicitly set to `0` on render,
  ensuring that the component is focusable by default.
- `:delegate` - the [`delegatesFocus`][delegates-focus] option will be enabled for the component's
  ShadowRoot.  This cannot be disabled on hot reload.

### `:inherit-doc-css?` (optional)
If given as a truthy value then Zero will look through the top level document for stylesheet links
and include their styling in the component.  This process relies on fetching the CSS into CSSStyleSheets,
which ignore imports.  So be aware that any imports will be ignored.

## Handling Effects
Effects are a way to specify 'what should be done' in a declarative data oriented way, generally
from an action.  We use `z/reg-effect` to register effect handlers... and that's really all there
is to know about them.  When an effect is requested Zero will call the respective handler with
the args, after substituting any injectors.

```clojure
(z/reg-effect
 :example-effect-1
  (fn [& args]
    ...do something...)

  :example-effect-2
  (fn [& args]
    ...do something else...))
```

Now, the injection handlers are where things get a bit interesting.

```clojure
(z/reg-injector
  :select
  (fn [{:keys [^js/ShadowRoot root]} selector]
    (.querySelector root selector)))
```

Injection handlers are passed a context object.  For injectors found in an action,
the context they're given is the action's execution context, which, if the action
was called as an event handler, has the following shape:
```clojure
{:shape   :z/event-context
 :event   (comment "the event that trigger the action, this will be stale")
 :data    (comment "the data that Zero extracted from the event before it went stale")
 :target  (comment "the event target")
 :current (comment "the element to which the action was attached as event handler")
 :root    (comment "the root node of :current")
 :host    (comment "if :root is a ShadowRoot, then root.host; will generally be the current component's instance")}
```

## Data Streams
Data streams are registered via `z/reg-stream`.  It basically consists of a boot up function
that sets the stream up, and can return a cleanup function that'll be called to clean up
when the stream is no longer being used.
```clojure
(z/reg-stream
  ::my-stream
  (fn boot-my-stream [rx & _args]
    ;; call `rx` with a value to push new data to the stream
    (fn cleanup-my-stream []
      ;; do any cleanup here
      )))
```

A data stream is identified by the stream key (in this case `::my-stream`) _and_ all its args.  So
for example `(bnd ::my-stream 1 2 3)` will tap into a _different_ stream than `(bnd ::my-stream 3 2 1)`;
though both will use the same function to boot up.

Zero also provides some useful utilities for dealing with streams (and `IWatchable` things in general)
in the `zero.extras.stream` module.  This includes the `derived` utility for setting up derived streams
based on multiple other `IWatchable` dependencies, and `watch` to react (with side effects) to changes
in a set of dependencies.

```clojure
(ns example
  (:require
    [zero.core :as z]
    [zero.extras.stream :as zstream]))

(z/reg-stream
 ::my-derived-stream
  (zstream/derived
    (fn [[my-stream-val other-stream-val] & _args]
      ;; compute derived value
      )
    (bnd ::my-stream)
    (bnd ::other-stream)))

;; start reacting to changes
(zstream/watch ::my-watch
  (fn on-change! [my-stream-val my-derived-stream-val]
    ;; do something when these dependencies change
    )
  (bnd ::my-stream)
  (bnd ::my-derived-stream))

;; stop watching
(zstream/unwatch ::my-watch)
```

## _The_ Database
Many modern frameworks tend to encourage the use of a single in-memory database
to store and manage all state (or business state) within front-end applications.
Zero's core isn't based around this, but the library does provide an optional
module that implements such a thing in `zero.extras.db`.  This is meant as a minimal
DB implementation to help with basic state management in simple applications; if your
needs are more complex or specialized than can be easily managed with this DB,  you
are highly encouraged to look elsewhere for something more appropriate.  Any DB or
data structure that supports watches/reactions/observation should be easily adaptable
to work with Zero.

```clojure
(ns example
  (:require
    [zero.extras.db :as db]))

;; patch the DB via function
(db/patch! [{:path [<path to the data>...] :value <something>}])
(act [:ze.db/patch [{:path [<path to the data>...] :value <something>}]])

;; get something from the DB
(db/get [<path to the thing>])
(<< :ze.db/path [<path to the thing>])
(bnd :ze.db/path [<path to the thing>])
```

The database will (somewhat) efficiently update _only_ the bindings that depend on something
that has been changed from a patch.  The patch shape is fairly flexible, and designed to be
composable; so for example a patch can be given as an event value, and its listener can
apply the patch to a sub-path.

A patch consists of a collection of patch entries, each of which is a map that has a `:path`
indicating what will be changed, and one of the following:
- `:value` a raw value to set at the path
- `:patch` a sub-patch to apply at the path
- `:merge` a map to merge into the current value
- `:conj` something to conj onto the current value
- `:into` a collection to add into the current value
- `:clear` a collection of keys or indexes to remove from the current set, map, or vector
- `:fn` a function to call to update/transform the current value, if an `:args` collection
  is also provided, these will be passed as extra arguments

An optional `:fnil` value can also be provided in a patch entry, if given, and the current
path doesn't have a value or has a `nil` value; then this will be substituted as the current
value when the patch operation is applied.

## Contact
- [zero@raystubbs.me](mailto:zero@raystubbs.me)
- Clojurians: [@Ray Stubbs](https://clojurians.slack.com/team/U062WV76S1W)

[wc]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[counter-demo]: https://raystubbs.github.io/zero/demos/counter/pub/index.html
[todomvc-demo]: https://raystubbs.github.io/zero/demos/todomvc/pub/index.html
[markup-doc]: MARKUP.md
[delegates-focus]: https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus
