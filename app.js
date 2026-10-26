const cases=[
  {
    "title": "雨夜的来电",
    "short": "同一个号码，两种无声的消息。",
    "genre": "日常悬疑",
    "level": "专家",
    "time": "约 30–40 分钟",
    "body": [
      "她每逢雨夜都会接到一通无声电话。昨夜电话照常响起，她却没有像往常一样安心。",
      "屏幕上的号码没有变，电话里也确实没有人说话。她只听见两次很轻的敲击，随后线路断了。",
      "她没有回拨，也没有去来电者家中，而是带着备用钥匙赶到河边一扇锁住的门前，救出了来电的人。"
    ],
    "question": "请解释三份记录为什么能同时成立，并还原完整经过。",
    "hints": [
      "无声并不等于没有传递信息，接通电话也不一定代表已经回家。",
      "号码只能识别人，不能说明他的位置；两次敲击有约定的含义。",
      "来电者无法说话；他平常经过河边的工具房，两次敲击表示被困在那里。"
    ],
    "truth": "她与失去说话能力的父亲有两种约定：平安回家后打手机，接通后直接挂断；若被困在河边工具房，就敲两下话筒。父亲雨夜去工具房收工具，门锁故障，把他困在里面。手机来电号码和往常相同，但两声敲击改变了含义。女儿知道他无法口头求救，直接带备用钥匙前去开门。\n\n把昨夜与平常逐项对照，真正改变的不是号码，也不是有没有人说话，而是接通之后多出的两次敲击。父亲平安到家时，按原先的约定不需要敲击；一旦敲了两下，就在同一条电话线路里发出了另一条消息。女儿不是听见电话便放心，而是在辨认电话里有没有这个附加信号。\n\n这也解释了她为什么没有回拨、没有先去父亲家里，以及为什么偏偏带上钥匙。父亲无法开口，回拨并不能像普通通话一样问清地址；约定本身已经给出了工具房这个位置。被锁在里面需要的是开门，不是确认家中是否有人。手机号码只说明来电者是谁，不证明他身在何处。所谓“无声电话救人”，其实是一套事先准备好的求助办法在真正需要时起了作用。",
    "qs": [
      "两次声音有约定的含义吗？",
      "来电号码能证明他在家吗？"
    ],
    "answers": [
      [
        "两次声音有约定的含义吗？",
        "是",
        "是，请把这个条件与其余记录联系起来。"
      ],
      [
        "来电号码能证明他在家吗？",
        "否",
        "否，需要换一种能解释记录的说法。"
      ],
      [
        "已经回家|证明.*在家|固定电话|恶作剧|摔倒",
        "否",
        "这不是本案的解释。"
      ],
      [
        "约定|敲击|两次|暗号|手机|工具房|父亲|钥匙|无法说话",
        "是",
        "这个因素与关键机制有关，但不代表整句推测都成立。"
      ],
      [
        "鬼魂|超能力|时间旅行",
        "否",
        "本案没有超自然设定。"
      ]
    ]
  },
  {
    "title": "消失的第十三层",
    "short": "下雨能到家，为什么昨天例外？",
    "genre": "经典推理",
    "level": "困难",
    "time": "约 20–30 分钟",
    "body": [
      "他独自回家时通常在八层下电梯，再爬到十三层；下楼却总能直达一楼。",
      "下雨天他往往可以直达家门。但昨天虽然下雨，他仍然爬了五层；前天晴朗，他却没有爬楼。",
      "三天里电梯、楼层权限和他的身体都没有变化。昨天他独自拿着一把折叠伞，前天有人和他同乘。"
    ],
    "question": "请解释三份记录为什么能同时成立，并还原完整经过。",
    "hints": [
      "天气只是与一个条件同时出现，并非电梯运行的条件。",
      "比较长柄物品、折叠伞和同乘的人能分别提供什么帮助。",
      "他够不到十三层按钮；长柄伞或他人的帮助都可以弥补距离，折叠伞不够长。"
    ],
    "truth": "他身材矮，只能够到八层按钮，下楼的一楼按钮则够得到。通常雨天带的长柄伞能帮他按到十三层；昨天换成短折叠伞，长度不够，所以仍要爬楼。前天晴天有邻居同乘，邻居替他按了十三层。必须同时解释按钮高度、伞的长度及他人的帮助，天气本身没有改变电梯。\n\n这道题最容易出现的误判，是把“下雨”和“能到十三层”直接当成因果关系。实际上，下雨通常只会让他多带一件工具。把这一层联系拆开以后，昨天的例外便不再奇怪：他虽然带伞，却没有带足够长的伞。工具的用途不是挡雨，而是补足手臂与高处按钮之间的距离。\n\n前天则提供了第二条验证线索。没有长柄伞不等于绝对无法按按钮，只要有邻居代按，同样可以直达十三层。下楼时目标是一楼，按钮在他能够触及的位置，所以无需借助任何人或物。完整的解释必须同时覆盖上下楼的不对称、雨天通常方便、雨天也可能失败和晴天也可能成功。把限制放在“谁能按到按钮”上，而不是放在电梯或天气上，四种现象就统一了。",
    "qs": [
      "是否需要借助物品或他人的帮助？",
      "电梯会按天气限制楼层吗？"
    ],
    "answers": [
      [
        "是否需要借助物品或他人的帮助？",
        "是",
        "是，请把这个条件与其余记录联系起来。"
      ],
      [
        "电梯会按天气限制楼层吗？",
        "否",
        "否，需要换一种能解释记录的说法。"
      ],
      [
        "天气限制|权限|故障|坏了|停电",
        "否",
        "这不是本案的解释。"
      ],
      [
        "帮助|长度|身高|按钮|长柄|邻居|够不到",
        "是",
        "这个因素与关键机制有关，但不代表整句推测都成立。"
      ],
      [
        "鬼魂|超能力|时间旅行",
        "否",
        "本案没有超自然设定。"
      ]
    ]
  },
  {
    "title": "最后一张车票",
    "short": "目的地没变，回家的理由却在背面。",
    "genre": "温情反转",
    "level": "困难",
    "time": "约 20–30 分钟",
    "body": [
      "老人每天买一张去外地的车票，却从不上车，照护者一直陪在他身边。",
      "今天他把票交给一个年轻人，两人没检票就离开了。年轻人没有退票，也没有乘车。",
      "那张票的目的地没变，但老人在背面发现一行熟悉的字：“今天不用等末班车，我来接你回家。”"
    ],
    "question": "请解释三份记录为什么能同时成立，并还原完整经过。",
    "hints": [
      "车票的目的地可能属于一个已经过时的生活事实。",
      "年轻人不是代替老人去旅行；票背面提供的信息比票面更重要。",
      "儿子已经搬回本地，老人却记不住；熟悉的笔迹帮助他接受接送。"
    ],
    "truth": "老人有记忆障碍，仍以为儿子住在外地，习惯买票去车站等。儿子早已搬回来，日常由照护者陪老人到车站。这天儿子提前下班，在照护者帮助下将接他的留言写在票背面。老人认出了儿子的笔迹，再把票交给本人确认，终于肯离开。车票不是一次未完成的旅行，而是旧记忆与当下接送之间的媒介。\n\n老人反复购买相同目的地的车票，是因为他记得的家庭生活仍停在儿子远居外地的阶段。票面上没有变化，并不表示现实中也没有变化。照护者始终在场，说明他不是无人照看的失踪者；每天没有上车，也说明真正维系这个习惯的不是某一班必须赶上的列车，而是等待家人的心情。\n\n这天让老人改变行动的，是票背面那句他能够认出笔迹的留言。儿子没有争论目的地是否正确，而是借用父亲一直握着的东西，把“继续等待”变成“已经有人来接”。老人把票交给面前的年轻人后，与熟悉的字迹和本人建立了联系，才肯一起离开。两人不需要检票，年轻人也不需要代乘或退票，因为接下来要完成的是回家，而不是车票所代表的那段旧旅程。",
    "qs": [
      "车票背面的信息比目的地更关键吗？",
      "年轻人替老人乘车了吗？"
    ],
    "answers": [
      [
        "车票背面的信息比目的地更关键吗？",
        "是",
        "是，请把这个条件与其余记录联系起来。"
      ],
      [
        "年轻人替老人乘车了吗？",
        "否",
        "否，需要换一种能解释记录的说法。"
      ],
      [
        "替.*乘车|代.*旅行|退票|逃票",
        "否",
        "这不是本案的解释。"
      ],
      [
        "背面|笔迹|留言|儿子|记忆|照护|搬回",
        "是",
        "这个因素与关键机制有关，但不代表整句推测都成立。"
      ],
      [
        "鬼魂|超能力|时间旅行",
        "否",
        "本案没有超自然设定。"
      ]
    ]
  }
];
cases.push(...window.additionalCases);
for(const c of cases)c.answers=c.answers.map(([p,a,t])=>[new RegExp(p),a,t]);
const $=id=>document.getElementById(id);let current=0,asked=0,hints=0,revealed=false;const dialog=$('dialog');
function addMessage(text,user=false){const el=document.createElement('div');el.className='message'+(user?' user':'');const label=document.createElement('div');label.className='message-label';label.textContent=user?'你 · 调查者':'✳ 夜汤主持人';const bubble=document.createElement('div');bubble.className='bubble';bubble.textContent=text;el.append(label,bubble);$('chat').append(el);$('chat').scrollTop=$('chat').scrollHeight;return bubble}
function selectCase(index){if(!Number.isInteger(index)||!cases[index])throw Error('无效的汤题');current=index;asked=0;hints=0;revealed=false;const c=cases[index];$('cases').innerHTML='';cases.forEach((v,i)=>{const b=document.createElement('button');b.className='case-card'+(i===index?' selected':'');b.setAttribute('aria-pressed',String(i===index));b.innerHTML=`<div class="card-meta"><span>FILE / ${String(i+1).padStart(3,'0')}</span><span>${v.level}</span></div><strong>${v.title}</strong><p>${v.short}</p><span class="category">${v.genre} <span style="float:right">${i===index?'调查中 ':'打开档案 '}</span></span>`;b.onclick=()=>{location.hash="game/"+i};$('cases').append(b)});$('title').textContent=c.title;$('case-num').textContent=String(index+1).padStart(3,'0');$('file-number').textContent='NO. '+String(index+1).padStart(3,'0');$('watermark').textContent=String(index+1).padStart(2,'0');$('level').textContent=c.level;$('genre').textContent=c.genre;$('duration').textContent=c.time;$('story-text').replaceChildren(...c.body.map(t=>{const p=document.createElement('p');p.textContent=t;return p}));$('question').textContent=c.question;$('hint-box').hidden=true;$('hint-count').textContent='0 / 3';$('count').textContent='00';$('chat').innerHTML='<div class="date">今晚的推理，从这里开始</div>';const bubble=addMessage('欢迎来到夜汤。我会陪你拆解这个故事。读完汤面后，试着问一个可以用「是」或「否」回答的问题吧。');const chips=document.createElement('div');chips.className='answer-types';chips.innerHTML='<span>是</span><span>否</span><span>无关</span>';bubble.append(chips);addMessage('这是界面演示，可尝试下方推荐问题。未覆盖的问题会提示你换一个角度。');$('suggestions').innerHTML='';c.qs.forEach(q=>{const b=document.createElement('button');b.textContent=q;b.onclick=()=>ask(q);$('suggestions').append(b)});$('input').value='';window.dispatchEvent(new Event('case-update'));return {case: c.title}}
function ask(q){if($('game-screen').hidden)throw Error('请先从主界面开始调查');if(typeof q!=='string'||!q.trim()||q.length>300)throw Error('问题需为 1–300 字');q=q.trim();addMessage(q,true);asked++;$('count').textContent=String(asked).padStart(2,'0');const a=cases[current].answers.find(([r])=>r.test(q));const answer=a?`${a[1]}。${a[2]}`:'这个问题暂未包含在演示问答中。试试下方推荐问题，或用「给我一点提示」继续推理。';addMessage(answer);window.dispatchEvent(new Event('case-progress'));return {question:q,answer,questions:asked}}
$('ask-form').onsubmit=e=>{e.preventDefault();const q=$('input').value.trim();if(!q)return;ask(q);$('input').value='';$('input').focus()};$('input').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();$('ask-form').requestSubmit()}};
$('hint').onclick=()=>{if(hints<3)hints++;$('hint-box').hidden=false;$('hint-box').textContent=`提示 ${hints} / 3 · ${cases[current].hints[hints-1]}`;$('hint-count').textContent=`${hints} / 3`};
function openModal(label,title,body,action,fn){$('dialog-label').textContent=label;$('dialog-title').textContent=title;$('dialog-body').textContent=body;$('dialog-action').textContent=action;$('dialog-action').onclick=fn||(()=>dialog.close());dialog.showModal();dialog.scrollTop=0}
$('rules').onclick=()=>openModal('HOW TO PLAY','一碗汤，两面故事。','「汤面」是故事的表象，「汤底」是完整真相。阅读汤面后，向主持人提出可以用是、否或无关回答的问题，一步步还原故事。卡住时可以查看三条渐进提示，也可以揭晓汤底。切换汤题会重新开始本局。本页为预设问答演示，尚未接入实时 AI。','开始推理');
$('reveal').onclick=()=>{if(revealed){showTruth();return}openModal('REVEAL THE TRUTH','准备好揭晓了吗？','汤底会直接揭示故事的完整真相。你也可以先关闭窗口，继续提问。','揭晓汤底',()=>{dialog.close();revealed=true;showTruth()})};function showTruth(){window.dispatchEvent(new Event('case-progress'));openModal('THE WHOLE STORY',cases[current].title+' · 汤底',cases[current].truth,'返回故事')};dialog.querySelector('.close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});

if(document.modelContext?.registerTool){const lifecycle=new AbortController();for(const tool of [{name:'get_current_mystery',description:'Read the current visible mystery and question count without revealing its solution.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>($('game-screen').hidden?{screen:'home',cases:cases.map((c,i)=>({id:i,title:c.title}))}:{screen:'game',title:cases[current].title,story:cases[current].body,questions:asked})},{name:'ask_mystery_question',description:'Submit a question to the clearly labeled preset demo host and display its response.',inputSchema:{type:'object',properties:{question:{type:'string',minLength:1,maxLength:300}},required:['question'],additionalProperties:false},annotations:{readOnlyHint:false},execute:input=>ask(input?.question)}]){try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{})}catch{}}window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true})}

const requestedCase=new URLSearchParams(location.search).get('case');
let chosenCase=requestedCase!==null&&/^\d+$/.test(requestedCase)&&Number(requestedCase)<cases.length?Number(requestedCase):0,activeCase=null;
function updateLanguageLink(){
 const link=document.querySelector('.language-switch');
 const destination=new URL(link.getAttribute('href'),location.href);
 destination.hash=location.hash||'#home';
 destination.searchParams.set('case',String(chosenCase));
 link.href=destination.href;
}
function renderHome(){
 const existingCards=[...$('home-cases').children];
 cases.forEach((c,i)=>{const b=existingCards[i]||document.createElement('button');b.className='home-case'+(i===chosenCase?' selected':'');b.setAttribute('aria-pressed',String(i===chosenCase));b.innerHTML=`<span class="home-case-top"><span>CASE / ${String(i+1).padStart(3,'0')}</span><span>${c.level}</span></span><strong>${c.title}</strong><span class="home-case-description">${c.short}</span><span class="home-case-bottom"><span>${c.genre} · ${c.time}</span><span class="selection-mark">${i===chosenCase?'已选择':'选择案卷'}</span></span>`;b.onclick=()=>{chosenCase=i;renderHome()};$('home-cases').append(b)});
 $('selected-case-label').textContent='已选案卷：'+cases[chosenCase].title;
 $('start-game').innerHTML=(activeCase===chosenCase?'继续调查':'开始调查')+'';
 updateLanguageLink();
 window.updateCaseDrum?.();
}
function renderRoute(){const match=location.hash.match(/^#game\/(\d+)$/);const playing=!!match&&Number(match[1])<cases.length;const choosing=location.hash==='#cases';const titleScreen=!playing&&!choosing;
 $('title-screen').hidden=!titleScreen;$('home-screen').hidden=!choosing;$('game-screen').hidden=!playing;const back=document.querySelector('.back-home');back.hidden=titleScreen;back.href=playing?'#cases':'#home';back.textContent=playing?'返回案卷':'返回主界面';document.body.classList.toggle('home-view',!playing);document.body.classList.toggle('title-view',titleScreen);$('resume-game').hidden=activeCase===null;if(activeCase!==null)$('resume-game').href='#game/'+activeCase;
 if(playing){const index=Number(match[1]);if(activeCase!==index){selectCase(index);activeCase=index;}chosenCase=index;document.title=cases[index].title+' · 夜汤调查室';$('title').setAttribute('tabindex','-1');$('title').focus({preventScroll:true})}else{renderHome();document.title='夜汤 · 侦探事务所';}
 updateLanguageLink();
 window.scrollTo(0,0);
}
$('start-game').onclick=()=>{location.hash='game/'+chosenCase};
$('title-rules').onclick=()=>$('rules').onclick();
window.addEventListener('hashchange',renderRoute);renderRoute();
