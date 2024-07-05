
[![Clojars Project](https://img.shields.io/clojars/v/me.raystubbs/zero.svg)](https://clojars.org/me.raystubbs/zero)
![Test Badge](https://github.com/raystubbs/zero/actions/workflows/ci.yml/badge.svg)
[![cljdoc badge](https://cljdoc.org/badge/me.raystubbs/zero)](https://cljdoc.org/d/me.raystubbs/zero)

# Zero
A toolkit for building web component based UIs in ClojureScript.

Zero builds on top of [SubZero](https://github.com/raystubbs/subzero)'s web components, supplementing
it with state management, structured data serialization, and various other utilities.  The goal of the
project is to provide a 'batteries included' solution to building complete UIs with SubZero's web
components.

## Setup
Add something akin to the following somewhere in your boot up logic:
```clojure
(zero.config/install! zero.config/!default-db)

;; only for browsers, sets up the web component registry
(zero.wcconfig/install! zero.config/!default-db)

;; only for browsers, and optional, adds some DOM utilities and convenient components
(zero.dom/install! zero.config/!default-db)
```

The `zero.config/!default-db` in the above can be substituted with any SubZero database,
Zero provides a default instance for convenience.  If a non-default instanace is used,
then an extra `!db` parameter needs to be passed to all of Zero's `reg-*` functions,
and some others.  Usually the default DB is more convenient browser-side.

## State Management
Zero's state management consists primarily of three concepts: injections, actions, and bindings.  The
types corresponding to these concepts were built with a virtual DOM (and reconciliation) in mind, they
all have value semantics.

### Injections
An injection is a 'placeholder' for some value that will be injected at a later time.

```clojure
(ns example
  (:require
    [zero.core :refer [<<] :as z]
    [zero.config :as zc]))

(zc/reg-injections
  ::user
  (fn [context & _args]
    (:user context)))

(z/inject
  {:user "Ray"}
  ["Hello, " (<< ::user) "!"])
;-> ["Hello, " "Ray" "!"]
```

These are most useful within actions, where they can inject DOM components and event
data to be acted upon.

For the sake of convenience, there's also the `zero.core/<<ctx` function that builds
in injector that resolves to a particular path within its context.  For example
`(<<ctx :user)` would do the same as the injector in the example above, without
the need for a custom registration.

Injector construction functions can also be chained: `(<< :thing1 arg1 arg2 << :thing2 arg3)`.

### Actions
Actions are packets of 'things to do at some point' in the form of effects.  They can be used
as event handlers in SubZero components in place of raw functions.

Actions have a few advantages over raw functions:
- Value semantics make DOM reconciliation more performant
- Built-in conveniences like logging and throttling
- Injections are resolved before effects are dispatched

The last bullet is the main reason for the existence of actions.  It allows us to easily
work with 'the real DOM' without breaking our component's declarative virtual DOM, by
_injecting_ raw DOM nodes into our effect handlers.

```clojure
(ns example
  (:require
    [zero.core :refer [ctx act] :as z]
    [zero.config :as zc]))

(defn my-custom-input-view
  [{:keys [value]}]
  [:input
   :value value
   :#on {:input (act [::dispatch (<<ctx ::z/host) :value (<< ::value <<ctx ::z/current)])}])

;; This is how we register effect handlers, which are invoked from our actions
(zc/reg-effects
  ;; This effect will dispatch an event on the given DOM node
  ::dispatch
  (fn [^js/HTMLElement target event-type event-value]
    (.dispatchEvent target
      (js/CustomEvent.
        (name event-type)
        #js{:detail event-value})))
  
  ;; This effect will log whatever value it receives
  ::log
  (fn [data]
    (js/console.log data)))

;; An injector, which grabs the `.-value` of whatever DOM node it receives
(zc/reg-injections
  ::value
  (fn [_ ^js/HTMLElement target]
    (.-value target)))

(zc/reg-components
  :my-custom-input
  {:view my-custom-input-view
   :props #{:value})

(comment
  ;; This can now be used within another component like this  
  [:my-custom-input
   :#on{:value (act [::log (<<ctx ::z/data)])}])
```

This system of injecting the things we need into our effect handlers is, in my experience,
much more convenient than bumbling around with refs as we'd do in most React-based libraries.

When an action is used as an event handler or called with an event (they _can_ just be _called_
with an explicit context) its context (the thing passed to injection handlers) is derived from
the received event.  The derived context is a map with the following:
```clojure
:zero.core/event.target ;; the event target when the action was invoked
:zero.core/event        ;; the event itself (usually stale)
:zero.core/current      ;; the thing the event handler (action) is attached to
:zero.core/root         (.getRootNode current) ;; usually the shadow root of the element the action was rendered within
:zero.core/host         (.-host root)          ;; usually the component in which the action was rendered
:zero.core/data         ;; data harvested from the event, depends on the event type and (if provided) custom event harvester
:zero.core/db           ;; the SubZero database instance associated with the component this action was rendered in
```

Actions can also take an option map to customize how they'll be dispatched, the overall usage of
`zero.core/act` looks like:
```clojure
(act {:as opts}? & effect-vectors)
```

The following options are supported _only_ when the action is dispatched with an event:
- `:prevent-default?` - Prevent the event's default behaviour
- `:stop-propagation?` - Stop the event from bubbling to parent nodes

The following options are always supported (including in JVM Clojure):
- `:log? true`
  
  Log the action, along with other useful debug data, when it's dispatched.


- `:dispatch :default|:throttle|:debounce|:immediate`

  Determines how the action will be dispatched.  By default, the action's effects will
  be invoked 'sometime soon'.
  - The `:immediate` dispatch strategy tells the action to invoke its effects immediately
    when the action is dispatched, during the same call frame.
  - The `:throttle` and `:debouce` strategies reduce multiple action dispatched over a
    period of time to either a single trailing (for `:debounce`) or a leading and trailing
    (for `:throttle`) invocation of its effects.


- `:delta`

  Gives the 'period' in milliseconds for `:throttle` and `:debounce` dispatches.  Ignored
  if a different dispatch strategy is used.

### Bindings
Bindings build on Clojure/Script's built-in 'watchability' of reference types to provide a
more robust 'reactive programming' experience.

Essentially, a binding taps into a 'data stream', which boots up to provide a reactive
stream of data while being watched; then cleans up and shuts down when no longer needed.

```clojure
(ns example
  (:require
    [zero.core :refer [bnd]]
    [zero.config :as zc]))

(zc/reg-streams
  ::my-random-data-stream
  (fn [rx & max]
    ;; call `rx` to push a value into the stream
    (let [interval (js/setInterval #(rx (rand-int max)) 5000)]
      ;; return a cleanup function
      (fn []
        (js/clearInterval interval)))))

;; derefing a binding while its stream is 'shut down' yields `nil`
@(bnd ::my-random-data-stream 10) ;; -> nil

;; watch the binding like you'd do with any watchable thing
(add-watch (bnd ::my-random-data-stream 10) ::my-watch-key
  (fn [_ _ _ new-val]
    (js/console.log new-val)))

;; then when you're done, shut it unwatch, it'll shut down when the
;; watch count reaches 0
(remove-watch (bnd ::my-random-data-stream 10) ::my-watch-key)
```

Since bindings adhere to the core Clojure/Script ref interfaces, and SubZero relies
on these same interfaces for reactivity; we already have several ways to plug bindings
into our web components.  See the [SubZero readme](https://github.com/raystubbs/subzero)
for details, but here's an example of plugging the above binding into a state prop
of a SubZero component:

```clojure
(zc/reg-components
  :my-random-number
  {:props #{:rand (bnd ::my-random-data-stream 10)}
   :view (fn [{:keys [rand]}]
           rand)})
```

Or via prop binds:

```clojure
(zc/reg-components
  :my-random-number
  {:view (fn [{:keys [rand]}]
           [:input
            :#bind {:value (bnd ::my-random-data-stream 10)}])})
```

## CDF and SSR
SubZero has some support for rendering components server-side with declarative
shadow DOMs.  This is quite powerful in itself, but Zero provides some extras:
- Concise Data Format (CDF), a concise readable format ideal for encoding structured
  data into HTML attributes.  Every component registered via `zero.config/reg-components`
  installs an attribute reader and writer for this format.  So Zero components can wire
  structured data in their attributes out of the box.
- The `zero.dom` namespace includes special components: `:zero.dom/bind` and `:zero.dom/listen`,
  which will be output into generated HTML (when using `subzero.plugins.html`) in place of
  `:#on` (event listener prop) and `:#bind` (bind prop) props.  These components install the
  respective listeners/bindings when booted up on the client.  In other words, we can bind
  to reactive state, and setup event listeners via server side (or static) rendering.

```clojure
(ns example
  (:require
    [zero.core :refer [act bnd]]
    [zero.config :as zc]
    [subzero.plugins.html :as html]))

;; install Zero
(zc/install! zc/!default-db)

;; register a component
(zc/reg-components
  ::my-component
  {:props #{:foo :bar}
   :view (fn [{:keys [foo bar]}]
           [:div
            [:div "Foo is: " foo]
            [:div "Bar is: " bar]
            [:div
             "Baz is: "
             [:span
              :#opaque? true
              :#bind {:inner-html (bnd ::baz)}]]
            [:button
             :#on {:click (act [::do-something])}
             "Click Me!"]])})

;; render it into HTML
(html/html zc/!default-db {:doctype "html"}
  [:html
   [:body
    [::my-component :foo "FOO" :bar "BAR"]]])
```
Output HTML (re-formatted for readability):
```html
<!DOCTYPE html>
<html>
  <body>
    <example-my-component foo="FOO" bar="BAR">
        <template shadowrootmode="open">
            <div>
                <div>Foo is: FOO</div>
                <div>Bar is: BAR</div>
                <div>
                    Baz is: <span id="G__3340"></span>
                    <zero.dom-bind
                        sel="#G__3340"
                        prop=":inner-html"
                        ref="(bnd :user/baz)">
                    </zero.dom-bind>
                </div>
                <button id="G__3341">Click Me!</button>
                <zero.dom-listen
                    sel="#G__3341"
                    evt=":click"
                    act="(act [:user/do-something])">
                </zero.dom-listen>
            </div>
        </template>
    </example-my-component>
  </body>
</html>
```

The CDF format can also just be used as a general purpose structured data format via
`zero.cdf/read-str` and `zero.cdf/write-str`.  I find it more convenient than EDN
in many instances.

## Watchables
There are some utilities in `zero.util` to make working with watchable things more
convenient.

```clojure
(ns example
  (:require
    [zero.core :refer [bnd]]
    [zero.config :as zc]
    [zero.util :as zu]))

(defonce thing-1 (atom nil))

;; watch multiple things at once
(zu/watch ::my-key
  (fn [thing-1 thing-2]
    ;; do something
    )
  thing-1
  (bnd ::thing-2))

;; unwatch
(zu/unwatch ::my-key)

;; watch until one of the things has a non-nil value, then run
;; the callback once and unwatch
(zu/when-any ::my-key
  (fn [thing-1 thing-2]
    ;; do something
    )
  thing-1
  (bnd ::thing-2))

;; unwatch early if needed
(zu/unwatch ::my-key)

;; watch until all the things have non-nil-values
(zu/when-all ::my-key
  (fn [thing-1 thing-2]
    ;; do something
    )
  thing-1
  (bnd ::thing-2))

;; create a stream that derives its values from several other
;; watchables
(zc/reg-streams
  ::my-derived-stream
  (zu/derived
    (fn [[thing-1 thing-2] & _args]
      (+ thing-1 thing-2))
    thing-1
    (bnd ::thing-2)))
```

## DOM Utilities
The `zero.dom` namespaces provides utilities to help in working with the browser DOM.  These
must be installed separately `(zero.dom/install! zero.config/!default-db)`.

### Injectors
- `(<< ::zd/select-all selector & {:keys [deep? delay from]})`
  
  Grab a DOM element by selector.  If `from` is provided, then searches
  the given node's subtree; otherwise uses `:zero.core/root` from context
  (i.e searches the current component's DOM).  If `deep?` is truthy, then
  it'll search within children's shadow DOMs as well.  The `delay` can be
  given as either `:before-render` or `:after-render`; in which case a
  promise which resolves before or after (respectively) the next render
  will be injected.  This allows things which don't yet exist to be selected
  pre-emptively.


- `(<< ::zd/select-one selector & {:keys [deep? delay from]})`

  Similar to `::zd/select-all`, but selects only the first matching element.


- `(<< ::zd/select-closest selector & {:keys [breach? delay from]})`

  Similar to `::zd/select-all` except ancestors (not the subtree) is searched
  for matching nodes.  If `from` is provided, this will search 'up' from that
  node.  Otherwise `:zero.core/current` from the context will be used.


- `(<< ::zd/shadow element-or-promise)`

  Returns the `.-shadowRoot` of the element.  If the input is a promise,
  the output will be too.

### Internal State
Use `zero.dom/internal-state-prop` to attach an internal state prop to
components.  This internal state can be updated via the `:zero.dom/patch-internal-state`
effect, or the `zero.dom/patch-internal-state!` function.  These take
patches compatible with `subzero.rstore`.

```clojure
(ns example
  (:require
    [zero.core :refer [act <<ctx]]
    [zero.config :as zc]
    [zero.dom :as zd]))

(zc/reg-components
  ::click-counter
  {:props {:state (zd/internal-state-prop {:clicks 0})}
   :view (fn [{{:keys [clicks]} :state}]
           [:button
            :#on {:click (act [::zd/patch-internal-state (<<ctx ::z/host) {:path [:clicks] :change [:value (inc clicks)]}])}
            "Clicked " clicks " times!"])})
```


### Signals
Use signals any time you need to let a component know about something
that's happened externally, and can't be represented as a prop change.

```clojure
(ns example
  (:require
    [zero.core :refer [sig act <<ctx] :as z]
    [zero.config :as zc]))

(zc/reg-components
  ::something
  {:props #{:a-sig}
   :view (fn [{:keys [a-sig]}]
           [:input
            :#on {a-sig (act [::focus (<<ctx ::z/current)])}])})

;; elsewhere
[::something :a-sig (sig ::my-signal)]

;; elsewhere, when something happens
((sig ::my-signal))
```

## Caveats
Zero's model may not be for everyone.  Don't worry, don't use it.  Personally I've found
that it works well for me.  My Zero components are much cleaner, more flexible, and much
more composable than anything I'd built in reagent or re-frame has been.  But... that's
just me.

> [!WARNING]
> Zero depends on modern browser APIs.  It works on the latest versions of all
> major browsers... but will break in some not-ancient versions.  In particular,
> it depends on:
> + [CSSStyleSheet constructor](https://caniuse.com/mdn-api_cssstylesheet_cssstylesheet)
> + [ElementInternals](https://caniuse.com/mdn-api_elementinternals)

## Learning
Zero's undergone some huge changes, so all the demos and examples are out of date.  I'll
get to updating them soon.

## Contact
Feel free to reach out in the [#zero-lib](https://clojurians.slack.com/archives/C06UFMY5LUW)
channel on the Clojurians slack for any help, questions, feedback, etc.  I'll also try to start
posting real component code there whenever I work on something, so it's a good place to hang out
and gain exposure.