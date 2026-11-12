'use strict';
/* Chart Riders web demo v3.1
   Ported from the iOS app source:
   - game rules  ← lib/game/game_controller.dart
   - chart       ← lib/widgets/candle_chart.dart
   - game screen ← lib/main.dart (HUD, status line, race track, finish card, poses, pause)
   Web-only additions: first-round tutorial, result/install screen, share. */

const D=window.CHART_RIDERS_I18N, CFG=window.CHART_RIDERS_CONFIG||{};
const $=id=>document.getElementById(id);

/* ---------- constants (game_controller.dart) ---------- */
const HISTORY_DAYS=30, PLAY_DAYS=90, TOTAL=HISTORY_DAYS+PLAY_DAYS;
const TICKS_PER_CANDLE=9, STEPS_PER_SEGMENT=3;
const FRAME_MS=16, TICKS_PER_FRAME=2;
const HISTORY_TICK_MS=Math.max(1,Math.floor(5000/(HISTORY_DAYS*TICKS_PER_CANDLE)));   // 18 ms
const MAX_DT=50;
const START_BALANCE=10000;
const STOCKS=[   // names as the app shows them (manifest nameEn), all NASDAQ
 {name:'Apple Inc.',ticker:'AAPL',market:'NASDAQ'},
 {name:'NVIDIA Corporation',ticker:'NVDA',market:'NASDAQ'},
 {name:'Tesla, Inc.',ticker:'TSLA',market:'NASDAQ'}];
const COLOR={buy:'#4FBA8A',sell:'#D9697D',warning:'#E8B33D',text:'#F5F5F7',secondary:'#98989F'};

/* phase: intro (tutorial) → preRace → racing → holding → finished → result (web screen) */
const G={lang:'en',phase:'intro',paused:false,watching:false,stock:null,candles:[],completed:[],partial:null,
 candleIndex:0,tickIndex:0,ticks:[],currentPrice:0,startCountdown:5,balance:START_BALANCE,roundStart:START_BALANCE,
 buyPrice:null,sellPrice:null,autoSold:false,elapsed:0,acc:0,last:0,raf:0,firstRun:true,pose:null,poseTimer:0,
 modalAction:null,spinTimer:0};

/* ---------- helpers ---------- */
const t=(key,vars)=>{let s=(D[G.lang]||D.en)[key]??D.en[key]??key;if(vars)for(const k in vars)s=s.replace('{'+k+'}',vars[k]);return s;};
const money=v=>(v<0?'-':'')+'$'+Math.abs(v).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',');   // main.dart _money
const pct=v=>(v>0?'+':'')+v.toFixed(2)+'%';                                                     // main.dart _pct
const returnColor=v=>v>0?COLOR.buy:v<0?COLOR.sell:COLOR.text;
const roundPnl=()=>G.balance-G.roundStart;
const roundPct=()=>G.roundStart?roundPnl()/G.roundStart*100:0;
const runPct=()=>(G.balance/START_BALANCE-1)*100;
const liveReturnPct=()=>G.buyPrice==null||G.currentPrice<=0?0:(G.currentPrice/G.buyPrice-1)*100;
const traded=()=>G.buyPrice!=null&&G.sellPrice!=null;
function detectOS(){
 const ua=navigator.userAgent||'';
 if(/android/i.test(ua))return 'android';
 if(/iphone|ipad|ipod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))return 'ios';
 return 'other';
}

/* ---------- round setup (resetRound) ---------- */
function resetRound(){
 stopLoop();
 G.stock=STOCKS[Math.floor(Math.random()*STOCKS.length)];
 const windows=(window.CHART_RIDERS_HISTORY||{})[G.stock.ticker]||[];
 if(!windows.length)throw Error('Historical data missing: '+G.stock.ticker);
 G.candles=windows[Math.floor(Math.random()*windows.length)];
 Object.assign(G,{watching:false,completed:[],partial:null,candleIndex:0,tickIndex:0,ticks:[],startCountdown:5,
  balance:START_BALANCE,roundStart:START_BALANCE,buyPrice:null,sellPrice:null,buyIndex:null,sellIndex:null,autoSold:false,paused:false,elapsed:0,acc:0,pose:null});
 G.currentPrice=G.candles[0].o;
 chart.reset();
 hideFinish();
 render();
}

/* ---------- tick engine (_prepareCurrentCandleTicks / _advanceTick) ---------- */
function prepareCurrentCandleTicks(){
 const c=G.candles[G.candleIndex];
 const ext=Math.random()<.5?[c.h,c.l]:[c.l,c.h],path=[c.o,ext[0],ext[1],c.c];
 G.ticks=[];
 for(let i=0;i<path.length-1;i++)for(let s=1;s<=STEPS_PER_SEGMENT;s++)G.ticks.push(path[i]+(path[i+1]-path[i])*s/STEPS_PER_SEGMENT);
 G.tickIndex=0;G.currentPrice=c.o;
 G.partial={date:c.date,o:c.o,h:c.o,l:c.o,c:c.o,v:c.v};
}
function advanceTick(isHistory){
 if(G.paused||G.candleIndex>=G.candles.length||G.tickIndex>=G.ticks.length)return;
 const src=G.candles[G.candleIndex],price=G.ticks[G.tickIndex],prev=G.partial||src;
 G.currentPrice=price;
 G.partial={date:src.date,o:src.o,h:Math.max(prev.h,price),l:Math.min(prev.l,price),c:price,v:src.v};
 G.tickIndex++;
 if(G.tickIndex>=G.ticks.length){
  G.completed.push(src);G.partial=null;G.candleIndex++;   // exact original candle replaces the animation
  if(isHistory&&G.candleIndex>=HISTORY_DAYS){startRace();return;}
  if(!isHistory&&G.candleIndex>=TOTAL){finishAtEnd();return;}
  if(G.candleIndex<G.candles.length)prepareCurrentCandleTicks();
 }
}

/* ---------- loop: Timer.periodic equivalents driven by requestAnimationFrame ---------- */
function loop(now){
 const dt=Math.min(now-G.last,MAX_DT);G.last=now;
 if(!G.paused){
  if(G.phase==='preRace'){
   G.elapsed+=dt;G.acc+=dt;
   G.startCountdown=Math.max(0,5-Math.floor(G.elapsed/1000));
   while(G.acc>=HISTORY_TICK_MS&&G.phase==='preRace'){G.acc-=HISTORY_TICK_MS;advanceTick(true);}
  }else if(G.phase==='racing'||G.phase==='holding'||G.watching){
   G.acc+=dt;
   while(G.acc>=FRAME_MS&&(G.phase==='racing'||G.phase==='holding'||G.watching)){
    G.acc-=FRAME_MS;
    for(let i=0;i<TICKS_PER_FRAME;i++){
     if(G.phase!=='racing'&&G.phase!=='holding'&&!G.watching)break;
     advanceTick(false);
    }
   }
  }
 }
 render();
 if(isRunning())G.raf=requestAnimationFrame(loop);else G.raf=0;
}
const isRunning=()=>G.phase==='preRace'||G.phase==='racing'||G.phase==='holding'||G.watching;
function startLoop(){if(G.raf)cancelAnimationFrame(G.raf);G.last=performance.now();G.raf=requestAnimationFrame(loop);}
function stopLoop(){if(G.raf)cancelAnimationFrame(G.raf);G.raf=0;}

/* ---------- game actions ---------- */
function startPreRace(){
 hideModal();
 G.phase='preRace';G.elapsed=0;G.acc=0;G.startCountdown=5;
 prepareCurrentCandleTicks();
 startLoop();
}
function startRace(){
 G.phase='racing';G.startCountdown=0;G.candleIndex=HISTORY_DAYS;G.acc=0;
 prepareCurrentCandleTicks();
}
function buy(){
 if(G.phase!=='racing')return;
 G.buyPrice=G.currentPrice;G.buyIndex=G.candleIndex;G.phase='holding';
 render();
 if(G.firstRun){   // web tutorial, first round only; the game is frozen while it is open
  G.paused=true;
  showModal('bought','instruction2','continue',()=>{hideModal();G.paused=false;G.last=performance.now();});
 }
}
function sell(automatic=false){
 if(G.phase!=='holding'||G.buyPrice==null)return;
 G.sellPrice=G.currentPrice;G.sellIndex=Math.min(G.candleIndex,TOTAL-1);G.autoSold=automatic;
 G.balance*=G.sellPrice/G.buyPrice;
 if(!automatic)showPose('sell_closeup',520);
 finishRound(!automatic);
}
function finishAtEnd(){
 if(G.phase==='finished'){G.watching=false;return;}   // post-sell playback reached the end
 if(G.phase==='holding')sell(true);else finishRound(false);
}
function finishRound(continueChart){
 G.watching=continueChart&&G.candleIndex<G.candles.length;
 G.phase='finished';
 showFinish();
}
function stopPostSellPlayback(){G.watching=false;}

/* ---------- pause (app lifecycle → manual resume) ---------- */
function pause(){
 if(G.paused||!isRunning())return;
 G.paused=true;$('pauseOverlay').classList.remove('hide');
}
function resume(){
 $('pauseOverlay').classList.add('hide');
 if(!G.paused)return;
 G.paused=false;G.last=performance.now();
}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&$('overlay').classList.contains('hide'))pause();});

/* ---------- character pose (main.dart _characterAsset) ---------- */
function resultPose(){return roundPnl()>0?'profit_closeup':roundPnl()<0?'loss_closeup':'ready_closeup';}
function poseAsset(){
 if(G.pose)return G.pose;
 if(G.phase==='holding')return 'buy_closeup';
 if(G.phase==='finished'||G.phase==='result')return roundPnl()>0?'profit_closeup':roundPnl()<0?'loss_closeup':'ready_closeup';
 return 'ready_closeup';
}
function showPose(asset,ms){clearTimeout(G.poseTimer);G.pose=asset;G.poseTimer=setTimeout(()=>{G.pose=null;render();},ms);}

/* ---------- HUD ---------- */
function raceProgress(){
 if(G.phase==='preRace'||G.phase==='intro')return 0;
 const done=Math.max(0,G.candleIndex-HISTORY_DAYS),part=G.ticks.length?G.tickIndex/TICKS_PER_CANDLE:0;
 return Math.min(1,Math.max(0,(done+part)/PLAY_DAYS));
}
function playDay(){return G.candleIndex<HISTORY_DAYS?0:Math.min(PLAY_DAYS,G.candleIndex-HISTORY_DAYS+1);}
function remainingPlayMs(){
 let ticks;
 if(G.candleIndex<HISTORY_DAYS)ticks=PLAY_DAYS*TICKS_PER_CANDLE;
 else ticks=Math.max(0,PLAY_DAYS-(G.candleIndex-HISTORY_DAYS)-1)*TICKS_PER_CANDLE+Math.max(0,TICKS_PER_CANDLE-G.tickIndex);
 return Math.ceil(ticks/TICKS_PER_FRAME)*FRAME_MS;
}
function finalWarningSeconds(){
 if(G.phase!=='racing'&&G.phase!=='holding')return 0;
 const ms=remainingPlayMs();
 return ms<=0||ms>5000?0:Math.max(1,Math.ceil(ms/1000));
}
function statusLine(){
 const s=finalWarningSeconds();
 if(s>0)return [t(G.phase==='holding'?'autoSellIn':'raceEndsIn',{seconds:s}),COLOR.warning];
 switch(G.phase){
  case 'intro':case 'preRace':return [t('startsIn',{seconds:G.startCountdown}),COLOR.secondary];
  case 'racing':return [t('chooseBuy'),COLOR.secondary];
  case 'holding':return [t('holding',{pct:pct(liveReturnPct())}),returnColor(liveReturnPct())];
  default:return [t('sDone'),COLOR.secondary];
 }
}
let lastPose='';
function render(){
 const date=G.candles[Math.min(G.candleIndex,G.candles.length-1)].date;
 $('roundLabel').textContent=t('roundLabel');
 $('nativeBalance').textContent=money(G.balance);
 const rr=$('nativeReturn');rr.textContent=pct(runPct());rr.style.color=returnColor(runPct());
 $('stockName').textContent=G.stock.name;
 $('stockMeta').textContent=`${G.stock.ticker} · ${G.stock.market}`;
 $('dateLine').textContent=`${date.slice(0,4)}.${date.slice(4,6)}.${date.slice(6,8)}  ·  ${G.phase==='preRace'||G.phase==='intro'?t('warmup'):t('day',{day:playDay()})}`;
 const p=raceProgress();
 $('trackFill').style.width=`calc((100% - 6px) * ${p} + 3px)`;
 $('trackDot').style.left=`calc((100% - 6px) * ${p})`;
 const [txt,col]=statusLine();const st=$('status');st.textContent=txt;st.style.color=col;
 const finished=G.phase==='finished';
 $('tradeRow').classList.toggle('hide',finished);
 $('nextBtn').classList.toggle('hide',!finished);
 $('buy').disabled=G.phase!=='racing'||G.paused;
 $('sell').disabled=G.phase!=='holding'||G.paused;
 const pose=poseAsset();
 if(pose!==lastPose){lastPose=pose;const img=$('rider');img.src=pose+'.webp?v=3.6';img.classList.remove('pop');void img.offsetWidth;img.classList.add('pop');}
 chart.setData(G.completed,G.partial,G.buyPrice,G.sellPrice);
}

/* ---------- finish card + falling emoji (main.dart _Result / falling_emoji_field.dart) ---------- */
function showFinish(){
 const pnl=roundPnl(),pc=roundPct(),color=pnl>0?COLOR.buy:pnl<0?COLOR.sell:COLOR.text;
 $('finishLabel').textContent=t('roundComplete',{round:1});
 const amt=$('finishAmount');amt.textContent=(pnl>0?'+':'')+money(pnl);amt.style.color=color;
 const fp=$('finishPct');fp.textContent=t('thisRound',{pct:(pc>0?'+':'')+pc.toFixed(2)});fp.style.color=color;
 $('finishBalance').textContent=t('balance',{amount:money(G.balance)});
 const note=G.buyPrice==null?t('noTrade'):G.autoSold?t('autoSold'):'';
 $('finishNote').textContent=note;$('finishNote').classList.toggle('hide',!note);
 $('finish').classList.remove('hide');
 $('finishCard').classList.remove('in');void $('finishCard').offsetWidth;$('finishCard').classList.add('in');
 dropEmoji(pc);
}
function hideFinish(){$('finish').classList.add('hide');$('emoji').innerHTML='';}
function dropEmoji(returnPct){
 const field=$('emoji');field.innerHTML='';
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 let seed=91;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 const parts=[];
 for(let i=0;i<8;i++)parts.push({e:'🏁',x:rnd(),d:rnd()*.25,s:36+rnd()*18,r:(rnd()-.5)*1.2});
 const champ=Math.min(5,Math.max(0,Math.trunc(returnPct/5)));
 for(let i=0;i<champ;i++)parts.push({e:'🍾',x:rnd(),d:rnd()*.35,s:40+champ*3+rnd()*12,r:(rnd()-.5)*1.8});
 const H=field.clientHeight||600,W=field.clientWidth||360;
 for(const p of parts){
  const el=document.createElement('span');el.textContent=p.e;el.style.fontSize=p.s+'px';
  el.style.left=p.x*Math.max(0,W-p.s)+'px';
  el.animate([{transform:'translateY(-70px) rotate(0rad)',opacity:1},{transform:`translateY(${H+30}px) rotate(${p.r}rad)`,opacity:1}],
   {duration:2600*(1-p.d),delay:2600*p.d,easing:'ease-in-out',fill:'both'});
  field.appendChild(el);
 }
 if(returnPct>=25){
  const el=document.createElement('span');el.textContent='🍾';el.style.fontSize='170px';el.style.left=Math.max(0,W/2-70)+'px';
  el.animate([{transform:'translateY(-190px) rotate(-.25rad)'},{transform:`translateY(${H+120}px) rotate(.45rad)`}],{duration:2600,easing:'ease-in-out',fill:'both'});
  field.appendChild(el);
 }
}

/* ---------- modal (web tutorial) ---------- */
function showModal(title,message,button,fn){
 $('modalTitle').textContent=t(title);
 $('modalMessage').textContent=t(message);
 $('advance').textContent=t(button);
 G.modalAction=fn;$('overlay').classList.remove('hide');
 setTimeout(()=>$('advance').focus({preventScroll:true}),30);
}
function hideModal(){$('overlay').classList.add('hide');}

/* ---------- web result screen ---------- */
function roundStats(){
 const play=G.candles.slice(HISTORY_DAYS);
 const hold=(play[play.length-1].c/play[0].o-1)*100;
 let best=0,minLow=Infinity;
 for(const c of play){minLow=Math.min(minLow,c.l);best=Math.max(best,(c.h/minLow-1)*100);}
 const fmt=d=>`${d.slice(0,4)}.${d.slice(4,6)}.${d.slice(6,8)}`;
 return {hold,best,period:`${fmt(play[0].date)} – ${fmt(play[play.length-1].date)}`};
}
function verdict(){
 if(G.buyPrice==null)return ['🧘',t('v_none')];
 const r=roundPct();
 if(r>=20)return ['🏆',t('v_top')];
 if(r>=5)return ['🚀',t('v_good')];
 if(r>0)return ['👍',t('v_ok')];
 if(r>-5)return ['😅',t('v_close')];
 return ['🔥',t('v_bad')];
}
// Mini chart of the whole round (warm-up dimmed) with the holding zone and B/S pills. Shared by the result card and the share image.
function drawMiniChart(ctx,X,Y,W,H,k=1){
 const cs=G.candles;if(!cs.length)return;
 let hi=-Infinity,lo=Infinity;for(const c of cs){hi=Math.max(hi,c.h);lo=Math.min(lo,c.l);}
 const pad=(hi-lo)*.08;hi+=pad;lo-=pad;
 const y=p=>Y+(hi-p)/(hi-lo)*H,step=W/cs.length,bw=Math.max(1,step*.6);
 const x=i=>X+(i+.5)*step;
 if(G.buyIndex!=null){
  const e=G.sellIndex??cs.length-1,r=roundPct();
  ctx.fillStyle=r>=0?'rgba(79,186,138,.12)':'rgba(217,105,125,.12)';
  ctx.fillRect(x(G.buyIndex)-step/2,Y,(e-G.buyIndex+1)*step,H);
 }
 ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=k;ctx.setLineDash([4*k,4*k]);
 ctx.beginPath();ctx.moveTo(x(HISTORY_DAYS)-step/2,Y);ctx.lineTo(x(HISTORY_DAYS)-step/2,Y+H);ctx.stroke();ctx.setLineDash([]);
 for(let i=0;i<cs.length;i++){
  const c=cs[i],up=c.c>=c.o,warm=i<HISTORY_DAYS;
  ctx.globalAlpha=warm?.35:1;ctx.strokeStyle=ctx.fillStyle=up?COLOR.buy:COLOR.sell;ctx.lineWidth=k;
  ctx.beginPath();ctx.moveTo(x(i),y(c.h));ctx.lineTo(x(i),y(c.l));ctx.stroke();
  const t0=y(Math.max(c.o,c.c));ctx.fillRect(x(i)-bw/2,t0,bw,Math.max(k,y(Math.min(c.o,c.c))-t0));
 }
 ctx.globalAlpha=1;
 const pill=(i,price,label,color)=>{
  if(i==null||price==null)return;
  const px=x(i),py=y(price),r=9*k;
  ctx.fillStyle=color;ctx.beginPath();ctx.arc(px,py,r,0,Math.PI*2);ctx.fill();
  ctx.lineWidth=2*k;ctx.strokeStyle='#111114';ctx.stroke();
  ctx.fillStyle='#111114';ctx.font=`900 ${11*k}px -apple-system,BlinkMacSystemFont,Arial,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(label,px,py+.5*k);
 };
 pill(G.buyIndex,G.buyPrice,'B',COLOR.buy);pill(G.sellIndex,G.sellPrice,'S',COLOR.sell);
}
function paintMini(){
 const cv=$('miniChart'),dpr=Math.min(devicePixelRatio||1,3),W=cv.clientWidth,H=cv.clientHeight;
 if(!W||!H)return;
 cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
 const ctx=cv.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
 drawMiniChart(ctx,10,10,W-20,H-20,1);
}
const signed=v=>(v>0?'+':'')+v.toFixed(1)+'%';
function fillResult(){
 const pc=$('resultPercent'),r=roundPct(),pnl=roundPnl(),traded=G.buyPrice!=null;
 const [emo,txt]=verdict();$('verdict').textContent=`${emo} ${txt}`;
 if(traded){pc.textContent=pct(r);pc.className='result-percent '+(r>0?'up':r<0?'down':'');}
 else{pc.textContent=t('noTrade');pc.className='result-percent flat';}
 $('result').classList.toggle('is-up',traded&&r>0);$('result').classList.toggle('is-down',traded&&r<0);
 $('resultBalance').textContent=money(G.balance);
 pc.style.fontSize='';requestAnimationFrame(()=>{let f=parseFloat(getComputedStyle(pc).fontSize);while(pc.scrollWidth>pc.clientWidth&&f>20){f-=2;pc.style.fontSize=f+'px';}});
 const pe=$('resultPnl');pe.textContent=traded?`(${pnl>0?'+':''}${money(pnl)})`:'';pe.className='r-pnl '+(pnl>0?'up':pnl<0?'down':'');
 const st=roundStats();
 $('rStock').textContent=`${G.stock.name} · ${G.stock.ticker}`;$('rPeriod').textContent=st.period;
 const h=$('rHold');h.textContent=signed(st.hold);h.className=st.hold>0?'up':st.hold<0?'down':'';
 const b=$('rBest');b.textContent=signed(st.best);b.className='up';
 const rider=$('resultRider');rider.src=resultPose()+'.webp?v=3.6';rider.classList.remove('pop');void rider.offsetWidth;rider.classList.add('pop');
 requestAnimationFrame(paintMini);
}
function showResult(){
 stopPostSellPlayback();stopLoop();
 G.phase='result';
 document.body.classList.add('show-result');$('result').classList.remove('hide');
 fillResult();
 window.scrollTo({top:0});renderCards();
}
/* ---------- trading-card teaser (tiers from lib/models/trading_tier.dart) ---------- */
const CARD_TIERS=[   // [tier index 0-25, label, colour, art cell] — one per tier family, top level
 [0,'DRIFTER','#9A93A5',24],[4,'BRONZE I','#CF9060',3],[8,'SILVER I','#B7C8D9',7],[12,'GOLD I','#F1C45C',11],
 [16,'PLATINUM I','#79DAD7',15],[20,'EMERALD I','#63DEAB',19],[24,'DIAMOND I','#B4A1FF',23],[25,'CHALLENGER','#FFDA75',25]];
function darken(hex,f){const n=parseInt(hex.slice(1),16);return '#'+[16,8,0].map(s=>Math.round(((n>>s)&255)*(1-f)).toString(16).padStart(2,'0')).join('');}
function cutPath(x,y,w,h,c){return `${x+c},${y} ${x+w-c},${y} ${x+w},${y+c} ${x+w},${y+h-c} ${x+w-c},${y+h} ${x+c},${y+h} ${x},${y+h-c} ${x},${y+c}`;}
function cardHTML([idx,label,color,cell],holo){
 const ep=((D[G.lang]||D.en).epithets||D.en.epithets)[idx];
 return `<div class="tcard" style="--accent:${color};--accent-dark:${darken(color,.65)}">
  <img class="tc-logo" src="chart_riders_header_logo.webp?v=3.6" alt="">
  <div class="tc-tier"><span>${label}</span><i class="tc-gem"></i></div>
  <div class="tc-art"><img src="card_${cell}.webp?v=3.6" alt=""></div>
  <div class="tc-title">${ep}</div>
  <div class="tc-iq"><span>TRADING IQ</span><b>???</b></div>
  <div class="tc-metrics"><div><b>???</b><small>${t('cBalance')}</small></div><div><b>???</b><small>${t('cReturn')}</small></div></div>
  <div class="tc-player">${t('cPlayer')}</div>
  <div class="tc-disc">${t('cDisc')}</div>
  <div class="tc-foot"><span>${t('cRun')}</span><span>${idx+1} / 26</span></div>
  <svg class="tc-frame" viewBox="0 0 432 576" aria-hidden="true">
   <defs><linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E7E9E5"/><stop offset=".25" stop-color="#515D69"/><stop offset=".5" stop-color="#CFD5DC"/><stop offset=".75" stop-color="#526471"/><stop offset="1" stop-color="#F0EFDF"/></linearGradient></defs>
   <polygon points="${cutPath(11,11,410,554,9)}" fill="none" stroke="url(#silver)" stroke-width="2.3"/>
   <polygon points="${cutPath(22,330,388,39,8)}" fill="rgba(255,255,255,.04)" stroke="#ABB5C2" stroke-width=".8"/>
   <line x1="15" y1="321" x2="417" y2="321" stroke="#ABB5C2" stroke-width=".65"/>
   <line x1="29" y1="437" x2="403" y2="437" stroke="#ABB5C2" stroke-width=".65"/>
  </svg>${holo?'<div class="tc-holo"></div>':''}</div>`;
}
let cardTimer=0,cardIdx=0;
function sizeCards(){
 const fan=$('cardFan');if(!fan)return;
 const W=fan.clientWidth,H=fan.clientHeight;if(!W||!H)return;
 const ch=Math.max(100,Math.min(H-8,(W*.46)/.75)),cw=ch*.75,sw=cw*.8;
 fan.style.setProperty('--ch',ch+'px');fan.style.setProperty('--sw',sw+'px');
 fan.style.setProperty('--off',Math.min((cw+sw)/2*.72,W/2-sw/2)+'px');
 fan.style.setProperty('--cs',cw/432);fan.style.setProperty('--ss',sw/432);
}
function renderCards(){
 clearInterval(cardTimer);
 const fan=$('cardFan');
 fan.innerHTML=`<div class="card-slot side left">${cardHTML(CARD_TIERS[1])}</div>
  <div class="card-slot side right">${cardHTML(CARD_TIERS[6])}</div>
  <div class="card-slot center"><div id="cardFlip" class="card-flip">${cardHTML(CARD_TIERS[cardIdx],true)}</div><span class="lock">🔒 ${t('cardLock')}</span></div>`;
 sizeCards();
 CARD_TIERS.forEach(c=>{const i=new Image();i.src=`card_${c[3]}.webp?v=3.6`;});
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 cardTimer=setInterval(()=>{
  const flip=$('cardFlip');if(!flip){clearInterval(cardTimer);return;}
  flip.classList.remove('flip');void flip.offsetWidth;flip.classList.add('flip');
  setTimeout(()=>{cardIdx=(cardIdx+1)%CARD_TIERS.length;if($('cardFlip'))$('cardFlip').innerHTML=cardHTML(CARD_TIERS[cardIdx],true);},250);
 },1600);
}
function replay(){
 clearInterval(cardTimer);
 document.body.classList.remove('show-result');
 $('result').classList.add('hide');$('storeNotice').classList.add('hide');
 G.firstRun=false;
 resetRound();window.scrollTo({top:0});
 requestAnimationFrame(()=>{chart.resize();startPreRace();});
}

/* ---------- share ---------- */
function loadImg(src){return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});}
function roundRectPath(x,X,Y,w,h,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath();}
async function makeShareImage(){
 // Same building blocks as the result screen: hero, verdict, return, money, round chart, stats, IQ ???, challenge.
 const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const traded=G.buyPrice!=null,r=roundPct(),pnl=roundPnl(),st=roundStats();
 const accent=!traded?'#E8B33D':r>0?COLOR.buy:r<0?COLOR.sell:'#E8B33D';
 const font='-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Hiragino Sans","PingFang TC","Noto Sans KR","Segoe UI",Arial,sans-serif';
 x.fillStyle='#111114';x.fillRect(0,0,W,H);
 const g=x.createRadialGradient(W/2,300,40,W/2,300,720);g.addColorStop(0,accent+'40');g.addColorStop(1,'#11111400');x.fillStyle=g;x.fillRect(0,0,W,H);
 // diagonal racing stripes
 x.save();x.globalAlpha=.05;x.fillStyle='#fff';for(let i=-4;i<12;i++){x.beginPath();x.moveTo(i*140,0);x.lineTo(i*140+60,0);x.lineTo(i*140-340,H);x.lineTo(i*140-400,H);x.fill();}x.restore();
 const [logo,cat]=await Promise.all([loadImg('chart_riders_header_logo.webp?v=3.6'),loadImg(resultPose()+'.webp?v=3.6')]);
 // hero: rider in front of the logo
 const lw=860,lh=lw*logo.height/logo.width;x.drawImage(logo,(W-lw)/2,96,lw,lh);
 const ch=300,cw=Math.round(ch*cat.width/cat.height);
 const off=document.createElement('canvas');off.width=cw;off.height=ch;const o=off.getContext('2d');
 o.drawImage(cat,0,0,cw,ch);o.globalCompositeOperation='destination-in';
 const fade=o.createLinearGradient(0,0,0,ch);fade.addColorStop(0,'#000');fade.addColorStop(.8,'#000');fade.addColorStop(1,'rgba(0,0,0,0)');
 o.fillStyle=fade;o.fillRect(0,0,cw,ch);x.drawImage(off,(W-cw)/2-22,44);
 x.textAlign='center';x.textBaseline='alphabetic';
 // verdict pill
 const [emo,vt]=verdict(),vs=`${emo}  ${vt}`;x.font=`800 40px ${font}`;const vw=x.measureText(vs).width+64;
 roundRectPath(x,(W-vw)/2,362,vw,68,34);x.fillStyle='rgba(255,255,255,.08)';x.fill();x.lineWidth=2;x.strokeStyle='rgba(255,255,255,.16)';x.stroke();
 x.fillStyle='#F5F5F7';x.fillText(vs,W/2,410);
 // return + money
 x.shadowColor=accent+'88';x.shadowBlur=40;
 if(traded){x.fillStyle=r>0?COLOR.buy:r<0?COLOR.sell:'#F5F5F7';x.font=`900 200px ${font}`;x.fillText(pct(r),W/2,630,W-80);}
 else{x.fillStyle='#98989F';x.font=`900 130px ${font}`;x.fillText(t('noTrade'),W/2,610,W-80);}
 x.shadowBlur=0;
 x.font=`800 54px ${font}`;x.fillStyle='#F5F5F7';
 x.fillText(money(G.balance)+(traded?`  (${pnl>0?'+':''}${money(pnl)})`:''),W/2,712);
 // round card: header, chart, buy&hold / perfect timing
 const cx=60,cy=764,cwid=W-120,chh=480;
 roundRectPath(x,cx,cy,cwid,chh,32);x.fillStyle='#1b1b20';x.fill();x.lineWidth=2;x.strokeStyle='#343439';x.stroke();
 x.textAlign='left';x.font=`700 32px ${font}`;x.fillStyle='#F5F5F7';x.fillText(`${G.stock.name} · ${G.stock.ticker}`,cx+32,cy+54);
 x.textAlign='right';x.font=`500 28px ${font}`;x.fillStyle='#98989F';x.fillText(st.period,cx+cwid-32,cy+54);
 drawMiniChart(x,cx+28,cy+80,cwid-56,chh-170,2.4);
 x.strokeStyle='#2a2a30';x.lineWidth=2;x.beginPath();x.moveTo(cx+28,cy+chh-74);x.lineTo(cx+cwid-28,cy+chh-74);x.stroke();
 [[t('holdLabel'),st.hold],[t('bestLabel'),st.best]].forEach(([label,v],i)=>{
  const tx=cx+32+i*(cwid/2);x.textAlign='left';
  x.font=`600 28px ${font}`;x.fillStyle='#98989F';x.fillText(label,tx,cy+chh-26);
  const lw2=x.measureText(label).width;
  x.font=`800 36px ${font}`;x.fillStyle=v>0?COLOR.buy:v<0?COLOR.sell:'#F5F5F7';x.fillText(signed(v),tx+lw2+14,cy+chh-26);
 });
 // url
 x.textAlign='center';x.font=`600 28px ${font}`;x.fillStyle='#98989F';x.fillText((CFG.siteUrl||location.href).replace(/^https?:\/\//,'').replace(/\/$/,''),W/2,H-40);
 return new Promise(res=>c.toBlob(res,'image/png'));
}
async function share(){
 const base=(CFG.siteUrl||location.href.split('#')[0].replace(/[^/]*$/,'')).replace(/\/?$/,'/');
 const url=G.lang==='en'?base:base+G.lang+'.html';   // share the preview page in the player's language (index.html = English)
 const text=`${verdict().join(' ')} · `+t('shareText').replace('{r}',G.buyPrice!=null?pct(roundPct()):t('noTrade'));
 track('demo_share_click');
 if(navigator.share){
  try{
   let data={title:'Chart Riders',text,url};
   try{
    const blob=await makeShareImage(),file=new File([blob],'chart-riders-result.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[file]}))data={files:[file],text:text+'\n'+url};
   }catch(_){}
   await navigator.share(data);track('demo_share_done');return;
  }catch(e){if(e&&e.name==='AbortError')return;}
 }
 try{await navigator.clipboard.writeText(text+'\n'+url);toast(t('copied'));}catch(_){toast(text+' '+url);}
}
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2200);}

/* ---------- analytics (GA4, cookieless in the EEA/UK/CH) ---------- */
function track(name,params={}){try{if(window.gtag)gtag('event',name,{language:G.lang,...params});}catch(_){}}

/* ---------- language ---------- */
function applyLang(next,remember){
 G.lang=D[next]?next:'en';
 if(remember){try{localStorage.setItem('chartRidersDemoLanguage',G.lang);}catch(_){}}
 document.documentElement.lang=G.lang;$('lang').value=G.lang;
 document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
 document.querySelectorAll('[data-t-label]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.tLabel)));
 $('headline').innerHTML=`${t('headline1')} <em>${t('headline2')}</em>`;
 if(G.phase==='intro')showModal('ready','instruction1','start',()=>{track('demo_start');startPreRace();});
 if(G.phase==='finished')showFinish();
 if(G.phase==='result'){fillResult();renderCards();}
 render();
}
function initialLang(){
 try{const s=localStorage.getItem('chartRidersDemoLanguage');if(s&&D[s])return s;}catch(_){}
 for(const raw of (navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en'])){
  const code=String(raw||'').toLowerCase().replace(/_/g,'-');
  for(const l of ['ko','en','ja','fr','es'])if(code===l||code.startsWith(l+'-'))return l;
  if(/^zh-(tw|hk|mo|hant)(-|$)/.test(code))return 'zh';   // Traditional Chinese only
 }
 return 'en';
}

/* ---------- links ---------- */
function setupLinks(){
 const os=detectOS();
 [['iosLink','iosUrl','ios'],['androidLink','androidUrl','android']].forEach(([id,key,store])=>{
  const el=$(id),url=CFG[key];
  if(url&&/^https:\/\//.test(url)){el.href=url;el.target='_blank';el.rel='noopener noreferrer';el.addEventListener('click',()=>track('store_click',{store}));}
  else el.addEventListener('click',e=>{e.preventDefault();$('storeNotice').classList.remove('hide');});
 });
 if(os==='ios')$('androidLink').classList.add('hide');
 if(os==='android')$('iosLink').classList.add('hide');
 $('storeButtons').classList.toggle('single',os!=='other');
 const sup=$('supportLink');
 if(CFG.supportUrl&&/^https:\/\//.test(CFG.supportUrl)){sup.href=CFG.supportUrl;sup.target='_blank';sup.rel='noopener noreferrer';}
 else sup.classList.add('hide');
}

/* ---------- boot ---------- */
$('advance').addEventListener('click',()=>G.modalAction&&G.modalAction());
$('buy').addEventListener('click',()=>{const was=G.phase;buy();if(was==='racing')track('demo_buy');});
$('sell').addEventListener('click',()=>{const was=G.phase;sell(false);if(was==='holding')track('demo_sell',{return_pct:+roundPct().toFixed(2)});});
$('nextBtn').addEventListener('click',()=>{if(G.phase!=='finished')return;track('demo_result',{traded:traded(),auto_sold:G.autoSold,return_pct:+roundPct().toFixed(2)});showResult();});
$('resume').addEventListener('click',resume);
$('replay').addEventListener('click',()=>{track('demo_replay');replay();});
$('share').addEventListener('click',share);
$('lang').addEventListener('change',e=>applyLang(e.target.value,true));
addEventListener('resize',()=>{if(G.phase==='result'){paintMini();sizeCards();}});
const chart=new CandleChart($('chart'),HISTORY_DAYS,G.stock?G.stock.market:'NASDAQ');
resetRound();setupLinks();applyLang(initialLang(),false);chart.resize();
