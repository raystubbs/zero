
[![Clojars Project](https://img.shields.io/clojars/v/me.raystubbs/zero.svg)](https://clojars.org/me.raystubbs/zero)
![Test Badge](https://github.com/raystubbs/zero/actions/workflows/ci.yml/badge.svg)
[![cljdoc badge](https://cljdoc.org/badge/me.raystubbs/zero)](https://cljdoc.org/d/me.raystubbs/zero)

# Zero
Build web UIs in Clojure/Script, the easy way.

## Why?
- Zero components are [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), which means
  they're easy to use from anywhere, including:
  - Raw HTML
  - JavaScript DOM API
  - Any frontend framework
    
  Besides their reusability, Web Components have many useful features that are lacking from traditional React-style
  components, for example:
  - [Slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) are great for boosting reconciliation performance
  - Stylesheet encapsulation means components can include their own stylesheets, without affecting anything else on the page
  - An enclosing DOM node to which custom styling and event handlers can be attached
- Components can be (partially or fully) rendered to raw HTML.
  - Component markup is rendered into a [declarative shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM#declaratively_with_html).
  - Structured data can be rendered to element attributes in a built-in format designed for that purpose.
- A robust data-oriented state management system makes building complex components a breeze.
  - Component view functions can be pure, and generate pure data; easy to test and reason about
  - State management constructs are themselves data, they can be serialized/deserialized, compared semantically, etc.

## Example
```clojure
(ns zero.demos.bullet-list "
A simple bullet list.
"
  (:require
   [zero.core :refer [<<ctx << act css] :as z]
   [zero.dom :as zd]
   [zero.config :as zc]))

(def ^:private style
  (css "
  .option {
    font-size: 1rem;
    display: flex;
    align-items: center;
    text-align: left;
    padding: 0 0.5rem;
    border: none;
    background: none;
    margin: 0.5rem 0;
  }

  .option:hover .bullet {
    background-color: #e5e5e5;
  }

  .bullet {
    border-radius: 1000px;
    width: 1rem;
    height: 1rem;
    border: 1px solid #d4d4d4;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
  }

  .bullet.selected {
    border: 1px solid #3182ce;
    background-color: transparent;
  }

  .bullet .iris {
    border-radius: 1000px;
    background-color: #3182ce;
  }
"))

(defn view [{:keys [options value]}]
  [:root>
   :#css css
   :#style {:display "block"}
   (map
     (fn [option]
       [:button.option
        :#on {:click (act [::zd/dispatch :value (:value option)])}
        [:div.bullet
         ::z/class (when (= (:value option) value) :selected)
         (when (= (:value option) value)
           [:div.iris
            :#style {:height "0.75rem" :width "0.75rem"}])]
        (:view option)])
     options)])

(zc/reg-components
  :bullet-list
  {:props #{:options :value}
   :view view})
```
![chrome_ZrUnG34Vyj](https://github.com/user-attachments/assets/bf772625-fc8d-4323-9493-bb7518d412c7)

## Setup
Add something akin to the following somewhere in your boot up logic:
```clojure
(zero.config/install! zero.config/!default-db)

;; only for browsers, sets up the web component registry
(zero.wcconfig/install! zero.config/!default-db)

;; only for browsers, and optional, adds some DOM utilities and convenient components
(zero.dom/install! zero.config/!default-db)
```

Register components with `zero.config/reg-components`.

On the browser side, registered components will be added to the browser's web
component registry.  So any time the browser attaches a matching DOM element to the page,
your registered component will be used.

When rendering to HTML, component views are rendered into
[declarative shadow DOMs](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).
Attributes for registered Zero components are serialized as [CDF (Concise Data Format)](./doc/CDF.md), which
allows seamless transfer of structured data to browser-side implementations of the component; which will
take control of the original HTML rendered DOM.

## Learning
Here are a few resources to help learn the basics:
- [State Management](./doc/StateManagement.md)
- [SubZero Markup Syntax](https://github.com/raystubbs/subzero?tab=readme-ov-file#markup)
- [Building Components](./doc/BuildingComponents.md)
- [Concise Data Format](./doc/ConciseDataFormat.md)

And some (only one for now) examples:
- [TodoMVC](./examples/todo)

You can also browse [c0](https://github.com/raystubbs/c0) (a library of Zero components)
for examples.

## Contact
Feel free to reach out in the [#zero-lib](https://clojurians.slack.com/archives/C06UFMY5LUW)
channel on the Clojurians slack for any help, questions, feedback, etc.
