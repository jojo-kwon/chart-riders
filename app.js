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
  balance:START_BALANCE,roundStart:START_BALANCE,buyPrice:null,sellPrice:null,autoSold:false,paused:false,elapsed:0,acc:0,pose:null});
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
 G.buyPrice=G.currentPrice;G.phase='holding';
 render();
 if(G.firstRun){   // web tutorial, first round only; the game is frozen while it is open
  G.paused=true;
  showModal('bought','instruction2','continue',()=>{hideModal();G.paused=false;G.last=performance.now();});
 }
}
function sell(automatic=false){
 if(G.phase!=='holding'||G.buyPrice==null)return;
 G.sellPrice=G.currentPrice;G.autoSold=automatic;
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
 if(pose!==lastPose){lastPose=pose;const img=$('rider');img.src=pose+'.webp?v=3.1.1';img.classList.remove('pop');void img.offsetWidth;img.classList.add('pop');}
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
function fillResult(){
 const pc=$('resultPercent');
 if(G.buyPrice!=null){const r=roundPct();pc.textContent=pct(r);pc.className='result-percent '+(r>0?'up':r<0?'down':'');}
 else{pc.textContent=t('noTrade');pc.className='result-percent flat';}
 $('resultBalance').textContent=money(G.balance);
 const note=$('resultNote');
 note.textContent=G.buyPrice==null?t('noTradeSub'):G.autoSold?t('autoSold'):'';
 note.classList.toggle('hide',!note.textContent);
 $('resultRider').src=poseAsset()+'.webp?v=3.1.1';
}
function showResult(){
 stopPostSellPlayback();stopLoop();
 G.phase='result';fillResult();
 document.body.classList.add('show-result');$('result').classList.remove('hide');
 window.scrollTo({top:0});spinSlots();
}
function spinSlots(){
 clearInterval(G.spinTimer);
 const slots=[...document.querySelectorAll('.slot')];let frame=0;
 G.spinTimer=setInterval(()=>{
  frame++;
  slots.forEach((s,i)=>{const stopAt=18+i*6;s.textContent=frame>=stopAt?'?':String((frame*7+i*3)%10);s.classList.toggle('spinning',frame<stopAt);});
  if(frame>=18+(slots.length-1)*6)clearInterval(G.spinTimer);
 },85);
}
function replay(){
 clearInterval(G.spinTimer);
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
 // Same order as the result screen: logo → cat → return → balance → IQ ??? → challenge line.
 const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const css=getComputedStyle(document.documentElement),tok=n=>css.getPropertyValue(n).trim();
 x.fillStyle=tok('--bg');x.fillRect(0,0,W,H);
 const glow=x.createRadialGradient(W/2,330,30,W/2,330,620);glow.addColorStop(0,'rgba(232,179,61,.16)');glow.addColorStop(1,'rgba(232,179,61,0)');
 x.fillStyle=glow;x.fillRect(0,0,W,H);
 const [logo,cat]=await Promise.all([loadImg('chart_riders_header_logo.webp'),loadImg(poseAsset()+'.webp')]);
 const lw=700;x.drawImage(logo,(W-lw)/2,70,lw,lw*logo.height/logo.width);
 const cw=380,ch=Math.round(cw*cat.height/cat.width);
 const off=document.createElement('canvas');off.width=cw;off.height=ch;const o=off.getContext('2d');
 o.drawImage(cat,0,0,cw,ch);
 o.globalCompositeOperation='destination-in';
 const fade=o.createLinearGradient(0,0,0,ch);fade.addColorStop(0,'#000');fade.addColorStop(.74,'#000');fade.addColorStop(1,'rgba(0,0,0,0)');
 o.fillStyle=fade;o.fillRect(0,0,cw,ch);x.drawImage(off,(W-cw)/2,170);
 const font='-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Hiragino Sans","PingFang TC","Noto Sans KR","Segoe UI",Arial,sans-serif';
 x.textAlign='center';
 if(G.buyPrice!=null){const r=roundPct();x.fillStyle=returnColor(r);x.font=`900 170px ${font}`;x.fillText(pct(r),W/2,740,W-80);}
 else{x.fillStyle=tok('--secondary');x.font=`900 110px ${font}`;x.fillText(t('noTrade'),W/2,720,W-80);}
 x.fillStyle=tok('--text');x.font=`800 60px ${font}`;x.fillText(money(G.balance),W/2,825);
 x.fillStyle=tok('--gold');x.font=`900 40px ${font}`;x.fillText(t('iqTitle'),W/2,930);
 const sw=130,sh=150,gap=22,sx=(W-(sw*3+gap*2))/2,sy=960;
 for(let i=0;i<3;i++){
  const X=sx+i*(sw+gap);roundRectPath(x,X,sy,sw,sh,22);x.fillStyle='#080f1f';x.fill();x.lineWidth=4;x.strokeStyle=tok('--gold-line');x.stroke();
  x.fillStyle=tok('--gold');x.font=`900 104px ${font}`;x.fillText('?',X+sw/2,sy+sh/2+38);
 }
 x.fillStyle=tok('--text');x.font=`800 52px ${font}`;x.fillText(`${t('headline1')} ${t('headline2')}`,W/2,1215,W-100);
 x.fillStyle=tok('--secondary');x.font=`600 30px ${font}`;x.fillText((CFG.siteUrl||location.href).replace(/^https?:\/\//,'').replace(/\/$/,''),W/2,1292);
 return new Promise(res=>c.toBlob(res,'image/png'));
}
async function share(){
 const url=CFG.siteUrl||location.href.split('#')[0];
 const text=t('shareText').replace('{r}',G.buyPrice!=null?pct(roundPct()):t('noTrade'));
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
 if(G.phase==='result')fillResult();
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
$('slots').addEventListener('click',spinSlots);
$('lang').addEventListener('change',e=>applyLang(e.target.value,true));
const chart=new CandleChart($('chart'),HISTORY_DAYS,G.stock?G.stock.market:'NASDAQ');
resetRound();setupLinks();applyLang(initialLang(),false);chart.resize();
