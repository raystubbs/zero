# Zero Markup Syntax
Zero uses normal Clojure data structures to represent markup, similar to
[Hiccup](https://github.com/weavejester/hiccup) and
[Reagent](https://reagent-project.github.io/).

Most values will just be stringified and rendered as `TextNode`s; the exceptions
are seqs and vectors.

Seqs (including nil) will be flattened, and all children rendered inline in place
of the seq itself.  This means `nil` renders nothing.

Vectors usually get rendered as some kind of `HTMLElement`.  They should
begin with a keyword indicating the element tag.

```clojure
[:div "I am a DIV"]
```
```html
<div>I am a DIV</div>
```

Vectors can also include props (either a map or sequence of keyword-value pairs)
following the initial tag:

```clojure
[:div {:foo "something"} "I am a DIV"]
```
```clojure
[:div :foo "something" "I am a DIV"]
```
```html
<div foo="something">I am a DIV</div>
```

Props get rendered to the DOM like this: if the target element type has a matching
property name (the prop name converted to cammelCase) then that property will be
set to the prop value, otherwise the value will be stringified and set as an attribute
on the element, with the same name as the prop.

As a convenient short-hand, an ID and classes can be included in the node's tag.
```clojure
[:div#my-thing.foo.bar "I'm a DIV"]
```
```html
<div id="my-thing" class="foo bar">I'm a DIV</div>
```

And nodes with a single child can be given as a nesting:
```clojure
[[:div.foo :span.bar] :baz "something" "I'm a SPAN"]
```
```html
<div class="foo"><span class="bar" baz="something">I'm a SPAN</span></div>
```

## `:root>`
A vector with the special tag `:root>` may be given as the top-level node of a component's
markup.  This provides a node on which to attach props that apply to the component itself,
rather than one of its child elements.

## Special Props
Zero supports a set of props which have special meaning to the rendering
engine.  These are all namespaced with `z`, un-namespaced props are always treated
consistently as described above.

### `:z/on`
This prop allows event handlers to be declaratively attached to the target element.
- On the `:root>` node it attaches even handlers to the ShadowRoot, onto which the
  following lifecycle events are dispatched by Zero
    + `connect` - after the first render once a component has been connected to the document
    + `disconnect` - when the component is disconnected from the document
    + `render` - after every render
    + `update` - after every render except the first
```clojure
[:button
 :z/on {:click #(js/console.log "Clicked")}
 "Click Me"]
```

Either keywords or strings can be used for the event name, but they shouldn't be mixed.

### `:z/style`
This prop allows an inline style for the element to be given as a map.
- On the `:root>` node, it sets the default style for the component's host element
- It should not be used together with the `:style` prop
```clojure
[:button
 :z/style {:cursor "pointer" :color "black"}
 "I'm a BUTTON"]
```
```html
<button style="cursor: pointer; color: black;">I'm a BUTTON</div>
```

### `:z/class`
This prop allows the class list of an element to be set as a Clojure collection.
- It will be ignored on the `:root>` node
- It should not be used together with the `:class` prop
```clojure
[:button
 :z/class ["cursor-pointer" "text-black"]
 "I'm a BUTTON"]
```
```html
<button class="cursor-pointer text-black">I'm a BUTTON</div>
```

### `:z/css`
Only applies to the `:root>` node.  Allows a collection of URLs
and `CSSStyleSheet` instances to be set for the component.  These
stylesheets will be
[adopted](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets)
by the component's ShadowRoot.

### `:z/aria`
Not implemented yet.  Will only apply to the `:root>` node.  Will allow setting default
aria properties via ElementInternals.

### `:z/key`
This prop serves the same purpose of
[React's `key` props](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets).
It allows a node to be identified as rendering to the same element instance accross renders.

Due to Zero's simplified rendering algorithm, keys may not be needed as often in Zero
components as in React components.  Generally, unless you have a list of things that
will be re-ordered _and_ need to be rendered stably to consistent element instances;
keys are probably unnecessary.

### `:z/tag`
This prop serves a similar purpose to HTTP [ETags](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag).  It allows the renderer to explicitly indicate if a node has changed or not.  If found
on a node, Zero will only ever re-render that node when this prop changes.

This allows the component to help optimize rendering, since Zero won't need to do any comparisons
if the `:z/tag` indicates that nothing has changed.

In some cases tags can mess with hot reload workflows (e.g if CSS is auto-generated),
so they can be ignored in dev builds by setting the `zero.config/disable-tags?` Closure
define.  Here's a `shadow-cljs.edn` example:
```clojure
{...
 :builds
 {:my-build
  {...
   :dev {:closure-defines {zero.config/disable-tags? true}}}}}
```

### `:z/opaque?`
A true value for this prop tells Zero to _never_ mess with the contents (body) of the node it's attached to.
This allows  the contents to be rendered in some other way without Zero getting in the way.