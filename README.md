# Zero
A toolkit for building web component based
front-ends in ClojureScript.

- Uses modern APIs, works on the latest versions of all
  major browsers... but will break in some not-so-old
  versions.  In particular it depends on:
  + [Constructable `CSSStyleSheet`](https://caniuse.com/mdn-api_cssstylesheet_cssstylesheet)
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
- [The API Reference (Coming Soon)](API.md)
- [The Demo (TodoMVC)](demo)
- [The Cookbook (Coming Soon)](COOKBOOK.md)
- [Markup Syntax](MARKUP.md)

## Organization
- `zero.core` has all the essentials
- `zero.extras.*` has stuff that's optional, but nice to have
  + Require `zero.extras.all` to pull everything into the build

## Defining Components
```clojure
(ns example
 [zero.core :refer [<< act bnd]:as z])

(z/component
 :name ::example
 :props {:target :attr}
 :view (fn [{:keys [target]}]
         [:div "Hello, " target "!"]))
```

Now we can render the component via HTML like this:
```html
<example-example target="World"><example-example>
```

Or within another Zero component like this:
```clojure
[::example :target "World"]
```

### `:props`
The `:props` parameter determines which keys are passed into the `:view`
function, and where the values for those keys come from.  This can be
either a set or a map.

If given as a set, all values are interpreted as field props.  This is
equivalent to a map with the set values as keys its keys, and all values
set to `:field`.

If given as a map, its values can be one of:

- `:field`
  Equivalent to:
  ```clojure
  {:field <the key as a cammel case string>}
  ```

- `:attr`
  Equivalent to:
  ```clojure
  {:field <the key as a cammel case string> :attr <the key as a string>}
  ```

- An `IWatchable` thing
  Equivalent to:
  ```clojure
  {:state-factory (constantly <the watchable thing>)}
  ```

- A function
  That takes the component instance and returns an `IWatchable`.
  Equivalent to:
  ```clojure
  {:state-factory <the function>}
  ```
- A map
  + `:field` (optional): A field name.  If given the generated
    component will have a field with this name, when the field
    changes the component will update accordingly.
  + `:attr` (optional): An attribute name.  If given, the
    generated component will observe the attribute with the
    given name, reacting to any changes.
  + `:attr-mapper` (optional): A function to convert the attribute
    (string value) to something more useful
  + `:state` (optionl): An `IWatchable` thing, the component
    will react to changes on it
  + `:state-factory` (optional): A function that, given
    the component (DOM node), returns an `IWatchable` that
    the component will react to.
  + `:state-cleanup` (optional): A function to cleanup the
    state prop, receives the state object itself and the
    component (DOM node).  Called whent the component is
    disconnected.

### `:view`
A function used to render the component.  This should return
a [Hiccup](https://github.com/weavejester/hiccup/wiki/Syntax)-like
data structure that represents the markup to be rendered.

Zero's markup syntax does have some differences from hiccup,
check out the [Markup Syntax Doc](MARKUP.md) for details,
but here's the gist:

- A `[:root> ...]` pseudo-vnode can be given as the root
  of the returned vdom.  Event handlers for the component's
  ShadowDOM can be attached to this vnode, as well as default
  styling for the component, stylesheets to be adopted, and
  element internals (not yet implemented).
- Props can be given either within a map, or as flat key-value
  pairs after the vnode tag (keys must be keywords).  For example:
  `[:input :type "foo"]` is equivalent to `[:input {:type "foo"}]`.
- All 'special' props (handled by Zero itself) are namespaced
  with `z`.  So for example the `:style` prop is set literally
  just like any other prop, but `:z/style` accepts a style map.
- Nested vnodes are represented with a vector as their tag
  (e.g `[[:div :span] ...]` vs `[:div>span ...]`)

## State Management
Zero components are just regular web components.  As such, their
state can be managed in the same way you'd do so for any native
element: by listening for events and updating attributes or properties.

Here's a simple example:
```clojure
(z/component
 :name :my-ticker
 :props #{:tick}
 :view (fn [{:keys [tick]}]
        [:root>
          :z/on {:connect
                 (fn [^js event]
                   (set! (.. event -target -_interval)
                    (js/setInterval #(.dispatchEvent (Event. "tick")) 1000)))
                 :disconnect
                 (fn [^js event]
                   (js/clearInterval (.. event -target -_interval)))}
          [:div "Ticks: " (or tick 0)]]))
```
```html
<my-ticker> </my-ticker>
<script>
  const ticker = document.querySelector("my-ticker");
  ticker.addEventListener("tick", () => {
    ticker.tick = (tick && tick + 1) || 1
  })
</script>
```

However Zero offers some facilities to simplify this task.

### Actions
Actions offer a declarative way to describe side effects.  They're
callable objects with value semantics (can be compared, printed, etc.).

These can be used as event handlers in place of functions; with several
benefits:

- Rendering logic can be more efficient, since actions that compare
  equal don't need to be replaced
- View rendering functions tend to be simpler when using actions,
  side effect logic is separated from the rendering/markup
- Actions offer some useful event handler functionality buit-in, including:
  + Logging
  + Throttling

Actions are constructed with (an optional) option map, followed by a
sequence of side effect specifications:

```clojure
;; Adding `:log? true` property causes the action to
;; be logged every time it's called; this is very
;; useful for debugging.
(def my-action (act {:log? true}
                [::say-hello (<< ::whom)]
                [::say-goodbye (<< ::whom)]))

(z/reg-effect
 ::say-hello
 (fn [whom]
  (js/console.log "Hello, " whom "!"))
 ::say-goodbye
 (fn [whom]
  (js/console.log "Goodbye, " whom "!")))

;; Injectors receive a context, provided by the action
(z/reg-injector
 ::whom
 (fn [{:keys [^js/Node root] :as context} & _args]
  (-> (.querySelector root "input.whom") .-value)))

;; When an action is called with an event (i.e used as an
;; event handler), the context is derived from the event
;; automatically.
(my-action (js/Event. "fake"))
;; Context provided to injectors:
;; {:data <data extracted from event>
;;  :target <event target>
;;  :current <dom node the handler/action is attached to>
;;  :root <$.getRootNode of :current>
;;  :event <the raw event>
;;  :shape :z/event-context}

;; When called with anything other than an event,
;; the provided value is taken as the context.
(my-action {:root js/document.body})
;; Context provided to injectors:
;; {:root <the document body>}
```

Actions can be throttled by setting the `:throttle <time-in-ms>`
option.  The default `:throttle-strategy` is `:default`, which
has a leading call; use `:debounce` to skip this.

### Bindings
Zero's rendering engine has a very convenient feature: bindings.
If the value passed as a vnode prop is something that's `IWatchable`
(i.e an atom, var, etc) then that prop will be bound reactively to
the value.  This means that when the `IWatchable` changes, the
element it's attached to will be re-rendered with the new value.  If
said value also satisfies `IDeref` then that protocol will be used
to extract its initial value; otherwise it will be assumed `nil`.

Here's a simple example:

```clojure
(def !counter (atom 0))

(js/setInterval #(swap! !counter inc) 1000)

(z/component
 :name ::counter
 :prop #{:count}
 :view (fn [{:keys [count]}]
        [:div count]))

(z/component
 :name ::counter-container
 :view (fn []
        [::counter :count !counter]))
```
```html
<counter-container></counter-container>
```

As the `!counter` increments here, the `::counter` element will
reactively update.

While these mechanics work for any `IWatchable` thing, Zero
also provides an explicit type for bindings, which is `IDeref`,
`IWatchable`, _and_ has value semantics.

```clojure
(z/reg-stream
 ::count
 (fn [rx & _args]
  (let [!count (atom 0)
        interval-id (js/setInterval #(swap! !count inc) 1000)]
    ;; call `rx` to update the stream's value
    (rx @!count)
    (add-watch !count ::count (fn [_ _ _ new-val] (rx new-val)))

    ;; return a cleanup function, this will be called whenever
    ;; the stream is no longer being used and is being wound down
    (fn cleanup []
      (remove-watch !count ::count)
      (js/clearInterval interval-id)))))

(z/component
 :name ::counter
 :prop #{:count}
 :view (fn [{:keys [count]}]
        [:div count]))

(z/component
 :name ::counter-container
 :view (fn []
        [::counter :count (bnd ::count)]))
```

Bindings can also take an option map.  Providing a `:default`
property gives a default value for the binding, which will be
used until the underlying stream's first call to `rx`.  A
`:default-nil? true` property tells the binding to return
the default value anytime it's underlying stream value is `nil`.

Injectors work in bindings, but they won't be given anything useful
as context.  For now their only practical use is to put off
computation until the value is required... though I myself have
not used them at all as of yet.

## Styling
Applying stylesheets to a component can be done in several ways:
- Render `<link>` or `<style>` elements in the component `:view`
- Pass a vector of stylesheet URLs or `CSSStyleSheet` objects to the
  `:z/css` prop on `:root>`
- Set `:inherit-doc-css? true` to have the component inherit any
  stylesheets from the host document

The recommended methods are `:inherit-doc-css?` and `:z/css`.  Any CSS
inherited from the document via `:inherit-doc-css?` will be hot-reloaded
properly.  URLs given in `:z/css` and component `<link>`s will only hot
reload if the same URL is linked to from within the document root (outside
of any Shadow DOM) via a `rel="stylesheet"` or `rel="preload"` link; and only
if said link will be hot reloaded by other means (e.g shadow-cljs, figwheel).
At the moment shadow-cljs only hot reloads `rel="stylesheet"` links.

In practice `<link>`s within web components tend to produce
[FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content#:~:text=A%20flash%20of%20unstyled%20content,before%20all%20information%20is%20retrieved.),
while referencing a stylesheet from within `:z/css` causes it to be fetched
into a `CSSStyleSheet` and cached; mitigating this issue somewhat.  Though
the best approach, if practical, for avoiding FOUC in Zero is to preload the
stylesheet in the root document via a `<link rel="preload">` and reference it
within components via `:z/css`.

As mentioned, stylehseets referenced via `:z/css` get converted into
`CSSStyleSheet` instances, which will ignore imports.  So be warned.
In some cases a `<link>` or `<style>` element may be the only option.

### Inline Styles
Inline styles can be applied to rendered elements by attaching a
`:z/style` style map to the vnode.  This translates directly to the
`:style` (string) attribute.  So the two should never be used together.

```clojure
[:button
 :z/style {:background "none" :border "none" :padding "0.25rem"}
 "My Button"]
```

### Default Component Syles
Sometimes it can be useful to apply default styling to the web component
host element, while still allowing users to make adjustments.  This can
be done by applying inline styling via `:z/style` to the `:root>` vnode.

```clojure
[:root>
 :z/style {:display "inline-block" :padding "0.25rem"}]
```

### Classes
Classes can be attached to an element via the `:z/class` prop, which accepts
a string or collection of strings; and flattens it out before putting it into
`className`.  As with `:z/style`, `:z/class` maps directly to `:class`, so the
two should never be used together.

```clojure
[:div :z/class ["foo" "bar"]
 "Something"]
```

As a short-hand, literal classes can also be attached to vnode tag directly as
`.<the-class>`.  Ids can be set similarly as `#<my-id>` directly after the main tag.

```clojure
[:div#something.foo.bar
 "Something"]
```

Though be weary, this notation is only allowed _after_ the namespace (for tags
that have a namespace), the namespace itself is literal.

## Focus
To make a component's host element focusable use the `:focus :self` option, to make
it delegate focus via [this](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus)
use `:focus :delegate`.

For `:focus :self` Zero will attach an implicit `tabIndex = 0` to the element on
render if a `:tabindex` isn't specified in its render props.

The `:focus :delegate` option is configured when the element's ShadowRoot is created,
so it cannot be changed on hot reload.

## Contact
- [zero@raystubbs.me](mailto:zero@raystubbs.me)
- Clojurians: [@Ray Stubbs](https://clojurians.slack.com/team/U062WV76S1W)