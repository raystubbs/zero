(ns zero.config)

;; should :z/tag props be ignored?  useful for dev in
;; some cases (e.g generated css with shadow-css or similar)
(goog-define disable-tags? false)

(defmulti harvest-event (fn [^js/Event event] (keyword (.-type event))))

(defmethod harvest-event :default [^js/Event event]
  (case (.-type event)
    ("keyup" "keydown" "keypress")
    {:key (.-key event)
     :code (.-code event)
     :mods (cond-> #{}
             (.-altKey event) (conj :alt)
             (.-shiftKey event) (conj :shift)
             (.-ctrlKey event) (conj :ctrl)
             (.-metaKey event) (conj :meta))}

    ("input" "change")
    (let [target (.-target event)]
      (when (instance? js/HTMLInputElement target)
        (case (.-type target)
          "checkbox"
          (.-checked target)
          
          "file"
          (-> target .-files array-seq vec)
          
          (.-value target))))

    ("drop")
    (->> event .-dataTransfer .-items array-seq
      (mapv #(if (= "file" (.-kind %)) (.getAsFile %) (js/Blob. [(.getAsString %)] #js{:type (.-type %)}))))

    ;; TODO: others
    
    (or
      (.-detail event)
      ;; TODO: others
      )))
