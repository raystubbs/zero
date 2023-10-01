(ns zero.impl.injection
  (:require
   [clojure.walk :refer [prewalk]]
   [cljs.core.async :refer [go promise-chan put! alts! <!]]))

(defn << [injector & args]
  `(<< ~injector ~@args))

(defmulti inject identity)

(defn with-injections [coll ctx {:keys [timeout] :or {timeout 60000}}]
  (let [!injection->memo (atom {})
        !memo->value (atom {})
        
        ;; Walk the effects tree looking for injection
        ;; points, for each unique injection found
        ;; dispatch an async job to evaluate it,
        ;; and replace it with a memo so we don't walk
        ;; the injection list itself.
        w-memos
        (prewalk
         (fn [v]
           (if-not (and (seq? v) (= `<< (first v)))
             v
             (or
              (get @!injection->memo v)
              (let [memo (gensym "zMemo")]
                (swap! !injection->memo assoc v memo)
                (let [promise (promise-chan)]
                  (go
                    (try
                      (inject (nth v 1) #(put! promise (if (some? %) % ::nil)) (nthrest v 2) ctx)
                      (catch :default e
                        (js/console.error
                         "Injection error"
                         (prn {:injection v :value coll})
                         e)
                        (put! promise ::error))))
                  (swap! !memo->value assoc memo promise))
                memo))))
         coll)]
    (go
      ;; Now wait for all the injections to finish,
      ;; or timeout if it takes too long.  Once everything
      ;; is done then go through again and replace the
      ;; memos with injected values.
      (let [!timeout (cljs.core.async/timeout timeout)]
        (loop [[memo+promise & others] @!memo->value]
          (cond
            (nil? memo+promise)
            (prewalk
             (fn [x]
               (if (and (symbol? x) (contains? @!memo->value x))
                 (get @!memo->value x)
                 x))
             w-memos)
            
            :else
            (let [[memo !promise] memo+promise
                  [value port] (alts! [!promise !timeout])
                  actual-value (if (= value ::nil) nil value)]
              (cond
                (= port !timeout)
                (do
                  (js/console.error
                   "Injection timout"
                   {:value coll})
                  ::error)
                
                (= ::error actual-value)
                ::error
                
                :else
                (do
                  (swap! !memo->value assoc memo actual-value)
                  (recur others))))))))))

(comment
  (defmethod inject ::echo [_ rx [arg]]
    (rx arg))
  
  (go
    (js/console.log
     (<! (with-injections
           [[(<< ::echo "Hello")]]
           {} {})))))