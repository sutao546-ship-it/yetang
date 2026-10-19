/* Living photograph: light modulation follows the photograph's cover crop. */
(()=>{
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const scenes=[{selector:'.ambient-office',lights:[[.282,.308,.12],[.02,.347,.035],[.925,.267,.045]],bounce:[.325,.775,.23]},{selector:'.ambient-archive',lights:[[.686,.443,.105],[.13,.065,.055],[.455,.365,.038]],bounce:[.697,.625,.2]}];
const layers=scenes.map(scene=>{const host=document.querySelector(scene.selector),canvas=document.createElement('canvas');canvas.className='living-light-layer';host.append(canvas);return {...scene,host,canvas,ctx:canvas.getContext('2d')};});
let previous=0;
function tick(time){requestAnimationFrame(tick);if(document.hidden||time-previous<40)return;previous=time;const home=document.body.classList.contains('home-view');
for(let i=0;i<layers.length;i++){const s=layers[i],active=home&&(document.body.classList.contains('title-view')?i===0:i===1);s.canvas.hidden=!active;if(!active)continue;const w=s.host.clientWidth,h=s.host.clientHeight,dpr=Math.min(devicePixelRatio||1,1.5);if(s.canvas.width!==Math.round(w*dpr)||s.canvas.height!==Math.round(h*dpr)){s.canvas.width=Math.round(w*dpr);s.canvas.height=Math.round(h*dpr);}const c=s.ctx;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);if(reduced.matches)continue;
const scale=Math.max(w/1916,h/821),iw=1916*scale,ih=821*scale,pos=getComputedStyle(s.host).backgroundPosition.split(' ').map(parseFloat),ox=(w-iw)*pos[0]/100,oy=(h-ih)*pos[1]/100;
// Smooth, irregular tungsten variation; dim the actual photographed illumination.
const pulse=.5+.25*Math.sin(time/630)+.15*Math.sin(time/241)+.1*Math.sin(time/1310);
function glow(point,strength,dark=false){const [x,y,r]=point,cx=ox+x*iw,cy=oy+y*ih;const g=c.createRadialGradient(cx,cy,0,cx,cy,r*iw);g.addColorStop(0,dark?`rgba(12,7,3,${strength})`:`rgba(255,185,86,${strength})`);g.addColorStop(.38,dark?`rgba(12,7,3,${strength*.65})`:`rgba(244,142,36,${strength*.35})`);g.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=g;c.fillRect(0,0,w,h);}
c.globalCompositeOperation='source-over';for(const light of s.lights)glow(light,(1-pulse)*.56,true);glow(s.bounce,(1-pulse)*.19,true);
c.globalCompositeOperation='screen';for(const light of s.lights)glow(light,pulse*.23);glow(s.bounce,pulse*.085);c.globalCompositeOperation='source-over';
}}
requestAnimationFrame(tick);
})();
