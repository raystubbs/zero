(ns zero.core
  (:require
   [zero.impl.actions :as act #?@(:cljs [:refer [Action]])]
   [zero.impl.bindings #?@(:cljs [:refer [Binding]])]
   [zero.impl.injection #?@(:cljs [:refer [Injection]])]
   [zero.impl.base #?@(:cljs [:refer [IDisposable dispose!]])]
   [zero.impl.logger :as log]
   [zero.impl.markup :as markup]
   #?(:cljs [zero.impl.components :as c])
   [zero.config :as config]
   [clojure.string :as str])
  #?(:clj
     (:import
       (zero.impl.actions Action)
       (zero.impl.bindings Binding)
       (zero.impl.injection Injection))))

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
{:zero.core/event.data (comment \"event-type-dependent data extracted from the event via `zero.config/harvest-event`\")
 :zero.core/event.target (comment \"the event target\")
 :zero.core/event.current (comment \"the current element which the event is being dispatched on\")
 :zero.core/event (comment \"the original event, this will generally be stale\")
 :zero.core/host (comment \"if `:root` is a ShadowRoot, then this will be its host element, otherwise `nil`\")
 :zero.core/root (comment \"the root element of `:current`)}
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
" [& things]
  (let [[props effects] (if (map? (first things))
                          [(first things) (rest things)]
                          [{} things])]
    (Action. props (filterv some? effects))))

(def ^:deprecated reg-effect "
Register one or more effects.

```clojure
(reg-effect
 ::echo
 (fn [& args]
   (prn args))

 ::echo2
 (fn [& args]
  (prn args)))

(act ::echo \"Hello, World!\")
```
" config/reg-effects)

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
" [& things]
  (let [[props stream-key args] (if (map? (first things))
                                   [(first things) (second things) (nthrest things 2)]
                                   [{} (first things) (rest things)])]
    (Binding. props stream-key (vec args))))

(def ^:deprecated reg-stream "
Register one or more data streams.

```clojure
(defonce !db (atom {}))

(reg-stream
 :db
 (fn [rx path]
  (rx (get-in @!db path)))

 :other
 (fn [rx]
  (rx \"thing\")))
```

If a function is returned it will be called to cleanup
the stream once it's spun down.

Each pair of `[stream-key args]` represents a unique
stream instance, so the method will be called only once
for each set of args used with the stream; until the
stream has been spun down and must be restarted.
" config/reg-streams)

(defn << "
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
" [injection-key & things]
  (let [[args others] (split-with (partial not= <<) things)]
    (Injection. injection-key (cond-> (vec args) (seq others) (conj (apply << (rest others)))))))

(defn element-name "
Given a keyword, returns the custom element name that'll be generated
for a component with this name.
" [kw]
  (markup/kw->el-name kw))

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
  {:key (.-injector-key inj) :args (.-args inj)})

(defn map->inj
  [m]
  (Injection. (:key m) (vec (:args m))))

(defn bnd?
  [x]
  (instance? Binding x))

(defn bnd->map
  [^Binding bnd]
  {:key (.-stream-key bnd) :props (.-props bnd) :args (.-args bnd)})

(defn map->bnd
  [m]
  (Binding. (into {} (:props m)) (:key m) (vec (:args m))))

(defn css-selector [x]
  (cond
    (string? x)
    x

    (keyword? x)
    (if-let [ns (namespace x)]
      (str (str/replace ns #"[.]" "\\.") "-" (name x))
      (name x))
    
    (vector? x)
    (str/join " " (map css-selector x))))

(defn <<act [& args]
  (apply << ::act args))

(defn <<ctx [& path]
  (apply << ::ctx path))

(defn <<< [& args]
  (apply << ::<< args))

#?(:cljs
   (do
     (defn bind [k ^js/Node dom prop-name watchable]
       (c/bind k dom prop-name watchable))
     
     (defn unbind [k]
       (c/unbind k))
     
     (defn listen [k ^js/Node dom-or-doms event-name listener-fn & {:keys [once? capture? passive? signal] :as opts}]
       (c/listen k dom-or-doms event-name listener-fn opts))
     
     (defn unlisten [k]
       (c/unlisten k)) 
     
     (config/reg-effects
       ::cond
       (fn [& clauses]
         (let [paired-clauses (partition-all 2 clauses)]
           (loop [remaining paired-clauses]
             (if (empty? remaining)
               nil
               (let [[test action :as clause] (first remaining)]
                 (when (not= 2 (count clause))
                   (throw (ex-info "Uneven number of items in :zero.core/cond" {:items clauses})))
                 (if test
                   (action {})
                   (recur (rest remaining))))))))
       
       ::case
       (fn [v & {:as cases}]
         (when-let [action (get cases v (get cases :default))]
           (action {})))
       
       ::listen c/listen
       ::unlisten c/unlisten
       ::bind c/bind
       ::unbind c/unbind)
     
     (config/reg-injections
       ::ctx
       (fn [ctx & path]
         (get-in ctx path))

       ::act
       (fn [_ & args]
         (apply act args))

       ::<<
       (fn [_ & args]
         (apply << args))

       ::select-doms
       (fn [{root ::root} selector & {:keys [^js/Node from default]}]
         (or
           (some-> (.querySelectorAll (or from root) (css-selector selector)) vec not-empty)
           default))

       ::select-dom
       (fn [{root ::root} selector & {:keys [^js/Node from default]}]
         (or
           (some-> (.querySelector (or from root) (css-selector selector)))
           default))

       ::host-parent-dom
       (fn [{^js/Node host ::host}]
         (.-parentElement host))
       
       ::host-root-dom
       (fn [{^js/Node host ::host}]
         (.getRootNode host)))

     (config/reg-components
       ::echo
       {:props #{:vdom}
        :view (fn [{:keys [vdom]}]
                vdom)}
       
       ::listen
       {:props #{:sel :evt :act}
        :view (fn [{:keys [sel evt] action :act :as props}]
                [:root>
                 ::style {:display "none"}
                 ::on {:connect (act
                                  [::listen
                                   (<<ctx ::host)
                                   (<< ::select-doms sel :from (<< ::host-root-dom) :default (<< ::host-parent-dom))
                                   evt action])
                       :update (act
                                 [::unlisten (<<ctx ::host)]
                                 [::listen
                                  (<<ctx ::host)
                                  (<< ::select-doms sel :from (<< ::host-root-dom) :default (<< ::host-parent-dom))
                                  evt action])
                       :disconnect (act [::unlisten (<<ctx ::host)])}])}
       
       ::bind
       {:props #{:sel :prop :ref}
        :view (fn [{:keys [sel prop ref]}]
                [:root>
                 ::style {:display "none"}
                 ::on {:connect (act
                                  [::bind
                                   (<<ctx ::host)
                                   (<< ::select-dom sel :from (<< ::host-root-dom) :default (<< ::host-parent-dom))
                                   prop ref])
                       :update (act
                                 [::unbind (<<ctx ::host)]
                                 [::bind
                                  (<<ctx ::host)
                                  (<< ::select-dom sel :from (<< ::host-root-dom) :default (<< ::host-parent-dom))
                                  prop ref])
                       :disconnect (act [::unbind (<<ctx ::host)])}])})
     
     (defn slotted-prop [& {:keys [selector slots]}]
       (let [slotted-selector (some-> selector css-selector)
             slot-selector (if slots (->> slots (map #(str "slot[name=\"" (name %) "\"]")) (str/join ",")) "slot")]
         {:state-factory
          (fn slotted-prop-state-factory [^js/HTMLElement dom]
            (let [shadow (.-shadowRoot dom)
                  !slotted (atom nil)
                  update-slotted! (fn update-slotted! []
                                    (let [now-slotted (set
                                                        (for [slot (array-seq (.querySelectorAll shadow slot-selector))
                                                              node (array-seq (.assignedNodes slot))
                                                              :when (or (nil? slotted-selector) (and (instance? js/HTMLElement node) (.matches node slotted-selector)))]
                                                          node))]
                                      (when (not= now-slotted @!slotted)
                                        (reset! !slotted now-slotted))))
                  abort-controller (js/AbortController.)]
              (update-slotted!)
     
              (.addEventListener shadow "slotchange" update-slotted! #js{:signal (.-signal abort-controller)})
              #_(.addEventListener shadow "render" update-slotted! #js{:signal (.-signal abort-controller)})
     
              (reify
                IDeref
                (-deref [_]
                  @!slotted)
     
                IWatchable
                (-add-watch [_ k f]
                  (-add-watch !slotted k f))
                (-remove-watch [_ k]
                  (-remove-watch !slotted k))
     
                IDisposable
                (dispose! [_]
                  (.abort abort-controller)))))
     
          :state-cleanup
          (fn slotted-prop-state-cleanup [state _]
            (dispose! state))}))))