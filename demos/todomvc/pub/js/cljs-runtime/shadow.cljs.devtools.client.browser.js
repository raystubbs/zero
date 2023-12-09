goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___39583 = arguments.length;
var i__5770__auto___39584 = (0);
while(true){
if((i__5770__auto___39584 < len__5769__auto___39583)){
args__5775__auto__.push((arguments[i__5770__auto___39584]));

var G__39585 = (i__5770__auto___39584 + (1));
i__5770__auto___39584 = G__39585;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq39046){
var G__39051 = cljs.core.first(seq39046);
var seq39046__$1 = cljs.core.next(seq39046);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39051,seq39046__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__39085 = cljs.core.seq(sources);
var chunk__39086 = null;
var count__39087 = (0);
var i__39088 = (0);
while(true){
if((i__39088 < count__39087)){
var map__39153 = chunk__39086.cljs$core$IIndexed$_nth$arity$2(null,i__39088);
var map__39153__$1 = cljs.core.__destructure_map(map__39153);
var src = map__39153__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39153__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39153__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39153__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39153__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e39164){var e_39592 = e39164;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_39592);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_39592.message)].join('')));
}

var G__39593 = seq__39085;
var G__39594 = chunk__39086;
var G__39595 = count__39087;
var G__39596 = (i__39088 + (1));
seq__39085 = G__39593;
chunk__39086 = G__39594;
count__39087 = G__39595;
i__39088 = G__39596;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__39085);
if(temp__5804__auto__){
var seq__39085__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__39085__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__39085__$1);
var G__39597 = cljs.core.chunk_rest(seq__39085__$1);
var G__39598 = c__5568__auto__;
var G__39599 = cljs.core.count(c__5568__auto__);
var G__39600 = (0);
seq__39085 = G__39597;
chunk__39086 = G__39598;
count__39087 = G__39599;
i__39088 = G__39600;
continue;
} else {
var map__39173 = cljs.core.first(seq__39085__$1);
var map__39173__$1 = cljs.core.__destructure_map(map__39173);
var src = map__39173__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39173__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39173__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39173__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39173__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e39174){var e_39601 = e39174;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_39601);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_39601.message)].join('')));
}

var G__39602 = cljs.core.next(seq__39085__$1);
var G__39603 = null;
var G__39604 = (0);
var G__39605 = (0);
seq__39085 = G__39602;
chunk__39086 = G__39603;
count__39087 = G__39604;
i__39088 = G__39605;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (){
return shadow.cljs.devtools.client.browser.do_js_load(sources);
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__39178 = cljs.core.seq(js_requires);
var chunk__39179 = null;
var count__39180 = (0);
var i__39181 = (0);
while(true){
if((i__39181 < count__39180)){
var js_ns = chunk__39179.cljs$core$IIndexed$_nth$arity$2(null,i__39181);
var require_str_39610 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_39610);


var G__39611 = seq__39178;
var G__39612 = chunk__39179;
var G__39613 = count__39180;
var G__39614 = (i__39181 + (1));
seq__39178 = G__39611;
chunk__39179 = G__39612;
count__39180 = G__39613;
i__39181 = G__39614;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__39178);
if(temp__5804__auto__){
var seq__39178__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__39178__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__39178__$1);
var G__39615 = cljs.core.chunk_rest(seq__39178__$1);
var G__39616 = c__5568__auto__;
var G__39617 = cljs.core.count(c__5568__auto__);
var G__39618 = (0);
seq__39178 = G__39615;
chunk__39179 = G__39616;
count__39180 = G__39617;
i__39181 = G__39618;
continue;
} else {
var js_ns = cljs.core.first(seq__39178__$1);
var require_str_39619 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_39619);


var G__39620 = cljs.core.next(seq__39178__$1);
var G__39621 = null;
var G__39622 = (0);
var G__39623 = (0);
seq__39178 = G__39620;
chunk__39179 = G__39621;
count__39180 = G__39622;
i__39181 = G__39623;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__39191){
var map__39192 = p__39191;
var map__39192__$1 = cljs.core.__destructure_map(map__39192);
var msg = map__39192__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39192__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39192__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__39193(s__39194){
return (new cljs.core.LazySeq(null,(function (){
var s__39194__$1 = s__39194;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__39194__$1);
if(temp__5804__auto__){
var xs__6360__auto__ = temp__5804__auto__;
var map__39199 = cljs.core.first(xs__6360__auto__);
var map__39199__$1 = cljs.core.__destructure_map(map__39199);
var src = map__39199__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39199__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39199__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5519__auto__ = ((function (s__39194__$1,map__39199,map__39199__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__39192,map__39192__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__39193_$_iter__39195(s__39196){
return (new cljs.core.LazySeq(null,((function (s__39194__$1,map__39199,map__39199__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__39192,map__39192__$1,msg,info,reload_info){
return (function (){
var s__39196__$1 = s__39196;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__39196__$1);
if(temp__5804__auto____$1){
var s__39196__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__39196__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__39196__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__39198 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__39197 = (0);
while(true){
if((i__39197 < size__5522__auto__)){
var warning = cljs.core._nth(c__5521__auto__,i__39197);
cljs.core.chunk_append(b__39198,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__39624 = (i__39197 + (1));
i__39197 = G__39624;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39198),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__39193_$_iter__39195(cljs.core.chunk_rest(s__39196__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39198),null);
}
} else {
var warning = cljs.core.first(s__39196__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__39193_$_iter__39195(cljs.core.rest(s__39196__$2)));
}
} else {
return null;
}
break;
}
});})(s__39194__$1,map__39199,map__39199__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__39192,map__39192__$1,msg,info,reload_info))
,null,null));
});})(s__39194__$1,map__39199,map__39199__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__39192,map__39192__$1,msg,info,reload_info))
;
var fs__5520__auto__ = cljs.core.seq(iterys__5519__auto__(warnings));
if(fs__5520__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5520__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__39193(cljs.core.rest(s__39194__$1)));
} else {
var G__39633 = cljs.core.rest(s__39194__$1);
s__39194__$1 = G__39633;
continue;
}
} else {
var G__39634 = cljs.core.rest(s__39194__$1);
s__39194__$1 = G__39634;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__39207_39638 = cljs.core.seq(warnings);
var chunk__39208_39639 = null;
var count__39209_39640 = (0);
var i__39210_39641 = (0);
while(true){
if((i__39210_39641 < count__39209_39640)){
var map__39217_39642 = chunk__39208_39639.cljs$core$IIndexed$_nth$arity$2(null,i__39210_39641);
var map__39217_39643__$1 = cljs.core.__destructure_map(map__39217_39642);
var w_39644 = map__39217_39643__$1;
var msg_39645__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39217_39643__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_39646 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39217_39643__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_39647 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39217_39643__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_39648 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39217_39643__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_39648)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_39646),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_39647),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_39645__$1)].join(''));


var G__39649 = seq__39207_39638;
var G__39650 = chunk__39208_39639;
var G__39651 = count__39209_39640;
var G__39652 = (i__39210_39641 + (1));
seq__39207_39638 = G__39649;
chunk__39208_39639 = G__39650;
count__39209_39640 = G__39651;
i__39210_39641 = G__39652;
continue;
} else {
var temp__5804__auto___39653 = cljs.core.seq(seq__39207_39638);
if(temp__5804__auto___39653){
var seq__39207_39654__$1 = temp__5804__auto___39653;
if(cljs.core.chunked_seq_QMARK_(seq__39207_39654__$1)){
var c__5568__auto___39655 = cljs.core.chunk_first(seq__39207_39654__$1);
var G__39656 = cljs.core.chunk_rest(seq__39207_39654__$1);
var G__39657 = c__5568__auto___39655;
var G__39658 = cljs.core.count(c__5568__auto___39655);
var G__39659 = (0);
seq__39207_39638 = G__39656;
chunk__39208_39639 = G__39657;
count__39209_39640 = G__39658;
i__39210_39641 = G__39659;
continue;
} else {
var map__39218_39660 = cljs.core.first(seq__39207_39654__$1);
var map__39218_39661__$1 = cljs.core.__destructure_map(map__39218_39660);
var w_39662 = map__39218_39661__$1;
var msg_39663__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39218_39661__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_39664 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39218_39661__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_39665 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39218_39661__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_39666 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39218_39661__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_39666)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_39664),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_39665),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_39663__$1)].join(''));


var G__39670 = cljs.core.next(seq__39207_39654__$1);
var G__39671 = null;
var G__39672 = (0);
var G__39673 = (0);
seq__39207_39638 = G__39670;
chunk__39208_39639 = G__39671;
count__39209_39640 = G__39672;
i__39210_39641 = G__39673;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__39190_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__39190_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5043__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5043__auto__){
var and__5043__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5043__auto____$1){
return new$;
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__39219){
var map__39220 = p__39219;
var map__39220__$1 = cljs.core.__destructure_map(map__39220);
var msg = map__39220__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39220__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39220__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__39221 = cljs.core.seq(updates);
var chunk__39223 = null;
var count__39224 = (0);
var i__39225 = (0);
while(true){
if((i__39225 < count__39224)){
var path = chunk__39223.cljs$core$IIndexed$_nth$arity$2(null,i__39225);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__39372_39677 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__39376_39678 = null;
var count__39377_39679 = (0);
var i__39378_39680 = (0);
while(true){
if((i__39378_39680 < count__39377_39679)){
var node_39681 = chunk__39376_39678.cljs$core$IIndexed$_nth$arity$2(null,i__39378_39680);
if(cljs.core.not(node_39681.shadow$old)){
var path_match_39682 = shadow.cljs.devtools.client.browser.match_paths(node_39681.getAttribute("href"),path);
if(cljs.core.truth_(path_match_39682)){
var new_link_39686 = (function (){var G__39404 = node_39681.cloneNode(true);
G__39404.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_39682),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__39404;
})();
(node_39681.shadow$old = true);

(new_link_39686.onload = ((function (seq__39372_39677,chunk__39376_39678,count__39377_39679,i__39378_39680,seq__39221,chunk__39223,count__39224,i__39225,new_link_39686,path_match_39682,node_39681,path,map__39220,map__39220__$1,msg,updates,reload_info){
return (function (e){
var seq__39405_39687 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__39407_39688 = null;
var count__39408_39689 = (0);
var i__39409_39690 = (0);
while(true){
if((i__39409_39690 < count__39408_39689)){
var map__39413_39691 = chunk__39407_39688.cljs$core$IIndexed$_nth$arity$2(null,i__39409_39690);
var map__39413_39692__$1 = cljs.core.__destructure_map(map__39413_39691);
var task_39693 = map__39413_39692__$1;
var fn_str_39694 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39413_39692__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39695 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39413_39692__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39696 = goog.getObjectByName(fn_str_39694,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39695)].join(''));

(fn_obj_39696.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39696.cljs$core$IFn$_invoke$arity$2(path,new_link_39686) : fn_obj_39696.call(null,path,new_link_39686));


var G__39697 = seq__39405_39687;
var G__39698 = chunk__39407_39688;
var G__39699 = count__39408_39689;
var G__39700 = (i__39409_39690 + (1));
seq__39405_39687 = G__39697;
chunk__39407_39688 = G__39698;
count__39408_39689 = G__39699;
i__39409_39690 = G__39700;
continue;
} else {
var temp__5804__auto___39701 = cljs.core.seq(seq__39405_39687);
if(temp__5804__auto___39701){
var seq__39405_39702__$1 = temp__5804__auto___39701;
if(cljs.core.chunked_seq_QMARK_(seq__39405_39702__$1)){
var c__5568__auto___39703 = cljs.core.chunk_first(seq__39405_39702__$1);
var G__39704 = cljs.core.chunk_rest(seq__39405_39702__$1);
var G__39705 = c__5568__auto___39703;
var G__39706 = cljs.core.count(c__5568__auto___39703);
var G__39707 = (0);
seq__39405_39687 = G__39704;
chunk__39407_39688 = G__39705;
count__39408_39689 = G__39706;
i__39409_39690 = G__39707;
continue;
} else {
var map__39414_39708 = cljs.core.first(seq__39405_39702__$1);
var map__39414_39709__$1 = cljs.core.__destructure_map(map__39414_39708);
var task_39710 = map__39414_39709__$1;
var fn_str_39711 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39414_39709__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39712 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39414_39709__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39713 = goog.getObjectByName(fn_str_39711,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39712)].join(''));

(fn_obj_39713.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39713.cljs$core$IFn$_invoke$arity$2(path,new_link_39686) : fn_obj_39713.call(null,path,new_link_39686));


var G__39714 = cljs.core.next(seq__39405_39702__$1);
var G__39715 = null;
var G__39716 = (0);
var G__39717 = (0);
seq__39405_39687 = G__39714;
chunk__39407_39688 = G__39715;
count__39408_39689 = G__39716;
i__39409_39690 = G__39717;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_39681);
});})(seq__39372_39677,chunk__39376_39678,count__39377_39679,i__39378_39680,seq__39221,chunk__39223,count__39224,i__39225,new_link_39686,path_match_39682,node_39681,path,map__39220,map__39220__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_39682], 0));

goog.dom.insertSiblingAfter(new_link_39686,node_39681);


var G__39722 = seq__39372_39677;
var G__39723 = chunk__39376_39678;
var G__39724 = count__39377_39679;
var G__39725 = (i__39378_39680 + (1));
seq__39372_39677 = G__39722;
chunk__39376_39678 = G__39723;
count__39377_39679 = G__39724;
i__39378_39680 = G__39725;
continue;
} else {
var G__39726 = seq__39372_39677;
var G__39727 = chunk__39376_39678;
var G__39728 = count__39377_39679;
var G__39729 = (i__39378_39680 + (1));
seq__39372_39677 = G__39726;
chunk__39376_39678 = G__39727;
count__39377_39679 = G__39728;
i__39378_39680 = G__39729;
continue;
}
} else {
var G__39730 = seq__39372_39677;
var G__39731 = chunk__39376_39678;
var G__39732 = count__39377_39679;
var G__39733 = (i__39378_39680 + (1));
seq__39372_39677 = G__39730;
chunk__39376_39678 = G__39731;
count__39377_39679 = G__39732;
i__39378_39680 = G__39733;
continue;
}
} else {
var temp__5804__auto___39734 = cljs.core.seq(seq__39372_39677);
if(temp__5804__auto___39734){
var seq__39372_39735__$1 = temp__5804__auto___39734;
if(cljs.core.chunked_seq_QMARK_(seq__39372_39735__$1)){
var c__5568__auto___39736 = cljs.core.chunk_first(seq__39372_39735__$1);
var G__39737 = cljs.core.chunk_rest(seq__39372_39735__$1);
var G__39738 = c__5568__auto___39736;
var G__39739 = cljs.core.count(c__5568__auto___39736);
var G__39740 = (0);
seq__39372_39677 = G__39737;
chunk__39376_39678 = G__39738;
count__39377_39679 = G__39739;
i__39378_39680 = G__39740;
continue;
} else {
var node_39741 = cljs.core.first(seq__39372_39735__$1);
if(cljs.core.not(node_39741.shadow$old)){
var path_match_39742 = shadow.cljs.devtools.client.browser.match_paths(node_39741.getAttribute("href"),path);
if(cljs.core.truth_(path_match_39742)){
var new_link_39743 = (function (){var G__39416 = node_39741.cloneNode(true);
G__39416.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_39742),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__39416;
})();
(node_39741.shadow$old = true);

(new_link_39743.onload = ((function (seq__39372_39677,chunk__39376_39678,count__39377_39679,i__39378_39680,seq__39221,chunk__39223,count__39224,i__39225,new_link_39743,path_match_39742,node_39741,seq__39372_39735__$1,temp__5804__auto___39734,path,map__39220,map__39220__$1,msg,updates,reload_info){
return (function (e){
var seq__39420_39744 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__39422_39745 = null;
var count__39423_39746 = (0);
var i__39424_39747 = (0);
while(true){
if((i__39424_39747 < count__39423_39746)){
var map__39432_39748 = chunk__39422_39745.cljs$core$IIndexed$_nth$arity$2(null,i__39424_39747);
var map__39432_39749__$1 = cljs.core.__destructure_map(map__39432_39748);
var task_39750 = map__39432_39749__$1;
var fn_str_39751 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39432_39749__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39752 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39432_39749__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39753 = goog.getObjectByName(fn_str_39751,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39752)].join(''));

(fn_obj_39753.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39753.cljs$core$IFn$_invoke$arity$2(path,new_link_39743) : fn_obj_39753.call(null,path,new_link_39743));


var G__39754 = seq__39420_39744;
var G__39755 = chunk__39422_39745;
var G__39756 = count__39423_39746;
var G__39757 = (i__39424_39747 + (1));
seq__39420_39744 = G__39754;
chunk__39422_39745 = G__39755;
count__39423_39746 = G__39756;
i__39424_39747 = G__39757;
continue;
} else {
var temp__5804__auto___39758__$1 = cljs.core.seq(seq__39420_39744);
if(temp__5804__auto___39758__$1){
var seq__39420_39759__$1 = temp__5804__auto___39758__$1;
if(cljs.core.chunked_seq_QMARK_(seq__39420_39759__$1)){
var c__5568__auto___39760 = cljs.core.chunk_first(seq__39420_39759__$1);
var G__39761 = cljs.core.chunk_rest(seq__39420_39759__$1);
var G__39762 = c__5568__auto___39760;
var G__39763 = cljs.core.count(c__5568__auto___39760);
var G__39764 = (0);
seq__39420_39744 = G__39761;
chunk__39422_39745 = G__39762;
count__39423_39746 = G__39763;
i__39424_39747 = G__39764;
continue;
} else {
var map__39433_39765 = cljs.core.first(seq__39420_39759__$1);
var map__39433_39766__$1 = cljs.core.__destructure_map(map__39433_39765);
var task_39767 = map__39433_39766__$1;
var fn_str_39768 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39433_39766__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39769 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39433_39766__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39770 = goog.getObjectByName(fn_str_39768,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39769)].join(''));

(fn_obj_39770.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39770.cljs$core$IFn$_invoke$arity$2(path,new_link_39743) : fn_obj_39770.call(null,path,new_link_39743));


var G__39771 = cljs.core.next(seq__39420_39759__$1);
var G__39772 = null;
var G__39773 = (0);
var G__39774 = (0);
seq__39420_39744 = G__39771;
chunk__39422_39745 = G__39772;
count__39423_39746 = G__39773;
i__39424_39747 = G__39774;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_39741);
});})(seq__39372_39677,chunk__39376_39678,count__39377_39679,i__39378_39680,seq__39221,chunk__39223,count__39224,i__39225,new_link_39743,path_match_39742,node_39741,seq__39372_39735__$1,temp__5804__auto___39734,path,map__39220,map__39220__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_39742], 0));

goog.dom.insertSiblingAfter(new_link_39743,node_39741);


var G__39775 = cljs.core.next(seq__39372_39735__$1);
var G__39776 = null;
var G__39777 = (0);
var G__39778 = (0);
seq__39372_39677 = G__39775;
chunk__39376_39678 = G__39776;
count__39377_39679 = G__39777;
i__39378_39680 = G__39778;
continue;
} else {
var G__39779 = cljs.core.next(seq__39372_39735__$1);
var G__39780 = null;
var G__39781 = (0);
var G__39782 = (0);
seq__39372_39677 = G__39779;
chunk__39376_39678 = G__39780;
count__39377_39679 = G__39781;
i__39378_39680 = G__39782;
continue;
}
} else {
var G__39791 = cljs.core.next(seq__39372_39735__$1);
var G__39792 = null;
var G__39793 = (0);
var G__39794 = (0);
seq__39372_39677 = G__39791;
chunk__39376_39678 = G__39792;
count__39377_39679 = G__39793;
i__39378_39680 = G__39794;
continue;
}
}
} else {
}
}
break;
}


var G__39795 = seq__39221;
var G__39796 = chunk__39223;
var G__39797 = count__39224;
var G__39798 = (i__39225 + (1));
seq__39221 = G__39795;
chunk__39223 = G__39796;
count__39224 = G__39797;
i__39225 = G__39798;
continue;
} else {
var G__39799 = seq__39221;
var G__39800 = chunk__39223;
var G__39801 = count__39224;
var G__39802 = (i__39225 + (1));
seq__39221 = G__39799;
chunk__39223 = G__39800;
count__39224 = G__39801;
i__39225 = G__39802;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__39221);
if(temp__5804__auto__){
var seq__39221__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__39221__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__39221__$1);
var G__39806 = cljs.core.chunk_rest(seq__39221__$1);
var G__39807 = c__5568__auto__;
var G__39808 = cljs.core.count(c__5568__auto__);
var G__39809 = (0);
seq__39221 = G__39806;
chunk__39223 = G__39807;
count__39224 = G__39808;
i__39225 = G__39809;
continue;
} else {
var path = cljs.core.first(seq__39221__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__39436_39810 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__39442_39811 = null;
var count__39443_39812 = (0);
var i__39444_39813 = (0);
while(true){
if((i__39444_39813 < count__39443_39812)){
var node_39814 = chunk__39442_39811.cljs$core$IIndexed$_nth$arity$2(null,i__39444_39813);
if(cljs.core.not(node_39814.shadow$old)){
var path_match_39815 = shadow.cljs.devtools.client.browser.match_paths(node_39814.getAttribute("href"),path);
if(cljs.core.truth_(path_match_39815)){
var new_link_39816 = (function (){var G__39483 = node_39814.cloneNode(true);
G__39483.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_39815),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__39483;
})();
(node_39814.shadow$old = true);

(new_link_39816.onload = ((function (seq__39436_39810,chunk__39442_39811,count__39443_39812,i__39444_39813,seq__39221,chunk__39223,count__39224,i__39225,new_link_39816,path_match_39815,node_39814,path,seq__39221__$1,temp__5804__auto__,map__39220,map__39220__$1,msg,updates,reload_info){
return (function (e){
var seq__39484_39817 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__39486_39818 = null;
var count__39487_39819 = (0);
var i__39488_39820 = (0);
while(true){
if((i__39488_39820 < count__39487_39819)){
var map__39496_39821 = chunk__39486_39818.cljs$core$IIndexed$_nth$arity$2(null,i__39488_39820);
var map__39496_39822__$1 = cljs.core.__destructure_map(map__39496_39821);
var task_39823 = map__39496_39822__$1;
var fn_str_39824 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39496_39822__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39825 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39496_39822__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39829 = goog.getObjectByName(fn_str_39824,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39825)].join(''));

(fn_obj_39829.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39829.cljs$core$IFn$_invoke$arity$2(path,new_link_39816) : fn_obj_39829.call(null,path,new_link_39816));


var G__39830 = seq__39484_39817;
var G__39831 = chunk__39486_39818;
var G__39832 = count__39487_39819;
var G__39833 = (i__39488_39820 + (1));
seq__39484_39817 = G__39830;
chunk__39486_39818 = G__39831;
count__39487_39819 = G__39832;
i__39488_39820 = G__39833;
continue;
} else {
var temp__5804__auto___39834__$1 = cljs.core.seq(seq__39484_39817);
if(temp__5804__auto___39834__$1){
var seq__39484_39835__$1 = temp__5804__auto___39834__$1;
if(cljs.core.chunked_seq_QMARK_(seq__39484_39835__$1)){
var c__5568__auto___39836 = cljs.core.chunk_first(seq__39484_39835__$1);
var G__39837 = cljs.core.chunk_rest(seq__39484_39835__$1);
var G__39838 = c__5568__auto___39836;
var G__39839 = cljs.core.count(c__5568__auto___39836);
var G__39840 = (0);
seq__39484_39817 = G__39837;
chunk__39486_39818 = G__39838;
count__39487_39819 = G__39839;
i__39488_39820 = G__39840;
continue;
} else {
var map__39497_39841 = cljs.core.first(seq__39484_39835__$1);
var map__39497_39842__$1 = cljs.core.__destructure_map(map__39497_39841);
var task_39843 = map__39497_39842__$1;
var fn_str_39844 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39497_39842__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39845 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39497_39842__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39846 = goog.getObjectByName(fn_str_39844,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39845)].join(''));

(fn_obj_39846.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39846.cljs$core$IFn$_invoke$arity$2(path,new_link_39816) : fn_obj_39846.call(null,path,new_link_39816));


var G__39850 = cljs.core.next(seq__39484_39835__$1);
var G__39851 = null;
var G__39852 = (0);
var G__39853 = (0);
seq__39484_39817 = G__39850;
chunk__39486_39818 = G__39851;
count__39487_39819 = G__39852;
i__39488_39820 = G__39853;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_39814);
});})(seq__39436_39810,chunk__39442_39811,count__39443_39812,i__39444_39813,seq__39221,chunk__39223,count__39224,i__39225,new_link_39816,path_match_39815,node_39814,path,seq__39221__$1,temp__5804__auto__,map__39220,map__39220__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_39815], 0));

goog.dom.insertSiblingAfter(new_link_39816,node_39814);


var G__39854 = seq__39436_39810;
var G__39855 = chunk__39442_39811;
var G__39856 = count__39443_39812;
var G__39857 = (i__39444_39813 + (1));
seq__39436_39810 = G__39854;
chunk__39442_39811 = G__39855;
count__39443_39812 = G__39856;
i__39444_39813 = G__39857;
continue;
} else {
var G__39858 = seq__39436_39810;
var G__39859 = chunk__39442_39811;
var G__39860 = count__39443_39812;
var G__39861 = (i__39444_39813 + (1));
seq__39436_39810 = G__39858;
chunk__39442_39811 = G__39859;
count__39443_39812 = G__39860;
i__39444_39813 = G__39861;
continue;
}
} else {
var G__39862 = seq__39436_39810;
var G__39863 = chunk__39442_39811;
var G__39864 = count__39443_39812;
var G__39865 = (i__39444_39813 + (1));
seq__39436_39810 = G__39862;
chunk__39442_39811 = G__39863;
count__39443_39812 = G__39864;
i__39444_39813 = G__39865;
continue;
}
} else {
var temp__5804__auto___39866__$1 = cljs.core.seq(seq__39436_39810);
if(temp__5804__auto___39866__$1){
var seq__39436_39867__$1 = temp__5804__auto___39866__$1;
if(cljs.core.chunked_seq_QMARK_(seq__39436_39867__$1)){
var c__5568__auto___39868 = cljs.core.chunk_first(seq__39436_39867__$1);
var G__39869 = cljs.core.chunk_rest(seq__39436_39867__$1);
var G__39870 = c__5568__auto___39868;
var G__39871 = cljs.core.count(c__5568__auto___39868);
var G__39872 = (0);
seq__39436_39810 = G__39869;
chunk__39442_39811 = G__39870;
count__39443_39812 = G__39871;
i__39444_39813 = G__39872;
continue;
} else {
var node_39873 = cljs.core.first(seq__39436_39867__$1);
if(cljs.core.not(node_39873.shadow$old)){
var path_match_39874 = shadow.cljs.devtools.client.browser.match_paths(node_39873.getAttribute("href"),path);
if(cljs.core.truth_(path_match_39874)){
var new_link_39875 = (function (){var G__39498 = node_39873.cloneNode(true);
G__39498.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_39874),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__39498;
})();
(node_39873.shadow$old = true);

(new_link_39875.onload = ((function (seq__39436_39810,chunk__39442_39811,count__39443_39812,i__39444_39813,seq__39221,chunk__39223,count__39224,i__39225,new_link_39875,path_match_39874,node_39873,seq__39436_39867__$1,temp__5804__auto___39866__$1,path,seq__39221__$1,temp__5804__auto__,map__39220,map__39220__$1,msg,updates,reload_info){
return (function (e){
var seq__39503_39879 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__39505_39880 = null;
var count__39506_39881 = (0);
var i__39507_39882 = (0);
while(true){
if((i__39507_39882 < count__39506_39881)){
var map__39511_39883 = chunk__39505_39880.cljs$core$IIndexed$_nth$arity$2(null,i__39507_39882);
var map__39511_39884__$1 = cljs.core.__destructure_map(map__39511_39883);
var task_39885 = map__39511_39884__$1;
var fn_str_39886 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39511_39884__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39887 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39511_39884__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39888 = goog.getObjectByName(fn_str_39886,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39887)].join(''));

(fn_obj_39888.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39888.cljs$core$IFn$_invoke$arity$2(path,new_link_39875) : fn_obj_39888.call(null,path,new_link_39875));


var G__39889 = seq__39503_39879;
var G__39890 = chunk__39505_39880;
var G__39891 = count__39506_39881;
var G__39892 = (i__39507_39882 + (1));
seq__39503_39879 = G__39889;
chunk__39505_39880 = G__39890;
count__39506_39881 = G__39891;
i__39507_39882 = G__39892;
continue;
} else {
var temp__5804__auto___39893__$2 = cljs.core.seq(seq__39503_39879);
if(temp__5804__auto___39893__$2){
var seq__39503_39894__$1 = temp__5804__auto___39893__$2;
if(cljs.core.chunked_seq_QMARK_(seq__39503_39894__$1)){
var c__5568__auto___39895 = cljs.core.chunk_first(seq__39503_39894__$1);
var G__39896 = cljs.core.chunk_rest(seq__39503_39894__$1);
var G__39897 = c__5568__auto___39895;
var G__39898 = cljs.core.count(c__5568__auto___39895);
var G__39899 = (0);
seq__39503_39879 = G__39896;
chunk__39505_39880 = G__39897;
count__39506_39881 = G__39898;
i__39507_39882 = G__39899;
continue;
} else {
var map__39512_39900 = cljs.core.first(seq__39503_39894__$1);
var map__39512_39901__$1 = cljs.core.__destructure_map(map__39512_39900);
var task_39902 = map__39512_39901__$1;
var fn_str_39903 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39512_39901__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_39904 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39512_39901__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_39905 = goog.getObjectByName(fn_str_39903,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_39904)].join(''));

(fn_obj_39905.cljs$core$IFn$_invoke$arity$2 ? fn_obj_39905.cljs$core$IFn$_invoke$arity$2(path,new_link_39875) : fn_obj_39905.call(null,path,new_link_39875));


var G__39906 = cljs.core.next(seq__39503_39894__$1);
var G__39907 = null;
var G__39908 = (0);
var G__39909 = (0);
seq__39503_39879 = G__39906;
chunk__39505_39880 = G__39907;
count__39506_39881 = G__39908;
i__39507_39882 = G__39909;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_39873);
});})(seq__39436_39810,chunk__39442_39811,count__39443_39812,i__39444_39813,seq__39221,chunk__39223,count__39224,i__39225,new_link_39875,path_match_39874,node_39873,seq__39436_39867__$1,temp__5804__auto___39866__$1,path,seq__39221__$1,temp__5804__auto__,map__39220,map__39220__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_39874], 0));

goog.dom.insertSiblingAfter(new_link_39875,node_39873);


var G__39910 = cljs.core.next(seq__39436_39867__$1);
var G__39911 = null;
var G__39912 = (0);
var G__39913 = (0);
seq__39436_39810 = G__39910;
chunk__39442_39811 = G__39911;
count__39443_39812 = G__39912;
i__39444_39813 = G__39913;
continue;
} else {
var G__39914 = cljs.core.next(seq__39436_39867__$1);
var G__39915 = null;
var G__39916 = (0);
var G__39917 = (0);
seq__39436_39810 = G__39914;
chunk__39442_39811 = G__39915;
count__39443_39812 = G__39916;
i__39444_39813 = G__39917;
continue;
}
} else {
var G__39918 = cljs.core.next(seq__39436_39867__$1);
var G__39919 = null;
var G__39920 = (0);
var G__39921 = (0);
seq__39436_39810 = G__39918;
chunk__39442_39811 = G__39919;
count__39443_39812 = G__39920;
i__39444_39813 = G__39921;
continue;
}
}
} else {
}
}
break;
}


var G__39922 = cljs.core.next(seq__39221__$1);
var G__39923 = null;
var G__39924 = (0);
var G__39925 = (0);
seq__39221 = G__39922;
chunk__39223 = G__39923;
count__39224 = G__39924;
i__39225 = G__39925;
continue;
} else {
var G__39926 = cljs.core.next(seq__39221__$1);
var G__39927 = null;
var G__39928 = (0);
var G__39929 = (0);
seq__39221 = G__39926;
chunk__39223 = G__39927;
count__39224 = G__39928;
i__39225 = G__39929;
continue;
}
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.repl_init = (function shadow$cljs$devtools$client$browser$repl_init(runtime,p__39513){
var map__39514 = p__39513;
var map__39514__$1 = cljs.core.__destructure_map(map__39514);
var repl_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39514__$1,new cljs.core.Keyword(null,"repl-state","repl-state",-1733780387));
return shadow.cljs.devtools.client.shared.load_sources(runtime,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535).cljs$core$IFn$_invoke$arity$1(repl_state))),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return shadow.cljs.devtools.client.browser.devtools_msg("ready!");
}));
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$2 = (function (this$,code){
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(code);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$2 = (function (this$,p__39521){
var map__39522 = p__39521;
var map__39522__$1 = cljs.core.__destructure_map(map__39522);
var _ = map__39522__$1;
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39522__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__39523,done,error){
var map__39524 = p__39523;
var map__39524__$1 = cljs.core.__destructure_map(map__39524);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39524__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__39526,done,error){
var map__39527 = p__39526;
var map__39527__$1 = cljs.core.__destructure_map(map__39527);
var msg = map__39527__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39527__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39527__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39527__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__39529){
var map__39530 = p__39529;
var map__39530__$1 = cljs.core.__destructure_map(map__39530);
var src = map__39530__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39530__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5043__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5043__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__39531 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__39531) : done.call(null,G__39531));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__39532){
var map__39533 = p__39532;
var map__39533__$1 = cljs.core.__destructure_map(map__39533);
var msg__$1 = map__39533__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39533__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e39534){var ex = e39534;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__39535){
var map__39536 = p__39535;
var map__39536__$1 = cljs.core.__destructure_map(map__39536);
var env = map__39536__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39536__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-runtime-init","cljs-runtime-init",1305890232),(function (msg){
return shadow.cljs.devtools.client.browser.repl_init(runtime,msg);
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__39565){
var map__39566 = p__39565;
var map__39566__$1 = cljs.core.__destructure_map(map__39566);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39566__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39566__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__39567){
var map__39568 = p__39567;
var map__39568__$1 = cljs.core.__destructure_map(map__39568);
var svc = map__39568__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39568__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
