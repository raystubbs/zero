goog.provide('zero.config');
/**
 * @define {boolean}
 */
zero.config.disable_tags_QMARK_ = goog.define("zero.config.disable_tags_QMARK_",false);
if((typeof zero !== 'undefined') && (typeof zero.config !== 'undefined') && (typeof zero.config.harvest_event !== 'undefined')){
} else {
zero.config.harvest_event = (function (){var method_table__5642__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__5643__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var method_cache__5644__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__5645__auto__ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__5646__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),(function (){var fexpr__37989 = cljs.core.get_global_hierarchy;
return (fexpr__37989.cljs$core$IFn$_invoke$arity$0 ? fexpr__37989.cljs$core$IFn$_invoke$arity$0() : fexpr__37989.call(null));
})());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("zero.config","harvest-event"),(function (event){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(event.type);
}),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__5646__auto__,method_table__5642__auto__,prefer_table__5643__auto__,method_cache__5644__auto__,cached_hierarchy__5645__auto__));
})();
}
zero.config.harvest_event.cljs$core$IMultiFn$_add_method$arity$3(null,new cljs.core.Keyword(null,"default","default",-1987822328),(function (event){
var G__38002 = event.type;
switch (G__38002) {
case "keyup":
case "keydown":
case "keypress":
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),event.key,new cljs.core.Keyword(null,"code","code",1586293142),event.code,new cljs.core.Keyword(null,"mods","mods",-1541827836),(function (){var G__38010 = cljs.core.PersistentHashSet.EMPTY;
var G__38010__$1 = (cljs.core.truth_(event.altKey)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__38010,new cljs.core.Keyword(null,"alt","alt",-3214426)):G__38010);
var G__38010__$2 = (cljs.core.truth_(event.shiftKey)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__38010__$1,new cljs.core.Keyword(null,"shift","shift",997140064)):G__38010__$1);
var G__38010__$3 = (cljs.core.truth_(event.ctrlKey)?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__38010__$2,new cljs.core.Keyword(null,"ctrl","ctrl",361402094)):G__38010__$2);
if(cljs.core.truth_(event.metaKey)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__38010__$3,new cljs.core.Keyword(null,"meta","meta",1499536964));
} else {
return G__38010__$3;
}
})()], null);

break;
case "input":
case "change":
var target = event.target;
if((target instanceof HTMLInputElement)){
var G__38044 = target.type;
switch (G__38044) {
case "checkbox":
return target.checked;

break;
case "file":
return cljs.core.vec(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(target.files));

break;
default:
return target.value;

}
} else {
return null;
}

break;
case "drop":
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__37994_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",p1__37994_SHARP_.kind)){
return p1__37994_SHARP_.getAsFile();
} else {
return (new Blob(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__37994_SHARP_.getAsString()], null),({"type": p1__37994_SHARP_.type})));
}
}),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(event.dataTransfer.items));

break;
default:
return event.detail;

}
}));

//# sourceMappingURL=zero.config.js.map
