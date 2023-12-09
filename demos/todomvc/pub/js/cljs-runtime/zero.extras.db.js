goog.provide('zero.extras.db');
if((typeof zero !== 'undefined') && (typeof zero.extras !== 'undefined') && (typeof zero.extras.db !== 'undefined') && (typeof zero.extras.db._BANG_db !== 'undefined')){
} else {
zero.extras.db._BANG_db = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof zero !== 'undefined') && (typeof zero.extras !== 'undefined') && (typeof zero.extras.db !== 'undefined') && (typeof zero.extras.db._BANG_db_watches !== 'undefined')){
} else {
zero.extras.db._BANG_db_watches = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
zero.core.reg_stream.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("ze.db","path","ze.db/path",-404335587),(function() { 
var G__41317__delegate = function (rx,path,p__40961){
var map__40964 = p__40961;
var map__40964__$1 = cljs.core.__destructure_map(map__40964);
var transform = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40964__$1,new cljs.core.Keyword(null,"transform","transform",1381301764));
var path__$1 = cljs.core.vec(path);
var watch_node_path = ((cljs.core.empty_QMARK_(path__$1))?cljs.core.PersistentVector.EMPTY:cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025)], null),cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sub","sub",-2093760025),path__$1)));
var rx__$1 = ((cljs.core.ifn_QMARK_(transform))?cljs.core.comp.cljs$core$IFn$_invoke$arity$2(rx,transform):rx);
var G__40969_41318 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db),path__$1);
(rx__$1.cljs$core$IFn$_invoke$arity$1 ? rx__$1.cljs$core$IFn$_invoke$arity$1(G__40969_41318) : rx__$1.call(null,G__40969_41318));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(zero.extras.db._BANG_db_watches,cljs.core.update_in,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(watch_node_path,new cljs.core.Keyword(null,"rxs","rxs",1314602772)),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([rx__$1], 0));

return (function zero$extras$db$db_stream_cleanup(){
var watch_node = cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db_watches),watch_node_path),new cljs.core.Keyword(null,"rxs","rxs",1314602772),cljs.core.disj,rx__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.extras.db._BANG_db_watches,cljs.core.assoc_in,watch_node_path,watch_node);

var cur_watch_node = watch_node;
var cur_watch_path = watch_node_path;
while(true){
if(((cljs.core.seq(cur_watch_path)) && (((cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"rxs","rxs",1314602772).cljs$core$IFn$_invoke$arity$1(cur_watch_node))) && (cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"sub","sub",-2093760025).cljs$core$IFn$_invoke$arity$1(cur_watch_node))))))){
var parent_watch_path = cljs.core.pop(cljs.core.pop(cur_watch_path));
var parent_watch_node = cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db_watches),parent_watch_path),new cljs.core.Keyword(null,"sub","sub",-2093760025),cljs.core.dissoc,cljs.core.peek(cur_watch_path));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.extras.db._BANG_db_watches,cljs.core.assoc,parent_watch_path,parent_watch_node);

var G__41336 = parent_watch_node;
var G__41337 = parent_watch_path;
cur_watch_node = G__41336;
cur_watch_path = G__41337;
continue;
} else {
return null;

}
break;
}
});
};
var G__41317 = function (rx,path,var_args){
var p__40961 = null;
if (arguments.length > 2) {
var G__41342__i = 0, G__41342__a = new Array(arguments.length -  2);
while (G__41342__i < G__41342__a.length) {G__41342__a[G__41342__i] = arguments[G__41342__i + 2]; ++G__41342__i;}
  p__40961 = new cljs.core.IndexedSeq(G__41342__a,0,null);
} 
return G__41317__delegate.call(this,rx,path,p__40961);};
G__41317.cljs$lang$maxFixedArity = 2;
G__41317.cljs$lang$applyTo = (function (arglist__41347){
var rx = cljs.core.first(arglist__41347);
arglist__41347 = cljs.core.next(arglist__41347);
var path = cljs.core.first(arglist__41347);
var p__40961 = cljs.core.rest(arglist__41347);
return G__41317__delegate(rx,path,p__40961);
});
G__41317.cljs$core$IFn$_invoke$arity$variadic = G__41317__delegate;
return G__41317;
})()
], 0));
zero.extras.db.get = (function zero$extras$db$get(path){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db),path);
});
zero.core.reg_injector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("ze.db","path","ze.db/path",-404335587),(function (_,path){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db),path);
})], 0));
zero.extras.db.super_paths = (function zero$extras$db$super_paths(path){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__41060_SHARP_){
return cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(path,(0),p1__41060_SHARP_);
}),cljs.core.range.cljs$core$IFn$_invoke$arity$2((0),cljs.core.count(path)));
});
zero.extras.db.watched_sub_paths = (function zero$extras$db$watched_sub_paths(path){
var collect_all_sub_paths = (function zero$extras$db$watched_sub_paths_$_collect_all_sub_paths(cur_path,watch_node){
return cljs.core.cons(cur_path,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__41130){
var vec__41131 = p__41130;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41131,(0),null);
var sub_node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41131,(1),null);
return zero$extras$db$watched_sub_paths_$_collect_all_sub_paths(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cur_path,k),sub_node);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"sub","sub",-2093760025).cljs$core$IFn$_invoke$arity$1(watch_node)], 0)));
});
return collect_all_sub_paths(path,((cljs.core.empty_QMARK_(path))?cljs.core.deref(zero.extras.db._BANG_db_watches):cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sub","sub",-2093760025).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(zero.extras.db._BANG_db_watches)),cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sub","sub",-2093760025),path))));
});
zero.extras.db.paths_affected_by_change_to = (function zero$extras$db$paths_affected_by_change_to(path){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(zero.extras.db.super_paths(path),zero.extras.db.watched_sub_paths(path));
});
zero.extras.db.apply_patch = (function zero$extras$db$apply_patch(db,patch){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p__41150,p__41151){
var vec__41152 = p__41150;
var db_agg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41152,(0),null);
var affected_paths_agg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41152,(1),null);
var map__41155 = p__41151;
var map__41155__$1 = cljs.core.__destructure_map(map__41155);
var patch_entry = map__41155__$1;
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41155__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var fnil = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41155__$1,new cljs.core.Keyword(null,"fnil","fnil",-1827926689));
var path__$1 = cljs.core.vec(path);
var orig_target_val = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db_agg,path__$1);
var fnil_target_val = (((orig_target_val == null))?fnil:orig_target_val);
var vec__41156 = ((cljs.core.ifn_QMARK_(new cljs.core.Keyword(null,"fn","fn",-1175266204).cljs$core$IFn$_invoke$arity$1(patch_entry)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.apply.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"fn","fn",-1175266204).cljs$core$IFn$_invoke$arity$1(patch_entry),fnil_target_val,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(patch_entry)),zero.extras.db.paths_affected_by_change_to(path__$1)], null):((cljs.core.map_QMARK_(new cljs.core.Keyword(null,"merge","merge",-1804319409).cljs$core$IFn$_invoke$arity$1(patch_entry)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([fnil_target_val,new cljs.core.Keyword(null,"merge","merge",-1804319409).cljs$core$IFn$_invoke$arity$1(patch_entry)], 0)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(zero.extras.db.super_paths(path__$1),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__41137_SHARP_){
return zero.extras.db.watched_sub_paths(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path__$1,p1__41137_SHARP_));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.keys(new cljs.core.Keyword(null,"merge","merge",-1804319409).cljs$core$IFn$_invoke$arity$1(patch_entry))], 0)))], null):((cljs.core.coll_QMARK_(new cljs.core.Keyword(null,"clear","clear",1877104959).cljs$core$IFn$_invoke$arity$1(patch_entry)))?((cljs.core.set_QMARK_(fnil_target_val))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.disj,fnil_target_val,new cljs.core.Keyword(null,"clear","clear",1877104959).cljs$core$IFn$_invoke$arity$1(patch_entry)),zero.extras.db.paths_affected_by_change_to(path__$1)], null):((cljs.core.map_QMARK_(fnil_target_val))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc,fnil_target_val,new cljs.core.Keyword(null,"clear","clear",1877104959).cljs$core$IFn$_invoke$arity$1(patch_entry)),((cljs.core.seq(new cljs.core.Keyword(null,"clear","clear",1877104959).cljs$core$IFn$_invoke$arity$1(patch_entry)))?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(zero.extras.db.super_paths(path__$1),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__41142_SHARP_){
return zero.extras.db.watched_sub_paths(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path__$1,p1__41142_SHARP_));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"clear","clear",1877104959).cljs$core$IFn$_invoke$arity$1(patch_entry)], 0))):((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(orig_target_val,fnil_target_val))?zero.extras.db.paths_affected_by_change_to(path__$1):null
))], null):((cljs.core.vector_QMARK_(fnil_target_val))?(function (){var to_clear = cljs.core.set(new cljs.core.Keyword(null,"clear","clear",1877104959).cljs$core$IFn$_invoke$arity$1(patch_entry));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.count(to_clear)))?fnil_target_val:((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(to_clear)))?(function (){var idx = cljs.core.first(to_clear);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(fnil_target_val,(0),idx),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(fnil_target_val,(idx + (1))));
})():cljs.core.vec(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (idx,x){
if(cljs.core.contains_QMARK_(to_clear,idx)){
return null;
} else {
return x;
}
}),fnil_target_val))
)),((cljs.core.seq(to_clear))?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(zero.extras.db.super_paths(path__$1),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__41143_SHARP_){
return zero.extras.db.watched_sub_paths(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(path__$1,p1__41143_SHARP_));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([to_clear], 0))):((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(orig_target_val,fnil_target_val))?zero.extras.db.paths_affected_by_change_to(path__$1):null
))], null);
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [orig_target_val,null], null)
))):(((!((new cljs.core.Keyword(null,"conj","conj",1527141827).cljs$core$IFn$_invoke$arity$1(patch_entry) == null))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(fnil_target_val,new cljs.core.Keyword(null,"conj","conj",1527141827).cljs$core$IFn$_invoke$arity$1(patch_entry)),zero.extras.db.paths_affected_by_change_to(path__$1)], null):((cljs.core.coll_QMARK_(new cljs.core.Keyword(null,"into","into",-150836029).cljs$core$IFn$_invoke$arity$1(patch_entry)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.into.cljs$core$IFn$_invoke$arity$2(fnil_target_val,new cljs.core.Keyword(null,"into","into",-150836029).cljs$core$IFn$_invoke$arity$1(patch_entry)),zero.extras.db.paths_affected_by_change_to(path__$1)], null):((cljs.core.coll_QMARK_(new cljs.core.Keyword(null,"patch","patch",380775109).cljs$core$IFn$_invoke$arity$1(patch_entry)))?(function (){var vec__41196 = (function (){var G__41203 = fnil_target_val;
var G__41204 = new cljs.core.Keyword(null,"patch","patch",380775109).cljs$core$IFn$_invoke$arity$1(patch_entry);
return (zero.extras.db.apply_patch.cljs$core$IFn$_invoke$arity$2 ? zero.extras.db.apply_patch.cljs$core$IFn$_invoke$arity$2(G__41203,G__41204) : zero.extras.db.apply_patch.call(null,G__41203,G__41204));
})();
var patched_target_val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41196,(0),null);
var affected_target_paths = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41196,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [patched_target_val,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(zero.extras.db.super_paths(path__$1),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p1__41144_SHARP_){
return zero.extras.db.watched_sub_paths(cljs.core.into.cljs$core$IFn$_invoke$arity$2(path__$1,p1__41144_SHARP_));
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([affected_target_paths], 0)))], null);
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(patch_entry),zero.extras.db.paths_affected_by_change_to(path__$1)], null)
))))));
var new_target_val = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41156,(0),null);
var new_affected_paths = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41156,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((cljs.core.empty_QMARK_(path__$1))?new_target_val:cljs.core.assoc_in(db_agg,path__$1,new_target_val)),cljs.core.into.cljs$core$IFn$_invoke$arity$2(affected_paths_agg,new_affected_paths)], null);
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [db,cljs.core.PersistentHashSet.EMPTY], null),patch);
});
zero.extras.db.patch_BANG_ = (function zero$extras$db$patch_BANG_(patch){
var vec__41229 = zero.extras.db.apply_patch(cljs.core.deref(zero.extras.db._BANG_db),patch);
var new_db = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41229,(0),null);
var affected_paths = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41229,(1),null);
cljs.core.reset_BANG_(zero.extras.db._BANG_db,new_db);

var seq__41233 = cljs.core.seq(affected_paths);
var chunk__41238 = null;
var count__41239 = (0);
var i__41240 = (0);
while(true){
if((i__41240 < count__41239)){
var path = chunk__41238.cljs$core$IIndexed$_nth$arity$2(null,i__41240);
var seq__41241_41405 = cljs.core.seq(new cljs.core.Keyword(null,"rxs","rxs",1314602772).cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db_watches),((cljs.core.empty_QMARK_(path))?cljs.core.PersistentVector.EMPTY:cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025)], null),cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sub","sub",-2093760025),path))))));
var chunk__41242_41406 = null;
var count__41243_41407 = (0);
var i__41244_41408 = (0);
while(true){
if((i__41244_41408 < count__41243_41407)){
var rx_41410 = chunk__41242_41406.cljs$core$IIndexed$_nth$arity$2(null,i__41244_41408);
var G__41294_41412 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db),path);
(rx_41410.cljs$core$IFn$_invoke$arity$1 ? rx_41410.cljs$core$IFn$_invoke$arity$1(G__41294_41412) : rx_41410.call(null,G__41294_41412));


var G__41414 = seq__41241_41405;
var G__41415 = chunk__41242_41406;
var G__41416 = count__41243_41407;
var G__41417 = (i__41244_41408 + (1));
seq__41241_41405 = G__41414;
chunk__41242_41406 = G__41415;
count__41243_41407 = G__41416;
i__41244_41408 = G__41417;
continue;
} else {
var temp__5804__auto___41419 = cljs.core.seq(seq__41241_41405);
if(temp__5804__auto___41419){
var seq__41241_41420__$1 = temp__5804__auto___41419;
if(cljs.core.chunked_seq_QMARK_(seq__41241_41420__$1)){
var c__5568__auto___41421 = cljs.core.chunk_first(seq__41241_41420__$1);
var G__41423 = cljs.core.chunk_rest(seq__41241_41420__$1);
var G__41424 = c__5568__auto___41421;
var G__41425 = cljs.core.count(c__5568__auto___41421);
var G__41426 = (0);
seq__41241_41405 = G__41423;
chunk__41242_41406 = G__41424;
count__41243_41407 = G__41425;
i__41244_41408 = G__41426;
continue;
} else {
var rx_41428 = cljs.core.first(seq__41241_41420__$1);
var G__41295_41429 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db),path);
(rx_41428.cljs$core$IFn$_invoke$arity$1 ? rx_41428.cljs$core$IFn$_invoke$arity$1(G__41295_41429) : rx_41428.call(null,G__41295_41429));


var G__41430 = cljs.core.next(seq__41241_41420__$1);
var G__41431 = null;
var G__41432 = (0);
var G__41433 = (0);
seq__41241_41405 = G__41430;
chunk__41242_41406 = G__41431;
count__41243_41407 = G__41432;
i__41244_41408 = G__41433;
continue;
}
} else {
}
}
break;
}

var G__41434 = seq__41233;
var G__41435 = chunk__41238;
var G__41436 = count__41239;
var G__41437 = (i__41240 + (1));
seq__41233 = G__41434;
chunk__41238 = G__41435;
count__41239 = G__41436;
i__41240 = G__41437;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__41233);
if(temp__5804__auto__){
var seq__41233__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41233__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__41233__$1);
var G__41438 = cljs.core.chunk_rest(seq__41233__$1);
var G__41439 = c__5568__auto__;
var G__41440 = cljs.core.count(c__5568__auto__);
var G__41441 = (0);
seq__41233 = G__41438;
chunk__41238 = G__41439;
count__41239 = G__41440;
i__41240 = G__41441;
continue;
} else {
var path = cljs.core.first(seq__41233__$1);
var seq__41234_41442 = cljs.core.seq(new cljs.core.Keyword(null,"rxs","rxs",1314602772).cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db_watches),((cljs.core.empty_QMARK_(path))?cljs.core.PersistentVector.EMPTY:cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025)], null),cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"sub","sub",-2093760025),path))))));
var chunk__41235_41443 = null;
var count__41236_41444 = (0);
var i__41237_41445 = (0);
while(true){
if((i__41237_41445 < count__41236_41444)){
var rx_41446 = chunk__41235_41443.cljs$core$IIndexed$_nth$arity$2(null,i__41237_41445);
var G__41310_41447 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db),path);
(rx_41446.cljs$core$IFn$_invoke$arity$1 ? rx_41446.cljs$core$IFn$_invoke$arity$1(G__41310_41447) : rx_41446.call(null,G__41310_41447));


var G__41448 = seq__41234_41442;
var G__41449 = chunk__41235_41443;
var G__41450 = count__41236_41444;
var G__41451 = (i__41237_41445 + (1));
seq__41234_41442 = G__41448;
chunk__41235_41443 = G__41449;
count__41236_41444 = G__41450;
i__41237_41445 = G__41451;
continue;
} else {
var temp__5804__auto___41454__$1 = cljs.core.seq(seq__41234_41442);
if(temp__5804__auto___41454__$1){
var seq__41234_41457__$1 = temp__5804__auto___41454__$1;
if(cljs.core.chunked_seq_QMARK_(seq__41234_41457__$1)){
var c__5568__auto___41458 = cljs.core.chunk_first(seq__41234_41457__$1);
var G__41460 = cljs.core.chunk_rest(seq__41234_41457__$1);
var G__41461 = c__5568__auto___41458;
var G__41462 = cljs.core.count(c__5568__auto___41458);
var G__41463 = (0);
seq__41234_41442 = G__41460;
chunk__41235_41443 = G__41461;
count__41236_41444 = G__41462;
i__41237_41445 = G__41463;
continue;
} else {
var rx_41464 = cljs.core.first(seq__41234_41457__$1);
var G__41316_41465 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.extras.db._BANG_db),path);
(rx_41464.cljs$core$IFn$_invoke$arity$1 ? rx_41464.cljs$core$IFn$_invoke$arity$1(G__41316_41465) : rx_41464.call(null,G__41316_41465));


var G__41466 = cljs.core.next(seq__41234_41457__$1);
var G__41467 = null;
var G__41468 = (0);
var G__41469 = (0);
seq__41234_41442 = G__41466;
chunk__41235_41443 = G__41467;
count__41236_41444 = G__41468;
i__41237_41445 = G__41469;
continue;
}
} else {
}
}
break;
}

var G__41470 = cljs.core.next(seq__41233__$1);
var G__41471 = null;
var G__41472 = (0);
var G__41473 = (0);
seq__41233 = G__41470;
chunk__41238 = G__41471;
count__41239 = G__41472;
i__41240 = G__41473;
continue;
}
} else {
return null;
}
}
break;
}
});
zero.core.reg_effect.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("ze.db","patch","ze.db/patch",532431004),(function (patch){
return zero.extras.db.patch_BANG_(patch);
})], 0));

//# sourceMappingURL=zero.extras.db.js.map
