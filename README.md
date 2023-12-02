# Zero
A toolkit for building web component based
front-ends in ClojureScript.

- Uses modern APIs, works on the latest versions of all
  major browsers... but will break in some not-so-old
  versions.  In particular it depends on:
  + [Constructable `CSSStyleSheet`](https://caniuse.com/mdn-api_cssstylesheet_cssstylesheet)
  + [`ElementInternals`](https://caniuse.com/mdn-api_elementinternals)
- Depends only on ClojureScript core
- Very small core, with optional 'extras' modules
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
somewhat in the future.  Use at your own risk.  Not available in a package
repo yet, [use the SHA][6].

## Useful Links
- [The API](API.md)
- [The Demo](demo)
- [The Cookbook](COOKBOOK.md)
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
data structure that represents to markdown to be rendered.

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
...TODO...

## Styling
...TODO...

## Focus
...TODO...

## Contact
- [zero@raystubbs.me](mailto:zero@raystubbs.me)
- Clojurians: [@Ray Stubbs](https://clojurians.slack.com/team/U062WV76S1W)