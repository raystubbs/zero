goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__36511){
var map__36513 = p__36511;
var map__36513__$1 = cljs.core.__destructure_map(map__36513);
var m = map__36513__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36513__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36513__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5045__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return [(function (){var temp__5804__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__36521_36695 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__36522_36696 = null;
var count__36523_36697 = (0);
var i__36524_36698 = (0);
while(true){
if((i__36524_36698 < count__36523_36697)){
var f_36699 = chunk__36522_36696.cljs$core$IIndexed$_nth$arity$2(null,i__36524_36698);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_36699], 0));


var G__36700 = seq__36521_36695;
var G__36701 = chunk__36522_36696;
var G__36702 = count__36523_36697;
var G__36703 = (i__36524_36698 + (1));
seq__36521_36695 = G__36700;
chunk__36522_36696 = G__36701;
count__36523_36697 = G__36702;
i__36524_36698 = G__36703;
continue;
} else {
var temp__5804__auto___36708 = cljs.core.seq(seq__36521_36695);
if(temp__5804__auto___36708){
var seq__36521_36709__$1 = temp__5804__auto___36708;
if(cljs.core.chunked_seq_QMARK_(seq__36521_36709__$1)){
var c__5568__auto___36710 = cljs.core.chunk_first(seq__36521_36709__$1);
var G__36711 = cljs.core.chunk_rest(seq__36521_36709__$1);
var G__36712 = c__5568__auto___36710;
var G__36713 = cljs.core.count(c__5568__auto___36710);
var G__36714 = (0);
seq__36521_36695 = G__36711;
chunk__36522_36696 = G__36712;
count__36523_36697 = G__36713;
i__36524_36698 = G__36714;
continue;
} else {
var f_36720 = cljs.core.first(seq__36521_36709__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_36720], 0));


var G__36730 = cljs.core.next(seq__36521_36709__$1);
var G__36731 = null;
var G__36732 = (0);
var G__36733 = (0);
seq__36521_36695 = G__36730;
chunk__36522_36696 = G__36731;
count__36523_36697 = G__36732;
i__36524_36698 = G__36733;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_36735 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_36735], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_36735)))?cljs.core.second(arglists_36735):arglists_36735)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__36531_36751 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__36532_36752 = null;
var count__36533_36753 = (0);
var i__36534_36754 = (0);
while(true){
if((i__36534_36754 < count__36533_36753)){
var vec__36543_36755 = chunk__36532_36752.cljs$core$IIndexed$_nth$arity$2(null,i__36534_36754);
var name_36756 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36543_36755,(0),null);
var map__36546_36757 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36543_36755,(1),null);
var map__36546_36758__$1 = cljs.core.__destructure_map(map__36546_36757);
var doc_36759 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36546_36758__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_36760 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36546_36758__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_36756], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_36760], 0));

if(cljs.core.truth_(doc_36759)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_36759], 0));
} else {
}


var G__36763 = seq__36531_36751;
var G__36764 = chunk__36532_36752;
var G__36765 = count__36533_36753;
var G__36766 = (i__36534_36754 + (1));
seq__36531_36751 = G__36763;
chunk__36532_36752 = G__36764;
count__36533_36753 = G__36765;
i__36534_36754 = G__36766;
continue;
} else {
var temp__5804__auto___36768 = cljs.core.seq(seq__36531_36751);
if(temp__5804__auto___36768){
var seq__36531_36769__$1 = temp__5804__auto___36768;
if(cljs.core.chunked_seq_QMARK_(seq__36531_36769__$1)){
var c__5568__auto___36770 = cljs.core.chunk_first(seq__36531_36769__$1);
var G__36771 = cljs.core.chunk_rest(seq__36531_36769__$1);
var G__36772 = c__5568__auto___36770;
var G__36773 = cljs.core.count(c__5568__auto___36770);
var G__36774 = (0);
seq__36531_36751 = G__36771;
chunk__36532_36752 = G__36772;
count__36533_36753 = G__36773;
i__36534_36754 = G__36774;
continue;
} else {
var vec__36547_36775 = cljs.core.first(seq__36531_36769__$1);
var name_36776 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36547_36775,(0),null);
var map__36550_36777 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36547_36775,(1),null);
var map__36550_36778__$1 = cljs.core.__destructure_map(map__36550_36777);
var doc_36779 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36550_36778__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_36780 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36550_36778__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_36776], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_36780], 0));

if(cljs.core.truth_(doc_36779)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_36779], 0));
} else {
}


var G__36796 = cljs.core.next(seq__36531_36769__$1);
var G__36797 = null;
var G__36798 = (0);
var G__36799 = (0);
seq__36531_36751 = G__36796;
chunk__36532_36752 = G__36797;
count__36533_36753 = G__36798;
i__36534_36754 = G__36799;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5804__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5804__auto__)){
var fnspec = temp__5804__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__36551 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__36552 = null;
var count__36553 = (0);
var i__36554 = (0);
while(true){
if((i__36554 < count__36553)){
var role = chunk__36552.cljs$core$IIndexed$_nth$arity$2(null,i__36554);
var temp__5804__auto___36805__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___36805__$1)){
var spec_36811 = temp__5804__auto___36805__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_36811)], 0));
} else {
}


var G__36815 = seq__36551;
var G__36816 = chunk__36552;
var G__36817 = count__36553;
var G__36818 = (i__36554 + (1));
seq__36551 = G__36815;
chunk__36552 = G__36816;
count__36553 = G__36817;
i__36554 = G__36818;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__36551);
if(temp__5804__auto____$1){
var seq__36551__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__36551__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__36551__$1);
var G__36833 = cljs.core.chunk_rest(seq__36551__$1);
var G__36834 = c__5568__auto__;
var G__36835 = cljs.core.count(c__5568__auto__);
var G__36836 = (0);
seq__36551 = G__36833;
chunk__36552 = G__36834;
count__36553 = G__36835;
i__36554 = G__36836;
continue;
} else {
var role = cljs.core.first(seq__36551__$1);
var temp__5804__auto___36838__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___36838__$2)){
var spec_36839 = temp__5804__auto___36838__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_36839)], 0));
} else {
}


var G__36843 = cljs.core.next(seq__36551__$1);
var G__36844 = null;
var G__36845 = (0);
var G__36846 = (0);
seq__36551 = G__36843;
chunk__36552 = G__36844;
count__36553 = G__36845;
i__36554 = G__36846;
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
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",t.name):null
))], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(t);
if(cljs.core.truth_(temp__5804__auto__)){
var msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(t);
if(cljs.core.truth_(temp__5804__auto__)){
var ed = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})()], 0));
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__36863 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,t);
var G__36864 = cljs.core.ex_cause(t);
via = G__36863;
t = G__36864;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek(via);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(root);
if(cljs.core.truth_(temp__5804__auto__)){
var root_msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(root);
if(cljs.core.truth_(temp__5804__auto__)){
var data = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(o));
if(cljs.core.truth_(temp__5804__auto__)){
var phase = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})()], 0));
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__36563 = datafied_throwable;
var map__36563__$1 = cljs.core.__destructure_map(map__36563);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36563__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36563__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__36563__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__36564 = cljs.core.last(via);
var map__36564__$1 = cljs.core.__destructure_map(map__36564);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36564__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36564__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36564__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__36565 = data;
var map__36565__$1 = cljs.core.__destructure_map(map__36565);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36565__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36565__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36565__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__36566 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__36566__$1 = cljs.core.__destructure_map(map__36566);
var top_data = map__36566__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36566__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__36567 = phase;
var G__36567__$1 = (((G__36567 instanceof cljs.core.Keyword))?G__36567.fqn:null);
switch (G__36567__$1) {
case "read-source":
var map__36568 = data;
var map__36568__$1 = cljs.core.__destructure_map(map__36568);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36568__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36568__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__36570 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__36570__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36570,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__36570);
var G__36570__$2 = (cljs.core.truth_((function (){var fexpr__36572 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__36572.cljs$core$IFn$_invoke$arity$1 ? fexpr__36572.cljs$core$IFn$_invoke$arity$1(source) : fexpr__36572.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__36570__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__36570__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36570__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__36570__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__36574 = top_data;
var G__36574__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36574,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__36574);
var G__36574__$2 = (cljs.core.truth_((function (){var fexpr__36578 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__36578.cljs$core$IFn$_invoke$arity$1 ? fexpr__36578.cljs$core$IFn$_invoke$arity$1(source) : fexpr__36578.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__36574__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__36574__$1);
var G__36574__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36574__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__36574__$2);
var G__36574__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36574__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__36574__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36574__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__36574__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__36586 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36586,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36586,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36586,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36586,(3),null);
var G__36591 = top_data;
var G__36591__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36591,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__36591);
var G__36591__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36591__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__36591__$1);
var G__36591__$3 = (cljs.core.truth_((function (){var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36591__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__36591__$2);
var G__36591__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36591__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__36591__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36591__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__36591__$4;
}

break;
case "execution":
var vec__36600 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36600,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36600,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36600,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36600,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__36561_SHARP_){
var or__5045__auto__ = (p1__36561_SHARP_ == null);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var fexpr__36607 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__36607.cljs$core$IFn$_invoke$arity$1 ? fexpr__36607.cljs$core$IFn$_invoke$arity$1(p1__36561_SHARP_) : fexpr__36607.call(null,p1__36561_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return line;
}
})();
var G__36609 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__36609__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36609,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__36609);
var G__36609__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36609__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__36609__$1);
var G__36609__$3 = (cljs.core.truth_((function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36609__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__36609__$2);
var G__36609__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36609__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__36609__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__36609__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__36609__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__36567__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__36631){
var map__36632 = p__36631;
var map__36632__$1 = cljs.core.__destructure_map(map__36632);
var triage_data = map__36632__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36632__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36632__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36632__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36632__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36632__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36632__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36632__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36632__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = source;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = line;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5045__auto__ = class$;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__36639 = phase;
var G__36639__$1 = (((G__36639 instanceof cljs.core.Keyword))?G__36639.fqn:null);
switch (G__36639__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__36640 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__36641 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__36642 = loc;
var G__36643 = (cljs.core.truth_(spec)?(function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__36644_36941 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__36645_36942 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__36646_36943 = true;
var _STAR_print_fn_STAR__temp_val__36647_36944 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__36646_36943);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__36647_36944);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__36620_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__36620_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__36645_36942);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__36644_36941);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__36640,G__36641,G__36642,G__36643) : format.call(null,G__36640,G__36641,G__36642,G__36643));

break;
case "macroexpansion":
var G__36654 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__36655 = cause_type;
var G__36656 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__36657 = loc;
var G__36658 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__36654,G__36655,G__36656,G__36657,G__36658) : format.call(null,G__36654,G__36655,G__36656,G__36657,G__36658));

break;
case "compile-syntax-check":
var G__36659 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__36660 = cause_type;
var G__36661 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__36662 = loc;
var G__36663 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__36659,G__36660,G__36661,G__36662,G__36663) : format.call(null,G__36659,G__36660,G__36661,G__36662,G__36663));

break;
case "compilation":
var G__36664 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__36665 = cause_type;
var G__36666 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__36667 = loc;
var G__36668 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__36664,G__36665,G__36666,G__36667,G__36668) : format.call(null,G__36664,G__36665,G__36666,G__36667,G__36668));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__36669 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__36670 = symbol;
var G__36671 = loc;
var G__36672 = (function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__36673_36953 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__36674_36954 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__36675_36955 = true;
var _STAR_print_fn_STAR__temp_val__36676_36956 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__36675_36955);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__36676_36956);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__36621_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__36621_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__36674_36954);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__36673_36953);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__36669,G__36670,G__36671,G__36672) : format.call(null,G__36669,G__36670,G__36671,G__36672));
} else {
var G__36677 = "Execution error%s at %s(%s).\n%s\n";
var G__36678 = cause_type;
var G__36679 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__36680 = loc;
var G__36681 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__36677,G__36678,G__36679,G__36680,G__36681) : format.call(null,G__36677,G__36678,G__36679,G__36680,G__36681));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__36639__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
