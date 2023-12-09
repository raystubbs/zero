goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33773 = (function (f,blockable,meta33774){
this.f = f;
this.blockable = blockable;
this.meta33774 = meta33774;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async33773.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33775,meta33774__$1){
var self__ = this;
var _33775__$1 = this;
return (new cljs.core.async.t_cljs$core$async33773(self__.f,self__.blockable,meta33774__$1));
}));

(cljs.core.async.t_cljs$core$async33773.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33775){
var self__ = this;
var _33775__$1 = this;
return self__.meta33774;
}));

(cljs.core.async.t_cljs$core$async33773.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33773.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async33773.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async33773.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async33773.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta33774","meta33774",39242390,null)], null);
}));

(cljs.core.async.t_cljs$core$async33773.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async33773.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33773");

(cljs.core.async.t_cljs$core$async33773.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async33773");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async33773.
 */
cljs.core.async.__GT_t_cljs$core$async33773 = (function cljs$core$async$__GT_t_cljs$core$async33773(f,blockable,meta33774){
return (new cljs.core.async.t_cljs$core$async33773(f,blockable,meta33774));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__33752 = arguments.length;
switch (G__33752) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async33773(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__33798 = arguments.length;
switch (G__33798) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__33802 = arguments.length;
switch (G__33802) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__33804 = arguments.length;
switch (G__33804) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_35884 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_35884) : fn1.call(null,val_35884));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_35884) : fn1.call(null,val_35884));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__33806 = arguments.length;
switch (G__33806) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5802__auto__)){
var ret = temp__5802__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5802__auto__)){
var retb = temp__5802__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5636__auto___35890 = n;
var x_35891 = (0);
while(true){
if((x_35891 < n__5636__auto___35890)){
(a[x_35891] = x_35891);

var G__35892 = (x_35891 + (1));
x_35891 = G__35892;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33807 = (function (flag,meta33808){
this.flag = flag;
this.meta33808 = meta33808;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async33807.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33809,meta33808__$1){
var self__ = this;
var _33809__$1 = this;
return (new cljs.core.async.t_cljs$core$async33807(self__.flag,meta33808__$1));
}));

(cljs.core.async.t_cljs$core$async33807.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33809){
var self__ = this;
var _33809__$1 = this;
return self__.meta33808;
}));

(cljs.core.async.t_cljs$core$async33807.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33807.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async33807.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async33807.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async33807.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta33808","meta33808",1095367037,null)], null);
}));

(cljs.core.async.t_cljs$core$async33807.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async33807.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33807");

(cljs.core.async.t_cljs$core$async33807.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async33807");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async33807.
 */
cljs.core.async.__GT_t_cljs$core$async33807 = (function cljs$core$async$__GT_t_cljs$core$async33807(flag,meta33808){
return (new cljs.core.async.t_cljs$core$async33807(flag,meta33808));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async33807(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async33810 = (function (flag,cb,meta33811){
this.flag = flag;
this.cb = cb;
this.meta33811 = meta33811;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async33810.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_33812,meta33811__$1){
var self__ = this;
var _33812__$1 = this;
return (new cljs.core.async.t_cljs$core$async33810(self__.flag,self__.cb,meta33811__$1));
}));

(cljs.core.async.t_cljs$core$async33810.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_33812){
var self__ = this;
var _33812__$1 = this;
return self__.meta33811;
}));

(cljs.core.async.t_cljs$core$async33810.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async33810.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async33810.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async33810.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async33810.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta33811","meta33811",-1836898695,null)], null);
}));

(cljs.core.async.t_cljs$core$async33810.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async33810.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async33810");

(cljs.core.async.t_cljs$core$async33810.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async33810");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async33810.
 */
cljs.core.async.__GT_t_cljs$core$async33810 = (function cljs$core$async$__GT_t_cljs$core$async33810(flag,cb,meta33811){
return (new cljs.core.async.t_cljs$core$async33810(flag,cb,meta33811));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async33810(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__33815_SHARP_){
var G__33817 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__33815_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__33817) : fret.call(null,G__33817));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__33816_SHARP_){
var G__33818 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__33816_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__33818) : fret.call(null,G__33818));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5045__auto__ = wport;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return port;
}
})()], null));
} else {
var G__35902 = (i + (1));
i = G__35902;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5045__auto__ = ret;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5804__auto__ = (function (){var and__5043__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5043__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var got = temp__5804__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___35906 = arguments.length;
var i__5770__auto___35907 = (0);
while(true){
if((i__5770__auto___35907 < len__5769__auto___35906)){
args__5775__auto__.push((arguments[i__5770__auto___35907]));

var G__35908 = (i__5770__auto___35907 + (1));
i__5770__auto___35907 = G__35908;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__33821){
var map__33822 = p__33821;
var map__33822__$1 = cljs.core.__destructure_map(map__33822);
var opts = map__33822__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq33819){
var G__33820 = cljs.core.first(seq33819);
var seq33819__$1 = cljs.core.next(seq33819);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__33820,seq33819__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__33824 = arguments.length;
switch (G__33824) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__33628__auto___35914 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_33860){
var state_val_33861 = (state_33860[(1)]);
if((state_val_33861 === (7))){
var inst_33855 = (state_33860[(2)]);
var state_33860__$1 = state_33860;
var statearr_33864_35915 = state_33860__$1;
(statearr_33864_35915[(2)] = inst_33855);

(statearr_33864_35915[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (1))){
var state_33860__$1 = state_33860;
var statearr_33865_35916 = state_33860__$1;
(statearr_33865_35916[(2)] = null);

(statearr_33865_35916[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (4))){
var inst_33837 = (state_33860[(7)]);
var inst_33837__$1 = (state_33860[(2)]);
var inst_33838 = (inst_33837__$1 == null);
var state_33860__$1 = (function (){var statearr_33866 = state_33860;
(statearr_33866[(7)] = inst_33837__$1);

return statearr_33866;
})();
if(cljs.core.truth_(inst_33838)){
var statearr_33867_35917 = state_33860__$1;
(statearr_33867_35917[(1)] = (5));

} else {
var statearr_33868_35918 = state_33860__$1;
(statearr_33868_35918[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (13))){
var state_33860__$1 = state_33860;
var statearr_33870_35919 = state_33860__$1;
(statearr_33870_35919[(2)] = null);

(statearr_33870_35919[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (6))){
var inst_33837 = (state_33860[(7)]);
var state_33860__$1 = state_33860;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33860__$1,(11),to,inst_33837);
} else {
if((state_val_33861 === (3))){
var inst_33858 = (state_33860[(2)]);
var state_33860__$1 = state_33860;
return cljs.core.async.impl.ioc_helpers.return_chan(state_33860__$1,inst_33858);
} else {
if((state_val_33861 === (12))){
var state_33860__$1 = state_33860;
var statearr_33871_35926 = state_33860__$1;
(statearr_33871_35926[(2)] = null);

(statearr_33871_35926[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (2))){
var state_33860__$1 = state_33860;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33860__$1,(4),from);
} else {
if((state_val_33861 === (11))){
var inst_33848 = (state_33860[(2)]);
var state_33860__$1 = state_33860;
if(cljs.core.truth_(inst_33848)){
var statearr_33872_35927 = state_33860__$1;
(statearr_33872_35927[(1)] = (12));

} else {
var statearr_33873_35928 = state_33860__$1;
(statearr_33873_35928[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (9))){
var state_33860__$1 = state_33860;
var statearr_33875_35929 = state_33860__$1;
(statearr_33875_35929[(2)] = null);

(statearr_33875_35929[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (5))){
var state_33860__$1 = state_33860;
if(cljs.core.truth_(close_QMARK_)){
var statearr_33876_35930 = state_33860__$1;
(statearr_33876_35930[(1)] = (8));

} else {
var statearr_33877_35931 = state_33860__$1;
(statearr_33877_35931[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (14))){
var inst_33853 = (state_33860[(2)]);
var state_33860__$1 = state_33860;
var statearr_33878_35932 = state_33860__$1;
(statearr_33878_35932[(2)] = inst_33853);

(statearr_33878_35932[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (10))){
var inst_33845 = (state_33860[(2)]);
var state_33860__$1 = state_33860;
var statearr_33879_35933 = state_33860__$1;
(statearr_33879_35933[(2)] = inst_33845);

(statearr_33879_35933[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33861 === (8))){
var inst_33842 = cljs.core.async.close_BANG_(to);
var state_33860__$1 = state_33860;
var statearr_33880_35940 = state_33860__$1;
(statearr_33880_35940[(2)] = inst_33842);

(statearr_33880_35940[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_33881 = [null,null,null,null,null,null,null,null];
(statearr_33881[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_33881[(1)] = (1));

return statearr_33881;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_33860){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_33860);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e33883){var ex__33265__auto__ = e33883;
var statearr_33884_35942 = state_33860;
(statearr_33884_35942[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_33860[(4)]))){
var statearr_33885_35943 = state_33860;
(statearr_33885_35943[(1)] = cljs.core.first((state_33860[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35944 = state_33860;
state_33860 = G__35944;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_33860){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_33860);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_33886 = f__33629__auto__();
(statearr_33886[(6)] = c__33628__auto___35914);

return statearr_33886;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__33888){
var vec__33889 = p__33888;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__33889,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__33889,(1),null);
var job = vec__33889;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__33628__auto___35948 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_33896){
var state_val_33897 = (state_33896[(1)]);
if((state_val_33897 === (1))){
var state_33896__$1 = state_33896;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33896__$1,(2),res,v);
} else {
if((state_val_33897 === (2))){
var inst_33893 = (state_33896[(2)]);
var inst_33894 = cljs.core.async.close_BANG_(res);
var state_33896__$1 = (function (){var statearr_33899 = state_33896;
(statearr_33899[(7)] = inst_33893);

return statearr_33899;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_33896__$1,inst_33894);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0 = (function (){
var statearr_33900 = [null,null,null,null,null,null,null,null];
(statearr_33900[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__);

(statearr_33900[(1)] = (1));

return statearr_33900;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1 = (function (state_33896){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_33896);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e33901){var ex__33265__auto__ = e33901;
var statearr_33902_35952 = state_33896;
(statearr_33902_35952[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_33896[(4)]))){
var statearr_33903_35953 = state_33896;
(statearr_33903_35953[(1)] = cljs.core.first((state_33896[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35954 = state_33896;
state_33896 = G__35954;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = function(state_33896){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1.call(this,state_33896);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_33905 = f__33629__auto__();
(statearr_33905[(6)] = c__33628__auto___35948);

return statearr_33905;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__33906){
var vec__33907 = p__33906;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__33907,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__33907,(1),null);
var job = vec__33907;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5636__auto___35955 = n;
var __35956 = (0);
while(true){
if((__35956 < n__5636__auto___35955)){
var G__33910_35957 = type;
var G__33910_35958__$1 = (((G__33910_35957 instanceof cljs.core.Keyword))?G__33910_35957.fqn:null);
switch (G__33910_35958__$1) {
case "compute":
var c__33628__auto___35960 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__35956,c__33628__auto___35960,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async){
return (function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = ((function (__35956,c__33628__auto___35960,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async){
return (function (state_33924){
var state_val_33925 = (state_33924[(1)]);
if((state_val_33925 === (1))){
var state_33924__$1 = state_33924;
var statearr_33926_35962 = state_33924__$1;
(statearr_33926_35962[(2)] = null);

(statearr_33926_35962[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33925 === (2))){
var state_33924__$1 = state_33924;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33924__$1,(4),jobs);
} else {
if((state_val_33925 === (3))){
var inst_33922 = (state_33924[(2)]);
var state_33924__$1 = state_33924;
return cljs.core.async.impl.ioc_helpers.return_chan(state_33924__$1,inst_33922);
} else {
if((state_val_33925 === (4))){
var inst_33914 = (state_33924[(2)]);
var inst_33915 = process__$1(inst_33914);
var state_33924__$1 = state_33924;
if(cljs.core.truth_(inst_33915)){
var statearr_33927_35964 = state_33924__$1;
(statearr_33927_35964[(1)] = (5));

} else {
var statearr_33928_35970 = state_33924__$1;
(statearr_33928_35970[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33925 === (5))){
var state_33924__$1 = state_33924;
var statearr_33930_35971 = state_33924__$1;
(statearr_33930_35971[(2)] = null);

(statearr_33930_35971[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33925 === (6))){
var state_33924__$1 = state_33924;
var statearr_33931_35972 = state_33924__$1;
(statearr_33931_35972[(2)] = null);

(statearr_33931_35972[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33925 === (7))){
var inst_33920 = (state_33924[(2)]);
var state_33924__$1 = state_33924;
var statearr_33932_35973 = state_33924__$1;
(statearr_33932_35973[(2)] = inst_33920);

(statearr_33932_35973[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__35956,c__33628__auto___35960,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async))
;
return ((function (__35956,switch__33261__auto__,c__33628__auto___35960,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0 = (function (){
var statearr_33933 = [null,null,null,null,null,null,null];
(statearr_33933[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__);

(statearr_33933[(1)] = (1));

return statearr_33933;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1 = (function (state_33924){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_33924);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e33934){var ex__33265__auto__ = e33934;
var statearr_33935_35979 = state_33924;
(statearr_33935_35979[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_33924[(4)]))){
var statearr_33936_35980 = state_33924;
(statearr_33936_35980[(1)] = cljs.core.first((state_33924[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35982 = state_33924;
state_33924 = G__35982;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = function(state_33924){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1.call(this,state_33924);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__;
})()
;})(__35956,switch__33261__auto__,c__33628__auto___35960,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async))
})();
var state__33630__auto__ = (function (){var statearr_33938 = f__33629__auto__();
(statearr_33938[(6)] = c__33628__auto___35960);

return statearr_33938;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
});})(__35956,c__33628__auto___35960,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async))
);


break;
case "async":
var c__33628__auto___35984 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__35956,c__33628__auto___35984,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async){
return (function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = ((function (__35956,c__33628__auto___35984,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async){
return (function (state_33951){
var state_val_33952 = (state_33951[(1)]);
if((state_val_33952 === (1))){
var state_33951__$1 = state_33951;
var statearr_33953_35985 = state_33951__$1;
(statearr_33953_35985[(2)] = null);

(statearr_33953_35985[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33952 === (2))){
var state_33951__$1 = state_33951;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33951__$1,(4),jobs);
} else {
if((state_val_33952 === (3))){
var inst_33949 = (state_33951[(2)]);
var state_33951__$1 = state_33951;
return cljs.core.async.impl.ioc_helpers.return_chan(state_33951__$1,inst_33949);
} else {
if((state_val_33952 === (4))){
var inst_33941 = (state_33951[(2)]);
var inst_33942 = async(inst_33941);
var state_33951__$1 = state_33951;
if(cljs.core.truth_(inst_33942)){
var statearr_33955_35986 = state_33951__$1;
(statearr_33955_35986[(1)] = (5));

} else {
var statearr_33956_35987 = state_33951__$1;
(statearr_33956_35987[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33952 === (5))){
var state_33951__$1 = state_33951;
var statearr_33957_35988 = state_33951__$1;
(statearr_33957_35988[(2)] = null);

(statearr_33957_35988[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33952 === (6))){
var state_33951__$1 = state_33951;
var statearr_33958_35989 = state_33951__$1;
(statearr_33958_35989[(2)] = null);

(statearr_33958_35989[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33952 === (7))){
var inst_33947 = (state_33951[(2)]);
var state_33951__$1 = state_33951;
var statearr_33959_35991 = state_33951__$1;
(statearr_33959_35991[(2)] = inst_33947);

(statearr_33959_35991[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__35956,c__33628__auto___35984,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async))
;
return ((function (__35956,switch__33261__auto__,c__33628__auto___35984,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0 = (function (){
var statearr_33960 = [null,null,null,null,null,null,null];
(statearr_33960[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__);

(statearr_33960[(1)] = (1));

return statearr_33960;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1 = (function (state_33951){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_33951);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e33961){var ex__33265__auto__ = e33961;
var statearr_33962_35992 = state_33951;
(statearr_33962_35992[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_33951[(4)]))){
var statearr_33963_35993 = state_33951;
(statearr_33963_35993[(1)] = cljs.core.first((state_33951[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__35994 = state_33951;
state_33951 = G__35994;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = function(state_33951){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1.call(this,state_33951);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__;
})()
;})(__35956,switch__33261__auto__,c__33628__auto___35984,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async))
})();
var state__33630__auto__ = (function (){var statearr_33965 = f__33629__auto__();
(statearr_33965[(6)] = c__33628__auto___35984);

return statearr_33965;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
});})(__35956,c__33628__auto___35984,G__33910_35957,G__33910_35958__$1,n__5636__auto___35955,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__33910_35958__$1)].join('')));

}

var G__35996 = (__35956 + (1));
__35956 = G__35996;
continue;
} else {
}
break;
}

var c__33628__auto___35997 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_33988){
var state_val_33989 = (state_33988[(1)]);
if((state_val_33989 === (7))){
var inst_33984 = (state_33988[(2)]);
var state_33988__$1 = state_33988;
var statearr_33990_35999 = state_33988__$1;
(statearr_33990_35999[(2)] = inst_33984);

(statearr_33990_35999[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33989 === (1))){
var state_33988__$1 = state_33988;
var statearr_33992_36001 = state_33988__$1;
(statearr_33992_36001[(2)] = null);

(statearr_33992_36001[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33989 === (4))){
var inst_33968 = (state_33988[(7)]);
var inst_33968__$1 = (state_33988[(2)]);
var inst_33969 = (inst_33968__$1 == null);
var state_33988__$1 = (function (){var statearr_33993 = state_33988;
(statearr_33993[(7)] = inst_33968__$1);

return statearr_33993;
})();
if(cljs.core.truth_(inst_33969)){
var statearr_33994_36002 = state_33988__$1;
(statearr_33994_36002[(1)] = (5));

} else {
var statearr_33995_36003 = state_33988__$1;
(statearr_33995_36003[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33989 === (6))){
var inst_33973 = (state_33988[(8)]);
var inst_33968 = (state_33988[(7)]);
var inst_33973__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_33974 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_33976 = [inst_33968,inst_33973__$1];
var inst_33977 = (new cljs.core.PersistentVector(null,2,(5),inst_33974,inst_33976,null));
var state_33988__$1 = (function (){var statearr_33996 = state_33988;
(statearr_33996[(8)] = inst_33973__$1);

return statearr_33996;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33988__$1,(8),jobs,inst_33977);
} else {
if((state_val_33989 === (3))){
var inst_33986 = (state_33988[(2)]);
var state_33988__$1 = state_33988;
return cljs.core.async.impl.ioc_helpers.return_chan(state_33988__$1,inst_33986);
} else {
if((state_val_33989 === (2))){
var state_33988__$1 = state_33988;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_33988__$1,(4),from);
} else {
if((state_val_33989 === (9))){
var inst_33981 = (state_33988[(2)]);
var state_33988__$1 = (function (){var statearr_33997 = state_33988;
(statearr_33997[(9)] = inst_33981);

return statearr_33997;
})();
var statearr_33998_36009 = state_33988__$1;
(statearr_33998_36009[(2)] = null);

(statearr_33998_36009[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33989 === (5))){
var inst_33971 = cljs.core.async.close_BANG_(jobs);
var state_33988__$1 = state_33988;
var statearr_33999_36010 = state_33988__$1;
(statearr_33999_36010[(2)] = inst_33971);

(statearr_33999_36010[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33989 === (8))){
var inst_33973 = (state_33988[(8)]);
var inst_33979 = (state_33988[(2)]);
var state_33988__$1 = (function (){var statearr_34001 = state_33988;
(statearr_34001[(10)] = inst_33979);

return statearr_34001;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_33988__$1,(9),results,inst_33973);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0 = (function (){
var statearr_34002 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_34002[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__);

(statearr_34002[(1)] = (1));

return statearr_34002;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1 = (function (state_33988){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_33988);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e34003){var ex__33265__auto__ = e34003;
var statearr_34004_36011 = state_33988;
(statearr_34004_36011[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_33988[(4)]))){
var statearr_34005_36012 = state_33988;
(statearr_34005_36012[(1)] = cljs.core.first((state_33988[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36013 = state_33988;
state_33988 = G__36013;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = function(state_33988){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1.call(this,state_33988);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_34006 = f__33629__auto__();
(statearr_34006[(6)] = c__33628__auto___35997);

return statearr_34006;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


var c__33628__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_34045){
var state_val_34046 = (state_34045[(1)]);
if((state_val_34046 === (7))){
var inst_34041 = (state_34045[(2)]);
var state_34045__$1 = state_34045;
var statearr_34048_36015 = state_34045__$1;
(statearr_34048_36015[(2)] = inst_34041);

(statearr_34048_36015[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (20))){
var state_34045__$1 = state_34045;
var statearr_34049_36017 = state_34045__$1;
(statearr_34049_36017[(2)] = null);

(statearr_34049_36017[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (1))){
var state_34045__$1 = state_34045;
var statearr_34050_36018 = state_34045__$1;
(statearr_34050_36018[(2)] = null);

(statearr_34050_36018[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (4))){
var inst_34010 = (state_34045[(7)]);
var inst_34010__$1 = (state_34045[(2)]);
var inst_34011 = (inst_34010__$1 == null);
var state_34045__$1 = (function (){var statearr_34051 = state_34045;
(statearr_34051[(7)] = inst_34010__$1);

return statearr_34051;
})();
if(cljs.core.truth_(inst_34011)){
var statearr_34052_36019 = state_34045__$1;
(statearr_34052_36019[(1)] = (5));

} else {
var statearr_34053_36020 = state_34045__$1;
(statearr_34053_36020[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (15))){
var inst_34023 = (state_34045[(8)]);
var state_34045__$1 = state_34045;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34045__$1,(18),to,inst_34023);
} else {
if((state_val_34046 === (21))){
var inst_34036 = (state_34045[(2)]);
var state_34045__$1 = state_34045;
var statearr_34054_36021 = state_34045__$1;
(statearr_34054_36021[(2)] = inst_34036);

(statearr_34054_36021[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (13))){
var inst_34038 = (state_34045[(2)]);
var state_34045__$1 = (function (){var statearr_34056 = state_34045;
(statearr_34056[(9)] = inst_34038);

return statearr_34056;
})();
var statearr_34057_36022 = state_34045__$1;
(statearr_34057_36022[(2)] = null);

(statearr_34057_36022[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (6))){
var inst_34010 = (state_34045[(7)]);
var state_34045__$1 = state_34045;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34045__$1,(11),inst_34010);
} else {
if((state_val_34046 === (17))){
var inst_34031 = (state_34045[(2)]);
var state_34045__$1 = state_34045;
if(cljs.core.truth_(inst_34031)){
var statearr_34058_36024 = state_34045__$1;
(statearr_34058_36024[(1)] = (19));

} else {
var statearr_34059_36025 = state_34045__$1;
(statearr_34059_36025[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (3))){
var inst_34043 = (state_34045[(2)]);
var state_34045__$1 = state_34045;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34045__$1,inst_34043);
} else {
if((state_val_34046 === (12))){
var inst_34020 = (state_34045[(10)]);
var state_34045__$1 = state_34045;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34045__$1,(14),inst_34020);
} else {
if((state_val_34046 === (2))){
var state_34045__$1 = state_34045;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34045__$1,(4),results);
} else {
if((state_val_34046 === (19))){
var state_34045__$1 = state_34045;
var statearr_34060_36029 = state_34045__$1;
(statearr_34060_36029[(2)] = null);

(statearr_34060_36029[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (11))){
var inst_34020 = (state_34045[(2)]);
var state_34045__$1 = (function (){var statearr_34062 = state_34045;
(statearr_34062[(10)] = inst_34020);

return statearr_34062;
})();
var statearr_34063_36030 = state_34045__$1;
(statearr_34063_36030[(2)] = null);

(statearr_34063_36030[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (9))){
var state_34045__$1 = state_34045;
var statearr_34064_36031 = state_34045__$1;
(statearr_34064_36031[(2)] = null);

(statearr_34064_36031[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (5))){
var state_34045__$1 = state_34045;
if(cljs.core.truth_(close_QMARK_)){
var statearr_34065_36033 = state_34045__$1;
(statearr_34065_36033[(1)] = (8));

} else {
var statearr_34066_36034 = state_34045__$1;
(statearr_34066_36034[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (14))){
var inst_34023 = (state_34045[(8)]);
var inst_34025 = (state_34045[(11)]);
var inst_34023__$1 = (state_34045[(2)]);
var inst_34024 = (inst_34023__$1 == null);
var inst_34025__$1 = cljs.core.not(inst_34024);
var state_34045__$1 = (function (){var statearr_34067 = state_34045;
(statearr_34067[(8)] = inst_34023__$1);

(statearr_34067[(11)] = inst_34025__$1);

return statearr_34067;
})();
if(inst_34025__$1){
var statearr_34068_36035 = state_34045__$1;
(statearr_34068_36035[(1)] = (15));

} else {
var statearr_34069_36036 = state_34045__$1;
(statearr_34069_36036[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (16))){
var inst_34025 = (state_34045[(11)]);
var state_34045__$1 = state_34045;
var statearr_34070_36037 = state_34045__$1;
(statearr_34070_36037[(2)] = inst_34025);

(statearr_34070_36037[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (10))){
var inst_34017 = (state_34045[(2)]);
var state_34045__$1 = state_34045;
var statearr_34072_36038 = state_34045__$1;
(statearr_34072_36038[(2)] = inst_34017);

(statearr_34072_36038[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (18))){
var inst_34028 = (state_34045[(2)]);
var state_34045__$1 = state_34045;
var statearr_34073_36039 = state_34045__$1;
(statearr_34073_36039[(2)] = inst_34028);

(statearr_34073_36039[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34046 === (8))){
var inst_34014 = cljs.core.async.close_BANG_(to);
var state_34045__$1 = state_34045;
var statearr_34074_36040 = state_34045__$1;
(statearr_34074_36040[(2)] = inst_34014);

(statearr_34074_36040[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0 = (function (){
var statearr_34075 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34075[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__);

(statearr_34075[(1)] = (1));

return statearr_34075;
});
var cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1 = (function (state_34045){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_34045);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e34076){var ex__33265__auto__ = e34076;
var statearr_34077_36045 = state_34045;
(statearr_34077_36045[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_34045[(4)]))){
var statearr_34078_36046 = state_34045;
(statearr_34078_36046[(1)] = cljs.core.first((state_34045[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36050 = state_34045;
state_34045 = G__36050;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__ = function(state_34045){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1.call(this,state_34045);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__33262__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_34080 = f__33629__auto__();
(statearr_34080[(6)] = c__33628__auto__);

return statearr_34080;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));

return c__33628__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__34082 = arguments.length;
switch (G__34082) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__34085 = arguments.length;
switch (G__34085) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__34088 = arguments.length;
switch (G__34088) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__33628__auto___36061 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_34115){
var state_val_34116 = (state_34115[(1)]);
if((state_val_34116 === (7))){
var inst_34111 = (state_34115[(2)]);
var state_34115__$1 = state_34115;
var statearr_34117_36062 = state_34115__$1;
(statearr_34117_36062[(2)] = inst_34111);

(statearr_34117_36062[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (1))){
var state_34115__$1 = state_34115;
var statearr_34119_36063 = state_34115__$1;
(statearr_34119_36063[(2)] = null);

(statearr_34119_36063[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (4))){
var inst_34092 = (state_34115[(7)]);
var inst_34092__$1 = (state_34115[(2)]);
var inst_34093 = (inst_34092__$1 == null);
var state_34115__$1 = (function (){var statearr_34120 = state_34115;
(statearr_34120[(7)] = inst_34092__$1);

return statearr_34120;
})();
if(cljs.core.truth_(inst_34093)){
var statearr_34121_36064 = state_34115__$1;
(statearr_34121_36064[(1)] = (5));

} else {
var statearr_34122_36065 = state_34115__$1;
(statearr_34122_36065[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (13))){
var state_34115__$1 = state_34115;
var statearr_34123_36066 = state_34115__$1;
(statearr_34123_36066[(2)] = null);

(statearr_34123_36066[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (6))){
var inst_34092 = (state_34115[(7)]);
var inst_34098 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_34092) : p.call(null,inst_34092));
var state_34115__$1 = state_34115;
if(cljs.core.truth_(inst_34098)){
var statearr_34124_36067 = state_34115__$1;
(statearr_34124_36067[(1)] = (9));

} else {
var statearr_34125_36068 = state_34115__$1;
(statearr_34125_36068[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (3))){
var inst_34113 = (state_34115[(2)]);
var state_34115__$1 = state_34115;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34115__$1,inst_34113);
} else {
if((state_val_34116 === (12))){
var state_34115__$1 = state_34115;
var statearr_34126_36069 = state_34115__$1;
(statearr_34126_36069[(2)] = null);

(statearr_34126_36069[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (2))){
var state_34115__$1 = state_34115;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34115__$1,(4),ch);
} else {
if((state_val_34116 === (11))){
var inst_34092 = (state_34115[(7)]);
var inst_34102 = (state_34115[(2)]);
var state_34115__$1 = state_34115;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34115__$1,(8),inst_34102,inst_34092);
} else {
if((state_val_34116 === (9))){
var state_34115__$1 = state_34115;
var statearr_34128_36070 = state_34115__$1;
(statearr_34128_36070[(2)] = tc);

(statearr_34128_36070[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (5))){
var inst_34095 = cljs.core.async.close_BANG_(tc);
var inst_34096 = cljs.core.async.close_BANG_(fc);
var state_34115__$1 = (function (){var statearr_34129 = state_34115;
(statearr_34129[(8)] = inst_34095);

return statearr_34129;
})();
var statearr_34130_36072 = state_34115__$1;
(statearr_34130_36072[(2)] = inst_34096);

(statearr_34130_36072[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (14))){
var inst_34109 = (state_34115[(2)]);
var state_34115__$1 = state_34115;
var statearr_34131_36077 = state_34115__$1;
(statearr_34131_36077[(2)] = inst_34109);

(statearr_34131_36077[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (10))){
var state_34115__$1 = state_34115;
var statearr_34132_36078 = state_34115__$1;
(statearr_34132_36078[(2)] = fc);

(statearr_34132_36078[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34116 === (8))){
var inst_34104 = (state_34115[(2)]);
var state_34115__$1 = state_34115;
if(cljs.core.truth_(inst_34104)){
var statearr_34133_36079 = state_34115__$1;
(statearr_34133_36079[(1)] = (12));

} else {
var statearr_34134_36080 = state_34115__$1;
(statearr_34134_36080[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_34136 = [null,null,null,null,null,null,null,null,null];
(statearr_34136[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_34136[(1)] = (1));

return statearr_34136;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_34115){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_34115);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e34137){var ex__33265__auto__ = e34137;
var statearr_34138_36081 = state_34115;
(statearr_34138_36081[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_34115[(4)]))){
var statearr_34139_36082 = state_34115;
(statearr_34139_36082[(1)] = cljs.core.first((state_34115[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36083 = state_34115;
state_34115 = G__36083;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_34115){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_34115);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_34140 = f__33629__auto__();
(statearr_34140[(6)] = c__33628__auto___36061);

return statearr_34140;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__33628__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_34164){
var state_val_34165 = (state_34164[(1)]);
if((state_val_34165 === (7))){
var inst_34159 = (state_34164[(2)]);
var state_34164__$1 = state_34164;
var statearr_34166_36084 = state_34164__$1;
(statearr_34166_36084[(2)] = inst_34159);

(statearr_34166_36084[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34165 === (1))){
var inst_34142 = init;
var inst_34143 = inst_34142;
var state_34164__$1 = (function (){var statearr_34167 = state_34164;
(statearr_34167[(7)] = inst_34143);

return statearr_34167;
})();
var statearr_34168_36085 = state_34164__$1;
(statearr_34168_36085[(2)] = null);

(statearr_34168_36085[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34165 === (4))){
var inst_34146 = (state_34164[(8)]);
var inst_34146__$1 = (state_34164[(2)]);
var inst_34147 = (inst_34146__$1 == null);
var state_34164__$1 = (function (){var statearr_34169 = state_34164;
(statearr_34169[(8)] = inst_34146__$1);

return statearr_34169;
})();
if(cljs.core.truth_(inst_34147)){
var statearr_34171_36086 = state_34164__$1;
(statearr_34171_36086[(1)] = (5));

} else {
var statearr_34172_36087 = state_34164__$1;
(statearr_34172_36087[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34165 === (6))){
var inst_34146 = (state_34164[(8)]);
var inst_34150 = (state_34164[(9)]);
var inst_34143 = (state_34164[(7)]);
var inst_34150__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_34143,inst_34146) : f.call(null,inst_34143,inst_34146));
var inst_34151 = cljs.core.reduced_QMARK_(inst_34150__$1);
var state_34164__$1 = (function (){var statearr_34173 = state_34164;
(statearr_34173[(9)] = inst_34150__$1);

return statearr_34173;
})();
if(inst_34151){
var statearr_34174_36088 = state_34164__$1;
(statearr_34174_36088[(1)] = (8));

} else {
var statearr_34175_36089 = state_34164__$1;
(statearr_34175_36089[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34165 === (3))){
var inst_34161 = (state_34164[(2)]);
var state_34164__$1 = state_34164;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34164__$1,inst_34161);
} else {
if((state_val_34165 === (2))){
var state_34164__$1 = state_34164;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34164__$1,(4),ch);
} else {
if((state_val_34165 === (9))){
var inst_34150 = (state_34164[(9)]);
var inst_34143 = inst_34150;
var state_34164__$1 = (function (){var statearr_34176 = state_34164;
(statearr_34176[(7)] = inst_34143);

return statearr_34176;
})();
var statearr_34177_36094 = state_34164__$1;
(statearr_34177_36094[(2)] = null);

(statearr_34177_36094[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34165 === (5))){
var inst_34143 = (state_34164[(7)]);
var state_34164__$1 = state_34164;
var statearr_34179_36098 = state_34164__$1;
(statearr_34179_36098[(2)] = inst_34143);

(statearr_34179_36098[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34165 === (10))){
var inst_34157 = (state_34164[(2)]);
var state_34164__$1 = state_34164;
var statearr_34180_36099 = state_34164__$1;
(statearr_34180_36099[(2)] = inst_34157);

(statearr_34180_36099[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34165 === (8))){
var inst_34150 = (state_34164[(9)]);
var inst_34153 = cljs.core.deref(inst_34150);
var state_34164__$1 = state_34164;
var statearr_34181_36100 = state_34164__$1;
(statearr_34181_36100[(2)] = inst_34153);

(statearr_34181_36100[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__33262__auto__ = null;
var cljs$core$async$reduce_$_state_machine__33262__auto____0 = (function (){
var statearr_34182 = [null,null,null,null,null,null,null,null,null,null];
(statearr_34182[(0)] = cljs$core$async$reduce_$_state_machine__33262__auto__);

(statearr_34182[(1)] = (1));

return statearr_34182;
});
var cljs$core$async$reduce_$_state_machine__33262__auto____1 = (function (state_34164){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_34164);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e34183){var ex__33265__auto__ = e34183;
var statearr_34184_36101 = state_34164;
(statearr_34184_36101[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_34164[(4)]))){
var statearr_34185_36105 = state_34164;
(statearr_34185_36105[(1)] = cljs.core.first((state_34164[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36106 = state_34164;
state_34164 = G__36106;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__33262__auto__ = function(state_34164){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__33262__auto____1.call(this,state_34164);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__33262__auto____0;
cljs$core$async$reduce_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__33262__auto____1;
return cljs$core$async$reduce_$_state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_34187 = f__33629__auto__();
(statearr_34187[(6)] = c__33628__auto__);

return statearr_34187;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));

return c__33628__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__33628__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_34193){
var state_val_34194 = (state_34193[(1)]);
if((state_val_34194 === (1))){
var inst_34188 = cljs.core.async.reduce(f__$1,init,ch);
var state_34193__$1 = state_34193;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34193__$1,(2),inst_34188);
} else {
if((state_val_34194 === (2))){
var inst_34190 = (state_34193[(2)]);
var inst_34191 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_34190) : f__$1.call(null,inst_34190));
var state_34193__$1 = state_34193;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34193__$1,inst_34191);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__33262__auto__ = null;
var cljs$core$async$transduce_$_state_machine__33262__auto____0 = (function (){
var statearr_34196 = [null,null,null,null,null,null,null];
(statearr_34196[(0)] = cljs$core$async$transduce_$_state_machine__33262__auto__);

(statearr_34196[(1)] = (1));

return statearr_34196;
});
var cljs$core$async$transduce_$_state_machine__33262__auto____1 = (function (state_34193){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_34193);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e34197){var ex__33265__auto__ = e34197;
var statearr_34198_36110 = state_34193;
(statearr_34198_36110[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_34193[(4)]))){
var statearr_34199_36114 = state_34193;
(statearr_34199_36114[(1)] = cljs.core.first((state_34193[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36115 = state_34193;
state_34193 = G__36115;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__33262__auto__ = function(state_34193){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__33262__auto____1.call(this,state_34193);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__33262__auto____0;
cljs$core$async$transduce_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__33262__auto____1;
return cljs$core$async$transduce_$_state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_34200 = f__33629__auto__();
(statearr_34200[(6)] = c__33628__auto__);

return statearr_34200;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));

return c__33628__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__34203 = arguments.length;
switch (G__34203) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__33628__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_34229){
var state_val_34230 = (state_34229[(1)]);
if((state_val_34230 === (7))){
var inst_34211 = (state_34229[(2)]);
var state_34229__$1 = state_34229;
var statearr_34231_36120 = state_34229__$1;
(statearr_34231_36120[(2)] = inst_34211);

(statearr_34231_36120[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (1))){
var inst_34204 = cljs.core.seq(coll);
var inst_34205 = inst_34204;
var state_34229__$1 = (function (){var statearr_34233 = state_34229;
(statearr_34233[(7)] = inst_34205);

return statearr_34233;
})();
var statearr_34235_36122 = state_34229__$1;
(statearr_34235_36122[(2)] = null);

(statearr_34235_36122[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (4))){
var inst_34205 = (state_34229[(7)]);
var inst_34209 = cljs.core.first(inst_34205);
var state_34229__$1 = state_34229;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34229__$1,(7),ch,inst_34209);
} else {
if((state_val_34230 === (13))){
var inst_34223 = (state_34229[(2)]);
var state_34229__$1 = state_34229;
var statearr_34236_36126 = state_34229__$1;
(statearr_34236_36126[(2)] = inst_34223);

(statearr_34236_36126[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (6))){
var inst_34214 = (state_34229[(2)]);
var state_34229__$1 = state_34229;
if(cljs.core.truth_(inst_34214)){
var statearr_34237_36127 = state_34229__$1;
(statearr_34237_36127[(1)] = (8));

} else {
var statearr_34238_36128 = state_34229__$1;
(statearr_34238_36128[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (3))){
var inst_34227 = (state_34229[(2)]);
var state_34229__$1 = state_34229;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34229__$1,inst_34227);
} else {
if((state_val_34230 === (12))){
var state_34229__$1 = state_34229;
var statearr_34239_36129 = state_34229__$1;
(statearr_34239_36129[(2)] = null);

(statearr_34239_36129[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (2))){
var inst_34205 = (state_34229[(7)]);
var state_34229__$1 = state_34229;
if(cljs.core.truth_(inst_34205)){
var statearr_34240_36130 = state_34229__$1;
(statearr_34240_36130[(1)] = (4));

} else {
var statearr_34241_36131 = state_34229__$1;
(statearr_34241_36131[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (11))){
var inst_34220 = cljs.core.async.close_BANG_(ch);
var state_34229__$1 = state_34229;
var statearr_34242_36135 = state_34229__$1;
(statearr_34242_36135[(2)] = inst_34220);

(statearr_34242_36135[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (9))){
var state_34229__$1 = state_34229;
if(cljs.core.truth_(close_QMARK_)){
var statearr_34243_36136 = state_34229__$1;
(statearr_34243_36136[(1)] = (11));

} else {
var statearr_34245_36137 = state_34229__$1;
(statearr_34245_36137[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (5))){
var inst_34205 = (state_34229[(7)]);
var state_34229__$1 = state_34229;
var statearr_34247_36138 = state_34229__$1;
(statearr_34247_36138[(2)] = inst_34205);

(statearr_34247_36138[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (10))){
var inst_34225 = (state_34229[(2)]);
var state_34229__$1 = state_34229;
var statearr_34248_36139 = state_34229__$1;
(statearr_34248_36139[(2)] = inst_34225);

(statearr_34248_36139[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34230 === (8))){
var inst_34205 = (state_34229[(7)]);
var inst_34216 = cljs.core.next(inst_34205);
var inst_34205__$1 = inst_34216;
var state_34229__$1 = (function (){var statearr_34249 = state_34229;
(statearr_34249[(7)] = inst_34205__$1);

return statearr_34249;
})();
var statearr_34250_36143 = state_34229__$1;
(statearr_34250_36143[(2)] = null);

(statearr_34250_36143[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_34251 = [null,null,null,null,null,null,null,null];
(statearr_34251[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_34251[(1)] = (1));

return statearr_34251;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_34229){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_34229);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e34252){var ex__33265__auto__ = e34252;
var statearr_34253_36144 = state_34229;
(statearr_34253_36144[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_34229[(4)]))){
var statearr_34254_36145 = state_34229;
(statearr_34254_36145[(1)] = cljs.core.first((state_34229[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36149 = state_34229;
state_34229 = G__36149;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_34229){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_34229);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_34255 = f__33629__auto__();
(statearr_34255[(6)] = c__33628__auto__);

return statearr_34255;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));

return c__33628__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__34257 = arguments.length;
switch (G__34257) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_36151 = (function (_){
var x__5393__auto__ = (((_ == null))?null:_);
var m__5394__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5394__auto__.call(null,_));
} else {
var m__5392__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5392__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_36151(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_36153 = (function (m,ch,close_QMARK_){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5394__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5392__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_36153(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_36154 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_36154(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_36156 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_36156(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34260 = (function (ch,cs,meta34261){
this.ch = ch;
this.cs = cs;
this.meta34261 = meta34261;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async34260.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34262,meta34261__$1){
var self__ = this;
var _34262__$1 = this;
return (new cljs.core.async.t_cljs$core$async34260(self__.ch,self__.cs,meta34261__$1));
}));

(cljs.core.async.t_cljs$core$async34260.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34262){
var self__ = this;
var _34262__$1 = this;
return self__.meta34261;
}));

(cljs.core.async.t_cljs$core$async34260.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async34260.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async34260.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async34260.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async34260.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async34260.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async34260.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta34261","meta34261",880662366,null)], null);
}));

(cljs.core.async.t_cljs$core$async34260.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async34260.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34260");

(cljs.core.async.t_cljs$core$async34260.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async34260");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async34260.
 */
cljs.core.async.__GT_t_cljs$core$async34260 = (function cljs$core$async$__GT_t_cljs$core$async34260(ch,cs,meta34261){
return (new cljs.core.async.t_cljs$core$async34260(ch,cs,meta34261));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async34260(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__33628__auto___36160 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_34436){
var state_val_34437 = (state_34436[(1)]);
if((state_val_34437 === (7))){
var inst_34428 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34445_36161 = state_34436__$1;
(statearr_34445_36161[(2)] = inst_34428);

(statearr_34445_36161[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (20))){
var inst_34313 = (state_34436[(7)]);
var inst_34329 = cljs.core.first(inst_34313);
var inst_34330 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_34329,(0),null);
var inst_34331 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_34329,(1),null);
var state_34436__$1 = (function (){var statearr_34448 = state_34436;
(statearr_34448[(8)] = inst_34330);

return statearr_34448;
})();
if(cljs.core.truth_(inst_34331)){
var statearr_34449_36162 = state_34436__$1;
(statearr_34449_36162[(1)] = (22));

} else {
var statearr_34452_36163 = state_34436__$1;
(statearr_34452_36163[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (27))){
var inst_34275 = (state_34436[(9)]);
var inst_34372 = (state_34436[(10)]);
var inst_34365 = (state_34436[(11)]);
var inst_34363 = (state_34436[(12)]);
var inst_34372__$1 = cljs.core._nth(inst_34363,inst_34365);
var inst_34374 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_34372__$1,inst_34275,done);
var state_34436__$1 = (function (){var statearr_34455 = state_34436;
(statearr_34455[(10)] = inst_34372__$1);

return statearr_34455;
})();
if(cljs.core.truth_(inst_34374)){
var statearr_34459_36164 = state_34436__$1;
(statearr_34459_36164[(1)] = (30));

} else {
var statearr_34460_36165 = state_34436__$1;
(statearr_34460_36165[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (1))){
var state_34436__$1 = state_34436;
var statearr_34462_36166 = state_34436__$1;
(statearr_34462_36166[(2)] = null);

(statearr_34462_36166[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (24))){
var inst_34313 = (state_34436[(7)]);
var inst_34337 = (state_34436[(2)]);
var inst_34338 = cljs.core.next(inst_34313);
var inst_34286 = inst_34338;
var inst_34287 = null;
var inst_34288 = (0);
var inst_34289 = (0);
var state_34436__$1 = (function (){var statearr_34467 = state_34436;
(statearr_34467[(13)] = inst_34337);

(statearr_34467[(14)] = inst_34286);

(statearr_34467[(15)] = inst_34287);

(statearr_34467[(16)] = inst_34289);

(statearr_34467[(17)] = inst_34288);

return statearr_34467;
})();
var statearr_34469_36170 = state_34436__$1;
(statearr_34469_36170[(2)] = null);

(statearr_34469_36170[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (39))){
var state_34436__$1 = state_34436;
var statearr_34482_36171 = state_34436__$1;
(statearr_34482_36171[(2)] = null);

(statearr_34482_36171[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (4))){
var inst_34275 = (state_34436[(9)]);
var inst_34275__$1 = (state_34436[(2)]);
var inst_34276 = (inst_34275__$1 == null);
var state_34436__$1 = (function (){var statearr_34484 = state_34436;
(statearr_34484[(9)] = inst_34275__$1);

return statearr_34484;
})();
if(cljs.core.truth_(inst_34276)){
var statearr_34487_36172 = state_34436__$1;
(statearr_34487_36172[(1)] = (5));

} else {
var statearr_34489_36173 = state_34436__$1;
(statearr_34489_36173[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (15))){
var inst_34286 = (state_34436[(14)]);
var inst_34287 = (state_34436[(15)]);
var inst_34289 = (state_34436[(16)]);
var inst_34288 = (state_34436[(17)]);
var inst_34308 = (state_34436[(2)]);
var inst_34310 = (inst_34289 + (1));
var tmp34474 = inst_34286;
var tmp34475 = inst_34287;
var tmp34476 = inst_34288;
var inst_34286__$1 = tmp34474;
var inst_34287__$1 = tmp34475;
var inst_34288__$1 = tmp34476;
var inst_34289__$1 = inst_34310;
var state_34436__$1 = (function (){var statearr_34491 = state_34436;
(statearr_34491[(18)] = inst_34308);

(statearr_34491[(14)] = inst_34286__$1);

(statearr_34491[(15)] = inst_34287__$1);

(statearr_34491[(16)] = inst_34289__$1);

(statearr_34491[(17)] = inst_34288__$1);

return statearr_34491;
})();
var statearr_34494_36174 = state_34436__$1;
(statearr_34494_36174[(2)] = null);

(statearr_34494_36174[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (21))){
var inst_34341 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34499_36175 = state_34436__$1;
(statearr_34499_36175[(2)] = inst_34341);

(statearr_34499_36175[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (31))){
var inst_34372 = (state_34436[(10)]);
var inst_34379 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_34372);
var state_34436__$1 = state_34436;
var statearr_34502_36176 = state_34436__$1;
(statearr_34502_36176[(2)] = inst_34379);

(statearr_34502_36176[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (32))){
var inst_34362 = (state_34436[(19)]);
var inst_34364 = (state_34436[(20)]);
var inst_34365 = (state_34436[(11)]);
var inst_34363 = (state_34436[(12)]);
var inst_34381 = (state_34436[(2)]);
var inst_34382 = (inst_34365 + (1));
var tmp34496 = inst_34362;
var tmp34497 = inst_34364;
var tmp34498 = inst_34363;
var inst_34362__$1 = tmp34496;
var inst_34363__$1 = tmp34498;
var inst_34364__$1 = tmp34497;
var inst_34365__$1 = inst_34382;
var state_34436__$1 = (function (){var statearr_34506 = state_34436;
(statearr_34506[(19)] = inst_34362__$1);

(statearr_34506[(20)] = inst_34364__$1);

(statearr_34506[(21)] = inst_34381);

(statearr_34506[(11)] = inst_34365__$1);

(statearr_34506[(12)] = inst_34363__$1);

return statearr_34506;
})();
var statearr_34508_36177 = state_34436__$1;
(statearr_34508_36177[(2)] = null);

(statearr_34508_36177[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (40))){
var inst_34398 = (state_34436[(22)]);
var inst_34402 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_34398);
var state_34436__$1 = state_34436;
var statearr_34512_36178 = state_34436__$1;
(statearr_34512_36178[(2)] = inst_34402);

(statearr_34512_36178[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (33))){
var inst_34387 = (state_34436[(23)]);
var inst_34390 = cljs.core.chunked_seq_QMARK_(inst_34387);
var state_34436__$1 = state_34436;
if(inst_34390){
var statearr_34514_36181 = state_34436__$1;
(statearr_34514_36181[(1)] = (36));

} else {
var statearr_34517_36182 = state_34436__$1;
(statearr_34517_36182[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (13))){
var inst_34300 = (state_34436[(24)]);
var inst_34304 = cljs.core.async.close_BANG_(inst_34300);
var state_34436__$1 = state_34436;
var statearr_34523_36183 = state_34436__$1;
(statearr_34523_36183[(2)] = inst_34304);

(statearr_34523_36183[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (22))){
var inst_34330 = (state_34436[(8)]);
var inst_34334 = cljs.core.async.close_BANG_(inst_34330);
var state_34436__$1 = state_34436;
var statearr_34526_36187 = state_34436__$1;
(statearr_34526_36187[(2)] = inst_34334);

(statearr_34526_36187[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (36))){
var inst_34387 = (state_34436[(23)]);
var inst_34392 = cljs.core.chunk_first(inst_34387);
var inst_34393 = cljs.core.chunk_rest(inst_34387);
var inst_34394 = cljs.core.count(inst_34392);
var inst_34362 = inst_34393;
var inst_34363 = inst_34392;
var inst_34364 = inst_34394;
var inst_34365 = (0);
var state_34436__$1 = (function (){var statearr_34529 = state_34436;
(statearr_34529[(19)] = inst_34362);

(statearr_34529[(20)] = inst_34364);

(statearr_34529[(11)] = inst_34365);

(statearr_34529[(12)] = inst_34363);

return statearr_34529;
})();
var statearr_34530_36189 = state_34436__$1;
(statearr_34530_36189[(2)] = null);

(statearr_34530_36189[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (41))){
var inst_34387 = (state_34436[(23)]);
var inst_34405 = (state_34436[(2)]);
var inst_34407 = cljs.core.next(inst_34387);
var inst_34362 = inst_34407;
var inst_34363 = null;
var inst_34364 = (0);
var inst_34365 = (0);
var state_34436__$1 = (function (){var statearr_34534 = state_34436;
(statearr_34534[(19)] = inst_34362);

(statearr_34534[(20)] = inst_34364);

(statearr_34534[(25)] = inst_34405);

(statearr_34534[(11)] = inst_34365);

(statearr_34534[(12)] = inst_34363);

return statearr_34534;
})();
var statearr_34536_36190 = state_34436__$1;
(statearr_34536_36190[(2)] = null);

(statearr_34536_36190[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (43))){
var state_34436__$1 = state_34436;
var statearr_34538_36192 = state_34436__$1;
(statearr_34538_36192[(2)] = null);

(statearr_34538_36192[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (29))){
var inst_34416 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34541_36193 = state_34436__$1;
(statearr_34541_36193[(2)] = inst_34416);

(statearr_34541_36193[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (44))){
var inst_34425 = (state_34436[(2)]);
var state_34436__$1 = (function (){var statearr_34544 = state_34436;
(statearr_34544[(26)] = inst_34425);

return statearr_34544;
})();
var statearr_34546_36195 = state_34436__$1;
(statearr_34546_36195[(2)] = null);

(statearr_34546_36195[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (6))){
var inst_34354 = (state_34436[(27)]);
var inst_34353 = cljs.core.deref(cs);
var inst_34354__$1 = cljs.core.keys(inst_34353);
var inst_34355 = cljs.core.count(inst_34354__$1);
var inst_34356 = cljs.core.reset_BANG_(dctr,inst_34355);
var inst_34361 = cljs.core.seq(inst_34354__$1);
var inst_34362 = inst_34361;
var inst_34363 = null;
var inst_34364 = (0);
var inst_34365 = (0);
var state_34436__$1 = (function (){var statearr_34551 = state_34436;
(statearr_34551[(19)] = inst_34362);

(statearr_34551[(20)] = inst_34364);

(statearr_34551[(28)] = inst_34356);

(statearr_34551[(27)] = inst_34354__$1);

(statearr_34551[(11)] = inst_34365);

(statearr_34551[(12)] = inst_34363);

return statearr_34551;
})();
var statearr_34552_36196 = state_34436__$1;
(statearr_34552_36196[(2)] = null);

(statearr_34552_36196[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (28))){
var inst_34362 = (state_34436[(19)]);
var inst_34387 = (state_34436[(23)]);
var inst_34387__$1 = cljs.core.seq(inst_34362);
var state_34436__$1 = (function (){var statearr_34556 = state_34436;
(statearr_34556[(23)] = inst_34387__$1);

return statearr_34556;
})();
if(inst_34387__$1){
var statearr_34557_36197 = state_34436__$1;
(statearr_34557_36197[(1)] = (33));

} else {
var statearr_34559_36198 = state_34436__$1;
(statearr_34559_36198[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (25))){
var inst_34364 = (state_34436[(20)]);
var inst_34365 = (state_34436[(11)]);
var inst_34368 = (inst_34365 < inst_34364);
var inst_34369 = inst_34368;
var state_34436__$1 = state_34436;
if(cljs.core.truth_(inst_34369)){
var statearr_34562_36200 = state_34436__$1;
(statearr_34562_36200[(1)] = (27));

} else {
var statearr_34564_36201 = state_34436__$1;
(statearr_34564_36201[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (34))){
var state_34436__$1 = state_34436;
var statearr_34565_36202 = state_34436__$1;
(statearr_34565_36202[(2)] = null);

(statearr_34565_36202[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (17))){
var state_34436__$1 = state_34436;
var statearr_34567_36203 = state_34436__$1;
(statearr_34567_36203[(2)] = null);

(statearr_34567_36203[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (3))){
var inst_34430 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34436__$1,inst_34430);
} else {
if((state_val_34437 === (12))){
var inst_34348 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34571_36204 = state_34436__$1;
(statearr_34571_36204[(2)] = inst_34348);

(statearr_34571_36204[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (2))){
var state_34436__$1 = state_34436;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34436__$1,(4),ch);
} else {
if((state_val_34437 === (23))){
var state_34436__$1 = state_34436;
var statearr_34575_36205 = state_34436__$1;
(statearr_34575_36205[(2)] = null);

(statearr_34575_36205[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (35))){
var inst_34414 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34577_36206 = state_34436__$1;
(statearr_34577_36206[(2)] = inst_34414);

(statearr_34577_36206[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (19))){
var inst_34313 = (state_34436[(7)]);
var inst_34318 = cljs.core.chunk_first(inst_34313);
var inst_34319 = cljs.core.chunk_rest(inst_34313);
var inst_34322 = cljs.core.count(inst_34318);
var inst_34286 = inst_34319;
var inst_34287 = inst_34318;
var inst_34288 = inst_34322;
var inst_34289 = (0);
var state_34436__$1 = (function (){var statearr_34580 = state_34436;
(statearr_34580[(14)] = inst_34286);

(statearr_34580[(15)] = inst_34287);

(statearr_34580[(16)] = inst_34289);

(statearr_34580[(17)] = inst_34288);

return statearr_34580;
})();
var statearr_34583_36211 = state_34436__$1;
(statearr_34583_36211[(2)] = null);

(statearr_34583_36211[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (11))){
var inst_34286 = (state_34436[(14)]);
var inst_34313 = (state_34436[(7)]);
var inst_34313__$1 = cljs.core.seq(inst_34286);
var state_34436__$1 = (function (){var statearr_34585 = state_34436;
(statearr_34585[(7)] = inst_34313__$1);

return statearr_34585;
})();
if(inst_34313__$1){
var statearr_34586_36212 = state_34436__$1;
(statearr_34586_36212[(1)] = (16));

} else {
var statearr_34589_36213 = state_34436__$1;
(statearr_34589_36213[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (9))){
var inst_34350 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34591_36214 = state_34436__$1;
(statearr_34591_36214[(2)] = inst_34350);

(statearr_34591_36214[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (5))){
var inst_34283 = cljs.core.deref(cs);
var inst_34284 = cljs.core.seq(inst_34283);
var inst_34286 = inst_34284;
var inst_34287 = null;
var inst_34288 = (0);
var inst_34289 = (0);
var state_34436__$1 = (function (){var statearr_34593 = state_34436;
(statearr_34593[(14)] = inst_34286);

(statearr_34593[(15)] = inst_34287);

(statearr_34593[(16)] = inst_34289);

(statearr_34593[(17)] = inst_34288);

return statearr_34593;
})();
var statearr_34594_36217 = state_34436__$1;
(statearr_34594_36217[(2)] = null);

(statearr_34594_36217[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (14))){
var state_34436__$1 = state_34436;
var statearr_34595_36220 = state_34436__$1;
(statearr_34595_36220[(2)] = null);

(statearr_34595_36220[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (45))){
var inst_34422 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34599_36221 = state_34436__$1;
(statearr_34599_36221[(2)] = inst_34422);

(statearr_34599_36221[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (26))){
var inst_34354 = (state_34436[(27)]);
var inst_34418 = (state_34436[(2)]);
var inst_34419 = cljs.core.seq(inst_34354);
var state_34436__$1 = (function (){var statearr_34602 = state_34436;
(statearr_34602[(29)] = inst_34418);

return statearr_34602;
})();
if(inst_34419){
var statearr_34603_36226 = state_34436__$1;
(statearr_34603_36226[(1)] = (42));

} else {
var statearr_34605_36227 = state_34436__$1;
(statearr_34605_36227[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (16))){
var inst_34313 = (state_34436[(7)]);
var inst_34316 = cljs.core.chunked_seq_QMARK_(inst_34313);
var state_34436__$1 = state_34436;
if(inst_34316){
var statearr_34606_36228 = state_34436__$1;
(statearr_34606_36228[(1)] = (19));

} else {
var statearr_34608_36232 = state_34436__$1;
(statearr_34608_36232[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (38))){
var inst_34410 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34611_36233 = state_34436__$1;
(statearr_34611_36233[(2)] = inst_34410);

(statearr_34611_36233[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (30))){
var state_34436__$1 = state_34436;
var statearr_34613_36238 = state_34436__$1;
(statearr_34613_36238[(2)] = null);

(statearr_34613_36238[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (10))){
var inst_34287 = (state_34436[(15)]);
var inst_34289 = (state_34436[(16)]);
var inst_34299 = cljs.core._nth(inst_34287,inst_34289);
var inst_34300 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_34299,(0),null);
var inst_34301 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_34299,(1),null);
var state_34436__$1 = (function (){var statearr_34616 = state_34436;
(statearr_34616[(24)] = inst_34300);

return statearr_34616;
})();
if(cljs.core.truth_(inst_34301)){
var statearr_34618_36243 = state_34436__$1;
(statearr_34618_36243[(1)] = (13));

} else {
var statearr_34619_36250 = state_34436__$1;
(statearr_34619_36250[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (18))){
var inst_34345 = (state_34436[(2)]);
var state_34436__$1 = state_34436;
var statearr_34621_36251 = state_34436__$1;
(statearr_34621_36251[(2)] = inst_34345);

(statearr_34621_36251[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (42))){
var state_34436__$1 = state_34436;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34436__$1,(45),dchan);
} else {
if((state_val_34437 === (37))){
var inst_34275 = (state_34436[(9)]);
var inst_34398 = (state_34436[(22)]);
var inst_34387 = (state_34436[(23)]);
var inst_34398__$1 = cljs.core.first(inst_34387);
var inst_34399 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_34398__$1,inst_34275,done);
var state_34436__$1 = (function (){var statearr_34625 = state_34436;
(statearr_34625[(22)] = inst_34398__$1);

return statearr_34625;
})();
if(cljs.core.truth_(inst_34399)){
var statearr_34626_36252 = state_34436__$1;
(statearr_34626_36252[(1)] = (39));

} else {
var statearr_34628_36253 = state_34436__$1;
(statearr_34628_36253[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34437 === (8))){
var inst_34289 = (state_34436[(16)]);
var inst_34288 = (state_34436[(17)]);
var inst_34292 = (inst_34289 < inst_34288);
var inst_34293 = inst_34292;
var state_34436__$1 = state_34436;
if(cljs.core.truth_(inst_34293)){
var statearr_34630_36254 = state_34436__$1;
(statearr_34630_36254[(1)] = (10));

} else {
var statearr_34632_36255 = state_34436__$1;
(statearr_34632_36255[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__33262__auto__ = null;
var cljs$core$async$mult_$_state_machine__33262__auto____0 = (function (){
var statearr_34637 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34637[(0)] = cljs$core$async$mult_$_state_machine__33262__auto__);

(statearr_34637[(1)] = (1));

return statearr_34637;
});
var cljs$core$async$mult_$_state_machine__33262__auto____1 = (function (state_34436){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_34436);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e34639){var ex__33265__auto__ = e34639;
var statearr_34640_36256 = state_34436;
(statearr_34640_36256[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_34436[(4)]))){
var statearr_34642_36257 = state_34436;
(statearr_34642_36257[(1)] = cljs.core.first((state_34436[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36258 = state_34436;
state_34436 = G__36258;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__33262__auto__ = function(state_34436){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__33262__auto____1.call(this,state_34436);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__33262__auto____0;
cljs$core$async$mult_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__33262__auto____1;
return cljs$core$async$mult_$_state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_34646 = f__33629__auto__();
(statearr_34646[(6)] = c__33628__auto___36160);

return statearr_34646;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__34652 = arguments.length;
switch (G__34652) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_36260 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_36260(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_36261 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_36261(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_36268 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_36268(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_36269 = (function (m,state_map){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5394__auto__.call(null,m,state_map));
} else {
var m__5392__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5392__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_36269(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_36270 = (function (m,mode){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5394__auto__.call(null,m,mode));
} else {
var m__5392__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5392__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_36270(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___36273 = arguments.length;
var i__5770__auto___36274 = (0);
while(true){
if((i__5770__auto___36274 < len__5769__auto___36273)){
args__5775__auto__.push((arguments[i__5770__auto___36274]));

var G__36275 = (i__5770__auto___36274 + (1));
i__5770__auto___36274 = G__36275;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((3) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5776__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__34703){
var map__34704 = p__34703;
var map__34704__$1 = cljs.core.__destructure_map(map__34704);
var opts = map__34704__$1;
var statearr_34705_36276 = state;
(statearr_34705_36276[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_34707_36277 = state;
(statearr_34707_36277[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_34708_36278 = state;
(statearr_34708_36278[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq34695){
var G__34696 = cljs.core.first(seq34695);
var seq34695__$1 = cljs.core.next(seq34695);
var G__34697 = cljs.core.first(seq34695__$1);
var seq34695__$2 = cljs.core.next(seq34695__$1);
var G__34698 = cljs.core.first(seq34695__$2);
var seq34695__$3 = cljs.core.next(seq34695__$2);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__34696,G__34697,G__34698,seq34695__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34728 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta34729){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta34729 = meta34729;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34730,meta34729__$1){
var self__ = this;
var _34730__$1 = this;
return (new cljs.core.async.t_cljs$core$async34728(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta34729__$1));
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34730){
var self__ = this;
var _34730__$1 = this;
return self__.meta34729;
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async34728.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async34728.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta34729","meta34729",2084087100,null)], null);
}));

(cljs.core.async.t_cljs$core$async34728.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async34728.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34728");

(cljs.core.async.t_cljs$core$async34728.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async34728");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async34728.
 */
cljs.core.async.__GT_t_cljs$core$async34728 = (function cljs$core$async$__GT_t_cljs$core$async34728(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta34729){
return (new cljs.core.async.t_cljs$core$async34728(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta34729));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async34728(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__33628__auto___36285 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_34832){
var state_val_34833 = (state_34832[(1)]);
if((state_val_34833 === (7))){
var inst_34781 = (state_34832[(2)]);
var state_34832__$1 = state_34832;
if(cljs.core.truth_(inst_34781)){
var statearr_34839_36286 = state_34832__$1;
(statearr_34839_36286[(1)] = (8));

} else {
var statearr_34840_36293 = state_34832__$1;
(statearr_34840_36293[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (20))){
var inst_34774 = (state_34832[(7)]);
var state_34832__$1 = state_34832;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34832__$1,(23),out,inst_34774);
} else {
if((state_val_34833 === (1))){
var inst_34756 = calc_state();
var inst_34757 = cljs.core.__destructure_map(inst_34756);
var inst_34758 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_34757,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_34759 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_34757,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_34760 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_34757,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_34761 = inst_34756;
var state_34832__$1 = (function (){var statearr_34844 = state_34832;
(statearr_34844[(8)] = inst_34760);

(statearr_34844[(9)] = inst_34758);

(statearr_34844[(10)] = inst_34761);

(statearr_34844[(11)] = inst_34759);

return statearr_34844;
})();
var statearr_34846_36294 = state_34832__$1;
(statearr_34846_36294[(2)] = null);

(statearr_34846_36294[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (24))){
var inst_34764 = (state_34832[(12)]);
var inst_34761 = inst_34764;
var state_34832__$1 = (function (){var statearr_34847 = state_34832;
(statearr_34847[(10)] = inst_34761);

return statearr_34847;
})();
var statearr_34848_36295 = state_34832__$1;
(statearr_34848_36295[(2)] = null);

(statearr_34848_36295[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (4))){
var inst_34774 = (state_34832[(7)]);
var inst_34776 = (state_34832[(13)]);
var inst_34773 = (state_34832[(2)]);
var inst_34774__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_34773,(0),null);
var inst_34775 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_34773,(1),null);
var inst_34776__$1 = (inst_34774__$1 == null);
var state_34832__$1 = (function (){var statearr_34849 = state_34832;
(statearr_34849[(14)] = inst_34775);

(statearr_34849[(7)] = inst_34774__$1);

(statearr_34849[(13)] = inst_34776__$1);

return statearr_34849;
})();
if(cljs.core.truth_(inst_34776__$1)){
var statearr_34850_36296 = state_34832__$1;
(statearr_34850_36296[(1)] = (5));

} else {
var statearr_34851_36297 = state_34832__$1;
(statearr_34851_36297[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (15))){
var inst_34765 = (state_34832[(15)]);
var inst_34799 = (state_34832[(16)]);
var inst_34799__$1 = cljs.core.empty_QMARK_(inst_34765);
var state_34832__$1 = (function (){var statearr_34852 = state_34832;
(statearr_34852[(16)] = inst_34799__$1);

return statearr_34852;
})();
if(inst_34799__$1){
var statearr_34853_36298 = state_34832__$1;
(statearr_34853_36298[(1)] = (17));

} else {
var statearr_34854_36299 = state_34832__$1;
(statearr_34854_36299[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (21))){
var inst_34764 = (state_34832[(12)]);
var inst_34761 = inst_34764;
var state_34832__$1 = (function (){var statearr_34855 = state_34832;
(statearr_34855[(10)] = inst_34761);

return statearr_34855;
})();
var statearr_34856_36300 = state_34832__$1;
(statearr_34856_36300[(2)] = null);

(statearr_34856_36300[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (13))){
var inst_34788 = (state_34832[(2)]);
var inst_34789 = calc_state();
var inst_34761 = inst_34789;
var state_34832__$1 = (function (){var statearr_34857 = state_34832;
(statearr_34857[(10)] = inst_34761);

(statearr_34857[(17)] = inst_34788);

return statearr_34857;
})();
var statearr_34862_36301 = state_34832__$1;
(statearr_34862_36301[(2)] = null);

(statearr_34862_36301[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (22))){
var inst_34823 = (state_34832[(2)]);
var state_34832__$1 = state_34832;
var statearr_34863_36302 = state_34832__$1;
(statearr_34863_36302[(2)] = inst_34823);

(statearr_34863_36302[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (6))){
var inst_34775 = (state_34832[(14)]);
var inst_34779 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_34775,change);
var state_34832__$1 = state_34832;
var statearr_34864_36303 = state_34832__$1;
(statearr_34864_36303[(2)] = inst_34779);

(statearr_34864_36303[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (25))){
var state_34832__$1 = state_34832;
var statearr_34865_36304 = state_34832__$1;
(statearr_34865_36304[(2)] = null);

(statearr_34865_36304[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (17))){
var inst_34775 = (state_34832[(14)]);
var inst_34767 = (state_34832[(18)]);
var inst_34801 = (inst_34767.cljs$core$IFn$_invoke$arity$1 ? inst_34767.cljs$core$IFn$_invoke$arity$1(inst_34775) : inst_34767.call(null,inst_34775));
var inst_34802 = cljs.core.not(inst_34801);
var state_34832__$1 = state_34832;
var statearr_34867_36305 = state_34832__$1;
(statearr_34867_36305[(2)] = inst_34802);

(statearr_34867_36305[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (3))){
var inst_34827 = (state_34832[(2)]);
var state_34832__$1 = state_34832;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34832__$1,inst_34827);
} else {
if((state_val_34833 === (12))){
var state_34832__$1 = state_34832;
var statearr_34868_36306 = state_34832__$1;
(statearr_34868_36306[(2)] = null);

(statearr_34868_36306[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (2))){
var inst_34761 = (state_34832[(10)]);
var inst_34764 = (state_34832[(12)]);
var inst_34764__$1 = cljs.core.__destructure_map(inst_34761);
var inst_34765 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_34764__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_34767 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_34764__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_34768 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_34764__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_34832__$1 = (function (){var statearr_34869 = state_34832;
(statearr_34869[(18)] = inst_34767);

(statearr_34869[(15)] = inst_34765);

(statearr_34869[(12)] = inst_34764__$1);

return statearr_34869;
})();
return cljs.core.async.ioc_alts_BANG_(state_34832__$1,(4),inst_34768);
} else {
if((state_val_34833 === (23))){
var inst_34813 = (state_34832[(2)]);
var state_34832__$1 = state_34832;
if(cljs.core.truth_(inst_34813)){
var statearr_34870_36311 = state_34832__$1;
(statearr_34870_36311[(1)] = (24));

} else {
var statearr_34871_36312 = state_34832__$1;
(statearr_34871_36312[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (19))){
var inst_34805 = (state_34832[(2)]);
var state_34832__$1 = state_34832;
var statearr_34872_36313 = state_34832__$1;
(statearr_34872_36313[(2)] = inst_34805);

(statearr_34872_36313[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (11))){
var inst_34775 = (state_34832[(14)]);
var inst_34785 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_34775);
var state_34832__$1 = state_34832;
var statearr_34873_36314 = state_34832__$1;
(statearr_34873_36314[(2)] = inst_34785);

(statearr_34873_36314[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (9))){
var inst_34775 = (state_34832[(14)]);
var inst_34765 = (state_34832[(15)]);
var inst_34792 = (state_34832[(19)]);
var inst_34792__$1 = (inst_34765.cljs$core$IFn$_invoke$arity$1 ? inst_34765.cljs$core$IFn$_invoke$arity$1(inst_34775) : inst_34765.call(null,inst_34775));
var state_34832__$1 = (function (){var statearr_34875 = state_34832;
(statearr_34875[(19)] = inst_34792__$1);

return statearr_34875;
})();
if(cljs.core.truth_(inst_34792__$1)){
var statearr_34877_36315 = state_34832__$1;
(statearr_34877_36315[(1)] = (14));

} else {
var statearr_34878_36316 = state_34832__$1;
(statearr_34878_36316[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (5))){
var inst_34776 = (state_34832[(13)]);
var state_34832__$1 = state_34832;
var statearr_34879_36317 = state_34832__$1;
(statearr_34879_36317[(2)] = inst_34776);

(statearr_34879_36317[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (14))){
var inst_34792 = (state_34832[(19)]);
var state_34832__$1 = state_34832;
var statearr_34880_36321 = state_34832__$1;
(statearr_34880_36321[(2)] = inst_34792);

(statearr_34880_36321[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (26))){
var inst_34818 = (state_34832[(2)]);
var state_34832__$1 = state_34832;
var statearr_34881_36322 = state_34832__$1;
(statearr_34881_36322[(2)] = inst_34818);

(statearr_34881_36322[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (16))){
var inst_34807 = (state_34832[(2)]);
var state_34832__$1 = state_34832;
if(cljs.core.truth_(inst_34807)){
var statearr_34882_36323 = state_34832__$1;
(statearr_34882_36323[(1)] = (20));

} else {
var statearr_34883_36324 = state_34832__$1;
(statearr_34883_36324[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (10))){
var inst_34825 = (state_34832[(2)]);
var state_34832__$1 = state_34832;
var statearr_34884_36325 = state_34832__$1;
(statearr_34884_36325[(2)] = inst_34825);

(statearr_34884_36325[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (18))){
var inst_34799 = (state_34832[(16)]);
var state_34832__$1 = state_34832;
var statearr_34885_36326 = state_34832__$1;
(statearr_34885_36326[(2)] = inst_34799);

(statearr_34885_36326[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34833 === (8))){
var inst_34774 = (state_34832[(7)]);
var inst_34783 = (inst_34774 == null);
var state_34832__$1 = state_34832;
if(cljs.core.truth_(inst_34783)){
var statearr_34886_36327 = state_34832__$1;
(statearr_34886_36327[(1)] = (11));

} else {
var statearr_34887_36328 = state_34832__$1;
(statearr_34887_36328[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__33262__auto__ = null;
var cljs$core$async$mix_$_state_machine__33262__auto____0 = (function (){
var statearr_34888 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34888[(0)] = cljs$core$async$mix_$_state_machine__33262__auto__);

(statearr_34888[(1)] = (1));

return statearr_34888;
});
var cljs$core$async$mix_$_state_machine__33262__auto____1 = (function (state_34832){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_34832);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e34889){var ex__33265__auto__ = e34889;
var statearr_34890_36330 = state_34832;
(statearr_34890_36330[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_34832[(4)]))){
var statearr_34891_36335 = state_34832;
(statearr_34891_36335[(1)] = cljs.core.first((state_34832[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36336 = state_34832;
state_34832 = G__36336;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__33262__auto__ = function(state_34832){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__33262__auto____1.call(this,state_34832);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__33262__auto____0;
cljs$core$async$mix_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__33262__auto____1;
return cljs$core$async$mix_$_state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_34892 = f__33629__auto__();
(statearr_34892[(6)] = c__33628__auto___36285);

return statearr_34892;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_36337 = (function (p,v,ch,close_QMARK_){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5394__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5392__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_36337(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_36338 = (function (p,v,ch){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5394__auto__.call(null,p,v,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5392__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_36338(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_36340 = (function() {
var G__36341 = null;
var G__36341__1 = (function (p){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5394__auto__.call(null,p));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5392__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__36341__2 = (function (p,v){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5394__auto__.call(null,p,v));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5392__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__36341 = function(p,v){
switch(arguments.length){
case 1:
return G__36341__1.call(this,p);
case 2:
return G__36341__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__36341.cljs$core$IFn$_invoke$arity$1 = G__36341__1;
G__36341.cljs$core$IFn$_invoke$arity$2 = G__36341__2;
return G__36341;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__34898 = arguments.length;
switch (G__34898) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_36340(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_36340(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async34904 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta34905){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta34905 = meta34905;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async34904.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34906,meta34905__$1){
var self__ = this;
var _34906__$1 = this;
return (new cljs.core.async.t_cljs$core$async34904(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta34905__$1));
}));

(cljs.core.async.t_cljs$core$async34904.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34906){
var self__ = this;
var _34906__$1 = this;
return self__.meta34905;
}));

(cljs.core.async.t_cljs$core$async34904.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async34904.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async34904.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async34904.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async34904.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5804__auto__)){
var m = temp__5804__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async34904.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async34904.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async34904.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta34905","meta34905",-14196180,null)], null);
}));

(cljs.core.async.t_cljs$core$async34904.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async34904.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async34904");

(cljs.core.async.t_cljs$core$async34904.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async34904");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async34904.
 */
cljs.core.async.__GT_t_cljs$core$async34904 = (function cljs$core$async$__GT_t_cljs$core$async34904(ch,topic_fn,buf_fn,mults,ensure_mult,meta34905){
return (new cljs.core.async.t_cljs$core$async34904(ch,topic_fn,buf_fn,mults,ensure_mult,meta34905));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__34903 = arguments.length;
switch (G__34903) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__34901_SHARP_){
if(cljs.core.truth_((p1__34901_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__34901_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__34901_SHARP_.call(null,topic)))){
return p1__34901_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__34901_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async34904(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__33628__auto___36351 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_34992){
var state_val_34993 = (state_34992[(1)]);
if((state_val_34993 === (7))){
var inst_34988 = (state_34992[(2)]);
var state_34992__$1 = state_34992;
var statearr_34997_36352 = state_34992__$1;
(statearr_34997_36352[(2)] = inst_34988);

(statearr_34997_36352[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (20))){
var state_34992__$1 = state_34992;
var statearr_35002_36353 = state_34992__$1;
(statearr_35002_36353[(2)] = null);

(statearr_35002_36353[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (1))){
var state_34992__$1 = state_34992;
var statearr_35009_36354 = state_34992__$1;
(statearr_35009_36354[(2)] = null);

(statearr_35009_36354[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (24))){
var inst_34971 = (state_34992[(7)]);
var inst_34980 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_34971);
var state_34992__$1 = state_34992;
var statearr_35016_36355 = state_34992__$1;
(statearr_35016_36355[(2)] = inst_34980);

(statearr_35016_36355[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (4))){
var inst_34916 = (state_34992[(8)]);
var inst_34916__$1 = (state_34992[(2)]);
var inst_34917 = (inst_34916__$1 == null);
var state_34992__$1 = (function (){var statearr_35017 = state_34992;
(statearr_35017[(8)] = inst_34916__$1);

return statearr_35017;
})();
if(cljs.core.truth_(inst_34917)){
var statearr_35018_36356 = state_34992__$1;
(statearr_35018_36356[(1)] = (5));

} else {
var statearr_35019_36357 = state_34992__$1;
(statearr_35019_36357[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (15))){
var inst_34965 = (state_34992[(2)]);
var state_34992__$1 = state_34992;
var statearr_35020_36358 = state_34992__$1;
(statearr_35020_36358[(2)] = inst_34965);

(statearr_35020_36358[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (21))){
var inst_34985 = (state_34992[(2)]);
var state_34992__$1 = (function (){var statearr_35021 = state_34992;
(statearr_35021[(9)] = inst_34985);

return statearr_35021;
})();
var statearr_35026_36359 = state_34992__$1;
(statearr_35026_36359[(2)] = null);

(statearr_35026_36359[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (13))){
var inst_34944 = (state_34992[(10)]);
var inst_34946 = cljs.core.chunked_seq_QMARK_(inst_34944);
var state_34992__$1 = state_34992;
if(inst_34946){
var statearr_35030_36360 = state_34992__$1;
(statearr_35030_36360[(1)] = (16));

} else {
var statearr_35034_36361 = state_34992__$1;
(statearr_35034_36361[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (22))){
var inst_34977 = (state_34992[(2)]);
var state_34992__$1 = state_34992;
if(cljs.core.truth_(inst_34977)){
var statearr_35035_36362 = state_34992__$1;
(statearr_35035_36362[(1)] = (23));

} else {
var statearr_35036_36363 = state_34992__$1;
(statearr_35036_36363[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (6))){
var inst_34971 = (state_34992[(7)]);
var inst_34973 = (state_34992[(11)]);
var inst_34916 = (state_34992[(8)]);
var inst_34971__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_34916) : topic_fn.call(null,inst_34916));
var inst_34972 = cljs.core.deref(mults);
var inst_34973__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_34972,inst_34971__$1);
var state_34992__$1 = (function (){var statearr_35040 = state_34992;
(statearr_35040[(7)] = inst_34971__$1);

(statearr_35040[(11)] = inst_34973__$1);

return statearr_35040;
})();
if(cljs.core.truth_(inst_34973__$1)){
var statearr_35041_36364 = state_34992__$1;
(statearr_35041_36364[(1)] = (19));

} else {
var statearr_35042_36365 = state_34992__$1;
(statearr_35042_36365[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (25))){
var inst_34982 = (state_34992[(2)]);
var state_34992__$1 = state_34992;
var statearr_35043_36366 = state_34992__$1;
(statearr_35043_36366[(2)] = inst_34982);

(statearr_35043_36366[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (17))){
var inst_34944 = (state_34992[(10)]);
var inst_34953 = cljs.core.first(inst_34944);
var inst_34957 = cljs.core.async.muxch_STAR_(inst_34953);
var inst_34958 = cljs.core.async.close_BANG_(inst_34957);
var inst_34959 = cljs.core.next(inst_34944);
var inst_34927 = inst_34959;
var inst_34928 = null;
var inst_34929 = (0);
var inst_34930 = (0);
var state_34992__$1 = (function (){var statearr_35044 = state_34992;
(statearr_35044[(12)] = inst_34929);

(statearr_35044[(13)] = inst_34927);

(statearr_35044[(14)] = inst_34958);

(statearr_35044[(15)] = inst_34930);

(statearr_35044[(16)] = inst_34928);

return statearr_35044;
})();
var statearr_35045_36367 = state_34992__$1;
(statearr_35045_36367[(2)] = null);

(statearr_35045_36367[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (3))){
var inst_34990 = (state_34992[(2)]);
var state_34992__$1 = state_34992;
return cljs.core.async.impl.ioc_helpers.return_chan(state_34992__$1,inst_34990);
} else {
if((state_val_34993 === (12))){
var inst_34967 = (state_34992[(2)]);
var state_34992__$1 = state_34992;
var statearr_35046_36368 = state_34992__$1;
(statearr_35046_36368[(2)] = inst_34967);

(statearr_35046_36368[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (2))){
var state_34992__$1 = state_34992;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_34992__$1,(4),ch);
} else {
if((state_val_34993 === (23))){
var state_34992__$1 = state_34992;
var statearr_35047_36369 = state_34992__$1;
(statearr_35047_36369[(2)] = null);

(statearr_35047_36369[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (19))){
var inst_34973 = (state_34992[(11)]);
var inst_34916 = (state_34992[(8)]);
var inst_34975 = cljs.core.async.muxch_STAR_(inst_34973);
var state_34992__$1 = state_34992;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_34992__$1,(22),inst_34975,inst_34916);
} else {
if((state_val_34993 === (11))){
var inst_34927 = (state_34992[(13)]);
var inst_34944 = (state_34992[(10)]);
var inst_34944__$1 = cljs.core.seq(inst_34927);
var state_34992__$1 = (function (){var statearr_35052 = state_34992;
(statearr_35052[(10)] = inst_34944__$1);

return statearr_35052;
})();
if(inst_34944__$1){
var statearr_35053_36370 = state_34992__$1;
(statearr_35053_36370[(1)] = (13));

} else {
var statearr_35054_36372 = state_34992__$1;
(statearr_35054_36372[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (9))){
var inst_34969 = (state_34992[(2)]);
var state_34992__$1 = state_34992;
var statearr_35055_36373 = state_34992__$1;
(statearr_35055_36373[(2)] = inst_34969);

(statearr_35055_36373[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (5))){
var inst_34924 = cljs.core.deref(mults);
var inst_34925 = cljs.core.vals(inst_34924);
var inst_34926 = cljs.core.seq(inst_34925);
var inst_34927 = inst_34926;
var inst_34928 = null;
var inst_34929 = (0);
var inst_34930 = (0);
var state_34992__$1 = (function (){var statearr_35056 = state_34992;
(statearr_35056[(12)] = inst_34929);

(statearr_35056[(13)] = inst_34927);

(statearr_35056[(15)] = inst_34930);

(statearr_35056[(16)] = inst_34928);

return statearr_35056;
})();
var statearr_35057_36375 = state_34992__$1;
(statearr_35057_36375[(2)] = null);

(statearr_35057_36375[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (14))){
var state_34992__$1 = state_34992;
var statearr_35061_36376 = state_34992__$1;
(statearr_35061_36376[(2)] = null);

(statearr_35061_36376[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (16))){
var inst_34944 = (state_34992[(10)]);
var inst_34948 = cljs.core.chunk_first(inst_34944);
var inst_34949 = cljs.core.chunk_rest(inst_34944);
var inst_34950 = cljs.core.count(inst_34948);
var inst_34927 = inst_34949;
var inst_34928 = inst_34948;
var inst_34929 = inst_34950;
var inst_34930 = (0);
var state_34992__$1 = (function (){var statearr_35062 = state_34992;
(statearr_35062[(12)] = inst_34929);

(statearr_35062[(13)] = inst_34927);

(statearr_35062[(15)] = inst_34930);

(statearr_35062[(16)] = inst_34928);

return statearr_35062;
})();
var statearr_35063_36377 = state_34992__$1;
(statearr_35063_36377[(2)] = null);

(statearr_35063_36377[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (10))){
var inst_34929 = (state_34992[(12)]);
var inst_34927 = (state_34992[(13)]);
var inst_34930 = (state_34992[(15)]);
var inst_34928 = (state_34992[(16)]);
var inst_34935 = cljs.core._nth(inst_34928,inst_34930);
var inst_34937 = cljs.core.async.muxch_STAR_(inst_34935);
var inst_34938 = cljs.core.async.close_BANG_(inst_34937);
var inst_34939 = (inst_34930 + (1));
var tmp35058 = inst_34929;
var tmp35059 = inst_34927;
var tmp35060 = inst_34928;
var inst_34927__$1 = tmp35059;
var inst_34928__$1 = tmp35060;
var inst_34929__$1 = tmp35058;
var inst_34930__$1 = inst_34939;
var state_34992__$1 = (function (){var statearr_35064 = state_34992;
(statearr_35064[(12)] = inst_34929__$1);

(statearr_35064[(13)] = inst_34927__$1);

(statearr_35064[(15)] = inst_34930__$1);

(statearr_35064[(16)] = inst_34928__$1);

(statearr_35064[(17)] = inst_34938);

return statearr_35064;
})();
var statearr_35066_36378 = state_34992__$1;
(statearr_35066_36378[(2)] = null);

(statearr_35066_36378[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (18))){
var inst_34962 = (state_34992[(2)]);
var state_34992__$1 = state_34992;
var statearr_35070_36379 = state_34992__$1;
(statearr_35070_36379[(2)] = inst_34962);

(statearr_35070_36379[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34993 === (8))){
var inst_34929 = (state_34992[(12)]);
var inst_34930 = (state_34992[(15)]);
var inst_34932 = (inst_34930 < inst_34929);
var inst_34933 = inst_34932;
var state_34992__$1 = state_34992;
if(cljs.core.truth_(inst_34933)){
var statearr_35071_36380 = state_34992__$1;
(statearr_35071_36380[(1)] = (10));

} else {
var statearr_35072_36381 = state_34992__$1;
(statearr_35072_36381[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_35075 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35075[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_35075[(1)] = (1));

return statearr_35075;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_34992){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_34992);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e35077){var ex__33265__auto__ = e35077;
var statearr_35078_36383 = state_34992;
(statearr_35078_36383[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_34992[(4)]))){
var statearr_35079_36384 = state_34992;
(statearr_35079_36384[(1)] = cljs.core.first((state_34992[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36385 = state_34992;
state_34992 = G__36385;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_34992){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_34992);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_35081 = f__33629__auto__();
(statearr_35081[(6)] = c__33628__auto___36351);

return statearr_35081;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__35083 = arguments.length;
switch (G__35083) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__35087 = arguments.length;
switch (G__35087) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__35094 = arguments.length;
switch (G__35094) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__33628__auto___36391 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_35144){
var state_val_35145 = (state_35144[(1)]);
if((state_val_35145 === (7))){
var state_35144__$1 = state_35144;
var statearr_35147_36392 = state_35144__$1;
(statearr_35147_36392[(2)] = null);

(statearr_35147_36392[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (1))){
var state_35144__$1 = state_35144;
var statearr_35148_36393 = state_35144__$1;
(statearr_35148_36393[(2)] = null);

(statearr_35148_36393[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (4))){
var inst_35097 = (state_35144[(7)]);
var inst_35098 = (state_35144[(8)]);
var inst_35100 = (inst_35098 < inst_35097);
var state_35144__$1 = state_35144;
if(cljs.core.truth_(inst_35100)){
var statearr_35150_36394 = state_35144__$1;
(statearr_35150_36394[(1)] = (6));

} else {
var statearr_35154_36396 = state_35144__$1;
(statearr_35154_36396[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (15))){
var inst_35129 = (state_35144[(9)]);
var inst_35135 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_35129);
var state_35144__$1 = state_35144;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35144__$1,(17),out,inst_35135);
} else {
if((state_val_35145 === (13))){
var inst_35129 = (state_35144[(9)]);
var inst_35129__$1 = (state_35144[(2)]);
var inst_35130 = cljs.core.some(cljs.core.nil_QMARK_,inst_35129__$1);
var state_35144__$1 = (function (){var statearr_35155 = state_35144;
(statearr_35155[(9)] = inst_35129__$1);

return statearr_35155;
})();
if(cljs.core.truth_(inst_35130)){
var statearr_35156_36397 = state_35144__$1;
(statearr_35156_36397[(1)] = (14));

} else {
var statearr_35157_36398 = state_35144__$1;
(statearr_35157_36398[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (6))){
var state_35144__$1 = state_35144;
var statearr_35158_36399 = state_35144__$1;
(statearr_35158_36399[(2)] = null);

(statearr_35158_36399[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (17))){
var inst_35137 = (state_35144[(2)]);
var state_35144__$1 = (function (){var statearr_35160 = state_35144;
(statearr_35160[(10)] = inst_35137);

return statearr_35160;
})();
var statearr_35161_36400 = state_35144__$1;
(statearr_35161_36400[(2)] = null);

(statearr_35161_36400[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (3))){
var inst_35142 = (state_35144[(2)]);
var state_35144__$1 = state_35144;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35144__$1,inst_35142);
} else {
if((state_val_35145 === (12))){
var _ = (function (){var statearr_35162 = state_35144;
(statearr_35162[(4)] = cljs.core.rest((state_35144[(4)])));

return statearr_35162;
})();
var state_35144__$1 = state_35144;
var ex35159 = (state_35144__$1[(2)]);
var statearr_35163_36401 = state_35144__$1;
(statearr_35163_36401[(5)] = ex35159);


if((ex35159 instanceof Object)){
var statearr_35168_36402 = state_35144__$1;
(statearr_35168_36402[(1)] = (11));

(statearr_35168_36402[(5)] = null);

} else {
throw ex35159;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (2))){
var inst_35096 = cljs.core.reset_BANG_(dctr,cnt);
var inst_35097 = cnt;
var inst_35098 = (0);
var state_35144__$1 = (function (){var statearr_35173 = state_35144;
(statearr_35173[(7)] = inst_35097);

(statearr_35173[(8)] = inst_35098);

(statearr_35173[(11)] = inst_35096);

return statearr_35173;
})();
var statearr_35174_36403 = state_35144__$1;
(statearr_35174_36403[(2)] = null);

(statearr_35174_36403[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (11))){
var inst_35107 = (state_35144[(2)]);
var inst_35108 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_35144__$1 = (function (){var statearr_35175 = state_35144;
(statearr_35175[(12)] = inst_35107);

return statearr_35175;
})();
var statearr_35176_36408 = state_35144__$1;
(statearr_35176_36408[(2)] = inst_35108);

(statearr_35176_36408[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (9))){
var inst_35098 = (state_35144[(8)]);
var _ = (function (){var statearr_35177 = state_35144;
(statearr_35177[(4)] = cljs.core.cons((12),(state_35144[(4)])));

return statearr_35177;
})();
var inst_35114 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_35098) : chs__$1.call(null,inst_35098));
var inst_35115 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_35098) : done.call(null,inst_35098));
var inst_35116 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_35114,inst_35115);
var ___$1 = (function (){var statearr_35178 = state_35144;
(statearr_35178[(4)] = cljs.core.rest((state_35144[(4)])));

return statearr_35178;
})();
var state_35144__$1 = state_35144;
var statearr_35179_36409 = state_35144__$1;
(statearr_35179_36409[(2)] = inst_35116);

(statearr_35179_36409[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (5))){
var inst_35126 = (state_35144[(2)]);
var state_35144__$1 = (function (){var statearr_35180 = state_35144;
(statearr_35180[(13)] = inst_35126);

return statearr_35180;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35144__$1,(13),dchan);
} else {
if((state_val_35145 === (14))){
var inst_35132 = cljs.core.async.close_BANG_(out);
var state_35144__$1 = state_35144;
var statearr_35181_36410 = state_35144__$1;
(statearr_35181_36410[(2)] = inst_35132);

(statearr_35181_36410[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (16))){
var inst_35140 = (state_35144[(2)]);
var state_35144__$1 = state_35144;
var statearr_35182_36411 = state_35144__$1;
(statearr_35182_36411[(2)] = inst_35140);

(statearr_35182_36411[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (10))){
var inst_35098 = (state_35144[(8)]);
var inst_35119 = (state_35144[(2)]);
var inst_35120 = (inst_35098 + (1));
var inst_35098__$1 = inst_35120;
var state_35144__$1 = (function (){var statearr_35183 = state_35144;
(statearr_35183[(14)] = inst_35119);

(statearr_35183[(8)] = inst_35098__$1);

return statearr_35183;
})();
var statearr_35184_36412 = state_35144__$1;
(statearr_35184_36412[(2)] = null);

(statearr_35184_36412[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35145 === (8))){
var inst_35124 = (state_35144[(2)]);
var state_35144__$1 = state_35144;
var statearr_35185_36413 = state_35144__$1;
(statearr_35185_36413[(2)] = inst_35124);

(statearr_35185_36413[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_35187 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35187[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_35187[(1)] = (1));

return statearr_35187;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_35144){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_35144);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e35189){var ex__33265__auto__ = e35189;
var statearr_35190_36414 = state_35144;
(statearr_35190_36414[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_35144[(4)]))){
var statearr_35191_36415 = state_35144;
(statearr_35191_36415[(1)] = cljs.core.first((state_35144[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36416 = state_35144;
state_35144 = G__36416;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_35144){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_35144);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_35192 = f__33629__auto__();
(statearr_35192[(6)] = c__33628__auto___36391);

return statearr_35192;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__35198 = arguments.length;
switch (G__35198) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__33628__auto___36422 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_35230){
var state_val_35231 = (state_35230[(1)]);
if((state_val_35231 === (7))){
var inst_35210 = (state_35230[(7)]);
var inst_35209 = (state_35230[(8)]);
var inst_35209__$1 = (state_35230[(2)]);
var inst_35210__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_35209__$1,(0),null);
var inst_35211 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_35209__$1,(1),null);
var inst_35212 = (inst_35210__$1 == null);
var state_35230__$1 = (function (){var statearr_35232 = state_35230;
(statearr_35232[(9)] = inst_35211);

(statearr_35232[(7)] = inst_35210__$1);

(statearr_35232[(8)] = inst_35209__$1);

return statearr_35232;
})();
if(cljs.core.truth_(inst_35212)){
var statearr_35233_36423 = state_35230__$1;
(statearr_35233_36423[(1)] = (8));

} else {
var statearr_35234_36424 = state_35230__$1;
(statearr_35234_36424[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35231 === (1))){
var inst_35199 = cljs.core.vec(chs);
var inst_35200 = inst_35199;
var state_35230__$1 = (function (){var statearr_35235 = state_35230;
(statearr_35235[(10)] = inst_35200);

return statearr_35235;
})();
var statearr_35236_36429 = state_35230__$1;
(statearr_35236_36429[(2)] = null);

(statearr_35236_36429[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35231 === (4))){
var inst_35200 = (state_35230[(10)]);
var state_35230__$1 = state_35230;
return cljs.core.async.ioc_alts_BANG_(state_35230__$1,(7),inst_35200);
} else {
if((state_val_35231 === (6))){
var inst_35226 = (state_35230[(2)]);
var state_35230__$1 = state_35230;
var statearr_35237_36430 = state_35230__$1;
(statearr_35237_36430[(2)] = inst_35226);

(statearr_35237_36430[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35231 === (3))){
var inst_35228 = (state_35230[(2)]);
var state_35230__$1 = state_35230;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35230__$1,inst_35228);
} else {
if((state_val_35231 === (2))){
var inst_35200 = (state_35230[(10)]);
var inst_35202 = cljs.core.count(inst_35200);
var inst_35203 = (inst_35202 > (0));
var state_35230__$1 = state_35230;
if(cljs.core.truth_(inst_35203)){
var statearr_35239_36431 = state_35230__$1;
(statearr_35239_36431[(1)] = (4));

} else {
var statearr_35240_36436 = state_35230__$1;
(statearr_35240_36436[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35231 === (11))){
var inst_35200 = (state_35230[(10)]);
var inst_35219 = (state_35230[(2)]);
var tmp35238 = inst_35200;
var inst_35200__$1 = tmp35238;
var state_35230__$1 = (function (){var statearr_35241 = state_35230;
(statearr_35241[(11)] = inst_35219);

(statearr_35241[(10)] = inst_35200__$1);

return statearr_35241;
})();
var statearr_35242_36437 = state_35230__$1;
(statearr_35242_36437[(2)] = null);

(statearr_35242_36437[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35231 === (9))){
var inst_35210 = (state_35230[(7)]);
var state_35230__$1 = state_35230;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35230__$1,(11),out,inst_35210);
} else {
if((state_val_35231 === (5))){
var inst_35224 = cljs.core.async.close_BANG_(out);
var state_35230__$1 = state_35230;
var statearr_35243_36441 = state_35230__$1;
(statearr_35243_36441[(2)] = inst_35224);

(statearr_35243_36441[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35231 === (10))){
var inst_35222 = (state_35230[(2)]);
var state_35230__$1 = state_35230;
var statearr_35244_36442 = state_35230__$1;
(statearr_35244_36442[(2)] = inst_35222);

(statearr_35244_36442[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35231 === (8))){
var inst_35211 = (state_35230[(9)]);
var inst_35210 = (state_35230[(7)]);
var inst_35209 = (state_35230[(8)]);
var inst_35200 = (state_35230[(10)]);
var inst_35214 = (function (){var cs = inst_35200;
var vec__35205 = inst_35209;
var v = inst_35210;
var c = inst_35211;
return (function (p1__35196_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__35196_SHARP_);
});
})();
var inst_35215 = cljs.core.filterv(inst_35214,inst_35200);
var inst_35200__$1 = inst_35215;
var state_35230__$1 = (function (){var statearr_35245 = state_35230;
(statearr_35245[(10)] = inst_35200__$1);

return statearr_35245;
})();
var statearr_35246_36502 = state_35230__$1;
(statearr_35246_36502[(2)] = null);

(statearr_35246_36502[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_35247 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35247[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_35247[(1)] = (1));

return statearr_35247;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_35230){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_35230);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e35248){var ex__33265__auto__ = e35248;
var statearr_35249_36504 = state_35230;
(statearr_35249_36504[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_35230[(4)]))){
var statearr_35250_36505 = state_35230;
(statearr_35250_36505[(1)] = cljs.core.first((state_35230[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36507 = state_35230;
state_35230 = G__36507;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_35230){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_35230);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_35251 = f__33629__auto__();
(statearr_35251[(6)] = c__33628__auto___36422);

return statearr_35251;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__35254 = arguments.length;
switch (G__35254) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__33628__auto___36516 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_35281){
var state_val_35282 = (state_35281[(1)]);
if((state_val_35282 === (7))){
var inst_35263 = (state_35281[(7)]);
var inst_35263__$1 = (state_35281[(2)]);
var inst_35264 = (inst_35263__$1 == null);
var inst_35265 = cljs.core.not(inst_35264);
var state_35281__$1 = (function (){var statearr_35283 = state_35281;
(statearr_35283[(7)] = inst_35263__$1);

return statearr_35283;
})();
if(inst_35265){
var statearr_35288_36517 = state_35281__$1;
(statearr_35288_36517[(1)] = (8));

} else {
var statearr_35289_36518 = state_35281__$1;
(statearr_35289_36518[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35282 === (1))){
var inst_35258 = (0);
var state_35281__$1 = (function (){var statearr_35290 = state_35281;
(statearr_35290[(8)] = inst_35258);

return statearr_35290;
})();
var statearr_35291_36519 = state_35281__$1;
(statearr_35291_36519[(2)] = null);

(statearr_35291_36519[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35282 === (4))){
var state_35281__$1 = state_35281;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35281__$1,(7),ch);
} else {
if((state_val_35282 === (6))){
var inst_35276 = (state_35281[(2)]);
var state_35281__$1 = state_35281;
var statearr_35292_36520 = state_35281__$1;
(statearr_35292_36520[(2)] = inst_35276);

(statearr_35292_36520[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35282 === (3))){
var inst_35278 = (state_35281[(2)]);
var inst_35279 = cljs.core.async.close_BANG_(out);
var state_35281__$1 = (function (){var statearr_35293 = state_35281;
(statearr_35293[(9)] = inst_35278);

return statearr_35293;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_35281__$1,inst_35279);
} else {
if((state_val_35282 === (2))){
var inst_35258 = (state_35281[(8)]);
var inst_35260 = (inst_35258 < n);
var state_35281__$1 = state_35281;
if(cljs.core.truth_(inst_35260)){
var statearr_35294_36525 = state_35281__$1;
(statearr_35294_36525[(1)] = (4));

} else {
var statearr_35295_36526 = state_35281__$1;
(statearr_35295_36526[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35282 === (11))){
var inst_35258 = (state_35281[(8)]);
var inst_35268 = (state_35281[(2)]);
var inst_35269 = (inst_35258 + (1));
var inst_35258__$1 = inst_35269;
var state_35281__$1 = (function (){var statearr_35296 = state_35281;
(statearr_35296[(10)] = inst_35268);

(statearr_35296[(8)] = inst_35258__$1);

return statearr_35296;
})();
var statearr_35297_36527 = state_35281__$1;
(statearr_35297_36527[(2)] = null);

(statearr_35297_36527[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35282 === (9))){
var state_35281__$1 = state_35281;
var statearr_35298_36528 = state_35281__$1;
(statearr_35298_36528[(2)] = null);

(statearr_35298_36528[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35282 === (5))){
var state_35281__$1 = state_35281;
var statearr_35299_36529 = state_35281__$1;
(statearr_35299_36529[(2)] = null);

(statearr_35299_36529[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35282 === (10))){
var inst_35273 = (state_35281[(2)]);
var state_35281__$1 = state_35281;
var statearr_35300_36530 = state_35281__$1;
(statearr_35300_36530[(2)] = inst_35273);

(statearr_35300_36530[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35282 === (8))){
var inst_35263 = (state_35281[(7)]);
var state_35281__$1 = state_35281;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35281__$1,(11),out,inst_35263);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_35301 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_35301[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_35301[(1)] = (1));

return statearr_35301;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_35281){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_35281);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e35302){var ex__33265__auto__ = e35302;
var statearr_35303_36555 = state_35281;
(statearr_35303_36555[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_35281[(4)]))){
var statearr_35304_36556 = state_35281;
(statearr_35304_36556[(1)] = cljs.core.first((state_35281[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36557 = state_35281;
state_35281 = G__36557;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_35281){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_35281);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_35305 = f__33629__auto__();
(statearr_35305[(6)] = c__33628__auto___36516);

return statearr_35305;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async35344 = (function (f,ch,meta35322,_,fn1,meta35345){
this.f = f;
this.ch = ch;
this.meta35322 = meta35322;
this._ = _;
this.fn1 = fn1;
this.meta35345 = meta35345;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async35344.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_35346,meta35345__$1){
var self__ = this;
var _35346__$1 = this;
return (new cljs.core.async.t_cljs$core$async35344(self__.f,self__.ch,self__.meta35322,self__._,self__.fn1,meta35345__$1));
}));

(cljs.core.async.t_cljs$core$async35344.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_35346){
var self__ = this;
var _35346__$1 = this;
return self__.meta35345;
}));

(cljs.core.async.t_cljs$core$async35344.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35344.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async35344.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async35344.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__35306_SHARP_){
var G__35355 = (((p1__35306_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__35306_SHARP_) : self__.f.call(null,p1__35306_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__35355) : f1.call(null,G__35355));
});
}));

(cljs.core.async.t_cljs$core$async35344.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta35322","meta35322",-363865418,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async35321","cljs.core.async/t_cljs$core$async35321",1344777535,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta35345","meta35345",-1631841405,null)], null);
}));

(cljs.core.async.t_cljs$core$async35344.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async35344.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async35344");

(cljs.core.async.t_cljs$core$async35344.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async35344");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async35344.
 */
cljs.core.async.__GT_t_cljs$core$async35344 = (function cljs$core$async$__GT_t_cljs$core$async35344(f,ch,meta35322,_,fn1,meta35345){
return (new cljs.core.async.t_cljs$core$async35344(f,ch,meta35322,_,fn1,meta35345));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async35321 = (function (f,ch,meta35322){
this.f = f;
this.ch = ch;
this.meta35322 = meta35322;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async35321.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_35323,meta35322__$1){
var self__ = this;
var _35323__$1 = this;
return (new cljs.core.async.t_cljs$core$async35321(self__.f,self__.ch,meta35322__$1));
}));

(cljs.core.async.t_cljs$core$async35321.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_35323){
var self__ = this;
var _35323__$1 = this;
return self__.meta35322;
}));

(cljs.core.async.t_cljs$core$async35321.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35321.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async35321.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async35321.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35321.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async35344(self__.f,self__.ch,self__.meta35322,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5043__auto__ = ret;
if(cljs.core.truth_(and__5043__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5043__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__35357 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__35357) : self__.f.call(null,G__35357));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async35321.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35321.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async35321.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta35322","meta35322",-363865418,null)], null);
}));

(cljs.core.async.t_cljs$core$async35321.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async35321.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async35321");

(cljs.core.async.t_cljs$core$async35321.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async35321");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async35321.
 */
cljs.core.async.__GT_t_cljs$core$async35321 = (function cljs$core$async$__GT_t_cljs$core$async35321(f,ch,meta35322){
return (new cljs.core.async.t_cljs$core$async35321(f,ch,meta35322));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async35321(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async35361 = (function (f,ch,meta35362){
this.f = f;
this.ch = ch;
this.meta35362 = meta35362;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async35361.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_35363,meta35362__$1){
var self__ = this;
var _35363__$1 = this;
return (new cljs.core.async.t_cljs$core$async35361(self__.f,self__.ch,meta35362__$1));
}));

(cljs.core.async.t_cljs$core$async35361.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_35363){
var self__ = this;
var _35363__$1 = this;
return self__.meta35362;
}));

(cljs.core.async.t_cljs$core$async35361.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35361.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async35361.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35361.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async35361.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35361.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async35361.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta35362","meta35362",-1026795676,null)], null);
}));

(cljs.core.async.t_cljs$core$async35361.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async35361.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async35361");

(cljs.core.async.t_cljs$core$async35361.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async35361");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async35361.
 */
cljs.core.async.__GT_t_cljs$core$async35361 = (function cljs$core$async$__GT_t_cljs$core$async35361(f,ch,meta35362){
return (new cljs.core.async.t_cljs$core$async35361(f,ch,meta35362));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async35361(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async35364 = (function (p,ch,meta35365){
this.p = p;
this.ch = ch;
this.meta35365 = meta35365;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async35364.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_35366,meta35365__$1){
var self__ = this;
var _35366__$1 = this;
return (new cljs.core.async.t_cljs$core$async35364(self__.p,self__.ch,meta35365__$1));
}));

(cljs.core.async.t_cljs$core$async35364.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_35366){
var self__ = this;
var _35366__$1 = this;
return self__.meta35365;
}));

(cljs.core.async.t_cljs$core$async35364.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35364.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async35364.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async35364.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35364.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async35364.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async35364.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async35364.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta35365","meta35365",2090337177,null)], null);
}));

(cljs.core.async.t_cljs$core$async35364.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async35364.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async35364");

(cljs.core.async.t_cljs$core$async35364.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async35364");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async35364.
 */
cljs.core.async.__GT_t_cljs$core$async35364 = (function cljs$core$async$__GT_t_cljs$core$async35364(p,ch,meta35365){
return (new cljs.core.async.t_cljs$core$async35364(p,ch,meta35365));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async35364(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__35368 = arguments.length;
switch (G__35368) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__33628__auto___36579 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_35389){
var state_val_35390 = (state_35389[(1)]);
if((state_val_35390 === (7))){
var inst_35385 = (state_35389[(2)]);
var state_35389__$1 = state_35389;
var statearr_35399_36580 = state_35389__$1;
(statearr_35399_36580[(2)] = inst_35385);

(statearr_35399_36580[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35390 === (1))){
var state_35389__$1 = state_35389;
var statearr_35400_36581 = state_35389__$1;
(statearr_35400_36581[(2)] = null);

(statearr_35400_36581[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35390 === (4))){
var inst_35371 = (state_35389[(7)]);
var inst_35371__$1 = (state_35389[(2)]);
var inst_35372 = (inst_35371__$1 == null);
var state_35389__$1 = (function (){var statearr_35404 = state_35389;
(statearr_35404[(7)] = inst_35371__$1);

return statearr_35404;
})();
if(cljs.core.truth_(inst_35372)){
var statearr_35405_36589 = state_35389__$1;
(statearr_35405_36589[(1)] = (5));

} else {
var statearr_35406_36590 = state_35389__$1;
(statearr_35406_36590[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35390 === (6))){
var inst_35371 = (state_35389[(7)]);
var inst_35376 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_35371) : p.call(null,inst_35371));
var state_35389__$1 = state_35389;
if(cljs.core.truth_(inst_35376)){
var statearr_35407_36595 = state_35389__$1;
(statearr_35407_36595[(1)] = (8));

} else {
var statearr_35408_36596 = state_35389__$1;
(statearr_35408_36596[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35390 === (3))){
var inst_35387 = (state_35389[(2)]);
var state_35389__$1 = state_35389;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35389__$1,inst_35387);
} else {
if((state_val_35390 === (2))){
var state_35389__$1 = state_35389;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35389__$1,(4),ch);
} else {
if((state_val_35390 === (11))){
var inst_35379 = (state_35389[(2)]);
var state_35389__$1 = state_35389;
var statearr_35409_36597 = state_35389__$1;
(statearr_35409_36597[(2)] = inst_35379);

(statearr_35409_36597[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35390 === (9))){
var state_35389__$1 = state_35389;
var statearr_35410_36598 = state_35389__$1;
(statearr_35410_36598[(2)] = null);

(statearr_35410_36598[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35390 === (5))){
var inst_35374 = cljs.core.async.close_BANG_(out);
var state_35389__$1 = state_35389;
var statearr_35411_36599 = state_35389__$1;
(statearr_35411_36599[(2)] = inst_35374);

(statearr_35411_36599[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35390 === (10))){
var inst_35382 = (state_35389[(2)]);
var state_35389__$1 = (function (){var statearr_35412 = state_35389;
(statearr_35412[(8)] = inst_35382);

return statearr_35412;
})();
var statearr_35413_36606 = state_35389__$1;
(statearr_35413_36606[(2)] = null);

(statearr_35413_36606[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35390 === (8))){
var inst_35371 = (state_35389[(7)]);
var state_35389__$1 = state_35389;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35389__$1,(11),out,inst_35371);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_35414 = [null,null,null,null,null,null,null,null,null];
(statearr_35414[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_35414[(1)] = (1));

return statearr_35414;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_35389){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_35389);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e35415){var ex__33265__auto__ = e35415;
var statearr_35416_36608 = state_35389;
(statearr_35416_36608[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_35389[(4)]))){
var statearr_35417_36610 = state_35389;
(statearr_35417_36610[(1)] = cljs.core.first((state_35389[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36614 = state_35389;
state_35389 = G__36614;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_35389){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_35389);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_35418 = f__33629__auto__();
(statearr_35418[(6)] = c__33628__auto___36579);

return statearr_35418;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__35420 = arguments.length;
switch (G__35420) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__33628__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_35486){
var state_val_35487 = (state_35486[(1)]);
if((state_val_35487 === (7))){
var inst_35480 = (state_35486[(2)]);
var state_35486__$1 = state_35486;
var statearr_35489_36694 = state_35486__$1;
(statearr_35489_36694[(2)] = inst_35480);

(statearr_35489_36694[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (20))){
var inst_35449 = (state_35486[(7)]);
var inst_35461 = (state_35486[(2)]);
var inst_35462 = cljs.core.next(inst_35449);
var inst_35434 = inst_35462;
var inst_35435 = null;
var inst_35436 = (0);
var inst_35437 = (0);
var state_35486__$1 = (function (){var statearr_35491 = state_35486;
(statearr_35491[(8)] = inst_35436);

(statearr_35491[(9)] = inst_35434);

(statearr_35491[(10)] = inst_35461);

(statearr_35491[(11)] = inst_35435);

(statearr_35491[(12)] = inst_35437);

return statearr_35491;
})();
var statearr_35492_36715 = state_35486__$1;
(statearr_35492_36715[(2)] = null);

(statearr_35492_36715[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (1))){
var state_35486__$1 = state_35486;
var statearr_35493_36734 = state_35486__$1;
(statearr_35493_36734[(2)] = null);

(statearr_35493_36734[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (4))){
var inst_35423 = (state_35486[(13)]);
var inst_35423__$1 = (state_35486[(2)]);
var inst_35424 = (inst_35423__$1 == null);
var state_35486__$1 = (function (){var statearr_35494 = state_35486;
(statearr_35494[(13)] = inst_35423__$1);

return statearr_35494;
})();
if(cljs.core.truth_(inst_35424)){
var statearr_35495_36736 = state_35486__$1;
(statearr_35495_36736[(1)] = (5));

} else {
var statearr_35496_36737 = state_35486__$1;
(statearr_35496_36737[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (15))){
var state_35486__$1 = state_35486;
var statearr_35502_36738 = state_35486__$1;
(statearr_35502_36738[(2)] = null);

(statearr_35502_36738[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (21))){
var state_35486__$1 = state_35486;
var statearr_35503_36739 = state_35486__$1;
(statearr_35503_36739[(2)] = null);

(statearr_35503_36739[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (13))){
var inst_35436 = (state_35486[(8)]);
var inst_35434 = (state_35486[(9)]);
var inst_35435 = (state_35486[(11)]);
var inst_35437 = (state_35486[(12)]);
var inst_35445 = (state_35486[(2)]);
var inst_35446 = (inst_35437 + (1));
var tmp35498 = inst_35436;
var tmp35499 = inst_35434;
var tmp35500 = inst_35435;
var inst_35434__$1 = tmp35499;
var inst_35435__$1 = tmp35500;
var inst_35436__$1 = tmp35498;
var inst_35437__$1 = inst_35446;
var state_35486__$1 = (function (){var statearr_35504 = state_35486;
(statearr_35504[(14)] = inst_35445);

(statearr_35504[(8)] = inst_35436__$1);

(statearr_35504[(9)] = inst_35434__$1);

(statearr_35504[(11)] = inst_35435__$1);

(statearr_35504[(12)] = inst_35437__$1);

return statearr_35504;
})();
var statearr_35505_36761 = state_35486__$1;
(statearr_35505_36761[(2)] = null);

(statearr_35505_36761[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (22))){
var state_35486__$1 = state_35486;
var statearr_35506_36767 = state_35486__$1;
(statearr_35506_36767[(2)] = null);

(statearr_35506_36767[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (6))){
var inst_35423 = (state_35486[(13)]);
var inst_35432 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_35423) : f.call(null,inst_35423));
var inst_35433 = cljs.core.seq(inst_35432);
var inst_35434 = inst_35433;
var inst_35435 = null;
var inst_35436 = (0);
var inst_35437 = (0);
var state_35486__$1 = (function (){var statearr_35507 = state_35486;
(statearr_35507[(8)] = inst_35436);

(statearr_35507[(9)] = inst_35434);

(statearr_35507[(11)] = inst_35435);

(statearr_35507[(12)] = inst_35437);

return statearr_35507;
})();
var statearr_35508_36787 = state_35486__$1;
(statearr_35508_36787[(2)] = null);

(statearr_35508_36787[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (17))){
var inst_35449 = (state_35486[(7)]);
var inst_35454 = cljs.core.chunk_first(inst_35449);
var inst_35455 = cljs.core.chunk_rest(inst_35449);
var inst_35456 = cljs.core.count(inst_35454);
var inst_35434 = inst_35455;
var inst_35435 = inst_35454;
var inst_35436 = inst_35456;
var inst_35437 = (0);
var state_35486__$1 = (function (){var statearr_35509 = state_35486;
(statearr_35509[(8)] = inst_35436);

(statearr_35509[(9)] = inst_35434);

(statearr_35509[(11)] = inst_35435);

(statearr_35509[(12)] = inst_35437);

return statearr_35509;
})();
var statearr_35510_36800 = state_35486__$1;
(statearr_35510_36800[(2)] = null);

(statearr_35510_36800[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (3))){
var inst_35482 = (state_35486[(2)]);
var state_35486__$1 = state_35486;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35486__$1,inst_35482);
} else {
if((state_val_35487 === (12))){
var inst_35470 = (state_35486[(2)]);
var state_35486__$1 = state_35486;
var statearr_35511_36813 = state_35486__$1;
(statearr_35511_36813[(2)] = inst_35470);

(statearr_35511_36813[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (2))){
var state_35486__$1 = state_35486;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35486__$1,(4),in$);
} else {
if((state_val_35487 === (23))){
var inst_35478 = (state_35486[(2)]);
var state_35486__$1 = state_35486;
var statearr_35512_36837 = state_35486__$1;
(statearr_35512_36837[(2)] = inst_35478);

(statearr_35512_36837[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (19))){
var inst_35465 = (state_35486[(2)]);
var state_35486__$1 = state_35486;
var statearr_35513_36842 = state_35486__$1;
(statearr_35513_36842[(2)] = inst_35465);

(statearr_35513_36842[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (11))){
var inst_35434 = (state_35486[(9)]);
var inst_35449 = (state_35486[(7)]);
var inst_35449__$1 = cljs.core.seq(inst_35434);
var state_35486__$1 = (function (){var statearr_35514 = state_35486;
(statearr_35514[(7)] = inst_35449__$1);

return statearr_35514;
})();
if(inst_35449__$1){
var statearr_35515_36851 = state_35486__$1;
(statearr_35515_36851[(1)] = (14));

} else {
var statearr_35516_36852 = state_35486__$1;
(statearr_35516_36852[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (9))){
var inst_35472 = (state_35486[(2)]);
var inst_35473 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_35486__$1 = (function (){var statearr_35517 = state_35486;
(statearr_35517[(15)] = inst_35472);

return statearr_35517;
})();
if(cljs.core.truth_(inst_35473)){
var statearr_35518_36860 = state_35486__$1;
(statearr_35518_36860[(1)] = (21));

} else {
var statearr_35519_36861 = state_35486__$1;
(statearr_35519_36861[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (5))){
var inst_35426 = cljs.core.async.close_BANG_(out);
var state_35486__$1 = state_35486;
var statearr_35523_36862 = state_35486__$1;
(statearr_35523_36862[(2)] = inst_35426);

(statearr_35523_36862[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (14))){
var inst_35449 = (state_35486[(7)]);
var inst_35452 = cljs.core.chunked_seq_QMARK_(inst_35449);
var state_35486__$1 = state_35486;
if(inst_35452){
var statearr_35524_36865 = state_35486__$1;
(statearr_35524_36865[(1)] = (17));

} else {
var statearr_35525_36866 = state_35486__$1;
(statearr_35525_36866[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (16))){
var inst_35468 = (state_35486[(2)]);
var state_35486__$1 = state_35486;
var statearr_35526_36872 = state_35486__$1;
(statearr_35526_36872[(2)] = inst_35468);

(statearr_35526_36872[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35487 === (10))){
var inst_35435 = (state_35486[(11)]);
var inst_35437 = (state_35486[(12)]);
var inst_35443 = cljs.core._nth(inst_35435,inst_35437);
var state_35486__$1 = state_35486;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35486__$1,(13),out,inst_35443);
} else {
if((state_val_35487 === (18))){
var inst_35449 = (state_35486[(7)]);
var inst_35459 = cljs.core.first(inst_35449);
var state_35486__$1 = state_35486;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35486__$1,(20),out,inst_35459);
} else {
if((state_val_35487 === (8))){
var inst_35436 = (state_35486[(8)]);
var inst_35437 = (state_35486[(12)]);
var inst_35439 = (inst_35437 < inst_35436);
var inst_35440 = inst_35439;
var state_35486__$1 = state_35486;
if(cljs.core.truth_(inst_35440)){
var statearr_35527_36882 = state_35486__$1;
(statearr_35527_36882[(1)] = (10));

} else {
var statearr_35528_36887 = state_35486__$1;
(statearr_35528_36887[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__33262__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__33262__auto____0 = (function (){
var statearr_35529 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35529[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__33262__auto__);

(statearr_35529[(1)] = (1));

return statearr_35529;
});
var cljs$core$async$mapcat_STAR__$_state_machine__33262__auto____1 = (function (state_35486){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_35486);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e35533){var ex__33265__auto__ = e35533;
var statearr_35534_36892 = state_35486;
(statearr_35534_36892[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_35486[(4)]))){
var statearr_35539_36898 = state_35486;
(statearr_35539_36898[(1)] = cljs.core.first((state_35486[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36900 = state_35486;
state_35486 = G__36900;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__33262__auto__ = function(state_35486){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__33262__auto____1.call(this,state_35486);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__33262__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__33262__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_35543 = f__33629__auto__();
(statearr_35543[(6)] = c__33628__auto__);

return statearr_35543;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));

return c__33628__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__35548 = arguments.length;
switch (G__35548) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__35560 = arguments.length;
switch (G__35560) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__35579 = arguments.length;
switch (G__35579) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__33628__auto___36908 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_35605){
var state_val_35606 = (state_35605[(1)]);
if((state_val_35606 === (7))){
var inst_35600 = (state_35605[(2)]);
var state_35605__$1 = state_35605;
var statearr_35607_36909 = state_35605__$1;
(statearr_35607_36909[(2)] = inst_35600);

(statearr_35607_36909[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35606 === (1))){
var inst_35582 = null;
var state_35605__$1 = (function (){var statearr_35608 = state_35605;
(statearr_35608[(7)] = inst_35582);

return statearr_35608;
})();
var statearr_35609_36917 = state_35605__$1;
(statearr_35609_36917[(2)] = null);

(statearr_35609_36917[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35606 === (4))){
var inst_35585 = (state_35605[(8)]);
var inst_35585__$1 = (state_35605[(2)]);
var inst_35586 = (inst_35585__$1 == null);
var inst_35587 = cljs.core.not(inst_35586);
var state_35605__$1 = (function (){var statearr_35610 = state_35605;
(statearr_35610[(8)] = inst_35585__$1);

return statearr_35610;
})();
if(inst_35587){
var statearr_35611_36920 = state_35605__$1;
(statearr_35611_36920[(1)] = (5));

} else {
var statearr_35612_36921 = state_35605__$1;
(statearr_35612_36921[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35606 === (6))){
var state_35605__$1 = state_35605;
var statearr_35613_36922 = state_35605__$1;
(statearr_35613_36922[(2)] = null);

(statearr_35613_36922[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35606 === (3))){
var inst_35602 = (state_35605[(2)]);
var inst_35603 = cljs.core.async.close_BANG_(out);
var state_35605__$1 = (function (){var statearr_35614 = state_35605;
(statearr_35614[(9)] = inst_35602);

return statearr_35614;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_35605__$1,inst_35603);
} else {
if((state_val_35606 === (2))){
var state_35605__$1 = state_35605;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35605__$1,(4),ch);
} else {
if((state_val_35606 === (11))){
var inst_35585 = (state_35605[(8)]);
var inst_35594 = (state_35605[(2)]);
var inst_35582 = inst_35585;
var state_35605__$1 = (function (){var statearr_35615 = state_35605;
(statearr_35615[(7)] = inst_35582);

(statearr_35615[(10)] = inst_35594);

return statearr_35615;
})();
var statearr_35616_36924 = state_35605__$1;
(statearr_35616_36924[(2)] = null);

(statearr_35616_36924[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35606 === (9))){
var inst_35585 = (state_35605[(8)]);
var state_35605__$1 = state_35605;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35605__$1,(11),out,inst_35585);
} else {
if((state_val_35606 === (5))){
var inst_35582 = (state_35605[(7)]);
var inst_35585 = (state_35605[(8)]);
var inst_35589 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_35585,inst_35582);
var state_35605__$1 = state_35605;
if(inst_35589){
var statearr_35618_36926 = state_35605__$1;
(statearr_35618_36926[(1)] = (8));

} else {
var statearr_35619_36927 = state_35605__$1;
(statearr_35619_36927[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35606 === (10))){
var inst_35597 = (state_35605[(2)]);
var state_35605__$1 = state_35605;
var statearr_35620_36929 = state_35605__$1;
(statearr_35620_36929[(2)] = inst_35597);

(statearr_35620_36929[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35606 === (8))){
var inst_35582 = (state_35605[(7)]);
var tmp35617 = inst_35582;
var inst_35582__$1 = tmp35617;
var state_35605__$1 = (function (){var statearr_35621 = state_35605;
(statearr_35621[(7)] = inst_35582__$1);

return statearr_35621;
})();
var statearr_35622_36933 = state_35605__$1;
(statearr_35622_36933[(2)] = null);

(statearr_35622_36933[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_35623 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_35623[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_35623[(1)] = (1));

return statearr_35623;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_35605){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_35605);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e35626){var ex__33265__auto__ = e35626;
var statearr_35627_36937 = state_35605;
(statearr_35627_36937[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_35605[(4)]))){
var statearr_35628_36938 = state_35605;
(statearr_35628_36938[(1)] = cljs.core.first((state_35605[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36940 = state_35605;
state_35605 = G__36940;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_35605){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_35605);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_35629 = f__33629__auto__();
(statearr_35629[(6)] = c__33628__auto___36908);

return statearr_35629;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__35642 = arguments.length;
switch (G__35642) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__33628__auto___36946 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_35682){
var state_val_35683 = (state_35682[(1)]);
if((state_val_35683 === (7))){
var inst_35678 = (state_35682[(2)]);
var state_35682__$1 = state_35682;
var statearr_35684_36947 = state_35682__$1;
(statearr_35684_36947[(2)] = inst_35678);

(statearr_35684_36947[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (1))){
var inst_35644 = (new Array(n));
var inst_35645 = inst_35644;
var inst_35646 = (0);
var state_35682__$1 = (function (){var statearr_35685 = state_35682;
(statearr_35685[(7)] = inst_35646);

(statearr_35685[(8)] = inst_35645);

return statearr_35685;
})();
var statearr_35686_36948 = state_35682__$1;
(statearr_35686_36948[(2)] = null);

(statearr_35686_36948[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (4))){
var inst_35649 = (state_35682[(9)]);
var inst_35649__$1 = (state_35682[(2)]);
var inst_35650 = (inst_35649__$1 == null);
var inst_35651 = cljs.core.not(inst_35650);
var state_35682__$1 = (function (){var statearr_35687 = state_35682;
(statearr_35687[(9)] = inst_35649__$1);

return statearr_35687;
})();
if(inst_35651){
var statearr_35688_36949 = state_35682__$1;
(statearr_35688_36949[(1)] = (5));

} else {
var statearr_35689_36950 = state_35682__$1;
(statearr_35689_36950[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (15))){
var inst_35672 = (state_35682[(2)]);
var state_35682__$1 = state_35682;
var statearr_35690_36951 = state_35682__$1;
(statearr_35690_36951[(2)] = inst_35672);

(statearr_35690_36951[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (13))){
var state_35682__$1 = state_35682;
var statearr_35691_36952 = state_35682__$1;
(statearr_35691_36952[(2)] = null);

(statearr_35691_36952[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (6))){
var inst_35646 = (state_35682[(7)]);
var inst_35668 = (inst_35646 > (0));
var state_35682__$1 = state_35682;
if(cljs.core.truth_(inst_35668)){
var statearr_35692_36957 = state_35682__$1;
(statearr_35692_36957[(1)] = (12));

} else {
var statearr_35693_36958 = state_35682__$1;
(statearr_35693_36958[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (3))){
var inst_35680 = (state_35682[(2)]);
var state_35682__$1 = state_35682;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35682__$1,inst_35680);
} else {
if((state_val_35683 === (12))){
var inst_35645 = (state_35682[(8)]);
var inst_35670 = cljs.core.vec(inst_35645);
var state_35682__$1 = state_35682;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35682__$1,(15),out,inst_35670);
} else {
if((state_val_35683 === (2))){
var state_35682__$1 = state_35682;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35682__$1,(4),ch);
} else {
if((state_val_35683 === (11))){
var inst_35662 = (state_35682[(2)]);
var inst_35663 = (new Array(n));
var inst_35645 = inst_35663;
var inst_35646 = (0);
var state_35682__$1 = (function (){var statearr_35694 = state_35682;
(statearr_35694[(10)] = inst_35662);

(statearr_35694[(7)] = inst_35646);

(statearr_35694[(8)] = inst_35645);

return statearr_35694;
})();
var statearr_35695_36959 = state_35682__$1;
(statearr_35695_36959[(2)] = null);

(statearr_35695_36959[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (9))){
var inst_35645 = (state_35682[(8)]);
var inst_35660 = cljs.core.vec(inst_35645);
var state_35682__$1 = state_35682;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35682__$1,(11),out,inst_35660);
} else {
if((state_val_35683 === (5))){
var inst_35654 = (state_35682[(11)]);
var inst_35646 = (state_35682[(7)]);
var inst_35649 = (state_35682[(9)]);
var inst_35645 = (state_35682[(8)]);
var inst_35653 = (inst_35645[inst_35646] = inst_35649);
var inst_35654__$1 = (inst_35646 + (1));
var inst_35656 = (inst_35654__$1 < n);
var state_35682__$1 = (function (){var statearr_35698 = state_35682;
(statearr_35698[(11)] = inst_35654__$1);

(statearr_35698[(12)] = inst_35653);

return statearr_35698;
})();
if(cljs.core.truth_(inst_35656)){
var statearr_35699_36960 = state_35682__$1;
(statearr_35699_36960[(1)] = (8));

} else {
var statearr_35700_36961 = state_35682__$1;
(statearr_35700_36961[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (14))){
var inst_35675 = (state_35682[(2)]);
var inst_35676 = cljs.core.async.close_BANG_(out);
var state_35682__$1 = (function (){var statearr_35702 = state_35682;
(statearr_35702[(13)] = inst_35675);

return statearr_35702;
})();
var statearr_35703_36962 = state_35682__$1;
(statearr_35703_36962[(2)] = inst_35676);

(statearr_35703_36962[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (10))){
var inst_35666 = (state_35682[(2)]);
var state_35682__$1 = state_35682;
var statearr_35704_36964 = state_35682__$1;
(statearr_35704_36964[(2)] = inst_35666);

(statearr_35704_36964[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35683 === (8))){
var inst_35654 = (state_35682[(11)]);
var inst_35645 = (state_35682[(8)]);
var tmp35701 = inst_35645;
var inst_35645__$1 = tmp35701;
var inst_35646 = inst_35654;
var state_35682__$1 = (function (){var statearr_35706 = state_35682;
(statearr_35706[(7)] = inst_35646);

(statearr_35706[(8)] = inst_35645__$1);

return statearr_35706;
})();
var statearr_35707_36965 = state_35682__$1;
(statearr_35707_36965[(2)] = null);

(statearr_35707_36965[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_35708 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35708[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_35708[(1)] = (1));

return statearr_35708;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_35682){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_35682);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e35709){var ex__33265__auto__ = e35709;
var statearr_35710_36971 = state_35682;
(statearr_35710_36971[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_35682[(4)]))){
var statearr_35711_36972 = state_35682;
(statearr_35711_36972[(1)] = cljs.core.first((state_35682[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__36973 = state_35682;
state_35682 = G__36973;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_35682){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_35682);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_35712 = f__33629__auto__();
(statearr_35712[(6)] = c__33628__auto___36946);

return statearr_35712;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__35724 = arguments.length;
switch (G__35724) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__33628__auto___37007 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_35769){
var state_val_35770 = (state_35769[(1)]);
if((state_val_35770 === (7))){
var inst_35765 = (state_35769[(2)]);
var state_35769__$1 = state_35769;
var statearr_35771_37008 = state_35769__$1;
(statearr_35771_37008[(2)] = inst_35765);

(statearr_35771_37008[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (1))){
var inst_35725 = [];
var inst_35726 = inst_35725;
var inst_35727 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_35769__$1 = (function (){var statearr_35772 = state_35769;
(statearr_35772[(7)] = inst_35727);

(statearr_35772[(8)] = inst_35726);

return statearr_35772;
})();
var statearr_35773_37009 = state_35769__$1;
(statearr_35773_37009[(2)] = null);

(statearr_35773_37009[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (4))){
var inst_35730 = (state_35769[(9)]);
var inst_35730__$1 = (state_35769[(2)]);
var inst_35731 = (inst_35730__$1 == null);
var inst_35732 = cljs.core.not(inst_35731);
var state_35769__$1 = (function (){var statearr_35776 = state_35769;
(statearr_35776[(9)] = inst_35730__$1);

return statearr_35776;
})();
if(inst_35732){
var statearr_35777_37010 = state_35769__$1;
(statearr_35777_37010[(1)] = (5));

} else {
var statearr_35778_37011 = state_35769__$1;
(statearr_35778_37011[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (15))){
var inst_35726 = (state_35769[(8)]);
var inst_35757 = cljs.core.vec(inst_35726);
var state_35769__$1 = state_35769;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35769__$1,(18),out,inst_35757);
} else {
if((state_val_35770 === (13))){
var inst_35752 = (state_35769[(2)]);
var state_35769__$1 = state_35769;
var statearr_35779_37013 = state_35769__$1;
(statearr_35779_37013[(2)] = inst_35752);

(statearr_35779_37013[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (6))){
var inst_35726 = (state_35769[(8)]);
var inst_35754 = inst_35726.length;
var inst_35755 = (inst_35754 > (0));
var state_35769__$1 = state_35769;
if(cljs.core.truth_(inst_35755)){
var statearr_35780_37015 = state_35769__$1;
(statearr_35780_37015[(1)] = (15));

} else {
var statearr_35782_37016 = state_35769__$1;
(statearr_35782_37016[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (17))){
var inst_35762 = (state_35769[(2)]);
var inst_35763 = cljs.core.async.close_BANG_(out);
var state_35769__$1 = (function (){var statearr_35783 = state_35769;
(statearr_35783[(10)] = inst_35762);

return statearr_35783;
})();
var statearr_35785_37017 = state_35769__$1;
(statearr_35785_37017[(2)] = inst_35763);

(statearr_35785_37017[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (3))){
var inst_35767 = (state_35769[(2)]);
var state_35769__$1 = state_35769;
return cljs.core.async.impl.ioc_helpers.return_chan(state_35769__$1,inst_35767);
} else {
if((state_val_35770 === (12))){
var inst_35726 = (state_35769[(8)]);
var inst_35745 = cljs.core.vec(inst_35726);
var state_35769__$1 = state_35769;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_35769__$1,(14),out,inst_35745);
} else {
if((state_val_35770 === (2))){
var state_35769__$1 = state_35769;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_35769__$1,(4),ch);
} else {
if((state_val_35770 === (11))){
var inst_35730 = (state_35769[(9)]);
var inst_35734 = (state_35769[(11)]);
var inst_35726 = (state_35769[(8)]);
var inst_35742 = inst_35726.push(inst_35730);
var tmp35786 = inst_35726;
var inst_35726__$1 = tmp35786;
var inst_35727 = inst_35734;
var state_35769__$1 = (function (){var statearr_35787 = state_35769;
(statearr_35787[(7)] = inst_35727);

(statearr_35787[(12)] = inst_35742);

(statearr_35787[(8)] = inst_35726__$1);

return statearr_35787;
})();
var statearr_35788_37018 = state_35769__$1;
(statearr_35788_37018[(2)] = null);

(statearr_35788_37018[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (9))){
var inst_35727 = (state_35769[(7)]);
var inst_35738 = cljs.core.keyword_identical_QMARK_(inst_35727,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_35769__$1 = state_35769;
var statearr_35789_37019 = state_35769__$1;
(statearr_35789_37019[(2)] = inst_35738);

(statearr_35789_37019[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (5))){
var inst_35735 = (state_35769[(13)]);
var inst_35730 = (state_35769[(9)]);
var inst_35727 = (state_35769[(7)]);
var inst_35734 = (state_35769[(11)]);
var inst_35734__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_35730) : f.call(null,inst_35730));
var inst_35735__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_35734__$1,inst_35727);
var state_35769__$1 = (function (){var statearr_35790 = state_35769;
(statearr_35790[(13)] = inst_35735__$1);

(statearr_35790[(11)] = inst_35734__$1);

return statearr_35790;
})();
if(inst_35735__$1){
var statearr_35791_37020 = state_35769__$1;
(statearr_35791_37020[(1)] = (8));

} else {
var statearr_35792_37021 = state_35769__$1;
(statearr_35792_37021[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (14))){
var inst_35730 = (state_35769[(9)]);
var inst_35734 = (state_35769[(11)]);
var inst_35747 = (state_35769[(2)]);
var inst_35748 = [];
var inst_35749 = inst_35748.push(inst_35730);
var inst_35726 = inst_35748;
var inst_35727 = inst_35734;
var state_35769__$1 = (function (){var statearr_35793 = state_35769;
(statearr_35793[(7)] = inst_35727);

(statearr_35793[(14)] = inst_35749);

(statearr_35793[(8)] = inst_35726);

(statearr_35793[(15)] = inst_35747);

return statearr_35793;
})();
var statearr_35794_37029 = state_35769__$1;
(statearr_35794_37029[(2)] = null);

(statearr_35794_37029[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (16))){
var state_35769__$1 = state_35769;
var statearr_35795_37030 = state_35769__$1;
(statearr_35795_37030[(2)] = null);

(statearr_35795_37030[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (10))){
var inst_35740 = (state_35769[(2)]);
var state_35769__$1 = state_35769;
if(cljs.core.truth_(inst_35740)){
var statearr_35796_37037 = state_35769__$1;
(statearr_35796_37037[(1)] = (11));

} else {
var statearr_35797_37038 = state_35769__$1;
(statearr_35797_37038[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (18))){
var inst_35759 = (state_35769[(2)]);
var state_35769__$1 = state_35769;
var statearr_35805_37039 = state_35769__$1;
(statearr_35805_37039[(2)] = inst_35759);

(statearr_35805_37039[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_35770 === (8))){
var inst_35735 = (state_35769[(13)]);
var state_35769__$1 = state_35769;
var statearr_35806_37040 = state_35769__$1;
(statearr_35806_37040[(2)] = inst_35735);

(statearr_35806_37040[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__33262__auto__ = null;
var cljs$core$async$state_machine__33262__auto____0 = (function (){
var statearr_35808 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_35808[(0)] = cljs$core$async$state_machine__33262__auto__);

(statearr_35808[(1)] = (1));

return statearr_35808;
});
var cljs$core$async$state_machine__33262__auto____1 = (function (state_35769){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_35769);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e35809){var ex__33265__auto__ = e35809;
var statearr_35810_37041 = state_35769;
(statearr_35810_37041[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_35769[(4)]))){
var statearr_35811_37046 = state_35769;
(statearr_35811_37046[(1)] = cljs.core.first((state_35769[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__37047 = state_35769;
state_35769 = G__37047;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
cljs$core$async$state_machine__33262__auto__ = function(state_35769){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__33262__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__33262__auto____1.call(this,state_35769);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__33262__auto____0;
cljs$core$async$state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__33262__auto____1;
return cljs$core$async$state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_35821 = f__33629__auto__();
(statearr_35821[(6)] = c__33628__auto___37007);

return statearr_35821;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
