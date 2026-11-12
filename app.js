'use strict';
const D={
 en:{eyebrow:'THE TRADING IQ CHALLENGE',headline:'',subhead:'One chart. One trade. Try it before you download.',demo:'INTERACTIVE DEMO · 1 ROUND',simulation:'SIMULATED',balance:'BALANCE',warmup:'30-DAY WARMUP',historical:'Historical daily prices · from game assets',entry:'ENTRY',return:'RETURN',day:'DAY',buy:'BUY',sell:'SELL',tutorial:'QUICK TUTORIAL',complete:'DEMO COMPLETE',yourResult:'YOUR TRADING RESULT',iqTitle:'YOUR TRADING IQ',iqQuestion:"What's Your Trading IQ?",installPitch:'Install Chart Riders and complete 10 rounds to find out!',getGame:'UNLOCK YOUR TRADING IQ',fullPitch:'10 rounds · Trading IQ · Tiers · Leaderboards',downloadOn:'Download on the',getIt:'GET IT ON',storeNotice:'Store link not configured yet.',disclaimer:'Historical price data comes from the Chart Riders app assets. All trading is virtual.',support:'Support & Privacy',ready:'Ready to trade?',instruction1:'Trading begins in 5 seconds. Tap BUY whenever you think the timing is right.',start:'GOT IT',bought:'You bought!',instruction2:'Tap SELL whenever you think the timing is right.',continue:'CONTINUE',finished:'Round complete!',instruction3:'Check your trading result. Your Trading IQ stays a mystery until you play the full game!',seeResult:'SEE RESULT',trading:'TRADING',holding:'POSITION OPEN',closed:'ROUND ENDED',auto:'Auto-sold at end of chart',noTrade:'No trade placed',headline1:'Think You Can',headline2:'Beat the Market?'},
 ko:{eyebrow:'트레이딩 IQ 챌린지',subhead:'차트 한 장. 매매 한 번.',demo:'맛보기 · 1판',simulation:'모의 거래',balance:'잔액',warmup:'차트 살펴보는 중',historical:'실제 과거 차트',entry:'매수가',return:'수익률',day:'일차',buy:'매수',sell:'매도',tutorial:'플레이 가이드',complete:'매매 종료',yourResult:'이번 매매 성적',iqTitle:'나의 매매 IQ',iqQuestion:'나의 매매 IQ는?',installPitch:'10판 완료 시 매매 IQ 공개',getGame:'매매 IQ 확인',fullPitch:'10판 승부 · 매매 IQ 공개 · 티어 도전',downloadOn:'iPhone에서 플레이',getIt:'Android에서 플레이',storeNotice:'아직 스토어 링크가 연결되지 않았습니다.',disclaimer:'차트라이더 앱에 포함된 과거 주가 데이터를 사용하며 모든 매매는 가상 거래입니다.',support:'고객지원 및 개인정보처리방침',ready:'매수 타이밍 선택',instruction1:'5초 후 매매 시작\n차트 확인 후 매수 버튼 선택',start:'확인',bought:'매수 완료',instruction2:'매도 타이밍 선택\n원하는 시점에 매도 버튼 선택',continue:'확인',finished:'매매 종료',instruction3:'이번 매매 결과 확인\n매매 IQ는 앱에서 10판 완료 후 공개',seeResult:'결과 확인',trading:'매매 중',holding:'보유 중',closed:'라운드 종료',auto:'차트 종료 후 자동매도',noTrade:'매매하지 않음',headline1:'시장을 이길',headline2:'자신 있나요?'},
 ja:{eyebrow:'トレーディングIQチャレンジ',subhead:'一つのチャート、一回の取引。ダウンロード前に体験。',demo:'WEB体験版 · 1ラウンド',simulation:'模擬取引',balance:'残高',warmup:'30日ウォームアップ',historical:'実際の過去の株価 · ゲーム収録データ',entry:'買値',return:'収益率',day:'日目',buy:'買う',sell:'売る',tutorial:'かんたんチュートリアル',complete:'体験完了',yourResult:'取引結果',iqTitle:'あなたのトレーディングIQ',iqQuestion:'あなたのIQはいくつ？',installPitch:'アプリをインストールして10ラウンドをプレイすると確認できます！',getGame:'自分のIQを確かめよう',fullPitch:'10ラウンド · IQ · ティア · ランキング',downloadOn:'ダウンロード',getIt:'ダウンロード',storeNotice:'ストアリンクは未設定です。',disclaimer:'ゲーム収録の過去株価データを使用。取引はすべて仮想です。',support:'サポートとプライバシー',ready:'準備はいいですか？',instruction1:'5秒後に取引が始まります。好きなタイミングで「買う」を押してください。',start:'OK',bought:'購入しました！',instruction2:'好きなタイミングで「売る」を押してください。',continue:'続ける',finished:'ラウンド終了！',instruction3:'取引結果を確認しましょう。IQはアプリで10ラウンド終了後に確認できます！',seeResult:'結果を見る',trading:'取引中',holding:'保有中',closed:'終了',auto:'チャート終了後に自動売却',noTrade:'取引なし',headline1:'マーケットに',headline2:'勝てるか？'},
 fr:{eyebrow:'LE DÉFI DU QI TRADING',subhead:'Un graphique. Un trade. Essayez avant de télécharger.',demo:'DÉMO WEB · 1 MANCHE',simulation:'SIMULÉ',balance:'SOLDE',warmup:'30 JOURS INITIAUX',historical:'Cours historiques · données du jeu',entry:'ACHAT',return:'RENDEMENT',day:'JOUR',buy:'ACHETER',sell:'VENDRE',tutorial:'TUTORIEL RAPIDE',complete:'DÉMO TERMINÉE',yourResult:'VOTRE RÉSULTAT',iqTitle:'VOTRE QI TRADING',iqQuestion:'Quel est votre QI trading ?',installPitch:'Installez Chart Riders et terminez 10 manches pour le découvrir !',getGame:'DÉCOUVREZ VOTRE QI',fullPitch:'10 manches · QI · Niveaux · Classements',downloadOn:'Télécharger dans',getIt:'DISPONIBLE SUR',storeNotice:'Lien vers le store non configuré.',disclaimer:'Données historiques incluses dans le jeu. Transactions virtuelles.',support:'Assistance et confidentialité',ready:'Prêt à trader ?',instruction1:'Le trading commence dans 5 secondes. Appuyez sur ACHETER au bon moment.',start:'COMPRIS',bought:'Achat effectué !',instruction2:'Appuyez sur VENDRE au moment de votre choix.',continue:'CONTINUER',finished:'Manche terminée !',instruction3:'Découvrez votre résultat. Votre QI trading sera dévoilé après 10 manches dans l’application !',seeResult:'VOIR LE RÉSULTAT',trading:'EN COURS',holding:'POSITION OUVERTE',closed:'TERMINÉ',auto:'Vente automatique en fin de graphique',noTrade:'Aucune transaction',headline1:'Pouvez-vous battre',headline2:'le marché ?'},
 es:{eyebrow:'EL RETO DEL IQ TRADING',subhead:'Un gráfico. Una operación. Pruébalo antes de descargar.',demo:'DEMO WEB · 1 RONDA',simulation:'SIMULADO',balance:'SALDO',warmup:'30 DÍAS INICIALES',historical:'Precios históricos · datos del juego',entry:'COMPRA',return:'RENDIMIENTO',day:'DÍA',buy:'COMPRAR',sell:'VENDER',tutorial:'TUTORIAL RÁPIDO',complete:'DEMO TERMINADA',yourResult:'TU RESULTADO',iqTitle:'TU IQ DE TRADING',iqQuestion:'¿Cuál es tu IQ de trading?',installPitch:'¡Instala Chart Riders y completa 10 rondas para descubrirlo!',getGame:'DESCUBRE TU IQ',fullPitch:'10 rondas · IQ · Niveles · Clasificaciones',downloadOn:'Descargar en',getIt:'DISPONIBLE EN',storeNotice:'Enlace de tienda sin configurar.',disclaimer:'Datos históricos incluidos en el juego. Todas las operaciones son virtuales.',support:'Ayuda y privacidad',ready:'¿Listo para operar?',instruction1:'Las operaciones comienzan en 5 segundos. Pulsa COMPRAR cuando quieras.',start:'ENTENDIDO',bought:'¡Has comprado!',instruction2:'Pulsa VENDER cuando creas que es el momento adecuado.',continue:'CONTINUAR',finished:'¡Ronda terminada!',instruction3:'Consulta tu resultado. ¡Descubre tu IQ completando 10 rondas en la app!',seeResult:'VER RESULTADO',trading:'OPERANDO',holding:'POSICIÓN ABIERTA',closed:'TERMINADO',auto:'Venta automática al finalizar',noTrade:'Sin operaciones',headline1:'¿Puedes vencer',headline2:'al mercado?'},
 zh:{eyebrow:'交易 IQ 挑戰',subhead:'一張走勢圖，一次交易。下載前先試玩。',demo:'網頁試玩 · 1 回合',simulation:'模擬交易',balance:'餘額',warmup:'30 天預熱',historical:'真實歷史日線 · 遊戲內建資料',entry:'買入價',return:'報酬率',day:'第幾天',buy:'買入',sell:'賣出',tutorial:'快速教學',complete:'試玩完成',yourResult:'交易結果',iqTitle:'你的交易 IQ',iqQuestion:'你的交易 IQ 是多少？',installPitch:'安裝 Chart Riders，完成 10 回合就能揭曉！',getGame:'解鎖你的交易 IQ',fullPitch:'10 回合 · 交易 IQ · 階級 · 排行榜',downloadOn:'下載於',getIt:'立即下載',storeNotice:'尚未設定商店連結。',disclaimer:'使用遊戲內建的歷史股價資料。所有交易均為虛擬交易。',support:'支援與隱私',ready:'準備好交易了嗎？',instruction1:'5 秒後開始交易。請在你認為適合的時機按下買入。',start:'確認',bought:'買入成功！',instruction2:'請在你認為適合的時機按下賣出。',continue:'繼續',finished:'回合結束！',instruction3:'查看你的交易結果。完成正式版 10 回合後才能揭曉交易 IQ！',seeResult:'查看結果',trading:'交易中',holding:'持倉中',closed:'已結束',auto:'走勢圖結束後自動賣出',noTrade:'未交易',headline1:'你能擊敗',headline2:'市場嗎？'}
};
const EXTRA={
 en:{round:'ROUND',sReady:'Ready',sWarm:'Warm-up',sTrading:'Trading',sHolding:'Holding',sDone:'Finished',replay:'PLAY AGAIN',share:'SHARE',copied:'Copied to clipboard',shareText:'I scored {r} in one round of Chart Riders. Can you beat the market?'},
 ko:{round:'라운드',sReady:'준비',sWarm:'차트 살펴보는 중',sTrading:'매매 중',sHolding:'보유 중',sDone:'매매 종료',replay:'한 판 더',share:'결과 공유',copied:'공유 문구가 복사되었습니다',shareText:'차트라이더스 1판 결과 {r}. 너는 시장을 이길 수 있어?'},
 ja:{round:'ラウンド',sReady:'準備',sWarm:'ウォームアップ',sTrading:'取引中',sHolding:'保有中',sDone:'終了',replay:'もう一回',share:'シェア',copied:'コピーしました',shareText:'Chart Ridersで1ラウンド {r}。あなたはマーケットに勝てる？'},
 fr:{round:'MANCHE',sReady:'Prêt',sWarm:'Échauffement',sTrading:'En cours',sHolding:'Position ouverte',sDone:'Terminé',replay:'REJOUER',share:'PARTAGER',copied:'Copié',shareText:"J'ai fait {r} en une manche de Chart Riders. Et vous, pouvez-vous battre le marché ?"},
 es:{round:'RONDA',sReady:'Listo',sWarm:'Calentamiento',sTrading:'Operando',sHolding:'Posición abierta',sDone:'Terminado',replay:'JUGAR OTRA VEZ',share:'COMPARTIR',copied:'Copiado',shareText:'Hice {r} en una ronda de Chart Riders. ¿Puedes vencer al mercado?'},
 zh:{round:'回合',sReady:'準備',sWarm:'預熱中',sTrading:'交易中',sHolding:'持倉中',sDone:'已結束',replay:'再玩一次',share:'分享結果',copied:'已複製',shareText:'我在 Chart Riders 一回合拿到 {r}。你能擊敗市場嗎？'}
};
for(const k in EXTRA)Object.assign(D[k],EXTRA[k]);

const $=id=>document.getElementById(id);
const CFG=window.CHART_RIDERS_CONFIG||{};
let lang='en',phase='intro',stock,candles=[],cursor=0,entry=null,exit=null,tradeTimer=null,spinTimer=null,modalAction=null,tickIndex=0,tickPath=[],partial=null,shown=[],livePrice=0,firstRun=true;
const stocks=[{name:'Apple',ticker:'AAPL'},{name:'NVIDIA',ticker:'NVDA'},{name:'Tesla',ticker:'TSLA'}];
const WARM=30,TOTAL=120,TRADE_DAYS=TOTAL-WARM;

/* ---------- analytics (GA4 optional via config.gaId) ---------- */
(function initAnalytics(){
 if(!CFG.gaId||!/^G-[A-Z0-9]+$/.test(CFG.gaId))return;
 const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+CFG.gaId;document.head.appendChild(s);
 window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config',CFG.gaId);
})();
function track(name,params={}){try{if(window.gtag)gtag('event',name,{lang,...params});}catch(_){}}

/* ---------- helpers ---------- */
function t(key){return (D[lang]||D.en)[key]||D.en[key]||key;}
function money(x){return '$'+x.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
function pct(x){return (x>=0?'+':'')+x.toFixed(2)+'%';}
function liveReturn(){if(!entry)return 0;return exit?calcReturn():(livePrice/entry.price-1)*100;}
function calcReturn(){return entry&&exit?(exit.price/entry.price-1)*100:0;}
function detectOS(){const ua=navigator.userAgent||'';if(/android/i.test(ua))return 'android';if(/iphone|ipad|ipod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))return 'ios';return 'other';}

/* ---------- language ---------- */
function updateLang(next,remember=false){
 lang=D[next]?next:'en';
 if(remember){try{localStorage.setItem('chartRidersDemoLanguage',lang);}catch(_){}}
 document.documentElement.lang=lang;$('lang').value=lang;
 document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
 document.querySelector('h1').innerHTML=`${t('headline1')} <em>${t('headline2')}</em>`;
 if(phase==='intro')showModal('ready','instruction1','start',startCountdown);
 else if(phase==='bought')showModal('bought','instruction2','continue',resumeAfterBuy);
 else if(phase==='summary')showModal('finished','instruction3','seeResult',revealResult);
 else if(phase==='result')renderResultNote();
 updateStats();
}

/* ---------- modal ---------- */
function showModal(title,message,button,fn){const isEnd=title==='finished';$('modalTitle').textContent=t(title);$('modalMessage').textContent=isEnd?'':t(message);$('advance').textContent=t(button);$('overlay').classList.toggle('end-only',isEnd);modalAction=fn;$('overlay').classList.remove('hide');}
function hideModal(){$('overlay').classList.add('hide');}
function clearClocks(){clearInterval(tradeTimer);tradeTimer=null;}

/* ---------- game ---------- */
function chooseStock(){
 stock=stocks[Math.floor(Math.random()*stocks.length)];
 const windows=(window.CHART_RIDERS_HISTORY||{})[stock.ticker]||[];
 if(!windows.length)throw Error('Historical data missing: '+stock.ticker);
 candles=windows[Math.floor(Math.random()*windows.length)];
 cursor=0;tickIndex=0;tickPath=[];partial=null;shown=[];livePrice=candles[0].o;entry=exit=null;
 $('stockName').innerHTML=`${stock.name} <span>${stock.ticker} · NASDAQ</span>`;
 $('nativeDate').textContent='—';
 updateStats();drawChart();
}
function prepareCandle(){
 if(cursor>=TOTAL)return;
 const c=candles[cursor],extremes=Math.random()<.5?[c.h,c.l]:[c.l,c.h],path=[c.o,...extremes,c.c];
 tickPath=[];
 for(let i=0;i<3;i++)for(let step=1;step<=3;step++)tickPath.push(path[i]+(path[i+1]-path[i])*step/3);
 tickIndex=0;livePrice=c.o;
 partial={o:c.o,h:c.o,l:c.o,c:c.o,v:c.v||0,date:c.date};
}
function advanceTick(){
 if(cursor>=TOTAL)return;
 if(!partial)prepareCandle();
 const v=tickPath[tickIndex++];
 livePrice=v;partial.c=v;partial.h=Math.max(partial.h,v);partial.l=Math.min(partial.l,v);
 if(tickIndex>=9){shown.push(candles[cursor]);cursor++;partial=null;if(cursor<TOTAL)prepareCandle();}
}
function startCountdown(){
 hideModal();clearClocks();phase='countdown';$('buy').disabled=true;$('sell').disabled=true;
 cursor=0;shown=[];partial=null;prepareCandle();
 track(firstRun?'demo_start':'demo_replay_start');
 const start=performance.now();let last=-1;
 $('countdown').classList.remove('hide');
 tradeTimer=setInterval(()=>{
  const elapsed=performance.now()-start;
  // 270 logical ticks over five seconds, as in Flutter's 30-day prerace.
  const target=Math.min(270,Math.floor(elapsed*270/5000));
  while(shown.length*9+tickIndex<target&&cursor<WARM)advanceTick();
  const seconds=Math.max(0,5-Math.floor(elapsed/1000));
  if(seconds!==last){$('countdown').textContent=seconds;last=seconds;}
  drawChart();updateStats();
  if(elapsed>=5000||cursor>=WARM){
   clearInterval(tradeTimer);tradeTimer=null;
   while(cursor<WARM)advanceTick();
   $('countdown').classList.add('hide');phase='trading';$('buy').disabled=false;runChart();
  }
 },16);
}
function runChart(){
 clearInterval(tradeTimer);
 // Flutter: 2 logical ticks each 16ms frame, 9 ticks per candle.
 let last=performance.now(),acc=0;
 tradeTimer=setInterval(()=>{
  if(!['trading','holding'].includes(phase))return;
  const now=performance.now();acc+=Math.min(now-last,80);last=now;
  let frames=0;
  while(acc>=16&&frames++<5&&cursor<TOTAL){acc-=16;advanceTick();if(cursor<TOTAL)advanceTick();}
  drawChart();updateStats();
  if(cursor>=TOTAL){clearInterval(tradeTimer);tradeTimer=null;finish(phase==='holding');}
 },16);
}
function buy(){
 if(phase!=='trading'||cursor>=TOTAL)return;
 entry={price:livePrice,day:Math.max(1,cursor-WARM+1)};
 phase='bought';$('buy').disabled=true;$('sell').disabled=true;
 clearInterval(tradeTimer);updateStats();drawChart();
 track('demo_buy',{day:entry.day});
 showModal('bought','instruction2','continue',resumeAfterBuy);
}
function resumeAfterBuy(){hideModal();phase='holding';$('sell').disabled=false;runChart();}
function sell(){if(phase!=='holding'||entry===null)return;finish(false);}
function finish(automatic){
 if(['summary','result'].includes(phase))return;
 clearClocks();
 exit=entry!==null?{price:livePrice,day:Math.max(1,cursor-WARM),automatic}:null;
 $('buy').disabled=true;$('sell').disabled=true;
 if(exit)track(automatic?'demo_auto_sell':'demo_sell',{return_pct:+calcReturn().toFixed(2)});else track('demo_no_trade');
 phase='summary';updateStats();drawChart();
 showModal('finished','instruction3','seeResult',revealResult);
}
function cash(){return 10000*(1+liveReturn()/100);}

function statusText(){
 if(phase==='intro')return t('sReady');
 if(phase==='countdown')return t('sWarm');
 if(phase==='summary'||phase==='result')return t('sDone');
 return entry?t('sHolding'):t('sTrading');
}
function updateStats(){
 const r=liveReturn();
 $('roundLabel').textContent=t('round');
 $('chartStatus').textContent=statusText();
 $('progressCaption').textContent=statusText();
 $('nativeBalance').textContent=money(cash());
 const ret=$('nativeReturn');ret.textContent=entry?pct(r):'0.00%';
 ret.classList.toggle('up',entry&&r>0);ret.classList.toggle('down',entry&&r<0);
 const progress=Math.max(0,Math.min(1,(cursor-WARM)/TRADE_DAYS));
 $('progressFill').style.width=(progress*100)+'%';
}

/* ---------- result ---------- */
function renderResultNote(){
 const note=$('resultNote');
 if(!entry){note.textContent=t('noTrade');note.classList.remove('hide');}
 else if(exit&&exit.automatic){note.textContent=t('auto');note.classList.remove('hide');}
 else{note.textContent='';note.classList.add('hide');}
}
function revealResult(){
 hideModal();phase='result';
 const r=calcReturn();
 $('resultPercent').textContent=pct(r);
 $('resultPercent').classList.toggle('negative',r<0);
 $('resultBalance').textContent=money(cash());
 renderResultNote();updateStats();
 $('result').classList.remove('hide');document.body.classList.add('show-result');
 $('result').scrollTop=0;
 if(window.innerWidth>700)$('result').scrollIntoView({behavior:'smooth',block:'start'});
 startSlots();
 track('demo_result',{return_pct:+r.toFixed(2),traded:!!entry});
}
function startSlots(){clearInterval(spinTimer);let frame=0;const slots=Array.from(document.querySelectorAll('.slot'));spinTimer=setInterval(()=>{frame++;slots.forEach((slot,i)=>{slot.textContent=(frame+i*3)%13<9?String((frame*7+i*3)%10):'?';});},85);}
function replay(){
 clearInterval(spinTimer);clearClocks();
 $('result').classList.add('hide');document.body.classList.remove('show-result');
 $('storeNotice').classList.add('hide');
 firstRun=false;phase='intro';
 chooseStock();resizeCanvas();
 track('demo_replay');
 window.scrollTo({top:0});
 startCountdown();
}

/* ---------- share ---------- */
function loadImg(src){return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src;});}
async function makeShareImage(){
 const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const g=x.createRadialGradient(W/2,380,40,W/2,520,900);g.addColorStop(0,'#24314a');g.addColorStop(1,'#101012');
 x.fillStyle=g;x.fillRect(0,0,W,H);
 const [logo,cat]=await Promise.all([loadImg('chart_riders_header_logo.webp'),loadImg('ready_closeup.webp')]);
 const lw=760,lh=lw*logo.height/logo.width;x.drawImage(logo,(W-lw)/2,90,lw,lh);
 const cw=440,ch=Math.round(cw*cat.height/cat.width);
 // fade the cropped bottom edge of the character with an alpha mask
 const off=document.createElement('canvas');off.width=cw;off.height=ch;const o=off.getContext('2d');
 o.drawImage(cat,0,0,cw,ch);o.globalCompositeOperation='destination-in';
 const fade=o.createLinearGradient(0,0,0,ch);fade.addColorStop(0,'#000');fade.addColorStop(.74,'#000');fade.addColorStop(1,'rgba(0,0,0,0)');
 o.fillStyle=fade;o.fillRect(0,0,cw,ch);
 x.drawImage(off,(W-cw)/2,210);
 const r=calcReturn();
 x.textAlign='center';x.textBaseline='alphabetic';
 const font='-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Noto Sans KR","Segoe UI",Arial,sans-serif';
 x.fillStyle=r<0?'#e07a8f':'#4fd1a5';x.font=`900 190px ${font}`;x.fillText(pct(r),W/2,920);
 x.fillStyle='#f5f7fc';x.font=`800 64px ${font}`;x.fillText(money(cash()),W/2,1015);
 const d=(candles[WARM]||candles[0]).date||'';
 x.fillStyle='#9b9ba3';x.font=`600 40px ${font}`;x.fillText(`${stock.name} (${stock.ticker}) · ${d.slice(0,4)}`,W/2,1085);
 x.fillStyle='#e6bc55';x.font=`900 56px ${font}`;x.fillText(`${t('headline1')} ${t('headline2')}`,W/2,1200,W-120);
 x.fillStyle='#6f6f78';x.font=`600 32px ${font}`;x.fillText('chart riders',W/2,1290);
 return new Promise(res=>c.toBlob(res,'image/png'));
}
async function share(){
 const url=CFG.siteUrl||location.href.split('#')[0];
 const text=t('shareText').replace('{r}',pct(calcReturn()));
 track('demo_share_click');
 try{
  if(navigator.share){
   let data={title:'Chart Riders',text,url};
   try{const blob=await makeShareImage();const file=new File([blob],'chart-riders-result.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[file]}))data={files:[file],text:text+'\n'+url};}catch(_){}
   await navigator.share(data);track('demo_share_done');return;
  }
 }catch(e){if(e&&e.name==='AbortError')return;}
 try{await navigator.clipboard.writeText(text+'\n'+url);toast(t('copied'));track('demo_share_copy');}catch(_){toast(text);}
}
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2200);}

/* ---------- chart ---------- */
let W=360,H=300,DPR=1;
function resizeCanvas(){
 const canvas=$('chart');DPR=Math.min(window.devicePixelRatio||1,3);
 W=Math.max(200,canvas.clientWidth||360);H=canvas.clientHeight;if(!H||H<80)H=Math.round(W*.72);
 canvas.width=Math.round(W*DPR);canvas.height=Math.round(H*DPR);
 drawChart();
}
function drawChart(){
 const dateCandle=partial||shown[shown.length-1];
 if(dateCandle&&dateCandle.date){const d=dateCandle.date;$('nativeDate').textContent=`${d.slice(0,4)}.${d.slice(4,6)}.${d.slice(6,8)}`;}
 const canvas=$('chart'),ctx=canvas.getContext('2d');
 ctx.setTransform(DPR,0,0,DPR,0,0);ctx.clearRect(0,0,W,H);
 const all=[...shown,...(partial?[partial]:[])];
 if(!all.length)return;
 const recent=all.slice(-60);
 const hi=Math.max(...recent.map(c=>c.h)),lo=Math.min(...recent.map(c=>c.l));
 const span=Math.max(hi-lo,hi*.02),pad=span*.12;
 const axisW=46,left=4,right=W-axisW;
 const top=10,bottom=H*.76;
 const y=p=>bottom-(p-(lo-pad))/(span+2*pad)*(bottom-top);
 const slots=60,step=(right-left)/(slots+1);
 const first=Math.max(0,all.length-60);
 ctx.font='11px -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif';ctx.textAlign='left';
 for(let i=0;i<=4;i++){
  const v=lo-pad+(span+2*pad)*i/4,yy=Math.round(y(v))+.5;
  ctx.strokeStyle='#24242b';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(right,yy);ctx.stroke();
  ctx.fillStyle='#8b8a92';ctx.fillText(v.toFixed(v<100?2:1),right+5,yy+4);
 }
 const xAt=i=>left+(i-first+.5)*step;
 const bodyW=Math.max(1.5,step*.62);
 for(let i=first;i<all.length;i++){
  const c=all[i],x=xAt(i),up=c.c>=c.o;
  ctx.strokeStyle=ctx.fillStyle=up?'#58b79b':'#bc7e89';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(x,y(c.h));ctx.lineTo(x,y(c.l));ctx.stroke();
  const yy=y(Math.max(c.o,c.c)),hh=Math.max(1,y(Math.min(c.o,c.c))-yy);
  ctx.fillRect(x-bodyW/2,yy,bodyW,hh);
 }
 for(const [n,color] of [[5,'#e9c55e'],[20,'#78a6d5']]){
  ctx.beginPath();ctx.strokeStyle=color;ctx.lineWidth=1.2;let begun=false;
  for(let i=Math.max(first,n-1);i<all.length;i++){
   const ma=all.slice(i-n+1,i+1).reduce((s,c)=>s+c.c,0)/n,x=xAt(i);
   if(!begun){ctx.moveTo(x,y(ma));begun=true;}else ctx.lineTo(x,y(ma));
  }
  if(begun)ctx.stroke();
 }
 function marker(trade,label,color){
  if(!trade||trade.price<lo-pad||trade.price>hi+pad)return;
  const yy=y(trade.price);
  ctx.strokeStyle=color;ctx.lineWidth=1.2;ctx.setLineDash([5,4]);
  ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(right,yy);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle=color;ctx.font='bold 12px -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif';ctx.fillText(label,right+5,yy-5);
 }
 marker(entry,'B','#4fba8a');marker(exit,'S','#d9697d');
 const volumeTop=H*.82,volumeBottom=H-4;
 const maxVolume=Math.max(1,...recent.map(c=>c.v||0));
 for(let i=first;i<all.length;i++){
  const c=all[i],x=xAt(i);
  ctx.fillStyle=c.c>=c.o?'#3b6258':'#684c56';
  const h=(c.v||0)/maxVolume*(volumeBottom-volumeTop);
  ctx.fillRect(x-bodyW/2,volumeBottom-h,bodyW,h);
 }
 ctx.strokeStyle='#2c2c33';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(left,Math.round(H*.79)+.5);ctx.lineTo(right,Math.round(H*.79)+.5);ctx.stroke();
}

/* ---------- links ---------- */
function setupLinks(){
 const os=detectOS();
 document.body.dataset.os=os;
 const map=[['iosLink','iosUrl','ios'],['androidLink','androidUrl','android']];
 map.forEach(([id,key,store])=>{
  const el=$(id),url=CFG[key];
  if(url&&/^https:\/\//.test(url)){el.href=url;el.target='_blank';el.rel='noopener noreferrer';el.addEventListener('click',()=>track('store_click',{store}));}
  else el.addEventListener('click',e=>{e.preventDefault();$('storeNotice').classList.remove('hide');});
 });
 if(os==='ios')$('androidLink').classList.add('hide');
 if(os==='android')$('iosLink').classList.add('hide');
 if(os!=='other')$('storeButtons').classList.add('single');
 const sup=$('supportLink');
 if(CFG.supportUrl&&/^https:\/\//.test(CFG.supportUrl)){sup.href=CFG.supportUrl;sup.target='_blank';sup.rel='noopener noreferrer';}
 else{sup.classList.add('hide');document.querySelector('footer .sep').classList.add('hide');}
}

/* ---------- boot ---------- */
$('advance').addEventListener('click',()=>{if(modalAction)modalAction();});
$('buy').addEventListener('click',buy);$('sell').addEventListener('click',sell);
$('replay').addEventListener('click',replay);$('share').addEventListener('click',share);
$('lang').addEventListener('change',e=>{updateLang(e.target.value,true);track('language_change');});
function detectBrowserLanguage(){
 // Use the user's preferred language order, not IP/geolocation.
 const preferences=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en']);
 for(const raw of preferences){
  const code=String(raw||'').toLowerCase().replace(/_/g,'-');
  for(const l of ['ko','en','ja','fr','es'])if(code===l||code.startsWith(l+'-'))return l;
  // Traditional Chinese only; simplified Chinese is not offered in the demo.
  if(/^zh-(tw|hk|mo)(-|$)/.test(code)||/^zh-hant(-|$)/.test(code))return 'zh';
 }
 return 'en';
}
function initialLanguage(){try{const saved=localStorage.getItem('chartRidersDemoLanguage');if(saved&&D[saved])return saved;}catch(_){}return detectBrowserLanguage();}
if('ResizeObserver' in window)new ResizeObserver(()=>resizeCanvas()).observe($('chart'));else window.addEventListener('resize',resizeCanvas);
chooseStock();setupLinks();updateLang(initialLanguage());resizeCanvas();
