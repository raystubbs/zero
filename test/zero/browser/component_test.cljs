(ns zero.browser.component-test
  (:require
   [zero.core :as z]
   [zero.dom :as dom]
   [zero.config :as zc]
   [zero.component]
   [zero.logger :as log]))

(defn do-steps [zero-element & step-fns]
  (if (empty? step-fns)
    nil
    (js/Promise.
      (fn [resolve reject] 
            (js/setTimeout
              (fn []
                (js/requestAnimationFrame
                  (fn []
                    (try
                      (-> ((first step-fns) zero-element)
                        js/Promise.resolve
                        (.then
                          (fn []
                            (resolve (apply do-steps zero-element (rest step-fns)))))
                        (.catch reject))
                      (catch :default ex
                        (reject ex)))))))))))

(defn step-test [create-element-fn & step-fns]
  (fn []
    (let [el (create-element-fn)]
      (js/document.body.append el)
      (.then (apply do-steps el step-fns)
        (fn [] (.remove el))))))

(defn create-element [name]
  (js/document.createElement (z/element-name name)))

(js/describe "Basic Component"
  (fn []
    (js/beforeEach
      (fn []
        (zc/reg-components
          ::something
          {:props #{:foo}
           :view (fn [{:keys [foo]}]
                   [:div foo])})))
    
    (js/it "renders"
      (step-test 
        #(create-element ::something)
        (fn [^js/HTMLElement el]
          (assert (= 1 (-> el .-shadowRoot .-childNodes .-length)))
          
          (let [first-el (-> el .-shadowRoot .-firstChild)]
            (assert (= "DIV" (.-nodeName first-el)))
            (assert (= "" (.-innerText first-el)))))))
    
    (js/it "reacts to property"
      (step-test
        #(create-element ::something)
        (fn [^js/HTMLElement el]
          (assert (= "" (-> el .-shadowRoot .-firstChild .-innerText)))
          (set! (.-foo el) "BAR"))
        (fn [^js/HTMLElement el]
          (assert (= "BAR" (-> el .-shadowRoot .-firstChild .-innerText))))))
    
    (js/it "reacts to attribute"
      (step-test
        #(create-element ::something)
        (fn [^js/HTMLElement el]
          (assert (= "" (-> el .-shadowRoot .-firstChild .-innerText)))
          (.setAttribute el "foo" "BAR"))
        (fn [^js/HTMLElement el]
          (assert (= "BAR" (-> el .-shadowRoot .-firstChild .-innerText))))))
    
    (js/it "reacts to binding"
      (let [!atom (atom "BAR")]
        (step-test
          #(create-element ::something)
          (fn [^js/HTMLElement el]
            (assert (= "" (-> el .-shadowRoot .-firstChild .-innerText)))
            (dom/bind ::my-binding el :foo !atom))
          (fn [^js/HTMLElement el]
            (assert (= "BAR" (-> el .-shadowRoot .-firstChild .-innerText)))
            (reset! !atom "BAZ"))
          (fn [^js/HTMLElement el]
            (assert (= "BAZ" (-> el .-shadowRoot .-firstChild .-innerText)))))))))

(js/describe "Echo Component"
  (let [!atom (atom "BAR")]
    (js/it "binds and unbinds"
      #(create-element ::dom/echo)
      (fn [^js/HTMLElement el]
        (set! (.-vdom el)
          [:root>
           [:div ::z/bind !atom]]))
      (fn [^js/HTMLElement el]
        (assert (= "BAR" (-> el .-shadowRoot .-firstChild .-innerText)))
        (reset! !atom "BAZ"))
      (fn [^js/HTMLElement el]
        (assert (= "BAZ" (-> el .-shadowRoot .-firstChild .-innerText)))
        (set! (.-vdom el)
          [:root>
           [:div "FOO"]]))
      (fn [^js/HTMLElement el]
        (assert (= "FOO" (-> el .-shadowRoot .-firstChild .-innerText)))
        (reset! !atom "ZZZ"))
      (fn [^js/HTMLElement el]
        (assert (= "FOO" (-> el .-shadowRoot .-firstChild .-innerText))))
      (fn [^js/HTMLElement el]
        (set! (.-vdom el) [:div]))
      (fn [_]
        (assert (empty? @@(resolve 'zero.impl.dom/!binds)))
        (assert (empty? @@(resolve 'zero.impl.dom/!bound-props))))))
  
  (js/it "listens for events"
    (let [!invoked? (atom false)]
      (step-test
        #(create-element ::dom/echo)
        (fn [^js/HTMLElement el]
          (set! (.-vdom el)
            [:root>
             [:button
              ::z/on {:click #(reset! !invoked? true)}]]))
        (fn [^js/HTMLElement el] 
          (-> el .-shadowRoot .-firstChild .click))
        (fn [_]
          (assert (= true @!invoked?)))
        (fn [^js/HTMLElement el]
          (set! (.-vdom el) [:div]))
        (fn [_]
          (assert (empty? @@(resolve 'zero.impl.dom/!listener-aborters)))))))
  
  (js/it "listens for signals and receives correct context"
    (let [!signal-context (atom nil)
          my-signal (z/sig ::my-signal)]
      (step-test
        #(create-element ::dom/echo)
        (fn [^js/HTMLElement el]
          (set! (.-vdom el)
            [:root>
             [:button
              ::z/on {my-signal #(reset! !signal-context %)}]]))
        (fn [_]
          (my-signal))
        (fn [^js/HTMLElement el]
          (assert (= el (::z/host @!signal-context)))
          (assert (= (.-shadowRoot el) (::z/root @!signal-context)))
          (assert (= (-> el .-shadowRoot .-firstChild) (::z/current @!signal-context))))
        (fn [^js/HTMLElement el]
          (set! (.-vdom el) [:div]))
        (fn [_]
          (assert (empty? @@(resolve 'zero.impl.signals/!listeners))))))))