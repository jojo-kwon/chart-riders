'use strict';
/* Port of lib/widgets/candle_chart.dart (CandleChart + _CandlePainter). */
(function(){
const MAX_VISIBLE=60;
const UP='#4FBA8A',DOWN='#D9697D';                 // MarketStyle: NASDAQ is green-up
const MA5='#FF9800',MA20='rgba(26,115,232,0.6)';   // Colors.orange, Color(0x991A73E8)
const GRID='rgba(63,63,70,0.149)';                 // Color(0x263F3F46)
const AXIS='#8E8E93';
const FONT='-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Arial,sans-serif';

function hexToRgb(h){h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255);}
function rgbToHsl([r,g,b]){const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;
 if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6;}return [h,s,l];}
function hslToRgb([h,s,l]){if(!s)return [l,l,l];const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;
 const f=t=>{t<0&&(t+=1);t>1&&(t-=1);return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p;};return [f(h+1/3),f(h),f(h-1/3)];}
function rgba(rgb,a){return `rgba(${rgb.map(v=>Math.round(v*255)).join(',')},${a})`;}
// _warmTone: lower saturation/contrast for warm-up candles.
function warmTone(hex,opacity=.72){const [h,s,l]=rgbToHsl(hexToRgb(hex));
 return rgba(hslToRgb([h,Math.min(1,Math.max(0,s*.36)),Math.min(1,Math.max(0,l*.90+.045))]),opacity);}
function withOpacity(hex,a){return rgba(hexToRgb(hex),a);}
const WARM={up:warmTone(UP),down:warmTone(DOWN),upVol:warmTone(UP,.34),downVol:warmTone(DOWN,.34),
 ma5:warmTone('#FF9800',.62),ma20:warmTone('#1A73E8',.62)};
const LIVE_VOL={up:withOpacity(UP,.55),down:withOpacity(DOWN,.55)};

function formatVolume(v){
 if(v>=1e9)return (v/1e9).toFixed(1)+'B';
 if(v>=1e6)return (v/1e6).toFixed(1)+'M';
 if(v>=1e3)return (v/1e3).toFixed(0)+'K';
 return v.toFixed(0);
}

class CandleChart{
 constructor(canvas,historyCount,market){
  this.cv=canvas;this.ctx=canvas.getContext('2d');this.historyCount=historyCount;this.market=market;
  this.W=360;this.H=300;this.dpr=1;this.raf=0;this.lastTick=null;
  this.completed=[];this.partial=null;this.buyPrice=null;this.sellPrice=null;
  this.reset();
  if('ResizeObserver' in window)new ResizeObserver(()=>this.resize()).observe(canvas);else addEventListener('resize',()=>this.resize());
 }
 reset(){
  this.initialized=false;this.lastCount=0;this.lastRangeChangeCount=0;this.firstDate=null;
  this.low=0;this.high=1;this.slots=20;this.start=0;this.tLow=0;this.tHigh=1;this.tSlots=20;this.tStart=0;
  this.completed=[];this.partial=null;
  if(this.raf)cancelAnimationFrame(this.raf);this.raf=0;this.lastTick=null;
 }
 resize(){
  this.dpr=Math.min(window.devicePixelRatio||1,3);
  this.W=Math.max(200,this.cv.clientWidth||360);this.H=Math.max(140,this.cv.clientHeight||300);
  this.cv.width=Math.round(this.W*this.dpr);this.cv.height=Math.round(this.H*this.dpr);
  this.paint();
 }
 setData(completed,partial,buyPrice,sellPrice){
  this.completed=completed;this.partial=partial;this.buyPrice=buyPrice;this.sellPrice=sellPrice;
  this.updateTargets();this.paint();
 }
 // _updateTargets: viewport targets with hysteresis; reads only revealed candles.
 updateTargets(){
  const all=this.partial?[...this.completed,this.partial]:this.completed;
  const reset=all.length<this.lastCount||(all.length&&this.firstDate!==all[0].date);
  this.lastCount=all.length;
  if(!all.length){this.initialized=false;return;}
  this.firstDate=all[0].date;
  const recent=all.slice(Math.max(0,all.length-MAX_VISIBLE));
  let rawHigh=-Infinity,rawLow=Infinity;for(const c of recent){if(c.h>rawHigh)rawHigh=c.h;if(c.l<rawLow)rawLow=c.l;}
  const span=Math.max(rawHigh-rawLow,Math.max(Math.max(Math.abs(rawHigh),Math.abs(rawLow))*.02,1e-6));
  const pad=span*.25;
  this.tSlots=Math.min(MAX_VISIBLE,Math.max(20,all.length));
  this.tStart=Math.max(0,all.length-MAX_VISIBLE);
  if(!this.initialized||reset){
   this.tLow=this.low=rawLow-pad;this.tHigh=this.high=rawHigh+pad;
   this.slots=this.tSlots;this.start=this.tStart;this.lastRangeChangeCount=all.length;this.initialized=true;
   return;
  }
  const range=this.tHigh-this.tLow;
  if(rawLow<this.tLow+range*.08||rawHigh>this.tHigh-range*.08){
   // expand early, in padded steps
   this.tLow=Math.min(this.tLow,rawLow-pad);this.tHigh=Math.max(this.tHigh,rawHigh+pad);this.lastRangeChangeCount=all.length;
  }else if(all.length>MAX_VISIBLE&&all.length-this.lastRangeChangeCount>=20&&span+2*pad<range*.55){
   // zoom back in only after old extremes left the window, 20-candle cooldown
   this.tLow=rawLow-pad;this.tHigh=rawHigh+pad;this.lastRangeChangeCount=all.length;
  }
  if(!this.raf&&this.needsAnimation()){this.lastTick=null;this.raf=requestAnimationFrame(ts=>this.animate(ts));}
 }
 needsAnimation(){
  const eps=(this.tHigh-this.tLow)*1e-4;
  return Math.abs(this.high-this.tHigh)>eps||Math.abs(this.low-this.tLow)>eps||Math.abs(this.slots-this.tSlots)>.001||Math.abs(this.start-this.tStart)>.001;
 }
 // _animateViewport: frame-rate-independent easing (axis τ=0.10s, horizontal τ=0.055s).
 animate(ts){
  const prev=this.lastTick;this.lastTick=ts;
  if(prev!=null){
   const dt=Math.min(.1,(ts-prev)/1000);
   const ab=1-Math.exp(-dt/.10),hb=1-Math.exp(-dt/.055);
   this.low+=(this.tLow-this.low)*ab;this.high+=(this.tHigh-this.high)*ab;
   this.slots+=(this.tSlots-this.slots)*hb;this.start+=(this.tStart-this.start)*hb;
   if(!this.needsAnimation()){this.low=this.tLow;this.high=this.tHigh;this.slots=this.tSlots;this.start=this.tStart;this.raf=0;this.lastTick=null;this.paint();return;}
   this.paint();
  }
  this.raf=requestAnimationFrame(t=>this.animate(t));
 }
 text(str,size,color,weight=''){const c=this.ctx;c.font=`${weight} ${size}px ${FONT}`.trim();c.fillStyle=color;return c.measureText(str).width;}

 paint(){
  const ctx=this.ctx,{W,H,dpr}=this;
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
  const all=this.partial?[...this.completed,this.partial]:this.completed;
  if(!all.length)return;
  const visibleStart=Math.max(0,Math.min(all.length-1,Math.floor(this.start)));
  const visible=all.slice(visibleStart);
  // geometry mirrors Guess Hitters CandleChartView
  const topPad=22,leftPad=8,bottomPad=16,rightPad=64;
  const fullLeft=leftPad,fullTop=topPad,fullWidth=Math.max(1,W-leftPad-rightPad),fullHeight=Math.max(1,H-topPad-bottomPad);
  const volumeHeight=fullHeight*.16,legendRow=16,topGap=4,bottomGap=6;
  const priceHeight=fullHeight-volumeHeight-legendRow-topGap-bottomGap;
  const plotTop=fullTop,plotBottom=plotTop+priceHeight,legendY=plotBottom+topGap;
  const dividerY=legendY+legendRow+bottomGap/2,volumeTop=dividerY+bottomGap/2;
  const low=this.low,high=this.high,range=Math.max(1e-7,high-low);
  const y=p=>plotBottom-(p-low)/range*priceHeight;
  const slot=fullWidth/(this.slots+2),bw=Math.max(2,slot*.62);
  const candleLeft=fullLeft+(visibleStart-this.start)*slot;
  const right=fullLeft+fullWidth;

  // price grid + axis labels + currency unit
  const tick=Math.abs(high-low)/4;
  const decimals=tick>0?Math.min(6,Math.max(1,1-Math.floor(Math.log10(tick)))):2;
  ctx.textBaseline='middle';
  for(let i=0;i<=4;i++){
   const price=low+(high-low)*i/4,yy=y(price);
   ctx.strokeStyle=GRID;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(fullLeft,yy);ctx.lineTo(right,yy);ctx.stroke();
   const s=price.toFixed(decimals),w=this.text(s,9,AXIS);ctx.fillText(s,W-4-w,yy);
  }
  ctx.textBaseline='top';
  {const s='USD',w=this.text(s,7,'rgba(142,142,147,0.7)');ctx.fillText(s,right-w,plotTop-15);}

  ctx.save();ctx.beginPath();ctx.rect(fullLeft,plotTop,fullWidth,plotBottom-plotTop);ctx.clip();
  // candles
  for(let i=0;i<visible.length;i++){
   const c=visible[i],x=candleLeft+i*slot+slot/2,warm=visibleStart+i<this.historyCount,up=c.c>=c.o;
   const color=warm?(up?WARM.up:WARM.down):(up?UP:DOWN);
   ctx.strokeStyle=ctx.fillStyle=color;ctx.lineWidth=1.3;
   ctx.beginPath();ctx.moveTo(x,y(c.h));ctx.lineTo(x,y(c.l));ctx.stroke();
   const oy=y(c.o),cy=y(c.c);
   if(Math.abs(c.c-c.o)<=Math.max(Math.abs(c.o),1)*1e-10){ctx.beginPath();ctx.moveTo(x-bw/2,oy);ctx.lineTo(x+bw/2,oy);ctx.stroke();}
   else{const top=Math.min(oy,cy),h=Math.max(1,Math.abs(cy-oy));ctx.beginPath();ctx.roundRect?ctx.roundRect(x-bw/2,top,bw,h,1):ctx.rect(x-bw/2,top,bw,h);ctx.fill();}
  }
  // moving averages (computed over all revealed candles, warm-up included)
  for(const [period,color,warmColor] of [[5,MA5,WARM.ma5],[20,MA20,WARM.ma20]]){
   if(all.length<period)continue;
   let rolling=0;const vals=new Array(all.length).fill(null);
   for(let i=0;i<all.length;i++){rolling+=all[i].c;if(i>=period)rolling-=all[i-period].c;if(i>=period-1)vals[i]=rolling/period;}
   ctx.lineWidth=1.5;ctx.lineCap='round';
   let prev=null,prevIdx=null;
   for(let i=0;i<visible.length;i++){
    const v=vals[visibleStart+i];if(v==null){prev=null;continue;}
    const gi=visibleStart+i,pt=[candleLeft+i*slot+slot/2,y(v)];
    if(prev){ctx.strokeStyle=(gi<this.historyCount||prevIdx<this.historyCount)?warmColor:color;ctx.beginPath();ctx.moveTo(prev[0],prev[1]);ctx.lineTo(pt[0],pt[1]);ctx.stroke();}
    prev=pt;prevIdx=gi;
   }
   ctx.lineCap='butt';
  }
  ctx.restore();

  // legend
  ctx.textBaseline='top';
  for(const [c,label,lx] of [[MA5,'MA 5',fullLeft],[MA20,'MA 20',fullLeft+62]]){
   ctx.fillStyle=c;ctx.beginPath();ctx.arc(lx+3,legendY+3,3,0,Math.PI*2);ctx.fill();
   this.text(label,8.5,AXIS);ctx.fillText(label,lx+10,legendY-2);
  }
  ctx.strokeStyle='rgba(255,255,255,0.12)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(fullLeft,dividerY);ctx.lineTo(right,dividerY);ctx.stroke();

  // volumes
  let maxV=0;for(const c of visible)if(c.v>maxV)maxV=c.v;
  if(maxV>0){
   ctx.textBaseline='middle';
   for(let i=0;i<=2;i++){
    const vol=maxV*i/2,yy=volumeTop+volumeHeight-(vol/maxV)*volumeHeight;
    ctx.strokeStyle='rgba(142,142,147,0.12)';ctx.lineWidth=.75;ctx.beginPath();ctx.moveTo(fullLeft,yy);ctx.lineTo(right,yy);ctx.stroke();
    const s=formatVolume(vol),w=this.text(s,8,AXIS);ctx.fillText(s,W-4-w,yy);
   }
   ctx.textBaseline='top';
   {const s='Volume',w=this.text(s,7,'rgba(142,142,147,0.7)');ctx.fillText(s,right-w,volumeTop-15);}
   ctx.save();ctx.beginPath();ctx.rect(fullLeft,volumeTop,right-fullLeft,volumeHeight);ctx.clip();
   for(let i=0;i<visible.length;i++){
    const c=visible[i];if(c.v<=0)continue;
    const x=fullLeft+(visibleStart+i-this.start)*slot+slot/2,h=c.v/maxV*volumeHeight,up=c.c>=c.o;
    ctx.fillStyle=visibleStart+i<this.historyCount?(up?WARM.upVol:WARM.downVol):(up?LIVE_VOL.up:LIVE_VOL.down);
    ctx.beginPath();ctx.roundRect?ctx.roundRect(x-bw/2,volumeTop+volumeHeight-h,bw,h,1):ctx.rect(x-bw/2,volumeTop+volumeHeight-h,bw,h);ctx.fill();
   }
   ctx.restore();
  }

  // trade markers: faint line across, pill label at the left edge
  const marker=(price,label,color)=>{
   if(price==null||price<low||price>high)return;
   const yy=y(price);
   ctx.strokeStyle=withOpacity(color,.35);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,yy);ctx.lineTo(right,yy);ctx.stroke();
   const w=this.text(label,9,'#111114','900');
   ctx.fillStyle=color;ctx.beginPath();ctx.roundRect?ctx.roundRect(2,yy-16,w+8,14,4):ctx.rect(2,yy-16,w+8,14);ctx.fill();
   ctx.textBaseline='top';this.text(label,9,'#111114','900');ctx.fillText(label,6,yy-15);
  };
  marker(this.buyPrice,'B','#4FBA8A');marker(this.sellPrice,'S','#D9697D');
 }
}
window.CandleChart=CandleChart;
})();
