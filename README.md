# Zero
A toolkit for building web components in ClojureScript.

## Highlights
- Depends only on ClojureScript core
- Small, with optional 'extras' modules for more features
- Hot reload friendly
- Focus preserving updates
- 'Good enough' performance

## Rationale
- Web components have many advantages over React and similar frameworks, including:
    - Easy to render server-side
    - Seamless interop with other frameworks and libraries
    - Encapsulation, no style bleed, often better performance
    - Native DevTools support
- Web components are cool, but the native API for building them isn't very convenient
    - Zero makes web components easy

## Warning
Depends on modern browser APIs, works on the latest versions of all
major browsers... but will break in some not-so-old versions.  In particular,
it depends on:
+ [CSSStyleSheet constructor](https://caniuse.com/mdn-api_cssstylesheet_cssstylesheet)
+ [ElementInternals](https://caniuse.com/mdn-api_elementinternals)

## Project Status
This project is in a _very early_ stage and the API is likely to change
in the future.  Use at your own risk.  Not available in a package
repo yet, [use the SHA](https://clojure.org/news/2018/01/05/git-deps).

## Organization
- `zero.core` has all the essentials
- `zero.extras.*` has optional QoL utilities
  + Require `zero.extras.all` to pull everything into the build

## Examples
Zero allows you to build native web components with a [Hiccup][hiccup]-like
notation.  Here's what that looks like:

```clojure
(defn my-view [{:keys [heading]}]
  [:section.some-class
   [:h3 heading]
   [:p
    :z/class ["paragraph" "content"]
    :z/style {:height "5rem"}
    [:slot]]])
```

Use `zero.config/reg-components` to actually setup the web component:
```clojure
(zc/reg-components
  :example/component
  {:props #{:heading}
   :view my-view})
```

Now we can use this in several ways:
- Directly in our HTML
  ```html
  <example-component heading="Something">Some content inside</example-component>
  ```
- Via JavaScript some other UI framework
  ```javascript
    const el = document.createElement("example-component")
    el.heading = "Something"
    el.innerHTML = "Some content inside"
  ```
- From another Zero component
  ```clojure
  [:example/component :heading "Something" "Some content inside"]
  ```

Zero components can also make use of some primitive state management tools provided
in `zero.core`.  Here's an example using all three of them:

```clojure
(ns example
  (:require
    [zero.core :refer [act bnd <<]]
    [zero.config :as zc]))

(defn counter-view []
  [:div
   [:input :disabled true :value (bnd ::count)]
   [:button :z/on {:click (act [::reset])} (<< ::reset-text)]])

(defonce !count (atom nil))

(zc/reg-streams
  ::count
  (fn [rx]
    (let [interval (js/setInterval #(swap! !count inc) 1000)]
      (reset! !count 0)
      (rx @!count)
      (add-watch !count ::count (fn [_ _ _ v] (rx v)))
    
      ;; cleanup when the stream winds down
      (fn count-stream-cleanup []
        (js/clearInterval interval)))))

(zc/reg-effects
  ::reset
  (fn []
    (reset! !count 0)))

(zc/reg-injections
  ::reset-text
  (fn []
    "Reset"))

(zc/reg-components
  :example/counter
  {:view counter-view})
```

**Actions**, created with `(act ...effects)`, consist of a sequence of effects to be
invoked when the action is dispatched/called.  Though normal functions can be
used as event handlers, actions should be preferred when possible as they make
for cleaner, more declarative markup; and they have value semantics, so Zero
can optimize by only updating event listeners when the actual value (not
instance) changes.

**Bindings**, created with `(bnd stream-key ...args)`, can be given as element props in
place of normal values.  Instead of being passed through to the element instance,
Zero will bind the property to the Binding's underlying data stream (identified by `stream-key`).
So when said data stream publishes an update; any bound props will also update reactively.

**Injections**, created with `(<< injector-key ...args)`, are substituted with the
value returned from the registered injection handler.

## More Docs

- [Configuration](doc/Configuration.md) - Full walkthrough of `zero.config`, which is used to configure all aspect of Zero,
  including registering components, effects, and streams.

- [Markup](doc/Markup.md) - Detailed description of the markup notation used by Zero.

- [Extras](doc/Extras.md) - Goes through Zero's 'extra' modules, including derived streams and the built-in database implementation.

## Contact
- [zero@raystubbs.me](mailto:zero@raystubbs.me)
- Clojurians: [@Ray Stubbs](https://clojurians.slack.com/team/U062WV76S1W)

[wc]: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
[hiccup]: https://github.com/weavejester/hiccup
[counter-demo]: https://raystubbs.github.io/zero/demos/counter/pub/index.html
[todomvc-demo]: https://raystubbs.github.io/zero/demos/todomvc/pub/index.html
[markup-doc]: doc/Markup.md
[delegates-focus]: https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus
