goog.provide('zero.impl.injection');
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.injection !== 'undefined') && (typeof zero.impl.injection._BANG_injectors !== 'undefined')){
} else {
zero.impl.injection._BANG_injectors = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}

/**
* @constructor
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IPrintWithWriter}
*/
zero.impl.injection.Injection = (function (injector_key,args){
this.injector_key = injector_key;
this.args = args;
this.cljs$lang$protocol_mask$partition0$ = 2153775104;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(zero.impl.injection.Injection.prototype.injected = (function (context,_BANG_cache){
var self__ = this;
var this$ = this;
var cache_key = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.injector_key,self__.args], null);
if(cljs.core.contains_QMARK_(cljs.core.deref(_BANG_cache),cache_key)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_cache),cache_key);
} else {
try{var injector = (function (){var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.impl.injection._BANG_injectors),self__.injector_key);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("No injector registered for key",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"injector-key","injector-key",252589700),self__.injector_key], null));
}
})();
var r = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(injector,context,clojure.walk.postwalk((function (p1__37724_SHARP_){
if((p1__37724_SHARP_ instanceof zero.impl.injection.Injection)){
return p1__37724_SHARP_.injected(context,_BANG_cache);
} else {
return p1__37724_SHARP_;
}
}),self__.args));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_cache,cljs.core.assoc,cache_key,r);

return r;
}catch (e37733){var e = e37733;
console.error(e,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"injection","injection",918460228),this$], null));

return null;
}}
}));

(zero.impl.injection.Injection.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var self__ = this;
var ___$1 = this;
return (((other instanceof zero.impl.injection.Injection)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.injector_key,other.injector_key)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.args,other.args)))));
}));

(zero.impl.injection.Injection.prototype.cljs$core$IHash$_hash$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.hash(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.injector_key,self__.args], null));
}));

(zero.impl.injection.Injection.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (_,writer,_opts){
var self__ = this;
var ___$1 = this;
return cljs.core._write(writer,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"<<","<<",-998715585,null),self__.injector_key], null),self__.args)], 0)));
}));

(zero.impl.injection.Injection.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"injector-key","injector-key",1893121227,null),new cljs.core.Symbol(null,"args","args",-1338879193,null)], null);
}));

(zero.impl.injection.Injection.cljs$lang$type = true);

(zero.impl.injection.Injection.cljs$lang$ctorStr = "zero.impl.injection/Injection");

(zero.impl.injection.Injection.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"zero.impl.injection/Injection");
}));

/**
 * Positional factory function for zero.impl.injection/Injection.
 */
zero.impl.injection.__GT_Injection = (function zero$impl$injection$__GT_Injection(injector_key,args){
return (new zero.impl.injection.Injection(injector_key,args));
});

zero.impl.injection._STAR_context_STAR_ = null;
zero.impl.injection.apply_injections = (function zero$impl$injection$apply_injections(x,context){
var _BANG_cache = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var _STAR_context_STAR__orig_val__37753 = zero.impl.injection._STAR_context_STAR_;
var _STAR_context_STAR__temp_val__37754 = context;
(zero.impl.injection._STAR_context_STAR_ = _STAR_context_STAR__temp_val__37754);

try{return clojure.walk.postwalk((function (form){
if((form instanceof zero.impl.injection.Injection)){
return form.injected(context,_BANG_cache);
} else {
return form;
}
}),x);
}finally {(zero.impl.injection._STAR_context_STAR_ = _STAR_context_STAR__orig_val__37753);
}});
zero.impl.injection.reg_injector = (function zero$impl$injection$reg_injector(injector_key,f){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.injection._BANG_injectors,cljs.core.assoc,injector_key,f);
});

//# sourceMappingURL=zero.impl.injection.js.map
