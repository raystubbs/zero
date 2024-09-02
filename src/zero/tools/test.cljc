(ns zero.tools.test
  (:require
   #?@(:cljs
       [["node:fs" :as fs]
        ["node:path" :as path]
        [cljs.pprint :refer [pprint]]
        [cljs.test :refer [is]]]

       :clj
       [[clojure.java.io :as io]
        [clojure.pprint :refer [pprint]]
        [clojure.test :refer [is]]])))

(defn- slurp'
  [x]
  #?(:cljs
     (when (fs/existsSync x)
       (-> (fs/readFileSync x) .toString))

     :clj
     (when (.exists (io/as-file x))
       (slurp x))))

(defn- spit'
  [x s]
  #?(:cljs
     (do
       (fs/mkdirSync (path/dirname x) #js{:recursive true})
       (fs/writeFileSync x s))

     :clj
     (do
       (io/make-parents x)
       (spit x s))))

(defn snap
  [k data]
  (let [common-path (str (munge (namespace k)) "/" (munge (name k)) ".edn")
        accepted-snapshot-path (str "test/snapshots/accepted/" common-path)
        current-snapshot-path (str "test/snapshots/current/" common-path)
        current-snapshot (with-out-str (pprint data))
        accepted-snapshot (slurp' accepted-snapshot-path)]
    (spit' current-snapshot-path current-snapshot)
    (if (some? accepted-snapshot)
      (is (= current-snapshot accepted-snapshot))
      (spit' accepted-snapshot-path current-snapshot))
    nil))


