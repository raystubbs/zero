(ns zero.extras.cdf
  (:require
   [clojure.string :as str]
   [zero.core :as z]
   [zero.impl.base :refer [str-writer str-writer->str write]])
  #?(:clj (:import[java.util ArrayList])))

#?(:clj (defn- mut-list [] (ArrayList.))
   :cljs (defn- mut-list [] #js[]))

#?(:clj (defn- append! [^ArrayList l v] (.add l v))
   :cljs (defn- append! [l v] (.push l v)))

#?(:clj (defn- char-code [c] (long c))
   :cljs (defn- char-code [c] (.charCodeAt c 0)))

(def ^:private CTRL-CHAR-RANGE-START 0x00)
(def ^:private CTRL-CHAR-RANGE-END 0x0f)

(defn graphical-char? [c]
  ;; TODO: improve
  (let [x (char-code c)]
    (and
      (not (<= CTRL-CHAR-RANGE-START x CTRL-CHAR-RANGE-END))
      (not= 0x7F x))))

(defn parse-number [s start-index _opts]
  (let [w (str-writer)]
    (loop [i start-index
           stage :integer]
      (if (= i (count s))
        (case (nth s (dec i))
          (\0 \1 \2 \3 \4 \5 \6 \7 \8 \9)
          [(parse-double (str-writer->str w)) i]

          (throw (ex-info "incomplete number" {:idx i})))
        (let [c (nth s i)]
          (case c
            (\+ \-)
            (if (or (= i start-index) (= (nth s (dec i)) "e"))
              (do
                (write w c)
                (recur (inc i) stage))
              (throw (ex-info "unexpected character" {:idx i :char c})))

            (\0 \1 \2 \3 \4 \5 \6 \7 \8 \9)
            (do
              (write w c)
              (recur (inc i) stage))

            \.
            (case stage
              :integer
              (case (nth s (dec i))
                (\+ \-)
                (throw (ex-info "expected digit" {:idx i :char (nth s (dec i))}))

                (do
                  (write w c)
                  (recur (inc i) stage)))

              :decimal
              (throw (ex-info "multiple decimal points in number" {:idx i :char c}))

              :exponent
              (throw (ex-info "found decimal point in exponent, exponent must be integer" {:idx i :char c})))

            \e
            (case
              :exponent
              (throw (ex-info "found extra 'e' in number" {:idx i :char c})))

            (\space \newline \return \tab \[ \] \{ \} \( \) \`)
            (case (nth s (dec i))
              (\0 \1 \2 \3 \4 \5 \6 \7 \8 \9)
              [(parse-double (str-writer->str w)) i]

              (throw (ex-info "incomplete number" {:idx i})))

            (throw (ex-info "unexpected character" {:idx i :char c}))))))))

(defn parse-keyword [s start-index _opts]
  (let [w (str-writer)]
    (loop [i (inc start-index)]
      (if (= i (count s))
        (if (= (dec i) start-index)
          (throw (ex-info "incomplete keyword" {:idx i}))
          [(keyword (str-writer->str w)) i])
        (let [c (nth s i)]
          (case c
            (\space \newline \return \tab \[ \] \{ \} \( \) \`)
            (if (= (dec i) start-index)
              (throw (ex-info "incomplete keyword" {:idx i}))
              [(keyword (str-writer->str w)) i])

            (do
              (write w c)
              (recur (inc i)))))))))

(defn count-quotes [s start-index]
  (loop [i start-index]
    (if (or (= i (count s)) (not= (nth s i) \`))
      (- i start-index)
      (recur (inc i)))))

(defn parse-string [s start-index _opts]
  (let [opening-qcount (count-quotes s start-index)
        content-start-index (+ start-index opening-qcount)

        w (str-writer)]
    (loop [i content-start-index]
      (if (= i (count s))
        (throw (ex-info "unterminated string" {:idx i}))
        (let [c (nth s i)]
          (if (and (= c \`) (<= opening-qcount (count-quotes s i)))
            [(str-writer->str w) (+ i opening-qcount)]
            (do
              (write w c)
              (recur (inc i)))))))))

(defn parse-ident [s start-index _opts]
  (let [w (str-writer)]
    (loop [i start-index]
      (if (= i (count s))
        [(str-writer->str w) i]
        (let [c (nth s i)]
          (case c
            (\space \newline \return \tab \[ \] \{ \} \( \) \`)
            [(str-writer->str w) i]

            (if (graphical-char? c)
              (do
                (write w c)
                (recur (inc i)))
              (throw (ex-info "unexpected character" {:idx i})))))))))

(declare parse-op parse-seq parse-map)

(defn parse-body [s start-index terminator-char opts]
  (let [items (mut-list)]
    (loop [i start-index]
      (if (= i (count s))
        (throw (ex-info "unterminated form" {:idx i}))
        (let [c (nth s i)]
          (if (= c terminator-char)
            [(vec items) (inc i)]
            (case c
              (\space \newline \return \tab)
              (recur (inc i))

              (let [[v end-index]
                    (case c
                      (\+ \- \0 \1 \2 \3 \4 \5 \6 \7 \8 \9)
                      (parse-number s i opts)

                      \:
                      (parse-keyword s i opts)

                      \`
                      (parse-string s i opts)

                      \(
                      (parse-op s i opts)

                      \[
                      (parse-seq s i opts)

                      \{
                      (parse-map s i opts)

                      (if (graphical-char? c)
                        (let [[ident end-index] (parse-ident s i opts)]
                          (case ident
                            "E" ["" end-index]
                            "T" [true end-index]
                            "F" [false end-index]
                            "_" [nil end-index]
                            "NaN" [##NaN end-index]
                            "Inf+" [##Inf end-index]
                            "Inf-" [##-Inf end-index]
                            (throw (ex-info "unknown identifier" {:idx i :ident (symbol ident)}))))
                        (throw (ex-info "unexpected character" {:idx i}))))]
                (append! items v)
                (recur end-index)))))))))

(defn parse-op [s start-index opts]
  (let [[op-str body-start-index] (parse-ident s (inc start-index) opts)
        _ (when (= "" op-str) (throw (ex-info "missing operator" {:idx start-index})))
        op-sym (symbol op-str)
        op-fn (if (= op-sym '$) identity (get-in opts [:operators op-sym]))
        _ (when (nil? op-fn) (throw (ex-info "unknown operator" {:idx start-index :op op-sym})))
        [body end-index] (parse-body s body-start-index \) opts)]
    [(apply op-fn body) end-index]))

(defn parse-seq [s start-index opts]
  (let [[body end-index] (parse-body s (inc start-index) \] opts)]
    [body end-index]))

(defn parse-map [s start-index opts]
  (let [[body end-index] (parse-body s (inc start-index) \} opts)]
    (when-not (even? (count body))
      (throw (ex-info "map has odd number of items" {:idx start-index})))
    [(apply array-map body) end-index]))

(def default-operators
  {'act z/act
   'bnd z/bnd
   '<<  z/<<
   'set (fn [& xs] (set xs))})

(defn read-str [s & {:as opts}]
  (let [opts (merge {:operators default-operators} opts)]
    (case s
      "" ""
      "_" nil
      "true" true
      "false" false
      (let [[v end-index]
            (case (nth s 0)
              (\+ \- \0 \1 \2 \3 \4 \5 \6 \7 \8 \9)
              (parse-number s 0 opts)

              \:
              (parse-keyword s 0 opts)

              \`
              (parse-string s 0 opts)

              \(
              (parse-op s 0 opts)

              \[
              (parse-seq s 0 opts)

              \{
              (parse-map s 0 opts)

              [s (count s)])]
        (if (not= end-index (count s))
          (throw (ex-info "extra characters at end of string" {:idx end-index}))
          v)))))

(declare write-val)

(defn default-mapper [x]
  (cond
    (set? x)
    (cons 'set (seq x))

    (z/act? x)
    (let [{:keys [props effects]} (z/act->map x)]
      (concat ['act] (when (seq props) [props]) effects))

    (z/bnd? x)
    (let [{:keys [key props args]} (z/bnd->map x)]
      (concat ['bnd] (when (seq props) [props]) [key] args))

    (z/inj? x)
    (let [{:keys [key args]} (z/inj->map x)]
      (concat ['<< key] args))

    :else
    x))

(defn- max-quotes-count [s]
  (loop [i 0
         cur-max 0]
    (if-let [qi (str/index-of s \` i)]
      (let [qcount (count-quotes s qi)]
        (recur (+ qi qcount) (max cur-max qcount)))
      cur-max)))

(defn- write-map [w x opts]
  (write w \{)
  (when-let [[first-k first-v] (first x)]
    (write-val w first-k opts)
    (write w \space)
    (write-val w first-v opts)
    (doseq [[k v] (rest x)]
      (write w \space)
      (write-val w k opts)
      (write w \space)
      (write-val w v opts)))
  (write w \}))

(defn- write-seq [w x opts]
  (write w \[)
  (when (seq x)
    (let [first-v (first x)]
      (write-val w first-v opts))
    (doseq [v (rest x)]
      (write w \space)
      (write-val w v opts)))
  (write w \]))

(defn- write-op [w x opts]
  (write w \()
  (write w (pr-str (first x)))
  (doseq [v (rest x)]
    (write w \space)
    (write-val w v opts))
  (write w \)))

(defn- write-val [w x {:keys [top?] :as opts}]
  (let [x ((:mapper opts) x)
        nested-opts (assoc opts :top? false)]
    (cond
      (true? x)
      (write w (if top? "true" "T"))

      (false? x)
      (write w (if top? "false" "F"))

      (nil? x)
      (write w "_")

      (number? x)
      (cond
        (= ##Inf x)
        (if top?
          (write-op w '($ ##Inf) nested-opts)
          (write w "Inf+"))

        (= ##-Inf x)
        (if top?
          (write-op w '($ ##-Inf) nested-opts)
          (write w "Inf-"))

        (NaN? x)
        (if top?
          (write-op w '($ ##NaN) nested-opts)
          (write w "NaN"))

        :else
        (write w (pr-str x)))

      (keyword? x)
      (write w (pr-str x))

      (string? x)
      (cond
        (= "" x)
        (when-not top?
          (write w \E))

        (or (= (nth x 0) \`) (= (nth x (dec (count x))) \`))
        (throw (ex-info "back ticks (`) aren't allowed at the start or end of strings" {:x x}))

        (and top? (case (nth x 0) (\( \[ \{ \:) false true))
        (write w x)

        :else
        (let [contains-qcount (max-quotes-count x)
              surround-qcount (inc contains-qcount)]
          (dotimes [_ surround-qcount]
            (write w \`))
          (write w x)
          (dotimes [_ surround-qcount]
            (write w \`))))

      (map? x)
      (write-map w x nested-opts)

      (and (seq? x) (symbol? (first x)))
      (write-op w x nested-opts)

      (sequential? x)
      (write-seq w x nested-opts)

      :else
      (throw (ex-info "don't know how to write value" {:value x})))
    (str-writer->str w)))

(defn write-str [x & {:as opts}]
  (let [w (str-writer)]
    (write-val w x (merge {:mapper default-mapper :top? true} opts))))