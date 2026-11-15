(() => {
  'use strict';
  const { stages, questions, checkStep } = window.CompareTraining;
  const main = document.querySelector('#main');
  const key = 'quantityRelay.v1';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let saved = { records: {}, session: null };
  let storageOK = true;
  try {
    const raw = JSON.parse(localStorage.getItem(key) || 'null');
    if (raw && typeof raw.records === 'object' && raw.records && !Array.isArray(raw.records)) saved.records = raw.records;
    if (raw && validSession(raw.session)) saved.session = raw.session;
  } catch { storageOK = false; }
  function validSession(s) {
    return s && Array.isArray(s.ids) && s.ids.length > 0 && s.ids.every(id => questions.some(q => q.id === id)) &&
      Number.isInteger(s.index) && s.index >= 0 && s.index <= s.ids.length && Number.isInteger(s.step) && s.step >= 0 && s.step <= 2 &&
      s.attempt && typeof s.attempt === 'object';
  }
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(saved)); storageOK = true; } catch { storageOK = false; }
    const status = document.querySelector('#saveMessage');
    if (status) status.textContent = storageOK ? '进度保存在当前浏览器。' : '浏览器无法保存。离开前请导出练习记录。';
  }
  const saveStatus = () => `<p id="saveMessage" class="save-message">${storageOK ? '进度保存在当前浏览器。' : '浏览器无法保存。离开前请导出练习记录。'}</p>`;
  const method = () => `<section class="method"><p class="eyebrow">先学方法，再做题</p><h2>每次都走这六步</h2><p><strong>先问“求谁、比谁”，再想“大加、小减”，接着中间量算，最后代回去验。</strong></p><ol class="method-list">
    <li><strong>找所求</strong><p>圈出问题：最后要求谁的什么量？单位是什么？</p></li>
    <li><strong>找比较对象</strong><p>圈出互相比的两个对象，标清已知谁、要求谁。差的数不是总量。</p></li>
    <li><strong>把话说顺</strong><p>改说成“要求的量比已知量大／小”。大就加，小就减。</p></li>
    <li><strong>先求中间量</strong><p>最后一句和 B 比，B 还不知道，就先求 B，并写上单位。</p></li>
    <li><strong>接着求结果</strong><p>把刚求出的 B 当作新的已知量，再算 C；不要又从 A 算。</p></li>
    <li><strong>代回原话检查</strong><p>比大小、查差量，再写答句。纯加减按从左到右计算。</p></li></ol>
    <p class="warning"><strong>不能见“多、高、远”就加，见“少、矮、近”就减。</strong><br>要看：现在求谁？要求的量比已知的量大，还是小？这里的“大／小”指数量的大小。</p>
    <details><summary>卡住时怎么自问？／给陪练家长</summary><div><p>读一句，停一下：这句话说谁？和谁比？已知谁？要求谁？先让孩子用自己的话复述，再列式。</p><p>关系没说清，就用短线、长线摆一摆，暂时用小数；关系说对但算错，就保留原算式，在纸上列竖式。不要替她报出运算符号，也不用追求速度。</p><p>建议每天练 3 题、约 5～10 分钟。能不看提示，说出两步各在求谁，再换一站；各站都可直接进入。时间题只练用时长短，不混入钟面时刻和单位换算。</p></div></details></section>`;
  function home() {
    main.innerHTML = `<section class="compare-hero"><div><p class="eyebrow">三年级上 · 两步加减应用题</p><h1>数量接力站<br>读懂一句，接好下一步。</h1><p>先学会怎么想，再练习怎么算。楼高、距离、用时、数量，都可以用同一套方法。</p><div class="actions"><button class="btn primary" data-action="example">跟着例题学方法</button>${saved.session ? '<button class="btn" data-action="resume">继续上次练习</button>' : ''}</div></div><div class="route-art" aria-label="A到B，再从B到C"><span>A</span>→<span>B</span>→<span>C</span></div></section>${method()}
      <div class="section-head"><div><p class="eyebrow">用题目练方法</p><h2>每站 6 题，每轮只练 3 题</h2></div></div><div class="stage-grid">${stages.map((s,i) => {
        const count = questions.filter(q => q.stage === i && saved.records[q.id]?.done).length;
        return `<button class="lesson-card" data-stage="${i}"><span class="num">第 ${i+1} 站</span><strong>${s.title}</strong><span>${s.note}</span><span class="status">已练 ${count} / 6 题 · 点击开始</span></button>`;
      }).join('')}</div><div class="actions"><button class="btn" data-action="records">练习记录与重练</button><button class="btn" data-action="worksheet">纸上练方法（可打印）</button><button class="btn" data-action="export">导出练习记录</button></div>${saveStatus()}`;
  }
  let exampleStep = 0;
  const exampleLines = [
    ['找所求', '问题问 C 楼的高度。记住：最后要得到 C，单位是米。'],
    ['找比较对象、判大小', 'B 比 A 矮 35 米：求 B，已知 A。B 的高度小，用减法。C 比 B 高 18 米：求 C，和 B 比，C 的高度大，用加法。'],
    ['先求中间量', 'C 要和 B 比，可是 B 还不知道，所以先求 B。B 楼：120 − 35 = 85（米）。35 是差量，不是 B 的高度。'],
    ['接着求结果', '再从 B 的 85 米出发。C 楼：85 + 18 = 103（米）。不能写 120 + 18，因为 C 比的是 B，不是 A。'],
    ['代回原话检查', 'B 的 85 米小于 A 的 120 米，120 − 85 = 35；C 的 103 米大于 B 的 85 米，103 − 85 = 18。两句话都符合。答：C 楼高 103 米。'],
    ['合成一道算式', '120 − 35 + 18 = 85 + 18 = 103（米）。先做左边的减法，再加 18。也可以保留两步分式，不必急着合成。']
  ];
  function example() {
    main.innerHTML = `<div class="work-area"><div class="work-top"><button class="btn small" data-action="home">返回方法首页</button><span class="sub">例题 · 第 ${exampleStep+1} / 6 步</span></div><section class="exercise"><p class="eyebrow">把脑子里的想法说出来</p><h1>先求 B，再从 B 出发</h1><div class="scene question-text">A 楼高 120 米。<br>B 楼比 A 楼矮 35 米。<br>C 楼比 B 楼高 18 米。<br><strong>问：C 楼高多少米？</strong></div>${exampleLines.slice(0,exampleStep+1).map(([title,text],i) => `<div class="example-line"><strong class="number">${i+1} · ${title}</strong><p>${text}</p>${i===2 ? diagram(['A楼','B楼'],[120,85],'米') : i===3 ? diagram(['B楼','C楼'],[85,103],'米') : ''}</div>`).join('')}<div class="actions">${exampleStep ? '<button class="btn" data-action="example-back">上一步</button>' : ''}${exampleStep<5 ? '<button class="btn primary" data-action="example-next">接下来怎么想？</button>' : '<button class="btn primary" data-stage="1">我来照着做 3 题</button>'}</div></section><section class="method"><h2>同样有“高”，为什么这次要减？</h2><p>A 楼高 120 米，<strong>A 楼比 B 楼高 35 米</strong>，求 B 楼。</p><p>改说：B 楼比 A 楼矮 35 米。要求的 B 小，仍是 <strong>120 − 35 = 85（米）</strong>。</p><p class="warning">算之前先补一句：“我求的是＿＿，它比已知的＿＿大／小，所以用＿＿法。”</p></section></div>`;
  }
  function diagram(names,values,unit) {
    const max = Math.max(...values);
    return `<div class="diagram" role="img" aria-label="${escape(names.map((n,i)=>`${n}${values[i]}${unit}`).join('，'))}">${names.map((n,i)=>`<div class="bar-row"><span class="bar-label">${escape(n)}</span><div><div class="bar" style="width:${values[i]/max*100}%"></div><span class="bar-label">${values[i]} ${unit}</span></div></div>`).join('')}<p class="diagram-caption">同一组线段从左端对齐，比一比长度和差量。</p></div>`;
  }
  function start(stage,ids) {
    const pool = questions.filter(q => q.stage === stage);
    const sorted = [...pool].sort((a,b) => Number(!!saved.records[a.id]?.done)-Number(!!saved.records[b.id]?.done));
    const selected = ids || sorted.slice(0,3).map(q=>q.id);
    saved.session = { ids:selected,index:0,step:0,attempt:{},round:[] };
    persist(); exercise();
  }
  const qText = q => `${q.intro}${q.steps.map(s=>s.sentence).join('')}${q.ask}`;
  function radios(name,items,selected) {
    return `<div class="options">${items.map(([value,label])=>`<label><input type="radio" name="${name}" value="${escape(value)}" ${selected===value?'checked':''} required>${escape(label)}</label>`).join('')}</div>`;
  }
  function exercise() {
    const session = saved.session;
    if (!session) return home();
    if (session.index >= session.ids.length) return summary();
    const q = questions.find(x=>x.id===session.ids[session.index]);
    if (session.step >= q.steps.length) session.step = 0;
    const s = q.steps[session.step];
    const independent = q.stage === 4;
    const draft = session.draft || {};
    main.innerHTML = `<div class="work-area"><div class="work-top"><button class="btn small" data-action="home">返回方法首页</button><span class="sub">本轮 ${session.index+1} / ${session.ids.length} 题 · ${q.topic}</span></div><p class="mini-method">找所求 → 找比较对象 → 判大小 → 求中间量 → 求结果 → 代回检查</p><section class="exercise"><p class="eyebrow">${stages[q.stage].title}</p><h1>${independent?'自己列出两步算式':'先说清楚，再动笔算'}</h1><div class="scene question-text"><p>${q.intro}</p>${q.steps.map(t=>`<p>${t.sentence}</p>`).join('')}<p><strong>${q.ask}</strong></p></div>
      ${independent ? `<p>先在心里或草稿纸上说出六步方法，再填写算式。第一步求 ${q.steps[0].target}，第二步求 ${q.target}。</p>` : `<p class="step-ribbon">${stages[q.stage].skill}</p><h2 tabindex="-1" id="stepTitle">第 ${session.step+1} 步：求${s.target}的${q.quantity}</h2><p class="current-sentence">${s.sentence}</p>`}
      <form id="answerForm">${independent ? q.steps.map((t,i)=>`<fieldset><legend>第 ${i+1} 步 · ${t.target}的${q.quantity}</legend><p class="helper">${i ? '接着上一步的结果算。' : `从已知的 ${q.base} ${q.unit}出发。`}</p><label class="answer-label" for="op${i}">选择运算</label><select class="numeric" id="op${i}" name="op${i}" required><option value="">请选择</option><option value="+" ${draft[`op${i}`]==='+'?'selected':''}>加（+）</option><option value="-" ${draft[`op${i}`]==='-'?'selected':''}>减（−）</option></select> ${t.diff} = <label><span class="visually-hidden">第 ${i+1} 步的计算结果</span><input class="numeric" name="answer${i}" inputmode="numeric" pattern="[0-9]+" value="${escape(draft[`answer${i}`]||'')}" required></label> ${q.unit}</fieldset>`).join('') : `
      <fieldset><legend>① 这一步，和谁的${q.quantity}比？</legend>${radios('ref',q.names.slice(0,q.steps.length+1).map(n=>[n,n]),draft.ref)}</fieldset>
      <div class="field-row"><fieldset><legend>② 要求的量比它大还是小？</legend>${radios('size',[['大','大一些'],['小','小一些']],draft.size)}</fieldset><fieldset><legend>③ 所以选什么运算？</legend>${radios('op',[['+','加（+）'],['-','减（−）']],draft.op)}</fieldset></div><label class="answer-label" for="answer">④ 算一算：${s.known} □ ${s.diff} = ？</label><input class="numeric" id="answer" name="answer" inputmode="numeric" pattern="[0-9]+" value="${escape(draft.answer||'')}" required> ${q.unit}`}
      <div class="actions"><button class="btn primary" type="submit">检查我的想法</button><button class="btn" type="button" data-action="hint">我需要方法提示</button></div></form><div id="feedback" role="status" aria-live="polite"></div><div id="hintPanel" hidden class="hint-panel"></div>${saveStatus()}</section><details class="parent"><summary>忘记方法了？展开六步小卡</summary>${method()}</details></div>`;
    document.querySelector('#answerForm').addEventListener('submit', e=>{e.preventDefault(); submit(q);});
    document.querySelector('#answerForm').addEventListener('input', e=>{
      saved.session.draft = Object.fromEntries(new FormData(e.currentTarget)); persist();
    });
  }
  function mark(q,type) {
    const a = saved.session.attempt;
    a[type] = (a[type] || 0)+1;
    const record = saved.records[q.id] || { done:false,errors:{},tries:0 };
    record.errors = record.errors || {};
    record.errors[type] = (record.errors[type] || 0)+1;
    saved.records[q.id] = record; persist();
  }
  function explain(s,q) {
    return `求${s.target}，和${s.ref}的${q.quantity}比。${s.target}的量更${s.sign>0?'大，用加法':'小，用减法'}：${s.known} ${s.sign>0?'+':'−'} ${s.diff} = ${s.answer}（${q.unit}）。`;
  }
  function submit(q) {
    const session = saved.session;
    const form = document.querySelector('#answerForm');
    const input = Object.fromEntries(new FormData(form));
    const independent = q.stage === 4;
    let result = 'correct', errorStep = session.step;
    if (independent) {
      for (let i=0;i<q.steps.length;i++) {
        const s=q.steps[i];
        if (input[`op${i}`] !== (s.sign>0?'+':'-')) { result='operation';errorStep=i;break; }
        if (Number(input[`answer${i}`])!==s.answer) { result='calculation';errorStep=i;break; }
      }
    } else result = checkStep(q.steps[session.step],input);
    const s = q.steps[errorStep];
    const feedback = document.querySelector('#feedback');
    if (session.solved) return;
    if (result !== 'correct') {
      mark(q,result);
      const messages = {
        reference:`再读“${s.sentence}”这句话。这一步求${s.target}，不是总回到最开始的${q.names[0]}。请找出这一步的比较对象。`,
        relation:`先暂停计算，把话改说成“${s.target}的${q.quantity}比${s.ref}大／小”。这一步求的是${s.target}，别把两个人的位置换了。`,
        operation:`第${errorStep+1}步先判断：要求的${s.target}，比已知的${s.ref}大还是小？求较大的量用加，求较小的量用减。`,
        calculation:`第${errorStep+1}步的运算方向对了，重新算一算。${independent && errorStep===1 ? '从第一步的结果出发，' : ''}相同数位对齐，留意进位或退位。`,
        empty:'请填写一个完整的非负整数。'
      };
      feedback.className='feedback'; feedback.textContent=messages[result]; return;
    }
    feedback.className='feedback good';
    const last = independent || session.step === q.steps.length-1;
    if (last) {
      const record = saved.records[q.id] || { errors:{},tries:0 };
      record.done=true; record.tries=(record.tries||0)+1; record.last=new Date().toLocaleDateString('zh-CN');
      saved.records[q.id]=record;
      session.round = session.round || [];
      if (!session.round.some(item=>item.id===q.id)) session.round.push({ id:q.id, helped:Object.keys(session.attempt).length>0 });
      feedback.innerHTML=`<strong>两步接好了！现在代回原话检查。</strong>${q.steps.map(t=>`<p>${explain(t,q)}</p><p class="helper">检查：${t.target}的量应比${t.ref}${t.sign>0?'大':'小'}，差 ${t.diff} ${q.unit}。${Math.max(t.known,t.answer)} − ${Math.min(t.known,t.answer)} = ${t.diff}。</p>`).join('')}${diagram([s.ref,s.target],[s.known,s.answer],q.unit)}<p><strong>答：${q.target}的${q.quantity}是 ${q.steps.at(-1).answer} ${q.unit}。</strong></p><p>试着说给大人听：我先求谁？第二步为什么接着它算？</p><button class="btn primary" data-action="next-question">${session.index+1===session.ids.length?'看看本轮收获':'下一题，也用这套方法'}</button>`;
    } else {
      feedback.innerHTML=`<strong>中间量找到了！</strong><p>${explain(s,q)}</p>${diagram([s.ref,s.target],[s.known,s.answer],q.unit)}<p>接下来${q.target}和${q.steps[1].ref}比，所以从刚算出的 ${s.answer} ${q.unit}出发。</p><button class="btn primary" data-action="next-step">接着求${q.target}</button>`;
    }
    for (const element of form.elements) element.disabled=true;
    session.solved = true; persist();
  }
  function hint() {
    const q=questions.find(x=>x.id===saved.session.ids[saved.session.index]);
    mark(q,'hint');
    const panel=document.querySelector('#hintPanel'); panel.hidden=false;
    const s=q.steps[saved.session.step];
    panel.innerHTML=`<strong>用手指着题目，一问一答</strong><p>最后求${q.target}的${q.quantity}。${q.steps.length>1?`要先知道${q.steps[0].target}。`:''}</p><p>当前先求${s.target}。读“${s.sentence}”，把话改说成“${s.target}比${s.ref}${s.sign>0?'大':'小'} ${s.diff} ${q.unit}”。</p><p>求大的量，把差量添上；求小的量，把差量去掉。第二步的起点是第一步的结果。</p>`;
  }
  function summary() {
    const session=saved.session;
    const round=session.round || [];
    const independent=round.filter(r=>!r.helped).length;
    main.innerHTML=`<div class="work-area"><section class="exercise"><p class="eyebrow">本轮方法练习完成</p><h1>你已经把两步接起来了。</h1><p>完成 ${session.ids.length} 题，其中 ${independent} 题没有查看提示、没有修改答案。修改过也没关系，先能说清方法。</p><div class="scene"><strong>离开前，用自己的话说一说</strong><p>最后求谁？为什么要先求中间量？第二步从谁的量出发？我怎么检查？</p></div><div class="actions"><button class="btn primary" data-stage="${questions.find(q=>q.id===session.ids[0]).stage}">同一站，再练 3 题</button><button class="btn" data-action="home">回到方法首页</button><button class="btn" data-action="records">看看哪里需要重练</button></div>${saveStatus()}</section></div>`;
  }
  const labels={reference:'比较对象',relation:'大小关系',operation:'运算方向',calculation:'计算',hint:'使用提示',empty:'填写结果'};
  function records() {
    const practiced=questions.filter(q=>saved.records[q.id]);
    main.innerHTML=`<div class="work-area"><div class="work-top"><button class="btn" data-action="home">返回方法首页</button><button class="btn" data-action="export">导出记录</button></div><section class="exercise"><h1>方法练习本</h1><p>记录曾经卡住的位置。“使用提示”表示借助过帮助，不算做错；完成只代表练过，不代表已经独立掌握。</p>${practiced.length ? practiced.map(q=>{
      const r=saved.records[q.id];
      const errors=Object.entries(r.errors||{}).filter(([,v])=>v>0).map(([k,v])=>`${labels[k]||'其他'} ${v} 次`).join('；');
      return `<article class="record"><strong>${stages[q.stage].title} · ${q.topic}</strong><p>${qText(q)}</p><p class="helper">${r.done?'已完成':'练习中'} · ${escape(errors||'未使用提示，检查通过')}</p><button class="btn small" data-retry="${q.id}">再用方法做一遍</button></article>`;
    }).join(''):'<p>还没有记录。从例题学方法开始吧。</p>'}${saveStatus()}</section></div>`;
  }
  function worksheet() {
    main.innerHTML=`<div class="work-top no-print"><button class="btn" data-action="home">返回方法首页</button><button class="btn primary" data-action="print">打印训练单</button></div><h1 class="print-title">数量接力站 · 答题方法训练单</h1><p>每天选 3 题。先口述，再列式。姓名：________ 日期：________</p><p><strong>六步口诀：</strong>找所求 → 找比较对象 → 判大小 → 求中间量 → 求结果 → 代回检查</p><p>我求的是谁？它比已知的谁大／小？大就加，小就减。第二步接着中间量算。</p>${stages.map((stage,i)=>`<section><h2>${i+1} · ${stage.title}</h2><p>${stage.skill}</p>${questions.filter(q=>q.stage===i).map((q,j)=>`<article class="print-question"><p><strong>${j+1}.</strong> ${qText(q)}</p><p class="helper">先求＿＿，它和＿＿比；再求＿＿，接着＿＿算。列式并检查：</p><div class="print-space"></div></article>`).join('')}</section>`).join('')}<section class="answer-sheet"><h2>陪练参考 · 建议与训练单分开放</h2><p>先听孩子复述关系，再核对算式。算式对但结果错，就单独练计算。</p>${questions.map(q=>`<p>${q.stage+1}站 ${Number(q.id.split('-')[1])+1}题：${q.steps.map(s=>`${s.target}：${s.known} ${s.sign>0?'+':'−'} ${s.diff} = ${s.answer}（${q.unit}）`).join('；')}。代回检查两量之差。</p>`).join('')}</section>`;
  }
  function exportRecords() {
    const lines=['数量接力站 · 方法练习记录','找所求 → 找比较对象 → 判大小 → 求中间量 → 求结果 → 代回检查',''];
    questions.filter(q=>saved.records[q.id]).forEach(q=>{
      const r=saved.records[q.id];
      lines.push(qText(q),`状态：${r.done?'已完成':'练习中'}；完成次数：${r.tries||0}`,Object.entries(r.errors||{}).map(([k,v])=>`${labels[k]||k}：${v}`).join('；'),...q.steps.map(s=>explain(s,q)),'');
    });
    const blob=new Blob(['\ufeff'+lines.join('\n')],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob); const link=document.createElement('a');link.href=url;link.download='数量接力站-练习记录.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  main.addEventListener('click', e=>{
    const button=e.target.closest('button'); if(!button) return;
    if(button.dataset.stage!==undefined) { start(Number(button.dataset.stage)); window.scrollTo(0,0); return; }
    if(button.dataset.retry) { start(questions.find(q=>q.id===button.dataset.retry).stage,[button.dataset.retry]);window.scrollTo(0,0);return; }
    const action=button.dataset.action;
    if(action==='home') home();
    else if(action==='example') {exampleStep=0;example();}
    else if(action==='example-next') {exampleStep=Math.min(5,exampleStep+1);example();}
    else if(action==='example-back') {exampleStep=Math.max(0,exampleStep-1);example();}
    else if(action==='resume') { saved.session.solved=false;exercise(); }
    else if(action==='hint') {hint();return;}
    else if(action==='next-step') {if(!saved.session.solved)return;saved.session.step++;saved.session.draft={};saved.session.solved=false;persist();exercise();}
    else if(action==='next-question') {if(!saved.session.solved)return;saved.session.index++;saved.session.step=0;saved.session.draft={};saved.session.attempt={};saved.session.solved=false;persist();exercise();}
    else if(action==='records') records();
    else if(action==='worksheet') worksheet();
    else if(action==='print') {window.print();return;}
    else if(action==='export') {exportRecords();return;}
    window.scrollTo(0,0);
  });
  home();
})();
