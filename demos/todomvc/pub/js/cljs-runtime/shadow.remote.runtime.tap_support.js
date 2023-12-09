goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__37514,p__37515){
var map__37516 = p__37514;
var map__37516__$1 = cljs.core.__destructure_map(map__37516);
var svc = map__37516__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37516__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37516__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37516__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__37517 = p__37515;
var map__37517__$1 = cljs.core.__destructure_map(map__37517);
var msg = map__37517__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37517__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37517__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37517__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__37517__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history__$1)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__37542,p__37543){
var map__37547 = p__37542;
var map__37547__$1 = cljs.core.__destructure_map(map__37547);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37547__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__37548 = p__37543;
var map__37548__$1 = cljs.core.__destructure_map(map__37548);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37548__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__37559,p__37560){
var map__37561 = p__37559;
var map__37561__$1 = cljs.core.__destructure_map(map__37561);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37561__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37561__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__37562 = p__37560;
var map__37562__$1 = cljs.core.__destructure_map(map__37562);
var msg = map__37562__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__37562__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__37565,tid){
var map__37567 = p__37565;
var map__37567__$1 = cljs.core.__destructure_map(map__37567);
var svc = map__37567__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37567__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__37576 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__37577 = null;
var count__37578 = (0);
var i__37579 = (0);
while(true){
if((i__37579 < count__37578)){
var vec__37586 = chunk__37577.cljs$core$IIndexed$_nth$arity$2(null,i__37579);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37586,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37586,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__37599 = seq__37576;
var G__37600 = chunk__37577;
var G__37601 = count__37578;
var G__37602 = (i__37579 + (1));
seq__37576 = G__37599;
chunk__37577 = G__37600;
count__37578 = G__37601;
i__37579 = G__37602;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__37576);
if(temp__5804__auto__){
var seq__37576__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37576__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__37576__$1);
var G__37603 = cljs.core.chunk_rest(seq__37576__$1);
var G__37604 = c__5568__auto__;
var G__37605 = cljs.core.count(c__5568__auto__);
var G__37606 = (0);
seq__37576 = G__37603;
chunk__37577 = G__37604;
count__37578 = G__37605;
i__37579 = G__37606;
continue;
} else {
var vec__37589 = cljs.core.first(seq__37576__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37589,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37589,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__37608 = cljs.core.next(seq__37576__$1);
var G__37609 = null;
var G__37610 = (0);
var G__37611 = (0);
seq__37576 = G__37608;
chunk__37577 = G__37609;
count__37578 = G__37610;
i__37579 = G__37611;
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
});
var svc = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229),obj_support,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461),tap_fn,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911),subs_ref], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__37571_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__37571_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__37572_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__37572_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__37573_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__37573_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__37574_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__37574_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__37594){
var map__37595 = p__37594;
var map__37595__$1 = cljs.core.__destructure_map(map__37595);
var svc = map__37595__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37595__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37595__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map
