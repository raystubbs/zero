(ns zero.core-test
  (:require
   [zero.core :refer [<< <<act <<ctx <<<] :as z]
   #?(:clj [clojure.test :refer [deftest is use-fixtures]]
      :cljs [cljs.test :refer-macros [deftest is]])))

(deftest injector-construction
  (let [inj (<< ::k1 ::arg1 ::arg2 << ::k2 ::arg3)
        {:keys [args key]} (z/inj->map inj)]
    (is (= ::k1 key))
    (is (= (list ::arg1 ::arg2) (take 2 args)))
    (is (z/inj? (last args)))

    (let [{inner-args :args inner-key :key} (z/inj->map (last args))]
      (is (= ::k2 inner-key))
      (is (= (list ::arg3) inner-args))))
  (let [inj (<< ::k1 <<ctx ::k2 <<act ::k3 <<< ::k4)
        {:keys [args key]} (z/inj->map inj)]
    (is (= ::k1 key))
    (is (z/inj? (last args)))

    (let [{inner-args :args inner-key :key} (z/inj->map (last args))]
      (is (= ::z/ctx inner-key))
      (is (z/inj? (last inner-args)))

      (let [{inner-args-2 :args inner-key-2 :key} (z/inj->map (last inner-args))]
        (is (= ::z/act inner-key-2))
        (is (z/inj? (last inner-args-2)))

        (let [{inner-args-3 :args inner-key-3 :key} (z/inj->map (last inner-args-2))]
          (is (= ::z/<< inner-key-3))
          (is (= ::k4 (last inner-args-3))))))))

