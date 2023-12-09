goog.provide('zero.extras.stream');
zero.extras.stream.derived = (function zero$extras$stream$derived(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39052 = arguments.length;
var i__5770__auto___39053 = (0);
while(true){
if((i__5770__auto___39053 < len__5769__auto___39052)){
args__5775__auto__.push((arguments[i__5770__auto___39053]));

var G__39054 = (i__5770__auto___39053 + (1));
i__5770__auto___39053 = G__39054;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return zero.extras.stream.derived.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(zero.extras.stream.derived.cljs$core$IFn$_invoke$arity$variadic = (function (f,deps){
return (function() { 
var G__39055__delegate = function (rx,args){
var watch_id = cljs.core.random_uuid();
var _BANG_dep_vals = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__38908_SHARP_){
if((((!((p1__38908_SHARP_ == null))))?(((((p1__38908_SHARP_.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === p1__38908_SHARP_.cljs$core$IDeref$))))?true:(((!p1__38908_SHARP_.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,p1__38908_SHARP_):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,p1__38908_SHARP_))){
return cljs.core.deref(p1__38908_SHARP_);
} else {
return null;
}
}),deps));
var on_deps = (function (dep_vals){
try{var G__38933 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,dep_vals,args);
return (rx.cljs$core$IFn$_invoke$arity$1 ? rx.cljs$core$IFn$_invoke$arity$1(G__38933) : rx.call(null,G__38933));
}catch (e38931){var e = e38931;
return console.error(e);
}});
on_deps(cljs.core.deref(_BANG_dep_vals));

cljs.core.add_watch(_BANG_dep_vals,watch_id,(function (_,___$1,___$2,new_val){
return on_deps(new_val);
}));

var seq__38934_39056 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,deps));
var chunk__38935_39057 = null;
var count__38936_39058 = (0);
var i__38937_39059 = (0);
while(true){
if((i__38937_39059 < count__38936_39058)){
var vec__38959_39060 = chunk__38935_39057.cljs$core$IIndexed$_nth$arity$2(null,i__38937_39059);
var idx_39061 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38959_39060,(0),null);
var dep_39062 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38959_39060,(1),null);
cljs.core.add_watch(dep_39062,watch_id,((function (seq__38934_39056,chunk__38935_39057,count__38936_39058,i__38937_39059,vec__38959_39060,idx_39061,dep_39062,watch_id,_BANG_dep_vals,on_deps){
return (function (_,___$1,___$2,new_val){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_dep_vals,cljs.core.assoc,idx_39061,new_val);
});})(seq__38934_39056,chunk__38935_39057,count__38936_39058,i__38937_39059,vec__38959_39060,idx_39061,dep_39062,watch_id,_BANG_dep_vals,on_deps))
);


var G__39067 = seq__38934_39056;
var G__39068 = chunk__38935_39057;
var G__39069 = count__38936_39058;
var G__39070 = (i__38937_39059 + (1));
seq__38934_39056 = G__39067;
chunk__38935_39057 = G__39068;
count__38936_39058 = G__39069;
i__38937_39059 = G__39070;
continue;
} else {
var temp__5804__auto___39071 = cljs.core.seq(seq__38934_39056);
if(temp__5804__auto___39071){
var seq__38934_39072__$1 = temp__5804__auto___39071;
if(cljs.core.chunked_seq_QMARK_(seq__38934_39072__$1)){
var c__5568__auto___39073 = cljs.core.chunk_first(seq__38934_39072__$1);
var G__39074 = cljs.core.chunk_rest(seq__38934_39072__$1);
var G__39075 = c__5568__auto___39073;
var G__39076 = cljs.core.count(c__5568__auto___39073);
var G__39077 = (0);
seq__38934_39056 = G__39074;
chunk__38935_39057 = G__39075;
count__38936_39058 = G__39076;
i__38937_39059 = G__39077;
continue;
} else {
var vec__38965_39078 = cljs.core.first(seq__38934_39072__$1);
var idx_39079 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38965_39078,(0),null);
var dep_39080 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38965_39078,(1),null);
cljs.core.add_watch(dep_39080,watch_id,((function (seq__38934_39056,chunk__38935_39057,count__38936_39058,i__38937_39059,vec__38965_39078,idx_39079,dep_39080,seq__38934_39072__$1,temp__5804__auto___39071,watch_id,_BANG_dep_vals,on_deps){
return (function (_,___$1,___$2,new_val){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_dep_vals,cljs.core.assoc,idx_39079,new_val);
});})(seq__38934_39056,chunk__38935_39057,count__38936_39058,i__38937_39059,vec__38965_39078,idx_39079,dep_39080,seq__38934_39072__$1,temp__5804__auto___39071,watch_id,_BANG_dep_vals,on_deps))
);


var G__39081 = cljs.core.next(seq__38934_39072__$1);
var G__39082 = null;
var G__39083 = (0);
var G__39084 = (0);
seq__38934_39056 = G__39081;
chunk__38935_39057 = G__39082;
count__38936_39058 = G__39083;
i__38937_39059 = G__39084;
continue;
}
} else {
}
}
break;
}

return (function zero$extras$stream$cleanup_derived(){
var seq__38969 = cljs.core.seq(deps);
var chunk__38970 = null;
var count__38971 = (0);
var i__38972 = (0);
while(true){
if((i__38972 < count__38971)){
var dep = chunk__38970.cljs$core$IIndexed$_nth$arity$2(null,i__38972);
cljs.core.remove_watch(dep,watch_id);


var G__39089 = seq__38969;
var G__39090 = chunk__38970;
var G__39091 = count__38971;
var G__39092 = (i__38972 + (1));
seq__38969 = G__39089;
chunk__38970 = G__39090;
count__38971 = G__39091;
i__38972 = G__39092;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__38969);
if(temp__5804__auto__){
var seq__38969__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38969__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__38969__$1);
var G__39093 = cljs.core.chunk_rest(seq__38969__$1);
var G__39094 = c__5568__auto__;
var G__39095 = cljs.core.count(c__5568__auto__);
var G__39096 = (0);
seq__38969 = G__39093;
chunk__38970 = G__39094;
count__38971 = G__39095;
i__38972 = G__39096;
continue;
} else {
var dep = cljs.core.first(seq__38969__$1);
cljs.core.remove_watch(dep,watch_id);


var G__39098 = cljs.core.next(seq__38969__$1);
var G__39099 = null;
var G__39100 = (0);
var G__39101 = (0);
seq__38969 = G__39098;
chunk__38970 = G__39099;
count__38971 = G__39100;
i__38972 = G__39101;
continue;
}
} else {
return null;
}
}
break;
}
});
};
var G__39055 = function (rx,var_args){
var args = null;
if (arguments.length > 1) {
var G__39102__i = 0, G__39102__a = new Array(arguments.length -  1);
while (G__39102__i < G__39102__a.length) {G__39102__a[G__39102__i] = arguments[G__39102__i + 1]; ++G__39102__i;}
  args = new cljs.core.IndexedSeq(G__39102__a,0,null);
} 
return G__39055__delegate.call(this,rx,args);};
G__39055.cljs$lang$maxFixedArity = 1;
G__39055.cljs$lang$applyTo = (function (arglist__39103){
var rx = cljs.core.first(arglist__39103);
var args = cljs.core.rest(arglist__39103);
return G__39055__delegate(rx,args);
});
G__39055.cljs$core$IFn$_invoke$arity$variadic = G__39055__delegate;
return G__39055;
})()
;
}));

(zero.extras.stream.derived.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(zero.extras.stream.derived.cljs$lang$applyTo = (function (seq38916){
var G__38917 = cljs.core.first(seq38916);
var seq38916__$1 = cljs.core.next(seq38916);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__38917,seq38916__$1);
}));

if((typeof zero !== 'undefined') && (typeof zero.extras !== 'undefined') && (typeof zero.extras.stream !== 'undefined') && (typeof zero.extras.stream._BANG_watch_deps !== 'undefined')){
} else {
zero.extras.stream._BANG_watch_deps = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
zero.extras.stream.unwatch = (function zero$extras$stream$unwatch(key){
var temp__5804__auto___39105 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.stream._BANG_watch_deps),key);
if(cljs.core.truth_(temp__5804__auto___39105)){
var deps_39106 = temp__5804__auto___39105;
var seq__38983_39107 = cljs.core.seq(deps_39106);
var chunk__38984_39108 = null;
var count__38985_39109 = (0);
var i__38986_39110 = (0);
while(true){
if((i__38986_39110 < count__38985_39109)){
var dep_39112 = chunk__38984_39108.cljs$core$IIndexed$_nth$arity$2(null,i__38986_39110);
cljs.core.remove_watch(dep_39112,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("zero.extras.stream","watch","zero.extras.stream/watch",1875334930),key], null));


var G__39113 = seq__38983_39107;
var G__39114 = chunk__38984_39108;
var G__39115 = count__38985_39109;
var G__39116 = (i__38986_39110 + (1));
seq__38983_39107 = G__39113;
chunk__38984_39108 = G__39114;
count__38985_39109 = G__39115;
i__38986_39110 = G__39116;
continue;
} else {
var temp__5804__auto___39118__$1 = cljs.core.seq(seq__38983_39107);
if(temp__5804__auto___39118__$1){
var seq__38983_39120__$1 = temp__5804__auto___39118__$1;
if(cljs.core.chunked_seq_QMARK_(seq__38983_39120__$1)){
var c__5568__auto___39121 = cljs.core.chunk_first(seq__38983_39120__$1);
var G__39122 = cljs.core.chunk_rest(seq__38983_39120__$1);
var G__39123 = c__5568__auto___39121;
var G__39124 = cljs.core.count(c__5568__auto___39121);
var G__39125 = (0);
seq__38983_39107 = G__39122;
chunk__38984_39108 = G__39123;
count__38985_39109 = G__39124;
i__38986_39110 = G__39125;
continue;
} else {
var dep_39126 = cljs.core.first(seq__38983_39120__$1);
cljs.core.remove_watch(dep_39126,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("zero.extras.stream","watch","zero.extras.stream/watch",1875334930),key], null));


var G__39127 = cljs.core.next(seq__38983_39120__$1);
var G__39128 = null;
var G__39129 = (0);
var G__39130 = (0);
seq__38983_39107 = G__39127;
chunk__38984_39108 = G__39128;
count__38985_39109 = G__39129;
i__38986_39110 = G__39130;
continue;
}
} else {
}
}
break;
}
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.extras.stream._BANG_watch_deps,cljs.core.dissoc,key);
});
zero.extras.stream.watch = (function zero$extras$stream$watch(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39133 = arguments.length;
var i__5770__auto___39134 = (0);
while(true){
if((i__5770__auto___39134 < len__5769__auto___39133)){
args__5775__auto__.push((arguments[i__5770__auto___39134]));

var G__39136 = (i__5770__auto___39134 + (1));
i__5770__auto___39134 = G__39136;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return zero.extras.stream.watch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(zero.extras.stream.watch.cljs$core$IFn$_invoke$arity$variadic = (function (key,f,deps){
zero.extras.stream.unwatch(key);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.extras.stream._BANG_watch_deps,cljs.core.assoc,key,deps);

var _BANG_dep_vals = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__38991_SHARP_){
if((((!((p1__38991_SHARP_ == null))))?(((((p1__38991_SHARP_.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === p1__38991_SHARP_.cljs$core$IDeref$))))?true:(((!p1__38991_SHARP_.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,p1__38991_SHARP_):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,p1__38991_SHARP_))){
return cljs.core.deref(p1__38991_SHARP_);
} else {
return null;
}
}),deps));
var on_deps = (function (dep_vals){
try{return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,dep_vals);
}catch (e39000){var e = e39000;
return console.error(e);
}});
var seq__39004_39142 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,deps));
var chunk__39005_39143 = null;
var count__39006_39144 = (0);
var i__39007_39145 = (0);
while(true){
if((i__39007_39145 < count__39006_39144)){
var vec__39029_39146 = chunk__39005_39143.cljs$core$IIndexed$_nth$arity$2(null,i__39007_39145);
var idx_39147 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39029_39146,(0),null);
var dep_39148 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39029_39146,(1),null);
cljs.core.add_watch(dep_39148,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("zero.extras.stream","watch","zero.extras.stream/watch",1875334930),key], null),((function (seq__39004_39142,chunk__39005_39143,count__39006_39144,i__39007_39145,vec__39029_39146,idx_39147,dep_39148,_BANG_dep_vals,on_deps){
return (function (_,___$1,___$2,new_val){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_dep_vals,cljs.core.assoc,idx_39147,new_val);
});})(seq__39004_39142,chunk__39005_39143,count__39006_39144,i__39007_39145,vec__39029_39146,idx_39147,dep_39148,_BANG_dep_vals,on_deps))
);


var G__39149 = seq__39004_39142;
var G__39150 = chunk__39005_39143;
var G__39151 = count__39006_39144;
var G__39152 = (i__39007_39145 + (1));
seq__39004_39142 = G__39149;
chunk__39005_39143 = G__39150;
count__39006_39144 = G__39151;
i__39007_39145 = G__39152;
continue;
} else {
var temp__5804__auto___39154 = cljs.core.seq(seq__39004_39142);
if(temp__5804__auto___39154){
var seq__39004_39155__$1 = temp__5804__auto___39154;
if(cljs.core.chunked_seq_QMARK_(seq__39004_39155__$1)){
var c__5568__auto___39156 = cljs.core.chunk_first(seq__39004_39155__$1);
var G__39157 = cljs.core.chunk_rest(seq__39004_39155__$1);
var G__39158 = c__5568__auto___39156;
var G__39159 = cljs.core.count(c__5568__auto___39156);
var G__39160 = (0);
seq__39004_39142 = G__39157;
chunk__39005_39143 = G__39158;
count__39006_39144 = G__39159;
i__39007_39145 = G__39160;
continue;
} else {
var vec__39034_39161 = cljs.core.first(seq__39004_39155__$1);
var idx_39162 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39034_39161,(0),null);
var dep_39163 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39034_39161,(1),null);
cljs.core.add_watch(dep_39163,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("zero.extras.stream","watch","zero.extras.stream/watch",1875334930),key], null),((function (seq__39004_39142,chunk__39005_39143,count__39006_39144,i__39007_39145,vec__39034_39161,idx_39162,dep_39163,seq__39004_39155__$1,temp__5804__auto___39154,_BANG_dep_vals,on_deps){
return (function (_,___$1,___$2,new_val){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_dep_vals,cljs.core.assoc,idx_39162,new_val);
});})(seq__39004_39142,chunk__39005_39143,count__39006_39144,i__39007_39145,vec__39034_39161,idx_39162,dep_39163,seq__39004_39155__$1,temp__5804__auto___39154,_BANG_dep_vals,on_deps))
);


var G__39165 = cljs.core.next(seq__39004_39155__$1);
var G__39166 = null;
var G__39167 = (0);
var G__39168 = (0);
seq__39004_39142 = G__39165;
chunk__39005_39143 = G__39166;
count__39006_39144 = G__39167;
i__39007_39145 = G__39168;
continue;
}
} else {
}
}
break;
}

return cljs.core.add_watch(_BANG_dep_vals,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("zero.extras.stream","watch","zero.extras.stream/watch",1875334930),key], null),(function (_,___$1,___$2,new_val){
return on_deps(new_val);
}));
}));

(zero.extras.stream.watch.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(zero.extras.stream.watch.cljs$lang$applyTo = (function (seq38992){
var G__38993 = cljs.core.first(seq38992);
var seq38992__$1 = cljs.core.next(seq38992);
var G__38994 = cljs.core.first(seq38992__$1);
var seq38992__$2 = cljs.core.next(seq38992__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__38993,G__38994,seq38992__$2);
}));


//# sourceMappingURL=zero.extras.stream.js.map
