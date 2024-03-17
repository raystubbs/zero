# Zero User’s Guide

## 1. Introduction
Zero is a lightweight library for building web component based user interfaces in ClojureScript.  It takes advantage of modern browser technology to allow for the development of performant and ergonomic components that can be consumed from any stack, including raw HTML rendered statically or server-side.  This makes Zero ideal for building components for your blog or static website; but that doesn’t exclude it from the world of SPAs, in which it has also proven capable.

### 1.1 Organization
Zero consists of two namespace hierarchies:

- `zero.*` is the location of the core library, which includes logic for component rendering/creation, state management utilities, and several helpers.
- `zero.extras.*` contains additional features that might simplify your work, although they may not be necessary or recommended for every project.

### 1.2 Web Components
Web Components is a suite of several web APIs that allow you to build custom encapsulated elements, that look and feel similar to native elements.  You can read more on the particulars [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

Zero uses these APIs behind the scenes to dynamically generate and register custom element classes from a declarative specification and [Hiccup](https://github.com/weavejester/hiccup)-like markup notation.  Here’s what that looks like in practice.

```clojure
(ns zero.example
  (:require
    [zero.core :as z]
    [zero.config :as zc]
    [zero.component]))

(defn view [{:keys [text]}]
  [:button ::z/on {:click #(js/alert "Clicked!")}
    text])

(zc/reg-components
  ::alert-button
  {:props #{:text}
   :view view})
```

This component can now be used like an ordinary HTML element:

```html
<zero.example-alert-button text="Click Me!"></zero.example-alert-button>
```

Or it can be rendered via Zero’s markup syntax, or via the native element rendering mechanism of any JS UI framework.

```clojure
(ns zero.other-example
  (:require
    [zero.example :as ex]))

(defn other-view [_]
  [::ex/alert-button :text "Click Me!"])
```

> **Warning**
Zero config works via a registry system in `zero.config`.
Registering something in Zero doesn’t actually do anything except
add a record to this registry.  In order for a registration to actually
be ‘realized’, the subsystem that makes use of the registration has to be
loaded/enabled.  To enable components in your project the `zero.component`
namespace must be loaded.
    

## 2 State Management
In addition to Zero’s main goal of providing a convenient interface to build web components, the library also provides a few primitives for overall state management.  These utilities are flexible enough to be useful regardless of your project type: static site, SSR, SPA, etc.  However, they aren’t essential, and you can instead opt to prefer the browser’s native state management mechanisms (i.e. raw event listeners and manual property updates).

> **Tip**
Zero’s state management types (`Action`, `Binding`, `Injection`) all have
value semantics.  They’re immutable and structurally comparable.  Conveniently,
this also means they can be serialized and transferred over a network, or embedded
in HTML (or other formats).  This makes them powerful tools for page rendering.
But also, perhaps, a flexible mechanism for expressing actions as values within an API.
    

### 2.1 Injections
Injections allow for the dynamic, just-in-time access of resources accessible through a context.  An injection is created with the `zero.core/<<` function, which accepts an injection handler key followed by any arguments to be forwarded to the handler.

```clojure
(rc/reg-injections
  ::select-els
  (fn [{^js/Node root ::z/root} selector]
    (.querySelectorAll root selector)))

;; elsewhere
(<< ::select-els "input") ;; injects a NodeList of all inputs
(<< ::select-els "button") ;; injects a NodeList of all buttons
```

Zero respects injections found within actions, bindings, component markup, and… nested within other injections.  As a convenience, injections can also be chained within the same sexpr, so `(<< ::something 1 << ::other-thing 2)` is equivalent to `(<< ::something 1 (<< ::other-thing 2))`.

### 2.2 Actions
An action is a callable value expressed as an optional options map and a sequence of effect vectors.  Each effect vector consists of a keyword (referencing a registered effect handler), followed by a sequence of arguments.  When an action is invoked (’called’), the effect handler for each vector is called in sequence.  Actions are created with `zero.core/act`.

When called, an action should be given a context map.  This is the context that will be passed into any injectors found within the action; which will be substituted each time the action is called.

In ClojureScript, actions are not only callable in the Clojure sense, but also in the JS sense.  So they can be used (without wrapping) as event handlers.  They also have some built-in niceties for handling events:

- When called with a `js/Event` instance instead of a map, Zero will automatically derive a convenient context map from the event.  This map has the following:
    
  ```clojure
  :zero.core/event
  ;; the event itself, probably stale by now
  :zero.core/root
  ;; `event.currentTarget.getRootNode()` immediately when the
  ;; action is called.  If the action is called as an event handler
  ;; in a component, this will be the component's ShadowRoot.
  :zero.core/host
  ;; `root.host` if `root` is a ShadowRoot, otherwise nil.  If the action
  ;; is called as an event handler in a component, this will be the DOM
  ;; node for that component.
  :zero.core/event.data
  ;; the data harvested from the event
  :zero.core/event.target
  ;; the original `event.target` as seen when the action was called
  :zero.core/event.current
  ;; the original `event.currentTarget` as seen when the action was called
  ```
    
- When given the `:stop-propagation? true` or `:prevent-default? true` options, the respective methods will be called on the given event *immediately* when the action is called
- When given a `:dispatch :throttle` or `:dispatch :debounce` option, the actions dispatch will be throttled accordingly, with an optional `:delta <n>` for non-default (300ms) throttle deltas.
- By default, when you call an action in ClojureScript it’ll be scheduled with `setTimeout` .  So if called with an event, by the time the action’s effects are executed the event will already be stale (will have bubbled up the DOM and have its properties all out of whack).  However Zero will ‘harvest’ the event data beforehand (immediately when the action is called) and include said data in the action context, so effect handlers should have everything they need to do their job.  This system creates more consistency between throttled and non-throttled actions.  So throttling of an action can easily be turned on or off, without running into the various inconsistencies that would otherwise emerge.  This deferred execution can be disabled with `:dispatch :immediate`.

A `:log? true` option can also be set on actions to log each time the action is executed, along with the context it was executed with, and other bits of useful info.  This is useful for debugging.

```clojure
(defonce !value (atom nil))

(zc/reg-effects
  ::update-input-value
  (fn [value]
    (reset! !value value))
  
  ::submit-value
  (fn []
    ;; do something
  ))

;; elsewhere
(def my-view [_]
  [:div
    [:input
      ::z/on {:input (act {:dispatch :debounce} [::update-input-value (<< ::input-value)])}]
    [:button
      ::z/on {:click (act [::submit-value])}]])
```

### 2.3 Bindings
A binding is a kind of reactive ‘reference’ to a shared underlying data stream.  In other words, data stream is a live source for a particular bit of data that might change over time, and bindings are how we observe said data.  Bindings are created with `zero.core/bnd`, which accepts an optional options map, a stream key (which identifies a registered stream handler), and a sequence of arguments.  The combination of stream key and arguments is used to identity the particular data stream instance being referenced.

Bindings are watchable.  While at least one binding to a particular data stream has at least one watch; said data stream will be ‘live’.  A binding to a live data stream can be deref’d for the current value of the stream.  If not live, the stream doesn’t technically ‘exist’, and has no value, so a deref on the binding will always yield `nil`.

```clojure
(zc/reg-streams
  ::ssr
  (fn [rx url]
    (let [es (js/EventSource. url)]
      (.addEventListener es "message" #(rx (.-data ^js/MessageEvent %)))
      (fn cleanup []
        ;; a cleanup function can be returned by a stream handler,
        ;; which will be called to cleanup when the stream is killed
        ;; (i.e it's watch count gets down to 0)
        (.close es)))))

;; elsewhere
(defn my-view [_]
  [:input
   :readonly true
   ::z/bind {:value (bnd ::ssr "http://example.com/ssr")}])
```

Zero allows props to be ‘bound’ to any watchable thing by putting them in the `::z/bind` map.  This will make the prop react/update when the watchable thing changes.  Since bindings are watchable, they too can be bound to props… and indeed, that’s their primary purpose.

## 3. Components
Components are registered with `zero.config/reg-components`, which takes a series of name-options pairs, each representing a component to register.  The `zero.component` namespace also must be loaded in order for registered components to actually be realized.

The name should be a keyword.  If said keyword is namespaced then it translates to an HTML element name like `<ns>-<name>` , this means any namespaced components automatically comply with the [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components#custom_elements_2) requirement that names contain a hyphen.  For non-namespaced keywords, a hyphen must be included manually somwhere in the name.

The only required option is `:view` , which provides a render function for the component.  This function receives a map or prop values, and returns the markup to render for the component.  The following optional options are supported:

The `:props` option is the second most important after `:view`.  It tells Zero which ‘things’ to track as props, which will cause the component to be re-rendered when they change.  Zero supports JS properties on the component, attributes, and arbitrary watchables as prop sources.  This option can be given as either a set or a map.  If given as a set, it’s treated in the same way as a map with the set’s values as keys, and `:default` as all values.  For example the set `#{:foo :bar}` is equivalent to the map `{:foo :default :bar :default}`.

If the `:props` option is given as a map, the keys of said map are the keys that’ll be used for the prop values in the map passed to the `:view` function.  The value can be one of the following:

- `:attr` — The prop is mapped to an attribute on the component with the same name as the prop.  So for example if this prop is given as `:foo :attr`, then the `foo` attribute will be tracked, when it changes the component will be re-rendered with the new prop value.
- `:field` — The prop is mapped to a JS property on the component with the cammelCased equivalent to the prop name.  Zero will automatically add these props to the component class.  So for example if the prop is given as `:foo-bar :field` , then the `fooBar` property will be tacked as the source of truth for this prop.
- `:default` — Combines the functionality of `:field` and `:attr`, tracks both the attribute and the field.  The last one to have changed it the source of truth.
- A watchable thing — The watchable thing becomes the source of truth for the prop, if said thing is also derefable then it’ll be derefed for an initial value.
- `{:field ? :attr ?}` — A map with explicit field and/or attribute names.  Each of these is optional, if given then the respective JS property and attribute will be tracked.  No name transformations are applied to these, so they should be given literally as strings.
- `{:state-factory ? :state-cleanup ?}` — A map with functions to provide/cleanup a watchable thing to serve as the source of truth for the prop.  If `:state-factory` is provided along with `:field`, then the watchable returned by `:state-factory` will be the source of truth, while a read-only property will be generated for `:field`.  The `:state-factory` function receives the component’s DOM node, and must produce a watchable.  If given, the `:state-cleanup` function will be called when the component is disconnected, and is given the result of `:state-factory`, along with the component’s DOM node.

Additional options supported include:

- `:inherit-doc-css? true|false`  — If `true` Zero will try to pull CSS from `link`s in the current document into the component.  This creates a one-way break in the component’s CSS encapsulation, allowing access to document CSS without exposing internal rules.  This comes with some caveats though: it uses pulls the stylesheet referenced in the `link` into a `CSSStyleSheet` that’s attached to each component instance.  These are stylesheets that can be shared between components, *but they ignore `@import`s*, so some care must be given to their use.
- `:focus :self|:delegate` — Tells Zero how focus should be handled for the component.  If given as `:delegate` then the ShadowRoot for this component will be created with `[delegatesFocus](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus)` enabled.  **WARNING** this cannot be undone via hot-reload.  If given as `:self` then Zero will set `tabIndex = 0` on this component whenever it’s rendered, if a tab index isn’t otherwise specified in its markup props.  This will make the component focusable by default.
- `:form-associated? true|false` — If `true` Zero will make this a form associated component.  This allows the component to report its current value, errors, etc. to its parent form via the `::z/internals` prop on the component’s `:root>` container (more on this below).

### 3.1 Slots
[Slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) are a powerful tool available for web components that allows an element’s children to be rendered within its shadow DOM.  For example if we have the following:

```clojure
(zc/reg-components
  ::outer
  {:view (fn []
           [:div
             [:div "The children are rendered here:"]
             [:slot]])}
   
   ::inner
   {:view (fn []
            [:div "The child"])})

;; elsewhere
[::outer [::inner]]
```

The browser will render the `::outer` element with an `::inner` element in place of the `:slot`.  And event better, the `::inner` element can change independently of `::outer` ; the rendering logic for `::outer` doesn’t need to know or care that the `::inner` component has updated.

One challenge of working with slots from reactive `:view` functions, is trying to react to changes in slotted elements.  For example you may want to show the slotted children if there are any, or a placeholder otherwise.  Or may want to render differently depending on the type of elements that are slotted.  For this, Zero provides a helper `zero.dom/slotted-prop` to help with such situations.

```clojure
(zc/reg-components
  ::example
  {:props {:slotted (zd/slotted-prop)}
   :view (fn [{:keys [slotted]}]
           [:div
             [:slot]
             (when-not (seq slotted)
               "Nothing to show")])})
```

The `:slotted` prop value will be a set of all nodes slotted in the component.  This set can be reduced by giving `:slots #{...slot-names...}` or `:selector css-selector`. For example `(zd/slotted-prop :slots #{:my-slot} :selector :input.my-class)`.

## 4. Markup
Zero’s markup syntax is based loosely on [Hiccup](https://github.com/weavejester/hiccup), though there are significant differences.  This syntax is what must be returned from a component’s `:view` function, to be rendered to its shadow DOM.  And can be passed to `zero.html/html` to be rendered as a raw HTML string.

Some major differences between Zero’s markup syntax and Hiccup:

1. Zero treats all un-namespaced props equally, there’s no special logic for `:class`, `:style`, etc. Instead, there are equivalent `:zero.core/class`, `:zero.core/style`, etc. Generally `zero.core` will be aliased to `z`, so these become `::z/class`, `::z/style`, etc.
2. A `:view` function can return a top level `[:root> ...]` form, which applies special props to the component itself.
3. Zero doesn’t require a ‘props map’, props can be given as keyword-value pairs after the tag (e.g. `[:button :title "My Button Title" "My Button Text"]`).

Now, here are some examples of Zero forms, and the equivalent HTML.  This should be enough to get gist.

```clojure
[:div "My Div"]
; <div>My Div</div>

[:input :value "foo"]
; <input value="foo"></input>

[:button :title "My Button" "Click Me!"]
; <button title="My Button">Click Me!</button>

[:div#my-id.class-a.class-b ::z/style {:display "none"} "Can't find me!"]
; <div id="my-id" class="class-a class-b" style="display: none;">Can't find me!</div>

[[:div#my-div :p#my-paragraph] ::z/style {:color "red"} "I'm RED!"]
; <div id="my-id"><p id="my-paragraph" style="color: red;">I'm RED!</p></div>
```

### 4.1 The `:root>`
When rendering markup from the component’s `:view` function, a `:root>` form can be returned as the top level value.  This represents ‘the component itself’ in a sense.  It allows certain special props to be attached, which can affect the component in various ways.  Note that some keys from props in `:root>` may coincide with special props that can be applied to normal markup forms… but the behavior of these may not match up exactly, since the `:root>` doesn’t actually represent a DOM node.

- `:zero.core/css`
    
    Allows stylesheets to be adopted by the component.  Can be either a string, a `URL`, a `CSSStyleSheet`, or a vector with each value being one of the former options.  Strings are converted to `URL`s, and should point to a style sheet that can be pulled in over HTTP.  CSS pulled in from a URL is wrapped in a `CSSStyleSheet`, so the same restrictions apply (i.e. `@import`s are ignored).
    
- `:zero.core/on`
    
    Similar to the counterpart on normal element forms detailed below, however the event listeners are installed on the current element’s ShadowRoot.  Zero will dispatch lifecycle events for each component to the ShadowRoot, these include:
    
    - `connect` — When the element is connected to the document.
    - `render` — Each time the element is rendered (i.e. `:view` is invoked and its markup applied to the DOM).
    - `update` — Each time the element is rendered except for the first.
    - `disconnect` — When the element is disconnected from the document.
- `:zero.core/style`
    
    Similar to the counterpart on normal element forms detailed below, except the style is applied as a default to the component itself.  This is done by rendering the style map to a `:host { ... }` rule within a `CSSStyleSheet`, and attaching result as the ShadowRoot’s first `adoptedStyleSheet`.
    
- `:zero.core/tag`
    
    Same as the counterpart on normal element forms detailed below.
    
- `:zero.core/opaque?`
    
    Same as the counterpart on normal element forms detailed below.
    
- `:zero.core/internals`
    
    A map of things to set on the component’s `[ElementInternals`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) instance.  (TODO: more details)
    

### 4.2 Special Props
The following props have special significance in Zero markup when given on element forms:

- `:zero.core/on`

  When rendering as a component’s markup (i.e. from a `:view` function) this registers event listeners for the element.  It should be a map of `event-name-keyword -> handler-fn`. 
  
  When rendering as HTML via `zero.html/html`, however, something else happens:
  
  1. The element is rendered with a random ID if none was specified.
  2. For each entry in the listener map, an additional sibling element is rendered which looks like this `[:zero.dom/listen :sel "#<the-id>" :evt the-event-handler-key :act the-event-handler-value]`.
      - This is a component provided by `zero.dom` (which must be loaded on the client side for this to work properly).
      - It installs the event handler given as `:act` onto all elements matching the given `:sel` CSS selector.
      - Ideally `:act` will have a custom attribute writer/reader to provide something callable to the element… but otherwise, if given as a string, it’ll be compiled as JS.

- `:zero.core/bind`

  When rendering as a component’s markup (i.e. from a `:view` function) this creates bindings from watchable objects to the element’s props.  These ‘bound’ props, will update reactively as the watchable object changes.  The value for this prop should be a map of `prop-name -> watchable`.
  
  Similarly to `:zero.core/listen`, this prop is treated differently when rendered as HTML:
  
    1. The element is rendered with a random ID if none was specified.
    2. For each entry in the bind map, an additional sibling element is rendered which looks like this `[:zero.dom/bind :sel "#<the-id>" :prop the-prop-name :ref the-watchable-value]`.
        - This component is provided by `zero.dom` (which must be loaded on the client side for this to work properly)
        - It installs a binding between the prop and the watchable
        - `:ref` should have a custom attribute writer/reader to provide something watchable to the element, otherwise this won’t work properly

- `:zero.core/style`

    Sets CSS properties on the element from a map.  For example `{:display "none"}` on this prop would be equivalent to `display: none;` on `:style`.
    
- `:zero.core/class`
    
    Sets the element’s class list from a collection.  The collections is flattened, and `name` called on keywords.
    
- `:zero.core/key`
    
    Similar to [React keys](https://legacy.reactjs.org/docs/lists-and-keys.html).  Give it a unique value to allow Zero to keep track of which DOM node corresponds to this element form.
    
- `zero.core/tag`
    
    A tool for manual optimization.  Similar to [HTTP ETags](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag), set it to a value that’s ‘representative’ of this form.  If the form has the same tag on two subsequent renders, Zero will skip updating the DOM for this form; with the assumption that nothing has changed.
    
- `:zero.core/opaque?`
    
    If set to `true`, Zero will skip rendering the body for this form.  This allows the contents of an element to be rendered by some other means, without Zero getting in the way.
    

### 4.3 Normal Props
Any entries in a form’s prop map which don’t have a namespaced key, are considered to be ‘normal’ props.  When rendering Zero’s markup as HTML, these are always rendered as attributes.  

When rendering the result of a component’s `:view`, the process is more complicated.  For each element class Zero comes across, it keeps a fields index that maps all the acceptable variations on each of the class’s writable field names to the actual field name.  For example the `tabIndex` field will introduce the following entries `{:tab-index "tabIndex" :tabIndex "tabIndex"}` into an index.  

When it comes time to set a prop on some element in the DOM, we first check if the prop name exists in this index.  If it does, then we set the respective property on the DOM node to the given value.  Otherwise, the prop is set as an attribute.

## 5. Attribute Readers/Writers
When a Zero component (or the HTML renderer) reads or writes attributes for an element, there’s a layer that allows for customization of how attribute values are encoded/decoded.  Custom attribute readers can be registered with `zero.config/reg-attr-reader`, and custom writers with `zero.config/reg-attr-writer`.  The keys for these can be either literal element names (keywords) to apply the reader/writer to, or a namespace wildcard like `:my-ns/*` to cover any elements under a particular namespace *or sub-namespace*, for example `:my-ns/something` and `:my-ns.my-group/other-thing` will both be covered by the previous example, but not `:other-ns/something`.

```clojure
(defn attr-reader [attr-str-value attr-name component-name]
  ...return decoded attr-str-value...)

(defn attr-writer [attr-clj-value attr-name component-name]
  ...return attr-clj-value as string...)

(zc/reg-attr-readers :zero.dom/* attr-reader :my.app/* attr-reader)
(zc/reg-attr-writers :zero.dom/* attr-writer :my.app/* attr-writer)
```

## 6. Harvesting Events
Zero’s event harvesting can be customized by defining implementations on the `zero.config/harvest-event` multi-method.  This method receives the event to be harvested, and dispatches on the event class unless the event is a `CustomEvent`, in which case the method dispatches on `(keyword (.-type event))`.

## 7. Rendering to HTML
Render Zero markup to HTML with `zero.html/html`.  Zero is great for projects with static pages or SSR since there’s no need for any sort of custom bootstrapping or ‘hydration’ on page load.  If we have custom components, the browser boots them up for us.  We just render HTML.

## 8. Extras
So far this guide has covered Zero’s core functionality.  But there are also a few extra components that may make life easier for some… though it’s recommended that you consider alternatives to these conveniences, if more suitable.

### 8.1 Database
Zero ships with a very basic reactive database suitable for apps following the ‘one place for all application state’ model as described well in [re-frame’s docs](https://github.com/day8/re-frame/blob/master/docs/application-state.md).  Zero’s DB is patch based.  You submit a data structure that represents exactly the changes that should be made to the DB.  The internal logic applies said changes, and (because it knows exactly which parts of the DB were affected) can efficiently update any `::db/path` bindings that depend on the changed parts.

Database patches can be submitted with the `zero.extras.db/patch!` function, or the `:zero.extras.db/patch` effect.

```clojure
(ns zero.example
  (:require
   [zero.extras.db :as db]
   [zero.core :refer [act]]))

(db/patch! [{:path [:foo] :value 1}])
; use the patch! fn to set the value at [:foo]

((act [::db/patch [{:path [:foo] :fn inc}]]) {})
; create and call an action that increments the value at [:foo]
```

A patch takes the form of a vector of *changes*.  Each change is a map with a `:path` (the path to update in the DB), an optional `:fnil` (the initial value to use, if there’s no value or `nil` at `:path`), and some patch key mapped to an `arg`:

- `:merge` — `(merge initial arg)`
- `:conj` — `(conj initial arg)`
- `:into` — `(into initial arg)`
- `:value` — replace `initial` with `arg`
- `:patch` — apply `arg` as sub-patch to `initial`
- `:clear` — treat `arg` as a set of keys, remove those keys from `initial` (which should be a set, vector, or map)
- `:fn` — call `arg` as a function with `initial` as its first arg, additional arguments can be given with an `:args` key

The current value of a path in the DB can be retrieved with the `zero.extras.db/get` function, or a `:zero.extras.db/path` injection.  A `:zero.extras.db/path` binding can also be created to react to changes at a given path.

```clojure
(db/get [:foo])
(<< ::db/path [:foo])
(bnd ::db/path [:foo])
```

Zero’s DB implementation convenient and suitable for simple apps.  However more sophisticated solutions such as [DataScript](https://github.com/tonsky/datascript) or [Relic](https://github.com/wotbrew/relic) may be more suitable for more complex requirements.

### 8.2 Concise Data Format (CDF)
CDF is a very basic data serialization format implemented in a few hundred lines.   Designed with a few goals:

1. Concise, readable, dev friendly
2. Small code footprint (doesn’t bloat client builds)
3. Suitable for embedding in HTML attributes (and other places/languages) without escaping everything

The result is a format somewhat akin to EDN… but also quite different.

The ‘top level’ of a CDF string is treated specially.  If it’s empty, it's parsed as an empty string.  If it starts with a digit or `+/-` then it’s parsed as a number. If it matches one of the following exactly then it’s parsed accordingly:

- `_` — parsed a `nil`
- `true` — parsed as `true`
- `false` — parsed as `false`

If it begins with one of the following, then it’s parsed accordingly:

- `:` — parsed as keyword
- `[` — parsed as vector
- `{` — parsed as map
- `(` — parsed as operation/expression/special form.
- <code>`</code> — parsed as a string, any number of sequential ticks can be used to open the string, the same number must be used to close it… so the string can contain nested ticks without otherwise escaping

Otherwise, the full top-level string is ‘parsed’ as itself… a string.

At an inner level (nested in a map, vector, or operation) the syntax is stricter.  Numbers, keywords, maps, and vectors look as you’d expect.  Strings are nested in ``...``.  Operations look like `(operator ...args)` (these are customizable).  Some special values exist:

- `E` — empty string
- `Inf+` — positive infinity
- `Inf-` — negative infinity
- `NaN`  — not a number
- `T` — true
- `F` — false
- `_` — nil

That’s it.

Use `zero.extras.cdf/read-str` to parse a CDF string.  An `:operators` option can be passed to specify custom operators.  By default the reader supports operators matching the `act`, `bnd`, and `<<` functions from `zero.core`.

Use `zero.extras.cdf/write-str` to serialize to a CDF string.  If a `:mapper` option is given, the provided function will be called on each value before it’s serialized; allowing for custom conversions.  Lists with a symbol as the first value will be serialized as operations.  The default mapper converts actions, bindings, and injections into lists that will be serialized as operations; readable by the default operators supported by `read-str`.

### 8.3.1 CDF For SSR Attributes
CDF is suitable for representing rich data in HTML attributes.  It’ll work by default to serialize/deserialize Zero’s core state management values (i.e actions, bindings, injections); which together with Zero’s unique logic around rendering `::z/on` and `::z/bind` props, allows for easily ‘rendering’ powerful state manipulation directly into your HTML (in a concise, readable format).  Check out the [Zero SSR demo](https://github.com/raystubbs/zero-ssr-demo) for an example of this.