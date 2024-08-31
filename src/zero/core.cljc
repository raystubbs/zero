(ns zero.core
  (:require
   [zero.impl.default-db :refer [!default-db]]
   [zero.impl.actions :as act #?@(:cljs [:refer [Action]])]
   [zero.impl.bindings #?@(:cljs [:refer [Binding]])]
   [zero.impl.injection #?@(:cljs [:refer [Injection]]) :as inj]
   [zero.impl.signals #?@(:cljs [:refer [Signal]]) :as sig]
   [zero.impl.base :as base]
   [clojure.string :as str]
   [subzero.core :as sz])
  #?(:clj
     (:import
      (zero.impl.actions Action)
      (zero.impl.bindings Binding)
      (zero.impl.injection Injection)
      (zero.impl.signals Signal))))

(defn act "
Construct an action.

```clojure
[:button
 :on-click (act [:do-something (<< :inject-something)]
                [:do-something-else \"some data\"])
 \"Click Me!\"]

```

Actions are declarative sequences of events.  They can be
called, and have value semantics.  If called with a `js/Event`
Zero will automatically extract an 'action context' from the
event, which will be a map with the following:

```clojure
:zero.core/data          ;; event data, extracted from original event via default or custom harvester
:zero.core/event.target  ;; the event target
:zero.core/current       ;; the element to which the action is attached
:zero.core/event         ;; the original event, generally stale by this point
:zero.core/host          ;; generally the component from which the action was rendered
:zero.core/root          ;; generally the shadow root of the component from which the action was rendered
```

The context will be passed to injectors found within the action, which can extract useful info from
the context and 'inject` it into the action's effect forms before each dispatch.

This function may also take a 'props' map as its first argument, the following props are supported
in a ClojureScript context:

- `:log?` - log various bits of useful info when this action is dispatched, useful for debugging
- `:prevent-default?` - call `.preventDefault()` on the event, when dispatched with an event
- `:stop-propagation?` - call `.stopPropagation()` on the event, when dispatched with an event
- `:dispatch` - the dispatch strategy, one of (`:default`, `:immediate`, `:throttle`, `:debounce`)
- `:delta` - if `:dispatch` is `:throttle` or `:debounce`, specifies the delta for each dispatch

In a ClojureScript context, and when dispatching with an event, the action dispatch will be scheduled
with `setTimeout` rather than invoked directly.  This improves consistency between throttled vs non-throttled
dispatches; the event will always be stale.  Use `:immediate` dispatch to have the action dispatch immediately
when called.
" {:arglists
   '[[& effects]
     [{:keys [log? prevent-default? stop-propagation? dispatch delta]} & effects]]}
  [& things]
  (let [[props effects] (if (map? (first things))
                          [(first things) (rest things)]
                          [{} things])]
    (Action. props (vec (mapcat (fn [fx] (if (or (seq? fx) (nil? fx)) fx [fx])) effects)))))

(defn bnd "
Construct a binding.

```clojure
[:input
 :value (bnd {:default \"foo\"} :db/something)]
```

A binding is a declarative reference to a registered data stream.  When
said data stream is active (has watchers) the binding can be deref'd for
the current value of the stream; otherwise a deref yields nil.  Bindings
are `IWatchable` and have value semantics.  When watching an instance of a
binding, what's really being watched is the underlying data stream; so any
instance is fine to add and remove watches, particular instances don't need
to be held on to.
" {:arglists
   '[[stream-key & args]
     [{:keys [default default-nil?]} stream-key & args]]}
  [& things]
  (let [[props stream-key args] (if (map? (first things))
                                  [(first things) (second things) (nthrest things 2)]
                                  [{} (first things) (rest things)])]
    (Binding. props stream-key (vec args))))

(def ^{:arglists '[[injection-key & args]]}
  << "
Creates an injection.  These can be placed in actions, bindings,
and markup; and nested in other injectors. Injectors will be substituted
by the value returned by the registered injection handler.

```clojure
  (act :do-something (<< :inject-some-data))
  (bnd :something (<< :inject-some-data))
```

As a convenience, injectors can be chained without nesting:

```clojure
(<< :inject-something 1 2 << :inject-something-else)
;; is equivalent to
(<< :inject-something 1 2 (<< :inject-something-else))
```
"
  (with-meta
    (fn << [injection-key & args]
      (let [[args others] (split-with #(-> % meta ::injector-fn not) args)]
        (Injection. injection-key
          (cond-> (vec args)
            (seq others) (conj (apply (first others) (rest others)))))))
    {::injector-fn true}))

(defn sig "
Create a signal.  For when a component needs to know about
external happenstance.

    (def my-sig (sig ::my-signal-key))
    
    ;; elsewhere
    [::some-component :focus-signal my-sig]

    ;; elsewhere
    (zc/reg-components
     ::some-component
     {:props #{:focus-signal}
      :view (fn [{:keys [focus-signal]}]
             [:input
              ::z/on {focus-signal (act [::focus (<<ctx ::z/current)])}])})

    ;; elsewhere
    (my-sig)
" [k]
  (Signal. k))

(defn element-name "
Given a keyword, returns the custom element name that'll be generated
for a component with this name.
" [kw]
  (sz/element-name kw))

(defn act?
  [x]
  (instance? Action x))

(defn act->map
  [^Action act]
  {:props (.-props act) :effects (.-effects act)})

(defn map->act
  [m]
  (Action. (into {} (:props m)) (vec (:effects m))))

(defn inj?
  [x]
  (instance? Injection x))

(defn inj->map
  [^Injection inj]
  {:key (.-key inj) :args (.-args inj)})

(defn map->inj
  [m]
  (Injection. (:key m) (vec (:args m))))

(defn bnd?
  [x]
  (instance? Binding x))

(defn bnd->map
  [^Binding bnd]
  {:key (.-key bnd) :props (.-props bnd) :args (.-args bnd)})

(defn map->bnd
  [m]
  (Binding. (into {} (:props m)) (:key m) (vec (:args m))))

(defn sig?
  [x]
  (instance? Signal x))

(defn sig->map
  [^Signal x]
  {:key (.-key x)})

(defn map->sig
  [m]
  (Signal. (:key m)))

(defn css-selector
  [x]
  (cond
    (string? x)
    x

    (keyword? x)
    (if-let [ns (namespace x)]
      (str (str/replace ns #"[.]" "\\.") "-" (name x))
      (name x))

    (vector? x)
    (str/join " " (map css-selector x))))

(def ^{:arglists
       '[[& effects]
         [{:keys [log? prevent-default? stop-propagation? dispatch delta]} & effects]]}
  <<act
  (with-meta
    (fn <<act [& args]
      (apply << ::act args))
    {::injector-fn true}))

(def ^{:arglists '[[& path]]}
  <<ctx
  (with-meta
    (fn <<ctx [& path]
      (apply << ::ctx path))
    {::injector-fn true}))

(def ^{:arglists '[[& args]]}
  <<<
  (with-meta
    (fn <<< [& args]
      (apply << ::<< args))
    {::injector-fn true}))

(def ^{:arglists '[[f & args]]}
  <<call
  (with-meta
    (fn <<call [f & args]
      (apply << ::call f args))
    {::injector-fn true}))

(defn inject
  ([context form]
   (inject !default-db context form))
  ([!db context form]
   (inj/apply-injections !db context form)))

(def after-render-sig sig/after-render-sig)
(def before-render-sig sig/before-render-sig)

(defn sig-listen
  [sig k f]
  (sig/listen sig k f))

(defn sig-listen-once
  [sig k f]
  (sig/listen sig k
    (fn []
      (try
        (f)
        (finally
          (sig/unlisten sig k))))))

(defn sig-unlisten
  [sig k]
  (sig/unlisten sig k))
