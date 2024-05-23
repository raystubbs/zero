(ns ^:no-doc zero.impl.bindings
  (:require
   [zero.impl.injection :refer [apply-injections]]
   [zero.impl.base :refer [try-catch schedule cancel-scheduled]]
   [zero.impl.default-db :refer [!default-db]]
   [zero.core :as-alias z]
   [subzero.core :as-alias sz]
   [subzero.logger :as log]
   [subzero.rstore :as rstore]
   #?(:cljs [subzero.plugins.web-components :refer [IBindValue]]))
  #?(:clj
     (:import
      [clojure.lang IDeref IRef IFn])))

(declare ^:private get-ref)

(defrecord Binding [props key args]
  #?@(:clj
      [IDeref
       (deref
         [bnd]
         (.deref ^IDeref (get-ref !default-db bnd)))

       IRef
       (addWatch
         [bnd k f]
         (.addWatch ^IRef (get-ref !default-db bnd) k f))
       (removeWatch
         [bnd k]
         (.removeWatch ^IRef (get-ref !default-db bnd) k))
       (getWatches [_] (throw (UnsupportedOperationException.)))
       (getValidator [_] (throw (UnsupportedOperationException.)))
       (setValidator [_ _] (throw (UnsupportedOperationException.)))

       IFn
       (invoke
         [bnd !db]
         (get-ref !db bnd))]))

(defn flush!
  [!db]
  (let [[old-db _]
        (rstore/patch! !db
          {:path [::z/state ::pending-stream-values]
           :change [:value {}]})

        pending-values (get-in old-db [::z/state ::pending-stream-values])]
    (when (seq pending-values)
      (doseq [[stream-ident new-value] pending-values
              :let [[old-db _ :as patch-r]
                    (rstore/patch! !db
                      {:path [::z/state ::stream-states stream-ident :current]
                       :change [:value new-value]}
                      :when (fn [db]
                              (and
                                (= ::none (get-in db [::z/state ::pending-stream-values stream-ident] ::none))
                                (get-in db [::z/state ::stream-states stream-ident]))))]
              :when (some? patch-r)
              :let [{old-value :current watches :watches} (get-in old-db [::z/state ::stream-states stream-ident])]
              [[^Binding bnd k] watch-fn] watches
              :when (not= old-value new-value)]
        (try-catch
          (fn []
            (let [default-value (:default (.-props bnd))
                  default-nil? (:default-nil? (.-props bnd))]
              (watch-fn k bnd
                (if (and (nil? old-value) default-nil?) default-value old-value)
                (if (and (nil? new-value) default-nil?) default-value new-value))))
          (fn [ex]
            (log/error "Error in stream watcher fn"
              :data {:stream stream-ident}
              :ex ex))))
      (recur !db))))

(defn- schedule-flush!
  [!db]
  (locking !db
    (when (nil? (get-in @!db [::z/state ::flush-streams-timeout]))
      (rstore/patch! !db
        {:path [::z/state ::flush-streams-timeout]
         :change [:value (schedule 5
                           (fn []
                             (let [[old-db _]
                                   (rstore/patch! !db
                                     {:path [::z/state]
                                      :change [:clear ::flush-streams-timeout]})]
                               (when (get-in old-db [::z/state ::flush-streams-timeout])
                                 (flush! !db)))))]})))
  nil)

(defn- rx-fn
  [!db stream-ident]
  (fn rx
    [new-val]
    (rstore/patch! !db
      {:path [::z/state ::pending-stream-values stream-ident]
       :change [:value new-val]})
    (schedule-flush! !db)))

(defn- kill-stream!
  [!db [key args :as stream-ident]]
  (let [[old-db _] (rstore/patch! !db
                     {:path [::z/state ::stream-states]
                      :change [:clear stream-ident]})]
    (when-let [kill-fn (get-in old-db [::z/state ::stream-states stream-ident :kill-fn])]
      (try-catch
        kill-fn
        (fn [ex]
          (log/error "Error killing stream"
            :data {:key key :args args}
            :ex ex))))
    (rstore/unwatch !db [::stream stream-ident]))
  nil)

(defn- boot-stream!
  [!db [stream-key args :as stream-ident]]
  (try-catch
    (fn []
      (let [handler-path [::z/state ::stream-handlers stream-key]
            stream-fn (or (get-in @!db handler-path)
                        (throw
                          (ex-info "No stream registered for key"
                            {:stream-key stream-key})))
            kill-fn (apply stream-fn
                      (rx-fn !db stream-ident)
                      (apply-injections !db {::sz/db !db} args))]
        (rstore/patch! !db
          {:path [::z/state ::stream-states stream-ident :kill-fn]
           :change [:value kill-fn]})
        (rstore/watch !db [::stream stream-ident] handler-path
          (fn [_ new-stream-fn _]
            (let [!tmp-pending (atom ::none)
                  !rx-fn (atom #(reset! !tmp-pending %))
                  new-kill-fn (apply new-stream-fn
                                #(@!rx-fn %)
                                (apply-injections !db {::sz/db !db} args))
                  [old-db _] (rstore/patch! !db
                               [{:path [::z/state ::stream-states stream-ident :kill-fn]
                                 :change [:value new-kill-fn]}])]
              (when-let [old-kill-fn (get-in old-db [::z/state ::stream-states stream-ident :kill-fn])]
                (old-kill-fn))

              (locking !rx-fn
                (when-not (= @!tmp-pending ::none)
                  (rstore/patch! !db
                    {:path [::z/state ::pending-stream-values stream-ident]
                     :change [:value @!tmp-pending]})
                  (schedule-flush! !db))
                (reset! !rx-fn (rx-fn !db stream-ident))))))))
    (fn [ex]
      (log/error "Error booting stream"
        :data {:key key :args args}
        :ex ex)
      (rstore/patch! !db
        {:path [::z/state ::stream-states]
         :change [:clear stream-ident]})))
  nil)

(defn- get-ref
  [!db ^Binding bnd]
  (let [stream-ident [(.-key bnd) (.-args bnd)]
        props (.-props bnd)
        
        deref-fn
        (fn deref-fn
          []
          (let [v (get-in @!db [::z/state ::stream-states stream-ident :current] (:default props))]
            (if (and (nil? v) (:default-nil? props))
              (:default props)
              v)))
        
        add-watch-fn
        (fn add-watch-fn
          [k f]
          (let [[old-db _new-db]
                (rstore/patch! !db
                  {:path [::z/state ::stream-states stream-ident :watches [bnd k]]
                   :change [:value f]})]
            (when (empty? (get-in old-db [::z/state :stream-states stream-ident :watches]))
              (boot-stream! !db stream-ident)))
          nil)
        
        remove-watch-fn
        (fn remove-watch-fn
          [k]
          (let [[old-db new-db]
                (rstore/patch! !db
                  {:path [::z/state ::stream-states stream-ident :watches]
                   :change [:clear [bnd k]]})]
            (when
              (and
                (empty? (get-in new-db [::z/state :stream-states stream-ident :watches]))
                (seq (get-in old-db [::z/state :stream-states stream-ident :watches])))
              (kill-stream! !db stream-ident)))
          nil)]
    #?(:cljs
       (reify 
         IDeref
         (-deref [_] (deref-fn))
         
         IWatchable
         (-add-watch [_ k f] (add-watch-fn k f))
         (-remove-watch [_ k] (remove-watch-fn k)))
       
       :clj
       (reify
         clojure.lang.IDeref
         (deref [_] (deref-fn))
         
         clojure.lang.IRef
         (addWatch [_ k f] (add-watch-fn k f))
         (removeWatch [_ k] (remove-watch-fn k))
         (getWatches [_] (throw (UnsupportedOperationException.)))
         (getValidator [_] (throw (UnsupportedOperationException.)))
         (setValidator [_ _] (throw (UnsupportedOperationException.)))))))


#?(:cljs
   (extend-type Binding
     IDeref
     (-deref
       [bnd]
       (-deref (get-ref !default-db bnd)))

     IWatchable
     (-add-watch
       [bnd k f]
       (-add-watch (get-ref !default-db bnd) k f))
     (-remove-watch
       [bnd k]
       (-remove-watch (get-ref !default-db bnd) k))

     IFn
     (-invoke
       ([bnd !db]
        (get-ref !db bnd)))

     IBindValue
     (get-bind-watchable
       [bnd !db]
       (get-ref !db bnd))))