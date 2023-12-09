goog.provide('zero.core');
/**
 * 
 * Construct an action.
 * 
 * ```clojure
 * [:button
 *  :on-click (act [:do-something (<< :inject-something)]
 *              [:do-something-else "some data"])
 *  "Click Me!"]
 * 
 * ```
 * 
 * An action is a representation of a collection of
 * effects as data.  Actions can be called, and expect
 * a `js/Event` as input.  Actions can be compared, hashed,
 * printed, etc. as data.
 */
zero.core.act = (function zero$core$act(var_args){
var args__5775__auto__ = [];
var len__5769__auto___40940 = arguments.length;
var i__5770__auto___40941 = (0);
while(true){
if((i__5770__auto___40941 < len__5769__auto___40940)){
args__5775__auto__.push((arguments[i__5770__auto___40941]));

var G__40942 = (i__5770__auto___40941 + (1));
i__5770__auto___40941 = G__40942;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return zero.core.act.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(zero.core.act.cljs$core$IFn$_invoke$arity$variadic = (function (things){
var vec__40654 = ((cljs.core.map_QMARK_(cljs.core.first(things)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(things),cljs.core.rest(things)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,things], null));
var props = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40654,(0),null);
var effects = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40654,(1),null);
return (new zero.impl.actions.Action(props,cljs.core.filterv(cljs.core.some_QMARK_,effects)));
}));

(zero.core.act.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(zero.core.act.cljs$lang$applyTo = (function (seq40652){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq40652));
}));

/**
 * 
 * Register one or more effects.
 * 
 * ```clojure
 * (reg-effect
 *  ::echo
 *  (fn [& args]
 * (prn args))
 * 
 *  ::echo2
 *  (fn [& args]
 *   (prn args)))
 * 
 * (act ::echo "Hello, World!")
 * ```
 */
zero.core.reg_effect = (function zero$core$reg_effect(var_args){
var args__5775__auto__ = [];
var len__5769__auto___40943 = arguments.length;
var i__5770__auto___40944 = (0);
while(true){
if((i__5770__auto___40944 < len__5769__auto___40943)){
args__5775__auto__.push((arguments[i__5770__auto___40944]));

var G__40945 = (i__5770__auto___40944 + (1));
i__5770__auto___40944 = G__40945;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return zero.core.reg_effect.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(zero.core.reg_effect.cljs$core$IFn$_invoke$arity$variadic = (function (p__40662){
var map__40663 = p__40662;
var map__40663__$1 = cljs.core.__destructure_map(map__40663);
var effect_specs = map__40663__$1;
var seq__40664 = cljs.core.seq(effect_specs);
var chunk__40667 = null;
var count__40668 = (0);
var i__40669 = (0);
while(true){
if((i__40669 < count__40668)){
var vec__40693 = chunk__40667.cljs$core$IIndexed$_nth$arity$2(null,i__40669);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40693,(0),null);
var effect_fn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40693,(1),null);
zero.impl.actions.reg_effect(effect_key,effect_fn);


var G__40946 = seq__40664;
var G__40947 = chunk__40667;
var G__40948 = count__40668;
var G__40949 = (i__40669 + (1));
seq__40664 = G__40946;
chunk__40667 = G__40947;
count__40668 = G__40948;
i__40669 = G__40949;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40664);
if(temp__5804__auto__){
var seq__40664__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40664__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40664__$1);
var G__40950 = cljs.core.chunk_rest(seq__40664__$1);
var G__40951 = c__5568__auto__;
var G__40952 = cljs.core.count(c__5568__auto__);
var G__40953 = (0);
seq__40664 = G__40950;
chunk__40667 = G__40951;
count__40668 = G__40952;
i__40669 = G__40953;
continue;
} else {
var vec__40696 = cljs.core.first(seq__40664__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40696,(0),null);
var effect_fn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40696,(1),null);
zero.impl.actions.reg_effect(effect_key,effect_fn);


var G__40954 = cljs.core.next(seq__40664__$1);
var G__40955 = null;
var G__40956 = (0);
var G__40957 = (0);
seq__40664 = G__40954;
chunk__40667 = G__40955;
count__40668 = G__40956;
i__40669 = G__40957;
continue;
}
} else {
return null;
}
}
break;
}
}));

(zero.core.reg_effect.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(zero.core.reg_effect.cljs$lang$applyTo = (function (seq40657){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq40657));
}));

/**
 * 
 * Construct a binding.
 * 
 * ```clojure
 * [:input
 *  :value (bnd {:default "foo"} :db/something)]
 * ```
 * 
 * A binding is a reference to an external data stream.
 * Bindings are IWatchable, and any updates in the
 * underlying data stream will be reflected in the properties
 * they're bound to.  Bindings can also be compared, hashed,
 * printed, etc. as data.
 */
zero.core.bnd = (function zero$core$bnd(var_args){
var args__5775__auto__ = [];
var len__5769__auto___40958 = arguments.length;
var i__5770__auto___40959 = (0);
while(true){
if((i__5770__auto___40959 < len__5769__auto___40958)){
args__5775__auto__.push((arguments[i__5770__auto___40959]));

var G__40960 = (i__5770__auto___40959 + (1));
i__5770__auto___40959 = G__40960;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return zero.core.bnd.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(zero.core.bnd.cljs$core$IFn$_invoke$arity$variadic = (function (things){
var vec__40700 = ((cljs.core.map_QMARK_(cljs.core.first(things)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(things),cljs.core.second(things),cljs.core.nthrest(things,(2))], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,cljs.core.first(things),cljs.core.rest(things)], null));
var props = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40700,(0),null);
var stream_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40700,(1),null);
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40700,(2),null);
return (new zero.impl.bindings.Binding(props,stream_key,cljs.core.vec(args)));
}));

(zero.core.bnd.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(zero.core.bnd.cljs$lang$applyTo = (function (seq40699){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq40699));
}));

/**
 * 
 * Register one or more data streams.
 * 
 * ```clojure
 * (defonce !db (atom {}))
 * 
 * (reg-stream
 *  :db
 *  (fn [rx path]
 *   (rx (get-in @!db path)))
 * 
 *  :other
 *  (fn [rx]
 *   (rx "thing")))
 * ```
 * 
 * If a function is returned it will be called to cleanup
 * the stream once it's spun down.
 * 
 * Each pair of `[stream-key args]` represents a unique
 * stream instance, so the method will be called only once
 * for each set of args used with the stream; until the
 * stream has been spun down and must be restarted.
 */
zero.core.reg_stream = (function zero$core$reg_stream(var_args){
var args__5775__auto__ = [];
var len__5769__auto___40970 = arguments.length;
var i__5770__auto___40971 = (0);
while(true){
if((i__5770__auto___40971 < len__5769__auto___40970)){
args__5775__auto__.push((arguments[i__5770__auto___40971]));

var G__40972 = (i__5770__auto___40971 + (1));
i__5770__auto___40971 = G__40972;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return zero.core.reg_stream.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(zero.core.reg_stream.cljs$core$IFn$_invoke$arity$variadic = (function (p__40716){
var map__40717 = p__40716;
var map__40717__$1 = cljs.core.__destructure_map(map__40717);
var stream_specs = map__40717__$1;
var seq__40718 = cljs.core.seq(stream_specs);
var chunk__40719 = null;
var count__40720 = (0);
var i__40721 = (0);
while(true){
if((i__40721 < count__40720)){
var vec__40754 = chunk__40719.cljs$core$IIndexed$_nth$arity$2(null,i__40721);
var stream_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40754,(0),null);
var stream_fn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40754,(1),null);
zero.impl.bindings.reg_stream(stream_key,stream_fn);


var G__40982 = seq__40718;
var G__40983 = chunk__40719;
var G__40984 = count__40720;
var G__40985 = (i__40721 + (1));
seq__40718 = G__40982;
chunk__40719 = G__40983;
count__40720 = G__40984;
i__40721 = G__40985;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40718);
if(temp__5804__auto__){
var seq__40718__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40718__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40718__$1);
var G__40990 = cljs.core.chunk_rest(seq__40718__$1);
var G__40992 = c__5568__auto__;
var G__40994 = cljs.core.count(c__5568__auto__);
var G__40996 = (0);
seq__40718 = G__40990;
chunk__40719 = G__40992;
count__40720 = G__40994;
i__40721 = G__40996;
continue;
} else {
var vec__40759 = cljs.core.first(seq__40718__$1);
var stream_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40759,(0),null);
var stream_fn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40759,(1),null);
zero.impl.bindings.reg_stream(stream_key,stream_fn);


var G__41002 = cljs.core.next(seq__40718__$1);
var G__41003 = null;
var G__41004 = (0);
var G__41005 = (0);
seq__40718 = G__41002;
chunk__40719 = G__41003;
count__40720 = G__41004;
i__40721 = G__41005;
continue;
}
} else {
return null;
}
}
break;
}
}));

(zero.core.reg_stream.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(zero.core.reg_stream.cljs$lang$applyTo = (function (seq40703){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq40703));
}));

/**
 * 
 * Used to indicate an injection point in actions or bindings.
 * ```clojure
 *   (act :do-something (<< :inject-some-data))
 *   (bnd :something (<< :inject-some-data))
 * 
 *   (reg-injector
 * :inject-some-data
 * (fn [_ _ctx]
 *  "Some data"))
 * ```
 */
zero.core._LT__LT_ = (function zero$core$_LT__LT_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___41011 = arguments.length;
var i__5770__auto___41012 = (0);
while(true){
if((i__5770__auto___41012 < len__5769__auto___41011)){
args__5775__auto__.push((arguments[i__5770__auto___41012]));

var G__41017 = (i__5770__auto___41012 + (1));
i__5770__auto___41012 = G__41017;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return zero.core._LT__LT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(zero.core._LT__LT_.cljs$core$IFn$_invoke$arity$variadic = (function (injector_key,args){
return (new zero.impl.injection.Injection(injector_key,args));
}));

(zero.core._LT__LT_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(zero.core._LT__LT_.cljs$lang$applyTo = (function (seq40772){
var G__40773 = cljs.core.first(seq40772);
var seq40772__$1 = cljs.core.next(seq40772);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__40773,seq40772__$1);
}));

/**
 * 
 * Register one or more data injectors.
 * ```clojure
 * (reg-injector
 *   :event/data (fn [{:keys [event]}] (.-data event))
 *   :event/type (fn [{:keys [event]}] (.-type event)))
 * 
 * (act ::echo (<< :event/data))
 * ```
 * 
 * When dispatched from an action, injectors will receive
 * an `event` context value containing captured fields from
 * the original event.
 */
zero.core.reg_injector = (function zero$core$reg_injector(var_args){
var args__5775__auto__ = [];
var len__5769__auto___41032 = arguments.length;
var i__5770__auto___41033 = (0);
while(true){
if((i__5770__auto___41033 < len__5769__auto___41032)){
args__5775__auto__.push((arguments[i__5770__auto___41033]));

var G__41038 = (i__5770__auto___41033 + (1));
i__5770__auto___41033 = G__41038;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return zero.core.reg_injector.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(zero.core.reg_injector.cljs$core$IFn$_invoke$arity$variadic = (function (p__40792){
var map__40793 = p__40792;
var map__40793__$1 = cljs.core.__destructure_map(map__40793);
var injector_specs = map__40793__$1;
var seq__40794 = cljs.core.seq(injector_specs);
var chunk__40795 = null;
var count__40796 = (0);
var i__40797 = (0);
while(true){
if((i__40797 < count__40796)){
var vec__40821 = chunk__40795.cljs$core$IIndexed$_nth$arity$2(null,i__40797);
var injector_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40821,(0),null);
var injector_fn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40821,(1),null);
zero.impl.injection.reg_injector(injector_key,injector_fn);


var G__41045 = seq__40794;
var G__41046 = chunk__40795;
var G__41047 = count__40796;
var G__41048 = (i__40797 + (1));
seq__40794 = G__41045;
chunk__40795 = G__41046;
count__40796 = G__41047;
i__40797 = G__41048;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40794);
if(temp__5804__auto__){
var seq__40794__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40794__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40794__$1);
var G__41052 = cljs.core.chunk_rest(seq__40794__$1);
var G__41053 = c__5568__auto__;
var G__41054 = cljs.core.count(c__5568__auto__);
var G__41055 = (0);
seq__40794 = G__41052;
chunk__40795 = G__41053;
count__40796 = G__41054;
i__40797 = G__41055;
continue;
} else {
var vec__40829 = cljs.core.first(seq__40794__$1);
var injector_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40829,(0),null);
var injector_fn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40829,(1),null);
zero.impl.injection.reg_injector(injector_key,injector_fn);


var G__41056 = cljs.core.next(seq__40794__$1);
var G__41057 = null;
var G__41058 = (0);
var G__41059 = (0);
seq__40794 = G__41056;
chunk__40795 = G__41057;
count__40796 = G__41058;
i__40797 = G__41059;
continue;
}
} else {
return null;
}
}
break;
}
}));

(zero.core.reg_injector.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(zero.core.reg_injector.cljs$lang$applyTo = (function (seq40791){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq40791));
}));

/**
 * 
 * Create a component.
 * 
 * ```clojure
 * (component
 *   :name ::my-thing
 *   :props {:foo :attr :bar :field :baz :prop}
 *   :view (fn [{:keys [foo bar baz]}]
 *        (list
 *          [:h1 foo]
 *          [:h2 bar]
 *          [:h3 baz])))
 * ```
 * Zero components are native web components, so creating
 * one adds it to the browser's custom element registry.
 * 
 * Props must be declared, and can be embodied as either
 * an attribute, a field on the generated class, or both.
 * For non-string props it can be useful to map from an
 * attribute string to something more useful, this can be
 * done with an `attr-mapper` function like so:
 * 
 * ```clojure
 * :props {:foo {:attr "foo" :field "foo" :attr-mapper js/parseInt}}
 * ```
 */
zero.core.component = (function zero$core$component(var_args){
var args__5775__auto__ = [];
var len__5769__auto___41062 = arguments.length;
var i__5770__auto___41063 = (0);
while(true){
if((i__5770__auto___41063 < len__5769__auto___41062)){
args__5775__auto__.push((arguments[i__5770__auto___41063]));

var G__41064 = (i__5770__auto___41063 + (1));
i__5770__auto___41063 = G__41064;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return zero.core.component.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(zero.core.component.cljs$core$IFn$_invoke$arity$variadic = (function (p__40850){
var map__40851 = p__40850;
var map__40851__$1 = cljs.core.__destructure_map(map__40851);
var things = map__40851__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40851__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40851__$1,new cljs.core.Keyword(null,"props","props",453281727));
var view = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40851__$1,new cljs.core.Keyword(null,"view","view",1247994814));
var focus = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40851__$1,new cljs.core.Keyword(null,"focus","focus",234677911));
return zero.impl.components.component(things);
}));

(zero.core.component.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(zero.core.component.cljs$lang$applyTo = (function (seq40840){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq40840));
}));

/**
 * 
 * The custom element name that will be generated for a given
 * keyword.
 */
zero.core.component_name = (function zero$core$component_name(kw){
return zero.impl.components.component_name(kw);
});
zero.core.do_effects_BANG_ = (function zero$core$do_effects_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___41081 = arguments.length;
var i__5770__auto___41083 = (0);
while(true){
if((i__5770__auto___41083 < len__5769__auto___41081)){
args__5775__auto__.push((arguments[i__5770__auto___41083]));

var G__41088 = (i__5770__auto___41083 + (1));
i__5770__auto___41083 = G__41088;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return zero.core.do_effects_BANG_.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(zero.core.do_effects_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (effects){
var seq__40895 = cljs.core.seq(effects);
var chunk__40896 = null;
var count__40897 = (0);
var i__40898 = (0);
while(true){
if((i__40898 < count__40897)){
var effect = chunk__40896.cljs$core$IIndexed$_nth$arity$2(null,i__40898);
zero.impl.actions.do_effect_BANG_(effect);


var G__41099 = seq__40895;
var G__41100 = chunk__40896;
var G__41101 = count__40897;
var G__41102 = (i__40898 + (1));
seq__40895 = G__41099;
chunk__40896 = G__41100;
count__40897 = G__41101;
i__40898 = G__41102;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40895);
if(temp__5804__auto__){
var seq__40895__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40895__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40895__$1);
var G__41108 = cljs.core.chunk_rest(seq__40895__$1);
var G__41109 = c__5568__auto__;
var G__41110 = cljs.core.count(c__5568__auto__);
var G__41111 = (0);
seq__40895 = G__41108;
chunk__40896 = G__41109;
count__40897 = G__41110;
i__40898 = G__41111;
continue;
} else {
var effect = cljs.core.first(seq__40895__$1);
zero.impl.actions.do_effect_BANG_(effect);


var G__41117 = cljs.core.next(seq__40895__$1);
var G__41118 = null;
var G__41119 = (0);
var G__41120 = (0);
seq__40895 = G__41117;
chunk__40896 = G__41118;
count__40897 = G__41119;
i__40898 = G__41120;
continue;
}
} else {
return null;
}
}
break;
}
}));

(zero.core.do_effects_BANG_.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(zero.core.do_effects_BANG_.cljs$lang$applyTo = (function (seq40887){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq40887));
}));


//# sourceMappingURL=zero.core.js.map
