(() => {
 let pressed=null;
 const release=()=>{if(pressed)pressed.classList.remove('key-pressed');pressed=null;};
 document.addEventListener('keydown',event=>{
  if(event.repeat||event.altKey||event.ctrlKey||event.metaKey)return;
  const target=event.target.closest?.('button,a[href],[role="button"]');
  if(!target||target.disabled||target.getAttribute('aria-disabled')==='true')return;
  if(event.key==='Enter'||(event.key===' '&&target.tagName!=='A')){release();pressed=target;target.classList.add('key-pressed');}
 });
 document.addEventListener('keyup',release);
 document.addEventListener('focusout',release);
 document.addEventListener('pointercancel',release);
 window.addEventListener('blur',release);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)release();});
})();
