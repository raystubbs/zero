goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_36963 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_36963(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_36966 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_36966(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__35894 = coll;
var G__35895 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__35894,G__35895) : shadow.dom.lazy_native_coll_seq.call(null,G__35894,G__35895));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5045__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__35946 = arguments.length;
switch (G__35946) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__35951 = arguments.length;
switch (G__35951) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__35963 = arguments.length;
switch (G__35963) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__35983 = arguments.length;
switch (G__35983) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__36000 = arguments.length;
switch (G__36000) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__36016 = arguments.length;
switch (G__36016) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e36032){if((e36032 instanceof Object)){
var e = e36032;
return console.log("didnt support attachEvent",el,e);
} else {
throw e36032;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__36051 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__36052 = null;
var count__36053 = (0);
var i__36054 = (0);
while(true){
if((i__36054 < count__36053)){
var el = chunk__36052.cljs$core$IIndexed$_nth$arity$2(null,i__36054);
var handler_37036__$1 = ((function (seq__36051,chunk__36052,count__36053,i__36054,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__36051,chunk__36052,count__36053,i__36054,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_37036__$1);


var G__37042 = seq__36051;
var G__37043 = chunk__36052;
var G__37044 = count__36053;
var G__37045 = (i__36054 + (1));
seq__36051 = G__37042;
chunk__36052 = G__37043;
count__36053 = G__37044;
i__36054 = G__37045;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__36051);
if(temp__5804__auto__){
var seq__36051__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__36051__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__36051__$1);
var G__37048 = cljs.core.chunk_rest(seq__36051__$1);
var G__37049 = c__5568__auto__;
var G__37050 = cljs.core.count(c__5568__auto__);
var G__37051 = (0);
seq__36051 = G__37048;
chunk__36052 = G__37049;
count__36053 = G__37050;
i__36054 = G__37051;
continue;
} else {
var el = cljs.core.first(seq__36051__$1);
var handler_37052__$1 = ((function (seq__36051,chunk__36052,count__36053,i__36054,el,seq__36051__$1,temp__5804__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__36051,chunk__36052,count__36053,i__36054,el,seq__36051__$1,temp__5804__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_37052__$1);


var G__37053 = cljs.core.next(seq__36051__$1);
var G__37054 = null;
var G__37055 = (0);
var G__37056 = (0);
seq__36051 = G__37053;
chunk__36052 = G__37054;
count__36053 = G__37055;
i__36054 = G__37056;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__36076 = arguments.length;
switch (G__36076) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__36090 = cljs.core.seq(events);
var chunk__36091 = null;
var count__36092 = (0);
var i__36093 = (0);
while(true){
if((i__36093 < count__36092)){
var vec__36107 = chunk__36091.cljs$core$IIndexed$_nth$arity$2(null,i__36093);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36107,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36107,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__37060 = seq__36090;
var G__37061 = chunk__36091;
var G__37062 = count__36092;
var G__37063 = (i__36093 + (1));
seq__36090 = G__37060;
chunk__36091 = G__37061;
count__36092 = G__37062;
i__36093 = G__37063;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__36090);
if(temp__5804__auto__){
var seq__36090__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__36090__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__36090__$1);
var G__37064 = cljs.core.chunk_rest(seq__36090__$1);
var G__37065 = c__5568__auto__;
var G__37066 = cljs.core.count(c__5568__auto__);
var G__37067 = (0);
seq__36090 = G__37064;
chunk__36091 = G__37065;
count__36092 = G__37066;
i__36093 = G__37067;
continue;
} else {
var vec__36111 = cljs.core.first(seq__36090__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36111,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36111,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__37070 = cljs.core.next(seq__36090__$1);
var G__37071 = null;
var G__37072 = (0);
var G__37073 = (0);
seq__36090 = G__37070;
chunk__36091 = G__37071;
count__36092 = G__37072;
i__36093 = G__37073;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__36117 = cljs.core.seq(styles);
var chunk__36118 = null;
var count__36119 = (0);
var i__36121 = (0);
while(true){
if((i__36121 < count__36119)){
var vec__36140 = chunk__36118.cljs$core$IIndexed$_nth$arity$2(null,i__36121);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36140,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36140,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__37076 = seq__36117;
var G__37077 = chunk__36118;
var G__37078 = count__36119;
var G__37079 = (i__36121 + (1));
seq__36117 = G__37076;
chunk__36118 = G__37077;
count__36119 = G__37078;
i__36121 = G__37079;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__36117);
if(temp__5804__auto__){
var seq__36117__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__36117__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__36117__$1);
var G__37080 = cljs.core.chunk_rest(seq__36117__$1);
var G__37081 = c__5568__auto__;
var G__37082 = cljs.core.count(c__5568__auto__);
var G__37083 = (0);
seq__36117 = G__37080;
chunk__36118 = G__37081;
count__36119 = G__37082;
i__36121 = G__37083;
continue;
} else {
var vec__36146 = cljs.core.first(seq__36117__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36146,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36146,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__37084 = cljs.core.next(seq__36117__$1);
var G__37085 = null;
var G__37086 = (0);
var G__37087 = (0);
seq__36117 = G__37084;
chunk__36118 = G__37085;
count__36119 = G__37086;
i__36121 = G__37087;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__36152_37088 = key;
var G__36152_37089__$1 = (((G__36152_37088 instanceof cljs.core.Keyword))?G__36152_37088.fqn:null);
switch (G__36152_37089__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_37092 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5045__auto__ = goog.string.startsWith(ks_37092,"data-");
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return goog.string.startsWith(ks_37092,"aria-");
}
})())){
el.setAttribute(ks_37092,value);
} else {
(el[ks_37092] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__36179){
var map__36180 = p__36179;
var map__36180__$1 = cljs.core.__destructure_map(map__36180);
var props = map__36180__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36180__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__36184 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36184,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36184,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36184,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__36188 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__36188,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__36188;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__36194 = arguments.length;
switch (G__36194) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__36207){
var vec__36208 = p__36207;
var seq__36209 = cljs.core.seq(vec__36208);
var first__36210 = cljs.core.first(seq__36209);
var seq__36209__$1 = cljs.core.next(seq__36209);
var nn = first__36210;
var first__36210__$1 = cljs.core.first(seq__36209__$1);
var seq__36209__$2 = cljs.core.next(seq__36209__$1);
var np = first__36210__$1;
var nc = seq__36209__$2;
var node = vec__36208;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__36215 = nn;
var G__36216 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__36215,G__36216) : create_fn.call(null,G__36215,G__36216));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__36218 = nn;
var G__36219 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__36218,G__36219) : create_fn.call(null,G__36218,G__36219));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__36229 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36229,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36229,(1),null);
var seq__36234_37102 = cljs.core.seq(node_children);
var chunk__36235_37103 = null;
var count__36236_37104 = (0);
var i__36237_37105 = (0);
while(true){
if((i__36237_37105 < count__36236_37104)){
var child_struct_37106 = chunk__36235_37103.cljs$core$IIndexed$_nth$arity$2(null,i__36237_37105);
var children_37107 = shadow.dom.dom_node(child_struct_37106);
if(cljs.core.seq_QMARK_(children_37107)){
var seq__36279_37108 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_37107));
var chunk__36281_37109 = null;
var count__36282_37110 = (0);
var i__36283_37111 = (0);
while(true){
if((i__36283_37111 < count__36282_37110)){
var child_37112 = chunk__36281_37109.cljs$core$IIndexed$_nth$arity$2(null,i__36283_37111);
if(cljs.core.truth_(child_37112)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_37112);


var G__37113 = seq__36279_37108;
var G__37114 = chunk__36281_37109;
var G__37115 = count__36282_37110;
var G__37116 = (i__36283_37111 + (1));
seq__36279_37108 = G__37113;
chunk__36281_37109 = G__37114;
count__36282_37110 = G__37115;
i__36283_37111 = G__37116;
continue;
} else {
var G__37117 = seq__36279_37108;
var G__37118 = chunk__36281_37109;
var G__37119 = count__36282_37110;
var G__37120 = (i__36283_37111 + (1));
seq__36279_37108 = G__37117;
chunk__36281_37109 = G__37118;
count__36282_37110 = G__37119;
i__36283_37111 = G__37120;
continue;
}
} else {
var temp__5804__auto___37121 = cljs.core.seq(seq__36279_37108);
if(temp__5804__auto___37121){
var seq__36279_37122__$1 = temp__5804__auto___37121;
if(cljs.core.chunked_seq_QMARK_(seq__36279_37122__$1)){
var c__5568__auto___37123 = cljs.core.chunk_first(seq__36279_37122__$1);
var G__37124 = cljs.core.chunk_rest(seq__36279_37122__$1);
var G__37125 = c__5568__auto___37123;
var G__37126 = cljs.core.count(c__5568__auto___37123);
var G__37127 = (0);
seq__36279_37108 = G__37124;
chunk__36281_37109 = G__37125;
count__36282_37110 = G__37126;
i__36283_37111 = G__37127;
continue;
} else {
var child_37128 = cljs.core.first(seq__36279_37122__$1);
if(cljs.core.truth_(child_37128)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_37128);


var G__37129 = cljs.core.next(seq__36279_37122__$1);
var G__37130 = null;
var G__37132 = (0);
var G__37133 = (0);
seq__36279_37108 = G__37129;
chunk__36281_37109 = G__37130;
count__36282_37110 = G__37132;
i__36283_37111 = G__37133;
continue;
} else {
var G__37134 = cljs.core.next(seq__36279_37122__$1);
var G__37135 = null;
var G__37136 = (0);
var G__37137 = (0);
seq__36279_37108 = G__37134;
chunk__36281_37109 = G__37135;
count__36282_37110 = G__37136;
i__36283_37111 = G__37137;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_37107);
}


var G__37138 = seq__36234_37102;
var G__37139 = chunk__36235_37103;
var G__37140 = count__36236_37104;
var G__37141 = (i__36237_37105 + (1));
seq__36234_37102 = G__37138;
chunk__36235_37103 = G__37139;
count__36236_37104 = G__37140;
i__36237_37105 = G__37141;
continue;
} else {
var temp__5804__auto___37142 = cljs.core.seq(seq__36234_37102);
if(temp__5804__auto___37142){
var seq__36234_37143__$1 = temp__5804__auto___37142;
if(cljs.core.chunked_seq_QMARK_(seq__36234_37143__$1)){
var c__5568__auto___37144 = cljs.core.chunk_first(seq__36234_37143__$1);
var G__37145 = cljs.core.chunk_rest(seq__36234_37143__$1);
var G__37146 = c__5568__auto___37144;
var G__37147 = cljs.core.count(c__5568__auto___37144);
var G__37148 = (0);
seq__36234_37102 = G__37145;
chunk__36235_37103 = G__37146;
count__36236_37104 = G__37147;
i__36237_37105 = G__37148;
continue;
} else {
var child_struct_37149 = cljs.core.first(seq__36234_37143__$1);
var children_37150 = shadow.dom.dom_node(child_struct_37149);
if(cljs.core.seq_QMARK_(children_37150)){
var seq__36287_37151 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_37150));
var chunk__36289_37152 = null;
var count__36290_37153 = (0);
var i__36291_37154 = (0);
while(true){
if((i__36291_37154 < count__36290_37153)){
var child_37158 = chunk__36289_37152.cljs$core$IIndexed$_nth$arity$2(null,i__36291_37154);
if(cljs.core.truth_(child_37158)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_37158);


var G__37159 = seq__36287_37151;
var G__37160 = chunk__36289_37152;
var G__37161 = count__36290_37153;
var G__37162 = (i__36291_37154 + (1));
seq__36287_37151 = G__37159;
chunk__36289_37152 = G__37160;
count__36290_37153 = G__37161;
i__36291_37154 = G__37162;
continue;
} else {
var G__37165 = seq__36287_37151;
var G__37166 = chunk__36289_37152;
var G__37167 = count__36290_37153;
var G__37168 = (i__36291_37154 + (1));
seq__36287_37151 = G__37165;
chunk__36289_37152 = G__37166;
count__36290_37153 = G__37167;
i__36291_37154 = G__37168;
continue;
}
} else {
var temp__5804__auto___37170__$1 = cljs.core.seq(seq__36287_37151);
if(temp__5804__auto___37170__$1){
var seq__36287_37171__$1 = temp__5804__auto___37170__$1;
if(cljs.core.chunked_seq_QMARK_(seq__36287_37171__$1)){
var c__5568__auto___37172 = cljs.core.chunk_first(seq__36287_37171__$1);
var G__37173 = cljs.core.chunk_rest(seq__36287_37171__$1);
var G__37174 = c__5568__auto___37172;
var G__37175 = cljs.core.count(c__5568__auto___37172);
var G__37176 = (0);
seq__36287_37151 = G__37173;
chunk__36289_37152 = G__37174;
count__36290_37153 = G__37175;
i__36291_37154 = G__37176;
continue;
} else {
var child_37177 = cljs.core.first(seq__36287_37171__$1);
if(cljs.core.truth_(child_37177)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_37177);


var G__37178 = cljs.core.next(seq__36287_37171__$1);
var G__37179 = null;
var G__37180 = (0);
var G__37181 = (0);
seq__36287_37151 = G__37178;
chunk__36289_37152 = G__37179;
count__36290_37153 = G__37180;
i__36291_37154 = G__37181;
continue;
} else {
var G__37182 = cljs.core.next(seq__36287_37171__$1);
var G__37183 = null;
var G__37184 = (0);
var G__37185 = (0);
seq__36287_37151 = G__37182;
chunk__36289_37152 = G__37183;
count__36290_37153 = G__37184;
i__36291_37154 = G__37185;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_37150);
}


var G__37186 = cljs.core.next(seq__36234_37143__$1);
var G__37187 = null;
var G__37188 = (0);
var G__37189 = (0);
seq__36234_37102 = G__37186;
chunk__36235_37103 = G__37187;
count__36236_37104 = G__37188;
i__36237_37105 = G__37189;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__36331 = cljs.core.seq(node);
var chunk__36332 = null;
var count__36333 = (0);
var i__36334 = (0);
while(true){
if((i__36334 < count__36333)){
var n = chunk__36332.cljs$core$IIndexed$_nth$arity$2(null,i__36334);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__37195 = seq__36331;
var G__37196 = chunk__36332;
var G__37197 = count__36333;
var G__37198 = (i__36334 + (1));
seq__36331 = G__37195;
chunk__36332 = G__37196;
count__36333 = G__37197;
i__36334 = G__37198;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__36331);
if(temp__5804__auto__){
var seq__36331__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__36331__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__36331__$1);
var G__37199 = cljs.core.chunk_rest(seq__36331__$1);
var G__37200 = c__5568__auto__;
var G__37201 = cljs.core.count(c__5568__auto__);
var G__37202 = (0);
seq__36331 = G__37199;
chunk__36332 = G__37200;
count__36333 = G__37201;
i__36334 = G__37202;
continue;
} else {
var n = cljs.core.first(seq__36331__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__37206 = cljs.core.next(seq__36331__$1);
var G__37207 = null;
var G__37208 = (0);
var G__37209 = (0);
seq__36331 = G__37206;
chunk__36332 = G__37207;
count__36333 = G__37208;
i__36334 = G__37209;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__36344 = arguments.length;
switch (G__36344) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__36350 = arguments.length;
switch (G__36350) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__36374 = arguments.length;
switch (G__36374) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5045__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5775__auto__ = [];
var len__5769__auto___37220 = arguments.length;
var i__5770__auto___37221 = (0);
while(true){
if((i__5770__auto___37221 < len__5769__auto___37220)){
args__5775__auto__.push((arguments[i__5770__auto___37221]));

var G__37222 = (i__5770__auto___37221 + (1));
i__5770__auto___37221 = G__37222;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__36404_37223 = cljs.core.seq(nodes);
var chunk__36405_37224 = null;
var count__36406_37225 = (0);
var i__36407_37226 = (0);
while(true){
if((i__36407_37226 < count__36406_37225)){
var node_37228 = chunk__36405_37224.cljs$core$IIndexed$_nth$arity$2(null,i__36407_37226);
fragment.appendChild(shadow.dom._to_dom(node_37228));


var G__37231 = seq__36404_37223;
var G__37232 = chunk__36405_37224;
var G__37233 = count__36406_37225;
var G__37234 = (i__36407_37226 + (1));
seq__36404_37223 = G__37231;
chunk__36405_37224 = G__37232;
count__36406_37225 = G__37233;
i__36407_37226 = G__37234;
continue;
} else {
var temp__5804__auto___37235 = cljs.core.seq(seq__36404_37223);
if(temp__5804__auto___37235){
var seq__36404_37237__$1 = temp__5804__auto___37235;
if(cljs.core.chunked_seq_QMARK_(seq__36404_37237__$1)){
var c__5568__auto___37239 = cljs.core.chunk_first(seq__36404_37237__$1);
var G__37240 = cljs.core.chunk_rest(seq__36404_37237__$1);
var G__37241 = c__5568__auto___37239;
var G__37242 = cljs.core.count(c__5568__auto___37239);
var G__37243 = (0);
seq__36404_37223 = G__37240;
chunk__36405_37224 = G__37241;
count__36406_37225 = G__37242;
i__36407_37226 = G__37243;
continue;
} else {
var node_37244 = cljs.core.first(seq__36404_37237__$1);
fragment.appendChild(shadow.dom._to_dom(node_37244));


var G__37245 = cljs.core.next(seq__36404_37237__$1);
var G__37246 = null;
var G__37247 = (0);
var G__37248 = (0);
seq__36404_37223 = G__37245;
chunk__36405_37224 = G__37246;
count__36406_37225 = G__37247;
i__36407_37226 = G__37248;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq36395){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq36395));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__36432_37249 = cljs.core.seq(scripts);
var chunk__36433_37250 = null;
var count__36434_37251 = (0);
var i__36435_37252 = (0);
while(true){
if((i__36435_37252 < count__36434_37251)){
var vec__36446_37253 = chunk__36433_37250.cljs$core$IIndexed$_nth$arity$2(null,i__36435_37252);
var script_tag_37254 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36446_37253,(0),null);
var script_body_37255 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36446_37253,(1),null);
eval(script_body_37255);


var G__37258 = seq__36432_37249;
var G__37259 = chunk__36433_37250;
var G__37260 = count__36434_37251;
var G__37261 = (i__36435_37252 + (1));
seq__36432_37249 = G__37258;
chunk__36433_37250 = G__37259;
count__36434_37251 = G__37260;
i__36435_37252 = G__37261;
continue;
} else {
var temp__5804__auto___37262 = cljs.core.seq(seq__36432_37249);
if(temp__5804__auto___37262){
var seq__36432_37263__$1 = temp__5804__auto___37262;
if(cljs.core.chunked_seq_QMARK_(seq__36432_37263__$1)){
var c__5568__auto___37264 = cljs.core.chunk_first(seq__36432_37263__$1);
var G__37265 = cljs.core.chunk_rest(seq__36432_37263__$1);
var G__37266 = c__5568__auto___37264;
var G__37267 = cljs.core.count(c__5568__auto___37264);
var G__37268 = (0);
seq__36432_37249 = G__37265;
chunk__36433_37250 = G__37266;
count__36434_37251 = G__37267;
i__36435_37252 = G__37268;
continue;
} else {
var vec__36449_37269 = cljs.core.first(seq__36432_37263__$1);
var script_tag_37270 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36449_37269,(0),null);
var script_body_37271 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36449_37269,(1),null);
eval(script_body_37271);


var G__37272 = cljs.core.next(seq__36432_37263__$1);
var G__37273 = null;
var G__37274 = (0);
var G__37275 = (0);
seq__36432_37249 = G__37272;
chunk__36433_37250 = G__37273;
count__36434_37251 = G__37274;
i__36435_37252 = G__37275;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__36452){
var vec__36453 = p__36452;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36453,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36453,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__36457 = arguments.length;
switch (G__36457) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__36458 = cljs.core.seq(style_keys);
var chunk__36459 = null;
var count__36460 = (0);
var i__36461 = (0);
while(true){
if((i__36461 < count__36460)){
var it = chunk__36459.cljs$core$IIndexed$_nth$arity$2(null,i__36461);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__37283 = seq__36458;
var G__37284 = chunk__36459;
var G__37285 = count__36460;
var G__37286 = (i__36461 + (1));
seq__36458 = G__37283;
chunk__36459 = G__37284;
count__36460 = G__37285;
i__36461 = G__37286;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__36458);
if(temp__5804__auto__){
var seq__36458__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__36458__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__36458__$1);
var G__37287 = cljs.core.chunk_rest(seq__36458__$1);
var G__37288 = c__5568__auto__;
var G__37289 = cljs.core.count(c__5568__auto__);
var G__37290 = (0);
seq__36458 = G__37287;
chunk__36459 = G__37288;
count__36460 = G__37289;
i__36461 = G__37290;
continue;
} else {
var it = cljs.core.first(seq__36458__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__37292 = cljs.core.next(seq__36458__$1);
var G__37293 = null;
var G__37294 = (0);
var G__37295 = (0);
seq__36458 = G__37292;
chunk__36459 = G__37293;
count__36460 = G__37294;
i__36461 = G__37295;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k36463,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__36467 = k36463;
var G__36467__$1 = (((G__36467 instanceof cljs.core.Keyword))?G__36467.fqn:null);
switch (G__36467__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k36463,else__5346__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__36468){
var vec__36469 = p__36468;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36469,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36469,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__36462){
var self__ = this;
var G__36462__$1 = this;
return (new cljs.core.RecordIter((0),G__36462__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this36464,other36465){
var self__ = this;
var this36464__$1 = this;
return (((!((other36465 == null)))) && ((((this36464__$1.constructor === other36465.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this36464__$1.x,other36465.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this36464__$1.y,other36465.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this36464__$1.__extmap,other36465.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k36463){
var self__ = this;
var this__5350__auto____$1 = this;
var G__36472 = k36463;
var G__36472__$1 = (((G__36472 instanceof cljs.core.Keyword))?G__36472.fqn:null);
switch (G__36472__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k36463);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__36462){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__36473 = cljs.core.keyword_identical_QMARK_;
var expr__36474 = k__5352__auto__;
if(cljs.core.truth_((pred__36473.cljs$core$IFn$_invoke$arity$2 ? pred__36473.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__36474) : pred__36473.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__36474)))){
return (new shadow.dom.Coordinate(G__36462,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__36473.cljs$core$IFn$_invoke$arity$2 ? pred__36473.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__36474) : pred__36473.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__36474)))){
return (new shadow.dom.Coordinate(self__.x,G__36462,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__36462),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__36462){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__36462,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__36466){
var extmap__5385__auto__ = (function (){var G__36476 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__36466,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__36466)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__36476);
} else {
return G__36476;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__36466),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__36466),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k36478,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__36482 = k36478;
var G__36482__$1 = (((G__36482 instanceof cljs.core.Keyword))?G__36482.fqn:null);
switch (G__36482__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k36478,else__5346__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__36483){
var vec__36484 = p__36483;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36484,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36484,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Size{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__36477){
var self__ = this;
var G__36477__$1 = this;
return (new cljs.core.RecordIter((0),G__36477__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this36479,other36480){
var self__ = this;
var this36479__$1 = this;
return (((!((other36480 == null)))) && ((((this36479__$1.constructor === other36480.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this36479__$1.w,other36480.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this36479__$1.h,other36480.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this36479__$1.__extmap,other36480.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k36478){
var self__ = this;
var this__5350__auto____$1 = this;
var G__36487 = k36478;
var G__36487__$1 = (((G__36487 instanceof cljs.core.Keyword))?G__36487.fqn:null);
switch (G__36487__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k36478);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__36477){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__36488 = cljs.core.keyword_identical_QMARK_;
var expr__36489 = k__5352__auto__;
if(cljs.core.truth_((pred__36488.cljs$core$IFn$_invoke$arity$2 ? pred__36488.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__36489) : pred__36488.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__36489)))){
return (new shadow.dom.Size(G__36477,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__36488.cljs$core$IFn$_invoke$arity$2 ? pred__36488.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__36489) : pred__36488.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__36489)))){
return (new shadow.dom.Size(self__.w,G__36477,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__36477),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__36477){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__36477,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__36481){
var extmap__5385__auto__ = (function (){var G__36491 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__36481,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__36481)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__36491);
} else {
return G__36491;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__36481),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__36481),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5633__auto__ = opts;
var l__5634__auto__ = a__5633__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5634__auto__)){
var G__37344 = (i + (1));
var G__37345 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__37344;
ret = G__37345;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__36496){
var vec__36497 = p__36496;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36497,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36497,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__36501 = arguments.length;
switch (G__36501) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5802__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5802__auto__)){
var child = temp__5802__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__37357 = ps;
var G__37358 = (i + (1));
el__$1 = G__37357;
i = G__37358;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__36575 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36575,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36575,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36575,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__36582_37364 = cljs.core.seq(props);
var chunk__36583_37365 = null;
var count__36584_37366 = (0);
var i__36585_37367 = (0);
while(true){
if((i__36585_37367 < count__36584_37366)){
var vec__36611_37368 = chunk__36583_37365.cljs$core$IIndexed$_nth$arity$2(null,i__36585_37367);
var k_37369 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36611_37368,(0),null);
var v_37370 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36611_37368,(1),null);
el.setAttributeNS((function (){var temp__5804__auto__ = cljs.core.namespace(k_37369);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_37369),v_37370);


var G__37374 = seq__36582_37364;
var G__37375 = chunk__36583_37365;
var G__37376 = count__36584_37366;
var G__37377 = (i__36585_37367 + (1));
seq__36582_37364 = G__37374;
chunk__36583_37365 = G__37375;
count__36584_37366 = G__37376;
i__36585_37367 = G__37377;
continue;
} else {
var temp__5804__auto___37381 = cljs.core.seq(seq__36582_37364);
if(temp__5804__auto___37381){
var seq__36582_37382__$1 = temp__5804__auto___37381;
if(cljs.core.chunked_seq_QMARK_(seq__36582_37382__$1)){
var c__5568__auto___37383 = cljs.core.chunk_first(seq__36582_37382__$1);
var G__37385 = cljs.core.chunk_rest(seq__36582_37382__$1);
var G__37386 = c__5568__auto___37383;
var G__37387 = cljs.core.count(c__5568__auto___37383);
var G__37388 = (0);
seq__36582_37364 = G__37385;
chunk__36583_37365 = G__37386;
count__36584_37366 = G__37387;
i__36585_37367 = G__37388;
continue;
} else {
var vec__36616_37390 = cljs.core.first(seq__36582_37382__$1);
var k_37391 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36616_37390,(0),null);
var v_37392 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36616_37390,(1),null);
el.setAttributeNS((function (){var temp__5804__auto____$1 = cljs.core.namespace(k_37391);
if(cljs.core.truth_(temp__5804__auto____$1)){
var ns = temp__5804__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_37391),v_37392);


var G__37393 = cljs.core.next(seq__36582_37382__$1);
var G__37394 = null;
var G__37395 = (0);
var G__37396 = (0);
seq__36582_37364 = G__37393;
chunk__36583_37365 = G__37394;
count__36584_37366 = G__37395;
i__36585_37367 = G__37396;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__36622 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36622,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36622,(1),null);
var seq__36625_37399 = cljs.core.seq(node_children);
var chunk__36627_37400 = null;
var count__36628_37401 = (0);
var i__36629_37402 = (0);
while(true){
if((i__36629_37402 < count__36628_37401)){
var child_struct_37403 = chunk__36627_37400.cljs$core$IIndexed$_nth$arity$2(null,i__36629_37402);
if((!((child_struct_37403 == null)))){
if(typeof child_struct_37403 === 'string'){
var text_37404 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_37404),child_struct_37403].join(''));
} else {
var children_37405 = shadow.dom.svg_node(child_struct_37403);
if(cljs.core.seq_QMARK_(children_37405)){
var seq__36682_37406 = cljs.core.seq(children_37405);
var chunk__36684_37407 = null;
var count__36685_37408 = (0);
var i__36686_37409 = (0);
while(true){
if((i__36686_37409 < count__36685_37408)){
var child_37410 = chunk__36684_37407.cljs$core$IIndexed$_nth$arity$2(null,i__36686_37409);
if(cljs.core.truth_(child_37410)){
node.appendChild(child_37410);


var G__37411 = seq__36682_37406;
var G__37412 = chunk__36684_37407;
var G__37413 = count__36685_37408;
var G__37414 = (i__36686_37409 + (1));
seq__36682_37406 = G__37411;
chunk__36684_37407 = G__37412;
count__36685_37408 = G__37413;
i__36686_37409 = G__37414;
continue;
} else {
var G__37415 = seq__36682_37406;
var G__37416 = chunk__36684_37407;
var G__37417 = count__36685_37408;
var G__37418 = (i__36686_37409 + (1));
seq__36682_37406 = G__37415;
chunk__36684_37407 = G__37416;
count__36685_37408 = G__37417;
i__36686_37409 = G__37418;
continue;
}
} else {
var temp__5804__auto___37419 = cljs.core.seq(seq__36682_37406);
if(temp__5804__auto___37419){
var seq__36682_37420__$1 = temp__5804__auto___37419;
if(cljs.core.chunked_seq_QMARK_(seq__36682_37420__$1)){
var c__5568__auto___37421 = cljs.core.chunk_first(seq__36682_37420__$1);
var G__37422 = cljs.core.chunk_rest(seq__36682_37420__$1);
var G__37423 = c__5568__auto___37421;
var G__37424 = cljs.core.count(c__5568__auto___37421);
var G__37425 = (0);
seq__36682_37406 = G__37422;
chunk__36684_37407 = G__37423;
count__36685_37408 = G__37424;
i__36686_37409 = G__37425;
continue;
} else {
var child_37428 = cljs.core.first(seq__36682_37420__$1);
if(cljs.core.truth_(child_37428)){
node.appendChild(child_37428);


var G__37430 = cljs.core.next(seq__36682_37420__$1);
var G__37431 = null;
var G__37432 = (0);
var G__37433 = (0);
seq__36682_37406 = G__37430;
chunk__36684_37407 = G__37431;
count__36685_37408 = G__37432;
i__36686_37409 = G__37433;
continue;
} else {
var G__37434 = cljs.core.next(seq__36682_37420__$1);
var G__37435 = null;
var G__37436 = (0);
var G__37437 = (0);
seq__36682_37406 = G__37434;
chunk__36684_37407 = G__37435;
count__36685_37408 = G__37436;
i__36686_37409 = G__37437;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_37405);
}
}


var G__37438 = seq__36625_37399;
var G__37439 = chunk__36627_37400;
var G__37440 = count__36628_37401;
var G__37441 = (i__36629_37402 + (1));
seq__36625_37399 = G__37438;
chunk__36627_37400 = G__37439;
count__36628_37401 = G__37440;
i__36629_37402 = G__37441;
continue;
} else {
var G__37442 = seq__36625_37399;
var G__37443 = chunk__36627_37400;
var G__37444 = count__36628_37401;
var G__37445 = (i__36629_37402 + (1));
seq__36625_37399 = G__37442;
chunk__36627_37400 = G__37443;
count__36628_37401 = G__37444;
i__36629_37402 = G__37445;
continue;
}
} else {
var temp__5804__auto___37446 = cljs.core.seq(seq__36625_37399);
if(temp__5804__auto___37446){
var seq__36625_37447__$1 = temp__5804__auto___37446;
if(cljs.core.chunked_seq_QMARK_(seq__36625_37447__$1)){
var c__5568__auto___37448 = cljs.core.chunk_first(seq__36625_37447__$1);
var G__37449 = cljs.core.chunk_rest(seq__36625_37447__$1);
var G__37450 = c__5568__auto___37448;
var G__37451 = cljs.core.count(c__5568__auto___37448);
var G__37452 = (0);
seq__36625_37399 = G__37449;
chunk__36627_37400 = G__37450;
count__36628_37401 = G__37451;
i__36629_37402 = G__37452;
continue;
} else {
var child_struct_37453 = cljs.core.first(seq__36625_37447__$1);
if((!((child_struct_37453 == null)))){
if(typeof child_struct_37453 === 'string'){
var text_37454 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_37454),child_struct_37453].join(''));
} else {
var children_37455 = shadow.dom.svg_node(child_struct_37453);
if(cljs.core.seq_QMARK_(children_37455)){
var seq__36688_37456 = cljs.core.seq(children_37455);
var chunk__36690_37457 = null;
var count__36691_37458 = (0);
var i__36692_37459 = (0);
while(true){
if((i__36692_37459 < count__36691_37458)){
var child_37460 = chunk__36690_37457.cljs$core$IIndexed$_nth$arity$2(null,i__36692_37459);
if(cljs.core.truth_(child_37460)){
node.appendChild(child_37460);


var G__37461 = seq__36688_37456;
var G__37462 = chunk__36690_37457;
var G__37463 = count__36691_37458;
var G__37464 = (i__36692_37459 + (1));
seq__36688_37456 = G__37461;
chunk__36690_37457 = G__37462;
count__36691_37458 = G__37463;
i__36692_37459 = G__37464;
continue;
} else {
var G__37465 = seq__36688_37456;
var G__37466 = chunk__36690_37457;
var G__37467 = count__36691_37458;
var G__37468 = (i__36692_37459 + (1));
seq__36688_37456 = G__37465;
chunk__36690_37457 = G__37466;
count__36691_37458 = G__37467;
i__36692_37459 = G__37468;
continue;
}
} else {
var temp__5804__auto___37469__$1 = cljs.core.seq(seq__36688_37456);
if(temp__5804__auto___37469__$1){
var seq__36688_37470__$1 = temp__5804__auto___37469__$1;
if(cljs.core.chunked_seq_QMARK_(seq__36688_37470__$1)){
var c__5568__auto___37471 = cljs.core.chunk_first(seq__36688_37470__$1);
var G__37472 = cljs.core.chunk_rest(seq__36688_37470__$1);
var G__37473 = c__5568__auto___37471;
var G__37474 = cljs.core.count(c__5568__auto___37471);
var G__37475 = (0);
seq__36688_37456 = G__37472;
chunk__36690_37457 = G__37473;
count__36691_37458 = G__37474;
i__36692_37459 = G__37475;
continue;
} else {
var child_37476 = cljs.core.first(seq__36688_37470__$1);
if(cljs.core.truth_(child_37476)){
node.appendChild(child_37476);


var G__37477 = cljs.core.next(seq__36688_37470__$1);
var G__37478 = null;
var G__37479 = (0);
var G__37480 = (0);
seq__36688_37456 = G__37477;
chunk__36690_37457 = G__37478;
count__36691_37458 = G__37479;
i__36692_37459 = G__37480;
continue;
} else {
var G__37481 = cljs.core.next(seq__36688_37470__$1);
var G__37482 = null;
var G__37483 = (0);
var G__37484 = (0);
seq__36688_37456 = G__37481;
chunk__36690_37457 = G__37482;
count__36691_37458 = G__37483;
i__36692_37459 = G__37484;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_37455);
}
}


var G__37485 = cljs.core.next(seq__36625_37447__$1);
var G__37486 = null;
var G__37487 = (0);
var G__37488 = (0);
seq__36625_37399 = G__37485;
chunk__36627_37400 = G__37486;
count__36628_37401 = G__37487;
i__36629_37402 = G__37488;
continue;
} else {
var G__37489 = cljs.core.next(seq__36625_37447__$1);
var G__37490 = null;
var G__37491 = (0);
var G__37492 = (0);
seq__36625_37399 = G__37489;
chunk__36627_37400 = G__37490;
count__36628_37401 = G__37491;
i__36629_37402 = G__37492;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___37498 = arguments.length;
var i__5770__auto___37499 = (0);
while(true){
if((i__5770__auto___37499 < len__5769__auto___37498)){
args__5775__auto__.push((arguments[i__5770__auto___37499]));

var G__37500 = (i__5770__auto___37499 + (1));
i__5770__auto___37499 = G__37500;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq36840){
var G__36841 = cljs.core.first(seq36840);
var seq36840__$1 = cljs.core.next(seq36840);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__36841,seq36840__$1);
}));

/**
 * returns a channel for events on el
 * transform-fn should be a (fn [e el] some-val) where some-val will be put on the chan
 * once-or-cleanup handles the removal of the event handler
 * - true: remove after one event
 * - false: never removed
 * - chan: remove on msg/close
 */
shadow.dom.event_chan = (function shadow$dom$event_chan(var_args){
var G__36901 = arguments.length;
switch (G__36901) {
case 2:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2 = (function (el,event){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,null,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3 = (function (el,event,xf){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,xf,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4 = (function (el,event,xf,once_or_cleanup){
var buf = cljs.core.async.sliding_buffer((1));
var chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(buf,xf);
var event_fn = (function shadow$dom$event_fn(e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(chan,e);

if(once_or_cleanup === true){
shadow.dom.remove_event_handler(el,event,shadow$dom$event_fn);

return cljs.core.async.close_BANG_(chan);
} else {
return null;
}
});
shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(event),event_fn);

if(cljs.core.truth_((function (){var and__5043__auto__ = once_or_cleanup;
if(cljs.core.truth_(and__5043__auto__)){
return (!(once_or_cleanup === true));
} else {
return and__5043__auto__;
}
})())){
var c__33628__auto___37503 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_36918){
var state_val_36919 = (state_36918[(1)]);
if((state_val_36919 === (1))){
var state_36918__$1 = state_36918;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_36918__$1,(2),once_or_cleanup);
} else {
if((state_val_36919 === (2))){
var inst_36911 = (state_36918[(2)]);
var inst_36915 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_36918__$1 = (function (){var statearr_36925 = state_36918;
(statearr_36925[(7)] = inst_36911);

return statearr_36925;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_36918__$1,inst_36915);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__33262__auto__ = null;
var shadow$dom$state_machine__33262__auto____0 = (function (){
var statearr_36928 = [null,null,null,null,null,null,null,null];
(statearr_36928[(0)] = shadow$dom$state_machine__33262__auto__);

(statearr_36928[(1)] = (1));

return statearr_36928;
});
var shadow$dom$state_machine__33262__auto____1 = (function (state_36918){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_36918);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e36931){var ex__33265__auto__ = e36931;
var statearr_36932_37504 = state_36918;
(statearr_36932_37504[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_36918[(4)]))){
var statearr_36934_37505 = state_36918;
(statearr_36934_37505[(1)] = cljs.core.first((state_36918[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37506 = state_36918;
state_36918 = G__37506;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
shadow$dom$state_machine__33262__auto__ = function(state_36918){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__33262__auto____0.call(this);
case 1:
return shadow$dom$state_machine__33262__auto____1.call(this,state_36918);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__33262__auto____0;
shadow$dom$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__33262__auto____1;
return shadow$dom$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_36939 = f__33629__auto__();
(statearr_36939[(6)] = c__33628__auto___37503);

return statearr_36939;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.dom.js.map
