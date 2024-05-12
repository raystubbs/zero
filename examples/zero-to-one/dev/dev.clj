(ns dev
  (:require [nrepl.server :refer [start-server stop-server]]
            [shadow.cljs.devtools.server :as shadow-server]
            [shadow.cljs.devtools.api :as shadow]
            [zero-to-one.server :as server]))

(defn start-shadow!
  []
  (shadow-server/start!)
  (shadow/watch :app)
  (shadow/watch :test))

(def ^:private nrepl-server
  (atom nil))

(defn stop-nrepl!
  []
  (when @nrepl-server
    (stop-server @nrepl-server)
    (reset! nrepl-server nil)))

(defn start-nrepl!
  []
  (stop-nrepl!)
  (reset! nrepl-server (start-server)))

(defn go!
  ([])
  ([{:keys [port] :or {port 8000}}]
   (stop-nrepl!)
   (start-nrepl!)
   (start-shadow!)
   (server/run-server {:port port})))
