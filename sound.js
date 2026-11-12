'use strict';
/* Sound — port of lib/services/sound_service.dart + music_service.dart.
   Web Audio for effects (low latency, one voice per effect like the app's AudioPool),
   a looping <audio> element for music at the app's volume (0.45).
   Nothing plays until the first tap (browser autoplay rules); the toggle is remembered per device. */
(function(){
 const V='?v=3.8';
 const SFX={buttonTap:'sfx_button_tap.mp3',countdownTick:'sfx_countdown_tick.mp3',correct:'sfx_correct.mp3',wrong:'sfx_wrong.mp3',streakMilestone:'sfx_streak_milestone.mp3'};
 const MUSIC_VOLUME=.45;
 let ctx=null,sfxGain=null,musicGain=null,musicEl=null,musicNode=null,unlocked=false,wantMusic=false,hidden=false;
 const buffers={},playing={};
 let enabled=true;
 try{enabled=localStorage.getItem('chartRidersSound')!=='off';}catch(_){}

 function ensureContext(){
  if(ctx)return ctx;
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;
  ctx=new AC();sfxGain=ctx.createGain();sfxGain.connect(ctx.destination);
  musicGain=ctx.createGain();musicGain.gain.value=MUSIC_VOLUME;musicGain.connect(ctx.destination);
  for(const k in SFX)load(k);
  return ctx;
 }
 async function load(name){
  try{
   const res=await fetch(SFX[name]+V);const data=await res.arrayBuffer();
   buffers[name]=await new Promise((ok,bad)=>{const p=ctx.decodeAudioData(data,ok,bad);if(p&&p.then)p.then(ok,bad);});
  }catch(_){/* sound must never interrupt gameplay */}
 }
 function ensureMusic(){
  if(musicEl||!ctx)return;
  musicEl=new Audio('bgm.mp3'+V);musicEl.loop=true;musicEl.preload='auto';musicEl.crossOrigin='anonymous';
  try{musicNode=ctx.createMediaElementSource(musicEl);musicNode.connect(musicGain);}catch(_){musicEl.volume=MUSIC_VOLUME;}
 }
 function syncMusic(){
  if(!musicEl)return;
  const on=enabled&&wantMusic&&!hidden&&unlocked;
  if(on){const p=musicEl.play();if(p&&p.catch)p.catch(()=>{});}else musicEl.pause();
 }
 // Call from a user gesture (tap). Unlocks audio on iOS/Android.
 function unlock(){
  if(!ensureContext())return;
  if(ctx.state==='suspended')ctx.resume().catch(()=>{});
  if(!unlocked){
   const b=ctx.createBuffer(1,1,22050),s=ctx.createBufferSource();s.buffer=b;s.connect(ctx.destination);s.start(0);
   unlocked=true;
  }
  if(enabled&&wantMusic)ensureMusic();syncMusic();
 }
 function play(name){
  if(!enabled||!ctx||!buffers[name])return;
  try{
   if(playing[name])try{playing[name].stop();}catch(_){}
   const s=ctx.createBufferSource();s.buffer=buffers[name];s.connect(sfxGain);s.start(0);
   playing[name]=s;s.onended=()=>{if(playing[name]===s)delete playing[name];};
  }catch(_){}
 }
 function stopAll(){for(const k in playing){try{playing[k].stop();}catch(_){}delete playing[k];}}
 function setEnabled(on){
  enabled=on;try{localStorage.setItem('chartRidersSound',on?'on':'off');}catch(_){}
  if(!on)stopAll();
  if(on&&wantMusic&&ctx)ensureMusic();
  syncMusic();
 }
 function startMusic(){wantMusic=true;if(enabled)ensureMusic();syncMusic();}   // music file (~1 MB) is fetched only when it will actually play
 document.addEventListener('visibilitychange',()=>{hidden=document.hidden;if(hidden)stopAll();syncMusic();if(!hidden&&ctx&&ctx.state==='suspended')ctx.resume().catch(()=>{});});
 // any first tap anywhere unlocks audio
 const first=()=>{unlock();removeEventListener('pointerdown',first,true);removeEventListener('keydown',first,true);};
 addEventListener('pointerdown',first,true);addEventListener('keydown',first,true);

 window.Sound={play,stopAll,unlock,startMusic,setEnabled,get enabled(){return enabled;}};
})();
