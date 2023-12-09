goog.provide('zero.impl.bindings');
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.bindings !== 'undefined') && (typeof zero.impl.bindings._BANG_stream_states !== 'undefined')){
} else {
zero.impl.bindings._BANG_stream_states = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof zero !== 'undefined') && (typeof zero.impl !== 'undefined') && (typeof zero.impl.bindings !== 'undefined') && (typeof zero.impl.bindings._BANG_stream_fns !== 'undefined')){
} else {
zero.impl.bindings._BANG_stream_fns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
zero.impl.bindings.kill_stream = (function zero$impl$bindings$kill_stream(stream_ident){
var map__38134_38596 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.impl.bindings._BANG_stream_states),stream_ident);
var map__38134_38597__$1 = cljs.core.__destructure_map(map__38134_38596);
var kill_ch_38598 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38134_38597__$1,new cljs.core.Keyword(null,"kill-ch","kill-ch",-809614734));
var kill_fn_38599 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38134_38597__$1,new cljs.core.Keyword(null,"kill-fn","kill-fn",-1857246264));
if(cljs.core.truth_(kill_ch_38598)){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(kill_ch_38598,true);
} else {
}

if(cljs.core.fn_QMARK_(kill_fn_38599)){
try{(kill_fn_38599.cljs$core$IFn$_invoke$arity$0 ? kill_fn_38599.cljs$core$IFn$_invoke$arity$0() : kill_fn_38599.call(null));
}catch (e38139){var e_38601 = e38139;
console.error("Error in stream cleanup fn",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream-key","stream-key",1286873546),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(stream_ident,(0)),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(stream_ident,(1))], null),e_38601);
}} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(zero.impl.bindings._BANG_stream_states,cljs.core.dissoc,stream_ident);
});
zero.impl.bindings.boot_stream = (function zero$impl$bindings$boot_stream(p__38145,new_watch){
var vec__38146 = p__38145;
var stream_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38146,(0),null);
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38146,(1),null);
var stream_ident = vec__38146;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.bindings._BANG_stream_states,cljs.core.assoc,stream_ident,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watches","watches",-273097535),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,new_watch)], null));

var c__33628__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__33629__auto__ = (function (){var switch__33261__auto__ = (function (state_38352){
var state_val_38353 = (state_38352[(1)]);
if((state_val_38353 === (7))){
var inst_38346 = (state_38352[(2)]);
var state_38352__$1 = (function (){var statearr_38357 = state_38352;
(statearr_38357[(7)] = inst_38346);

return statearr_38357;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_38352__$1,true);
} else {
if((state_val_38353 === (20))){
var inst_38236 = (state_38352[(8)]);
var inst_38285 = (state_38352[(9)]);
var inst_38285__$1 = cljs.core.seq(inst_38236);
var state_38352__$1 = (function (){var statearr_38358 = state_38352;
(statearr_38358[(9)] = inst_38285__$1);

return statearr_38358;
})();
if(inst_38285__$1){
var statearr_38359_38602 = state_38352__$1;
(statearr_38359_38602[(1)] = (26));

} else {
var statearr_38360_38603 = state_38352__$1;
(statearr_38360_38603[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (27))){
var state_38352__$1 = state_38352;
var statearr_38361_38605 = state_38352__$1;
(statearr_38361_38605[(2)] = null);

(statearr_38361_38605[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (1))){
var inst_38156 = (state_38352[(10)]);
var inst_38153 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var inst_38154 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var inst_38155 = cljs.core.deref(zero.impl.bindings._BANG_stream_fns);
var inst_38156__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38155,stream_key);
var state_38352__$1 = (function (){var statearr_38362 = state_38352;
(statearr_38362[(11)] = inst_38153);

(statearr_38362[(12)] = inst_38154);

(statearr_38362[(10)] = inst_38156__$1);

return statearr_38362;
})();
if(cljs.core.truth_(inst_38156__$1)){
var statearr_38363_38607 = state_38352__$1;
(statearr_38363_38607[(1)] = (2));

} else {
var statearr_38364_38608 = state_38352__$1;
(statearr_38364_38608[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (24))){
var inst_38266 = (state_38352[(2)]);
var inst_38267 = [new cljs.core.Keyword(null,"stream","stream",1534941648)];
var inst_38268 = [stream_ident];
var inst_38269 = cljs.core.PersistentHashMap.fromArrays(inst_38267,inst_38268);
var inst_38270 = console.error("Error in stream watcher",inst_38269,inst_38266);
var state_38352__$1 = state_38352;
var statearr_38365_38609 = state_38352__$1;
(statearr_38365_38609[(2)] = inst_38270);

(statearr_38365_38609[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (4))){
var inst_38153 = (state_38352[(11)]);
var inst_38154 = (state_38352[(12)]);
var inst_38165 = (state_38352[(2)]);
var inst_38166 = (function (){var _BANG_stream_ch = inst_38153;
var _BANG_kill_ch = inst_38154;
var stream_fn = inst_38165;
return (function (p1__38140_SHARP_){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(_BANG_stream_ch,(((!((p1__38140_SHARP_ == null))))?p1__38140_SHARP_:new cljs.core.Keyword("zero.impl.bindings","nil","zero.impl.bindings/nil",800369227)));
});
})();
var inst_38167 = cljs.core.PersistentHashMap.EMPTY;
var inst_38168 = zero.impl.injection.apply_injections(args,inst_38167);
var inst_38169 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(inst_38165,inst_38166,inst_38168);
var inst_38178 = [new cljs.core.Keyword(null,"kill-ch","kill-ch",-809614734),new cljs.core.Keyword(null,"kill-fn","kill-fn",-1857246264),new cljs.core.Keyword(null,"stream-ch","stream-ch",675603317)];
var inst_38179 = [inst_38154,inst_38169,inst_38153];
var inst_38180 = cljs.core.PersistentHashMap.fromArrays(inst_38178,inst_38179);
var inst_38181 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(zero.impl.bindings._BANG_stream_states,cljs.core.update,stream_ident,cljs.core.merge,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_38180], 0));
var inst_38189 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_38190 = [inst_38153,inst_38154];
var inst_38191 = (new cljs.core.PersistentVector(null,2,(5),inst_38189,inst_38190,null));
var state_38352__$1 = (function (){var statearr_38368 = state_38352;
(statearr_38368[(13)] = inst_38181);

return statearr_38368;
})();
return cljs.core.async.ioc_alts_BANG_(state_38352__$1,(5),inst_38191);
} else {
if((state_val_38353 === (15))){
var inst_38201 = (state_38352[(14)]);
var state_38352__$1 = state_38352;
var statearr_38369_38613 = state_38352__$1;
(statearr_38369_38613[(2)] = inst_38201);

(statearr_38369_38613[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (21))){
var inst_38330 = (state_38352[(2)]);
var state_38352__$1 = state_38352;
var statearr_38370_38614 = state_38352__$1;
(statearr_38370_38614[(2)] = inst_38330);

(statearr_38370_38614[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (31))){
var inst_38325 = (state_38352[(2)]);
var state_38352__$1 = state_38352;
var statearr_38371_38615 = state_38352__$1;
(statearr_38371_38615[(2)] = inst_38325);

(statearr_38371_38615[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (32))){
var inst_38304 = (state_38352[(15)]);
var inst_38225 = (state_38352[(16)]);
var inst_38221 = (state_38352[(17)]);
var inst_38303 = (state_38352[(18)]);
var inst_38305 = (state_38352[(19)]);
var _ = (function (){var statearr_38372 = state_38352;
(statearr_38372[(4)] = cljs.core.cons((35),(state_38352[(4)])));

return statearr_38372;
})();
var inst_38317 = (inst_38305.cljs$core$IFn$_invoke$arity$4 ? inst_38305.cljs$core$IFn$_invoke$arity$4(inst_38304,inst_38303,inst_38225,inst_38221) : inst_38305.call(null,inst_38304,inst_38303,inst_38225,inst_38221));
var ___$1 = (function (){var statearr_38373 = state_38352;
(statearr_38373[(4)] = cljs.core.rest((state_38352[(4)])));

return statearr_38373;
})();
var state_38352__$1 = state_38352;
var statearr_38374_38616 = state_38352__$1;
(statearr_38374_38616[(2)] = inst_38317);

(statearr_38374_38616[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (33))){
var inst_38285 = (state_38352[(9)]);
var inst_38320 = (state_38352[(2)]);
var inst_38322 = cljs.core.next(inst_38285);
var inst_38236 = inst_38322;
var inst_38237 = null;
var inst_38238 = (0);
var inst_38239 = (0);
var state_38352__$1 = (function (){var statearr_38375 = state_38352;
(statearr_38375[(8)] = inst_38236);

(statearr_38375[(20)] = inst_38238);

(statearr_38375[(21)] = inst_38239);

(statearr_38375[(22)] = inst_38237);

(statearr_38375[(23)] = inst_38320);

return statearr_38375;
})();
var statearr_38376_38617 = state_38352__$1;
(statearr_38376_38617[(2)] = null);

(statearr_38376_38617[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (13))){
var inst_38342 = (state_38352[(2)]);
var state_38352__$1 = state_38352;
var statearr_38377_38618 = state_38352__$1;
(statearr_38377_38618[(2)] = inst_38342);

(statearr_38377_38618[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (22))){
var inst_38225 = (state_38352[(16)]);
var inst_38257 = (state_38352[(24)]);
var inst_38221 = (state_38352[(17)]);
var inst_38253 = (state_38352[(25)]);
var inst_38265 = (state_38352[(26)]);
var _ = (function (){var statearr_38378 = state_38352;
(statearr_38378[(4)] = cljs.core.cons((25),(state_38352[(4)])));

return statearr_38378;
})();
var inst_38277 = (inst_38265.cljs$core$IFn$_invoke$arity$4 ? inst_38265.cljs$core$IFn$_invoke$arity$4(inst_38257,inst_38253,inst_38225,inst_38221) : inst_38265.call(null,inst_38257,inst_38253,inst_38225,inst_38221));
var ___$1 = (function (){var statearr_38379 = state_38352;
(statearr_38379[(4)] = cljs.core.rest((state_38352[(4)])));

return statearr_38379;
})();
var state_38352__$1 = state_38352;
var statearr_38380_38623 = state_38352__$1;
(statearr_38380_38623[(2)] = inst_38277);

(statearr_38380_38623[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (36))){
var inst_38338 = (state_38352[(2)]);
var inst_38196 = inst_38338;
var state_38352__$1 = (function (){var statearr_38381 = state_38352;
(statearr_38381[(27)] = inst_38196);

return statearr_38381;
})();
var statearr_38382_38625 = state_38352__$1;
(statearr_38382_38625[(2)] = null);

(statearr_38382_38625[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (29))){
var inst_38285 = (state_38352[(9)]);
var inst_38289 = cljs.core.chunk_first(inst_38285);
var inst_38290 = cljs.core.chunk_rest(inst_38285);
var inst_38291 = cljs.core.count(inst_38289);
var inst_38236 = inst_38290;
var inst_38237 = inst_38289;
var inst_38238 = inst_38291;
var inst_38239 = (0);
var state_38352__$1 = (function (){var statearr_38383 = state_38352;
(statearr_38383[(8)] = inst_38236);

(statearr_38383[(20)] = inst_38238);

(statearr_38383[(21)] = inst_38239);

(statearr_38383[(22)] = inst_38237);

return statearr_38383;
})();
var statearr_38384_38633 = state_38352__$1;
(statearr_38384_38633[(2)] = null);

(statearr_38384_38633[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (6))){
var inst_38196 = (state_38352[(27)]);
var inst_38154 = (state_38352[(12)]);
var inst_38201 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38196,(0),null);
var inst_38202 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38196,(1),null);
var inst_38203 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_38202,inst_38154);
var state_38352__$1 = (function (){var statearr_38387 = state_38352;
(statearr_38387[(14)] = inst_38201);

return statearr_38387;
})();
if(inst_38203){
var statearr_38388_38634 = state_38352__$1;
(statearr_38388_38634[(1)] = (8));

} else {
var statearr_38389_38635 = state_38352__$1;
(statearr_38389_38635[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (28))){
var inst_38328 = (state_38352[(2)]);
var state_38352__$1 = state_38352;
var statearr_38390_38636 = state_38352__$1;
(statearr_38390_38636[(2)] = inst_38328);

(statearr_38390_38636[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (25))){
var _ = (function (){var statearr_38391 = state_38352;
(statearr_38391[(4)] = cljs.core.rest((state_38352[(4)])));

return statearr_38391;
})();
var state_38352__$1 = state_38352;
var ex38386 = (state_38352__$1[(2)]);
var statearr_38392_38637 = state_38352__$1;
(statearr_38392_38637[(5)] = ex38386);


var statearr_38396_38641 = state_38352__$1;
(statearr_38396_38641[(1)] = (24));

(statearr_38396_38641[(5)] = null);



return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (34))){
var inst_38306 = (state_38352[(2)]);
var inst_38307 = [new cljs.core.Keyword(null,"stream","stream",1534941648)];
var inst_38308 = [stream_ident];
var inst_38309 = cljs.core.PersistentHashMap.fromArrays(inst_38307,inst_38308);
var inst_38310 = console.error("Error in stream watcher",inst_38309,inst_38306);
var state_38352__$1 = state_38352;
var statearr_38397_38642 = state_38352__$1;
(statearr_38397_38642[(2)] = inst_38310);

(statearr_38397_38642[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (17))){
var inst_38238 = (state_38352[(20)]);
var inst_38239 = (state_38352[(21)]);
var inst_38241 = (inst_38239 < inst_38238);
var inst_38242 = inst_38241;
var state_38352__$1 = state_38352;
if(cljs.core.truth_(inst_38242)){
var statearr_38398_38643 = state_38352__$1;
(statearr_38398_38643[(1)] = (19));

} else {
var statearr_38399_38644 = state_38352__$1;
(statearr_38399_38644[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (3))){
var inst_38159 = [new cljs.core.Keyword(null,"stream-key","stream-key",1286873546)];
var inst_38160 = [stream_key];
var inst_38161 = cljs.core.PersistentHashMap.fromArrays(inst_38159,inst_38160);
var inst_38162 = cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("No stream registered for key",inst_38161);
var inst_38163 = (function(){throw inst_38162})();
var state_38352__$1 = state_38352;
var statearr_38400_38645 = state_38352__$1;
(statearr_38400_38645[(2)] = inst_38163);

(statearr_38400_38645[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (12))){
var state_38352__$1 = state_38352;
var statearr_38404_38646 = state_38352__$1;
(statearr_38404_38646[(2)] = null);

(statearr_38404_38646[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (2))){
var inst_38156 = (state_38352[(10)]);
var state_38352__$1 = state_38352;
var statearr_38410_38647 = state_38352__$1;
(statearr_38410_38647[(2)] = inst_38156);

(statearr_38410_38647[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (23))){
var inst_38236 = (state_38352[(8)]);
var inst_38238 = (state_38352[(20)]);
var inst_38239 = (state_38352[(21)]);
var inst_38237 = (state_38352[(22)]);
var inst_38280 = (state_38352[(2)]);
var inst_38282 = (inst_38239 + (1));
var tmp38401 = inst_38236;
var tmp38402 = inst_38238;
var tmp38403 = inst_38237;
var inst_38236__$1 = tmp38401;
var inst_38237__$1 = tmp38403;
var inst_38238__$1 = tmp38402;
var inst_38239__$1 = inst_38282;
var state_38352__$1 = (function (){var statearr_38413 = state_38352;
(statearr_38413[(28)] = inst_38280);

(statearr_38413[(8)] = inst_38236__$1);

(statearr_38413[(20)] = inst_38238__$1);

(statearr_38413[(21)] = inst_38239__$1);

(statearr_38413[(22)] = inst_38237__$1);

return statearr_38413;
})();
var statearr_38418_38648 = state_38352__$1;
(statearr_38418_38648[(2)] = null);

(statearr_38418_38648[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (35))){
var _ = (function (){var statearr_38420 = state_38352;
(statearr_38420[(4)] = cljs.core.rest((state_38352[(4)])));

return statearr_38420;
})();
var state_38352__$1 = state_38352;
var ex38405 = (state_38352__$1[(2)]);
var statearr_38422_38649 = state_38352__$1;
(statearr_38422_38649[(5)] = ex38405);


var statearr_38427_38650 = state_38352__$1;
(statearr_38427_38650[(1)] = (34));

(statearr_38427_38650[(5)] = null);



return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (19))){
var inst_38239 = (state_38352[(21)]);
var inst_38237 = (state_38352[(22)]);
var inst_38250 = cljs.core._nth(inst_38237,inst_38239);
var inst_38252 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38250,(0),null);
var inst_38253 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38252,(0),null);
var inst_38257 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38252,(1),null);
var inst_38265 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38250,(1),null);
var state_38352__$1 = (function (){var statearr_38440 = state_38352;
(statearr_38440[(24)] = inst_38257);

(statearr_38440[(25)] = inst_38253);

(statearr_38440[(26)] = inst_38265);

return statearr_38440;
})();
var statearr_38441_38651 = state_38352__$1;
(statearr_38441_38651[(2)] = null);

(statearr_38441_38651[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (11))){
var inst_38201 = (state_38352[(14)]);
var inst_38217 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_38201,new cljs.core.Keyword("zero.impl.bindings","nil","zero.impl.bindings/nil",800369227));
var state_38352__$1 = state_38352;
if(inst_38217){
var statearr_38443_38652 = state_38352__$1;
(statearr_38443_38652[(1)] = (14));

} else {
var statearr_38447_38653 = state_38352__$1;
(statearr_38447_38653[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (9))){
var inst_38201 = (state_38352[(14)]);
var inst_38206 = (inst_38201 == null);
var inst_38207 = cljs.core.not(inst_38206);
var state_38352__$1 = state_38352;
if(inst_38207){
var statearr_38452_38654 = state_38352__$1;
(statearr_38452_38654[(1)] = (11));

} else {
var statearr_38453_38655 = state_38352__$1;
(statearr_38453_38655[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (5))){
var inst_38193 = (state_38352[(2)]);
var inst_38194 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38193,(0),null);
var inst_38195 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38193,(1),null);
var inst_38196 = inst_38193;
var state_38352__$1 = (function (){var statearr_38454 = state_38352;
(statearr_38454[(27)] = inst_38196);

(statearr_38454[(29)] = inst_38194);

(statearr_38454[(30)] = inst_38195);

return statearr_38454;
})();
var statearr_38455_38656 = state_38352__$1;
(statearr_38455_38656[(2)] = null);

(statearr_38455_38656[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (14))){
var state_38352__$1 = state_38352;
var statearr_38460_38657 = state_38352__$1;
(statearr_38460_38657[(2)] = null);

(statearr_38460_38657[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (26))){
var inst_38285 = (state_38352[(9)]);
var inst_38287 = cljs.core.chunked_seq_QMARK_(inst_38285);
var state_38352__$1 = state_38352;
if(inst_38287){
var statearr_38461_38658 = state_38352__$1;
(statearr_38461_38658[(1)] = (29));

} else {
var statearr_38463_38659 = state_38352__$1;
(statearr_38463_38659[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (16))){
var inst_38221 = (state_38352[(17)]);
var inst_38221__$1 = (state_38352[(2)]);
var inst_38222 = cljs.core.deref(zero.impl.bindings._BANG_stream_states);
var inst_38223 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38222,stream_ident);
var inst_38224 = cljs.core.__destructure_map(inst_38223);
var inst_38225 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38224,new cljs.core.Keyword(null,"current","current",-1088038603));
var inst_38226 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38224,new cljs.core.Keyword(null,"watches","watches",-273097535));
var inst_38227 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_38228 = [stream_ident,new cljs.core.Keyword(null,"current","current",-1088038603)];
var inst_38229 = (new cljs.core.PersistentVector(null,2,(5),inst_38227,inst_38228,null));
var inst_38230 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.bindings._BANG_stream_states,cljs.core.assoc_in,inst_38229,inst_38221__$1);
var inst_38235 = cljs.core.seq(inst_38226);
var inst_38236 = inst_38235;
var inst_38237 = null;
var inst_38238 = (0);
var inst_38239 = (0);
var state_38352__$1 = (function (){var statearr_38478 = state_38352;
(statearr_38478[(16)] = inst_38225);

(statearr_38478[(8)] = inst_38236);

(statearr_38478[(20)] = inst_38238);

(statearr_38478[(17)] = inst_38221__$1);

(statearr_38478[(21)] = inst_38239);

(statearr_38478[(22)] = inst_38237);

(statearr_38478[(31)] = inst_38230);

return statearr_38478;
})();
var statearr_38482_38666 = state_38352__$1;
(statearr_38482_38666[(2)] = null);

(statearr_38482_38666[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (30))){
var inst_38285 = (state_38352[(9)]);
var inst_38301 = cljs.core.first(inst_38285);
var inst_38302 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38301,(0),null);
var inst_38303 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38302,(0),null);
var inst_38304 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38302,(1),null);
var inst_38305 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38301,(1),null);
var state_38352__$1 = (function (){var statearr_38486 = state_38352;
(statearr_38486[(15)] = inst_38304);

(statearr_38486[(18)] = inst_38303);

(statearr_38486[(19)] = inst_38305);

return statearr_38486;
})();
var statearr_38487_38667 = state_38352__$1;
(statearr_38487_38667[(2)] = null);

(statearr_38487_38667[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (10))){
var inst_38344 = (state_38352[(2)]);
var state_38352__$1 = state_38352;
var statearr_38488_38668 = state_38352__$1;
(statearr_38488_38668[(2)] = inst_38344);

(statearr_38488_38668[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38353 === (18))){
var inst_38153 = (state_38352[(11)]);
var inst_38154 = (state_38352[(12)]);
var inst_38332 = (state_38352[(2)]);
var inst_38334 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_38335 = [inst_38153,inst_38154];
var inst_38336 = (new cljs.core.PersistentVector(null,2,(5),inst_38334,inst_38335,null));
var state_38352__$1 = (function (){var statearr_38489 = state_38352;
(statearr_38489[(32)] = inst_38332);

return statearr_38489;
})();
return cljs.core.async.ioc_alts_BANG_(state_38352__$1,(36),inst_38336);
} else {
if((state_val_38353 === (8))){
var state_38352__$1 = state_38352;
var statearr_38493_38669 = state_38352__$1;
(statearr_38493_38669[(2)] = null);

(statearr_38493_38669[(1)] = (10));


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
});
return (function() {
var zero$impl$bindings$boot_stream_$_state_machine__33262__auto__ = null;
var zero$impl$bindings$boot_stream_$_state_machine__33262__auto____0 = (function (){
var statearr_38495 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38495[(0)] = zero$impl$bindings$boot_stream_$_state_machine__33262__auto__);

(statearr_38495[(1)] = (1));

return statearr_38495;
});
var zero$impl$bindings$boot_stream_$_state_machine__33262__auto____1 = (function (state_38352){
while(true){
var ret_value__33263__auto__ = (function (){try{while(true){
var result__33264__auto__ = switch__33261__auto__(state_38352);
if(cljs.core.keyword_identical_QMARK_(result__33264__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__33264__auto__;
}
break;
}
}catch (e38496){var ex__33265__auto__ = e38496;
var statearr_38497_38670 = state_38352;
(statearr_38497_38670[(2)] = ex__33265__auto__);


if(cljs.core.seq((state_38352[(4)]))){
var statearr_38498_38671 = state_38352;
(statearr_38498_38671[(1)] = cljs.core.first((state_38352[(4)])));

} else {
throw ex__33265__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__33263__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__38672 = state_38352;
state_38352 = G__38672;
continue;
} else {
return ret_value__33263__auto__;
}
break;
}
});
zero$impl$bindings$boot_stream_$_state_machine__33262__auto__ = function(state_38352){
switch(arguments.length){
case 0:
return zero$impl$bindings$boot_stream_$_state_machine__33262__auto____0.call(this);
case 1:
return zero$impl$bindings$boot_stream_$_state_machine__33262__auto____1.call(this,state_38352);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
zero$impl$bindings$boot_stream_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$0 = zero$impl$bindings$boot_stream_$_state_machine__33262__auto____0;
zero$impl$bindings$boot_stream_$_state_machine__33262__auto__.cljs$core$IFn$_invoke$arity$1 = zero$impl$bindings$boot_stream_$_state_machine__33262__auto____1;
return zero$impl$bindings$boot_stream_$_state_machine__33262__auto__;
})()
})();
var state__33630__auto__ = (function (){var statearr_38500 = f__33629__auto__();
(statearr_38500[(6)] = c__33628__auto__);

return statearr_38500;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__33630__auto__);
}));

return c__33628__auto__;
});

/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
*/
zero.impl.bindings.Binding = (function (props,stream_key,args){
this.props = props;
this.stream_key = stream_key;
this.args = args;
this.cljs$lang$protocol_mask$partition0$ = 2153807872;
this.cljs$lang$protocol_mask$partition1$ = 2;
});
(zero.impl.bindings.Binding.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_this){
var self__ = this;
var _this__$1 = this;
var v = cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(zero.impl.bindings._BANG_stream_states),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.stream_key,self__.args], null),new cljs.core.Keyword(null,"current","current",-1088038603)], null),new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(self__.props));
if(cljs.core.truth_((function (){var and__5043__auto__ = new cljs.core.Keyword(null,"default-nil?","default-nil?",-308873063).cljs$core$IFn$_invoke$arity$1(self__.props);
if(cljs.core.truth_(and__5043__auto__)){
return (v == null);
} else {
return and__5043__auto__;
}
})())){
return new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(self__.props);
} else {
return v;
}
}));

(zero.impl.bindings.Binding.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var self__ = this;
var this$__$1 = this;
var actual_fun = (cljs.core.truth_(new cljs.core.Keyword(null,"default-nil?","default-nil?",-308873063).cljs$core$IFn$_invoke$arity$1(self__.props))?(function (ref,key__$1,old_val,new_val){
var G__38506 = ref;
var G__38507 = key__$1;
var G__38508 = old_val;
var G__38509 = (((new_val == null))?new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(self__.props):new_val);
return (f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(G__38506,G__38507,G__38508,G__38509) : f.call(null,G__38506,G__38507,G__38508,G__38509));
}):f);
if((cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.impl.bindings._BANG_stream_states),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.stream_key,self__.args], null)) == null)){
return zero.impl.bindings.boot_stream(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.stream_key,self__.args], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1,key], null),actual_fun], null));
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.bindings._BANG_stream_states,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.stream_key,self__.args], null),new cljs.core.Keyword(null,"watches","watches",-273097535),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1,key], null)], null),actual_fun);
}
}));

(zero.impl.bindings.Binding.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
var old_watches = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(zero.impl.bindings._BANG_stream_states),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.stream_key,self__.args], null),new cljs.core.Keyword(null,"watches","watches",-273097535)], null));
var new_watches = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(old_watches,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1,key], null));
if(cljs.core.empty_QMARK_(new_watches)){
return zero.impl.bindings.kill_stream(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.stream_key,self__.args], null));
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.bindings._BANG_stream_states,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.stream_key,self__.args], null),new cljs.core.Keyword(null,"watches","watches",-273097535)], null),new_watches);
}
}));

(zero.impl.bindings.Binding.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_this,other){
var self__ = this;
var _this__$1 = this;
return (((other instanceof zero.impl.bindings.Binding)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.stream_key,other.stream_key)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.args,other.args)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.props,other.props)))))));
}));

(zero.impl.bindings.Binding.prototype.cljs$core$IHash$_hash$arity$1 = (function (_this){
var self__ = this;
var _this__$1 = this;
return cljs.core.hash(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.props,self__.stream_key,self__.args], null));
}));

(zero.impl.bindings.Binding.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (_this,writer,opts){
var self__ = this;
var _this__$1 = this;
return cljs.core._write(writer,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"bnd","bnd",1840226349,null)], null),((cljs.core.seq(self__.props))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.props], null):null),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([self__.args], 0))], 0)));
}));

(zero.impl.bindings.Binding.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"props","props",2093813254,null),new cljs.core.Symbol(null,"stream-key","stream-key",-1367562223,null),new cljs.core.Symbol(null,"args","args",-1338879193,null)], null);
}));

(zero.impl.bindings.Binding.cljs$lang$type = true);

(zero.impl.bindings.Binding.cljs$lang$ctorStr = "zero.impl.bindings/Binding");

(zero.impl.bindings.Binding.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"zero.impl.bindings/Binding");
}));

/**
 * Positional factory function for zero.impl.bindings/Binding.
 */
zero.impl.bindings.__GT_Binding = (function zero$impl$bindings$__GT_Binding(props,stream_key,args){
return (new zero.impl.bindings.Binding(props,stream_key,args));
});

zero.impl.bindings.reg_stream = (function zero$impl$bindings$reg_stream(stream_key,f){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.bindings._BANG_stream_fns,cljs.core.assoc,stream_key,f);

var seq__38533 = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__38531_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(stream_key,cljs.core.first(cljs.core.key(p1__38531_SHARP_)));
}),cljs.core.deref(zero.impl.bindings._BANG_stream_states)));
var chunk__38534 = null;
var count__38535 = (0);
var i__38536 = (0);
while(true){
if((i__38536 < count__38535)){
var vec__38571 = chunk__38534.cljs$core$IIndexed$_nth$arity$2(null,i__38536);
var vec__38575 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38571,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38575,(0),null);
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38575,(1),null);
var stream_ident = vec__38575;
var map__38580 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38571,(1),null);
var map__38580__$1 = cljs.core.__destructure_map(map__38580);
var _BANG_stream_ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38580__$1,new cljs.core.Keyword(null,"stream-ch","stream-ch",675603317));
var kill_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38580__$1,new cljs.core.Keyword(null,"kill-fn","kill-fn",-1857246264));
if(cljs.core.fn_QMARK_(kill_fn)){
try{(kill_fn.cljs$core$IFn$_invoke$arity$0 ? kill_fn.cljs$core$IFn$_invoke$arity$0() : kill_fn.call(null));
}catch (e38581){var e_38697 = e38581;
console.error("Error in stream cleanup fn",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream-key","stream-key",1286873546),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(stream_ident,(0)),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(stream_ident,(1))], null),e_38697);
}} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.bindings._BANG_stream_states,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [stream_ident,new cljs.core.Keyword(null,"kill-fn","kill-fn",-1857246264)], null),cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,((function (seq__38533,chunk__38534,count__38535,i__38536,vec__38571,vec__38575,_,args,stream_ident,map__38580,map__38580__$1,_BANG_stream_ch,kill_fn){
return (function (p1__38532_SHARP_){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(_BANG_stream_ch,(((!((p1__38532_SHARP_ == null))))?p1__38532_SHARP_:new cljs.core.Keyword("zero.impl.bindings","nil","zero.impl.bindings/nil",800369227)));
});})(seq__38533,chunk__38534,count__38535,i__38536,vec__38571,vec__38575,_,args,stream_ident,map__38580,map__38580__$1,_BANG_stream_ch,kill_fn))
,zero.impl.injection.apply_injections(args,cljs.core.PersistentArrayMap.EMPTY)));


var G__38703 = seq__38533;
var G__38704 = chunk__38534;
var G__38705 = count__38535;
var G__38706 = (i__38536 + (1));
seq__38533 = G__38703;
chunk__38534 = G__38704;
count__38535 = G__38705;
i__38536 = G__38706;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__38533);
if(temp__5804__auto__){
var seq__38533__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__38533__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__38533__$1);
var G__38712 = cljs.core.chunk_rest(seq__38533__$1);
var G__38713 = c__5568__auto__;
var G__38714 = cljs.core.count(c__5568__auto__);
var G__38715 = (0);
seq__38533 = G__38712;
chunk__38534 = G__38713;
count__38535 = G__38714;
i__38536 = G__38715;
continue;
} else {
var vec__38583 = cljs.core.first(seq__38533__$1);
var vec__38586 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38583,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38586,(0),null);
var args = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38586,(1),null);
var stream_ident = vec__38586;
var map__38589 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38583,(1),null);
var map__38589__$1 = cljs.core.__destructure_map(map__38589);
var _BANG_stream_ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38589__$1,new cljs.core.Keyword(null,"stream-ch","stream-ch",675603317));
var kill_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38589__$1,new cljs.core.Keyword(null,"kill-fn","kill-fn",-1857246264));
if(cljs.core.fn_QMARK_(kill_fn)){
try{(kill_fn.cljs$core$IFn$_invoke$arity$0 ? kill_fn.cljs$core$IFn$_invoke$arity$0() : kill_fn.call(null));
}catch (e38590){var e_38721 = e38590;
console.error("Error in stream cleanup fn",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream-key","stream-key",1286873546),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(stream_ident,(0)),new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(stream_ident,(1))], null),e_38721);
}} else {
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(zero.impl.bindings._BANG_stream_states,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [stream_ident,new cljs.core.Keyword(null,"kill-fn","kill-fn",-1857246264)], null),cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,((function (seq__38533,chunk__38534,count__38535,i__38536,vec__38583,vec__38586,_,args,stream_ident,map__38589,map__38589__$1,_BANG_stream_ch,kill_fn,seq__38533__$1,temp__5804__auto__){
return (function (p1__38532_SHARP_){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(_BANG_stream_ch,(((!((p1__38532_SHARP_ == null))))?p1__38532_SHARP_:new cljs.core.Keyword("zero.impl.bindings","nil","zero.impl.bindings/nil",800369227)));
});})(seq__38533,chunk__38534,count__38535,i__38536,vec__38583,vec__38586,_,args,stream_ident,map__38589,map__38589__$1,_BANG_stream_ch,kill_fn,seq__38533__$1,temp__5804__auto__))
,zero.impl.injection.apply_injections(args,cljs.core.PersistentArrayMap.EMPTY)));


var G__38723 = cljs.core.next(seq__38533__$1);
var G__38724 = null;
var G__38725 = (0);
var G__38726 = (0);
seq__38533 = G__38723;
chunk__38534 = G__38724;
count__38535 = G__38725;
i__38536 = G__38726;
continue;
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=zero.impl.bindings.js.map
