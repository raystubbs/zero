goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__33590){
var map__33591 = p__33590;
var map__33591__$1 = cljs.core.__destructure_map(map__33591);
var runtime = map__33591__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33591__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5045__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
var self_id_33741 = shadow.remote.runtime.shared.get_client_id(runtime);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(msg),self_id_33741)){
shadow.remote.runtime.api.relay_msg(runtime,msg);
} else {
Promise.resolve((1)).then((function (){
var G__33598 = runtime;
var G__33599 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"from","from",1815293044),self_id_33741);
return (shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2 ? shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2(G__33598,G__33599) : shadow.remote.runtime.shared.process.call(null,G__33598,G__33599));
}));
}

return msg;
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__33606,res){
var map__33607 = p__33606;
var map__33607__$1 = cljs.core.__destructure_map(map__33607);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33607__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33607__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__33608 = res;
var G__33608__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__33608,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__33608);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__33608__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__33608__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__33619 = arguments.length;
switch (G__33619) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__33631,msg,handlers,timeout_after_ms){
var map__33632 = p__33631;
var map__33632__$1 = cljs.core.__destructure_map(map__33632);
var runtime = map__33632__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33632__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
if(cljs.core.map_QMARK_(msg)){
} else {
throw (new Error("Assert failed: (map? msg)"));
}

if(cljs.core.map_QMARK_(handlers)){
} else {
throw (new Error("Assert failed: (map? handlers)"));
}

if(cljs.core.nat_int_QMARK_(timeout_after_ms)){
} else {
throw (new Error("Assert failed: (nat-int? timeout-after-ms)"));
}

var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___33749 = arguments.length;
var i__5770__auto___33750 = (0);
while(true){
if((i__5770__auto___33750 < len__5769__auto___33749)){
args__5775__auto__.push((arguments[i__5770__auto___33750]));

var G__33751 = (i__5770__auto___33750 + (1));
i__5770__auto___33750 = G__33751;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__33653,ev,args){
var map__33654 = p__33653;
var map__33654__$1 = cljs.core.__destructure_map(map__33654);
var runtime = map__33654__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33654__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__33660 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__33663 = null;
var count__33664 = (0);
var i__33665 = (0);
while(true){
if((i__33665 < count__33664)){
var ext = chunk__33663.cljs$core$IIndexed$_nth$arity$2(null,i__33665);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__33753 = seq__33660;
var G__33754 = chunk__33663;
var G__33755 = count__33664;
var G__33756 = (i__33665 + (1));
seq__33660 = G__33753;
chunk__33663 = G__33754;
count__33664 = G__33755;
i__33665 = G__33756;
continue;
} else {
var G__33757 = seq__33660;
var G__33758 = chunk__33663;
var G__33759 = count__33664;
var G__33760 = (i__33665 + (1));
seq__33660 = G__33757;
chunk__33663 = G__33758;
count__33664 = G__33759;
i__33665 = G__33760;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__33660);
if(temp__5804__auto__){
var seq__33660__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__33660__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__33660__$1);
var G__33761 = cljs.core.chunk_rest(seq__33660__$1);
var G__33762 = c__5568__auto__;
var G__33763 = cljs.core.count(c__5568__auto__);
var G__33764 = (0);
seq__33660 = G__33761;
chunk__33663 = G__33762;
count__33664 = G__33763;
i__33665 = G__33764;
continue;
} else {
var ext = cljs.core.first(seq__33660__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__33765 = cljs.core.next(seq__33660__$1);
var G__33766 = null;
var G__33767 = (0);
var G__33768 = (0);
seq__33660 = G__33765;
chunk__33663 = G__33766;
count__33664 = G__33767;
i__33665 = G__33768;
continue;
} else {
var G__33769 = cljs.core.next(seq__33660__$1);
var G__33770 = null;
var G__33771 = (0);
var G__33772 = (0);
seq__33660 = G__33769;
chunk__33663 = G__33770;
count__33664 = G__33771;
i__33665 = G__33772;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq33646){
var G__33647 = cljs.core.first(seq33646);
var seq33646__$1 = cljs.core.next(seq33646);
var G__33648 = cljs.core.first(seq33646__$1);
var seq33646__$2 = cljs.core.next(seq33646__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__33647,G__33648,seq33646__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__33689,p__33690){
var map__33691 = p__33689;
var map__33691__$1 = cljs.core.__destructure_map(map__33691);
var runtime = map__33691__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33691__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__33692 = p__33690;
var map__33692__$1 = cljs.core.__destructure_map(map__33692);
var msg = map__33692__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33692__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id);

var map__33693 = cljs.core.deref(state_ref);
var map__33693__$1 = cljs.core.__destructure_map(map__33693);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33693__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33693__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__33694,msg){
var map__33695 = p__33694;
var map__33695__$1 = cljs.core.__destructure_map(map__33695);
var runtime = map__33695__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33695__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__33696,key,p__33697){
var map__33698 = p__33696;
var map__33698__$1 = cljs.core.__destructure_map(map__33698);
var state = map__33698__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33698__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__33699 = p__33697;
var map__33699__$1 = cljs.core.__destructure_map(map__33699);
var spec = map__33699__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33699__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__33700,key,spec){
var map__33701 = p__33700;
var map__33701__$1 = cljs.core.__destructure_map(map__33701);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33701__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__33702_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__33702_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__33703_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__33703_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__33704_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__33704_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__33705_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__33705_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__33706_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__33706_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__33707,key){
var map__33708 = p__33707;
var map__33708__$1 = cljs.core.__destructure_map(map__33708);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33708__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__33709,msg){
var map__33710 = p__33709;
var map__33710__$1 = cljs.core.__destructure_map(map__33710);
var runtime = map__33710__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33710__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__33711,p__33712){
var map__33713 = p__33711;
var map__33713__$1 = cljs.core.__destructure_map(map__33713);
var runtime = map__33713__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33713__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__33714 = p__33712;
var map__33714__$1 = cljs.core.__destructure_map(map__33714);
var msg = map__33714__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33714__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33714__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null,msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__33723 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__33725 = null;
var count__33726 = (0);
var i__33727 = (0);
while(true){
if((i__33727 < count__33726)){
var map__33733 = chunk__33725.cljs$core$IIndexed$_nth$arity$2(null,i__33727);
var map__33733__$1 = cljs.core.__destructure_map(map__33733);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33733__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__33777 = seq__33723;
var G__33778 = chunk__33725;
var G__33779 = count__33726;
var G__33780 = (i__33727 + (1));
seq__33723 = G__33777;
chunk__33725 = G__33778;
count__33726 = G__33779;
i__33727 = G__33780;
continue;
} else {
var G__33781 = seq__33723;
var G__33782 = chunk__33725;
var G__33783 = count__33726;
var G__33784 = (i__33727 + (1));
seq__33723 = G__33781;
chunk__33725 = G__33782;
count__33726 = G__33783;
i__33727 = G__33784;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__33723);
if(temp__5804__auto__){
var seq__33723__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__33723__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__33723__$1);
var G__33785 = cljs.core.chunk_rest(seq__33723__$1);
var G__33786 = c__5568__auto__;
var G__33787 = cljs.core.count(c__5568__auto__);
var G__33788 = (0);
seq__33723 = G__33785;
chunk__33725 = G__33786;
count__33726 = G__33787;
i__33727 = G__33788;
continue;
} else {
var map__33735 = cljs.core.first(seq__33723__$1);
var map__33735__$1 = cljs.core.__destructure_map(map__33735);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__33735__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__33789 = cljs.core.next(seq__33723__$1);
var G__33790 = null;
var G__33791 = (0);
var G__33792 = (0);
seq__33723 = G__33789;
chunk__33725 = G__33790;
count__33726 = G__33791;
i__33727 = G__33792;
continue;
} else {
var G__33793 = cljs.core.next(seq__33723__$1);
var G__33794 = null;
var G__33795 = (0);
var G__33796 = (0);
seq__33723 = G__33793;
chunk__33725 = G__33794;
count__33726 = G__33795;
i__33727 = G__33796;
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

//# sourceMappingURL=shadow.remote.runtime.shared.js.map
