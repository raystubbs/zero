goog.provide('zero.impl.base');
zero.impl.base.words = (function zero$impl$base$words(s){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(s,/\W+|(?<=[a-z])(?=[A-Z])/);
});
zero.impl.base.cammel_case = (function zero$impl$base$cammel_case(s){
var vec__38214 = zero.impl.base.words(s);
var seq__38215 = cljs.core.seq(vec__38214);
var first__38216 = cljs.core.first(seq__38215);
var seq__38215__$1 = cljs.core.next(seq__38215);
var first_word = first__38216;
var rest_words = seq__38215__$1;
return [clojure.string.lower_case(first_word),clojure.string.join.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (word){
return [clojure.string.upper_case(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(word,(0),(1))),clojure.string.lower_case(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(word,(1)))].join('');
}),rest_words))].join('');
});
zero.impl.base.snake_case = (function zero$impl$base$snake_case(s){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("-",cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.lower_case,zero.impl.base.words(s)));
});
zero.impl.base.index_of = (function zero$impl$base$index_of(pred,coll){
return cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,v){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(v) : pred.call(null,v)))){
return idx;
} else {
return null;
}
}),coll));
});

//# sourceMappingURL=zero.impl.base.js.map
