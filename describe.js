(() => {
  'use strict';
  const KEY = 'wordPainter.v1';
  const app = document.querySelector('#describeApp');
  const byId = new Map(DESCRIBE_QUESTIONS.map(q=>[q.id,q]));
  const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle = values => {const a=[...values];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const groupFor = id => DESCRIBE_GROUPS.find(g=>g.id===id);
  let state={seen:{},collected:{},round:null,history:[]},storageOK=true,active=0,timer;
  try {const data=JSON.parse(localStorage.getItem(KEY)||'null');if(data&&data.seen&&data.collected&&Array.isArray(data.history))state=data;}catch{storageOK=false;}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}document.querySelectorAll('[data-save]').forEach(el=>el.textContent=storageOK?'已自动保存在当前浏览器':'浏览器未能保存，建议导出本轮句子后再离开');}
  function toast(message){const el=document.querySelector('#describeToast');el.textContent=message;el.hidden=false;clearTimeout(timer);timer=setTimeout(()=>el.hidden=true,3500);}
  const countSeen = group => DESCRIBE_QUESTIONS.filter(q=>(!group||q.group===group)&&state.seen[q.id]).length;
  const warning = () => `<p class="save-status ${storageOK?'':'save-warning'}" data-save role="status">${storageOK?'记录保存在当前浏览器':'浏览器未能保存，建议导出本轮句子后再离开'}</p>`;
  function home(){
    const r=state.round;
    app.innerHTML=`<section class="hero word-hero"><div><p class="eyebrow">语文基础专项 / 先练词，再练一句话</p><h1>词语小画家<br>给句子添一点颜色。</h1><p class="muted">不用从空白开始写。看一看，选个词，<br>把“什么样的”说清楚就好。</p><a class="btn primary" href="${r&&!r.finished?'#practice':'#animal'}">${r&&!r.finished?'接着上次填一填':'从动物特点开始'} →</a><div class="word-ribbon"><span>看图找特点</span><span>点击选词填空</span><span>读懂为什么</span></div></div><img class="word-hero-art" src="assets/describing/rabbit.svg" alt="长耳朵的白色小兔插画"></section>
      <div class="section-head"><div><p class="eyebrow">每轮 3 题 · 约 3～5 分钟</p><h2>今天，给什么画上词语？</h2></div><p class="sub">已经练过 ${countSeen()} / ${DESCRIBE_QUESTIONS.length} 道小练习</p></div><div class="topic-grid">${DESCRIBE_GROUPS.map(g=>`<a class="topic-card ${g.color}" href="#${g.id}"><span class="subject-icon" aria-hidden="true">${g.mark}</span><strong>${g.name}</strong><p>${g.intro}</p><small>练过 ${countSeen(g.id)} / 6 题 · 选一选 →</small></a>`).join('')}</div>
      <div class="mini-links"><a class="btn small" href="#words">我的词语小本</a><a class="btn small" href="#records">练习记录</a><a class="btn small" href="#resources">家长陪练与参考资料</a><a class="btn small" href="story.html">想编故事时，去故事小导演 ↗</a></div><aside class="note"><strong>从选得出，到说得出</strong><p>先陪她读懂一句话，选词后把完整句子读一遍。熟悉以后，暂时遮住选项，让她自己说说还能换什么词。会选词是起点，再用身边的人或东西练一句，慢慢学会自己用。</p><p>“神情”是看得见的表情，“心情”是心里的感受。心情题结合具体事件和人物的话判断，合适的不同词语都可以使用。</p></aside>${warning()}`;
  }
  function chooseGroup(id){
    const g=groupFor(id);
    const example=level=>{const q=DESCRIBE_QUESTIONS.find(q=>q.group===id&&q.level===level);return q.parts.map((part,i)=>part+(i<q.slots.length?'（'+q.slots[i].options.find(o=>o.fit).word+'）':'')).join('');};
    app.innerHTML=`<a class="back-link" href="#">← 专项目录</a><div class="section-head"><div><p class="eyebrow">词语小画家 / ${g.name}</p><h1>${g.name}，从一个空开始</h1><p class="muted">${g.intro} ${g.tip}</p></div></div><div class="level-choice"><button class="level-card" data-level="1"><span class="pill">先从这里开始</span><strong>一个空，选一个词</strong><span>每轮 3 题 · 先认识词语，配到合适的地方。</span><span class="word-subhead">例如：${escape(example(1))}</span></button><button class="level-card" data-level="2"><span class="pill">熟悉以后再试</span><strong>两个空，合成一句话</strong><span>每轮 3 题 · 在一句话里，选好两处合适的词。</span><span class="word-subhead">例如：${escape(example(2))}</span></button></div><aside class="note"><strong>今天选一个难度就够了</strong><p>选项不会计时，答错可以换词再试。点击“给我线索”看观察方向；还不理解时，可以跟着示范读。完成次数只记录练习，不代表掌握程度。</p></aside>`;
    document.querySelectorAll('[data-level]').forEach(el=>el.onclick=()=>{
      if(state.round&&!state.round.finished){
        app.innerHTML=`<div class="work-area"><section class="exercise"><h1>上次的小练习还没结束</h1><p>可以接着做，也可以先把进度留成一份记录，再开始这组题。</p><div class="actions"><a class="btn" href="#practice">继续上次练习</a><button class="btn primary" id="startNew">留好记录，开始新练习</button></div></section></div>`;
        document.querySelector('#startNew').onclick=()=>{state.history.push({...structuredClone(state.round),paused:true});start(id,Number(el.dataset.level));};
      }else start(id,Number(el.dataset.level));
    });
  }
  function start(group,level){
    const ids=shuffle(DESCRIBE_QUESTIONS.filter(q=>q.group===group&&q.level===level).map(q=>q.id));
    state.round={group,level,ids,position:0,finished:false,started:new Date().toISOString(),answers:ids.map(id=>({selected:byId.get(id).slots.map(()=>null),order:byId.get(id).slots.map(s=>shuffle(s.options.map((_,i)=>i))),checked:false,passed:false,attempts:0,hinted:false,demonstrated:false,saved:false}))};
    active=0;save();if(location.hash==='#practice')render();else location.hash='practice';
  }
  function current(){const r=state.round;if(!r||!Array.isArray(r.ids)||!r.ids.every(id=>byId.has(id))||!r.answers?.[r.position])return null;return {r,q:byId.get(r.ids[r.position]),a:r.answers[r.position]};}
  function fullSentence(q,a){return q.parts.map((part,i)=>part+(i<q.slots.length?(q.slots[i].options[a.selected[i]]?.word||'（　）'):'')).join('');}
  function exercise(){
    const data=current();if(!data){home();return;}const {r,q,a}=data;
    if(r.finished){summary();return;}
    active=Math.min(active,q.slots.length-1);
    const group=groupFor(q.group);
    app.innerHTML=`<div class="work-area"><div class="question-head"><a class="back-link" href="#${q.group}">← ${group.name}</a><p class="question-number">${r.level===1?'单空入门':'双空进阶'} · 第 ${r.position+1} / ${r.ids.length} 题</p></div><div class="progress" aria-label="已到第 ${r.position+1} 题，共 ${r.ids.length} 题">${r.ids.map((_,i)=>`<span class="${i<=r.position?'filled':''}"></span>`).join('')}</div><section class="word-exercise"><div class="word-scene"><img src="assets/describing/${q.art}.svg" alt="${escape(q.title)}的观察插画；具体情境见旁边文字"><div><p class="eyebrow">${group.name} / ${q.level===1?'认一个词':'用两个词'}</p><h1 id="questionTitle" tabindex="-1">${q.title}</h1><p class="context-text">${q.context}</p><p class="word-tip">${group.tip}</p><button class="speech" id="readQuestion">读题给我听</button></div></div><p class="sub">先点空格，再选下面的词。填好以后，连起来读一读。</p><div class="fill-sentence" aria-label="选词填空句子">${q.parts.map((part,i)=>`${escape(part)}${i<q.slots.length?`<button class="blank ${i===active?'active':''} ${a.checked?(q.slots[i].options[a.selected[i]]?.fit?'fit':'reconsider'):''}" data-blank="${i}" aria-label="第 ${i+1} 空，${q.slots[i].label}，当前${escape(q.slots[i].options[a.selected[i]]?.word||'未填')}" aria-pressed="${i===active}">${escape(q.slots[i].options[a.selected[i]]?.word||'选一个词')}</button>`:''}`).join('')}</div><div class="word-bank" id="wordBank"></div>
      <div class="actions"><button class="btn small" id="showHint" ${a.hinted?'disabled':''}>${a.hinted?'线索已展开':'给我一点线索'}</button><button class="btn primary" id="checkAnswer">读读看，合适吗？</button></div><div id="hintPlace">${a.hinted?`<p class="word-hint">${q.hint}</p>`:''}</div><div id="feedback">${feedback(q,a)}</div>${warning()}<div class="actions"><a class="back-link" href="#">先休息，进度会留着</a><button class="btn primary" id="nextQuestion" ${a.passed?'':'disabled'}>${r.position===r.ids.length-1?'收好这一轮句子 ✓':'下一句 →'}</button></div></section></div>`;
    renderBank(q,a);bindExercise(q,a,r);
  }
  function renderBank(q,a){
    document.querySelector('#wordBank').innerHTML=`<div class="bank-label"><p id="bankLabel" role="status">给第 ${active+1} 空选词：<strong>${q.slots[active].label}</strong></p><button class="speech" id="readOptions">读一读选项</button></div><div class="word-options" role="group" aria-labelledby="bankLabel">${a.order[active].map(index=>`<button class="word-option ${a.selected[active]===index?'selected':''}" data-option="${index}" aria-pressed="${a.selected[active]===index}">${q.slots[active].options[index].word}</button>`).join('')}</div>`;
    document.querySelector('#readOptions').onclick=()=>speak(a.order[active].map(index=>q.slots[active].options[index].word).join('。'));
    document.querySelectorAll('[data-option]').forEach(el=>el.onclick=()=>{
      a.selected[active]=Number(el.dataset.option);a.checked=false;a.passed=false;
      const empty=a.selected.findIndex(index=>index===null);if(empty>=0)active=empty;save();exercise();document.querySelector(`[data-blank="${active}"]`).focus({preventScroll:true});
    });
  }
  function feedback(q,a){
    if(!a.checked)return '';
    const selected=q.slots.map((slot,i)=>slot.options[a.selected[i]]);
    const good=selected.every(option=>option?.fit);
    return `<section class="word-feedback ${good?'':'try'}" role="status"><h2>${good?'这句话说清楚了！':'换个词试试，一起找线索'}</h2>${!good?`<ul>${selected.map((option,i)=>`<li><strong>第 ${i+1} 空 · ${escape(option.word)}</strong>：${option.fit?'这个词合适。':escape(option.meaning+' '+option.why||'再看看题目里的线索。')}</li>`).join('')}</ul><button class="btn small" id="showModel">我还不懂，跟着示范读一句</button>`:`<p><strong>${escape(fullSentence(q,a))}</strong></p><div class="word-definition">${selected.map(option=>`<div><strong>${escape(option.word)}</strong><p>${escape(option.meaning)}</p></div>`).join('')}</div><p style="margin-top:16px">${q.explain}</p><div class="word-read"><button class="btn small" id="readSentence">读完整句子</button><span class="sub">${a.demonstrated?'这一题跟着示范读过了。':'读一遍，再想想这个词为什么合适。'}</span></div><div class="word-transfer"><strong>愿意的话，再说一句</strong><br>${q.transfer}</div>`}</section>`;
  }
  function bindExercise(q,a,r){
    document.querySelectorAll('[data-blank]').forEach(el=>el.onclick=()=>{active=Number(el.dataset.blank);exercise();});
    document.querySelector('#readQuestion').onclick=()=>speak(q.context+'。请填空：'+q.parts.join('，空格，'));
    document.querySelector('#showHint').onclick=()=>{a.hinted=true;save();exercise();};
    const check=document.querySelector('#checkAnswer');check.disabled=a.selected.some(index=>index===null);
    check.onclick=()=>{a.attempts++;a.checked=true;a.passed=q.slots.every((slot,i)=>slot.options[a.selected[i]]?.fit);save();exercise();document.querySelector('#feedback').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
    const model=document.querySelector('#showModel');if(model)model.onclick=()=>{a.demonstrated=true;a.hinted=true;a.selected=q.slots.map(slot=>slot.options.findIndex(o=>o.fit));a.checked=true;a.passed=true;save();exercise();};
    const read=document.querySelector('#readSentence');if(read)read.onclick=()=>speak(fullSentence(q,a));
    document.querySelector('#nextQuestion').onclick=()=>{
      if(!a.passed)return;
      if(!a.saved){
        state.seen[q.id]={times:(state.seen[q.id]?.times||0)+1,last:new Date().toISOString()};
        q.slots.forEach((slot,i)=>{const option=slot.options[a.selected[i]];state.collected[option.word]={word:option.word,meaning:option.meaning,sentence:fullSentence(q,a),group:q.group};});a.saved=true;
      }
      if(r.position===r.ids.length-1){r.finished=true;r.finishedAt=new Date().toISOString();state.history.push(structuredClone(r));save();summary();}
      else{r.position++;active=0;save();exercise();}
      focusTitle();
    };
  }
  function speak(text){if(!('speechSynthesis'in window)){toast('当前浏览器不支持朗读，可以请家长读一读。');return;}speechSynthesis.cancel();const speech=new SpeechSynthesisUtterance(text);speech.lang='zh-CN';speech.rate=.8;speech.onerror=()=>toast('这次朗读没有成功，可以请家长读一读。');speechSynthesis.speak(speech);}
  function summary(){
    const r=state.round;if(!r){home();return;}
    const independent=r.answers.filter(a=>a.passed&&!a.hinted&&!a.demonstrated&&a.attempts===1).length;
    app.innerHTML=`<div class="work-area"><a class="back-link" href="#">← 专项目录</a><div class="section-head"><div><p class="eyebrow">${groupFor(r.group).name} / 本轮完成</p><h1 id="questionTitle" tabindex="-1">三句话，添上了新颜色。</h1><p class="muted">把完整的句子读一遍，挑一个词说给家人听。</p></div></div><div class="word-total"><div><strong>${r.ids.length} 句</strong><span>本轮练习完成</span></div><div><strong>${independent} 句</strong><span>第一次未用网页提示选对</span></div></div><p class="sub">这里只记录网页内的选择和提示使用，不代表词语已经能独立运用。</p>${r.ids.map((id,i)=>`<article class="sentence-record"><small>${byId.get(id).title} · ${r.answers[i].demonstrated?'跟着示范完成':r.answers[i].hinted?'看线索后完成':r.answers[i].attempts>1?'换词后完成':'首次选择合适'}</small><p>${escape(fullSentence(byId.get(id),r.answers[i]))}</p></article>`).join('')}<div class="actions"><button class="btn" id="exportRound">导出本轮句子</button><button class="btn primary" id="again">换个顺序，再练一轮</button></div><div class="mini-links"><a class="btn small" href="#words">看看我的词语小本</a><a class="btn small" href="#${r.group}">选择另一个难度</a></div>${warning()}<aside class="note"><strong>给陪练家长</strong><p>今天先收好一个词就够了。下次找一个真实的人、动物或物品，请她用刚练过的词说一句。先听她说完，再帮助修改一处。</p></aside></div>`;
    document.querySelector('#again').onclick=()=>start(r.group,r.level);
    document.querySelector('#exportRound').onclick=()=>exportRound(r);
  }
  function exportRound(r){
    const text=`词语小画家 · ${groupFor(r.group).name}\n${new Date(r.started).toLocaleString('zh-CN')}\n\n`+r.ids.map((id,i)=>{const q=byId.get(id),a=r.answers[i];return `${i+1}. ${fullSentence(q,a)}\n`+q.slots.map((s,j)=>{const o=s.options[a.selected[j]];return o?`${o.word}：${o.meaning}`:'尚未完成';}).join('\n');}).join('\n\n');
    const url=URL.createObjectURL(new Blob(['\ufeff'+text],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='词语小画家-本轮句子.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function wordBook(group){
    const collected=Object.values(state.collected).filter(o=>!group||o.group===group);
    app.innerHTML=`<a class="back-link" href="#">← 专项目录</a><div class="section-head"><div><p class="eyebrow">我用过的词语</p><h1>词语小本</h1><p class="muted">在练习里用过的词，会带着例句来到这里。</p></div><span class="pill">${Object.keys(state.collected).length} 个词</span></div><div class="filter-row"><a href="#words" ${!group?'aria-current="page"':''}>全部</a>${DESCRIBE_GROUPS.map(g=>`<a href="#words-${g.id}" ${group===g.id?'aria-current="page"':''}>${g.name}</a>`).join('')}</div>${collected.length?`<div class="word-library">${collected.map(o=>`<article><strong>${escape(o.word)}</strong><p>${escape(o.meaning)}</p><p class="sub">${escape(o.sentence)}</p><button class="speech" data-read="${escape(o.word)}">读词和例句</button></article>`).join('')}</div>`:'<div class="empty" style="margin-top:24px"><h2>这里等着你的新词语</h2><p>完成一句填空，再看看词语怎样留在例句里。</p><a class="btn primary" href="#animal">从动物特点开始 →</a></div>'}`;
    document.querySelectorAll('[data-read]').forEach(el=>el.onclick=()=>{const o=state.collected[el.dataset.read];speak(o.word+'。'+o.meaning+'。'+o.sentence);});
  }
  function records(){
    app.innerHTML=`<a class="back-link" href="#">← 专项目录</a><div class="section-head"><div><p class="eyebrow">每次练习，都留下一点积累</p><h1>练习记录</h1><p class="muted">完成的句子和中途换组留下的进度都在这里。</p></div></div>${state.history.length?[...state.history].map((r,index)=>({r,index})).reverse().map(({r,index})=>`<article class="sentence-record"><span class="pill">${escape(groupFor(r.group)?.name||'词语练习')} · ${r.finished?'已完成':'中途保存'}</span><p class="sub">${escape(new Date(r.started).toLocaleString('zh-CN'))}</p>${r.ids.map((id,i)=>byId.has(id)?`<p>${escape(fullSentence(byId.get(id),r.answers[i]))}</p>`:'').join('')}<div class="actions"><button class="btn small" data-export-record="${index}">导出这份记录</button>${!r.finished?`<button class="btn small" data-resume-record="${index}">接着这一份练</button>`:''}</div></article>`).join(''):'<div class="empty"><p>练完一轮，或中途换一组题时，会留下记录。</p><a class="btn primary" href="#animal">先去练一句 →</a></div>'}${warning()}`;
    document.querySelectorAll('[data-export-record]').forEach(el=>el.onclick=()=>exportRound(state.history[Number(el.dataset.exportRecord)]));
    document.querySelectorAll('[data-resume-record]').forEach(el=>el.onclick=()=>{
      const chosen=structuredClone(state.history[Number(el.dataset.resumeRecord)]);
      if(state.round&&!state.round.finished)state.history.push({...structuredClone(state.round),paused:true});
      state.round=chosen;active=0;save();location.hash='practice';
    });
  }
  function resources(){
    const resources=[
      {source:'人民教育出版社 · 小学语文教研资料',title:'从“写话”到“习作”的平稳过渡',text:'关注三年级刚开始习作时的困难，介绍控制难度、提供支架与先说后写的思路。',use:'这里的做法：先选词填好一句话，熟悉以后再去编故事。',url:'https://www.pep.com.cn/bks/xxyw/jzjd/202512/W020251202577695850259.pdf'},
      {source:'人民教育出版社 · 语文园地教学相关资料',title:'用句子补全和生活情境帮助词语运用',text:'相关教研文章介绍句子补全、联系生活举例等学习支架，把词义理解与具体表达联系起来。',use:'这里的做法：词语放进句子里选择，再用另一件熟悉的东西说一句。',url:'https://www.pep.com.cn/bks/xxyw/jzjd/202505/W020250531424725664829.pdf'},
      {source:'人民教育出版社 · 教材修订相关资料',title:'降低起步难度，提供更适合的学习支架',text:'相关资料介绍三年级教材在习作要求、练习安排和学习支持方面的调整。',use:'这里的做法：一个空与两个空分开练，每轮只做三题，允许查看线索或跟着示范完成。',url:'https://www.pep.com.cn/bks/xxyw/jzjd/202510/W020251016516675066625.pdf'},
      {source:'中华人民共和国教育部 · 2022 年版',title:'义务教育课程方案和课程标准发布页',text:'教育部正式发布页，内附语文课程标准，供家长了解不同学段的整体学习要求。',use:'使用建议：作为了解学段目标的背景资料，日常练习仍从孩子当前能完成的一小步开始。',url:'https://www.moe.gov.cn/srcsite/A26/s8001/202204/t20220420_619921.html'}
    ];
    app.innerHTML=`<a class="back-link" href="#">← 专项目录</a><div class="section-head"><div><p class="eyebrow">给陪练家长</p><h1>怎么陪她认识和使用词语</h1><p class="muted">参考公开教研思路，本站自行编写 30 道练习和配图。以下资料可继续阅读。</p></div></div><section class="note" style="margin-top:0"><strong>每次只练 3～5 分钟</strong><p>① 看图、读情境，找一个能观察到的特点。② 点空格，再选词。③ 看词义解释，把完整句子读一遍。④ 愿意的话，换一个身边的例子再说一句。</p><p>认识词义和能独立运用是两步。熟悉以后可以先遮住选项，让她试着说。不会时再给两个选择，避免一上来要求从空白写句子。</p><p>神情是眉眼嘴角的表现；心情是内在感受，需要联系事情和人物的话。皱眉也可能是思考，哭也不一定只有伤心。题目中的情境用于缩小范围，多个合适表达都接受。</p></section><div class="resources">${resources.map(r=>`<article class="resource-card"><p class="source">${r.source}</p><h2>${r.title}</h2><p>${r.text}</p><p><strong>${r.use}</strong></p><a class="btn small" href="${r.url}" target="_blank" rel="noopener noreferrer">阅读原始资料${r.url.endsWith('.pdf')?'（PDF）':''} ↗</a></article>`).join('')}</div><p class="sub">资料链接检索于 2026 年 11 月 5 日。原站可能加载较慢，部分资料为 PDF。题目与插图为本站自编，资料用于教学设计参考；填空反馈仅覆盖当前句子和选项。</p>`;
  }
  function focusTitle(){const title=document.querySelector('#questionTitle');if(title)title.focus();window.scrollTo({top:0,behavior:'instant'});}
  function render(){
    if('speechSynthesis'in window)speechSynthesis.cancel();
    const hash=location.hash.slice(1);
    if(hash==='main'){document.querySelector('#main').focus();return;}
    if(hash==='practice')exercise();else if(groupFor(hash))chooseGroup(hash);else if(hash==='words')wordBook();else if(hash.startsWith('words-')&&groupFor(hash.slice(6)))wordBook(hash.slice(6));else if(hash==='records')records();else if(hash==='resources')resources();else home();
    window.scrollTo({top:0,behavior:'instant'});
  }
  window.addEventListener('hashchange',render);window.addEventListener('pagehide',save);render();
})();
