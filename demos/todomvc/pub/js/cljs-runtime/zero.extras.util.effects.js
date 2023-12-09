goog.provide('zero.extras.util.effects');
zero.core.reg_effect.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("ze","cond","ze/cond",-33827493),(function() { 
var G__41191__delegate = function (cases){
var temp__5804__auto__ = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cases));
if(cljs.core.truth_(temp__5804__auto__)){
var vec__41134 = temp__5804__auto__;
var seq__41135 = cljs.core.seq(vec__41134);
var first__41136 = cljs.core.first(seq__41135);
var seq__41135__$1 = cljs.core.next(seq__41135);
var _ = first__41136;
var effects = seq__41135__$1;
var seq__41138 = cljs.core.seq(effects);
var chunk__41139 = null;
var count__41140 = (0);
var i__41141 = (0);
while(true){
if((i__41141 < count__41140)){
var effect = chunk__41139.cljs$core$IIndexed$_nth$arity$2(null,i__41141);
zero.core.do_effects_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([effect], 0));


var G__41192 = seq__41138;
var G__41193 = chunk__41139;
var G__41194 = count__41140;
var G__41195 = (i__41141 + (1));
seq__41138 = G__41192;
chunk__41139 = G__41193;
count__41140 = G__41194;
i__41141 = G__41195;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__41138);
if(temp__5804__auto____$1){
var seq__41138__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__41138__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__41138__$1);
var G__41199 = cljs.core.chunk_rest(seq__41138__$1);
var G__41200 = c__5568__auto__;
var G__41201 = cljs.core.count(c__5568__auto__);
var G__41202 = (0);
seq__41138 = G__41199;
chunk__41139 = G__41200;
count__41140 = G__41201;
i__41141 = G__41202;
continue;
} else {
var effect = cljs.core.first(seq__41138__$1);
zero.core.do_effects_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([effect], 0));


var G__41205 = cljs.core.next(seq__41138__$1);
var G__41206 = null;
var G__41207 = (0);
var G__41208 = (0);
seq__41138 = G__41205;
chunk__41139 = G__41206;
count__41140 = G__41207;
i__41141 = G__41208;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
};
var G__41191 = function (var_args){
var cases = null;
if (arguments.length > 0) {
var G__41209__i = 0, G__41209__a = new Array(arguments.length -  0);
while (G__41209__i < G__41209__a.length) {G__41209__a[G__41209__i] = arguments[G__41209__i + 0]; ++G__41209__i;}
  cases = new cljs.core.IndexedSeq(G__41209__a,0,null);
} 
return G__41191__delegate.call(this,cases);};
G__41191.cljs$lang$maxFixedArity = 0;
G__41191.cljs$lang$applyTo = (function (arglist__41210){
var cases = cljs.core.seq(arglist__41210);
return G__41191__delegate(cases);
});
G__41191.cljs$core$IFn$_invoke$arity$variadic = G__41191__delegate;
return G__41191;
})()
,new cljs.core.Keyword("ze","effects","ze/effects",-282422327),(function (effects){
var seq__41159 = cljs.core.seq(effects);
var chunk__41160 = null;
var count__41161 = (0);
var i__41162 = (0);
while(true){
if((i__41162 < count__41161)){
var effect = chunk__41160.cljs$core$IIndexed$_nth$arity$2(null,i__41162);
zero.core.do_effects_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([effect], 0));


var G__41212 = seq__41159;
var G__41213 = chunk__41160;
var G__41214 = count__41161;
var G__41215 = (i__41162 + (1));
seq__41159 = G__41212;
chunk__41160 = G__41213;
count__41161 = G__41214;
i__41162 = G__41215;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__41159);
if(temp__5804__auto__){
var seq__41159__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41159__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__41159__$1);
var G__41218 = cljs.core.chunk_rest(seq__41159__$1);
var G__41219 = c__5568__auto__;
var G__41220 = cljs.core.count(c__5568__auto__);
var G__41221 = (0);
seq__41159 = G__41218;
chunk__41160 = G__41219;
count__41161 = G__41220;
i__41162 = G__41221;
continue;
} else {
var effect = cljs.core.first(seq__41159__$1);
zero.core.do_effects_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([effect], 0));


var G__41223 = cljs.core.next(seq__41159__$1);
var G__41224 = null;
var G__41225 = (0);
var G__41226 = (0);
seq__41159 = G__41223;
chunk__41160 = G__41224;
count__41161 = G__41225;
i__41162 = G__41226;
continue;
}
} else {
return null;
}
}
break;
}
})], 0));

//# sourceMappingURL=zero.extras.util.effects.js.map
