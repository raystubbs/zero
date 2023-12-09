goog.provide('zero.impl.components');
goog.scope(function(){
  zero.impl.components.goog$module$goog$object = goog.module.get('goog.object');
});
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components.uid_seq !== 'undefined')){
} else {
zero.impl.components.uid_seq = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(BigInt((0)));
}
zero.impl.components.gen_uid = (function zero$impl$components$gen_uid(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.components.uid_seq,cljs.core._PLUS_,BigInt((1)));
});
zero.impl.components.flatten_body = (function zero$impl$components$flatten_body(body){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function zero$impl$components$flatten_body_$_flattener(item){
if(cljs.core.seq_QMARK_(item)){
return cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(zero$impl$components$flatten_body_$_flattener,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([item], 0));
} else {
if((item == null)){
return null;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [item], null);

}
}
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([body], 0));
});
/**
 * 
 * Given a vnode like `[tag-or-tags {...props}|...props & body]`
 * yields `[tag-or-tags props body]`.
 */
zero.impl.components.normalize_vnode = (function zero$impl$components$normalize_vnode(vnode){
if(cljs.core.map_QMARK_(cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vnode,(1),null))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vnode,(0)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vnode,(1)),zero.impl.components.flatten_body(cljs.core.nthrest(vnode,(2)))], null);
} else {
var props = cljs.core.PersistentArrayMap.EMPTY;
var G__38426 = cljs.core.rest(vnode);
var vec__38429 = G__38426;
var seq__38430 = cljs.core.seq(vec__38429);
var first__38431 = cljs.core.first(seq__38430);
var seq__38430__$1 = cljs.core.next(seq__38430);
var prop_name = first__38431;
var first__38431__$1 = cljs.core.first(seq__38430__$1);
var seq__38430__$2 = cljs.core.next(seq__38430__$1);
var prop_val = first__38431__$1;
var other = seq__38430__$2;
var all = vec__38429;
var props__$1 = props;
var G__38426__$1 = G__38426;
while(true){
var props__$2 = props__$1;
var vec__38444 = G__38426__$1;
var seq__38445 = cljs.core.seq(vec__38444);
var first__38446 = cljs.core.first(seq__38445);
var seq__38445__$1 = cljs.core.next(seq__38445);
var prop_name__$1 = first__38446;
var first__38446__$1 = cljs.core.first(seq__38445__$1);
var seq__38445__$2 = cljs.core.next(seq__38445__$1);
var prop_val__$1 = first__38446__$1;
var other__$1 = seq__38445__$2;
var all__$1 = vec__38444;
if((!((prop_name__$1 instanceof cljs.core.Keyword)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.nth.cljs$core$IFn$_invoke$arity$2(vnode,(0)),props__$2,zero.impl.components.flatten_body(all__$1)], null);
} else {
var G__40650 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(props__$2,prop_name__$1,prop_val__$1);
var G__40651 = other__$1;
props__$1 = G__40650;
G__38426__$1 = G__40651;
continue;
}
break;
}
}
});
/**
 * 
 * Given a normalized vnode, parses the ids and classes
 * out of the tag and into the props, adding a `:z/sel`
 * prop containing the original
 * tag.
 */
zero.impl.components.extract_tag_props = (function zero$impl$components$extract_tag_props(p__38462){
var vec__38468 = p__38462;
var tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38468,(0),null);
var props = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38468,(1),null);
var body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38468,(2),null);
var temp__5802__auto__ = cljs.core.re_matches(/^([^#.]+)([#][^.]+)?([.].+)?$/,cljs.core.name(tag));
if(cljs.core.truth_(temp__5802__auto__)){
var vec__38475 = temp__5802__auto__;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38475,(0),null);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38475,(1),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38475,(2),null);
var classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38475,(3),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(tag),type),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(props,new cljs.core.Keyword("z","sel","z/sel",-1686154409),tag),new cljs.core.Keyword(null,"id","id",-1388402092),(function (){var G__38479 = id;
if((G__38479 == null)){
return null;
} else {
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2(G__38479,(1));
}
})()),new cljs.core.Keyword("z","class","z/class",-2030962122),cljs.core.not_empty(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(clojure.string.blank_QMARK_,cljs.core.flatten(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__38483 = classes;
if((G__38483 == null)){
return null;
} else {
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(G__38483,/[.]/);
}
})(),new cljs.core.Keyword("z","class","z/class",-2030962122).cljs$core$IFn$_invoke$arity$1(props)], null))))),body], null);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Invalid tag",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),tag], null));
}
});
/**
 * 
 * Simplifies the vnode, parsing out the classes and id from
 * the tag, and converting compound tags (i.e `[:div :span]`)
 * into nested vnodes, and accumulating the whole body into
 * one sequence.
 */
zero.impl.components.preproc_vnode = (function zero$impl$components$preproc_vnode(vnode){
var vec__38490 = zero.impl.components.normalize_vnode(vnode);
var tag_or_tags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38490,(0),null);
var props = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38490,(1),null);
var body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38490,(2),null);
return zero.impl.components.extract_tag_props((((tag_or_tags instanceof cljs.core.Keyword))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag_or_tags,props,body], null):((cljs.core.vector_QMARK_(tag_or_tags))?(function (){var G__38494 = cljs.core.count(tag_or_tags);
switch (G__38494) {
case (0):
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Invalid tag",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),tag_or_tags], null));

break;
case (1):
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(tag_or_tags),props,body], null);

break;
default:
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(tag_or_tags),cljs.core.select_keys(props,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("z","key","z/key",-1516042705)], null)),(new cljs.core.List(null,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,middle_tag){
return zero.impl.components.extract_tag_props(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [middle_tag,cljs.core.PersistentArrayMap.EMPTY,(new cljs.core.List(null,m,null,(1),null))], null));
}),zero.impl.components.extract_tag_props(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.last(tag_or_tags),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword("z","key","z/key",-1516042705)),body], null)),cljs.core.rest(cljs.core.butlast(tag_or_tags))),null,(1),null))], null);

}
})():null)));
});
zero.impl.components.css = (function zero$impl$components$css(s){
var G__38499 = (new CSSStyleSheet());
G__38499.replaceSync(s);

return G__38499;
});
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components.PROPS_SYM !== 'undefined')){
} else {
zero.impl.components.PROPS_SYM = Symbol("zProps");
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components.CHILDREN_SYM !== 'undefined')){
} else {
zero.impl.components.CHILDREN_SYM = Symbol("zChildren");
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM !== 'undefined')){
} else {
zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM = Symbol("zListenerAbortControllers");
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components.MARK_SYM !== 'undefined')){
} else {
zero.impl.components.MARK_SYM = Symbol("zMark");
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components.HTML_NS !== 'undefined')){
} else {
zero.impl.components.HTML_NS = "http://www.w3.org/1999/xhtml";
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components.SVG_NS !== 'undefined')){
} else {
zero.impl.components.SVG_NS = "http://www.w3.org/2000/svg";
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components.PRIVATE_SYM !== 'undefined')){
} else {
zero.impl.components.PRIVATE_SYM = Symbol("zPrivate");
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components.HOST_CSS_SYM !== 'undefined')){
} else {
zero.impl.components.HOST_CSS_SYM = Symbol("zHostCss");
}
zero.impl.components.DEFAULT_CSS = zero.impl.components.css(":host { display: contents; }");
zero.impl.components.default_ns = (function zero$impl$components$default_ns(tag){
var G__38510 = tag;
var G__38510__$1 = (((G__38510 instanceof cljs.core.Keyword))?G__38510.fqn:null);
switch (G__38510__$1) {
case "svg":
return zero.impl.components.SVG_NS;

break;
default:
return null;

}
});
zero.impl.components.patch_listeners = (function zero$impl$components$patch_listeners(dom,diff){
var seq__38514 = cljs.core.seq(diff);
var chunk__38515 = null;
var count__38516 = (0);
var i__38517 = (0);
while(true){
if((i__38517 < count__38516)){
var vec__38537 = chunk__38515.cljs$core$IIndexed$_nth$arity$2(null,i__38517);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38537,(0),null);
var vec__38540 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38537,(1),null);
var old_listener = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38540,(0),null);
var new_listener = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38540,(1),null);
var type_str_40659 = cljs.core.name(type);
if(cljs.core.truth_(old_listener)){
var abort_controllers_40660 = zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM);
var abort_controller_40661 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(abort_controllers_40660,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,old_listener], null));
abort_controller_40661.abort();

zero.impl.components.goog$module$goog$object.set(dom,zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(abort_controllers_40660,old_listener));
} else {
}

if(cljs.core.truth_(new_listener)){
var abort_controller_40665 = (new AbortController());
var abort_controllers_40666 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,new_listener], null),abort_controller_40665);
zero.impl.components.goog$module$goog$object.set(dom,zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM,abort_controllers_40666);

dom.addEventListener(type_str_40659,new_listener,({"signal": abort_controller_40665.signal}));
} else {
}


var G__40670 = seq__38514;
var G__40671 = chunk__38515;
var G__40672 = count__38516;
var G__40673 = (i__38517 + (1));
seq__38514 = G__40670;
chunk__38515 = G__40671;
count__38516 = G__40672;
i__38517 = G__40673;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__38514);
if(temp__5804__auto__){
var seq__38514__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38514__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__38514__$1);
var G__40677 = cljs.core.chunk_rest(seq__38514__$1);
var G__40678 = c__5568__auto__;
var G__40679 = cljs.core.count(c__5568__auto__);
var G__40680 = (0);
seq__38514 = G__40677;
chunk__38515 = G__40678;
count__38516 = G__40679;
i__38517 = G__40680;
continue;
} else {
var vec__38554 = cljs.core.first(seq__38514__$1);
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38554,(0),null);
var vec__38557 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38554,(1),null);
var old_listener = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38557,(0),null);
var new_listener = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38557,(1),null);
var type_str_40681 = cljs.core.name(type);
if(cljs.core.truth_(old_listener)){
var abort_controllers_40682 = zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM);
var abort_controller_40683 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(abort_controllers_40682,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,old_listener], null));
abort_controller_40683.abort();

zero.impl.components.goog$module$goog$object.set(dom,zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(abort_controllers_40682,old_listener));
} else {
}

if(cljs.core.truth_(new_listener)){
var abort_controller_40684 = (new AbortController());
var abort_controllers_40685 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,new_listener], null),abort_controller_40684);
zero.impl.components.goog$module$goog$object.set(dom,zero.impl.components.LISTENER_ABORT_CONTROLLERS_SYM,abort_controllers_40685);

dom.addEventListener(type_str_40681,new_listener,({"signal": abort_controller_40684.signal}));
} else {
}


var G__40689 = cljs.core.next(seq__38514__$1);
var G__40690 = null;
var G__40691 = (0);
var G__40692 = (0);
seq__38514 = G__40689;
chunk__38515 = G__40690;
count__38516 = G__40691;
i__38517 = G__40692;
continue;
}
} else {
return null;
}
}
break;
}
});
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components._BANG_class__GT_fields_index !== 'undefined')){
} else {
zero.impl.components._BANG_class__GT_fields_index = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
zero.impl.components.prop_writable_QMARK_ = (function zero$impl$components$prop_writable_QMARK_(obj,prop){
if((obj == null)){
return false;
} else {
var temp__5802__auto__ = Object.getOwnPropertyDescriptor(obj,prop);
if(cljs.core.truth_(temp__5802__auto__)){
var prop_def = temp__5802__auto__;
var or__5045__auto__ = prop_def.writable;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (!((prop_def.set == null)));
}
} else {
var G__38568 = Object.getPrototypeOf(obj);
var G__38569 = prop;
return (zero.impl.components.prop_writable_QMARK_.cljs$core$IFn$_invoke$arity$2 ? zero.impl.components.prop_writable_QMARK_.cljs$core$IFn$_invoke$arity$2(G__38568,G__38569) : zero.impl.components.prop_writable_QMARK_.call(null,G__38568,G__38569));
}
}
});
zero.impl.components.class__GT_fields_index = (function zero$impl$components$class__GT_fields_index(class$){
var parent_class = Object.getPrototypeOf(class$);
var proto = class$.prototype;
if(cljs.core.truth_(proto)){
var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.impl.components._BANG_class__GT_fields_index),class$);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var index = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var G__38582 = parent_class;
if((G__38582 == null)){
return null;
} else {
return (zero.impl.components.class__GT_fields_index.cljs$core$IFn$_invoke$arity$1 ? zero.impl.components.class__GT_fields_index.cljs$core$IFn$_invoke$arity$1(G__38582) : zero.impl.components.class__GT_fields_index.call(null,G__38582));
}
})(),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (prop_name){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(zero.impl.base.snake_case(prop_name)),prop_name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(zero.impl.base.cammel_case(prop_name)),prop_name], null)], null);
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__38570_SHARP_){
return zero.impl.components.prop_writable_QMARK_(proto,p1__38570_SHARP_);
}),Object.getOwnPropertyNames(proto))], 0)))], 0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_class__GT_fields_index,cljs.core.assoc,class$,index);

return index;
}
} else {
return null;
}
});
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components._BANG_css_links !== 'undefined')){
} else {
zero.impl.components._BANG_css_links = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components._BANG_css_stylesheet_objects !== 'undefined')){
} else {
zero.impl.components._BANG_css_stylesheet_objects = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components._BANG_css_href_overrides !== 'undefined')){
} else {
zero.impl.components._BANG_css_href_overrides = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
zero.impl.components.load_stylesheet = (function zero$impl$components$load_stylesheet(stylesheet_object,url){
zero.impl.components.goog$module$goog$object.set(stylesheet_object,zero.impl.components.PRIVATE_SYM,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),url.toString()], null));

return fetch(url).then((function (p1__38591_SHARP_){
return p1__38591_SHARP_.text();
})).then((function (css_text){
var map__38592 = zero.impl.components.goog$module$goog$object.get(stylesheet_object,zero.impl.components.PRIVATE_SYM);
var map__38592__$1 = cljs.core.__destructure_map(map__38592);
var href = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38592__$1,new cljs.core.Keyword(null,"href","href",-793805698));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(href,url.toString())){
return stylesheet_object.replace(css_text);
} else {
return null;
}
}));
});
zero.impl.components.__GT_stylesheet_object = (function zero$impl$components$__GT_stylesheet_object(x){
if((x instanceof CSSStyleSheet)){
return x;
} else {
if(((typeof x === 'string') || ((x instanceof URL)))){
var absolute_url = (new URL(x,location.href));
var absolute_url_str = absolute_url.toString();
var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.impl.components._BANG_css_stylesheet_objects),absolute_url_str);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var actual_url_str = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,absolute_url.origin))?cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(zero.impl.components._BANG_css_href_overrides),absolute_url.pathname,absolute_url_str):absolute_url_str);
var new_css_obj = (new CSSStyleSheet());
zero.impl.components.load_stylesheet(new_css_obj,actual_url_str);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_css_stylesheet_objects,cljs.core.assoc,absolute_url_str,new_css_obj);

return new_css_obj;
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Can't convert given object to CSSStyleSheet",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"given","given",716253602),x], null));

}
}
});
zero.impl.components.diff_shallow = (function zero$impl$components$diff_shallow(map_a,map_b){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (diff,key){
var val_a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map_a,key);
var val_b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map_b,key);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(val_a,val_b)){
return diff;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(diff,key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [val_a,val_b], null));
}
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.set(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.keys(map_a),cljs.core.keys(map_b))));
});
zero.impl.components.diff_props = (function zero$impl$components$diff_props(old_props,new_props){
var all_keys = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([old_props,new_props], 0));
var $ = all_keys;
var $__$1 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic($,new cljs.core.Keyword("z","style","z/style",-496642614),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("z","on","z/on",173874014)], 0));
var $__$2 = cljs.core.keys($__$1);
var $__$3 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (diff,key){
var new_val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new_props,key);
var old_val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(old_props,key);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new_val,old_val)){
return diff;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(diff,key,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [old_val,new_val], null));
}
}),cljs.core.PersistentArrayMap.EMPTY,$__$2);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (diff,key){
if((!(cljs.core.contains_QMARK_(all_keys,key)))){
return diff;
} else {
var inner_diff = zero.impl.components.diff_shallow(cljs.core.get.cljs$core$IFn$_invoke$arity$2(old_props,key),cljs.core.get.cljs$core$IFn$_invoke$arity$2(new_props,key));
if(cljs.core.empty_QMARK_(inner_diff)){
return diff;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(diff,key,inner_diff);
}
}
}),$__$3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("z","style","z/style",-496642614),new cljs.core.Keyword("z","on","z/on",173874014),new cljs.core.Keyword("z","aria","z/aria",1737868441)], null));
});
zero.impl.components.__GT_css_value = (function zero$impl$components$__GT_css_value(x){
if((((x instanceof cljs.core.Keyword)) || ((x instanceof cljs.core.Symbol)))){
return cljs.core.name(x);
} else {
if(cljs.core.vector_QMARK_(x)){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(zero.impl.components.__GT_css_value,x));
} else {
if(cljs.core.seq_QMARK_(x)){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(", ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(zero.impl.components.__GT_css_value,x));
} else {
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(x);

}
}
}
});
zero.impl.components.patch_root_props = (function zero$impl$components$patch_root_props(dom,_internals,props){
var old_props = zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.PROPS_SYM);
var diff = zero.impl.components.diff_props(old_props,props);
var host_css = (function (){var or__5045__auto__ = zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.HOST_CSS_SYM);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var x = (new CSSStyleSheet());
x.replaceSync(":host {}");

zero.impl.components.goog$module$goog$object.set(dom,zero.impl.components.HOST_CSS_SYM,x);

return x;
}
})();
if(cljs.core.empty_QMARK_(diff)){
} else {
var temp__5804__auto___40704 = (diff.cljs$core$IFn$_invoke$arity$1 ? diff.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("z","style","z/style",-496642614)) : diff.call(null,new cljs.core.Keyword("z","style","z/style",-496642614)));
if(cljs.core.truth_(temp__5804__auto___40704)){
var style_diff_40705 = temp__5804__auto___40704;
var style_obj_40706 = host_css.cssRules.item((0)).style;
var seq__38619_40707 = cljs.core.seq(style_diff_40705);
var chunk__38620_40708 = null;
var count__38621_40709 = (0);
var i__38622_40710 = (0);
while(true){
if((i__38622_40710 < count__38621_40709)){
var vec__38674_40711 = chunk__38620_40708.cljs$core$IIndexed$_nth$arity$2(null,i__38622_40710);
var k_40712 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38674_40711,(0),null);
var vec__38677_40713 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38674_40711,(1),null);
var __40714 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38677_40713,(0),null);
var new_val_40715 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38677_40713,(1),null);
if(cljs.core.not(new_val_40715)){
style_obj_40706.removeProperty(cljs.core.name(k_40712));
} else {
style_obj_40706.setProperty(cljs.core.name(k_40712),zero.impl.components.__GT_css_value(new_val_40715));
}


var G__40722 = seq__38619_40707;
var G__40723 = chunk__38620_40708;
var G__40724 = count__38621_40709;
var G__40725 = (i__38622_40710 + (1));
seq__38619_40707 = G__40722;
chunk__38620_40708 = G__40723;
count__38621_40709 = G__40724;
i__38622_40710 = G__40725;
continue;
} else {
var temp__5804__auto___40726__$1 = cljs.core.seq(seq__38619_40707);
if(temp__5804__auto___40726__$1){
var seq__38619_40730__$1 = temp__5804__auto___40726__$1;
if(cljs.core.chunked_seq_QMARK_(seq__38619_40730__$1)){
var c__5568__auto___40731 = cljs.core.chunk_first(seq__38619_40730__$1);
var G__40732 = cljs.core.chunk_rest(seq__38619_40730__$1);
var G__40733 = c__5568__auto___40731;
var G__40734 = cljs.core.count(c__5568__auto___40731);
var G__40735 = (0);
seq__38619_40707 = G__40732;
chunk__38620_40708 = G__40733;
count__38621_40709 = G__40734;
i__38622_40710 = G__40735;
continue;
} else {
var vec__38682_40736 = cljs.core.first(seq__38619_40730__$1);
var k_40737 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38682_40736,(0),null);
var vec__38685_40738 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38682_40736,(1),null);
var __40739 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38685_40738,(0),null);
var new_val_40740 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38685_40738,(1),null);
if(cljs.core.not(new_val_40740)){
style_obj_40706.removeProperty(cljs.core.name(k_40737));
} else {
style_obj_40706.setProperty(cljs.core.name(k_40737),zero.impl.components.__GT_css_value(new_val_40740));
}


var G__40741 = cljs.core.next(seq__38619_40730__$1);
var G__40742 = null;
var G__40743 = (0);
var G__40744 = (0);
seq__38619_40707 = G__40741;
chunk__38620_40708 = G__40742;
count__38621_40709 = G__40743;
i__38622_40710 = G__40744;
continue;
}
} else {
}
}
break;
}
} else {
}

var temp__5804__auto___40745 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(diff,new cljs.core.Keyword("z","css","z/css",1135045281));
if(cljs.core.truth_(temp__5804__auto___40745)){
var vec__38690_40749 = temp__5804__auto___40745;
var __40750 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38690_40749,(0),null);
var css_prop_40751 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38690_40749,(1),null);
(dom.adoptedStyleSheets = cljs.core.to_array(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(zero.impl.components.__GT_stylesheet_object,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(css_prop_40751,host_css))));
} else {
}

var temp__5804__auto___40752 = (diff.cljs$core$IFn$_invoke$arity$1 ? diff.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("z","on","z/on",173874014)) : diff.call(null,new cljs.core.Keyword("z","on","z/on",173874014)));
if(cljs.core.truth_(temp__5804__auto___40752)){
var listeners_diff_40753 = temp__5804__auto___40752;
zero.impl.components.patch_listeners(dom,listeners_diff_40753);
} else {
}
}

return zero.impl.components.goog$module$goog$object.set(dom,zero.impl.components.PROPS_SYM,props);
});
zero.impl.components.patch_props = (function zero$impl$components$patch_props(dom,_BANG_instance_state,props){
var diff = zero.impl.components.diff_props((function (){var or__5045__auto__ = zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.PROPS_SYM);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})(),props);
if(cljs.core.empty_QMARK_(diff)){
return null;
} else {
var temp__5808__auto___40757 = (diff.cljs$core$IFn$_invoke$arity$1 ? diff.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("z","on","z/on",173874014)) : diff.call(null,new cljs.core.Keyword("z","on","z/on",173874014)));
if((temp__5808__auto___40757 == null)){
} else {
var listeners_diff_40758 = temp__5808__auto___40757;
zero.impl.components.patch_listeners(dom,listeners_diff_40758);
}

var fields_index = zero.impl.components.class__GT_fields_index(dom.constructor);
var set_prop = (function (dom__$1,prop_key,prop_value){
var adjusted_value = (cljs.core.truth_((function (){var and__5043__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5043__auto__)){
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dom__$1.nodeName,"LINK")) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(prop_key,new cljs.core.Keyword(null,"href","href",-793805698))));
} else {
return and__5043__auto__;
}
})())?cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(zero.impl.components._BANG_css_href_overrides),prop_value,prop_value):prop_value);
var temp__5802__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fields_index,prop_key);
if(cljs.core.truth_(temp__5802__auto__)){
var field_name = temp__5802__auto__;
return zero.impl.components.goog$module$goog$object.set(dom__$1,field_name,adjusted_value);
} else {
if(cljs.core.not(prop_value)){
return dom__$1.removeAttribute(cljs.core.name(prop_key));
} else {
return dom__$1.setAttribute(cljs.core.name(prop_key),((adjusted_value === true)?"":cljs.core.str.cljs$core$IFn$_invoke$arity$1(adjusted_value)));
}
}
});
var normal_props_diff = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace,cljs.core.key),diff);
var seq__38727_40762 = cljs.core.seq(normal_props_diff);
var chunk__38728_40763 = null;
var count__38729_40764 = (0);
var i__38730_40765 = (0);
while(true){
if((i__38730_40765 < count__38729_40764)){
var vec__38807_40766 = chunk__38728_40763.cljs$core$IIndexed$_nth$arity$2(null,i__38730_40765);
var k_40767 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38807_40766,(0),null);
var vec__38810_40768 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38807_40766,(1),null);
var old_val_40769 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38810_40768,(0),null);
var new_val_40770 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38810_40768,(1),null);
if((((!((old_val_40769 == null))))?(((((old_val_40769.cljs$lang$protocol_mask$partition1$ & (2))) || ((cljs.core.PROTOCOL_SENTINEL === old_val_40769.cljs$core$IWatchable$))))?true:(((!old_val_40769.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,old_val_40769):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,old_val_40769))){
var binders_40771 = cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),old_val_40769,new cljs.core.Keyword(null,"binders","binders",1628433202)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dom,k_40767], null));
if(cljs.core.empty_QMARK_(binders_40771)){
cljs.core.remove_watch(old_val_40769,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),old_val_40769,new cljs.core.Keyword(null,"uid","uid",-1447769400)], null)));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"binds","binds",363649660),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([old_val_40769], 0));
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),old_val_40769,new cljs.core.Keyword(null,"binders","binders",1628433202)], null),binders_40771);

}
} else {
}

if((((!((new_val_40770 == null))))?(((((new_val_40770.cljs$lang$protocol_mask$partition1$ & (2))) || ((cljs.core.PROTOCOL_SENTINEL === new_val_40770.cljs$core$IWatchable$))))?true:(((!new_val_40770.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,new_val_40770):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,new_val_40770))){
var temp__5802__auto___40774 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),new_val_40770], null));
if(cljs.core.truth_(temp__5802__auto___40774)){
var existing_40775 = temp__5802__auto___40774;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),new_val_40770,new cljs.core.Keyword(null,"binders","binders",1628433202)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dom,k_40767], null)], 0));

set_prop(dom,k_40767,cljs.core.deref(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(existing_40775)));
} else {
var watch_uid_40776 = zero.impl.components.gen_uid();
var _BANG_current_40777 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((((((!((new_val_40770 == null))))?(((((new_val_40770.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === new_val_40770.cljs$core$IDeref$))))?true:(((!new_val_40770.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,new_val_40770):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,new_val_40770)))?cljs.core.deref(new_val_40770):null));
var binders_40778 = cljs.core.PersistentHashSet.createAsIfByAssoc([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dom,k_40767], null)]);
cljs.core.add_watch(new_val_40770,watch_uid_40776,((function (seq__38727_40762,chunk__38728_40763,count__38729_40764,i__38730_40765,watch_uid_40776,_BANG_current_40777,binders_40778,temp__5802__auto___40774,vec__38807_40766,k_40767,vec__38810_40768,old_val_40769,new_val_40770,fields_index,set_prop,normal_props_diff,diff){
return (function (_,___$1,___$2,x){
cljs.core.reset_BANG_(_BANG_current_40777,x);

var seq__38830 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),new_val_40770,new cljs.core.Keyword(null,"binders","binders",1628433202)], null)));
var chunk__38831 = null;
var count__38832 = (0);
var i__38833 = (0);
while(true){
if((i__38833 < count__38832)){
var vec__38845 = chunk__38831.cljs$core$IIndexed$_nth$arity$2(null,i__38833);
var binder_dom = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38845,(0),null);
var binder_prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38845,(1),null);
set_prop(binder_dom,binder_prop,x);


var G__40779 = seq__38830;
var G__40780 = chunk__38831;
var G__40781 = count__38832;
var G__40782 = (i__38833 + (1));
seq__38830 = G__40779;
chunk__38831 = G__40780;
count__38832 = G__40781;
i__38833 = G__40782;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__38830);
if(temp__5804__auto__){
var seq__38830__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38830__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__38830__$1);
var G__40783 = cljs.core.chunk_rest(seq__38830__$1);
var G__40784 = c__5568__auto__;
var G__40785 = cljs.core.count(c__5568__auto__);
var G__40786 = (0);
seq__38830 = G__40783;
chunk__38831 = G__40784;
count__38832 = G__40785;
i__38833 = G__40786;
continue;
} else {
var vec__38848 = cljs.core.first(seq__38830__$1);
var binder_dom = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38848,(0),null);
var binder_prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38848,(1),null);
set_prop(binder_dom,binder_prop,x);


var G__40787 = cljs.core.next(seq__38830__$1);
var G__40788 = null;
var G__40789 = (0);
var G__40790 = (0);
seq__38830 = G__40787;
chunk__38831 = G__40788;
count__38832 = G__40789;
i__38833 = G__40790;
continue;
}
} else {
return null;
}
}
break;
}
});})(seq__38727_40762,chunk__38728_40763,count__38729_40764,i__38730_40765,watch_uid_40776,_BANG_current_40777,binders_40778,temp__5802__auto___40774,vec__38807_40766,k_40767,vec__38810_40768,old_val_40769,new_val_40770,fields_index,set_prop,normal_props_diff,diff))
);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),new_val_40770], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"uid","uid",-1447769400),watch_uid_40776,new cljs.core.Keyword(null,"current","current",-1088038603),_BANG_current_40777,new cljs.core.Keyword(null,"binders","binders",1628433202),binders_40778], null));

set_prop(dom,k_40767,cljs.core.deref(_BANG_current_40777));
}
} else {
set_prop(dom,k_40767,new_val_40770);

}


var G__40798 = seq__38727_40762;
var G__40799 = chunk__38728_40763;
var G__40800 = count__38729_40764;
var G__40801 = (i__38730_40765 + (1));
seq__38727_40762 = G__40798;
chunk__38728_40763 = G__40799;
count__38729_40764 = G__40800;
i__38730_40765 = G__40801;
continue;
} else {
var temp__5804__auto___40802 = cljs.core.seq(seq__38727_40762);
if(temp__5804__auto___40802){
var seq__38727_40806__$1 = temp__5804__auto___40802;
if(cljs.core.chunked_seq_QMARK_(seq__38727_40806__$1)){
var c__5568__auto___40807 = cljs.core.chunk_first(seq__38727_40806__$1);
var G__40808 = cljs.core.chunk_rest(seq__38727_40806__$1);
var G__40809 = c__5568__auto___40807;
var G__40810 = cljs.core.count(c__5568__auto___40807);
var G__40811 = (0);
seq__38727_40762 = G__40808;
chunk__38728_40763 = G__40809;
count__38729_40764 = G__40810;
i__38730_40765 = G__40811;
continue;
} else {
var vec__38851_40812 = cljs.core.first(seq__38727_40806__$1);
var k_40813 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38851_40812,(0),null);
var vec__38854_40814 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38851_40812,(1),null);
var old_val_40815 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38854_40814,(0),null);
var new_val_40816 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38854_40814,(1),null);
if((((!((old_val_40815 == null))))?(((((old_val_40815.cljs$lang$protocol_mask$partition1$ & (2))) || ((cljs.core.PROTOCOL_SENTINEL === old_val_40815.cljs$core$IWatchable$))))?true:(((!old_val_40815.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,old_val_40815):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,old_val_40815))){
var binders_40817 = cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),old_val_40815,new cljs.core.Keyword(null,"binders","binders",1628433202)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dom,k_40813], null));
if(cljs.core.empty_QMARK_(binders_40817)){
cljs.core.remove_watch(old_val_40815,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),old_val_40815,new cljs.core.Keyword(null,"uid","uid",-1447769400)], null)));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"binds","binds",363649660),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([old_val_40815], 0));
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),old_val_40815,new cljs.core.Keyword(null,"binders","binders",1628433202)], null),binders_40817);

}
} else {
}

if((((!((new_val_40816 == null))))?(((((new_val_40816.cljs$lang$protocol_mask$partition1$ & (2))) || ((cljs.core.PROTOCOL_SENTINEL === new_val_40816.cljs$core$IWatchable$))))?true:(((!new_val_40816.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,new_val_40816):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,new_val_40816))){
var temp__5802__auto___40824 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),new_val_40816], null));
if(cljs.core.truth_(temp__5802__auto___40824)){
var existing_40825 = temp__5802__auto___40824;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),new_val_40816,new cljs.core.Keyword(null,"binders","binders",1628433202)], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dom,k_40813], null)], 0));

set_prop(dom,k_40813,cljs.core.deref(new cljs.core.Keyword(null,"current","current",-1088038603).cljs$core$IFn$_invoke$arity$1(existing_40825)));
} else {
var watch_uid_40826 = zero.impl.components.gen_uid();
var _BANG_current_40827 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((((((!((new_val_40816 == null))))?(((((new_val_40816.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === new_val_40816.cljs$core$IDeref$))))?true:(((!new_val_40816.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,new_val_40816):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,new_val_40816)))?cljs.core.deref(new_val_40816):null));
var binders_40828 = cljs.core.PersistentHashSet.createAsIfByAssoc([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dom,k_40813], null)]);
cljs.core.add_watch(new_val_40816,watch_uid_40826,((function (seq__38727_40762,chunk__38728_40763,count__38729_40764,i__38730_40765,watch_uid_40826,_BANG_current_40827,binders_40828,temp__5802__auto___40824,vec__38851_40812,k_40813,vec__38854_40814,old_val_40815,new_val_40816,seq__38727_40806__$1,temp__5804__auto___40802,fields_index,set_prop,normal_props_diff,diff){
return (function (_,___$1,___$2,x){
cljs.core.reset_BANG_(_BANG_current_40827,x);

var seq__38870 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),new_val_40816,new cljs.core.Keyword(null,"binders","binders",1628433202)], null)));
var chunk__38871 = null;
var count__38872 = (0);
var i__38873 = (0);
while(true){
if((i__38873 < count__38872)){
var vec__38882 = chunk__38871.cljs$core$IIndexed$_nth$arity$2(null,i__38873);
var binder_dom = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38882,(0),null);
var binder_prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38882,(1),null);
set_prop(binder_dom,binder_prop,x);


var G__40832 = seq__38870;
var G__40833 = chunk__38871;
var G__40834 = count__38872;
var G__40835 = (i__38873 + (1));
seq__38870 = G__40832;
chunk__38871 = G__40833;
count__38872 = G__40834;
i__38873 = G__40835;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__38870);
if(temp__5804__auto____$1){
var seq__38870__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__38870__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__38870__$1);
var G__40836 = cljs.core.chunk_rest(seq__38870__$1);
var G__40837 = c__5568__auto__;
var G__40838 = cljs.core.count(c__5568__auto__);
var G__40839 = (0);
seq__38870 = G__40836;
chunk__38871 = G__40837;
count__38872 = G__40838;
i__38873 = G__40839;
continue;
} else {
var vec__38885 = cljs.core.first(seq__38870__$1);
var binder_dom = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38885,(0),null);
var binder_prop = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38885,(1),null);
set_prop(binder_dom,binder_prop,x);


var G__40841 = cljs.core.next(seq__38870__$1);
var G__40842 = null;
var G__40843 = (0);
var G__40844 = (0);
seq__38870 = G__40841;
chunk__38871 = G__40842;
count__38872 = G__40843;
i__38873 = G__40844;
continue;
}
} else {
return null;
}
}
break;
}
});})(seq__38727_40762,chunk__38728_40763,count__38729_40764,i__38730_40765,watch_uid_40826,_BANG_current_40827,binders_40828,temp__5802__auto___40824,vec__38851_40812,k_40813,vec__38854_40814,old_val_40815,new_val_40816,seq__38727_40806__$1,temp__5804__auto___40802,fields_index,set_prop,normal_props_diff,diff))
);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),new_val_40816], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"uid","uid",-1447769400),watch_uid_40826,new cljs.core.Keyword(null,"current","current",-1088038603),_BANG_current_40827,new cljs.core.Keyword(null,"binders","binders",1628433202),binders_40828], null));

set_prop(dom,k_40813,cljs.core.deref(_BANG_current_40827));
}
} else {
set_prop(dom,k_40813,new_val_40816);

}


var G__40845 = cljs.core.next(seq__38727_40806__$1);
var G__40846 = null;
var G__40847 = (0);
var G__40848 = (0);
seq__38727_40762 = G__40845;
chunk__38728_40763 = G__40846;
count__38729_40764 = G__40847;
i__38730_40765 = G__40848;
continue;
}
} else {
}
}
break;
}

var temp__5804__auto___40849 = (diff.cljs$core$IFn$_invoke$arity$1 ? diff.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("z","style","z/style",-496642614)) : diff.call(null,new cljs.core.Keyword("z","style","z/style",-496642614)));
if(cljs.core.truth_(temp__5804__auto___40849)){
var style_diff_40852 = temp__5804__auto___40849;
var style_obj_40853 = dom.style;
var seq__38890_40854 = cljs.core.seq(style_diff_40852);
var chunk__38891_40855 = null;
var count__38892_40856 = (0);
var i__38893_40857 = (0);
while(true){
if((i__38893_40857 < count__38892_40856)){
var vec__38909_40858 = chunk__38891_40855.cljs$core$IIndexed$_nth$arity$2(null,i__38893_40857);
var k_40859 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38909_40858,(0),null);
var vec__38912_40860 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38909_40858,(1),null);
var __40861 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38912_40860,(0),null);
var new_val_40862 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38912_40860,(1),null);
if(cljs.core.not(new_val_40862)){
style_obj_40853.removeProperty(cljs.core.name(k_40859));
} else {
style_obj_40853.setProperty(cljs.core.name(k_40859),zero.impl.components.__GT_css_value(new_val_40862));
}


var G__40863 = seq__38890_40854;
var G__40864 = chunk__38891_40855;
var G__40865 = count__38892_40856;
var G__40866 = (i__38893_40857 + (1));
seq__38890_40854 = G__40863;
chunk__38891_40855 = G__40864;
count__38892_40856 = G__40865;
i__38893_40857 = G__40866;
continue;
} else {
var temp__5804__auto___40867__$1 = cljs.core.seq(seq__38890_40854);
if(temp__5804__auto___40867__$1){
var seq__38890_40868__$1 = temp__5804__auto___40867__$1;
if(cljs.core.chunked_seq_QMARK_(seq__38890_40868__$1)){
var c__5568__auto___40869 = cljs.core.chunk_first(seq__38890_40868__$1);
var G__40870 = cljs.core.chunk_rest(seq__38890_40868__$1);
var G__40871 = c__5568__auto___40869;
var G__40872 = cljs.core.count(c__5568__auto___40869);
var G__40873 = (0);
seq__38890_40854 = G__40870;
chunk__38891_40855 = G__40871;
count__38892_40856 = G__40872;
i__38893_40857 = G__40873;
continue;
} else {
var vec__38918_40874 = cljs.core.first(seq__38890_40868__$1);
var k_40875 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38918_40874,(0),null);
var vec__38921_40876 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38918_40874,(1),null);
var __40877 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38921_40876,(0),null);
var new_val_40878 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38921_40876,(1),null);
if(cljs.core.not(new_val_40878)){
style_obj_40853.removeProperty(cljs.core.name(k_40875));
} else {
style_obj_40853.setProperty(cljs.core.name(k_40875),zero.impl.components.__GT_css_value(new_val_40878));
}


var G__40879 = cljs.core.next(seq__38890_40868__$1);
var G__40880 = null;
var G__40881 = (0);
var G__40882 = (0);
seq__38890_40854 = G__40879;
chunk__38891_40855 = G__40880;
count__38892_40856 = G__40881;
i__38893_40857 = G__40882;
continue;
}
} else {
}
}
break;
}
} else {
}

var temp__5804__auto___40883 = (diff.cljs$core$IFn$_invoke$arity$1 ? diff.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword("z","class","z/class",-2030962122)) : diff.call(null,new cljs.core.Keyword("z","class","z/class",-2030962122)));
if(cljs.core.truth_(temp__5804__auto___40883)){
var vec__38925_40884 = temp__5804__auto___40883;
var __40885 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38925_40884,(0),null);
var class_40886 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38925_40884,(1),null);
if((class_40886 == null)){
dom.removeAttribute("class");
} else {
(dom.className = clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",class_40886));
}
} else {
}

return zero.impl.components.goog$module$goog$object.set(dom,zero.impl.components.PROPS_SYM,props);
}
});
zero.impl.components.kw__GT_el_name = (function zero$impl$components$kw__GT_el_name(tag){
return clojure.string.lower_case(clojure.string.replace((function (){var temp__5802__auto__ = cljs.core.namespace(tag);
if(cljs.core.truth_(temp__5802__auto__)){
var ns = temp__5802__auto__;
return [ns,"-",cljs.core.name(tag)].join('');
} else {
return cljs.core.name(tag);
}
})(),/[^A-Za-z0-9._-]+/,"-"));
});
zero.impl.components.cleanup_dom = (function zero$impl$components$cleanup_dom(dom,_BANG_instance_state){
var seq__38947_40888 = cljs.core.seq(zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.PROPS_SYM));
var chunk__38948_40889 = null;
var count__38949_40890 = (0);
var i__38950_40891 = (0);
while(true){
if((i__38950_40891 < count__38949_40890)){
var vec__38975_40892 = chunk__38948_40889.cljs$core$IIndexed$_nth$arity$2(null,i__38950_40891);
var k_40893 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38975_40892,(0),null);
var v_40894 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38975_40892,(1),null);
if(cljs.core.truth_((function (){var and__5043__auto__ = v_40894;
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.namespace(k_40893));
} else {
return and__5043__auto__;
}
})())){
if((((!((v_40894 == null))))?(((((v_40894.cljs$lang$protocol_mask$partition1$ & (2))) || ((cljs.core.PROTOCOL_SENTINEL === v_40894.cljs$core$IWatchable$))))?true:(((!v_40894.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,v_40894):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,v_40894))){
var binders_40899 = cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),v_40894,new cljs.core.Keyword(null,"binders","binders",1628433202)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dom,k_40893], null));
if(cljs.core.empty_QMARK_(binders_40899)){
cljs.core.remove_watch(v_40894,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),v_40894,new cljs.core.Keyword(null,"uid","uid",-1447769400)], null)));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"binds","binds",363649660),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([v_40894], 0));
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),v_40894,new cljs.core.Keyword(null,"binders","binders",1628433202)], null),binders_40899);

}
} else {
}
} else {
}


var G__40900 = seq__38947_40888;
var G__40901 = chunk__38948_40889;
var G__40902 = count__38949_40890;
var G__40903 = (i__38950_40891 + (1));
seq__38947_40888 = G__40900;
chunk__38948_40889 = G__40901;
count__38949_40890 = G__40902;
i__38950_40891 = G__40903;
continue;
} else {
var temp__5804__auto___40904 = cljs.core.seq(seq__38947_40888);
if(temp__5804__auto___40904){
var seq__38947_40905__$1 = temp__5804__auto___40904;
if(cljs.core.chunked_seq_QMARK_(seq__38947_40905__$1)){
var c__5568__auto___40906 = cljs.core.chunk_first(seq__38947_40905__$1);
var G__40907 = cljs.core.chunk_rest(seq__38947_40905__$1);
var G__40908 = c__5568__auto___40906;
var G__40909 = cljs.core.count(c__5568__auto___40906);
var G__40910 = (0);
seq__38947_40888 = G__40907;
chunk__38948_40889 = G__40908;
count__38949_40890 = G__40909;
i__38950_40891 = G__40910;
continue;
} else {
var vec__38979_40911 = cljs.core.first(seq__38947_40905__$1);
var k_40912 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38979_40911,(0),null);
var v_40913 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38979_40911,(1),null);
if(cljs.core.truth_((function (){var and__5043__auto__ = v_40913;
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.namespace(k_40912));
} else {
return and__5043__auto__;
}
})())){
if((((!((v_40913 == null))))?(((((v_40913.cljs$lang$protocol_mask$partition1$ & (2))) || ((cljs.core.PROTOCOL_SENTINEL === v_40913.cljs$core$IWatchable$))))?true:(((!v_40913.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,v_40913):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,v_40913))){
var binders_40914 = cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),v_40913,new cljs.core.Keyword(null,"binders","binders",1628433202)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dom,k_40912], null));
if(cljs.core.empty_QMARK_(binders_40914)){
cljs.core.remove_watch(v_40913,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),v_40913,new cljs.core.Keyword(null,"uid","uid",-1447769400)], null)));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"binds","binds",363649660),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([v_40913], 0));
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"binds","binds",363649660),v_40913,new cljs.core.Keyword(null,"binders","binders",1628433202)], null),binders_40914);

}
} else {
}
} else {
}


var G__40915 = cljs.core.next(seq__38947_40905__$1);
var G__40916 = null;
var G__40917 = (0);
var G__40918 = (0);
seq__38947_40888 = G__40915;
chunk__38948_40889 = G__40916;
count__38949_40890 = G__40917;
i__38950_40891 = G__40918;
continue;
}
} else {
}
}
break;
}

var seq__38987_40919 = cljs.core.seq(zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.CHILDREN_SYM));
var chunk__38988_40920 = null;
var count__38989_40921 = (0);
var i__38990_40922 = (0);
while(true){
if((i__38990_40922 < count__38989_40921)){
var child_dom_40923 = chunk__38988_40920.cljs$core$IIndexed$_nth$arity$2(null,i__38990_40922);
(zero.impl.components.cleanup_dom.cljs$core$IFn$_invoke$arity$2 ? zero.impl.components.cleanup_dom.cljs$core$IFn$_invoke$arity$2(child_dom_40923,_BANG_instance_state) : zero.impl.components.cleanup_dom.call(null,child_dom_40923,_BANG_instance_state));


var G__40924 = seq__38987_40919;
var G__40925 = chunk__38988_40920;
var G__40926 = count__38989_40921;
var G__40927 = (i__38990_40922 + (1));
seq__38987_40919 = G__40924;
chunk__38988_40920 = G__40925;
count__38989_40921 = G__40926;
i__38990_40922 = G__40927;
continue;
} else {
var temp__5804__auto___40928 = cljs.core.seq(seq__38987_40919);
if(temp__5804__auto___40928){
var seq__38987_40929__$1 = temp__5804__auto___40928;
if(cljs.core.chunked_seq_QMARK_(seq__38987_40929__$1)){
var c__5568__auto___40930 = cljs.core.chunk_first(seq__38987_40929__$1);
var G__40931 = cljs.core.chunk_rest(seq__38987_40929__$1);
var G__40932 = c__5568__auto___40930;
var G__40933 = cljs.core.count(c__5568__auto___40930);
var G__40934 = (0);
seq__38987_40919 = G__40931;
chunk__38988_40920 = G__40932;
count__38989_40921 = G__40933;
i__38990_40922 = G__40934;
continue;
} else {
var child_dom_40935 = cljs.core.first(seq__38987_40929__$1);
(zero.impl.components.cleanup_dom.cljs$core$IFn$_invoke$arity$2 ? zero.impl.components.cleanup_dom.cljs$core$IFn$_invoke$arity$2(child_dom_40935,_BANG_instance_state) : zero.impl.components.cleanup_dom.call(null,child_dom_40935,_BANG_instance_state));


var G__40936 = cljs.core.next(seq__38987_40929__$1);
var G__40937 = null;
var G__40938 = (0);
var G__40939 = (0);
seq__38987_40919 = G__40936;
chunk__38988_40920 = G__40937;
count__38989_40921 = G__40938;
i__38990_40922 = G__40939;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_((function (){var and__5043__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dom.nodeName,"LINK");
} else {
return and__5043__auto__;
}
})())){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.components._BANG_css_links,cljs.core.disj,dom);
} else {
return null;
}
});
zero.impl.components.calc_child_dom_changes = (function zero$impl$components$calc_child_dom_changes(source_dom_seq,target_dom_seq,inserted){
if(cljs.core.empty_QMARK_(source_dom_seq)){
if(cljs.core.seq(target_dom_seq)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"insert","insert",1286475395),new cljs.core.Keyword(null,"doms","doms",944981428),target_dom_seq], null)], null);
} else {
return cljs.core.PersistentVector.EMPTY;
}
} else {
if(cljs.core.empty_QMARK_(target_dom_seq)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"remove","remove",-131428414),new cljs.core.Keyword(null,"doms","doms",944981428),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(inserted,source_dom_seq)], null)], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(source_dom_seq),cljs.core.first(target_dom_seq))){
var same_count = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p__38999){
var vec__39001 = p__38999;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39001,(0),null);
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39001,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(s,t);
}),cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,source_dom_seq,target_dom_seq)));
var remaining_source_doms = cljs.core.drop.cljs$core$IFn$_invoke$arity$2(same_count,source_dom_seq);
var remaining_target_doms = cljs.core.drop.cljs$core$IFn$_invoke$arity$2(same_count,target_dom_seq);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(((((cljs.core.seq(remaining_source_doms)) || (cljs.core.seq(remaining_target_doms))))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"skip","skip",602715391),new cljs.core.Keyword(null,"count","count",2139924085),same_count], null)], null):cljs.core.PersistentVector.EMPTY),(zero.impl.components.calc_child_dom_changes.cljs$core$IFn$_invoke$arity$3 ? zero.impl.components.calc_child_dom_changes.cljs$core$IFn$_invoke$arity$3(remaining_source_doms,remaining_target_doms,inserted) : zero.impl.components.calc_child_dom_changes.call(null,remaining_source_doms,remaining_target_doms,inserted)));
} else {
if(cljs.core.contains_QMARK_(inserted,cljs.core.first(source_dom_seq))){
var G__39011 = cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(inserted,source_dom_seq);
var G__39012 = target_dom_seq;
var G__39013 = inserted;
return (zero.impl.components.calc_child_dom_changes.cljs$core$IFn$_invoke$arity$3 ? zero.impl.components.calc_child_dom_changes.cljs$core$IFn$_invoke$arity$3(G__39011,G__39012,G__39013) : zero.impl.components.calc_child_dom_changes.call(null,G__39011,G__39012,G__39013));
} else {
var not_same_count = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p__39017){
var vec__39018 = p__39017;
var s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39018,(0),null);
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39018,(1),null);
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(s,t);
}),cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,source_dom_seq,target_dom_seq)));
var vec__39014 = cljs.core.split_at(not_same_count,target_dom_seq);
var to_insert = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39014,(0),null);
var remaining = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39014,(1),null);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"insert","insert",1286475395),new cljs.core.Keyword(null,"doms","doms",944981428),to_insert], null)], null),(function (){var G__39024 = source_dom_seq;
var G__39025 = remaining;
var G__39026 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(inserted,to_insert);
return (zero.impl.components.calc_child_dom_changes.cljs$core$IFn$_invoke$arity$3 ? zero.impl.components.calc_child_dom_changes.cljs$core$IFn$_invoke$arity$3(G__39024,G__39025,G__39026) : zero.impl.components.calc_child_dom_changes.call(null,G__39024,G__39025,G__39026));
})());

}
}
}
}
});
zero.impl.components.apply_dom_changes = (function zero$impl$components$apply_dom_changes(dom,start_child,changes,_BANG_instance_state){
var _BANG_cursor = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(start_child);
var seq__39037 = cljs.core.seq(changes);
var chunk__39038 = null;
var count__39039 = (0);
var i__39040 = (0);
while(true){
if((i__39040 < count__39039)){
var map__39175 = chunk__39038.cljs$core$IIndexed$_nth$arity$2(null,i__39040);
var map__39175__$1 = cljs.core.__destructure_map(map__39175);
var change = map__39175__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39175__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var G__39176_40962 = op;
var G__39176_40963__$1 = (((G__39176_40962 instanceof cljs.core.Keyword))?G__39176_40962.fqn:null);
switch (G__39176_40963__$1) {
case "skip":
var n__5636__auto___40966 = new cljs.core.Keyword(null,"count","count",2139924085).cljs$core$IFn$_invoke$arity$1(change);
var __40967 = (0);
while(true){
if((__40967 < n__5636__auto___40966)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(_BANG_cursor,((function (__40967,seq__39037,chunk__39038,count__39039,i__39040,n__5636__auto___40966,G__39176_40962,G__39176_40963__$1,map__39175,map__39175__$1,change,op,_BANG_cursor){
return (function (p1__39033_SHARP_){
var G__39177 = p1__39033_SHARP_;
if((G__39177 == null)){
return null;
} else {
return G__39177.nextSibling;
}
});})(__40967,seq__39037,chunk__39038,count__39039,i__39040,n__5636__auto___40966,G__39176_40962,G__39176_40963__$1,map__39175,map__39175__$1,change,op,_BANG_cursor))
);

var G__40968 = (__40967 + (1));
__40967 = G__40968;
continue;
} else {
}
break;
}

break;
case "insert":
if((cljs.core.deref(_BANG_cursor) == null)){
dom.append.apply(dom,cljs.core.to_array(new cljs.core.Keyword(null,"doms","doms",944981428).cljs$core$IFn$_invoke$arity$1(change)));

cljs.core.reset_BANG_(_BANG_cursor,dom.lastChild);
} else {
if(cljs.core.truth_(cljs.core.deref(_BANG_cursor).before)){
cljs.core.deref(_BANG_cursor).before.apply(cljs.core.deref(_BANG_cursor),cljs.core.to_array(new cljs.core.Keyword(null,"doms","doms",944981428).cljs$core$IFn$_invoke$arity$1(change)));
} else {
var seq__39182_40973 = cljs.core.seq(new cljs.core.Keyword(null,"doms","doms",944981428).cljs$core$IFn$_invoke$arity$1(change));
var chunk__39183_40974 = null;
var count__39184_40975 = (0);
var i__39185_40976 = (0);
while(true){
if((i__39185_40976 < count__39184_40975)){
var dom_to_insert_40977 = chunk__39183_40974.cljs$core$IIndexed$_nth$arity$2(null,i__39185_40976);
cljs.core.deref(_BANG_cursor).insertBefore(dom_to_insert_40977);


var G__40978 = seq__39182_40973;
var G__40979 = chunk__39183_40974;
var G__40980 = count__39184_40975;
var G__40981 = (i__39185_40976 + (1));
seq__39182_40973 = G__40978;
chunk__39183_40974 = G__40979;
count__39184_40975 = G__40980;
i__39185_40976 = G__40981;
continue;
} else {
var temp__5804__auto___40986 = cljs.core.seq(seq__39182_40973);
if(temp__5804__auto___40986){
var seq__39182_40987__$1 = temp__5804__auto___40986;
if(cljs.core.chunked_seq_QMARK_(seq__39182_40987__$1)){
var c__5568__auto___40988 = cljs.core.chunk_first(seq__39182_40987__$1);
var G__40989 = cljs.core.chunk_rest(seq__39182_40987__$1);
var G__40991 = c__5568__auto___40988;
var G__40993 = cljs.core.count(c__5568__auto___40988);
var G__40995 = (0);
seq__39182_40973 = G__40989;
chunk__39183_40974 = G__40991;
count__39184_40975 = G__40993;
i__39185_40976 = G__40995;
continue;
} else {
var dom_to_insert_40997 = cljs.core.first(seq__39182_40987__$1);
cljs.core.deref(_BANG_cursor).insertBefore(dom_to_insert_40997);


var G__40998 = cljs.core.next(seq__39182_40987__$1);
var G__40999 = null;
var G__41000 = (0);
var G__41001 = (0);
seq__39182_40973 = G__40998;
chunk__39183_40974 = G__40999;
count__39184_40975 = G__41000;
i__39185_40976 = G__41001;
continue;
}
} else {
}
}
break;
}

}
}

break;
case "remove":
var seq__39186_41006 = cljs.core.seq(new cljs.core.Keyword(null,"doms","doms",944981428).cljs$core$IFn$_invoke$arity$1(change));
var chunk__39187_41007 = null;
var count__39188_41008 = (0);
var i__39189_41009 = (0);
while(true){
if((i__39189_41009 < count__39188_41008)){
var dom_to_remove_41010 = chunk__39187_41007.cljs$core$IIndexed$_nth$arity$2(null,i__39189_41009);
dom.removeChild(dom_to_remove_41010);

zero.impl.components.cleanup_dom(dom_to_remove_41010,_BANG_instance_state);


var G__41013 = seq__39186_41006;
var G__41014 = chunk__39187_41007;
var G__41015 = count__39188_41008;
var G__41016 = (i__39189_41009 + (1));
seq__39186_41006 = G__41013;
chunk__39187_41007 = G__41014;
count__39188_41008 = G__41015;
i__39189_41009 = G__41016;
continue;
} else {
var temp__5804__auto___41018 = cljs.core.seq(seq__39186_41006);
if(temp__5804__auto___41018){
var seq__39186_41019__$1 = temp__5804__auto___41018;
if(cljs.core.chunked_seq_QMARK_(seq__39186_41019__$1)){
var c__5568__auto___41020 = cljs.core.chunk_first(seq__39186_41019__$1);
var G__41021 = cljs.core.chunk_rest(seq__39186_41019__$1);
var G__41022 = c__5568__auto___41020;
var G__41023 = cljs.core.count(c__5568__auto___41020);
var G__41024 = (0);
seq__39186_41006 = G__41021;
chunk__39187_41007 = G__41022;
count__39188_41008 = G__41023;
i__39189_41009 = G__41024;
continue;
} else {
var dom_to_remove_41027 = cljs.core.first(seq__39186_41019__$1);
dom.removeChild(dom_to_remove_41027);

zero.impl.components.cleanup_dom(dom_to_remove_41027,_BANG_instance_state);


var G__41028 = cljs.core.next(seq__39186_41019__$1);
var G__41029 = null;
var G__41030 = (0);
var G__41031 = (0);
seq__39186_41006 = G__41028;
chunk__39187_41007 = G__41029;
count__39188_41008 = G__41030;
i__39189_41009 = G__41031;
continue;
}
} else {
}
}
break;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__39176_40963__$1)].join('')));

}


var G__41034 = seq__39037;
var G__41035 = chunk__39038;
var G__41036 = count__39039;
var G__41037 = (i__39040 + (1));
seq__39037 = G__41034;
chunk__39038 = G__41035;
count__39039 = G__41036;
i__39040 = G__41037;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__39037);
if(temp__5804__auto__){
var seq__39037__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__39037__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__39037__$1);
var G__41039 = cljs.core.chunk_rest(seq__39037__$1);
var G__41040 = c__5568__auto__;
var G__41041 = cljs.core.count(c__5568__auto__);
var G__41042 = (0);
seq__39037 = G__41039;
chunk__39038 = G__41040;
count__39039 = G__41041;
i__39040 = G__41042;
continue;
} else {
var map__39200 = cljs.core.first(seq__39037__$1);
var map__39200__$1 = cljs.core.__destructure_map(map__39200);
var change = map__39200__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39200__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var G__39201_41043 = op;
var G__39201_41044__$1 = (((G__39201_41043 instanceof cljs.core.Keyword))?G__39201_41043.fqn:null);
switch (G__39201_41044__$1) {
case "skip":
var n__5636__auto___41050 = new cljs.core.Keyword(null,"count","count",2139924085).cljs$core$IFn$_invoke$arity$1(change);
var __41051 = (0);
while(true){
if((__41051 < n__5636__auto___41050)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(_BANG_cursor,((function (__41051,seq__39037,chunk__39038,count__39039,i__39040,n__5636__auto___41050,G__39201_41043,G__39201_41044__$1,map__39200,map__39200__$1,change,op,seq__39037__$1,temp__5804__auto__,_BANG_cursor){
return (function (p1__39033_SHARP_){
var G__39202 = p1__39033_SHARP_;
if((G__39202 == null)){
return null;
} else {
return G__39202.nextSibling;
}
});})(__41051,seq__39037,chunk__39038,count__39039,i__39040,n__5636__auto___41050,G__39201_41043,G__39201_41044__$1,map__39200,map__39200__$1,change,op,seq__39037__$1,temp__5804__auto__,_BANG_cursor))
);

var G__41061 = (__41051 + (1));
__41051 = G__41061;
continue;
} else {
}
break;
}

break;
case "insert":
if((cljs.core.deref(_BANG_cursor) == null)){
dom.append.apply(dom,cljs.core.to_array(new cljs.core.Keyword(null,"doms","doms",944981428).cljs$core$IFn$_invoke$arity$1(change)));

cljs.core.reset_BANG_(_BANG_cursor,dom.lastChild);
} else {
if(cljs.core.truth_(cljs.core.deref(_BANG_cursor).before)){
cljs.core.deref(_BANG_cursor).before.apply(cljs.core.deref(_BANG_cursor),cljs.core.to_array(new cljs.core.Keyword(null,"doms","doms",944981428).cljs$core$IFn$_invoke$arity$1(change)));
} else {
var seq__39203_41065 = cljs.core.seq(new cljs.core.Keyword(null,"doms","doms",944981428).cljs$core$IFn$_invoke$arity$1(change));
var chunk__39204_41066 = null;
var count__39205_41067 = (0);
var i__39206_41068 = (0);
while(true){
if((i__39206_41068 < count__39205_41067)){
var dom_to_insert_41069 = chunk__39204_41066.cljs$core$IIndexed$_nth$arity$2(null,i__39206_41068);
cljs.core.deref(_BANG_cursor).insertBefore(dom_to_insert_41069);


var G__41070 = seq__39203_41065;
var G__41071 = chunk__39204_41066;
var G__41072 = count__39205_41067;
var G__41073 = (i__39206_41068 + (1));
seq__39203_41065 = G__41070;
chunk__39204_41066 = G__41071;
count__39205_41067 = G__41072;
i__39206_41068 = G__41073;
continue;
} else {
var temp__5804__auto___41074__$1 = cljs.core.seq(seq__39203_41065);
if(temp__5804__auto___41074__$1){
var seq__39203_41075__$1 = temp__5804__auto___41074__$1;
if(cljs.core.chunked_seq_QMARK_(seq__39203_41075__$1)){
var c__5568__auto___41076 = cljs.core.chunk_first(seq__39203_41075__$1);
var G__41077 = cljs.core.chunk_rest(seq__39203_41075__$1);
var G__41078 = c__5568__auto___41076;
var G__41079 = cljs.core.count(c__5568__auto___41076);
var G__41080 = (0);
seq__39203_41065 = G__41077;
chunk__39204_41066 = G__41078;
count__39205_41067 = G__41079;
i__39206_41068 = G__41080;
continue;
} else {
var dom_to_insert_41082 = cljs.core.first(seq__39203_41075__$1);
cljs.core.deref(_BANG_cursor).insertBefore(dom_to_insert_41082);


var G__41084 = cljs.core.next(seq__39203_41075__$1);
var G__41085 = null;
var G__41086 = (0);
var G__41087 = (0);
seq__39203_41065 = G__41084;
chunk__39204_41066 = G__41085;
count__39205_41067 = G__41086;
i__39206_41068 = G__41087;
continue;
}
} else {
}
}
break;
}

}
}

break;
case "remove":
var seq__39212_41089 = cljs.core.seq(new cljs.core.Keyword(null,"doms","doms",944981428).cljs$core$IFn$_invoke$arity$1(change));
var chunk__39213_41090 = null;
var count__39214_41091 = (0);
var i__39215_41092 = (0);
while(true){
if((i__39215_41092 < count__39214_41091)){
var dom_to_remove_41093 = chunk__39213_41090.cljs$core$IIndexed$_nth$arity$2(null,i__39215_41092);
dom.removeChild(dom_to_remove_41093);

zero.impl.components.cleanup_dom(dom_to_remove_41093,_BANG_instance_state);


var G__41095 = seq__39212_41089;
var G__41096 = chunk__39213_41090;
var G__41097 = count__39214_41091;
var G__41098 = (i__39215_41092 + (1));
seq__39212_41089 = G__41095;
chunk__39213_41090 = G__41096;
count__39214_41091 = G__41097;
i__39215_41092 = G__41098;
continue;
} else {
var temp__5804__auto___41106__$1 = cljs.core.seq(seq__39212_41089);
if(temp__5804__auto___41106__$1){
var seq__39212_41107__$1 = temp__5804__auto___41106__$1;
if(cljs.core.chunked_seq_QMARK_(seq__39212_41107__$1)){
var c__5568__auto___41112 = cljs.core.chunk_first(seq__39212_41107__$1);
var G__41113 = cljs.core.chunk_rest(seq__39212_41107__$1);
var G__41114 = c__5568__auto___41112;
var G__41115 = cljs.core.count(c__5568__auto___41112);
var G__41116 = (0);
seq__39212_41089 = G__41113;
chunk__39213_41090 = G__41114;
count__39214_41091 = G__41115;
i__39215_41092 = G__41116;
continue;
} else {
var dom_to_remove_41121 = cljs.core.first(seq__39212_41107__$1);
dom.removeChild(dom_to_remove_41121);

zero.impl.components.cleanup_dom(dom_to_remove_41121,_BANG_instance_state);


var G__41122 = cljs.core.next(seq__39212_41107__$1);
var G__41123 = null;
var G__41124 = (0);
var G__41125 = (0);
seq__39212_41089 = G__41122;
chunk__39213_41090 = G__41123;
count__39214_41091 = G__41124;
i__39215_41092 = G__41125;
continue;
}
} else {
}
}
break;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__39201_41044__$1)].join('')));

}


var G__41126 = cljs.core.next(seq__39037__$1);
var G__41127 = null;
var G__41128 = (0);
var G__41129 = (0);
seq__39037 = G__41126;
chunk__39038 = G__41127;
count__39039 = G__41128;
i__39040 = G__41129;
continue;
}
} else {
return null;
}
}
break;
}
});
zero.impl.components.patch_children = (function zero$impl$components$patch_children(dom,_BANG_instance_state,children){
var old_child_doms = (function (){var or__5045__auto__ = zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.CHILDREN_SYM);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
})();
var _BANG_child_doms = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.group_by((function (child_dom){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(child_dom.nodeType,Node.TEXT_NODE)){
return new cljs.core.Keyword(null,"text","text",-1790561697);
} else {
var props = zero.impl.components.goog$module$goog$object.get(child_dom,zero.impl.components.PROPS_SYM);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("z","sel","z/sel",-1686154409).cljs$core$IFn$_invoke$arity$1(props),new cljs.core.Keyword("z","key","z/key",-1516042705).cljs$core$IFn$_invoke$arity$1(props)], null);
}
}),old_child_doms));
var take_el_dom = (function (tag,props){
var matcher = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("z","sel","z/sel",-1686154409).cljs$core$IFn$_invoke$arity$1(props),new cljs.core.Keyword("z","key","z/key",-1516042705).cljs$core$IFn$_invoke$arity$1(props)], null);
var match = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_child_doms),matcher));
if(cljs.core.truth_(match)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_child_doms,cljs.core.update,matcher,cljs.core.subvec,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(1)], 0));

return match;
} else {
return document.createElementNS((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"xmlns","xmlns",-1862095571).cljs$core$IFn$_invoke$arity$1(props);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var or__5045__auto____$1 = zero.impl.components.default_ns(tag);
if(cljs.core.truth_(or__5045__auto____$1)){
return or__5045__auto____$1;
} else {
var or__5045__auto____$2 = dom.namespaceURI;
if(cljs.core.truth_(or__5045__auto____$2)){
return or__5045__auto____$2;
} else {
return zero.impl.components.HTML_NS;
}
}
}
})(),zero.impl.components.kw__GT_el_name(tag));
}
});
var take_text_dom = (function (){
var temp__5802__auto__ = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_child_doms),new cljs.core.Keyword(null,"text","text",-1790561697)));
if(cljs.core.truth_(temp__5802__auto__)){
var existing = temp__5802__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_child_doms,cljs.core.update,new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.subvec,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(1)], 0));

return existing;
} else {
return document.createTextNode("");
}
});
var new_child_doms = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function zero$impl$components$patch_children_$_process_children(vnode){
if(cljs.core.vector_QMARK_(vnode)){
var vec__39231 = zero.impl.components.preproc_vnode(vnode);
var tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39231,(0),null);
var props = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39231,(1),null);
var body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39231,(2),null);
var child_dom = take_el_dom(tag,props);
var old_props = zero.impl.components.goog$module$goog$object.get(child_dom,zero.impl.components.PROPS_SYM);
if(((zero.config.disable_tags_QMARK_) || ((((new cljs.core.Keyword("z","tag","z/tag",-1290363645).cljs$core$IFn$_invoke$arity$1(props) == null)) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("z","tag","z/tag",-1290363645).cljs$core$IFn$_invoke$arity$1(props),new cljs.core.Keyword("z","tag","z/tag",-1290363645).cljs$core$IFn$_invoke$arity$1(old_props))))))){
zero.impl.components.patch_props(child_dom,_BANG_instance_state,props);

(zero.impl.components.patch_children.cljs$core$IFn$_invoke$arity$3 ? zero.impl.components.patch_children.cljs$core$IFn$_invoke$arity$3(child_dom,_BANG_instance_state,body) : zero.impl.components.patch_children.call(null,child_dom,_BANG_instance_state,body));
} else {
}

return child_dom;
} else {
var child_dom = take_text_dom();
(child_dom.nodeValue = cljs.core.str.cljs$core$IFn$_invoke$arity$1(vnode));

return child_dom;

}
}),children);
var focused_doms = new cljs.core.Keyword(null,"doms-on-focus-path","doms-on-focus-path",-1367810425).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state));
var index_of_focused_child_in_new = ((cljs.core.seq(focused_doms))?zero.impl.base.index_of(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.contains_QMARK_,focused_doms),new_child_doms):null);
if(cljs.core.truth_(goog.DEBUG)){
var seq__39247_41145 = cljs.core.seq(new_child_doms);
var chunk__39249_41146 = null;
var count__39250_41147 = (0);
var i__39251_41148 = (0);
while(true){
if((i__39251_41148 < count__39250_41147)){
var child_dom_41149 = chunk__39249_41146.cljs$core$IIndexed$_nth$arity$2(null,i__39251_41148);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(child_dom_41149.nodeName,"LINK")) && (cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["stylesheet",null,"preload",null], null), null),child_dom_41149.rel)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.components._BANG_css_links,cljs.core.conj,child_dom_41149);


var G__41163 = seq__39247_41145;
var G__41164 = chunk__39249_41146;
var G__41165 = count__39250_41147;
var G__41166 = (i__39251_41148 + (1));
seq__39247_41145 = G__41163;
chunk__39249_41146 = G__41164;
count__39250_41147 = G__41165;
i__39251_41148 = G__41166;
continue;
} else {
var G__41167 = seq__39247_41145;
var G__41168 = chunk__39249_41146;
var G__41169 = count__39250_41147;
var G__41170 = (i__39251_41148 + (1));
seq__39247_41145 = G__41167;
chunk__39249_41146 = G__41168;
count__39250_41147 = G__41169;
i__39251_41148 = G__41170;
continue;
}
} else {
var temp__5804__auto___41171 = cljs.core.seq(seq__39247_41145);
if(temp__5804__auto___41171){
var seq__39247_41172__$1 = temp__5804__auto___41171;
if(cljs.core.chunked_seq_QMARK_(seq__39247_41172__$1)){
var c__5568__auto___41173 = cljs.core.chunk_first(seq__39247_41172__$1);
var G__41174 = cljs.core.chunk_rest(seq__39247_41172__$1);
var G__41175 = c__5568__auto___41173;
var G__41176 = cljs.core.count(c__5568__auto___41173);
var G__41177 = (0);
seq__39247_41145 = G__41174;
chunk__39249_41146 = G__41175;
count__39250_41147 = G__41176;
i__39251_41148 = G__41177;
continue;
} else {
var child_dom_41178 = cljs.core.first(seq__39247_41172__$1);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(child_dom_41178.nodeName,"LINK")) && (cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["stylesheet",null,"preload",null], null), null),child_dom_41178.rel)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.components._BANG_css_links,cljs.core.conj,child_dom_41178);


var G__41179 = cljs.core.next(seq__39247_41172__$1);
var G__41180 = null;
var G__41181 = (0);
var G__41182 = (0);
seq__39247_41145 = G__41179;
chunk__39249_41146 = G__41180;
count__39250_41147 = G__41181;
i__39251_41148 = G__41182;
continue;
} else {
var G__41183 = cljs.core.next(seq__39247_41172__$1);
var G__41184 = null;
var G__41185 = (0);
var G__41186 = (0);
seq__39247_41145 = G__41183;
chunk__39249_41146 = G__41184;
count__39250_41147 = G__41185;
i__39251_41148 = G__41186;
continue;
}
}
} else {
}
}
break;
}
} else {
}

if((index_of_focused_child_in_new == null)){
zero.impl.components.apply_dom_changes(dom,dom.firstChild,zero.impl.components.calc_child_dom_changes(old_child_doms,new_child_doms,cljs.core.PersistentHashSet.EMPTY),_BANG_instance_state);
} else {
var focused_child_dom_41187 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(new_child_doms,index_of_focused_child_in_new);
var index_of_focused_child_in_old_41188 = (function (){var or__5045__auto__ = zero.impl.base.index_of(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,focused_child_dom_41187),old_child_doms);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.count(old_child_doms);
}
})();
var changes_before_focused_dom_41189 = zero.impl.components.calc_child_dom_changes(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(old_child_doms,(0),index_of_focused_child_in_old_41188),cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(new_child_doms,(0),index_of_focused_child_in_new),cljs.core.PersistentHashSet.EMPTY);
var changes_after_focused_dom_41190 = zero.impl.components.calc_child_dom_changes(cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(old_child_doms,(index_of_focused_child_in_old_41188 + (1))),cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(new_child_doms,(index_of_focused_child_in_new + (1))),cljs.core.PersistentHashSet.EMPTY);
zero.impl.components.apply_dom_changes(dom,dom.firstChild,changes_before_focused_dom_41189,_BANG_instance_state);

zero.impl.components.apply_dom_changes(dom,focused_child_dom_41187.nextSibling,changes_after_focused_dom_41190,_BANG_instance_state);
}

return zero.impl.components.goog$module$goog$object.set(dom,zero.impl.components.CHILDREN_SYM,new_child_doms);
});
zero.impl.components.render = (function zero$impl$components$render(dom,internals,_BANG_instance_state,vnode){
var _BANG_static_state = zero.impl.components.goog$module$goog$object.get(dom.host.constructor,zero.impl.components.PRIVATE_SYM);
var default_css = new cljs.core.Keyword(null,"default-css","default-css",-465509664).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_static_state));
var old_props = zero.impl.components.goog$module$goog$object.get(dom,zero.impl.components.PROPS_SYM);
var vec__39266 = ((((cljs.core.vector_QMARK_(vnode)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(vnode),new cljs.core.Keyword(null,"root>","root>",-580665331)))))?cljs.core.rest(zero.impl.components.preproc_vnode(vnode)):((cljs.core.seq_QMARK_(vnode))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,vnode], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,(new cljs.core.List(null,vnode,null,(1),null))], null)
));
var props = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39266,(0),null);
var body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39266,(1),null);
if(((zero.config.disable_tags_QMARK_) || ((((new cljs.core.Keyword("z","tag","z/tag",-1290363645).cljs$core$IFn$_invoke$arity$1(props) == null)) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("z","tag","z/tag",-1290363645).cljs$core$IFn$_invoke$arity$1(props),new cljs.core.Keyword("z","tag","z/tag",-1290363645).cljs$core$IFn$_invoke$arity$1(old_props))))))){
zero.impl.components.patch_root_props(dom,internals,cljs.core.update.cljs$core$IFn$_invoke$arity$3(props,new cljs.core.Keyword("z","css","z/css",1135045281),(function (p1__39258_SHARP_){
if(cljs.core.coll_QMARK_(p1__39258_SHARP_)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(default_css,p1__39258_SHARP_);
} else {
if((!((p1__39258_SHARP_ == null)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(default_css,p1__39258_SHARP_);
} else {
return default_css;

}
}
})));

return zero.impl.components.patch_children(dom,_BANG_instance_state,body);
} else {
return null;
}
});
zero.impl.components.normalize_prop_spec = (function zero$impl$components$normalize_prop_spec(prop_name,prop_spec){
var G__39272 = prop_spec;
var G__39272__$1 = (((G__39272 instanceof cljs.core.Keyword))?G__39272.fqn:null);
switch (G__39272__$1) {
case "attr":
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"attr","attr",-604132353),zero.impl.base.snake_case(cljs.core.name(prop_name)),new cljs.core.Keyword(null,"field","field",-1302436500),zero.impl.base.cammel_case(cljs.core.name(prop_name)),new cljs.core.Keyword(null,"prop","prop",-515168332),prop_name], null);

break;
case "field":
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"field","field",-1302436500),zero.impl.base.cammel_case(cljs.core.name(prop_name)),new cljs.core.Keyword(null,"prop","prop",-515168332),prop_name], null);

break;
default:
if((((!((prop_spec == null))))?(((((prop_spec.cljs$lang$protocol_mask$partition1$ & (2))) || ((cljs.core.PROTOCOL_SENTINEL === prop_spec.cljs$core$IWatchable$))))?true:(((!prop_spec.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,prop_spec):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,prop_spec))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state-factory","state-factory",-225444643),cljs.core.constantly(prop_spec),new cljs.core.Keyword(null,"prop","prop",-515168332),prop_name], null);
} else {
if(cljs.core.fn_QMARK_(prop_spec)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state-factory","state-factory",-225444643),prop_spec,new cljs.core.Keyword(null,"prop","prop",-515168332),prop_name], null);
} else {
if(cljs.core.map_QMARK_(prop_spec)){
var G__39282 = prop_spec;
var G__39282__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39282,new cljs.core.Keyword(null,"prop","prop",-515168332),prop_name)
;
if(cljs.core.not((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(prop_spec);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var or__5045__auto____$1 = new cljs.core.Keyword(null,"state","state",-1988618099).cljs$core$IFn$_invoke$arity$1(prop_spec);
if(cljs.core.truth_(or__5045__auto____$1)){
return or__5045__auto____$1;
} else {
return new cljs.core.Keyword(null,"state-factory","state-factory",-225444643).cljs$core$IFn$_invoke$arity$1(prop_spec);
}
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__39282__$1,new cljs.core.Keyword(null,"field","field",-1302436500),zero.impl.base.cammel_case(cljs.core.name(prop_name)));
} else {
return G__39282__$1;
}
} else {
return null;
}
}
}

}
});
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components._BANG_dirty !== 'undefined')){
} else {
zero.impl.components._BANG_dirty = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashSet.EMPTY);
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components._BANG_render_frame_id !== 'undefined')){
} else {
zero.impl.components._BANG_render_frame_id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
zero.impl.components.do_render = (function zero$impl$components$do_render(){
cljs.core.reset_BANG_(zero.impl.components._BANG_render_frame_id,null);

while(true){
if(cljs.core.seq(cljs.core.deref(zero.impl.components._BANG_dirty))){
var batch_41245 = cljs.core.deref(zero.impl.components._BANG_dirty);
cljs.core.reset_BANG_(zero.impl.components._BANG_dirty,cljs.core.PersistentHashSet.EMPTY);

var seq__39287_41247 = cljs.core.seq(batch_41245);
var chunk__39288_41248 = null;
var count__39289_41249 = (0);
var i__39290_41250 = (0);
while(true){
if((i__39290_41250 < count__39289_41249)){
var dom_41251 = chunk__39288_41248.cljs$core$IIndexed$_nth$arity$2(null,i__39290_41250);
var _BANG_static_state_41252 = zero.impl.components.goog$module$goog$object.get(dom_41251.constructor,zero.impl.components.PRIVATE_SYM);
var _BANG_instance_state_41253 = zero.impl.components.goog$module$goog$object.get(dom_41251,zero.impl.components.PRIVATE_SYM);
var shadow_41255__$1 = new cljs.core.Keyword(null,"shadow","shadow",873231803).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state_41253));
var rendered_props_41256 = zero.impl.components.goog$module$goog$object.get(dom_41251,zero.impl.components.PROPS_SYM);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"focus","focus",234677911).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_static_state_41252)),new cljs.core.Keyword(null,"self","self",-1547428899))) && ((((!(((cljs.core.contains_QMARK_(rendered_props_41256,new cljs.core.Keyword(null,"tab-index","tab-index",895755393))) || (cljs.core.contains_QMARK_(rendered_props_41256,new cljs.core.Keyword(null,"tabindex","tabindex",338877510))))))) && ((dom_41251.tabIndex < (0))))))){
(dom_41251.tabIndex = (0));
} else {
}

try{zero.impl.components.render(shadow_41255__$1,new cljs.core.Keyword(null,"internals","internals",-1765165608).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state_41253)),_BANG_instance_state_41253,(function (){var G__39330 = new cljs.core.Keyword(null,"props","props",453281727).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state_41253));
var fexpr__39329 = new cljs.core.Keyword(null,"view","view",1247994814).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_static_state_41252));
return (fexpr__39329.cljs$core$IFn$_invoke$arity$1 ? fexpr__39329.cljs$core$IFn$_invoke$arity$1(G__39330) : fexpr__39329.call(null,G__39330));
})());
}catch (e39328){var e_41257 = e39328;
console.error("Error rendering component",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_static_state_41252)),e_41257);
}
var event_type_41258 = (cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state_41253)))?"update":(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state_41253,cljs.core.assoc,new cljs.core.Keyword(null,"connected","connected",-169833045),true);

return "connect";
})()
);
var observed_events_41259 = cljs.core.set(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (seq__39287_41247,chunk__39288_41248,count__39289_41249,i__39290_41250,event_type_41258,_BANG_static_state_41252,_BANG_instance_state_41253,shadow_41255__$1,rendered_props_41256,dom_41251,batch_41245){
return (function (p1__39286_SHARP_){
if((cljs.core.val(p1__39286_SHARP_) > (0))){
return cljs.core.key(p1__39286_SHARP_);
} else {
return null;
}
});})(seq__39287_41247,chunk__39288_41248,count__39289_41249,i__39290_41250,event_type_41258,_BANG_static_state_41252,_BANG_instance_state_41253,shadow_41255__$1,rendered_props_41256,dom_41251,batch_41245))
,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state_41253),new cljs.core.Keyword(null,"lifecycle-event-listener-counts","lifecycle-event-listener-counts",1502831516))));
if(cljs.core.seq(observed_events_41259)){
setTimeout(((function (seq__39287_41247,chunk__39288_41248,count__39289_41249,i__39290_41250,event_type_41258,observed_events_41259,_BANG_static_state_41252,_BANG_instance_state_41253,shadow_41255__$1,rendered_props_41256,dom_41251,batch_41245){
return (function (){
if(cljs.core.contains_QMARK_(observed_events_41259,event_type_41258)){
shadow_41255__$1.dispatchEvent((new Event(event_type_41258,({"bubbles": false}))));
} else {
}

if(cljs.core.contains_QMARK_(observed_events_41259,"render")){
return shadow_41255__$1.dispatchEvent((new Event("render",({"bubbles": false}))));
} else {
return null;
}
});})(seq__39287_41247,chunk__39288_41248,count__39289_41249,i__39290_41250,event_type_41258,observed_events_41259,_BANG_static_state_41252,_BANG_instance_state_41253,shadow_41255__$1,rendered_props_41256,dom_41251,batch_41245))
);
} else {
}


var G__41261 = seq__39287_41247;
var G__41262 = chunk__39288_41248;
var G__41263 = count__39289_41249;
var G__41264 = (i__39290_41250 + (1));
seq__39287_41247 = G__41261;
chunk__39288_41248 = G__41262;
count__39289_41249 = G__41263;
i__39290_41250 = G__41264;
continue;
} else {
var temp__5804__auto___41265 = cljs.core.seq(seq__39287_41247);
if(temp__5804__auto___41265){
var seq__39287_41266__$1 = temp__5804__auto___41265;
if(cljs.core.chunked_seq_QMARK_(seq__39287_41266__$1)){
var c__5568__auto___41268 = cljs.core.chunk_first(seq__39287_41266__$1);
var G__41269 = cljs.core.chunk_rest(seq__39287_41266__$1);
var G__41270 = c__5568__auto___41268;
var G__41271 = cljs.core.count(c__5568__auto___41268);
var G__41272 = (0);
seq__39287_41247 = G__41269;
chunk__39288_41248 = G__41270;
count__39289_41249 = G__41271;
i__39290_41250 = G__41272;
continue;
} else {
var dom_41273 = cljs.core.first(seq__39287_41266__$1);
var _BANG_static_state_41274 = zero.impl.components.goog$module$goog$object.get(dom_41273.constructor,zero.impl.components.PRIVATE_SYM);
var _BANG_instance_state_41275 = zero.impl.components.goog$module$goog$object.get(dom_41273,zero.impl.components.PRIVATE_SYM);
var shadow_41276__$1 = new cljs.core.Keyword(null,"shadow","shadow",873231803).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state_41275));
var rendered_props_41277 = zero.impl.components.goog$module$goog$object.get(dom_41273,zero.impl.components.PROPS_SYM);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"focus","focus",234677911).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_static_state_41274)),new cljs.core.Keyword(null,"self","self",-1547428899))) && ((((!(((cljs.core.contains_QMARK_(rendered_props_41277,new cljs.core.Keyword(null,"tab-index","tab-index",895755393))) || (cljs.core.contains_QMARK_(rendered_props_41277,new cljs.core.Keyword(null,"tabindex","tabindex",338877510))))))) && ((dom_41273.tabIndex < (0))))))){
(dom_41273.tabIndex = (0));
} else {
}

try{zero.impl.components.render(shadow_41276__$1,new cljs.core.Keyword(null,"internals","internals",-1765165608).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state_41275)),_BANG_instance_state_41275,(function (){var G__39342 = new cljs.core.Keyword(null,"props","props",453281727).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state_41275));
var fexpr__39341 = new cljs.core.Keyword(null,"view","view",1247994814).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_static_state_41274));
return (fexpr__39341.cljs$core$IFn$_invoke$arity$1 ? fexpr__39341.cljs$core$IFn$_invoke$arity$1(G__39342) : fexpr__39341.call(null,G__39342));
})());
}catch (e39339){var e_41278 = e39339;
console.error("Error rendering component",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_static_state_41274)),e_41278);
}
var event_type_41279 = (cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state_41275)))?"update":(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state_41275,cljs.core.assoc,new cljs.core.Keyword(null,"connected","connected",-169833045),true);

return "connect";
})()
);
var observed_events_41280 = cljs.core.set(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (seq__39287_41247,chunk__39288_41248,count__39289_41249,i__39290_41250,event_type_41279,_BANG_static_state_41274,_BANG_instance_state_41275,shadow_41276__$1,rendered_props_41277,dom_41273,seq__39287_41266__$1,temp__5804__auto___41265,batch_41245){
return (function (p1__39286_SHARP_){
if((cljs.core.val(p1__39286_SHARP_) > (0))){
return cljs.core.key(p1__39286_SHARP_);
} else {
return null;
}
});})(seq__39287_41247,chunk__39288_41248,count__39289_41249,i__39290_41250,event_type_41279,_BANG_static_state_41274,_BANG_instance_state_41275,shadow_41276__$1,rendered_props_41277,dom_41273,seq__39287_41266__$1,temp__5804__auto___41265,batch_41245))
,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state_41275),new cljs.core.Keyword(null,"lifecycle-event-listener-counts","lifecycle-event-listener-counts",1502831516))));
if(cljs.core.seq(observed_events_41280)){
setTimeout(((function (seq__39287_41247,chunk__39288_41248,count__39289_41249,i__39290_41250,event_type_41279,observed_events_41280,_BANG_static_state_41274,_BANG_instance_state_41275,shadow_41276__$1,rendered_props_41277,dom_41273,seq__39287_41266__$1,temp__5804__auto___41265,batch_41245){
return (function (){
if(cljs.core.contains_QMARK_(observed_events_41280,event_type_41279)){
shadow_41276__$1.dispatchEvent((new Event(event_type_41279,({"bubbles": false}))));
} else {
}

if(cljs.core.contains_QMARK_(observed_events_41280,"render")){
return shadow_41276__$1.dispatchEvent((new Event("render",({"bubbles": false}))));
} else {
return null;
}
});})(seq__39287_41247,chunk__39288_41248,count__39289_41249,i__39290_41250,event_type_41279,observed_events_41280,_BANG_static_state_41274,_BANG_instance_state_41275,shadow_41276__$1,rendered_props_41277,dom_41273,seq__39287_41266__$1,temp__5804__auto___41265,batch_41245))
);
} else {
}


var G__41282 = cljs.core.next(seq__39287_41266__$1);
var G__41283 = null;
var G__41284 = (0);
var G__41285 = (0);
seq__39287_41247 = G__41282;
chunk__39288_41248 = G__41283;
count__39289_41249 = G__41284;
i__39290_41250 = G__41285;
continue;
}
} else {
}
}
break;
}

continue;
} else {
return null;
}
break;
}
});
zero.impl.components.request_render = (function zero$impl$components$request_render(dom){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.components._BANG_dirty,cljs.core.conj,dom);

if(cljs.core.truth_(cljs.core.deref(zero.impl.components._BANG_render_frame_id))){
return null;
} else {
return cljs.core.reset_BANG_(zero.impl.components._BANG_render_frame_id,requestAnimationFrame(zero.impl.components.do_render));
}
});
zero.impl.components.patch_el_class = (function zero$impl$components$patch_el_class(class$,p__39356){
var map__39357 = p__39356;
var map__39357__$1 = cljs.core.__destructure_map(map__39357);
var props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39357__$1,new cljs.core.Keyword(null,"props","props",453281727));
var view = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39357__$1,new cljs.core.Keyword(null,"view","view",1247994814));
var focus = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39357__$1,new cljs.core.Keyword(null,"focus","focus",234677911));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39357__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var inherit_doc_css_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39357__$1,new cljs.core.Keyword(null,"inherit-doc-css?","inherit-doc-css?",-1619926114));
var proto = class$.prototype;
var _BANG_static_state = zero.impl.components.goog$module$goog$object.get(class$,zero.impl.components.PRIVATE_SYM);
var props_map = ((cljs.core.set_QMARK_(props))?cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__39346_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[p1__39346_SHARP_,new cljs.core.Keyword(null,"field","field",-1302436500)],null));
}),props)):((cljs.core.map_QMARK_(props))?props:(((props == null))?cljs.core.PersistentArrayMap.EMPTY:(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Props must be either a map or a set",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"props","props",453281727),props,new cljs.core.Keyword(null,"component","component",1555936782),name], null))})()
)));
var normalized_prop_specs = cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p1__39347_SHARP_){
return zero.impl.components.normalize_prop_spec(cljs.core.key(p1__39347_SHARP_),cljs.core.val(p1__39347_SHARP_));
}),props_map);
var attr__GT_prop_spec = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (prop_spec){
if(cljs.core.truth_((function (){var and__5043__auto__ = new cljs.core.Keyword(null,"attr","attr",-604132353).cljs$core$IFn$_invoke$arity$1(prop_spec);
if(cljs.core.truth_(and__5043__auto__)){
return (new cljs.core.Keyword(null,"state-factory","state-factory",-225444643).cljs$core$IFn$_invoke$arity$1(prop_spec) == null);
} else {
return and__5043__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"attr","attr",-604132353).cljs$core$IFn$_invoke$arity$1(prop_spec),prop_spec], null);
} else {
return null;
}
}),normalized_prop_specs));
var state_prop_specs = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"state-factory","state-factory",-225444643),normalized_prop_specs);
var init_state_props = (function (instance){
var _BANG_instance_state = zero.impl.components.goog$module$goog$object.get(instance,zero.impl.components.PRIVATE_SYM);
var seq__39415 = cljs.core.seq(state_prop_specs);
var chunk__39417 = null;
var count__39418 = (0);
var i__39419 = (0);
while(true){
if((i__39419 < count__39418)){
var prop_spec = chunk__39417.cljs$core$IIndexed$_nth$arity$2(null,i__39419);
if(cljs.core.contains_QMARK_(new cljs.core.Keyword(null,"props","props",453281727).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)),new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec))){
} else {
try{var state_41289 = (function (){var fexpr__39456 = new cljs.core.Keyword(null,"state-factory","state-factory",-225444643).cljs$core$IFn$_invoke$arity$1(prop_spec);
return (fexpr__39456.cljs$core$IFn$_invoke$arity$1 ? fexpr__39456.cljs$core$IFn$_invoke$arity$1(instance) : fexpr__39456.call(null,instance));
})();
var watch_key_41290 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("zero.impl.components","state-prop","zero.impl.components/state-prop",1257932679),new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec),instance], null);
var cleanup_fn_41291 = ((function (seq__39415,chunk__39417,count__39418,i__39419,state_41289,watch_key_41290,prop_spec,_BANG_instance_state,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_){
return (function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"props","props",453281727),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec)], 0));

cljs.core.remove_watch(state_41289,watch_key_41290);

var temp__5804__auto__ = new cljs.core.Keyword(null,"state-cleanup","state-cleanup",338050984).cljs$core$IFn$_invoke$arity$1(prop_spec);
if(cljs.core.truth_(temp__5804__auto__)){
var state_cleanup = temp__5804__auto__;
return (state_cleanup.cljs$core$IFn$_invoke$arity$2 ? state_cleanup.cljs$core$IFn$_invoke$arity$2(state_41289,instance) : state_cleanup.call(null,state_41289,instance));
} else {
return null;
}
});})(seq__39415,chunk__39417,count__39418,i__39419,state_41289,watch_key_41290,prop_spec,_BANG_instance_state,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_))
;
if((((!((state_41289 == null))))?(((((state_41289.cljs$lang$protocol_mask$partition1$ & (2))) || ((cljs.core.PROTOCOL_SENTINEL === state_41289.cljs$core$IWatchable$))))?true:(((!state_41289.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,state_41289):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,state_41289))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("State factory produced something not watchable",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state","state",-1988618099),state_41289,new cljs.core.Keyword(null,"component","component",1555936782),name], null));
}

if((((!((state_41289 == null))))?(((((state_41289.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === state_41289.cljs$core$IDeref$))))?true:(((!state_41289.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,state_41289):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,state_41289))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"props","props",453281727),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec),cljs.core.deref(state_41289)], 0));
} else {
}

cljs.core.add_watch(state_41289,watch_key_41290,((function (seq__39415,chunk__39417,count__39418,i__39419,state_41289,watch_key_41290,cleanup_fn_41291,prop_spec,_BANG_instance_state,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_){
return (function (_,___$1,___$2,new_val){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"props","props",453281727),new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec)], null),new_val);

if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)))){
return zero.impl.components.request_render(instance);
} else {
return null;
}
});})(seq__39415,chunk__39417,count__39418,i__39419,state_41289,watch_key_41290,cleanup_fn_41291,prop_spec,_BANG_instance_state,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_))
);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"cleanup-fns","cleanup-fns",-1465758193),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cleanup_fn_41291], 0));
}catch (e39455){var e_41296 = e39455;
console.error("Error initializing state prop",e_41296);
}}


var G__41297 = seq__39415;
var G__41298 = chunk__39417;
var G__41299 = count__39418;
var G__41300 = (i__39419 + (1));
seq__39415 = G__41297;
chunk__39417 = G__41298;
count__39418 = G__41299;
i__39419 = G__41300;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__39415);
if(temp__5804__auto__){
var seq__39415__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__39415__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__39415__$1);
var G__41301 = cljs.core.chunk_rest(seq__39415__$1);
var G__41302 = c__5568__auto__;
var G__41303 = cljs.core.count(c__5568__auto__);
var G__41304 = (0);
seq__39415 = G__41301;
chunk__39417 = G__41302;
count__39418 = G__41303;
i__39419 = G__41304;
continue;
} else {
var prop_spec = cljs.core.first(seq__39415__$1);
if(cljs.core.contains_QMARK_(new cljs.core.Keyword(null,"props","props",453281727).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)),new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec))){
} else {
try{var state_41305 = (function (){var fexpr__39464 = new cljs.core.Keyword(null,"state-factory","state-factory",-225444643).cljs$core$IFn$_invoke$arity$1(prop_spec);
return (fexpr__39464.cljs$core$IFn$_invoke$arity$1 ? fexpr__39464.cljs$core$IFn$_invoke$arity$1(instance) : fexpr__39464.call(null,instance));
})();
var watch_key_41306 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("zero.impl.components","state-prop","zero.impl.components/state-prop",1257932679),new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec),instance], null);
var cleanup_fn_41307 = ((function (seq__39415,chunk__39417,count__39418,i__39419,state_41305,watch_key_41306,prop_spec,seq__39415__$1,temp__5804__auto__,_BANG_instance_state,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_){
return (function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"props","props",453281727),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec)], 0));

cljs.core.remove_watch(state_41305,watch_key_41306);

var temp__5804__auto____$1 = new cljs.core.Keyword(null,"state-cleanup","state-cleanup",338050984).cljs$core$IFn$_invoke$arity$1(prop_spec);
if(cljs.core.truth_(temp__5804__auto____$1)){
var state_cleanup = temp__5804__auto____$1;
return (state_cleanup.cljs$core$IFn$_invoke$arity$2 ? state_cleanup.cljs$core$IFn$_invoke$arity$2(state_41305,instance) : state_cleanup.call(null,state_41305,instance));
} else {
return null;
}
});})(seq__39415,chunk__39417,count__39418,i__39419,state_41305,watch_key_41306,prop_spec,seq__39415__$1,temp__5804__auto__,_BANG_instance_state,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_))
;
if((((!((state_41305 == null))))?(((((state_41305.cljs$lang$protocol_mask$partition1$ & (2))) || ((cljs.core.PROTOCOL_SENTINEL === state_41305.cljs$core$IWatchable$))))?true:(((!state_41305.cljs$lang$protocol_mask$partition1$))?cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,state_41305):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IWatchable,state_41305))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("State factory produced something not watchable",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state","state",-1988618099),state_41305,new cljs.core.Keyword(null,"component","component",1555936782),name], null));
}

if((((!((state_41305 == null))))?(((((state_41305.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === state_41305.cljs$core$IDeref$))))?true:(((!state_41305.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,state_41305):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,state_41305))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"props","props",453281727),cljs.core.assoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec),cljs.core.deref(state_41305)], 0));
} else {
}

cljs.core.add_watch(state_41305,watch_key_41306,((function (seq__39415,chunk__39417,count__39418,i__39419,state_41305,watch_key_41306,cleanup_fn_41307,prop_spec,seq__39415__$1,temp__5804__auto__,_BANG_instance_state,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_){
return (function (_,___$1,___$2,new_val){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"props","props",453281727),new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec)], null),new_val);

if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)))){
return zero.impl.components.request_render(instance);
} else {
return null;
}
});})(seq__39415,chunk__39417,count__39418,i__39419,state_41305,watch_key_41306,cleanup_fn_41307,prop_spec,seq__39415__$1,temp__5804__auto__,_BANG_instance_state,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_))
);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"cleanup-fns","cleanup-fns",-1465758193),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentHashSet.EMPTY),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cleanup_fn_41307], 0));
}catch (e39463){var e_41311 = e39463;
console.error("Error initializing state prop",e_41311);
}}


var G__41312 = cljs.core.next(seq__39415__$1);
var G__41313 = null;
var G__41314 = (0);
var G__41315 = (0);
seq__39415 = G__41312;
chunk__39417 = G__41313;
count__39418 = G__41314;
i__39419 = G__41315;
continue;
}
} else {
return null;
}
}
break;
}
});
var default_css = (function (){var G__39476 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [zero.impl.components.DEFAULT_CSS], null);
if(cljs.core.truth_(inherit_doc_css_QMARK_)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(G__39476,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(zero.impl.components.__GT_stylesheet_object,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(clojure.string.blank_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (link_dom){
return link_dom.getAttribute("href");
}),cljs.core.es6_iterator_seq(document.querySelectorAll("link[rel=\"stylesheet\"]").values())))));
} else {
return G__39476;
}
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(_BANG_static_state,cljs.core.merge,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"view","view",1247994814),view,new cljs.core.Keyword(null,"focus","focus",234677911),focus,new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"default-css","default-css",-465509664),default_css], null));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.components._BANG_class__GT_fields_index,cljs.core.dissoc,class$);

Object.defineProperty(class$,"observedAttributes",({"value": cljs.core.to_array(cljs.core.keys(attr__GT_prop_spec)), "configurable": true}));

Object.defineProperties(proto,({"connectedCallback": ({"value": (function (){
var this$ = this;
var _BANG_instance_state = zero.impl.components.goog$module$goog$object.get(this$,zero.impl.components.PRIVATE_SYM);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_static_state,cljs.core.update,new cljs.core.Keyword(null,"instances","instances",-335364781),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([this$], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc,new cljs.core.Keyword(null,"binds","binds",363649660),cljs.core.PersistentArrayMap.EMPTY);

init_state_props(this$);

return zero.impl.components.request_render(this$);
}), "configurable": true}), "disconnectedCallback": ({"value": (function (){
var this$ = this;
var _BANG_instance_state = zero.impl.components.goog$module$goog$object.get(this$,zero.impl.components.PRIVATE_SYM);
var shadow__$1 = new cljs.core.Keyword(null,"shadow","shadow",873231803).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state));
if((cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(_BANG_instance_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lifecycle-event-listener-counts","lifecycle-event-listener-counts",1502831516),"disconnect"], null)) > (0))){
shadow__$1.dispatchEvent((new Event("disconnect",({"bubbles": false}))));
} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.components._BANG_dirty,cljs.core.disj,this$);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_static_state,cljs.core.update,new cljs.core.Keyword(null,"instances","instances",-335364781),cljs.core.disj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([this$], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc,new cljs.core.Keyword(null,"connected","connected",-169833045),false);

var seq__39479_41319 = cljs.core.seq(new cljs.core.Keyword(null,"cleanup-fns","cleanup-fns",-1465758193).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)));
var chunk__39480_41320 = null;
var count__39481_41321 = (0);
var i__39482_41322 = (0);
while(true){
if((i__39482_41322 < count__39481_41321)){
var cleanup_fn_41323 = chunk__39480_41320.cljs$core$IIndexed$_nth$arity$2(null,i__39482_41322);
(cleanup_fn_41323.cljs$core$IFn$_invoke$arity$0 ? cleanup_fn_41323.cljs$core$IFn$_invoke$arity$0() : cleanup_fn_41323.call(null));


var G__41324 = seq__39479_41319;
var G__41325 = chunk__39480_41320;
var G__41326 = count__39481_41321;
var G__41327 = (i__39482_41322 + (1));
seq__39479_41319 = G__41324;
chunk__39480_41320 = G__41325;
count__39481_41321 = G__41326;
i__39482_41322 = G__41327;
continue;
} else {
var temp__5804__auto___41328 = cljs.core.seq(seq__39479_41319);
if(temp__5804__auto___41328){
var seq__39479_41329__$1 = temp__5804__auto___41328;
if(cljs.core.chunked_seq_QMARK_(seq__39479_41329__$1)){
var c__5568__auto___41330 = cljs.core.chunk_first(seq__39479_41329__$1);
var G__41331 = cljs.core.chunk_rest(seq__39479_41329__$1);
var G__41332 = c__5568__auto___41330;
var G__41333 = cljs.core.count(c__5568__auto___41330);
var G__41334 = (0);
seq__39479_41319 = G__41331;
chunk__39480_41320 = G__41332;
count__39481_41321 = G__41333;
i__39482_41322 = G__41334;
continue;
} else {
var cleanup_fn_41335 = cljs.core.first(seq__39479_41329__$1);
(cleanup_fn_41335.cljs$core$IFn$_invoke$arity$0 ? cleanup_fn_41335.cljs$core$IFn$_invoke$arity$0() : cleanup_fn_41335.call(null));


var G__41338 = cljs.core.next(seq__39479_41329__$1);
var G__41339 = null;
var G__41340 = (0);
var G__41341 = (0);
seq__39479_41319 = G__41338;
chunk__39480_41320 = G__41339;
count__39481_41321 = G__41340;
i__39482_41322 = G__41341;
continue;
}
} else {
}
}
break;
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc,new cljs.core.Keyword(null,"cleanup-fns","cleanup-fns",-1465758193),cljs.core.PersistentHashSet.EMPTY);

var seq__39491_41343 = cljs.core.seq(zero.impl.components.goog$module$goog$object.get(shadow__$1,zero.impl.components.CHILDREN_SYM));
var chunk__39492_41344 = null;
var count__39493_41345 = (0);
var i__39494_41346 = (0);
while(true){
if((i__39494_41346 < count__39493_41345)){
var child_dom_41348 = chunk__39492_41344.cljs$core$IIndexed$_nth$arity$2(null,i__39494_41346);
zero.impl.components.cleanup_dom(child_dom_41348,_BANG_instance_state);

child_dom_41348.remove();


var G__41349 = seq__39491_41343;
var G__41350 = chunk__39492_41344;
var G__41351 = count__39493_41345;
var G__41352 = (i__39494_41346 + (1));
seq__39491_41343 = G__41349;
chunk__39492_41344 = G__41350;
count__39493_41345 = G__41351;
i__39494_41346 = G__41352;
continue;
} else {
var temp__5804__auto___41353 = cljs.core.seq(seq__39491_41343);
if(temp__5804__auto___41353){
var seq__39491_41354__$1 = temp__5804__auto___41353;
if(cljs.core.chunked_seq_QMARK_(seq__39491_41354__$1)){
var c__5568__auto___41355 = cljs.core.chunk_first(seq__39491_41354__$1);
var G__41356 = cljs.core.chunk_rest(seq__39491_41354__$1);
var G__41357 = c__5568__auto___41355;
var G__41358 = cljs.core.count(c__5568__auto___41355);
var G__41359 = (0);
seq__39491_41343 = G__41356;
chunk__39492_41344 = G__41357;
count__39493_41345 = G__41358;
i__39494_41346 = G__41359;
continue;
} else {
var child_dom_41360 = cljs.core.first(seq__39491_41354__$1);
zero.impl.components.cleanup_dom(child_dom_41360,_BANG_instance_state);

child_dom_41360.remove();


var G__41361 = cljs.core.next(seq__39491_41354__$1);
var G__41362 = null;
var G__41363 = (0);
var G__41364 = (0);
seq__39491_41343 = G__41361;
chunk__39492_41344 = G__41362;
count__39493_41345 = G__41363;
i__39494_41346 = G__41364;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"binds","binds",363649660).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)))){
return null;
} else {
throw (new Error("Assert failed: (= {} (:binds (clojure.core/deref !instance-state)))"));
}
}), "configurable": true}), "attributeChangedCallback": ({"value": (function (name__$1,_old_val,new_val){
var this$ = this;
var _BANG_instance_state = zero.impl.components.goog$module$goog$object.get(this$,zero.impl.components.PRIVATE_SYM);
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(attr__GT_prop_spec,name__$1);
if(cljs.core.truth_(temp__5804__auto__)){
var prop_spec = temp__5804__auto__;
if((new_val == null)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"props","props",453281727),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec)], 0));
} else {
var final_val_41365 = (function (){var temp__5802__auto__ = new cljs.core.Keyword(null,"attr-mapper","attr-mapper",1913480316).cljs$core$IFn$_invoke$arity$1(prop_spec);
if(cljs.core.truth_(temp__5802__auto__)){
var mapper = temp__5802__auto__;
return (mapper.cljs$core$IFn$_invoke$arity$1 ? mapper.cljs$core$IFn$_invoke$arity$1(new_val) : mapper.call(null,new_val));
} else {
return new_val;
}
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"props","props",453281727),new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec)], null),final_val_41365);

}

if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)))){
return zero.impl.components.request_render(this$);
} else {
return null;
}
} else {
return null;
}
}), "configurable": true})}));

var seq__39499_41366 = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"field","field",-1302436500),normalized_prop_specs));
var chunk__39500_41367 = null;
var count__39501_41368 = (0);
var i__39502_41369 = (0);
while(true){
if((i__39502_41369 < count__39501_41368)){
var prop_spec_41370 = chunk__39500_41367.cljs$core$IIndexed$_nth$arity$2(null,i__39502_41369);
Object.defineProperty(proto,new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(prop_spec_41370),({"get": ((function (seq__39499_41366,chunk__39500_41367,count__39501_41368,i__39502_41369,prop_spec_41370,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,init_state_props,default_css,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_){
return (function (){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(zero.impl.components.goog$module$goog$object.get(this,zero.impl.components.PRIVATE_SYM).props,new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec_41370));
});})(seq__39499_41366,chunk__39500_41367,count__39501_41368,i__39502_41369,prop_spec_41370,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,init_state_props,default_css,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_))
, "set": (cljs.core.truth_(new cljs.core.Keyword(null,"state-factory","state-factory",-225444643).cljs$core$IFn$_invoke$arity$1(prop_spec_41370))?undefined:((function (seq__39499_41366,chunk__39500_41367,count__39501_41368,i__39502_41369,prop_spec_41370,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,init_state_props,default_css,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_){
return (function (x){
var _BANG_instance_state = zero.impl.components.goog$module$goog$object.get(this,zero.impl.components.PRIVATE_SYM);
if(cljs.core.truth_(x === undefined)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"props","props",453281727),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec_41370)], 0));
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"props","props",453281727),new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec_41370)], null),x);

}

if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)))){
return zero.impl.components.request_render(this);
} else {
return null;
}
});})(seq__39499_41366,chunk__39500_41367,count__39501_41368,i__39502_41369,prop_spec_41370,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,init_state_props,default_css,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_))
), "configurable": true}));


var G__41371 = seq__39499_41366;
var G__41372 = chunk__39500_41367;
var G__41373 = count__39501_41368;
var G__41374 = (i__39502_41369 + (1));
seq__39499_41366 = G__41371;
chunk__39500_41367 = G__41372;
count__39501_41368 = G__41373;
i__39502_41369 = G__41374;
continue;
} else {
var temp__5804__auto___41375 = cljs.core.seq(seq__39499_41366);
if(temp__5804__auto___41375){
var seq__39499_41376__$1 = temp__5804__auto___41375;
if(cljs.core.chunked_seq_QMARK_(seq__39499_41376__$1)){
var c__5568__auto___41377 = cljs.core.chunk_first(seq__39499_41376__$1);
var G__41378 = cljs.core.chunk_rest(seq__39499_41376__$1);
var G__41379 = c__5568__auto___41377;
var G__41380 = cljs.core.count(c__5568__auto___41377);
var G__41381 = (0);
seq__39499_41366 = G__41378;
chunk__39500_41367 = G__41379;
count__39501_41368 = G__41380;
i__39502_41369 = G__41381;
continue;
} else {
var prop_spec_41382 = cljs.core.first(seq__39499_41376__$1);
Object.defineProperty(proto,new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(prop_spec_41382),({"get": ((function (seq__39499_41366,chunk__39500_41367,count__39501_41368,i__39502_41369,prop_spec_41382,seq__39499_41376__$1,temp__5804__auto___41375,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,init_state_props,default_css,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_){
return (function (){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(zero.impl.components.goog$module$goog$object.get(this,zero.impl.components.PRIVATE_SYM).props,new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec_41382));
});})(seq__39499_41366,chunk__39500_41367,count__39501_41368,i__39502_41369,prop_spec_41382,seq__39499_41376__$1,temp__5804__auto___41375,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,init_state_props,default_css,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_))
, "set": (cljs.core.truth_(new cljs.core.Keyword(null,"state-factory","state-factory",-225444643).cljs$core$IFn$_invoke$arity$1(prop_spec_41382))?undefined:((function (seq__39499_41366,chunk__39500_41367,count__39501_41368,i__39502_41369,prop_spec_41382,seq__39499_41376__$1,temp__5804__auto___41375,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,init_state_props,default_css,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_){
return (function (x){
var _BANG_instance_state = zero.impl.components.goog$module$goog$object.get(this,zero.impl.components.PRIVATE_SYM);
if(cljs.core.truth_(x === undefined)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(_BANG_instance_state,cljs.core.update,new cljs.core.Keyword(null,"props","props",453281727),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec_41382)], 0));
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"props","props",453281727),new cljs.core.Keyword(null,"prop","prop",-515168332).cljs$core$IFn$_invoke$arity$1(prop_spec_41382)], null),x);

}

if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",-169833045).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)))){
return zero.impl.components.request_render(this);
} else {
return null;
}
});})(seq__39499_41366,chunk__39500_41367,count__39501_41368,i__39502_41369,prop_spec_41382,seq__39499_41376__$1,temp__5804__auto___41375,proto,_BANG_static_state,props_map,normalized_prop_specs,attr__GT_prop_spec,state_prop_specs,init_state_props,default_css,map__39357,map__39357__$1,props,view,focus,name,inherit_doc_css_QMARK_))
), "configurable": true}));


var G__41383 = cljs.core.next(seq__39499_41376__$1);
var G__41384 = null;
var G__41385 = (0);
var G__41386 = (0);
seq__39499_41366 = G__41383;
chunk__39500_41367 = G__41384;
count__39501_41368 = G__41385;
i__39502_41369 = G__41386;
continue;
}
} else {
}
}
break;
}

Object.defineProperty(proto,"elementName",({"value": zero.impl.components.kw__GT_el_name(name), "writable": false, "configurable": true}));

Object.defineProperty(proto,"componentName",({"value": name, "writable": false, "configurable": true}));

var seq__39515 = cljs.core.seq(new cljs.core.Keyword(null,"instances","instances",-335364781).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_static_state)));
var chunk__39516 = null;
var count__39517 = (0);
var i__39518 = (0);
while(true){
if((i__39518 < count__39517)){
var instance = chunk__39516.cljs$core$IIndexed$_nth$arity$2(null,i__39518);
init_state_props(instance);

zero.impl.components.request_render(instance);


var G__41387 = seq__39515;
var G__41388 = chunk__39516;
var G__41389 = count__39517;
var G__41390 = (i__39518 + (1));
seq__39515 = G__41387;
chunk__39516 = G__41388;
count__39517 = G__41389;
i__39518 = G__41390;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__39515);
if(temp__5804__auto__){
var seq__39515__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__39515__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__39515__$1);
var G__41391 = cljs.core.chunk_rest(seq__39515__$1);
var G__41392 = c__5568__auto__;
var G__41393 = cljs.core.count(c__5568__auto__);
var G__41394 = (0);
seq__39515 = G__41391;
chunk__39516 = G__41392;
count__39517 = G__41393;
i__39518 = G__41394;
continue;
} else {
var instance = cljs.core.first(seq__39515__$1);
init_state_props(instance);

zero.impl.components.request_render(instance);


var G__41395 = cljs.core.next(seq__39515__$1);
var G__41396 = null;
var G__41397 = (0);
var G__41398 = (0);
seq__39515 = G__41395;
chunk__39516 = G__41396;
count__39517 = G__41397;
i__39518 = G__41398;
continue;
}
} else {
return null;
}
}
break;
}
});
zero.impl.components.component = (function zero$impl$components$component(p__39519){
var map__39520 = p__39519;
var map__39520__$1 = cljs.core.__destructure_map(map__39520);
var things = map__39520__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39520__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var props = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39520__$1,new cljs.core.Keyword(null,"props","props",453281727));
var view = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39520__$1,new cljs.core.Keyword(null,"view","view",1247994814));
var focus = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39520__$1,new cljs.core.Keyword(null,"focus","focus",234677911));
var el_name_41399 = zero.impl.components.kw__GT_el_name(name);
var temp__5802__auto___41400 = customElements.get(el_name_41399);
if(cljs.core.truth_(temp__5802__auto___41400)){
var existing_41401 = temp__5802__auto___41400;
zero.impl.components.patch_el_class(existing_41401,things);
} else {
var new_class_41402 = (class extends HTMLElement {
                                constructor() {
                                    super();
                                    this['init']()
                                }
                            });
zero.impl.components.goog$module$goog$object.set(new_class_41402,zero.impl.components.PRIVATE_SYM,cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"instances","instances",-335364781),cljs.core.PersistentHashSet.EMPTY], null)));

Object.defineProperty(new_class_41402.prototype,"init",({"value": (function (){
var this$ = this;
var shadow__$1 = this$.attachShadow(({"mode": "open", "delegatesFocus": cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(focus,new cljs.core.Keyword(null,"delegate","delegate",-1141883770))}));
var _BANG_instance_state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"shadow","shadow",873231803),shadow__$1,new cljs.core.Keyword(null,"internals","internals",-1765165608),this$.attachInternals(),new cljs.core.Keyword(null,"props","props",453281727),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"lifecycle-event-listener-counts","lifecycle-event-listener-counts",1502831516),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"doms-on-focus-path","doms-on-focus-path",-1367810425),cljs.core.PersistentHashSet.EMPTY], null));
zero.impl.components.goog$module$goog$object.set(this$,zero.impl.components.PRIVATE_SYM,_BANG_instance_state);

shadow__$1.addEventListener("focusin",(function (event){
var event_path = event.composedPath();
var shadow_index = event_path.indexOf(new cljs.core.Keyword(null,"shadow","shadow",873231803).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_BANG_instance_state)));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc,new cljs.core.Keyword(null,"doms-on-focus-path","doms-on-focus-path",-1367810425),cljs.core.set(event_path.slice((0),shadow_index)));
}),true);

shadow__$1.addEventListener("focusout",(function (event){
if((((event.relatedTarget == null)) || (cljs.core.not(shadow__$1.contains(event.relatedTarget))))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.assoc,new cljs.core.Keyword(null,"doms-on-focus-path","doms-on-focus-path",-1367810425),cljs.core.PersistentHashSet.EMPTY);
} else {
return null;
}
}),true);

var orig_add_event_listener = shadow__$1.addEventListener.bind(shadow__$1);
var orig_remove_event_listener = shadow__$1.removeEventListener.bind(shadow__$1);
return Object.defineProperties(shadow__$1,({"addEventListener": ({"value": (function() { 
var zero$impl$components$component_$_add_event_listener_override__delegate = function (type,others){
var G__39525_41403 = type;
switch (G__39525_41403) {
case "connect":
case "disconnect":
case "update":
case "render":
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lifecycle-event-listener-counts","lifecycle-event-listener-counts",1502831516),type], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.inc,(0)));

break;
default:

}

return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(orig_add_event_listener,type,others);
};
var zero$impl$components$component_$_add_event_listener_override = function (type,var_args){
var others = null;
if (arguments.length > 1) {
var G__41409__i = 0, G__41409__a = new Array(arguments.length -  1);
while (G__41409__i < G__41409__a.length) {G__41409__a[G__41409__i] = arguments[G__41409__i + 1]; ++G__41409__i;}
  others = new cljs.core.IndexedSeq(G__41409__a,0,null);
} 
return zero$impl$components$component_$_add_event_listener_override__delegate.call(this,type,others);};
zero$impl$components$component_$_add_event_listener_override.cljs$lang$maxFixedArity = 1;
zero$impl$components$component_$_add_event_listener_override.cljs$lang$applyTo = (function (arglist__41411){
var type = cljs.core.first(arglist__41411);
var others = cljs.core.rest(arglist__41411);
return zero$impl$components$component_$_add_event_listener_override__delegate(type,others);
});
zero$impl$components$component_$_add_event_listener_override.cljs$core$IFn$_invoke$arity$variadic = zero$impl$components$component_$_add_event_listener_override__delegate;
return zero$impl$components$component_$_add_event_listener_override;
})()
, "configurable": false, "writable": false}), "removeEventListener": ({"value": (function() { 
var zero$impl$components$component_$_remove_event_listener_override__delegate = function (type,others){
var G__39528_41413 = type;
switch (G__39528_41413) {
case "connect":
case "disconnect":
case "update":
case "render":
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(_BANG_instance_state,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"lifecycle-event-listener-counts","lifecycle-event-listener-counts",1502831516),type], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.dec,(0)));

break;
default:

}

return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(orig_remove_event_listener,type,others);
};
var zero$impl$components$component_$_remove_event_listener_override = function (type,var_args){
var others = null;
if (arguments.length > 1) {
var G__41422__i = 0, G__41422__a = new Array(arguments.length -  1);
while (G__41422__i < G__41422__a.length) {G__41422__a[G__41422__i] = arguments[G__41422__i + 1]; ++G__41422__i;}
  others = new cljs.core.IndexedSeq(G__41422__a,0,null);
} 
return zero$impl$components$component_$_remove_event_listener_override__delegate.call(this,type,others);};
zero$impl$components$component_$_remove_event_listener_override.cljs$lang$maxFixedArity = 1;
zero$impl$components$component_$_remove_event_listener_override.cljs$lang$applyTo = (function (arglist__41427){
var type = cljs.core.first(arglist__41427);
var others = cljs.core.rest(arglist__41427);
return zero$impl$components$component_$_remove_event_listener_override__delegate(type,others);
});
zero$impl$components$component_$_remove_event_listener_override.cljs$core$IFn$_invoke$arity$variadic = zero$impl$components$component_$_remove_event_listener_override__delegate;
return zero$impl$components$component_$_remove_event_listener_override;
})()
, "configurable": false, "writable": false})}));
}), "configurable": false, "writable": false}));

zero.impl.components.patch_el_class(new_class_41402,things);

customElements.define(el_name_41399,new_class_41402);
}

return null;
});
zero.impl.components.component_name = (function zero$impl$components$component_name(k){
return zero.impl.components.kw__GT_el_name(k);
});
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.components !== 'undefined') && (typeof zero.impl.components._only_do_this_once !== 'undefined')){
} else {
zero.impl.components._only_do_this_once = (cljs.core.truth_(goog.DEBUG)?(function (){var update_link = (function zero$impl$components$update_link(link_dom,url){
var clone = link_dom.cloneNode();
(clone.href = url);

zero.impl.components.goog$module$goog$object.set(clone,zero.impl.components.PROPS_SYM,zero.impl.components.goog$module$goog$object.get(link_dom,zero.impl.components.PROPS_SYM));

link_dom.insertAdjacentElement("beforebegin",clone);

clone.addEventListener("load",(function (_){
return link_dom.remove();
}),({"once": true}));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.components._BANG_css_links,cljs.core.disj,link_dom);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.components._BANG_css_links,cljs.core.conj,clone);
});
var observer_cb = (function zero$impl$components$observer_cb(records){
var path__GT_links = (new cljs.core.Delay((function (){
return cljs.core.group_by((function (x){
return (new URL(x.href,location.href)).pathname;
}),cljs.core.deref(zero.impl.components._BANG_css_links));
}),null));
var seq__40242 = cljs.core.seq(records);
var chunk__40253 = null;
var count__40254 = (0);
var i__40255 = (0);
while(true){
if((i__40255 < count__40254)){
var record = chunk__40253.cljs$core$IIndexed$_nth$arity$2(null,i__40255);
var seq__40256_41452 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(record.addedNodes));
var chunk__40260_41453 = null;
var count__40261_41455 = (0);
var i__40262_41456 = (0);
while(true){
if((i__40262_41456 < count__40261_41455)){
var node_41459 = chunk__40260_41453.cljs$core$IIndexed$_nth$arity$2(null,i__40262_41456);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("LINK",node_41459.nodeName)) && (cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["stylesheet",null,"preload",null], null), null),node_41459.rel)))){
var created_link_url_41474 = (new URL(node_41459.href,location.href));
var href_41475 = node_41459.getAttribute("href");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,created_link_url_41474.origin)){
var seq__40506_41476 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(path__GT_links),created_link_url_41474.pathname));
var chunk__40507_41477 = null;
var count__40508_41478 = (0);
var i__40509_41479 = (0);
while(true){
if((i__40509_41479 < count__40508_41478)){
var matching_link_41480 = chunk__40507_41477.cljs$core$IIndexed$_nth$arity$2(null,i__40509_41479);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_css_href_overrides,cljs.core.assoc,new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(zero.impl.components.goog$module$goog$object.get(matching_link_41480,zero.impl.components.PROPS_SYM)),href_41475);

update_link(matching_link_41480,href_41475);


var G__41481 = seq__40506_41476;
var G__41482 = chunk__40507_41477;
var G__41483 = count__40508_41478;
var G__41484 = (i__40509_41479 + (1));
seq__40506_41476 = G__41481;
chunk__40507_41477 = G__41482;
count__40508_41478 = G__41483;
i__40509_41479 = G__41484;
continue;
} else {
var temp__5804__auto___41485 = cljs.core.seq(seq__40506_41476);
if(temp__5804__auto___41485){
var seq__40506_41486__$1 = temp__5804__auto___41485;
if(cljs.core.chunked_seq_QMARK_(seq__40506_41486__$1)){
var c__5568__auto___41487 = cljs.core.chunk_first(seq__40506_41486__$1);
var G__41488 = cljs.core.chunk_rest(seq__40506_41486__$1);
var G__41489 = c__5568__auto___41487;
var G__41490 = cljs.core.count(c__5568__auto___41487);
var G__41491 = (0);
seq__40506_41476 = G__41488;
chunk__40507_41477 = G__41489;
count__40508_41478 = G__41490;
i__40509_41479 = G__41491;
continue;
} else {
var matching_link_41492 = cljs.core.first(seq__40506_41486__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_css_href_overrides,cljs.core.assoc,new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(zero.impl.components.goog$module$goog$object.get(matching_link_41492,zero.impl.components.PROPS_SYM)),href_41475);

update_link(matching_link_41492,href_41475);


var G__41493 = cljs.core.next(seq__40506_41486__$1);
var G__41494 = null;
var G__41495 = (0);
var G__41496 = (0);
seq__40506_41476 = G__41493;
chunk__40507_41477 = G__41494;
count__40508_41478 = G__41495;
i__40509_41479 = G__41496;
continue;
}
} else {
}
}
break;
}

var seq__40510_41497 = cljs.core.seq(cljs.core.deref(zero.impl.components._BANG_css_stylesheet_objects));
var chunk__40513_41498 = null;
var count__40514_41499 = (0);
var i__40515_41500 = (0);
while(true){
if((i__40515_41500 < count__40514_41499)){
var vec__40524_41501 = chunk__40513_41498.cljs$core$IIndexed$_nth$arity$2(null,i__40515_41500);
var original_url_str_41502 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40524_41501,(0),null);
var stylesheet_object_41503 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40524_41501,(1),null);
var original_url_41504 = (new URL(original_url_str_41502));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,original_url_41504.origin)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(original_url_41504.pathname,created_link_url_41474.pathname)))){
zero.impl.components.load_stylesheet(stylesheet_object_41503,href_41475);


var G__41505 = seq__40510_41497;
var G__41506 = chunk__40513_41498;
var G__41507 = count__40514_41499;
var G__41508 = (i__40515_41500 + (1));
seq__40510_41497 = G__41505;
chunk__40513_41498 = G__41506;
count__40514_41499 = G__41507;
i__40515_41500 = G__41508;
continue;
} else {
var G__41509 = seq__40510_41497;
var G__41510 = chunk__40513_41498;
var G__41511 = count__40514_41499;
var G__41512 = (i__40515_41500 + (1));
seq__40510_41497 = G__41509;
chunk__40513_41498 = G__41510;
count__40514_41499 = G__41511;
i__40515_41500 = G__41512;
continue;
}
} else {
var temp__5804__auto___41513 = cljs.core.seq(seq__40510_41497);
if(temp__5804__auto___41513){
var seq__40510_41514__$1 = temp__5804__auto___41513;
if(cljs.core.chunked_seq_QMARK_(seq__40510_41514__$1)){
var c__5568__auto___41515 = cljs.core.chunk_first(seq__40510_41514__$1);
var G__41516 = cljs.core.chunk_rest(seq__40510_41514__$1);
var G__41517 = c__5568__auto___41515;
var G__41518 = cljs.core.count(c__5568__auto___41515);
var G__41519 = (0);
seq__40510_41497 = G__41516;
chunk__40513_41498 = G__41517;
count__40514_41499 = G__41518;
i__40515_41500 = G__41519;
continue;
} else {
var vec__40527_41520 = cljs.core.first(seq__40510_41514__$1);
var original_url_str_41521 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40527_41520,(0),null);
var stylesheet_object_41522 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40527_41520,(1),null);
var original_url_41523 = (new URL(original_url_str_41521));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,original_url_41523.origin)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(original_url_41523.pathname,created_link_url_41474.pathname)))){
zero.impl.components.load_stylesheet(stylesheet_object_41522,href_41475);


var G__41524 = cljs.core.next(seq__40510_41514__$1);
var G__41525 = null;
var G__41526 = (0);
var G__41527 = (0);
seq__40510_41497 = G__41524;
chunk__40513_41498 = G__41525;
count__40514_41499 = G__41526;
i__40515_41500 = G__41527;
continue;
} else {
var G__41528 = cljs.core.next(seq__40510_41514__$1);
var G__41529 = null;
var G__41530 = (0);
var G__41531 = (0);
seq__40510_41497 = G__41528;
chunk__40513_41498 = G__41529;
count__40514_41499 = G__41530;
i__40515_41500 = G__41531;
continue;
}
}
} else {
}
}
break;
}


var G__41532 = seq__40256_41452;
var G__41533 = chunk__40260_41453;
var G__41534 = count__40261_41455;
var G__41535 = (i__40262_41456 + (1));
seq__40256_41452 = G__41532;
chunk__40260_41453 = G__41533;
count__40261_41455 = G__41534;
i__40262_41456 = G__41535;
continue;
} else {
var G__41536 = seq__40256_41452;
var G__41537 = chunk__40260_41453;
var G__41538 = count__40261_41455;
var G__41539 = (i__40262_41456 + (1));
seq__40256_41452 = G__41536;
chunk__40260_41453 = G__41537;
count__40261_41455 = G__41538;
i__40262_41456 = G__41539;
continue;
}
} else {
var G__41540 = seq__40256_41452;
var G__41541 = chunk__40260_41453;
var G__41542 = count__40261_41455;
var G__41543 = (i__40262_41456 + (1));
seq__40256_41452 = G__41540;
chunk__40260_41453 = G__41541;
count__40261_41455 = G__41542;
i__40262_41456 = G__41543;
continue;
}
} else {
var temp__5804__auto___41544 = cljs.core.seq(seq__40256_41452);
if(temp__5804__auto___41544){
var seq__40256_41545__$1 = temp__5804__auto___41544;
if(cljs.core.chunked_seq_QMARK_(seq__40256_41545__$1)){
var c__5568__auto___41546 = cljs.core.chunk_first(seq__40256_41545__$1);
var G__41547 = cljs.core.chunk_rest(seq__40256_41545__$1);
var G__41548 = c__5568__auto___41546;
var G__41549 = cljs.core.count(c__5568__auto___41546);
var G__41550 = (0);
seq__40256_41452 = G__41547;
chunk__40260_41453 = G__41548;
count__40261_41455 = G__41549;
i__40262_41456 = G__41550;
continue;
} else {
var node_41551 = cljs.core.first(seq__40256_41545__$1);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("LINK",node_41551.nodeName)) && (cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["stylesheet",null,"preload",null], null), null),node_41551.rel)))){
var created_link_url_41552 = (new URL(node_41551.href,location.href));
var href_41553 = node_41551.getAttribute("href");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,created_link_url_41552.origin)){
var seq__40530_41554 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(path__GT_links),created_link_url_41552.pathname));
var chunk__40531_41555 = null;
var count__40532_41556 = (0);
var i__40533_41557 = (0);
while(true){
if((i__40533_41557 < count__40532_41556)){
var matching_link_41558 = chunk__40531_41555.cljs$core$IIndexed$_nth$arity$2(null,i__40533_41557);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_css_href_overrides,cljs.core.assoc,new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(zero.impl.components.goog$module$goog$object.get(matching_link_41558,zero.impl.components.PROPS_SYM)),href_41553);

update_link(matching_link_41558,href_41553);


var G__41559 = seq__40530_41554;
var G__41560 = chunk__40531_41555;
var G__41561 = count__40532_41556;
var G__41562 = (i__40533_41557 + (1));
seq__40530_41554 = G__41559;
chunk__40531_41555 = G__41560;
count__40532_41556 = G__41561;
i__40533_41557 = G__41562;
continue;
} else {
var temp__5804__auto___41563__$1 = cljs.core.seq(seq__40530_41554);
if(temp__5804__auto___41563__$1){
var seq__40530_41564__$1 = temp__5804__auto___41563__$1;
if(cljs.core.chunked_seq_QMARK_(seq__40530_41564__$1)){
var c__5568__auto___41565 = cljs.core.chunk_first(seq__40530_41564__$1);
var G__41566 = cljs.core.chunk_rest(seq__40530_41564__$1);
var G__41567 = c__5568__auto___41565;
var G__41568 = cljs.core.count(c__5568__auto___41565);
var G__41569 = (0);
seq__40530_41554 = G__41566;
chunk__40531_41555 = G__41567;
count__40532_41556 = G__41568;
i__40533_41557 = G__41569;
continue;
} else {
var matching_link_41570 = cljs.core.first(seq__40530_41564__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_css_href_overrides,cljs.core.assoc,new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(zero.impl.components.goog$module$goog$object.get(matching_link_41570,zero.impl.components.PROPS_SYM)),href_41553);

update_link(matching_link_41570,href_41553);


var G__41571 = cljs.core.next(seq__40530_41564__$1);
var G__41572 = null;
var G__41573 = (0);
var G__41574 = (0);
seq__40530_41554 = G__41571;
chunk__40531_41555 = G__41572;
count__40532_41556 = G__41573;
i__40533_41557 = G__41574;
continue;
}
} else {
}
}
break;
}

var seq__40534_41575 = cljs.core.seq(cljs.core.deref(zero.impl.components._BANG_css_stylesheet_objects));
var chunk__40537_41576 = null;
var count__40538_41577 = (0);
var i__40539_41578 = (0);
while(true){
if((i__40539_41578 < count__40538_41577)){
var vec__40548_41579 = chunk__40537_41576.cljs$core$IIndexed$_nth$arity$2(null,i__40539_41578);
var original_url_str_41580 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40548_41579,(0),null);
var stylesheet_object_41581 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40548_41579,(1),null);
var original_url_41582 = (new URL(original_url_str_41580));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,original_url_41582.origin)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(original_url_41582.pathname,created_link_url_41552.pathname)))){
zero.impl.components.load_stylesheet(stylesheet_object_41581,href_41553);


var G__41583 = seq__40534_41575;
var G__41584 = chunk__40537_41576;
var G__41585 = count__40538_41577;
var G__41586 = (i__40539_41578 + (1));
seq__40534_41575 = G__41583;
chunk__40537_41576 = G__41584;
count__40538_41577 = G__41585;
i__40539_41578 = G__41586;
continue;
} else {
var G__41587 = seq__40534_41575;
var G__41588 = chunk__40537_41576;
var G__41589 = count__40538_41577;
var G__41590 = (i__40539_41578 + (1));
seq__40534_41575 = G__41587;
chunk__40537_41576 = G__41588;
count__40538_41577 = G__41589;
i__40539_41578 = G__41590;
continue;
}
} else {
var temp__5804__auto___41591__$1 = cljs.core.seq(seq__40534_41575);
if(temp__5804__auto___41591__$1){
var seq__40534_41592__$1 = temp__5804__auto___41591__$1;
if(cljs.core.chunked_seq_QMARK_(seq__40534_41592__$1)){
var c__5568__auto___41593 = cljs.core.chunk_first(seq__40534_41592__$1);
var G__41594 = cljs.core.chunk_rest(seq__40534_41592__$1);
var G__41595 = c__5568__auto___41593;
var G__41596 = cljs.core.count(c__5568__auto___41593);
var G__41597 = (0);
seq__40534_41575 = G__41594;
chunk__40537_41576 = G__41595;
count__40538_41577 = G__41596;
i__40539_41578 = G__41597;
continue;
} else {
var vec__40551_41598 = cljs.core.first(seq__40534_41592__$1);
var original_url_str_41599 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40551_41598,(0),null);
var stylesheet_object_41600 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40551_41598,(1),null);
var original_url_41601 = (new URL(original_url_str_41599));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,original_url_41601.origin)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(original_url_41601.pathname,created_link_url_41552.pathname)))){
zero.impl.components.load_stylesheet(stylesheet_object_41600,href_41553);


var G__41602 = cljs.core.next(seq__40534_41592__$1);
var G__41603 = null;
var G__41604 = (0);
var G__41605 = (0);
seq__40534_41575 = G__41602;
chunk__40537_41576 = G__41603;
count__40538_41577 = G__41604;
i__40539_41578 = G__41605;
continue;
} else {
var G__41606 = cljs.core.next(seq__40534_41592__$1);
var G__41607 = null;
var G__41608 = (0);
var G__41609 = (0);
seq__40534_41575 = G__41606;
chunk__40537_41576 = G__41607;
count__40538_41577 = G__41608;
i__40539_41578 = G__41609;
continue;
}
}
} else {
}
}
break;
}


var G__41610 = cljs.core.next(seq__40256_41545__$1);
var G__41611 = null;
var G__41612 = (0);
var G__41613 = (0);
seq__40256_41452 = G__41610;
chunk__40260_41453 = G__41611;
count__40261_41455 = G__41612;
i__40262_41456 = G__41613;
continue;
} else {
var G__41614 = cljs.core.next(seq__40256_41545__$1);
var G__41615 = null;
var G__41616 = (0);
var G__41617 = (0);
seq__40256_41452 = G__41614;
chunk__40260_41453 = G__41615;
count__40261_41455 = G__41616;
i__40262_41456 = G__41617;
continue;
}
} else {
var G__41618 = cljs.core.next(seq__40256_41545__$1);
var G__41619 = null;
var G__41620 = (0);
var G__41621 = (0);
seq__40256_41452 = G__41618;
chunk__40260_41453 = G__41619;
count__40261_41455 = G__41620;
i__40262_41456 = G__41621;
continue;
}
}
} else {
}
}
break;
}

var G__41622 = seq__40242;
var G__41623 = chunk__40253;
var G__41624 = count__40254;
var G__41625 = (i__40255 + (1));
seq__40242 = G__41622;
chunk__40253 = G__41623;
count__40254 = G__41624;
i__40255 = G__41625;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40242);
if(temp__5804__auto__){
var seq__40242__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40242__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40242__$1);
var G__41626 = cljs.core.chunk_rest(seq__40242__$1);
var G__41627 = c__5568__auto__;
var G__41628 = cljs.core.count(c__5568__auto__);
var G__41629 = (0);
seq__40242 = G__41626;
chunk__40253 = G__41627;
count__40254 = G__41628;
i__40255 = G__41629;
continue;
} else {
var record = cljs.core.first(seq__40242__$1);
var seq__40243_41630 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(record.addedNodes));
var chunk__40247_41631 = null;
var count__40248_41632 = (0);
var i__40249_41633 = (0);
while(true){
if((i__40249_41633 < count__40248_41632)){
var node_41634 = chunk__40247_41631.cljs$core$IIndexed$_nth$arity$2(null,i__40249_41633);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("LINK",node_41634.nodeName)) && (cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["stylesheet",null,"preload",null], null), null),node_41634.rel)))){
var created_link_url_41635 = (new URL(node_41634.href,location.href));
var href_41636 = node_41634.getAttribute("href");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,created_link_url_41635.origin)){
var seq__40602_41637 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(path__GT_links),created_link_url_41635.pathname));
var chunk__40603_41638 = null;
var count__40604_41639 = (0);
var i__40605_41640 = (0);
while(true){
if((i__40605_41640 < count__40604_41639)){
var matching_link_41641 = chunk__40603_41638.cljs$core$IIndexed$_nth$arity$2(null,i__40605_41640);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_css_href_overrides,cljs.core.assoc,new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(zero.impl.components.goog$module$goog$object.get(matching_link_41641,zero.impl.components.PROPS_SYM)),href_41636);

update_link(matching_link_41641,href_41636);


var G__41642 = seq__40602_41637;
var G__41643 = chunk__40603_41638;
var G__41644 = count__40604_41639;
var G__41645 = (i__40605_41640 + (1));
seq__40602_41637 = G__41642;
chunk__40603_41638 = G__41643;
count__40604_41639 = G__41644;
i__40605_41640 = G__41645;
continue;
} else {
var temp__5804__auto___41646__$1 = cljs.core.seq(seq__40602_41637);
if(temp__5804__auto___41646__$1){
var seq__40602_41647__$1 = temp__5804__auto___41646__$1;
if(cljs.core.chunked_seq_QMARK_(seq__40602_41647__$1)){
var c__5568__auto___41648 = cljs.core.chunk_first(seq__40602_41647__$1);
var G__41649 = cljs.core.chunk_rest(seq__40602_41647__$1);
var G__41650 = c__5568__auto___41648;
var G__41651 = cljs.core.count(c__5568__auto___41648);
var G__41652 = (0);
seq__40602_41637 = G__41649;
chunk__40603_41638 = G__41650;
count__40604_41639 = G__41651;
i__40605_41640 = G__41652;
continue;
} else {
var matching_link_41653 = cljs.core.first(seq__40602_41647__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_css_href_overrides,cljs.core.assoc,new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(zero.impl.components.goog$module$goog$object.get(matching_link_41653,zero.impl.components.PROPS_SYM)),href_41636);

update_link(matching_link_41653,href_41636);


var G__41654 = cljs.core.next(seq__40602_41647__$1);
var G__41655 = null;
var G__41656 = (0);
var G__41657 = (0);
seq__40602_41637 = G__41654;
chunk__40603_41638 = G__41655;
count__40604_41639 = G__41656;
i__40605_41640 = G__41657;
continue;
}
} else {
}
}
break;
}

var seq__40606_41658 = cljs.core.seq(cljs.core.deref(zero.impl.components._BANG_css_stylesheet_objects));
var chunk__40609_41659 = null;
var count__40610_41660 = (0);
var i__40611_41661 = (0);
while(true){
if((i__40611_41661 < count__40610_41660)){
var vec__40620_41662 = chunk__40609_41659.cljs$core$IIndexed$_nth$arity$2(null,i__40611_41661);
var original_url_str_41663 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40620_41662,(0),null);
var stylesheet_object_41664 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40620_41662,(1),null);
var original_url_41665 = (new URL(original_url_str_41663));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,original_url_41665.origin)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(original_url_41665.pathname,created_link_url_41635.pathname)))){
zero.impl.components.load_stylesheet(stylesheet_object_41664,href_41636);


var G__41666 = seq__40606_41658;
var G__41667 = chunk__40609_41659;
var G__41668 = count__40610_41660;
var G__41669 = (i__40611_41661 + (1));
seq__40606_41658 = G__41666;
chunk__40609_41659 = G__41667;
count__40610_41660 = G__41668;
i__40611_41661 = G__41669;
continue;
} else {
var G__41670 = seq__40606_41658;
var G__41671 = chunk__40609_41659;
var G__41672 = count__40610_41660;
var G__41673 = (i__40611_41661 + (1));
seq__40606_41658 = G__41670;
chunk__40609_41659 = G__41671;
count__40610_41660 = G__41672;
i__40611_41661 = G__41673;
continue;
}
} else {
var temp__5804__auto___41674__$1 = cljs.core.seq(seq__40606_41658);
if(temp__5804__auto___41674__$1){
var seq__40606_41675__$1 = temp__5804__auto___41674__$1;
if(cljs.core.chunked_seq_QMARK_(seq__40606_41675__$1)){
var c__5568__auto___41676 = cljs.core.chunk_first(seq__40606_41675__$1);
var G__41677 = cljs.core.chunk_rest(seq__40606_41675__$1);
var G__41678 = c__5568__auto___41676;
var G__41679 = cljs.core.count(c__5568__auto___41676);
var G__41680 = (0);
seq__40606_41658 = G__41677;
chunk__40609_41659 = G__41678;
count__40610_41660 = G__41679;
i__40611_41661 = G__41680;
continue;
} else {
var vec__40623_41681 = cljs.core.first(seq__40606_41675__$1);
var original_url_str_41682 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40623_41681,(0),null);
var stylesheet_object_41683 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40623_41681,(1),null);
var original_url_41684 = (new URL(original_url_str_41682));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,original_url_41684.origin)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(original_url_41684.pathname,created_link_url_41635.pathname)))){
zero.impl.components.load_stylesheet(stylesheet_object_41683,href_41636);


var G__41685 = cljs.core.next(seq__40606_41675__$1);
var G__41686 = null;
var G__41687 = (0);
var G__41688 = (0);
seq__40606_41658 = G__41685;
chunk__40609_41659 = G__41686;
count__40610_41660 = G__41687;
i__40611_41661 = G__41688;
continue;
} else {
var G__41689 = cljs.core.next(seq__40606_41675__$1);
var G__41690 = null;
var G__41691 = (0);
var G__41692 = (0);
seq__40606_41658 = G__41689;
chunk__40609_41659 = G__41690;
count__40610_41660 = G__41691;
i__40611_41661 = G__41692;
continue;
}
}
} else {
}
}
break;
}


var G__41693 = seq__40243_41630;
var G__41694 = chunk__40247_41631;
var G__41695 = count__40248_41632;
var G__41696 = (i__40249_41633 + (1));
seq__40243_41630 = G__41693;
chunk__40247_41631 = G__41694;
count__40248_41632 = G__41695;
i__40249_41633 = G__41696;
continue;
} else {
var G__41697 = seq__40243_41630;
var G__41698 = chunk__40247_41631;
var G__41699 = count__40248_41632;
var G__41700 = (i__40249_41633 + (1));
seq__40243_41630 = G__41697;
chunk__40247_41631 = G__41698;
count__40248_41632 = G__41699;
i__40249_41633 = G__41700;
continue;
}
} else {
var G__41701 = seq__40243_41630;
var G__41702 = chunk__40247_41631;
var G__41703 = count__40248_41632;
var G__41704 = (i__40249_41633 + (1));
seq__40243_41630 = G__41701;
chunk__40247_41631 = G__41702;
count__40248_41632 = G__41703;
i__40249_41633 = G__41704;
continue;
}
} else {
var temp__5804__auto___41705__$1 = cljs.core.seq(seq__40243_41630);
if(temp__5804__auto___41705__$1){
var seq__40243_41706__$1 = temp__5804__auto___41705__$1;
if(cljs.core.chunked_seq_QMARK_(seq__40243_41706__$1)){
var c__5568__auto___41707 = cljs.core.chunk_first(seq__40243_41706__$1);
var G__41708 = cljs.core.chunk_rest(seq__40243_41706__$1);
var G__41709 = c__5568__auto___41707;
var G__41710 = cljs.core.count(c__5568__auto___41707);
var G__41711 = (0);
seq__40243_41630 = G__41708;
chunk__40247_41631 = G__41709;
count__40248_41632 = G__41710;
i__40249_41633 = G__41711;
continue;
} else {
var node_41712 = cljs.core.first(seq__40243_41706__$1);
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("LINK",node_41712.nodeName)) && (cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["stylesheet",null,"preload",null], null), null),node_41712.rel)))){
var created_link_url_41713 = (new URL(node_41712.href,location.href));
var href_41714 = node_41712.getAttribute("href");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,created_link_url_41713.origin)){
var seq__40626_41715 = cljs.core.seq(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(path__GT_links),created_link_url_41713.pathname));
var chunk__40627_41716 = null;
var count__40628_41717 = (0);
var i__40629_41718 = (0);
while(true){
if((i__40629_41718 < count__40628_41717)){
var matching_link_41719 = chunk__40627_41716.cljs$core$IIndexed$_nth$arity$2(null,i__40629_41718);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_css_href_overrides,cljs.core.assoc,new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(zero.impl.components.goog$module$goog$object.get(matching_link_41719,zero.impl.components.PROPS_SYM)),href_41714);

update_link(matching_link_41719,href_41714);


var G__41720 = seq__40626_41715;
var G__41721 = chunk__40627_41716;
var G__41722 = count__40628_41717;
var G__41723 = (i__40629_41718 + (1));
seq__40626_41715 = G__41720;
chunk__40627_41716 = G__41721;
count__40628_41717 = G__41722;
i__40629_41718 = G__41723;
continue;
} else {
var temp__5804__auto___41724__$2 = cljs.core.seq(seq__40626_41715);
if(temp__5804__auto___41724__$2){
var seq__40626_41725__$1 = temp__5804__auto___41724__$2;
if(cljs.core.chunked_seq_QMARK_(seq__40626_41725__$1)){
var c__5568__auto___41726 = cljs.core.chunk_first(seq__40626_41725__$1);
var G__41727 = cljs.core.chunk_rest(seq__40626_41725__$1);
var G__41728 = c__5568__auto___41726;
var G__41729 = cljs.core.count(c__5568__auto___41726);
var G__41730 = (0);
seq__40626_41715 = G__41727;
chunk__40627_41716 = G__41728;
count__40628_41717 = G__41729;
i__40629_41718 = G__41730;
continue;
} else {
var matching_link_41731 = cljs.core.first(seq__40626_41725__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.components._BANG_css_href_overrides,cljs.core.assoc,new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(zero.impl.components.goog$module$goog$object.get(matching_link_41731,zero.impl.components.PROPS_SYM)),href_41714);

update_link(matching_link_41731,href_41714);


var G__41732 = cljs.core.next(seq__40626_41725__$1);
var G__41733 = null;
var G__41734 = (0);
var G__41735 = (0);
seq__40626_41715 = G__41732;
chunk__40627_41716 = G__41733;
count__40628_41717 = G__41734;
i__40629_41718 = G__41735;
continue;
}
} else {
}
}
break;
}

var seq__40630_41736 = cljs.core.seq(cljs.core.deref(zero.impl.components._BANG_css_stylesheet_objects));
var chunk__40633_41737 = null;
var count__40634_41738 = (0);
var i__40635_41739 = (0);
while(true){
if((i__40635_41739 < count__40634_41738)){
var vec__40644_41740 = chunk__40633_41737.cljs$core$IIndexed$_nth$arity$2(null,i__40635_41739);
var original_url_str_41741 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40644_41740,(0),null);
var stylesheet_object_41742 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40644_41740,(1),null);
var original_url_41743 = (new URL(original_url_str_41741));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,original_url_41743.origin)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(original_url_41743.pathname,created_link_url_41713.pathname)))){
zero.impl.components.load_stylesheet(stylesheet_object_41742,href_41714);


var G__41744 = seq__40630_41736;
var G__41745 = chunk__40633_41737;
var G__41746 = count__40634_41738;
var G__41747 = (i__40635_41739 + (1));
seq__40630_41736 = G__41744;
chunk__40633_41737 = G__41745;
count__40634_41738 = G__41746;
i__40635_41739 = G__41747;
continue;
} else {
var G__41748 = seq__40630_41736;
var G__41749 = chunk__40633_41737;
var G__41750 = count__40634_41738;
var G__41751 = (i__40635_41739 + (1));
seq__40630_41736 = G__41748;
chunk__40633_41737 = G__41749;
count__40634_41738 = G__41750;
i__40635_41739 = G__41751;
continue;
}
} else {
var temp__5804__auto___41752__$2 = cljs.core.seq(seq__40630_41736);
if(temp__5804__auto___41752__$2){
var seq__40630_41753__$1 = temp__5804__auto___41752__$2;
if(cljs.core.chunked_seq_QMARK_(seq__40630_41753__$1)){
var c__5568__auto___41754 = cljs.core.chunk_first(seq__40630_41753__$1);
var G__41755 = cljs.core.chunk_rest(seq__40630_41753__$1);
var G__41756 = c__5568__auto___41754;
var G__41757 = cljs.core.count(c__5568__auto___41754);
var G__41758 = (0);
seq__40630_41736 = G__41755;
chunk__40633_41737 = G__41756;
count__40634_41738 = G__41757;
i__40635_41739 = G__41758;
continue;
} else {
var vec__40647_41759 = cljs.core.first(seq__40630_41753__$1);
var original_url_str_41760 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40647_41759,(0),null);
var stylesheet_object_41761 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40647_41759,(1),null);
var original_url_41764 = (new URL(original_url_str_41760));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(location.origin,original_url_41764.origin)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(original_url_41764.pathname,created_link_url_41713.pathname)))){
zero.impl.components.load_stylesheet(stylesheet_object_41761,href_41714);


var G__41766 = cljs.core.next(seq__40630_41753__$1);
var G__41767 = null;
var G__41768 = (0);
var G__41769 = (0);
seq__40630_41736 = G__41766;
chunk__40633_41737 = G__41767;
count__40634_41738 = G__41768;
i__40635_41739 = G__41769;
continue;
} else {
var G__41771 = cljs.core.next(seq__40630_41753__$1);
var G__41772 = null;
var G__41773 = (0);
var G__41774 = (0);
seq__40630_41736 = G__41771;
chunk__40633_41737 = G__41772;
count__40634_41738 = G__41773;
i__40635_41739 = G__41774;
continue;
}
}
} else {
}
}
break;
}


var G__41775 = cljs.core.next(seq__40243_41706__$1);
var G__41776 = null;
var G__41777 = (0);
var G__41778 = (0);
seq__40243_41630 = G__41775;
chunk__40247_41631 = G__41776;
count__40248_41632 = G__41777;
i__40249_41633 = G__41778;
continue;
} else {
var G__41779 = cljs.core.next(seq__40243_41706__$1);
var G__41780 = null;
var G__41781 = (0);
var G__41782 = (0);
seq__40243_41630 = G__41779;
chunk__40247_41631 = G__41780;
count__40248_41632 = G__41781;
i__40249_41633 = G__41782;
continue;
}
} else {
var G__41783 = cljs.core.next(seq__40243_41706__$1);
var G__41784 = null;
var G__41785 = (0);
var G__41786 = (0);
seq__40243_41630 = G__41783;
chunk__40247_41631 = G__41784;
count__40248_41632 = G__41785;
i__40249_41633 = G__41786;
continue;
}
}
} else {
}
}
break;
}

var G__41787 = cljs.core.next(seq__40242__$1);
var G__41788 = null;
var G__41789 = (0);
var G__41790 = (0);
seq__40242 = G__41787;
chunk__40253 = G__41788;
count__40254 = G__41789;
i__40255 = G__41790;
continue;
}
} else {
return null;
}
}
break;
}
});
var observer = (new MutationObserver(observer_cb));
var opts = ({"childList": true});
return addEventListener("load",(function (_){
observer.observe(document.head,opts);

return observer.observe(document.body,opts);
}),({"once": true}));
})():null);
}

//# sourceMappingURL=zero.impl.components.js.map
