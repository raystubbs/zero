(ns ^:no-doc zero.impl.bindings
  (:require
   [zero.config :as zc]
   [zero.impl.injection :refer [apply-injections]]
   [zero.impl.base :refer [try-catch schedule cancel-scheduled]] 
   [zero.core :as-alias z]
   [subzero.core :as-alias sz]
   [subzero.logger :as log]
   [subzero.rstore :as rstore]
   #?(:cljs [subzero.plugins.web-components :refer [IBindValue]]))
  #?(:clj
     (:import
      [clojure.lang IDeref IRef IFn])))

(defrecord Binding [props key args])

(defn flush!
  [!db]
  (let [flush-id (gensym)
        
        flush-pending
        (fn flush-pending
          [stream-states]
          (update-vals stream-states
            (fn [{:keys [current pending] :or {pending ::none} :as state}]
              (cond-> state
                true
                (dissoc :pending)
                
                (and (not= ::none pending) (not= current pending))
                (assoc :current pending :flush-id flush-id)))))
        
        [old-db new-db]
        (rstore/patch! !db
          [{:path [::z/state ::stream-states]
            :change [:call flush-pending]}
           {:path [::z/state]
            :change [:clear ::flush-streams-timeout]}])]
    (when-let [timeout (get-in old-db [::z/state ::flush-streams-timeout])]
      (cancel-scheduled timeout))
    
    (doseq [[stream-ident new-state] (get-in new-db [::z/state ::stream-states])
            :when (= (:flush-id new-state) flush-id)
            :let [old-state (get-in old-db [::z/state ::stream-states stream-ident])]
            [[^Binding bnd k] watch-fn] (:watches new-state)]
      (try-catch
        (fn []
          (let [default-value (:default (.-props bnd))
                default-nil? (:default-nil? (.-props bnd))
                old-current (get old-state :current default-value)
                new-current (get new-state :current default-value)]
            (watch-fn k bnd
              (if (and (nil? old-current) default-nil?) default-value old-current)
              (if (and (nil? new-current) default-nil?) default-value new-current))))
        (fn [ex]
          (log/error "Error in stream watcher fn"
            :data {:stream stream-ident}
            :ex ex)))))
  nil)

(defn- schedule-flush!
  [!db]
  (locking !db
    (when (nil? (get-in @!db [::z/state ::flush-streams-timeout]))
      (rstore/patch! !db
        {:path [::z/state ::flush-streams-timeout]
         :change [:value (schedule 5 flush! !db)]})))
  nil)

(defn- rx-fn
  [!db stream-ident]
  (fn rx
    [new-val]
    (rstore/patch! !db
      {:path [::z/state ::stream-states stream-ident :pending]
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
              (when-not (= @!tmp-pending ::none)
                (locking !tmp-pending
                  (rstore/patch! !db
                    {:path [::z/state ::stream-states stream-ident :pending]
                     :change [:value @!tmp-pending]})
                  (reset! !rx-fn (rx-fn !db stream-ident)))
                (schedule-flush! !db)))))))
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
       (-deref (get-ref zc/!default-db bnd)))

     IWatchable
     (-add-watch
       [bnd k f]
       (-add-watch (get-ref zc/!default-db bnd) k f))
     (-remove-watch
       [bnd k]
       (-remove-watch (get-ref zc/!default-db bnd) k))

     IFn
     (-invoke
       ([bnd !db]
        (get-ref !db bnd)))

     IBindValue
     (get-bind-watchable
       [bnd !db]
       (get-ref !db bnd)))

   :clj
   (extend-type Binding
     IDeref
     (deref
       [bnd]
       (.deref ^IDeref (get-ref zc/!default-db bnd)))

     IRef
     (addWatch
       [bnd k f]
       (.addWatch ^IRef (get-ref zc/!default-db bnd) k f))
     (removeWatch
       [bnd k]
       (.removeWatch ^IRef (get-ref zc/!default-db bnd) k))
     (getWatches [_] (throw (UnsupportedOperationException.)))
     (getValidator [_] (throw (UnsupportedOperationException.)))
     (setValidator [_ _] (throw (UnsupportedOperationException.)))

     IFn
     (invoke
       [bnd !db]
       (get-ref !db bnd))))