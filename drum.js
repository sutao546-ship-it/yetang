(() => {
 const viewport=document.getElementById('home-cases');
 const ko=document.documentElement.lang==='ko';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const t=(zh,kr)=>ko?kr:zh;
 const shell=document.createElement('section');shell.className='case-book';
 const left=document.createElement('div');left.className='book-left';
 const kicker=document.createElement('span');kicker.className='book-kicker';kicker.textContent='MIDNIGHT / CASE FILES';
 const heading=document.createElement('h3');heading.textContent=t('夜汤档案集','야탕 사건집');
 const meta=document.createElement('p');meta.className='book-meta';
 left.append(kicker,heading,meta);
 viewport.before(shell);shell.append(left,viewport);
 viewport.classList.add('case-book-pages');viewport.tabIndex=0;
 viewport.setAttribute('role','region');viewport.setAttribute('aria-label',t('案卷书，使用左右方向键翻页','사건 책, 좌우 방향키로 넘기기'));
 const controls=document.createElement('div');controls.className='drum-controls';
 const prev=document.createElement('button');prev.type='button';prev.className='drum-arrow';prev.textContent=t('上一页','이전 쪽');
 const next=document.createElement('button');next.type='button';next.className='drum-arrow';next.textContent=t('下一页','다음 쪽');
 const count=document.createElement('span');count.className='drum-count';count.setAttribute('aria-live','polite');
 controls.append(prev,count,next);shell.after(controls);
 const help=document.createElement('p');help.className='drum-help';help.textContent=t('轻扫书页或点击翻页，挑选今晚的故事。','책장을 쓸어 넘기거나 버튼으로 오늘의 이야기를 골라 보세요.');controls.after(help);
 const random=document.createElement('button');random.type='button';random.className='drum-random';random.textContent=t('随机翻书选案卷','무작위로 책장 넘기기');help.after(random);
 const start=document.getElementById('start-game');random.after(start);
 const result=document.createElement('p');result.className='drum-result';result.setAttribute('role','status');start.after(result);
 let busy=false,cancelled=0,gesture=null,suppressUntil=0,animation=null;
 const clamp=n=>Math.max(0,Math.min(cases.length-1,n));
 function paint(){
  heading.textContent=cases[chosenCase].title;
  kicker.textContent='CASE / '+String(chosenCase+1).padStart(3,'0');
  [...viewport.children].forEach((card,i)=>{
   const visible=i===chosenCase;card.hidden=!visible;card.tabIndex=visible?0:-1;
   card.setAttribute('aria-label',`${t('案卷','사건')} ${i+1}: ${cases[i].title}`);
  });
  count.textContent=`${String(chosenCase+1).padStart(2,'0')} / ${cases.length}`;
  meta.textContent=cases[chosenCase].level+' · '+cases[chosenCase].time;
  prev.disabled=busy||chosenCase===0;next.disabled=busy||chosenCase===cases.length-1;
 }
 window.updateCaseDrum=paint;
 function lock(value){busy=value;random.disabled=value;start.disabled=value;viewport.setAttribute('aria-busy',String(value));paint();}
 function curlPage(leaf,markup,forward,duration){
  const width=viewport.clientWidth||400,height=viewport.clientHeight||370;
  const segments=28,step=width/segments,strips=[];
  // Each narrow strip follows the paper's changing tangent, forming a curved surface.
  for(let i=0;i<segments;i++){
   const strip=document.createElement('div');strip.className='book-paper-strip';
   strip.style.width=(step+.8)+'px';strip.style.height=height+'px';
   const face=document.createElement('div');face.className='book-leaf-content';
   face.style.width=width+'px';face.style.height=height+'px';face.style.left=(-i*step)+'px';face.innerHTML=markup;
   strip.append(face);leaf.append(strip);strips.push({strip,face});
  }
  let frame=0,began=null,resolveDone;
  const finished=new Promise(resolve=>resolveDone=resolve);
  function draw(progress){
   const p=forward?progress:1-progress;
   const flex=Math.sin(Math.PI*p);
   let x=0,z=0;
   strips.forEach(({strip,face},i)=>{
    const across=(i+.5)/segments;
    const angle=-Math.PI*p + 1.15*flex*(1-2*across);
    const lift=9*flex*Math.sin(Math.PI*across);
    strip.style.transform='translate3d('+x+'px,'+(-lift)+'px,'+z+'px) rotateY('+angle+'rad)';
    face.style.visibility=Math.cos(angle)>0?'visible':'hidden';
    strip.style.filter='brightness('+(1-.17*Math.abs(Math.sin(angle)))+')';
    const shade=Math.round(12+28*Math.abs(Math.sin(angle)));
    strip.style.background='linear-gradient(90deg,rgba(91,61,25,'+(shade/240)+'),rgba(255,247,219,.12)),#ead9b5';
    x+=Math.cos(angle)*step;z-=Math.sin(angle)*step;
   });
   leaf.style.setProperty('--curl-shadow',String(.18*flex));
  }
  function tick(now){
   if(began===null)began=now;
   const t=Math.min(1,(now-began)/duration),eased=t*t*(3-2*t);
   draw(eased);
   if(t<1)frame=requestAnimationFrame(tick);else resolveDone();
  }
  draw(0);frame=requestAnimationFrame(tick);
  return {finished,cancel(){cancelAnimationFrame(frame);resolveDone();}};
 }
 async function turn(index,duration=720){
  index=clamp(index);if(index===chosenCase)return;
  const old=chosenCase,token=cancelled;
  const outgoing=viewport.children[old];
  const oldMarkup=outgoing?outgoing.innerHTML:'';
  chosenCase=index;renderHome();
  if(reduced.matches)return;
  const leaf=document.createElement('div');leaf.className='book-turning-leaf';leaf.setAttribute('aria-hidden','true');
  shell.append(leaf);
  const forward=index>old;
  const markup=forward?oldMarkup:viewport.children[index].innerHTML;
  // Backward turns unveil the incoming page as its curved edge settles down.
  if(!forward)viewport.children[index].style.opacity='0';
  try {
   animation=curlPage(leaf,markup,forward,duration);
   await animation.finished;
  }finally{
   viewport.children[index].style.opacity='';leaf.remove();
   if(token===cancelled)animation=null;
  }
 }
 async function choose(index){if(busy)return;result.textContent='';lock(true);try{await turn(index);}finally{lock(false);}}
 prev.onclick=()=>choose(chosenCase-1);next.onclick=()=>choose(chosenCase+1);
 viewport.addEventListener('keydown',e=>{
  const actions={ArrowLeft:chosenCase-1,ArrowRight:chosenCase+1,Home:0,End:cases.length-1};
  if(Object.hasOwn(actions,e.key)){e.preventDefault();choose(actions[e.key]);}
 });
 viewport.addEventListener('pointerdown',e=>{if(!busy&&e.isPrimary&&e.button===0)gesture={id:e.pointerId,x:e.clientX,y:e.clientY};});
 viewport.addEventListener('pointerup',e=>{
  if(!gesture||gesture.id!==e.pointerId)return;
  const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;gesture=null;
  if(Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy)){suppressUntil=Date.now()+400;choose(chosenCase+(dx<0?1:-1));}
 });
 viewport.addEventListener('pointercancel',()=>gesture=null);
 viewport.addEventListener('pointerleave',()=>gesture=null);
 viewport.addEventListener('dragstart',e=>e.preventDefault());
 viewport.addEventListener('click',e=>{if(busy||Date.now()<suppressUntil){e.preventDefault();e.stopImmediatePropagation();}},true);
 random.onclick=async()=>{
  if(busy)return;
  const target=Math.floor(Math.random()*cases.length),token=cancelled;
  lock(true);random.textContent=t('正在翻阅…','책장을 넘기는 중…');result.textContent=t('书页将为你停在一个故事。','책장이 하나의 이야기에서 멈춥니다.');
  try{
   if(!reduced.matches){
    for(let i=0;i<9&&token===cancelled;i++)await turn((chosenCase+1)%cases.length,150+i*20);
   }
   if(token!==cancelled)return;
   await turn(target,780);
   if(token===cancelled)result.textContent=t('本次翻到：','이번에 펼친 사건: ')+cases[target].title;
  }finally{if(token===cancelled){random.textContent=t('再随机翻一次','다시 무작위로 넘기기');lock(false);}}
 };
 window.addEventListener('hashchange',()=>{
  if(location.hash!=='#cases'&&busy){cancelled++;animation?.cancel();shell.querySelectorAll('.book-turning-leaf').forEach(el=>el.remove());result.textContent='';random.textContent=t('随机翻书选案卷','무작위로 책장 넘기기');lock(false);}
 });
 paint();
})();
