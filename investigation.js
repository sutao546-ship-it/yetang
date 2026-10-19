(()=>{
const ko=document.documentElement.lang.startsWith('ko');
const t=(zh,kr)=>ko?kr:zh;
const game=document.getElementById('game-screen'),workspace=game.querySelector('.case-workspace'),chat=game.querySelector('.chat-panel');
const hud=document.createElement('div');hud.className='detective-hud';hud.innerHTML=`<div><span class="eyebrow">MIDNIGHT / FIELD INVESTIGATION</span><h2>${t('调查进行中','수사 진행 중')}</h2></div><div class="mission-status" aria-live="polite"></div>`;game.querySelector('.game-toolbar').replaceWith(hud);
const scene=document.createElement('section');scene.className='scene-desk';scene.innerHTML=`<div class="scene-caption"><span>01 / ${t('现场重建','현장 재구성')}</span><strong>${t('每一个细节，都值得再看一眼。','모든 단서를 다시 살펴보세요.')}</strong><p>${t('点击现场记录，将可疑细节收进证据板。','현장 기록을 눌러 증거판에 단서를 모으세요.')}</p></div><div class="scene-records"></div><div class="scene-counter"></div>`;
workspace.insertBefore(scene,workspace.querySelector('.story'));
const board=document.createElement('section');board.className='evidence-board';board.innerHTML=`<div class="board-heading"><div><span class="eyebrow">02 / EVIDENCE BOARD</span><h2>${t('证据与关联','증거와 연결')}</h2></div><span class="evidence-total"></span></div><div class="pinned-evidence"></div><div class="notebook"><label for="deduction-note">${t('我的推理手记','나의 추리 노트')}</label><textarea id="deduction-note" rows="3" maxlength="2000" placeholder="${t('谁？为什么？哪些细节可以联系起来…','누가? 왜? 어떤 단서들이 연결될까…')}"></textarea><small>${t('本次页面内保留 · 切换案卷可回看手记','현재 페이지에서 보관 · 사건별 메모 유지')}</small></div>`;
const right=document.createElement('div');right.className='investigation-rail';chat.before(right);right.append(board);
const drawer=document.createElement('details');drawer.className='host-drawer';drawer.open=false;const summary=document.createElement('summary');summary.textContent=t('03 / 询问主持人　＋','03 / 진행자에게 질문　＋');drawer.append(summary,chat);right.append(drawer);
const notes=new Map(),collected=new Map();let shown=-1;
const note=board.querySelector('textarea');note.addEventListener('input',()=>notes.set(current,note.value));
function update(){
 const set=collected.get(current)||new Set();collected.set(current,set);
 hud.querySelector('.mission-status').textContent=t(`记录 ${set.size}/3 · 提问 ${asked} · ${revealed?'已查看真相':'未结案'}`,`기록 ${set.size}/3 · 질문 ${asked} · ${revealed?'진실 확인':'미해결'}`);
 hud.querySelector('h2').textContent=cases[current].title;
 board.querySelector('.evidence-total').textContent=t(`${set.size} 条记录 · ${hints} 条提示`,`${set.size}개 기록 · ${hints}개 힌트`);
 scene.querySelector('.scene-counter').textContent=t(`现场记录 ${set.size} / 3 已归档`,`현장 기록 ${set.size} / 3 수집`);
 scene.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('collected',set.has(i));b.setAttribute('aria-pressed',String(set.has(i)));b.querySelector('small').textContent=set.has(i)?t('✓ 已归档 · 点击查看','✓ 수집 완료 · 다시 보기'):t('＋ 检查记录','＋ 기록 조사');});
 const pins=board.querySelector('.pinned-evidence');pins.replaceChildren();
 if(!set.size&&!hints){const empty=document.createElement('p');empty.className='evidence-empty';empty.textContent=t('证据板还空着。先检查左侧的三份现场记录。','아직 증거가 없습니다. 현장 기록 세 개를 먼저 조사하세요.');pins.append(empty);}
 [...set].forEach(i=>{const p=document.createElement('div');p.className='evidence-pin';const label=document.createElement('small');label.textContent=`RECORD / 0${i+1}`;const text=document.createElement('p');text.textContent=cases[current].body[i];p.append(label,text);pins.append(p);});
 for(let i=0;i<hints;i++){const p=document.createElement('div');p.className='evidence-pin hint-pin';p.textContent=t('提示 ','힌트 ')+(i+1)+' · '+cases[current].hints[i];pins.append(p);}
 game.classList.toggle('case-revealed',revealed);
}
function rebuild(){
 if(shown!==current){shown=current;note.value=notes.get(current)||'';drawer.open=false;}
 const records=scene.querySelector('.scene-records');records.replaceChildren();
 const themes=[['来电记录','通话笔录','雨夜日志'],['住户档案','电梯记录','天气记录'],['购票记录','候车笔录','目击记录']];
 const themesKo=[['수신 기록','통화 기록','비 오는 밤'],['주민 기록','승강기 기록','날씨 기록'],['승차권 기록','대합실 기록','목격 기록']];
 cases[current].body.forEach((text,i)=>{const b=document.createElement('button');b.className='record-card';b.innerHTML=`<span class="record-number">0${i+1}</span><strong></strong><span class="record-preview"></span><small></small>`;b.querySelector('strong').textContent=(ko?themesKo:themes)[current]?.[i]||t(['起始记录','异常记录','转折记录'][i],['시작 기록','이상 징후','전환 기록'][i]);b.querySelector('.record-preview').textContent=text;b.onclick=()=>{collected.get(current).add(i);update();openModal('FIELD RECORD / 0'+(i+1),cases[current].title,text,t('收入证据板','증거판에 보관'));};records.append(b);});update();
}
const oldHint=document.getElementById('hint').onclick;document.getElementById('hint').onclick=()=>{oldHint();update();};
window.addEventListener('case-update',rebuild);window.addEventListener('case-progress',update);window.addEventListener('hashchange',()=>{if(!game.hidden)rebuild();});rebuild();
})();
