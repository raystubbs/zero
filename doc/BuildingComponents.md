# Building Components
The purpose of Zero is to help you build UI components for the web.  So,
this is a guide to help towards that end.

The two most important concepts surrounding Zero components are the `view`
function, and props.

The `view` function is the thing that renders your component.  It should
(generally) be a pure function that accepts a map of prop values, and returns
some [SubZero markup](https://github.com/raystubbs/subzero#markup) (dubbed
the vDOM, or virtual DOM).

What happens with this vDOM depends on how Zero is being used.

If it's being used in the browser to build web components, then each Zero
component becomes a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).
And [SubZero](https://github.com/raystubbs/subzero) (which Zero is built upon)
will update the component's shadow DOM to reflect the `view`s vDOM.  Whenever
the component's prop values change, this process will happen again, so the
component's DOM will stay up to date.  We call this reactivity.

If the component is being rendered to HTML (for SSR, SSG, etc.) then SubZero
will call the registered `view` function with any props given for the element,
and the resulting vDOM will be rendered into a
[declarative shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM#declaratively_with_html)
for the component.  HTML rendering can be used either as the sole rendering
for the component, or as a pre-rendering step, in which case a client-side
component implementation can take over the HTML-rendered DOM.

Props are the component inputs.  They must be explicitly declared when
registering a component.  The props can be given either as a set of
names (which will be setup in the default way) or as a map of names
to some value... which allows for more customization, but gets more
complicated for web components.  For HTML-rendering, the map values
are ignored (for now) so map vs set makes no difference.

```clojure
(ns example
  (:require
    [zero.config :as zc]))

(defn- my-component-view
  [{:keys [whom]}]
  [:div "Hello, " whom "!"])

(zc/reg-components
 :my-component
 {:props #{:whom}
  :view my-component-view})
```

Components can be implemented in `*.cljc` files to make them usable from
both Clojure (for SSR or SSG) and ClojureScript.  However it may also be
useful to have separate implementations of the same component, for HTML-rendering
and client-side rendering.  In which case I'd recommend separate `*.cljs` and `*.cljc`
files with the same base name.  For applications where the back-end and front-end
are both built in ClojureScript... well, you'll probably need to do some dynamic
checking, or use a Closure define to get the compiler to get rid of the unwanted
implementation during tree shaking.

## Web Components
When running Zero within the browser, and with the web component plugin installed
(via `zero.wcconfig/install!`), every Zero component becomes a Web Component in
your browser.  This means the browser will recognize when a matching DOM element
is attached to the document (no matter how this happens) and will wire it up with your
component logic.  It's rather convenient.

Web components have a lot of extra registration options that don't make much
sense for HTML-rendered components.  I'll give a brief overview here, but check
[the SubZero docs](https://github.com/raystubbs/subzero?tab=readme-ov-file#component-registration-options)
for details.

### Props
The most important thing is that web components have more powerful props.  Whereas
HTML-rendered components need to be passed all prop values explicitly; web components
can get prop values from various sources: JavaScript properties on the host
element, HTML attributes on the host element, or any watchable thing.  This allows
web components to be much more dynamic.

When we register a web component with a set of prop names (rather than a full map)
all props are given the `:default` behavior.  Which means a JS property matching the
prop name will be generated for the component class, and the component will watch for
changes to any attribute matching the prop name.  The current prop value will reflect
that last thing updated, out of the attribute and JS property.  For most components,
this is okay behavior for all props.

```clojure
(zc/reg-components
  :my-component
  {:props #{:foo :bar}
   :view my-view})
```

When we need to tie the component's view to some external state, a watchable thing
can be given for the value in the property map... or a function that returns a
watchable thing... or a map with `:state-factory` and `:state-cleanup` functions...

```clojure
(defonce! !my-external-state (atom nil))

(zc/reg-components
  :my-component
  {:props
   {:my-external-state !my-external-state
    :my-state-factory (fn [^js/HTMLElement _the-component-dom]
                        (atom nil))
    :my-state-factory-with-cleanup {:state-factory
                                    (fn [^js/HTMLElement the-component-dom]
                                      (create-watchable-thing the-component-dom))
                                    :state-cleanup
                                    (fn [the-watchable-thing ^js/HTMLElement the-component-dom]
                                      (cleanup-the-thing the-watchable-thing))}}
  :view my-view})
```

Zero provides a convenience function (`zero.dom/internal-state-prop`) to help setup
a property for internal component state, since this is a fairly common need.

```clojure
:props {:state (zero.dom/internal-state-prop {:foo "foo"})}
;==> or <==;
:props {:state (zero.dom/internal-state-prop (fn [^js/HTMLElement the-component-dom] {:foo "foo"}))}

```

### Focus
Properly managing the focus of input components is essential to good UI.  The default
is that web components just aren't focusable, which is generally what's wanted for
non-interactive or container components; but isn't ideal for controls.  Use the `:focus`
option to adjust this.

Possible values are `:self` and `:delegate`.  The `:delegate` option causes the
component's shadow DOM to be created with
[`delegatesFocus`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus)...
which comes with a few oddities.  1) This can't be undone, so changing this in a hot reload can
cause some weird behavior 2) If the component has been HTML-pre-rendered then it'll already have
a shadow DOM, and this option won't have any effect.

Basically the effect of `:delegate` is that any time your component is clicked, its first focusable
child will receive the focus instead of the component itself.

The `:self` option just makes the component itself focusable, by setting `tabIndex = 0` if it's null.

```clojure
(zc/reg-components
  {:props #{:foo :bar}
   :focus :self
   :view my-view})
```

### Inheriting Document CSS
It may be useful (though these days I avoid it) to allow your components to borrow the styling
from your top level document, since the shadow DOM mitigates this.  Set `:inherit-doc-css?`
to enable this behavior.  Note that it fetches the CSS and wraps it in a `CSSStyleSheet`,
which ignores imports.

```clojure
(zc/reg-components
  {:props #{:foo :bar}
   :inherit-doc-css? true
   :view my-view})
```

### Form Controls
When building HTML form controls, set the `:form-associated?` option.  This tells SubZero
to setup the component class as a form input, allowing the form value, status, error message,
etc. to be controlled via the `#internals` prop on your component's `:root>`.

```clojure
(zc/reg-components
  {:props #{:foo :bar}
   :form-associated? true
   :view my-view})
```

## The `:root>`
A component's view function may return a special `[:root> ...]` as the top-level node
of its vDOM.  This serves as a place to attach component-level customizations.

For example setting a `#style` prop on this node sets up the _default_ styling for
the component's host element.  Setting `:#on` event handlers attaches the event
handlers to the component's shadow root.  See the
[SubZero docs](https://github.com/raystubbs/subzero?tab=readme-ov-file#the-root)
for details.

Component lifecycle events are dispatched on the shadow root, so we can handle
them with event handlers on the `:root>` vNode.

```clojure
(defn my-view
  []
  [:root>
   :#on {:connect (fn [^js/Event ev] ,,,)
         :render  (fn [^js/Event ev] ,,,)
         :update  (fn [^js/Event ev] ,,,)
         :disconnect (fn [^js/Event ev] ,,,)}
    ,,,])
```
- `:connect` - when the component is attached to the document, after the first render
- `:render` - after every render
- `:update` - after all but the first render after connecting
- `:disconnect` - when the component is removed from the document

Use `:#on-host` instead of `:#on` to handle UI events on the component's host element,
for example `focus`/`blur`, `mouseover`/`mouseout`, etc.  Most user events won't be
dispatched on the shadow root, unless they're bubbling up from a child.  _Be careful_
though if using actions to handle these events, the context received will be from the
host's element, which might be unexpected.  For example `::z/host` will refer to the
parent component's host element, `::z/root` to the parent component's shadow root, etc.

Use `:#css` to add stylesheets to the component.  This can be given as a string,
a `CSSStyleSheet` instance, or a vector of zero or more of the same.  Strings are
treated as stylesheet URLs if they begin with `http` or `/`, otherwise as raw CSS
text.

## Slots
Slots are a powerful feature of web components, and are especially helpful
for vDOM based rendering, as they allow for some nice performance improvements.

Essentially, slots allow child elements to be 'projected' into our components
from a parent.  These child elements are independent from our component, so
they can be updated efficiently by the common parent, without forcing our component
to also update... I'm not happy with this explanation.  Just
[read the docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)
instead of my rambling.

Here's an example:

```clojure
(defn my-card-view
  []
  [:section
   [:h1 [:slot :name "heading"]]
   [:p [:slot :name "body"]]])

(zc/reg-component
 :my-card
 {:view my-card-view})

;==> and we can use it like <==;
[:my-card
 [:span :slot "heading" "My Heading"]
 [:span :slot "body" "The main content"]]
```

A fairly common need when it comes to slots, is to be able to adjust our UI
depending on whether the user has plugged anything into our slots.  For this
Zero has `zero.dom/slotted-prop`.

```clojure
(defn my-card-view
  [{:keys [heading-els body-els]}]
  [:section
   [:h1 [:slot :name "heading"]
    (when (empty? heading-els) "<no heading slotted>")]
   [:p [:slot :name "body"]
    (when (empty? body-els)
      "<no body slotted>")]])

(zc/reg-component
 :my-card
 {:props {:heading-els (zd/slotted-prop :slots #{:heading})
          :body-els (zd/slotted-prop :slots #{:body})}
  :view my-card-view})
```

## TODO
That's all I've got so far.  More to come.
