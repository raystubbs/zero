goog.provide('zero.extras.util.injectors');
zero.core.reg_injector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("ze","ctx","ze/ctx",-493614413),(function() { 
var G__41211__delegate = function (context,path){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(context,path);
};
var G__41211 = function (context,var_args){
var path = null;
if (arguments.length > 1) {
var G__41216__i = 0, G__41216__a = new Array(arguments.length -  1);
while (G__41216__i < G__41216__a.length) {G__41216__a[G__41216__i] = arguments[G__41216__i + 1]; ++G__41216__i;}
  path = new cljs.core.IndexedSeq(G__41216__a,0,null);
} 
return G__41211__delegate.call(this,context,path);};
G__41211.cljs$lang$maxFixedArity = 1;
G__41211.cljs$lang$applyTo = (function (arglist__41222){
var context = cljs.core.first(arglist__41222);
var path = cljs.core.rest(arglist__41222);
return G__41211__delegate(context,path);
});
G__41211.cljs$core$IFn$_invoke$arity$variadic = G__41211__delegate;
return G__41211;
})()
], 0));
zero.core.reg_injector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("ze","call","ze/call",-520060513),(function() { 
var G__41227__delegate = function (_,f,args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,args);
};
var G__41227 = function (_,f,var_args){
var args = null;
if (arguments.length > 2) {
var G__41228__i = 0, G__41228__a = new Array(arguments.length -  2);
while (G__41228__i < G__41228__a.length) {G__41228__a[G__41228__i] = arguments[G__41228__i + 2]; ++G__41228__i;}
  args = new cljs.core.IndexedSeq(G__41228__a,0,null);
} 
return G__41227__delegate.call(this,_,f,args);};
G__41227.cljs$lang$maxFixedArity = 2;
G__41227.cljs$lang$applyTo = (function (arglist__41232){
var _ = cljs.core.first(arglist__41232);
arglist__41232 = cljs.core.next(arglist__41232);
var f = cljs.core.first(arglist__41232);
var args = cljs.core.rest(arglist__41232);
return G__41227__delegate(_,f,args);
});
G__41227.cljs$core$IFn$_invoke$arity$variadic = G__41227__delegate;
return G__41227;
})()
], 0));

//# sourceMappingURL=zero.extras.util.injectors.js.map
