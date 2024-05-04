
[![Clojars Project](https://img.shields.io/clojars/v/me.raystubbs/zero.svg)](https://clojars.org/me.raystubbs/zero)
![Test Badge](https://github.com/raystubbs/zero/actions/workflows/ci.yml/badge.svg)
[![cljdoc badge](https://cljdoc.org/badge/me.raystubbs/zero)](https://cljdoc.org/d/me.raystubbs/zero)

# Zero
A toolkit for building web components in Clojure and ClojureScript.

## What Can I Build with Zero?
*Simple extensions to the browser.* Extend the browser as a hypermedia client. Do you wish the `form` element would update part of the DOM rather than reload the whole page? Build a custom component that does just that. 

*Design Systems*. Web components are [great for design systems](https://shoelace.style). Build a design system in Clojure(Script), and share it with other teams regardless of the stack they use.

*Micro-frontends*. Web components are [ideal for micro-frontends](https://micro-frontends.org/). Your team can use Zero alongside other teams using React or Svelte - in the same application.

*State-heavy SPAs*. Zero provides a set of state management tools from the simple and easy to the simple and sophisticated. Start easy and scale up as you need to.

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

## Reactive State
Zero gives you tools for reactive state. You can choose to stick close to the DOM, following HATEOS principles. You can use a central in-memory application database similar to re-frame. Or you can choose from intermediate options -- how you manage state is up to you.

Let's show the different options using the same example: an incrementing button. We want a button that reads "Clicked 0 Times". Every time you click it, it should increment the counter.

You can render this button wherever you choose: in React, Svelte, pure HTML. It looks like this:

```html
<increment-button clicks="0"></increment-button>
```

This can be implemented a few different ways. We will consider several examples, moving from the low level to the high level.

### Manual Event Handling
Zero makes custom component reactive. Similar to React's notion that a view is a function of its props, we can render a web component as a function of its properties.


```clojure
(ns increment-counter
  (:require [zero.core :as z]
            [zero.config :as zc]
            [zero.component]))

(defn on-click
  [event]
  (let [increment-button (.-host (.-currentTarget event))
        clicks           (js/parseInt (.-clicks increment-button))]
    (set! (.-clicks increment-button) (inc clicks))))

(defn button-view
  [{:keys [clicks]}]
  [:root> {::z/on {:click on-click}}
   [:button (str "Clicked " clicks " times")]])

(zc/reg-components
 :incrementing-button {:view button-view
                       :props #{:clicks}})
```

When we register our component, we declare `clicks` as a prop. When we update the `incrementing-button`'s `clicks` property, it will re-render.

To update our component, we use use the `zero.core/on` prop on the root to listen for click events. When the click occurs, `on-click` is called, and it increments the `incrementing-button`'s `clicks` property. `incrementing-button` re-renders automatically.

### Atoms

We can also use ClojureScript's built-in tools for state. Let's look at an example using an atom.

```clojure
(ns increment-counter
  (:require [zero.core :as z]
            [zero.config :as zc]
            [zero.component]))

(defonce clicks*
  (atom 0))

(defn on-click
  [_event]
  (swap! clicks* inc))

(defn button-view
  [{:keys [clicks]}]
  [:root> {::z/on {:click on-click}}
   [:button (str "Clicked " clicks " times")]])

(zc/reg-components
 :incrementing-button {:view button-view
                       :props {:clicks clicks*}})
```

Here we have bound the `clicks` prop to an atom. Similar to reagent, when that atom updates, our `incrementing-button` component re-renders.

### App DB

Zero also provides facilities for state management that resemble re-frame.

```clojure
(ns increment-counter.client
  (:require [zero.core :as z]
            [zero.config :as zc]
            [zero.component]
            [zero.extras.db :as db]))

;; Init db value
(db/patch! [{:path [:clicks] :value 0}])

(defn button-view
  [{:keys [clicks]}]
  [:root> {::z/on {:click (z/act [::db/patch [{:path [:clicks]
                                               :fn inc}]])}}
   [:button (str "Clicked " clicks " times")]])

(zc/reg-components
 :incrementing-button {:view button-view
                       :props {:clicks (z/bnd ::db/path [:clicks])}})
```

Here we have an in-memory database for our application. We bind our clicks prop to a path in the database, and then use the `::db/patch` effect to update the value at the `:clicks` path.

### And Beyond

Zero aims to be both simple and easy. It gives you options to follow familiar patterns for state management. But it also gives you the flexibility to manage state as you need to.

For more details, check out the [User's Guide](doc/UsersGuide.md). The SSR Demo application provides further examples of Zero's state management.

## Warning
Depends on modern browser APIs, works on the latest versions of all
major browsers... but will break in some not-so-old versions.  In particular,
it depends on:
+ [CSSStyleSheet constructor](https://caniuse.com/mdn-api_cssstylesheet_cssstylesheet)
+ [ElementInternals](https://caniuse.com/mdn-api_elementinternals)

## Learning
Check out the [Zero User's Guide](doc/UsersGuide.md) for a (reasonably)
complete guide.  Also, there are a few demos:
- [TodoMVC](https://github.com/raystubbs/zero-todomvc)
- [SSR Demo (w. live updates)](https://github.com/raystubbs/zero-ssr-demo)

Feel free to DM me [@Ray Stubbs](https://clojurians.slack.com/team/U062WV76S1W) in
the Clojurians Slack for any questions.
