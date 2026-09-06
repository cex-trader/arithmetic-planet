const questionSets = {
  order: {
    title: "哪一部分应该先算？",
    label: "观察任务",
    levels: {
      1: [
        { prompt: "12 ＋ 10 × 3", options: ["12 ＋ 10", "10 × 3"], correct: 1, explain: "乘法写在后面，也要先算。先算 10 × 3，再加 12。", hint: "找一找乘号 × 在哪里。乘法小队要先集合。" },
        { prompt: "4 × 6 ＋ 8", options: ["4 × 6", "6 ＋ 8"], correct: 0, explain: "先算 4 × 6＝24，再算 24＋8。", hint: "这道题里，哪一块是乘法？" },
        { prompt: "35 － 5 × 4", options: ["35 － 5", "5 × 4"], correct: 1, explain: "先乘后减：先算 5 × 4＝20。", hint: "减号不会抢跑，先找到乘法。" },
        { prompt: "6 × 7 － 9", options: ["6 × 7", "7 － 9"], correct: 0, explain: "先算乘法 6 × 7，再减去 9。", hint: "圈出带有乘号的两个数。" }
      ],
      2: [
        { prompt: "48 ÷ 6 ＋ 7", options: ["48 ÷ 6", "6 ＋ 7"], correct: 0, explain: "除法和乘法一样，要在加法前面计算。", hint: "看到 ÷，先把这个除法小队圈起来。" },
        { prompt: "27 － 18 ÷ 3", options: ["27 － 18", "18 ÷ 3"], correct: 1, explain: "先算 18 ÷ 3＝6，再算 27－6。", hint: "除法写在后面，也不会改变它的优先顺序。" },
        { prompt: "8 ＋ 24 ÷ 4 × 2", options: ["8 ＋ 24", "24 ÷ 4"], correct: 1, explain: "乘除是同一级，从左往右，所以先算 24 ÷ 4。", hint: "先忽略加法，再看看乘除法中谁在左边。" },
        { prompt: "45 ÷ 5 × 3 ＋ 2", options: ["45 ÷ 5", "5 × 3"], correct: 0, explain: "乘除同级，从左往右，先算 45 ÷ 5。", hint: "乘法和除法地位相同，谁排在左边谁先来。" }
      ],
      3: [
        { prompt: "(12 ＋ 8) × 3", options: ["12 ＋ 8", "8 × 3"], correct: 0, explain: "括号像保护罩，里面的 12＋8 必须最先算。", hint: "先找括号，括号里的小队最优先。" },
        { prompt: "72 ÷ (6 ＋ 3)", options: ["72 ÷ 6", "6 ＋ 3"], correct: 1, explain: "先算括号里的 6＋3，再用 72 除以结果。", hint: "括号改变了原来的运算顺序。" },
        { prompt: "36 － (4 × 7 ＋ 2)", options: ["36 － 4", "4 × 7"], correct: 1, explain: "先进入括号；括号里又要先乘后加，所以先算 4 × 7。", hint: "先进入括号，再在括号里面找乘法。" },
        { prompt: "(30 － 6) ÷ 4 ＋ 5", options: ["30 － 6", "6 ÷ 4"], correct: 0, explain: "先算括号里的 30－6，然后再除以 4。", hint: "括号里的减法这次可以先跑。" }
      ]
    }
  },
  calculate: {
    title: "先拆一步，结果是多少？",
    label: "计算任务",
    levels: {
      1: [
        { prompt: "12 ＋ 10 × 3", options: ["42", "66", "52", "36"], correct: 0, explain: "10 × 3＝30，12＋30＝42。", hint: "先把 10 × 3 换成 30，算式就变成 12＋30。" },
        { prompt: "4 × 7 ＋ 15", options: ["43", "76", "47", "32"], correct: 0, explain: "4 × 7＝28，28＋15＝43。", hint: "先算 4 个 7 是多少，再加 15。" },
        { prompt: "50 － 6 × 5", options: ["20", "220", "44", "25"], correct: 0, explain: "6 × 5＝30，50－30＝20。", hint: "先把 6 × 5 算出来。" },
        { prompt: "9 × 5 － 18", options: ["27", "243", "36", "35"], correct: 0, explain: "9 × 5＝45，45－18＝27。", hint: "第一步得到 45，然后再减。" }
      ],
      2: [
        { prompt: "36 ÷ 4 ＋ 17", options: ["26", "21", "85", "13"], correct: 0, explain: "36 ÷ 4＝9，9＋17＝26。", hint: "先算除法，第一步会得到一个个位数。" },
        { prompt: "60 － 24 ÷ 6", options: ["56", "6", "36", "54"], correct: 0, explain: "24 ÷ 6＝4，60－4＝56。", hint: "不是先算 60－24，要先处理除法。" },
        { prompt: "8 ＋ 24 ÷ 4 × 3", options: ["26", "24", "30", "14"], correct: 0, explain: "24 ÷ 4＝6，6 × 3＝18，最后 8＋18＝26。", hint: "先忽略加法；乘除同级，从左往右。" },
        { prompt: "7 × 8 － 18 ÷ 3", options: ["50", "38", "18", "12"], correct: 0, explain: "7 × 8＝56，18 ÷ 3＝6，最后 56－6＝50。", hint: "先分别算出乘法小队和除法小队。" }
      ],
      3: [
        { prompt: "(16 ＋ 8) ÷ 6", options: ["4", "12", "18", "8"], correct: 0, explain: "括号里 16＋8＝24，24 ÷ 6＝4。", hint: "先打开括号，算出 16＋8。" },
        { prompt: "6 × (15 － 9) ＋ 4", options: ["40", "94", "32", "64"], correct: 0, explain: "15－9＝6，6 × 6＝36，最后加 4 得 40。", hint: "先算括号里的减法。" },
        { prompt: "84 ÷ (2 × 3) ＋ 5", options: ["19", "47", "33", "12"], correct: 0, explain: "2 × 3＝6，84 ÷ 6＝14，14＋5＝19。", hint: "先算括号里的 2 × 3。" },
        { prompt: "90 － (7 × 8 ＋ 6)", options: ["28", "34", "40", "76"], correct: 0, explain: "括号里先算 7 × 8＝56，再加 6 得 62；90－62＝28。", hint: "先进入括号，括号里还要先乘后加。" }
      ]
    }
  },
  story: {
    title: "哪个算式讲的是这个故事？",
    label: "故事任务",
    levels: {
      1: [
        { story: "盒子里原来有 <strong>12 支笔</strong>，老师又放进 <strong>3 包</strong>，每包 <strong>10 支</strong>。现在一共有多少支？", options: ["12 ＋ 10 × 3", "(12 ＋ 10) × 3"], correct: 0, explain: "3 包、每包 10 支，是 10 × 3；再和原来的 12 支合起来。", hint: "先找“几包、每包几个”，它们组成一个乘法小队。" },
        { story: "小明有 <strong>8 张</strong>卡片，又买了 <strong>4 袋</strong>，每袋 <strong>5 张</strong>。一共有多少张？", options: ["8 ＋ 4 × 5", "(8 ＋ 4) × 5"], correct: 0, explain: "4 袋每袋 5 张是 4 × 5，再加原来的 8 张。", hint: "原来的 8 张并不在袋子里，所以不能和 4 一起乘 5。" },
        { story: "有 <strong>6 组</strong>小朋友，每组 <strong>7 人</strong>，其中 <strong>9 人</strong>去拿道具。还剩多少人？", options: ["6 × 7 － 9", "6 × (7 － 9)"], correct: 0, explain: "先算 6 组一共有多少人，再减去离开的 9 人。", hint: "离开的是总人数中的 9 人，不是每组离开 9 人。" }
      ],
      2: [
        { story: "把 <strong>48 块</strong>积木平均装进 <strong>6 个盒子</strong>，再给每个盒子添 <strong>3 块</strong>。每盒现在有几块？", options: ["48 ÷ 6 ＋ 3", "48 ÷ (6 ＋ 3)"], correct: 0, explain: "先平均分：48 ÷ 6；再给每盒增加 3 块。", hint: "增加的是每个盒子里的数量，不是盒子的个数。" },
        { story: "一本书有 <strong>60 页</strong>。小禾每天读 <strong>8 页</strong>，读了 <strong>5 天</strong>，还剩多少页？", options: ["60 － 8 × 5", "(60 － 8) × 5"], correct: 0, explain: "5 天一共读了 8 × 5 页，再从 60 页中减去。", hint: "先求 5 天总共读了多少页。" },
        { story: "有 <strong>3 箱</strong>球，每箱 <strong>24 个</strong>，平均分给 <strong>8 个班</strong>。每班几个？", options: ["3 × 24 ÷ 8", "3 × 24 ＋ 8"], correct: 0, explain: "先算 3 箱一共有多少个球，再把总数平均分给 8 个班。", hint: "“平均分”要用除法，不是加法。" }
      ],
      3: [
        { story: "每个礼盒需要 <strong>6 颗红星</strong>和 <strong>4 颗蓝星</strong>，做 <strong>5 个</strong>礼盒，共需要多少颗？", options: ["(6 ＋ 4) × 5", "6 ＋ 4 × 5"], correct: 0, explain: "每盒先合计 6＋4＝10 颗，5 盒就是 (6＋4) × 5。", hint: "红星和蓝星是每一个礼盒都需要的。" },
        { story: "原有 <strong>90 元</strong>，买了 <strong>7 本</strong>每本 <strong>8 元</strong>的本子，又买一支 <strong>6 元</strong>的笔。还剩多少元？", options: ["90 － (7 × 8 ＋ 6)", "90 － 7 × 8 ＋ 6"], correct: 0, explain: "本子和笔都是花掉的钱，要先合起来，再从 90 元中减去。", hint: "6 元也是花掉的钱，不能在最后加回来。" },
        { story: "甲筐有 <strong>30 个</strong>苹果，乙筐有 <strong>18 个</strong>，把两筐苹果平均分给 <strong>6 人</strong>。每人几个？", options: ["(30 ＋ 18) ÷ 6", "30 ＋ 18 ÷ 6"], correct: 0, explain: "要先合并两筐得到总数 48，再平均分给 6 人。", hint: "平均分的是两筐合起来的全部苹果。" }
      ]
    }
  },
  transfer: {
    title: "两道题的第一步一样吗？",
    label: "变式任务",
    levels: {
      1: [
        { compare: ["2 × 7 ＋ 10", "12 ＋ 10 × 3"], options: ["一样：都先算乘法", "不一样：都从左边算"], correct: 0, explain: "乘法放在左边或右边，都要先于加法计算。位置变了，规则没有变。", hint: "别看乘法站在哪里，只看它是什么运算。" },
        { compare: ["8 ＋ 4 × 5", "4 × 5 ＋ 8"], options: ["一样：都先算 4 × 5", "不一样：第一题先算 8＋4"], correct: 0, explain: "两题都先算 4 × 5，而且答案也相同。", hint: "把两题里的乘法小队都圈出来。" },
        { compare: ["30 － 3 × 6", "3 × 6 ＋ 30"], options: ["第一步一样，结果不一样", "第一步和结果都一样"], correct: 0, explain: "两题都先算 3 × 6；但一个接着减，一个接着加，结果不同。", hint: "先算的“小队”相同，不代表后面的运算也相同。" }
      ],
      2: [
        { compare: ["24 ÷ 4 × 2", "24 × 4 ÷ 2"], options: ["不一样：同级从左往右", "一样：都先算除法"], correct: 0, explain: "乘除同级，要从左往右。第一题先除，第二题先乘。", hint: "乘法和除法地位相同，这时看谁站在左边。" },
        { compare: ["6 ＋ 18 ÷ 3", "(6 ＋ 18) ÷ 3"], options: ["不一样：括号改变顺序", "一样：都先算 18÷3"], correct: 0, explain: "第一题先除法；第二题有括号，要先算 6＋18。", hint: "找一找，哪道题多了一个“保护罩”？" },
        { compare: ["5 × 8 ＋ 4", "4 ＋ 5 × 8"], options: ["一样：都先算 5 × 8", "不一样：第二题先加"], correct: 0, explain: "加数交换了位置，但乘法小队和最终结果都没有改变。", hint: "乘法写在后面时仍然先算。" }
      ],
      3: [
        { compare: ["(12 ＋ 8) × 3", "12 ＋ 8 × 3"], options: ["不一样：左题先加，右题先乘", "一样：都先算加法"], correct: 0, explain: "括号让左题先算加法；右题没有括号，所以先算乘法。", hint: "括号是会改变顺序的“保护罩”。" },
        { compare: ["72 ÷ (6 ＋ 3)", "72 ÷ 6 ＋ 3"], options: ["不一样：左题先加，右题先除", "一样：都先算 72÷6"], correct: 0, explain: "左题括号优先；右题没有括号，除法优先。", hint: "分别圈出两题最先计算的小队。" },
        { compare: ["48 ÷ 6 × 2", "48 ÷ (6 × 2)"], options: ["不一样：右题先算括号", "一样：都从左往右"], correct: 0, explain: "左题同级从左往右，先算 48÷6；右题先算括号里的 6×2。", hint: "括号会让右边的小队提前。" }
      ]
    }
  }
};

const state = {
  mode: "order",
  level: 1,
  index: 0,
  answered: false,
  attempts: 0,
  usedHint: false,
  roundQuestions: [],
  roundStartStars: 0,
  firstTryCorrect: 0,
  stars: Number(localStorage.getItem("mathPlanetStars")) || 0,
  streak: Number(localStorage.getItem("mathPlanetStreak")) || 0,
  sound: localStorage.getItem("mathPlanetSound") !== "off"
};

const elements = {
  missionGrid: document.querySelector("#missionGrid"),
  modeLabel: document.querySelector("#modeLabel"),
  practiceTitle: document.querySelector("#practiceTitle"),
  promptArea: document.querySelector("#promptArea"),
  answerArea: document.querySelector("#answerArea"),
  feedback: document.querySelector("#feedback"),
  feedbackTitle: document.querySelector("#feedbackTitle"),
  feedbackText: document.querySelector("#feedbackText"),
  hintButton: document.querySelector("#hintButton"),
  nextButton: document.querySelector("#nextButton"),
  nextButtonLabel: document.querySelector("#nextButtonLabel"),
  questionNumber: document.querySelector("#questionNumber"),
  progressFill: document.querySelector("#progressFill"),
  starCount: document.querySelector("#starCount"),
  streakCount: document.querySelector("#streakCount"),
  soundButton: document.querySelector("#soundButton"),
  celebration: document.querySelector("#celebration"),
  practiceCard: document.querySelector("#practiceCard")
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getQuestions() {
  return state.roundQuestions;
}

function currentQuestion() {
  return getQuestions()[state.index];
}

function startRound() {
  state.roundQuestions = shuffle(questionSets[state.mode].levels[state.level]);
  state.index = 0;
  state.roundStartStars = state.stars;
  state.firstTryCorrect = 0;
}

function renderQuestion() {
  const group = questionSets[state.mode];
  const questions = getQuestions();
  const question = currentQuestion();
  state.answered = false;
  state.attempts = 0;
  state.usedHint = false;
  stopSpeaking();

  elements.modeLabel.textContent = group.label;
  elements.practiceTitle.textContent = group.title;
  elements.questionNumber.textContent = `第 ${state.index + 1} / ${questions.length} 题`;
  elements.progressFill.style.width = `${((state.index + 1) / questions.length) * 100}%`;
  elements.feedback.className = "feedback";
  elements.feedbackTitle.textContent = "";
  elements.feedbackText.textContent = "";
  elements.nextButton.disabled = true;
  elements.nextButtonLabel.textContent = "下一题";
  elements.hintButton.disabled = false;
  document.querySelector(".practice-actions").hidden = false;

  if (question.story) {
    elements.promptArea.innerHTML = `<div class="story-prompt">${question.story}</div>`;
  } else if (question.compare) {
    elements.promptArea.innerHTML = `
      <div class="compare-prompt">
        <div class="compare-box">${question.compare[0]}</div>
        <div class="compare-vs">和</div>
        <div class="compare-box">${question.compare[1]}</div>
      </div>`;
  } else {
    elements.promptArea.innerHTML = `<div class="expression">${question.prompt}</div>`;
  }

  elements.answerArea.innerHTML = "";
  shuffle(question.options.map((option, index) => ({ option, index }))).forEach(({ option, index }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index, button));
    elements.answerArea.appendChild(button);
  });
}

function checkAnswer(index, button) {
  if (state.answered) return;
  const question = currentQuestion();

  if (index === question.correct) {
    state.answered = true;
    const independent = state.attempts === 0 && !state.usedHint;
    const earned = independent ? 2 : 1;
    state.stars += earned;
    state.streak += 1;
    if (independent) state.firstTryCorrect += 1;
    saveProgress();

    button.classList.add("correct");
    [...elements.answerArea.children].forEach((item) => { item.disabled = true; });
    const feedbackTitle = state.attempts === 0 ? `太棒了，获得 ${earned} 颗星！` : "找到了，就是这一块！";
    showFeedback("success", feedbackTitle, question.explain);
    elements.nextButton.disabled = false;
    if (state.index === getQuestions().length - 1) {
      elements.nextButtonLabel.textContent = "完成本轮";
    }
    elements.hintButton.disabled = true;
    giveAudioFeedback("correct", `答对了。${question.explain}`);
    celebrate();
    elements.nextButton.focus({ preventScroll: true });
  } else {
    state.attempts += 1;
    state.streak = 0;
    saveProgress();
    button.classList.remove("wrong");
    void button.offsetWidth;
    button.classList.add("wrong");
    const retryText = state.attempts >= 2 ? question.hint : "先别急着计算答案，看看运算符和括号。";
    showFeedback("try-again", "没关系，再观察一次", retryText);
    giveAudioFeedback("wrong", `再观察一次。${retryText}`);
  }
}

function showFeedback(type, title, text) {
  elements.feedback.className = `feedback show ${type}`;
  elements.feedbackTitle.textContent = title;
  elements.feedbackText.textContent = text;
}

function showHint() {
  if (state.answered) return;
  const question = currentQuestion();
  state.usedHint = true;
  showFeedback("hint", "提示卡", question.hint);
  giveAudioFeedback("hint", `提示。${question.hint}`);
}

function nextQuestion() {
  if (!state.answered) return;
  if (state.index === getQuestions().length - 1) {
    renderCompletion();
    return;
  }
  state.index += 1;
  renderQuestion();
  elements.practiceTitle.focus({ preventScroll: true });
}

function renderCompletion() {
  const total = getQuestions().length;
  const earned = state.stars - state.roundStartStars;
  elements.modeLabel.textContent = "本轮完成";
  elements.practiceTitle.textContent = "太棒了，探险成功！";
  elements.questionNumber.textContent = `${total} / ${total} 题`;
  elements.progressFill.style.width = "100%";
  elements.feedback.className = "feedback";
  elements.promptArea.innerHTML = `
    <div class="round-summary" aria-label="本轮学习成绩">
      <div class="summary-item"><strong>${total}</strong><span>完成题目</span></div>
      <div class="summary-item"><strong>${state.firstTryCorrect}</strong><span>独立一次答对</span></div>
      <div class="summary-item"><strong>+${earned}</strong><span>获得星星</span></div>
    </div>
    <p class="summary-message">${state.firstTryCorrect === total ? "你已经能熟练看懂这一组算式了！" : "做得不错！再来一轮，看看能不能少用一次提示。"}</p>`;
  elements.answerArea.className = "answer-area round-actions";
  elements.answerArea.innerHTML = `
    <button class="answer-button" id="againButton" type="button">再练一轮</button>
    <button class="answer-button" id="changeModeButton" type="button">换个训练</button>`;
  document.querySelector(".practice-actions").hidden = true;
  document.querySelector("#againButton").addEventListener("click", () => {
    startRound();
    elements.answerArea.className = "answer-area";
    renderQuestion();
  });
  document.querySelector("#changeModeButton").addEventListener("click", () => {
    elements.missionGrid.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
    document.querySelector(`.mission-card[data-mode="${state.mode}"]`).focus({ preventScroll: true });
  });
  giveAudioFeedback("correct", `本轮完成。你完成了${total}道题，独立一次答对${state.firstTryCorrect}道，获得${earned}颗星。`);
  celebrate();
  elements.practiceTitle.focus({ preventScroll: true });
}

function switchMode(mode) {
  state.mode = mode;
  state.index = 0;
  document.querySelectorAll(".mission-card").forEach((card) => {
    const active = card.dataset.mode === mode;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  startRound();
  elements.answerArea.className = "answer-area";
  renderQuestion();
  elements.practiceCard.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

function switchLevel(level) {
  state.level = Number(level);
  state.index = 0;
  document.querySelectorAll(".level-button").forEach((button) => {
    const active = Number(button.dataset.level) === state.level;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  startRound();
  elements.answerArea.className = "answer-area";
  renderQuestion();
}

function saveProgress() {
  localStorage.setItem("mathPlanetStars", String(state.stars));
  localStorage.setItem("mathPlanetStreak", String(state.streak));
  elements.starCount.textContent = state.stars;
  elements.streakCount.textContent = state.streak;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function celebrate() {
  if (prefersReducedMotion()) return;
  const colors = ["#6757d9", "#ffbf3f", "#e85b91", "#2d9d78", "#f28a31"];
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 24; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${8 + Math.random() * 84}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--drift", `${-60 + Math.random() * 120}px`);
    piece.style.animationDelay = `${Math.random() * 120}ms`;
    fragment.appendChild(piece);
  }
  elements.celebration.replaceChildren(fragment);
  window.setTimeout(() => elements.celebration.replaceChildren(), 1200);
}

let audioContext;
let speechRequestId = 0;

function stopSpeaking() {
  speechRequestId += 1;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function speechFriendlyText(text) {
  return text
    .replaceAll("×", "乘")
    .replaceAll("÷", "除以")
    .replaceAll("＝", "等于")
    .replaceAll("＋", "加")
    .replaceAll("－", "减")
    .replaceAll("(", "，括号，")
    .replaceAll(")", "，括号结束，")
    .replace(/\s+/g, " ");
}

function speak(text) {
  if (!state.sound || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return false;

  const requestId = ++speechRequestId;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(speechFriendlyText(text));
  const voices = window.speechSynthesis.getVoices();
  const chineseVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("zh"));
  const preferredVoice = chineseVoices.find((voice) => voice.localService && /zh[-_](cn|hans)/i.test(voice.lang))
    || chineseVoices.find((voice) => voice.localService)
    || chineseVoices[0];

  utterance.lang = preferredVoice?.lang || "zh-CN";
  if (preferredVoice) utterance.voice = preferredVoice;
  utterance.rate = 0.88;
  utterance.pitch = 1.06;
  utterance.volume = 1;

  // A short delay avoids an older WebKit issue where cancel() could also remove
  // an utterance queued immediately after it.
  window.setTimeout(() => {
    if (requestId === speechRequestId && state.sound) window.speechSynthesis.speak(utterance);
  }, 80);
  return true;
}

function giveAudioFeedback(type, text) {
  if (!state.sound) return;
  if (!speak(text)) playTone(type);
}

function playTone(type) {
  if (!state.sound) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const tones = { correct: [523, 659], wrong: [220], hint: [392] };
    const notes = tones[type];
    oscillator.type = type === "correct" ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(notes[0], audioContext.currentTime);
    if (notes[1]) oscillator.frequency.setValueAtTime(notes[1], audioContext.currentTime + 0.1);
    gain.gain.setValueAtTime(0.07, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.22);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.23);
  } catch (_) {
    // Audio is an optional enhancement; the visual feedback remains complete.
  }
}

elements.missionGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".mission-card");
  if (card) switchMode(card.dataset.mode);
});

document.querySelectorAll(".level-button").forEach((button) => {
  button.addEventListener("click", () => switchLevel(button.dataset.level));
});

elements.hintButton.addEventListener("click", showHint);
elements.nextButton.addEventListener("click", nextQuestion);
elements.soundButton.addEventListener("click", () => {
  state.sound = !state.sound;
  localStorage.setItem("mathPlanetSound", state.sound ? "on" : "off");
  elements.soundButton.setAttribute("aria-pressed", String(state.sound));
  elements.soundButton.setAttribute("aria-label", state.sound ? "关闭语音讲解" : "开启语音讲解");
  elements.soundButton.title = state.sound ? "语音讲解已开启" : "语音讲解已关闭";
  if (state.sound) giveAudioFeedback("hint", "语音讲解已开启");
  else stopSpeaking();
});

elements.soundButton.setAttribute("aria-pressed", String(state.sound));
elements.soundButton.setAttribute("aria-label", state.sound ? "关闭语音讲解" : "开启语音讲解");
elements.soundButton.title = state.sound ? "语音讲解已开启" : "语音讲解已关闭";
saveProgress();
startRound();
renderQuestion();
