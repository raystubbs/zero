goog.provide('zero.impl.actions');
goog.scope(function(){
  zero.impl.actions.goog$module$goog$object = goog.module.get('goog.object');
});
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.actions !== 'undefined') && (typeof zero.impl.actions.Action !== 'undefined')){
} else {
zero.impl.actions.Action = 
(class extends Function {
  props; effects;
  constructor(props, effects) {
    super();
    this.props = props;
    this.effects = effects;
    return new Proxy(this, {apply: (target, thisArg, args) => {
      if(args[0] instanceof Event) {
        zero.impl.actions.perform_with_event_BANG_(target, args[0]);
      } else {
        zero.impl.actions.perform_BANG_(target, args[0]);
      }
    }});
  }
});
}

/**
 * @interface
 */
zero.impl.actions.IAction = function(){};

var zero$impl$actions$IAction$perform_BANG_$dyn_38385 = (function (act,context){
var x__5393__auto__ = (((act == null))?null:act);
var m__5394__auto__ = (zero.impl.actions.perform_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(act,context) : m__5394__auto__.call(null,act,context));
} else {
var m__5392__auto__ = (zero.impl.actions.perform_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(act,context) : m__5392__auto__.call(null,act,context));
} else {
throw cljs.core.missing_protocol("IAction.perform!",act);
}
}
});
zero.impl.actions.perform_BANG_ = (function zero$impl$actions$perform_BANG_(act,context){
if((((!((act == null)))) && ((!((act.zero$impl$actions$IAction$perform_BANG_$arity$2 == null)))))){
return act.zero$impl$actions$IAction$perform_BANG_$arity$2(act,context);
} else {
return zero$impl$actions$IAction$perform_BANG_$dyn_38385(act,context);
}
});

zero.impl.actions.perform_with_event_BANG_ = (function zero$impl$actions$perform_with_event_BANG_(act,ev){
var props = act.props;
if(cljs.core.truth_(new cljs.core.Keyword(null,"prevent-default?","prevent-default?",-1165567888).cljs$core$IFn$_invoke$arity$1(props))){
ev.preventDefault();
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"stop-propagation?","stop-propagation?",-1212456103).cljs$core$IFn$_invoke$arity$1(props))){
ev.stopPropagation();
} else {
}

var root = ev.currentTarget.getRootNode();
return zero.impl.actions.perform_BANG_(act,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"shape","shape",1190694006),new cljs.core.Keyword("z","event-context","z/event-context",-26400570),new cljs.core.Keyword(null,"event","event",301435442),ev,new cljs.core.Keyword(null,"data","data",-232669377),zero.config.harvest_event.cljs$core$IFn$_invoke$arity$1(ev),new cljs.core.Keyword(null,"target","target",253001721),ev.target,new cljs.core.Keyword(null,"root","root",-448657453),root,new cljs.core.Keyword(null,"host","host",-1558485167),(((root instanceof ShadowRoot))?root.host:null),new cljs.core.Keyword(null,"current","current",-1088038603),ev.currentTarget], null));
});
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.actions !== 'undefined') && (typeof zero.impl.actions._BANG_effects !== 'undefined')){
} else {
zero.impl.actions._BANG_effects = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.actions !== 'undefined') && (typeof zero.impl.actions.THROTTLE_STATE !== 'undefined')){
} else {
zero.impl.actions.THROTTLE_STATE = Symbol("zThrottleState");
}
zero.impl.actions.do_effect_BANG_ = (function zero$impl$actions$do_effect_BANG_(p__38209){
var vec__38211 = p__38209;
var seq__38212 = cljs.core.seq(vec__38211);
var first__38213 = cljs.core.first(seq__38212);
var seq__38212__$1 = cljs.core.next(seq__38212);
var effect_key = first__38213;
var args = seq__38212__$1;
var effect = vec__38211;
var effect_fn = (function (){var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.impl.actions._BANG_effects),effect_key);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("No effect registered for key",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"effect-key","effect-key",-588262440),effect_key], null));
}
})();
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(effect_fn,args);
});
(zero.impl.actions.Action.prototype.zero$impl$actions$IAction$ = cljs.core.PROTOCOL_SENTINEL);

(zero.impl.actions.Action.prototype.zero$impl$actions$IAction$perform_BANG_$arity$2 = (function (this$,context){
var this$__$1 = this;
var map__38251 = this$__$1.props;
var map__38251__$1 = cljs.core.__destructure_map(map__38251);
var log_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38251__$1,new cljs.core.Keyword(null,"log?","log?",-366002723));
var throttle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38251__$1,new cljs.core.Keyword(null,"throttle","throttle",-1860340776));
var throttle_strategy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38251__$1,new cljs.core.Keyword(null,"throttle-strategy","throttle-strategy",-1207718550));
var should_log_QMARK_ = (function (){var and__5043__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5043__auto__)){
return log_QMARK_;
} else {
return and__5043__auto__;
}
})();
var actually_perform_BANG_ = (function zero$impl$actions$actually_perform_BANG_(){
if(cljs.core.truth_(should_log_QMARK_)){
console.groupCollapsed(this$__$1);

console.info(new cljs.core.Keyword(null,"context","context",-830191113),context);
} else {
}

var _BANG_errors = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var seq__38258_38406 = cljs.core.seq(zero.impl.injection.apply_injections(this$__$1.effects,context));
var chunk__38259_38407 = null;
var count__38260_38408 = (0);
var i__38261_38409 = (0);
while(true){
if((i__38261_38409 < count__38260_38408)){
var effect_38411 = chunk__38259_38407.cljs$core$IIndexed$_nth$arity$2(null,i__38261_38409);
try{zero.impl.actions.do_effect_BANG_(effect_38411);

if(cljs.core.truth_(should_log_QMARK_)){
console.info(new cljs.core.Keyword(null,"effect","effect",347343289),effect_38411);
} else {
}
}catch (e38294){var e_38412 = e38294;
console.error(new cljs.core.Keyword(null,"effect","effect",347343289),effect_38411,e_38412);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(_BANG_errors,cljs.core.conj,e_38412);
}

var G__38414 = seq__38258_38406;
var G__38415 = chunk__38259_38407;
var G__38416 = count__38260_38408;
var G__38417 = (i__38261_38409 + (1));
seq__38258_38406 = G__38414;
chunk__38259_38407 = G__38415;
count__38260_38408 = G__38416;
i__38261_38409 = G__38417;
continue;
} else {
var temp__5804__auto___38419 = cljs.core.seq(seq__38258_38406);
if(temp__5804__auto___38419){
var seq__38258_38421__$1 = temp__5804__auto___38419;
if(cljs.core.chunked_seq_QMARK_(seq__38258_38421__$1)){
var c__5568__auto___38428 = cljs.core.chunk_first(seq__38258_38421__$1);
var G__38432 = cljs.core.chunk_rest(seq__38258_38421__$1);
var G__38433 = c__5568__auto___38428;
var G__38434 = cljs.core.count(c__5568__auto___38428);
var G__38435 = (0);
seq__38258_38406 = G__38432;
chunk__38259_38407 = G__38433;
count__38260_38408 = G__38434;
i__38261_38409 = G__38435;
continue;
} else {
var effect_38436 = cljs.core.first(seq__38258_38421__$1);
try{zero.impl.actions.do_effect_BANG_(effect_38436);

if(cljs.core.truth_(should_log_QMARK_)){
console.info(new cljs.core.Keyword(null,"effect","effect",347343289),effect_38436);
} else {
}
}catch (e38321){var e_38442 = e38321;
console.error(new cljs.core.Keyword(null,"effect","effect",347343289),effect_38436,e_38442);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(_BANG_errors,cljs.core.conj,e_38442);
}

var G__38448 = cljs.core.next(seq__38258_38421__$1);
var G__38449 = null;
var G__38450 = (0);
var G__38451 = (0);
seq__38258_38406 = G__38448;
chunk__38259_38407 = G__38449;
count__38260_38408 = G__38450;
i__38261_38409 = G__38451;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(should_log_QMARK_)){
console.groupEnd();

var seq__38348 = cljs.core.seq(cljs.core.deref(_BANG_errors));
var chunk__38349 = null;
var count__38350 = (0);
var i__38351 = (0);
while(true){
if((i__38351 < count__38350)){
var error = chunk__38349.cljs$core$IIndexed$_nth$arity$2(null,i__38351);
console.error(error);


var G__38456 = seq__38348;
var G__38457 = chunk__38349;
var G__38458 = count__38350;
var G__38459 = (i__38351 + (1));
seq__38348 = G__38456;
chunk__38349 = G__38457;
count__38350 = G__38458;
i__38351 = G__38459;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__38348);
if(temp__5804__auto__){
var seq__38348__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38348__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__38348__$1);
var G__38464 = cljs.core.chunk_rest(seq__38348__$1);
var G__38465 = c__5568__auto__;
var G__38466 = cljs.core.count(c__5568__auto__);
var G__38467 = (0);
seq__38348 = G__38464;
chunk__38349 = G__38465;
count__38350 = G__38466;
i__38351 = G__38467;
continue;
} else {
var error = cljs.core.first(seq__38348__$1);
console.error(error);


var G__38471 = cljs.core.next(seq__38348__$1);
var G__38472 = null;
var G__38473 = (0);
var G__38474 = (0);
seq__38348 = G__38471;
chunk__38349 = G__38472;
count__38350 = G__38473;
i__38351 = G__38474;
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
if(typeof throttle === 'number'){
if((zero.impl.actions.goog$module$goog$object.get(this$__$1,zero.impl.actions.THROTTLE_STATE) == null)){
var G__38366_38480 = (function (){var or__5045__auto__ = throttle_strategy;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"default","default",-1987822328);
}
})();
var G__38366_38481__$1 = (((G__38366_38480 instanceof cljs.core.Keyword))?G__38366_38480.fqn:null);
switch (G__38366_38481__$1) {
case "default":
setTimeout(actually_perform_BANG_);

break;
case "debounce":

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__38366_38481__$1)].join('')));

}

var interval_id_38485 = setInterval((function (){
var map__38367 = zero.impl.actions.goog$module$goog$object.get(this$__$1,zero.impl.actions.THROTTLE_STATE);
var map__38367__$1 = cljs.core.__destructure_map(map__38367);
var state = map__38367__$1;
var hit_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38367__$1,new cljs.core.Keyword(null,"hit?","hit?",-364237458));
var interval_id_38485 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38367__$1,new cljs.core.Keyword(null,"interval-id","interval-id",79285360));
if(cljs.core.truth_(hit_QMARK_)){
setTimeout(actually_perform_BANG_);

return zero.impl.actions.goog$module$goog$object.set(this$__$1,zero.impl.actions.THROTTLE_STATE,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(state,new cljs.core.Keyword(null,"hit?","hit?",-364237458),false));
} else {
zero.impl.actions.goog$module$goog$object.set(this$__$1,zero.impl.actions.THROTTLE_STATE,null);

return clearInterval(interval_id_38485);

}
}));
zero.impl.actions.goog$module$goog$object.set(this$__$1,zero.impl.actions.THROTTLE_STATE,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hit?","hit?",-364237458),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(throttle_strategy,new cljs.core.Keyword(null,"debounce","debounce",-871550296)),new cljs.core.Keyword(null,"interval-id","interval-id",79285360),interval_id_38485], null));
} else {
zero.impl.actions.goog$module$goog$object.set(this$__$1,zero.impl.actions.THROTTLE_STATE,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(zero.impl.actions.goog$module$goog$object.get(this$__$1,zero.impl.actions.THROTTLE_STATE),new cljs.core.Keyword(null,"hit?","hit?",-364237458),true));

}
} else {
setTimeout(actually_perform_BANG_);

}

return null;
}));

(zero.impl.actions.Action.prototype.cljs$core$IEquiv$ = cljs.core.PROTOCOL_SENTINEL);

(zero.impl.actions.Action.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var this$__$1 = this;
return (((other instanceof zero.impl.actions.Action)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this$__$1.props,other.props)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this$__$1.effects,other.effects)))));
}));

(zero.impl.actions.Action.prototype.cljs$core$IHash$ = cljs.core.PROTOCOL_SENTINEL);

(zero.impl.actions.Action.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.hash(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1.effects,this$__$1.props], null));
}));

(zero.impl.actions.Action.prototype.cljs$core$IPrintWithWriter$ = cljs.core.PROTOCOL_SENTINEL);

(zero.impl.actions.Action.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,_opts){
var this$__$1 = this;
return cljs.core._write(writer,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"act","act",1830763413,null)], null),((cljs.core.seq(this$__$1.props))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1.props], null):null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([this$__$1.effects], 0))], 0)));
}));
zero.impl.actions.reg_effect = (function zero$impl$actions$reg_effect(effect_key,f){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.actions._BANG_effects,cljs.core.assoc,effect_key,f);
});

//# sourceMappingURL=zero.impl.actions.js.map
