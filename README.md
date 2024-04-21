
[![Clojars Project](https://img.shields.io/clojars/v/me.raystubbs/zero.svg)](https://clojars.org/me.raystubbs/zero)

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
<increment-button count="0"></increment-button>
```

This can be implemented a few different ways. We will consider several examples, moving from the low level to the high level.

### Manual Event Handling
Zero can make custom component's HTML attributes reactive. Similar to React's notion that a view is a function of its props, we can implement HATEOS in a reactive way.


```clojurescript
(ns increment-counter
  (:require [zero.core :as z]
            [zero.config :as zc]
            [zero.component]))

(defn- on-click
  [event]
  (let [increment-button (-> event (.-currentTarget) (.-host))
        clicks (some-> (.getAttribute increment-button "clicks")
                       (js/parseInt)
                       inc
                       str)]
    (.setAttribute increment-button "clicks" clicks)))

(defn button-view
  [{:keys [clicks]}]
  [:root> {::z/on {:click on-click}}
   [:button (str "Clicked " clicks " times")]])

(zc/reg-components
 :incrementing-button {:view button-view
                       :props #{:clicks}})
```

When we register our component, we declare `clicks` as a reactive attribute. When we the `incrementing-button`'s `clicks` attribute is updated, it will re-render.

We use the `zero.core/on` our root component to listen for click events. When the click occurs, `on-click` is called, and it increments the `incrementing-button`'s `clicks` attribute. Zero automatically re-renders the `incrementing-button`.

### Actions
(This example will be similar to the previous, except it will use actions to eliminate some boilerplate around finding the host.)

### Atom
(this example uses a Clojurescript atom to store the state)

### App DB
(re-frame-esque example)

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