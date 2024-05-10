(ns zero.cljc.next.rstore
  (:require
   [zero.next.rstore :as rstore]
   #?(:clj [clojure.test :refer [deftest is]]
      :cljs [cljs.test :refer-macros [deftest is]])
   [clojure.string :as str]))

(deftest assoc-op-test
  (let [!rstore (rstore/rstore {:foo "foo" :bar "bar"})
        !affected-paths (atom nil)]
    (rstore/watch-path !rstore ::my-key []
      (fn [_ _ _ _ affected-paths]
        (reset! !affected-paths affected-paths)))
    (rstore/patch! !rstore
      {:path []
       :change [:assoc :bar "BAR" :baz "baz"]})
    (is (= @!affected-paths #{[:bar] [] [:baz]}))
    (is (= @!rstore {:foo "foo" :bar "BAR" :baz "baz"}))))

(deftest clear-op-test
  (let [!rstore (rstore/rstore {:foo "foo" :bar "bar" :v [1 2 3]})
        !affected-paths (atom nil)]
    (rstore/watch-path !rstore ::my-key []
      (fn [_ _ _ _ affected-paths]
        (reset! !affected-paths affected-paths)))
    (rstore/patch! !rstore
      [{:path []
        :change [:clear :foo]}
       {:path [:v]
        :change [:clear 1]}])
    (is (= @!affected-paths #{[:v 1] [:v] [:foo] []}))
    (is (= @!rstore {:bar "bar" :v [1 3]}))))

(deftest patch-op-test
  (let [!rstore (rstore/rstore {:foo "foo" :bar {:baz "baz"}})
        !affected-paths (atom nil)]
    (rstore/watch-path !rstore ::my-key []
      (fn [_ _ _ _ affected-paths]
        (reset! !affected-paths affected-paths)))
    (rstore/patch! !rstore
      {:path []
       :change [:patch
                {:path [:bar]
                 :change [:assoc :baz "BAZ"]}]})
    (is (= @!affected-paths #{[:bar :baz] [:bar] []}))
    (is (= @!rstore {:foo "foo" :bar {:baz "BAZ"}}))))

(deftest conj-op-test
  (let [!rstore (rstore/rstore {:v []})
        !affected-paths (atom nil)]
    (rstore/watch-path !rstore ::my-key []
      (fn [_ _ _ _ affected-paths]
        (reset! !affected-paths affected-paths)))
    (rstore/patch! !rstore
      {:path [:v]
       :change [:conj :my-val]})
    (is (= @!affected-paths #{[:v 0] [:v] []}))
    (is (= @!rstore {:v [:my-val]}))))


(deftest into-op-test
  (let [!rstore (rstore/rstore {:v [1 2] :m {:x "x"}})
        !affected-paths (atom nil)]
    (rstore/watch-path !rstore ::my-key []
      (fn [_ _ _ _ affected-paths]
        (reset! !affected-paths affected-paths)))
    (rstore/patch! !rstore
      [{:path [:v]
        :change [:into [3 4]]}
       {:path [:m]
        :change [:into [[:y "y"]]]}])
    (is (= @!affected-paths #{[:v 2] [:v 3] [:v] [:m :y] [:m] []}))
    (is (= @!rstore {:v [1 2 3 4] :m {:x "x" :y "y"}}))))

(deftest call-op-test
  (let [!rstore (rstore/rstore {:foo "foo"})
        !affected-paths (atom nil)]
    (rstore/watch-path !rstore ::my-key []
      (fn [_ _ _ _ affected-paths]
        (reset! !affected-paths affected-paths)))
    (rstore/patch! !rstore
      {:path [:foo]
       :change [:call str/upper-case]})
    (is (= @!affected-paths #{[:foo] []}))
    (is (= @!rstore {:foo "FOO"}))))