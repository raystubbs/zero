# Zero
A minimal toolkit for building web component based
front-ends in ClojureScript.

## Rationale
- Web components have many advantages over React/etc., including, not limited to:
    - Easy to render server-side
    - Seamless interop with other frameworks and libraries
    - Encapsulation, no style bleed, better performance
    - Easy mapping from DOM to implementation
        - Consider an unfamiliar FE project, you open it up, open dev tools,
          find the component you're interested in; search the codebase for
          its implementation by name
- Web components are cool, but their native API is designed for framework creators, not laypeople
    - Zero makes it easier to build most kinds of components,
      but the native API is still there for more complex cases

## Project Status
This project is in a _very early_ stage and the API is likely to change
somewhat in the future.  Use at your own risk.  Not available in a repo
yet, [use the SHA][6].

## Components
```clojure
(ns example
 [zero.core :refer [<< act bnd]:as z])

(z/component
 :name ::example
 :props #{:target}
 :view (fn [{:keys [target]}]
         [:div "Hello, " target "!"]))
```
By default, props map to component fields/properties.
This is generally all you'd need for SPAs, but when
rendering from the server, we need the props to come
from the element's attributes instead.

```clojure
(ns example
 [zero.core :as z])

(z/component
 :name ::example
 :props {:target :attr}
 :view (fn [{:keys [target]}]
         [:div "Hello, " target "!"]))
```

With this the prop can be set either via field or
attribute... but we're stuck working with strings.
To use more complex values, we need a mapper to parse
the attribute.

```clojure
(ns example
 [zero.core :as z]
 [clojure.edn :as edn])

(z/component
 :name ::example
 :props {:target :attr :attr-mapper edn/read-string}
 :view (fn [{:keys [target]}]
         [:div "Hello, " target "!"]))
```

Now we can pass normal Clojure data structures into
the component through its attribute, here's an example
usage via raw HTML:

```html
<example-example target="&quot;World&quot;"><example-example>
```

Notice how Zero respects the namespace of component names,
this makes it super easy to avoid name collisions.

## Focus
Web components aren't focusable by default.  To make your
component focusable use the `:focus` option.  This can be:
- `true` - implicitly sets `tabindex="0"` on instances, making them focusable
- `:delegate` - same as above, but also sets the [`delegatesFocus`][0]
  option on the component's `ShadowRoot`

## Styling
There are a few ways to apply styles to your components:
- Normal stylesheet `<link>` or `<style>` element
- A `:z/css` prop on a Zero root node (recommended)

Hot reloading works for `<link>` and `:z/css` as long as the stylesheet
is also referenced from the root level of the document's `<head>` or `<body>`,
but doesn't work at all for `<style>` elements (if you're importing from within,
otherwise it doesn't matter).  It's _recommended_ to prefer `:z/css`,
as `<link>`s within ShadowRoots don't block, so components that use them can
be prone to [FOUC][1].  The `:z/css` prop uses the ShadowRoot's [`adoptedStyleSheets`][3]
property and constructed stylesheets to setup the component's styling before
each render.

## Root Node
The top-level node of any component may use one of the following special 'tags':
- `:z/root`
- `:z/root:contents`
- `:z/root:block`
- `:z/root:inline-block`
- `:z/root:inline`
- `:z/root:inline-flex`

The bit after `:z/root` is just a convenient way to setup common values for
the component's CSS `display` property; the default is `contents`.  The
`:z/root` node doesn't actually render an element to the DOM; instead it provides
a way to manipulate the component itself.  For example attaching event handlers
to this node adds them to the ShadowRoot, and setting `z/css` adds styles to the
ShadowRoot's `adoptedStyleSheets` property.

For now the props that can be set on these nodes is limited to event listeners
(through `z/on`) and style sheets through `z/css`.  In the future this will also
be our interface to the component's [`ElementInternals`][4]; but that's yet
unimplemented.

Zero will dispatch the following lifecycle events on the ShadowRoot:
- `connect` - dispatched right after the component instance is rendered for the first time
- `disconnect` - dispatched when the component has been dettached from the document
- `render` - dispatched after every render
- `update` - dispatched after every render except the first

Listen for these events through the `:z/on` prop:
```clojure
[:button
 :z/on {:click (fn [] ...do something...)}]
```

## Markup
Zero's syntax is similar to [Hiccup][5], but not the same.  Props can given either
as a map, or as an un-nested sequence of `:key val` pairs (keys must be keywords)
after the element tag.

```clojure
;; this
[:input :name "something"]

;; is equivalent to
[:input {:name "something"}]
```

And Zero doesn't do 'special' things to the normal props.  For example Hiccup
and other Hiccup-based notations allow us to do things like:

```clojure
[:div {:style {:display "flex"}}]
```

Zero does not, it's consistent how it renders 'normal' props (if there's cammelCase
field matching the prop, it'll set that; otherwise the value is stringified
and set as an attribute).  Instead Zero provides it's own 'special' properties for
the same purpose; these are all namespaced by `:z/...`.  Here are a few examples:
- `:z/class` - maps to `class` attribute, or `className` field, but does the right
  thing if given a collection of classes (ignores falsey values)
- `:z/on` - expects a map of `{:type listener}`, attaches event listeners
- `:z/style` - expects a map of `{:style-prop "value"}`, sets style props
- `:z/css` - only works on `:z/root` nodes, adds `adoptedStyleSheets` styles to the ShadowRoot

Conflicting props shouldn't be used together.  For example `"some-prop"`
and `:some-prop` used on the same node will cause issues; so will `:z/class`
and `:class`.  Choose one, don't mix them.


## State
Zero allows any `IWatchable` thing to be passed as a prop, and instead of
forwarding it to the render function it 'binds' the watchable thing to the
prop in question; meaning the component only sees the value behind it; when
the watchable thing updates, the component will be re-rendered with the new
value.  Here's an example:

```clojure
(z/component 
 :name ::reactive
 :view (fn [{:keys [thing]}]
         [:div thing]))

(def !thing (atom (rand)))
(js/setInterval #(reset! !thing (rand)) 5000)

(z/component
 :name ::container
 :view (fn []
         [::reactive :thing !thing]))
```

### Bindings and Data Streams
Though Zero generalizes bindings to 'all watchable things'... it's generally
preferable to use Zero's `Binding` type; which has the advantage of implementing
value semantics (i.e comparable, hashable, printable, immutable).  These are used
in combination with data stream definitions to create a basic subscription system.

```clojure
(defmethod z/stream :random [_ rx & _args]
 (let [interval-id (js/setInterval #(rx (rand)) 5000)]
  ;; return a cleanup function, this will be called when
  ;; the stream winds down (i.e when nothing is using it)
  (fn []
    (js/clearInterval interval-id))))

(z/component 
 :name ::reactive
 :view (fn [{:keys [thing]}]
         [:div thing]))

(z/component
 :name ::container
 :view (fn []
         [::reactive :thing (bnd :random)]))
```

Bindings are `IWatchable` and `IDeref`, take advantage of this to create
data streams derived from existing ones.

```clojure
(defmethod z/stream :derived [_ rx offset]
  (add-watch (bnd :random) ::derived
    (fn [_ _ _ random]
      (rx (+ random offset))))
  (fn cleanup-derived []
    (remove-watch (bnd :random) ::derived)))
```

One thing to remember is that bindings are _values_, watching/unwatching
one applies to the _value itself_, not a particular instance.

### Actions and Effects
Zero allows any functions to be setup as event listeners... but like with
Bindings, it's generally preferable to use Zero's `Action` type for handling
events.  These are callable _values_ which, when invoked, dispatch a sequence
of _effects_.

```clojure
(defonce !db (atom {:count 0}))

(defmethod z/stream ::count [_ rx]
 (add-watch !db ::count (fn [_ _ _ new-val] (rx new-val)))
 #(remove-watch !db ::count))

(defmethod z/effect ::increase-count [_ amount]
 (swap! !db update :count + amount))

(z/component
  :name ::incrementing-button
  :props #{:count}
  :view (fn [{:keys [count]}]
          [:button
           :z/on {:click (act [::increase-count 1])}
           count]))

(z/component
 :name ::container
 :view (fn []
        [::incrementing-button :count (bnd ::count)]))
```

### Injections
Injections allow us to grab something from an event or the DOM,
and pass it into an effect handler.  This allows effects to target
the native DOM, or extract data from the DOM or an event.

```clojure
(defmethod z/inject :input/value [_ {:keys [^js event]} & _args]
 (-> event .-target .-value))

(z/component
 :name ::example
 :view (fn []
        [:input :z/on {:input (act [:do-something (<< :input/value)])}]))
```

Injections are the final piece that allow us to define useful components
in an entirely declarative way.  As with Actions and Bindings, Injections
are _values_. And... they can be nested
(e.g `(<< :something (<< :something-else {:foo (<< :one-more-thing)}))`).

## Contact
- [zero@raystubbs.me](mailto:zero@raystubbs.me)
- Clojurians: [@Ray Stubbs](https://clojurians.slack.com/team/U062WV76S1W)

[0]: https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus
[1]: https://en.wikipedia.org/wiki/Flash_of_unstyled_content#:~:text=A%20flash%20of%20unstyled%20content,before%20all%20information%20is%20retrieved.
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets
[4]: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals
[5]: https://github.com/weavejester/hiccup
[6]: https://clojure.org/reference/deps_and_cli#_coord_attributes