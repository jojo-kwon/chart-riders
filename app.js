'use strict';
const D={
 en:{eyebrow:'THE TRADING IQ CHALLENGE',headline:'',subhead:'One chart. One trade. Try it before you download.',demo:'INTERACTIVE DEMO · 1 ROUND',simulation:'SIMULATED',balance:'BALANCE',warmup:'30-DAY WARMUP',historical:'Historical daily prices · from game assets',entry:'ENTRY',return:'RETURN',day:'DAY',buy:'BUY',sell:'SELL',tutorial:'QUICK TUTORIAL',complete:'DEMO COMPLETE',yourResult:'YOUR TRADING RESULT',iqTitle:'YOUR TRADING IQ',iqQuestion:"What's Your Trading IQ?",installPitch:'Install Chart Riders and complete 10 rounds to find out!',getGame:'TAKE THE FULL CHALLENGE',fullPitch:'10 rounds · Trading IQ · Tiers · Leaderboards',downloadOn:'Download on the',getIt:'GET IT ON',storeNotice:'Store link not configured yet.',disclaimer:'Historical price data comes from the Chart Riders app assets. All trading is virtual.',support:'Support & Privacy',ready:'Ready to trade?',instruction1:'Trading begins in 5 seconds. Tap BUY whenever you think the timing is right.',start:'GOT IT',bought:'You bought!',instruction2:'Tap SELL whenever you think the timing is right.',continue:'CONTINUE',finished:'Round complete!',instruction3:'Check your trading result. Your Trading IQ stays a mystery until you play the full game!',seeResult:'SEE RESULT',trading:'TRADING',holding:'POSITION OPEN',closed:'ROUND ENDED',auto:'Auto-sold at end of chart',noTrade:'No trade placed',headline1:'Think You Can',headline2:'Beat the Market?'},
 ko:{eyebrow:'트레이딩 IQ 챌린지',subhead:'차트 하나, 매매 한 번. 설치 전에 체험해 보세요.',demo:'웹 체험판 · 1판',simulation:'모의 거래',balance:'잔액',warmup:'30일 워밍업',historical:'실제 과거 일봉 · 게임 원본 데이터',entry:'매수가',return:'수익률',day:'일차',buy:'매수',sell:'매도',tutorial:'간단한 튜토리얼',complete:'체험 완료',yourResult:'나의 매매 결과',iqTitle:'나의 매매 IQ',iqQuestion:'당신의 매매 IQ는?',installPitch:'차트라이더를 설치하고 10판을 완료하면 확인할 수 있어요!',getGame:'이제 진짜 도전하세요',fullPitch:'10판 · 매매 IQ · 티어 · 랭킹',downloadOn:'다운로드',getIt:'다운로드',storeNotice:'아직 스토어 링크가 연결되지 않았습니다.',disclaimer:'차트라이더 앱에 포함된 과거 주가 데이터를 사용하며 모든 매매는 가상 거래입니다.',support:'고객지원 및 개인정보처리방침',ready:'매매할 준비가 됐나요?',instruction1:'5초 뒤 매매가 시작됩니다. 원하는 타이밍에 매수 버튼을 클릭하세요.',start:'확인',bought:'매수했습니다!',instruction2:'원하는 타이밍에 매도 버튼을 누르세요.',continue:'확인',finished:'거래가 종료됐어요!',instruction3:'매매 결과를 확인해 보세요. 매매 IQ는 정식 게임에서 10판을 완료하면 확인할 수 있습니다!',seeResult:'결과 확인',trading:'매매 진행 중',holding:'보유 중',closed:'라운드 종료',auto:'차트 종료 후 자동매도',noTrade:'매매하지 않음',headline1:'시장을 이길',headline2:'자신 있나요?'},
 ja:{eyebrow:'トレーディングIQチャレンジ',subhead:'一つのチャート、一回の取引。ダウンロード前に体験。',demo:'WEB体験版 · 1ラウンド',simulation:'模擬取引',balance:'残高',warmup:'30日ウォームアップ',historical:'実際の過去の株価 · ゲーム収録データ',entry:'買値',return:'収益率',day:'日目',buy:'買う',sell:'売る',tutorial:'かんたんチュートリアル',complete:'体験完了',yourResult:'取引結果',iqTitle:'あなたのトレーディングIQ',iqQuestion:'あなたのIQはいくつ？',installPitch:'アプリをインストールして10ラウンドをプレイすると確認できます！',getGame:'本番に挑戦',fullPitch:'10ラウンド · IQ · ティア · ランキング',downloadOn:'ダウンロード',getIt:'ダウンロード',storeNotice:'ストアリンクは未設定です。',disclaimer:'ゲーム収録の過去株価データを使用。取引はすべて仮想です。',support:'サポートとプライバシー',ready:'準備はいいですか？',instruction1:'5秒後に取引が始まります。好きなタイミングで「買う」を押してください。',start:'OK',bought:'購入しました！',instruction2:'好きなタイミングで「売る」を押してください。',continue:'続ける',finished:'ラウンド終了！',instruction3:'取引結果を確認しましょう。IQはアプリで10ラウンド終了後に確認できます！',seeResult:'結果を見る',trading:'取引中',holding:'保有中',closed:'終了',auto:'チャート終了後に自動売却',noTrade:'取引なし',headline1:'マーケットに',headline2:'勝てるか？'},
 fr:{eyebrow:'LE DÉFI DU QI TRADING',subhead:'Un graphique. Un trade. Essayez avant de télécharger.',demo:'DÉMO WEB · 1 MANCHE',simulation:'SIMULÉ',balance:'SOLDE',warmup:'30 JOURS INITIAUX',historical:'Cours historiques · données du jeu',entry:'ACHAT',return:'RENDEMENT',day:'JOUR',buy:'ACHETER',sell:'VENDRE',tutorial:'TUTORIEL RAPIDE',complete:'DÉMO TERMINÉE',yourResult:'VOTRE RÉSULTAT',iqTitle:'VOTRE QI TRADING',iqQuestion:'Quel est votre QI trading ?',installPitch:'Installez Chart Riders et terminez 10 manches pour le découvrir !',getGame:'RELEVEZ LE DÉFI COMPLET',fullPitch:'10 manches · QI · Niveaux · Classements',downloadOn:'Télécharger dans',getIt:'DISPONIBLE SUR',storeNotice:'Lien vers le store non configuré.',disclaimer:'Données historiques incluses dans le jeu. Transactions virtuelles.',support:'Assistance et confidentialité',ready:'Prêt à trader ?',instruction1:'Le trading commence dans 5 secondes. Appuyez sur ACHETER au bon moment.',start:'COMPRIS',bought:'Achat effectué !',instruction2:'Appuyez sur VENDRE au moment de votre choix.',continue:'CONTINUER',finished:'Manche terminée !',instruction3:'Découvrez votre résultat. Votre QI trading sera dévoilé après 10 manches dans l’application !',seeResult:'VOIR LE RÉSULTAT',trading:'EN COURS',holding:'POSITION OUVERTE',closed:'TERMINÉ',auto:'Vente automatique en fin de graphique',noTrade:'Aucune transaction',headline1:'Pouvez-vous battre',headline2:'le marché ?'},
 es:{eyebrow:'EL RETO DEL IQ TRADING',subhead:'Un gráfico. Una operación. Pruébalo antes de descargar.',demo:'DEMO WEB · 1 RONDA',simulation:'SIMULADO',balance:'SALDO',warmup:'30 DÍAS INICIALES',historical:'Precios históricos · datos del juego',entry:'COMPRA',return:'RENDIMIENTO',day:'DÍA',buy:'COMPRAR',sell:'VENDER',tutorial:'TUTORIAL RÁPIDO',complete:'DEMO TERMINADA',yourResult:'TU RESULTADO',iqTitle:'TU IQ DE TRADING',iqQuestion:'¿Cuál es tu IQ de trading?',installPitch:'¡Instala Chart Riders y completa 10 rondas para descubrirlo!',getGame:'ACEPTA EL RETO COMPLETO',fullPitch:'10 rondas · IQ · Niveles · Clasificaciones',downloadOn:'Descargar en',getIt:'DISPONIBLE EN',storeNotice:'Enlace de tienda sin configurar.',disclaimer:'Datos históricos incluidos en el juego. Todas las operaciones son virtuales.',support:'Ayuda y privacidad',ready:'¿Listo para operar?',instruction1:'Las operaciones comienzan en 5 segundos. Pulsa COMPRAR cuando quieras.',start:'ENTENDIDO',bought:'¡Has comprado!',instruction2:'Pulsa VENDER cuando creas que es el momento adecuado.',continue:'CONTINUAR',finished:'¡Ronda terminada!',instruction3:'Consulta tu resultado. ¡Descubre tu IQ completando 10 rondas en la app!',seeResult:'VER RESULTADO',trading:'OPERANDO',holding:'POSICIÓN ABIERTA',closed:'TERMINADO',auto:'Venta automática al finalizar',noTrade:'Sin operaciones',headline1:'¿Puedes vencer',headline2:'al mercado?'},
 zh:{eyebrow:'交易 IQ 挑戰',subhead:'一張走勢圖，一次交易。下載前先試玩。',demo:'網頁試玩 · 1 回合',simulation:'模擬交易',balance:'餘額',warmup:'30 天預熱',historical:'真實歷史日線 · 遊戲內建資料',entry:'買入價',return:'報酬率',day:'第幾天',buy:'買入',sell:'賣出',tutorial:'快速教學',complete:'試玩完成',yourResult:'交易結果',iqTitle:'你的交易 IQ',iqQuestion:'你的交易 IQ 是多少？',installPitch:'安裝 Chart Riders，完成 10 回合就能揭曉！',getGame:'接受完整挑戰',fullPitch:'10 回合 · 交易 IQ · 階級 · 排行榜',downloadOn:'下載於',getIt:'立即下載',storeNotice:'尚未設定商店連結。',disclaimer:'使用遊戲內建的歷史股價資料。所有交易均為虛擬交易。',support:'支援與隱私',ready:'準備好交易了嗎？',instruction1:'5 秒後開始交易。請在你認為適合的時機按下買入。',start:'確認',bought:'買入成功！',instruction2:'請在你認為適合的時機按下賣出。',continue:'繼續',finished:'回合結束！',instruction3:'查看你的交易結果。完成正式版 10 回合後才能揭曉交易 IQ！',seeResult:'查看結果',trading:'交易中',holding:'持倉中',closed:'已結束',auto:'走勢圖結束後自動賣出',noTrade:'未交易',headline1:'你能擊敗',headline2:'市場嗎？'}
};
const $=id=>document.getElementById(id);let lang='en',phase='intro',stock,candles=[],cursor=0,entry=null,exit=null,tradeTimer=null,autoTimer=null,spinTimer=null,modalAction=null,tickIndex=0,tickPath=[],partial=null,shown=[],livePrice=0;
const stocks=[{name:'Apple',ticker:'AAPL',start:172,seed:11},{name:'NVIDIA',ticker:'NVDA',start:135,seed:43},{name:'Tesla',ticker:'TSLA',start:265,seed:87}];
function randGen(seed){let v=seed;return()=>{v=(1664525*v+1013904223)>>>0;return v/4294967296;};}
function makeCandles(s){let r=randGen(s.seed+(Math.floor(Math.random()*1000)*179));let p=s.start;const out=[];for(let i=0;i<90;i++){let o=p;let drift=Math.sin(i/7+s.seed)*.013+(r()-.5)*.047;let c=Math.max(1,o*(1+drift));let h=Math.max(o,c)*(1+r()*.016),l=Math.min(o,c)*(1-r()*.016);out.push({o,c,h,l});p=c;}return out;}
function t(key){return (D[lang]||D.en)[key]||D.en[key]||key;}
function updateLang(next, remember=false){lang=D[next]?next:'en';if(remember){try{localStorage.setItem('chartRidersDemoLanguage',lang);}catch(_){}}document.documentElement.lang=lang;$('lang').value=lang;document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));document.querySelector('h1').innerHTML=`${t('headline1')} <em>${t('headline2')}</em>`;if(phase==='intro')showModal('ready','instruction1','start',startCountdown);else if(phase==='bought')showModal('bought','instruction2','continue',resumeAfterBuy);else if(phase==='summary')showModal('finished','instruction3','seeResult',revealResult);updateStats();}
function showModal(title,message,button,fn){$('modalTitle').textContent=t(title);$('modalMessage').textContent=t(message);$('advance').textContent=t(button);modalAction=fn;$('overlay').classList.remove('hide');}
function hideModal(){$('overlay').classList.add('hide');}
function clearClocks(){clearInterval(tradeTimer);clearInterval(autoTimer);tradeTimer=null;autoTimer=null;}
function chooseStock(){stock=stocks[Math.floor(Math.random()*stocks.length)];const windows=(window.CHART_RIDERS_HISTORY||{})[stock.ticker]||[];if(!windows.length)throw Error('Historical data missing: '+stock.ticker);candles=windows[Math.floor(Math.random()*windows.length)];cursor=0;tickIndex=0;tickPath=[];partial=null;shown=[];livePrice=candles[0].o;entry=exit=null;$('stockName').innerHTML=`${stock.name} <span>(${stock.ticker})</span>`;updateStats();drawChart();}
function prepareCandle(){
 if(cursor>=120)return;
 const c=candles[cursor], extremes=Math.random()<.5?[c.h,c.l]:[c.l,c.h],path=[c.o,...extremes,c.c];
 tickPath=[];
 for(let i=0;i<3;i++)for(let step=1;step<=3;step++)tickPath.push(path[i]+(path[i+1]-path[i])*step/3);
 tickIndex=0;livePrice=c.o;
 partial={o:c.o,h:c.o,l:c.o,c:c.o};
}
function advanceTick(){
 if(cursor>=120)return;
 if(!partial)prepareCandle();
 const v=tickPath[tickIndex++];
 livePrice=v;partial.c=v;partial.h=Math.max(partial.h,v);partial.l=Math.min(partial.l,v);
 if(tickIndex>=9){
  shown.push(candles[cursor]);cursor++;partial=null;
  if(cursor<120)prepareCandle();
 }
}
function startCountdown(){
 hideModal();clearClocks();phase='countdown';$('buy').disabled=true;$('sell').disabled=true;
 cursor=0;shown=[];partial=null;prepareCandle();
 let start=performance.now(),last=-1;
 $('countdown').classList.remove('hide');
 tradeTimer=setInterval(()=>{
  const elapsed=performance.now()-start;
  // 270 logical ticks over five seconds, as in Flutter's 30-day prerace.
  const target=Math.min(270,Math.floor(elapsed*270/5000));
  while(shown.length*9+tickIndex<target&&cursor<30)advanceTick();
  const seconds=Math.max(0,5-Math.floor(elapsed/1000));
  if(seconds!==last){$('countdown').textContent=seconds;last=seconds;}
  drawChart();updateStats();
  if(elapsed>=5000||cursor>=30){
   clearInterval(tradeTimer);tradeTimer=null;
   while(cursor<30)advanceTick();
   $('countdown').classList.add('hide');phase='trading';$('buy').disabled=false;runChart();
  }
 },16);
}
function runChart(){
 clearInterval(tradeTimer);
 // Flutter: 2 logical ticks each 16ms frame, 9 ticks per candle.
 let last=performance.now(),acc=0;
 tradeTimer=setInterval(()=>{
  if(!['trading','holding','postSell'].includes(phase))return;
  const now=performance.now();acc+=Math.min(now-last,80);last=now;
  let frames=0;
  while(acc>=16&&frames++<5&&cursor<120){
   acc-=16;
   advanceTick();if(cursor<120)advanceTick();
  }
  drawChart();updateStats();
  if(cursor>=120){
   clearInterval(tradeTimer);tradeTimer=null;
   if(phase==='holding')finish(true);
   else if(phase==='postSell'){phase='summary';showModal('finished','instruction3','seeResult',revealResult);}
   else finish(false);
  }
 },16);
}
function buy(){
 if(phase!=='trading'||cursor>=120)return;
 entry={price:livePrice,day:Math.max(1,cursor-29)};
 phase='bought';$('buy').disabled=true;$('sell').disabled=true;
 clearInterval(tradeTimer);updateStats();drawChart();
 showModal('bought','instruction2','continue',resumeAfterBuy);
}
function resumeAfterBuy(){hideModal();phase='holding';$('sell').disabled=false;runChart();}
function sell(){if(phase!=='holding'||entry===null)return;finish(false);}
function finish(automatic){
 if(['summary','result'].includes(phase))return;
 clearClocks();
 exit=entry!==null?{price:livePrice,day:Math.max(1,cursor-29),automatic}:null;
 $('buy').disabled=true;$('sell').disabled=true;
 updateStats();drawChart();
 // Flutter keeps playing the chart after a manual sale; demo result can be reviewed immediately.
 phase='summary';showModal('finished','instruction3','seeResult',revealResult);
}
function calcReturn(){return entry&&exit?(exit.price/entry.price-1)*100:0;}
function cash(){return 10000*(1+calcReturn()/100);}
function money(x){return '$'+x.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
function updateStats(){const current=partial||shown[shown.length-1]||candles[0];if(!current)return;$('price').textContent=money(livePrice);$('balance').textContent=money(phase==='result'?cash():10000);$('entry').textContent=entry?money(entry.price):'—';$('pnl').textContent=entry?((exit?calcReturn():(livePrice/entry.price-1)*100)>=0?'+':'')+(exit?calcReturn():(livePrice/entry.price-1)*100).toFixed(2)+'%':'—';$('tradeDay').textContent=String(Math.max(0,cursor-30+(partial&&cursor>=30?1:0)));$('dayCount').textContent=Math.max(0,cursor-30+(partial&&cursor>=30?1:0))+' / 90';$('chartStatus').textContent=phase==='intro'||phase==='countdown'?t('warmup'):phase==='summary'||phase==='result'?t('closed'):entry?t('holding'):t('trading');}
function revealResult(){hideModal();phase='result';const r=calcReturn();$('resultPercent').textContent=(r>=0?'+':'')+r.toFixed(2)+'%';$('resultPercent').classList.toggle('negative',r<0);$('resultBalance').textContent=money(cash());$('balance').textContent=money(cash());$('result').classList.remove('hide');document.body.classList.add('show-result');startSlots();}
function startSlots(){clearInterval(spinTimer);let frame=0;const slots=Array.from(document.querySelectorAll('.slot'));spinTimer=setInterval(()=>{frame++;slots.forEach((slot,i)=>{slot.textContent=(frame+i*3)%13<9?String((frame*7+i*3)%10):'?';});},85);}
function drawChart(){
 const canvas=$('chart'),ctx=canvas.getContext('2d');
 const W=canvas.width,H=canvas.height;
 ctx.clearRect(0,0,W,H);
 // Flutter's CandleChart only receives completed and currently forming candles.
 const all=[...shown,...(partial?[partial]:[])];
 if(!all.length)return;
 const recent=all.slice(-60);
 const hi=Math.max(...recent.map(c=>c.h)),lo=Math.min(...recent.map(c=>c.l));
 const span=Math.max(hi-lo,hi*.02),pad=span*.25;
 const top=20,bottom=H*.79;
 const y=p=>bottom-(p-(lo-pad))/(span+2*pad)*(bottom-top);
 const slots=Math.max(20,Math.min(60,all.length)),step=(W-72)/(slots+2);
 const first=Math.max(0,all.length-60),left=8;
 for(let i=0;i<=4;i++){
  const v=lo-pad+(span+2*pad)*i/4,yy=y(v);
  ctx.strokeStyle='#24324a';ctx.lineWidth=1;ctx.setLineDash([]);
  ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(W-64,yy);ctx.stroke();
  ctx.fillStyle='#8fa0b6';ctx.font='12px Arial';ctx.textAlign='left';
  ctx.fillText(v.toFixed(v<10?2:1),W-59,yy+4);
 }
 const xAt=i=>left+(i-first+.5)*step;
 for(let i=first;i<all.length;i++){
  const c=all[i],x=xAt(i),up=c.c>=c.o;
  const color=cursor<30?'#789c9b':up?'#39d4a2':'#ef6c7a';
  ctx.strokeStyle=ctx.fillStyle=color;ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(x,y(c.h));ctx.lineTo(x,y(c.l));ctx.stroke();
  const yy=y(Math.max(c.o,c.c)),hh=Math.max(1.5,y(Math.min(c.o,c.c))-yy);
  ctx.fillRect(x-step*.31,yy,Math.max(2,step*.62),hh);
 }
 // Original uses moving averages and volume bars, not a full-height buy-day line.
 for(const [n,color] of [[5,'#e9c55e'],[20,'#78a6d5']]){
  ctx.beginPath();ctx.strokeStyle=color;ctx.lineWidth=1.4;ctx.setLineDash([]);
  let begun=false;
  for(let i=first;i<all.length;i++){
   if(i<n-1)continue;
   const ma=all.slice(i-n+1,i+1).reduce((sum,c)=>sum+c.c,0)/n;
   const x=xAt(i);
   if(!begun){ctx.moveTo(x,y(ma));begun=true;}else ctx.lineTo(x,y(ma));
  }
  if(begun)ctx.stroke();
 }
 // Trade markers: original horizontal price-level B/S markers at the chart edge.
 function marker(trade,label,color){
  if(!trade||trade.price<lo-pad||trade.price>hi+pad)return;
  const yy=y(trade.price);
  ctx.strokeStyle=color;ctx.lineWidth=1.4;ctx.setLineDash([5,4]);
  ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(W-64,yy);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle=color;ctx.font='bold 13px Arial';ctx.textAlign='left';ctx.fillText(label,W-55,yy-4);
 }
 marker(entry,'B','#4fba8a');marker(exit,'S','#d9697d');
 const volumeTop=H*.85,volumeBottom=H-12;
 const maxVolume=Math.max(1,...recent.map(c=>c.v||1));
 for(let i=first;i<all.length;i++){
  const c=all[i],x=xAt(i);
  ctx.fillStyle=c.c>=c.o?'#246a59':'#79424d';
  const height=(c.v||1)/maxVolume*(volumeBottom-volumeTop);
  ctx.fillRect(x-step*.31,volumeBottom-height,Math.max(2,step*.62),height);
 }
 ctx.strokeStyle='#344158';ctx.beginPath();ctx.moveTo(8,H*.84);ctx.lineTo(W-64,H*.84);ctx.stroke();
}
function setupLinks(){const cfg=window.CHART_RIDERS_CONFIG||{};[['iosLink','iosUrl'],['androidLink','androidUrl'],['supportLink','supportUrl']].forEach(([id,key])=>{const el=$(id);const url=cfg[key];if(url&&/^https:\/\//.test(url)){el.href=url;el.target='_blank';el.rel='noopener noreferrer';}else{el.addEventListener('click',e=>{e.preventDefault();$('storeNotice').classList.remove('hide');if(id==='supportLink')$('storeNotice').scrollIntoView({behavior:'smooth'});});}});}
$('advance').addEventListener('click',()=>{if(modalAction)modalAction();});$('buy').addEventListener('click',buy);$('sell').addEventListener('click',sell);$('lang').addEventListener('change',e=>updateLang(e.target.value,true));
function detectBrowserLanguage(){
  // Use the user's preferred language order, not IP/geolocation.
  const preferences=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en']);
  for(const raw of preferences){
    const code=String(raw||'').toLowerCase().replace(/_/g,'-');
    if(code==='ko'||code.startsWith('ko-'))return 'ko';
    if(code==='en'||code.startsWith('en-'))return 'en';
    if(code==='ja'||code.startsWith('ja-'))return 'ja';
    if(code==='fr'||code.startsWith('fr-'))return 'fr';
    if(code==='es'||code.startsWith('es-'))return 'es';
    // Traditional Chinese only; simplified Chinese is not offered in the demo.
    if(/^zh-(tw|hk|mo)(-|$)/.test(code)||/^zh-hant(-|$)/.test(code))return 'zh';
  }
  return 'en';
}
function initialLanguage(){
  try{const saved=localStorage.getItem('chartRidersDemoLanguage');if(saved&&D[saved])return saved;}catch(_){}
  return detectBrowserLanguage();
}
chooseStock();setupLinks();updateLang(initialLanguage());
