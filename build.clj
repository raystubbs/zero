(ns build
  (:require
   [clojure.tools.build.api :as b]
   [clojure.edn :as edn]
   [clojure.string :as str]))

(def basis (delay (b/create-basis {:project "deps.edn"})))

(defn clean [_]
  (b/delete {:path "target"}))

(defn- bump [n]
  (let [meta (-> (slurp "meta.edn")
               edn/read-string
               (update-in [:version n] inc))
        version-str (str/join "." (:version meta))]
    (b/git-process {:git-args "stash"})
    (spit "meta.edn" (pr-str meta))
    (b/git-process {:git-args (str "commit -a -m v" version-str)})
    (b/git-process {:git-args (str "tag -a v" version-str " -m v" version-str)})
    (b/git-process {:git-args (str "push origin v" version-str)})))

(defn bump-patch [_]
  (bump 2))

(defn bump-minor [_]
  (bump 1))

(defn bump-major [_]
  (bump 0))

(defn jar [_]
  (let [{:keys [version name]} (edn/read-string (slurp "meta.edn"))
        version-str (str/join "." version)
        class-dir "target/classes"]
    (b/write-pom
      {:class-dir class-dir
       :lib name
       :version version-str
       :basis @basis
       :src-dirs ["src"]})
    (b/copy-dir
      {:src-dirs ["src"]
       :target-dir class-dir})
    (b/jar
      {:class-dir class-dir
       :jar-file (format "target/%s-%s.jar" (clojure.core/name name) version-str)})))