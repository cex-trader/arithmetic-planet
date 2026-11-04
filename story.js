(() => {
  'use strict';
  const KEY = 'storyDirector.v1';
  const app = document.querySelector('#app');
  const esc = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let state = {lessons:{},works:[]};
  let storageOK = true;
  let toastTimer;
  let route = {id:0,step:0};
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (stored && stored.lessons && typeof stored.lessons === 'object' && !Array.isArray(stored.lessons) && Array.isArray(stored.works)) state = stored;
  } catch { storageOK = false; }
  function notify(text) {
    const el = document.querySelector('#toast'); el.textContent = text; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => {el.hidden = true;},3500);
  }
  function save() {
    try {localStorage.setItem(KEY,JSON.stringify(state)); storageOK = true;}
    catch {storageOK = false;}
    const status = document.querySelector('#saveStatus');
    if (status) status.textContent = storageOK ? '已保存在当前浏览器' : '浏览器未能保存，请在完成后导出作品备份';
  }
  function draft(id) {
    const current = state.lessons[id];
    if (!current || !Array.isArray(current.answers) || current.answers.length !== 3) {
      state.lessons[id] = {answers:Array.from({length:3},()=>({text:'',oral:false,hint:0,choice:''})),draft:'',checks:[false,false,false],note:'',done:false,step:0};
    }
    return state.lessons[id];
  }
  function renderHome() {
    const done = STORY_LESSONS.filter((_,id)=>state.lessons[id]?.done).length;
    const resume = STORY_LESSONS.findIndex((_,id)=> !state.lessons[id]?.done);
    app.innerHTML = `<section class="hero"><div><p class="eyebrow">语文工坊 / 三年级上</p><h1>故事小导演<br>你的想法，就是开场。</h1><p class="muted">从“我不知道”到“我有个主意”。<br>先说一说、演一演，再把自己的故事写下来。</p><a class="btn primary" href="#lesson-${resume < 0 ? 0 : resume}">${done ? '继续我的探险' : '开始第一个小任务'} <span aria-hidden="true">→</span></a></div><div><span class="pill">8 次训练 · 每次约 10～15 分钟</span><h2 style="margin-top:25px">一个小点子，<br>慢慢长成一个故事。</h2><p class="steps-note">想做什么 → 遇到麻烦<br>想个办法 → 最后怎样</p><p class="sub">已完成 ${done} / 8 次 · 可以自由选择训练</p></div></section>
      <div class="section-head"><div><p class="eyebrow">我的导演成长路线</p><h2>今天练一点什么？</h2></div><a class="back-link" href="#works">打开我的故事本 →</a></div>
      <div class="lesson-grid">${STORY_LESSONS.map((lesson,id)=>`<a class="lesson-card" href="#lesson-${id}"><span class="num">第 ${id+1} 次 · ${lesson.phase}</span><strong>${esc(lesson.title)}</strong><span>${esc(lesson.topic)}</span><span>${esc(lesson.skill)}</span><span class="status">${state.lessons[id]?.done ? '✓ 已完成 · 可以再练' : state.lessons[id] ? '接着上次的点子 →' : '开始探索 →'}</span></a>`).join('')}</div>
      <details class="note"><summary>家长陪练指南 · 先帮一点，再慢慢放手</summary><p>一周做 3 次左右即可。先让孩子自己想，卡住时给方向，再提供两个选择。不要一边口述一边纠错，也不必要求好词、字数和大道理。可用玩偶或两只手演故事。</p><p>前 6 次重点练局部能力，不强求每次写完整故事；后 2 次再串起来。允许口述，也可以用拼音记录。这里提供固定的引导，不会自动判断故事好坏。</p><p>每次只找一个她自己想出的点子，或一处说得具体的动作。帮助是否越来越少，比字数更值得关注。记录只存在当前浏览器，可到故事本导出。</p></details>`;
  }
  function renderLesson(id, step) {
    const lesson = STORY_LESSONS[id], d = draft(id);
    route = {id,step}; d.step = step;
    const isFinal = step === 3, a = d.answers[step], s = lesson.steps[step];
    app.innerHTML = `<div class="work-area"><div class="work-top"><a class="back-link" href="#">← 训练地图</a><p class="sub">第 ${id+1} 次 · ${esc(lesson.topic)}</p></div><div class="progress" aria-label="第 ${step+1} 步，共 4 步">${[0,1,2,3].map(i=>`<span class="${i<=step?'filled':''}"></span>`).join('')}</div><section class="exercise"><p class="eyebrow">${isFinal ? '收好今天的小点子' : `${lesson.phase} / 小任务 ${step+1} OF 3`}</p><h1 id="exerciseTitle" tabindex="-1">${esc(isFinal ? id < 6 ? '把今天的点子收进故事本' : '把自己的故事写下来' : s.title)}</h1>
      ${isFinal ? finalMarkup(id,d) : `<p class="sub">${esc(lesson.goal)}</p><div class="scene"><p>${esc(s.scene)}</p><strong>${esc(s.question)}</strong></div><button class="speech" id="readPrompt" type="button">读一读问题</button>
      ${step ? `<details class="sub"><summary>回看我前面的点子</summary>${d.answers.slice(0,step).map((x,i)=>`<p><strong>${esc(lesson.steps[i].title)}</strong><br>${x.text ? esc(x.text).replace(/\n/g,'<br>') : '已口述，未记文字'}</p>`).join('')}</details>` : ''}
      <label class="prompt-label" for="answer">我的想法 <span class="sub">（可以先说，记几个词也行）</span></label><textarea id="answer" maxlength="4000" placeholder="不用找标准答案，把你的想法说出来或记下来。">${esc(a.text)}</textarea><label class="oral"><input id="oral" type="checkbox" ${a.oral?'checked':''}>我已经说出来或演出来了，先不写。</label>
      <div class="actions"><button class="btn small" id="hint" type="button">${a.hint ? '再给我几个选择' : '有点卡住，给我一点方向'}</button></div><div id="hintArea">${hintMarkup(s,a)}</div>`}
      <div class="save-status" id="saveStatus" role="status">${storageOK?'内容会自动保存在当前浏览器':'浏览器存储暂不可用，完成后请导出作品'}</div><div class="actions"><button class="btn" id="previous" type="button">${step ? '← 上一步' : '← 训练地图'}</button><button class="btn primary" id="next" type="button">${isFinal?'收进故事本 ✓':step===2?'整理我的点子 →':'下一个小任务 →'}</button></div>
      <details class="parent"><summary>给陪练家长的小提醒</summary><p>${esc(lesson.parent)}</p>${isFinal ? '' : '<p>先等一等，再给方向，最后给选择。选择里的内容只是可能性，可以改，也可以全部不用。点选会放进记录框，鼓励孩子再用自己的话说一遍。</p>'}</details></section></div>`;
    bindLesson(id,step);
  }
  function hintMarkup(s,a) {
    if (!a.hint) return '';
    return `<div class="hint-panel"><p><strong>一点方向</strong><br>${esc(s.hint)}</p>${a.hint>1?`<p class="sub">这些只是点子。你可以选一个、改一改，也可以自己想。</p><div class="choices">${s.choices.map((choice,i)=>`<button class="choice ${a.choice===choice?'selected':''}" data-choice="${i}" aria-pressed="${a.choice===choice}" type="button">${esc(choice)}</button>`).join('')}</div>`:''}</div>`;
  }
  function finalMarkup(id,d) {
    const checkLabels = id < 6 ? ['我说出了自己的想法。','我试着把一个地方说清楚了。','我愿意把今天的点子收起来。'] : ['我交代了发生什么事。','我说清了角色做了什么。','结尾能接上前面的事情。'];
    return `<p class="sub">${id<6?'今天不必写完整作文。先回看刚才的想法，再留下一句你最喜欢的。':'先照着自己的点子讲一遍，再用自己的话写。可以用拼音，不用凑字数。'}</p>
    ${d.answers.map((a,i)=>`<div class="review-item"><small>${esc(STORY_LESSONS[id].steps[i].title)}</small><p>${a.text?esc(a.text).replace(/\n/g,'<br>'):'我已经口述或表演，未记文字。'}</p></div>`).join('')}
    <label class="prompt-label" for="storyDraft">${id<6?'我最喜欢的点子（选填）':'我的故事（也可以先口述）'}</label><textarea id="storyDraft" maxlength="12000" style="min-height:190px" placeholder="这里留给自己的表达。前面的选择不等于作文，试着用自己的话串起来。">${esc(d.draft)}</textarea><p class="sub">写到一半可以回地图，下次接着写。口述完成也可以收进故事本。</p><div class="checklist">${checkLabels.map((label,i)=>`<label><input type="checkbox" data-check="${i}" ${d.checks?.[i]?'checked':''}>${label}</label>`).join('')}</div><p class="sub">勾选是给自己检查用的，不影响完成，也不会自动给作文打分。</p><label class="prompt-label" for="parentNote">陪练观察（选填，家长填写）</label><textarea id="parentNote" maxlength="2000" placeholder="今天哪个点子是她自己想的？哪一步还需要帮助？">${esc(d.note)}</textarea>`;
  }
  function bindLesson(id,step) {
    const d = draft(id);
    const next = document.querySelector('#next');
    function updateNext() {next.disabled = step < 3 && !(d.answers[step].text.trim() || d.answers[step].oral);}
    updateNext();
    document.querySelector('#previous').onclick = ()=> {if(step) navigateStep(id,step-1); else location.hash='';};
    next.onclick = ()=> {
      if (step < 3) {if (!next.disabled) navigateStep(id,step+1); return;}
      d.done = true;
      state.works.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,lessonId:id,date:new Date().toISOString(),answers:structuredClone(d.answers),draft:d.draft,note:d.note,checks:[...d.checks]});
      save(); location.hash='works'; notify(storageOK ? '今天的想法已经收进故事本！' : '作品暂存于本页，请导出备份');
    };
    if (step === 3) {
      document.querySelector('#storyDraft').oninput = e=> {d.draft=e.target.value;save();};
      document.querySelector('#parentNote').oninput = e=> {d.note=e.target.value;save();};
      document.querySelectorAll('[data-check]').forEach(el=> {el.onchange=()=> {d.checks[Number(el.dataset.check)]=el.checked;save();};});
      return;
    }
    const a = d.answers[step];
    document.querySelector('#answer').oninput = e=> {a.text=e.target.value;save();updateNext();};
    document.querySelector('#oral').onchange = e=> {a.oral=e.target.checked;save();updateNext();};
    const hintButton = document.querySelector('#hint');
    function bindChoices() {
      document.querySelectorAll('[data-choice]').forEach(el=> {el.onclick=()=> {
        const value=STORY_LESSONS[id].steps[step].choices[Number(el.dataset.choice)];
        const existing=document.querySelector('#answer');
        if(existing.value.trim() && existing.value.trim()!==a.choice) {
          // Keep the child's own words; examples are appended, never replace them.
          a.text=existing.value+'\n'+value;
        } else a.text=value;
        a.choice=value; existing.value=a.text; save();updateNext();
        document.querySelector('#hintArea').innerHTML=hintMarkup(STORY_LESSONS[id].steps[step],a); bindChoices();
      };});
    }
    hintButton.onclick=()=> {a.hint=Math.min(2,a.hint+1);save();document.querySelector('#hintArea').innerHTML=hintMarkup(STORY_LESSONS[id].steps[step],a);hintButton.textContent=a.hint===1?'再给我几个选择':'选择已经展开，可以改成自己的想法';hintButton.disabled=a.hint===2;bindChoices();};
    if(a.hint===2) {hintButton.textContent='选择已经展开，可以改成自己的想法';hintButton.disabled=true;}
    bindChoices();
    document.querySelector('#readPrompt').onclick=()=> {
      if(!('speechSynthesis' in window)) {notify('当前浏览器不支持朗读，请由家长读一读。');return;}
      speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(STORY_LESSONS[id].steps[step].scene+'。'+STORY_LESSONS[id].steps[step].question);u.lang='zh-CN';u.rate=.85;
      u.onerror=()=>notify('朗读暂不可用，可以请家长读一读。');speechSynthesis.speak(u);
    };
  }
  function navigateStep(id,step) {
    renderLesson(id,step);save();document.querySelector('#exerciseTitle').focus();window.scrollTo({top:0,behavior:'instant'});
  }
  function renderWorks() {
    app.innerHTML=`<a class="back-link" href="#">← 训练地图</a><div class="section-head"><div><p class="eyebrow">我的小小创作收藏</p><h1>我的故事本</h1><p class="sub">${state.works.length} 次练习记录 · 不比字数，看看自己的想法怎样长大。</p></div><button class="btn" id="exportAll" ${state.works.length?'':'disabled'}>导出全部作品</button></div>
      ${!storageOK?'<p class="note">当前浏览器未能保存，请导出作品备份后再离开页面。</p>':''}
      <div class="work-list">${state.works.length?[...state.works].reverse().map(w=>{
        const lesson=STORY_LESSONS[w.lessonId];
        if(!lesson || !Array.isArray(w.answers)) return '';
        const hints=w.answers.filter(a=>a.hint>0).length,choices=w.answers.filter(a=>a.hint>1).length;
        return `<article class="saved-work"><span class="pill">第 ${w.lessonId+1} 次 · ${esc(new Date(w.date).toLocaleDateString('zh-CN'))}</span><h3>${esc(lesson.title)} · ${esc(lesson.topic)}</h3>${w.draft?`<p>${esc(w.draft)}</p>`:'<p class="sub">这次先口述或收集点子。我的想法记录在下面。</p>'}<details><summary>回看 ${w.answers.length} 个点子与陪练记录</summary><div>${w.answers.map((a,i)=>`<div class="review-item"><small>${esc(lesson.steps[i]?.title)}</small><p>${a.text?esc(a.text):'已口述或表演，未记文字。'}</p></div>`).join('')}<p class="sub">本次有 ${hints} 个小任务查看方向，其中 ${choices} 个展开了选项。此记录仅反映网页提示使用情况，不代表独立能力评分。</p>${w.note?`<p><strong>陪练观察</strong><br>${esc(w.note)}</p>`:''}</div></details><div class="actions"><a class="btn small" href="#lesson-${w.lessonId}">回看并继续修改</a><button class="btn small" data-export="${esc(w.id)}">导出这次作品</button></div></article>`;
      }).join(''):'<div class="empty"><h2>故事本还在等你的第一个点子</h2><p>完成一次训练，就能把想法收在这里。</p><a class="btn primary" href="#lesson-0">从小鸟的故事开始 →</a></div>'}</div><aside class="note">记录只保存在当前浏览器，换设备不会同步。导出的是可阅读的文字备份，请定期留存；本页暂不支持导入恢复。</aside>`;
    document.querySelector('#exportAll').onclick=()=>exportWorks(state.works);
    document.querySelectorAll('[data-export]').forEach(el=> {el.onclick=()=>exportWorks(state.works.filter(w=>w.id===el.dataset.export));});
  }
  function exportWorks(works) {
    const text=works.map(w=>{
      const lesson=STORY_LESSONS[w.lessonId];
      return `第 ${w.lessonId+1} 次：${lesson.title}\n题目：${lesson.topic}\n日期：${new Date(w.date).toLocaleString('zh-CN')}\n\n${w.answers.map((a,i)=>`${lesson.steps[i].title}\n${a.text||'已口述或表演，未记文字。'}\n使用帮助：${['未查看网页提示','查看方向','展开选择'][Math.min(2,a.hint)]}`).join('\n\n')}\n\n我的表达：\n${w.draft||'本次先口述或收集点子。'}\n\n陪练观察：${w.note||'未填写'}`;
    }).join('\n\n────────────────────\n\n');
    const url=URL.createObjectURL(new Blob(['\ufeff学习星球 · 我的故事本\n\n'+text],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download=`我的故事本-${new Date().toISOString().slice(0,10)}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function render() {
    if('speechSynthesis' in window) speechSynthesis.cancel();
    const match=location.hash.match(/^#lesson-([0-7])$/);
    if(match) {const id=Number(match[1]); const d=draft(id); renderLesson(id,Math.max(0,Math.min(3,Number(d.step)||0)));}
    else if(location.hash==='#works') renderWorks(); else renderHome();
    window.scrollTo({top:0,behavior:'instant'});
  }
  window.addEventListener('hashchange',render);
  window.addEventListener('pagehide',save);
  render();
})();
