(() => {
 const viewport=document.getElementById('home-cases');
 const ko=document.documentElement.lang==='ko';
 const labels=ko?{prev:'이전 사건',next:'다음 사건',help:'좌우로 드래그하거나 휠을 돌려 사건을 선택하세요',region:'사건 롤러',item:'사건'}:{prev:'上一个故事',next:'下一个故事',help:'左右拖拽或滚动鼠标滚轮，翻阅故事',region:'故事滚筒',item:'故事'};
 viewport.classList.add('case-drum');viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-roledescription','carousel');viewport.setAttribute('aria-label',labels.region);
 const controls=document.createElement('div');controls.className='drum-controls';
 const prev=document.createElement('button');prev.className='drum-arrow';prev.type='button';prev.textContent=ko?'이전':'上一个';prev.setAttribute('aria-label',labels.prev);
 const next=document.createElement('button');next.className='drum-arrow';next.type='button';next.textContent=ko?'다음':'下一个';next.setAttribute('aria-label',labels.next);
 const count=document.createElement('span');count.className='drum-count';count.setAttribute('aria-live','polite');
 controls.append(prev,count,next);viewport.after(controls);
 const help=document.createElement('p');help.className='drum-help';help.textContent=labels.help;controls.after(help);
 const random=document.createElement('button');random.type='button';random.className='drum-random';random.textContent=ko?'무작위 사건 뽑기':'随机抽取案卷';help.after(random);
 const result=document.createElement('p');result.className='drum-result';result.setAttribute('role','status');result.setAttribute('aria-live','polite');random.after(result);
 const startButton=document.getElementById('start-game');
 random.after(startButton);
 let spinning=false,animation=0,spinTarget=0;
 let visual=chosenCase,gesture=null,suppressUntil=0,wheelTotal=0,wheelTimer=0;
 const clamp=n=>Math.max(0,Math.min(cases.length-1,n));
 function paint(position){
  const width=viewport.clientWidth||800;const step=Math.min(310,width*.62);
  [...viewport.children].forEach((card,i)=>{
   const offset=spinning?((i-position+cases.length*100+cases.length/2)%cases.length)-cases.length/2:i-position,depth=Math.min(Math.abs(offset),2);
   card.style.transform=`translate(-50%,-50%) translateX(${offset*step}px) translateZ(${-depth*115}px) rotateY(${-offset*25}deg) scale(${1-depth*.1})`;
   card.style.opacity=String(spinning?Math.max(0,1-depth/1.5):Math.max(0,1-Math.abs(offset)*.55));card.style.zIndex=String(10-Math.round(depth*3));
   card.style.visibility=Math.abs(offset)>2?'hidden':'visible';card.style.pointerEvents=Math.abs(offset)>1.8?'none':'';card.tabIndex=i===chosenCase?0:-1;
   card.setAttribute('aria-label',`${labels.item} ${i+1}: ${cases[i].title}`);
  });
 }
 window.updateCaseDrum=()=>{if(spinning)return;visual=chosenCase;paint(visual);count.textContent=`${String(chosenCase+1).padStart(2,'0')} / ${cases.length}`;prev.disabled=chosenCase===0;next.disabled=chosenCase===cases.length-1;};
 function choose(index){if(spinning)return;result.textContent="";const target=clamp(index);if(target!==chosenCase){chosenCase=target;renderHome();}else window.updateCaseDrum();}
 prev.onclick=()=>choose(chosenCase-1);next.onclick=()=>choose(chosenCase+1);
 viewport.addEventListener('keydown',e=>{if(spinning){e.preventDefault();return;}if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();choose(chosenCase+(e.key==='ArrowRight'?1:-1));}else if(e.key==='Home'||e.key==='End'){e.preventDefault();choose(e.key==='Home'?0:cases.length-1);}});
 viewport.addEventListener('pointerdown',e=>{if(spinning||e.button!==0||!e.isPrimary)return;gesture={id:e.pointerId,x:e.clientX,y:e.clientY,start:chosenCase,moved:false};});
 viewport.addEventListener('pointermove',e=>{
  if(!gesture||gesture.id!==e.pointerId)return;
  const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  if(!gesture.moved){if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){gesture=null;return;}if(Math.abs(dx)<7)return;gesture.moved=true;viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');}
  visual=clamp(gesture.start-dx/Math.min(260,viewport.clientWidth*.6));paint(visual);
 });
 function end(e,cancel=false){if(!gesture||gesture.id!==e.pointerId)return;const g=gesture;gesture=null;viewport.classList.remove('dragging');if(g.moved){suppressUntil=Date.now()+400;const delta=visual-g.start;const target=cancel?g.start:(Math.abs(delta)>.18?g.start+Math.sign(delta):g.start);if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);choose(target);}}
 viewport.addEventListener('pointerup',e=>end(e));viewport.addEventListener('pointercancel',e=>end(e,true));
 viewport.addEventListener('lostpointercapture',e=>{if(gesture)end(e,true)});
 viewport.addEventListener('pointerleave',()=>{if(gesture&&!gesture.moved)gesture=null});
 viewport.addEventListener('click',e=>{if(spinning||Date.now()<suppressUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
 viewport.addEventListener('dragstart',e=>e.preventDefault());
 viewport.addEventListener('wheel',e=>{
  if(spinning){e.preventDefault();return;}if(e.ctrlKey||gesture)return;
  const raw=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
  const delta=raw*(e.deltaMode===1?16:e.deltaMode===2?viewport.clientWidth:1);
  if(!delta)return;
  if((chosenCase===0&&delta<0)||(chosenCase===cases.length-1&&delta>0))return;
  e.preventDefault();wheelTotal+=delta;clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>wheelTotal=0,160);
  if(Math.abs(wheelTotal)>=65){choose(chosenCase+Math.sign(wheelTotal));wheelTotal=0;}
 },{passive:false});
 new ResizeObserver(()=>paint(visual)).observe(viewport);
 function unlock(){spinning=false;cancelAnimationFrame(animation);viewport.classList.remove('spinning');viewport.setAttribute('aria-busy','false');random.disabled=false;startButton.disabled=false;random.textContent=ko?'다시 뽑기':'再抽一次';}
 function finish(){unlock();choose(spinTarget);result.textContent=(ko?'선택된 사건: ':'本次抽中：')+cases[spinTarget].title;}
 random.onclick=()=>{
  if(spinning||gesture)return;
  spinTarget=Math.floor(Math.random()*cases.length);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}
  const from=chosenCase,travel=cases.length*4+((spinTarget-from+cases.length)%cases.length),duration=3300;
  spinning=true;wheelTotal=0;clearTimeout(wheelTimer);prev.disabled=true;next.disabled=true;random.disabled=true;startButton.disabled=true;
  viewport.classList.add('spinning');viewport.setAttribute('aria-busy','true');random.textContent=ko?'사건을 뽑는 중…':'正在抽取…';result.textContent=ko?'롤러가 멈출 때까지 잠시 기다려 주세요.':'滚筒转动中，等待故事揭晓。';
  let began=null;
  function tick(now){if(!spinning)return;if(began===null)began=now;const t=Math.min(1,(now-began)/duration);visual=from+travel*(1-Math.pow(1-t,4));paint(visual);if(t<1)animation=requestAnimationFrame(tick);else finish();}
  animation=requestAnimationFrame(tick);
 };
 window.addEventListener('hashchange',()=>{if(spinning&&location.hash!=='#cases'){unlock();result.textContent='';window.updateCaseDrum();}});
 window.updateCaseDrum();
})();
