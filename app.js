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
    title: "按照正确的运算顺序，结果是多少？",
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
    title: "读懂故事里的数量关系",
    label: "情景翻译任务",
    levels: {
      1: [
        { question: "这个故事应该怎样列式？", story: "盒子里原来有 <strong>12 支笔</strong>，老师又放进 <strong>3 包</strong>，每包 <strong>10 支</strong>。现在一共有多少支？", options: ["12 ＋ 10 × 3", "(12 ＋ 10) × 3"], correct: 0, explain: "3 包、每包 10 支，是 10 × 3；再和原来的 12 支合起来。", hint: "先找“几包、每包几个”，它们组成一个乘法小队。", steps: ["数量：原来12支、3包、每包10支", "小队：3包每包10支，是10×3", "合起来：12＋10×3"] },
        { question: "这个故事应该怎样列式？", story: "小明有 <strong>8 张</strong>卡片，又买了 <strong>4 袋</strong>，每袋 <strong>5 张</strong>。一共有多少张？", options: ["8 ＋ 4 × 5", "(8 ＋ 4) × 5"], correct: 0, explain: "4 袋每袋 5 张是 4 × 5，再加原来的 8 张。", hint: "原来的 8 张并不在袋子里，所以不能和 4 一起乘 5。", steps: ["数量：原来8张、4袋、每袋5张", "小队：4袋每袋5张，是4×5", "求总数：8＋4×5"] },
        { question: "这个故事应该怎样列式？", story: "有 <strong>6 组</strong>小朋友，每组 <strong>7 人</strong>，其中 <strong>9 人</strong>去拿道具。还剩多少人？", options: ["6 × 7 － 9", "6 × (7 － 9)"], correct: 0, explain: "先算 6 组一共有多少人，再减去离开的 9 人。", hint: "离开的是总人数中的 9 人，不是每组离开 9 人。", steps: ["数量：6组、每组7人、离开9人", "先求总人数：6×7", "求剩下：6×7－9"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "12 ＋ 10 × 3", options: ["原来有12支笔，又买3包，每包10支，求一共有多少支。", "有3个盒子，每盒先放12支，再放10支，求一共有多少支。"], correct: 0, explain: "10 × 3 表示 3 包、每包 10 支；12 是另外原有的数量。", hint: "先把 10 × 3 看作一个整体：3 个 10。", wrongHints: ["", "这个故事会列成 (12＋10)×3，因为每个盒子都有12支和10支。"], steps: ["先看乘法：10×3是3个10", "12不参加乘法，是另外的一份", "故事结构：原有12，再加3包每包10"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "4 × 6 ＋ 8", options: ["有4盒彩笔，每盒6支，另外还有8支，求总数。", "有4盒彩笔，每盒有6支红笔和8支蓝笔，求总数。"], correct: 0, explain: "4 × 6 是 4 个 6，算出盒子里的总数后，再加盒子外的 8 支。", hint: "问一问：8 有没有也重复 4 次？算式里它没有乘 4。", wrongHints: ["", "如果每盒都有6支和8支，应该列成4×(6＋8)。"], steps: ["乘法小队：4盒、每盒6支", "另外8支没有装在每个盒子里", "故事结构：4×6，再加8"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "35 － 5 × 4", options: ["原有35颗糖，送给4人，每人5颗，求还剩多少颗。", "把35颗糖先拿走5颗，再把剩下的平均分成4份。"], correct: 0, explain: "5 × 4 是送出的总数，再从原来的 35 颗中减去。", hint: "乘法 5 × 4 应该对应“4人、每人5颗”。", wrongHints: ["", "这个故事先做35－5，接下来是除以4，不符合原算式。"], steps: ["原来总数：35颗", "送出小队：4人每人5颗，是5×4", "求剩下：35－5×4"] }
      ],
      2: [
        { question: "这个故事应该怎样列式？", story: "把 <strong>48 块</strong>积木平均装进 <strong>6 个盒子</strong>，再给每个盒子添 <strong>3 块</strong>。每盒现在有几块？", options: ["48 ÷ 6 ＋ 3", "48 ÷ (6 ＋ 3)"], correct: 0, explain: "先平均分：48 ÷ 6；再给每盒增加 3 块。", hint: "增加的是每个盒子里的数量，不是盒子的个数。", steps: ["平均分：48块装进6盒", "先求每盒：48÷6", "每盒再添3块：48÷6＋3"] },
        { question: "这个故事应该怎样列式？", story: "一本书有 <strong>60 页</strong>。小禾每天读 <strong>8 页</strong>，读了 <strong>5 天</strong>，还剩多少页？", options: ["60 － 8 × 5", "(60 － 8) × 5"], correct: 0, explain: "5 天一共读了 8 × 5 页，再从 60 页中减去。", hint: "先求 5 天总共读了多少页。", steps: ["总数：一本书60页", "读掉：5天每天8页，是8×5", "求剩下：60－8×5"] },
        { question: "这个故事应该怎样列式？", story: "有 <strong>3 箱</strong>球，每箱 <strong>24 个</strong>，平均分给 <strong>8 个班</strong>。每班几个？", options: ["3 × 24 ÷ 8", "3 × 24 ＋ 8"], correct: 0, explain: "先算 3 箱一共有多少个球，再把总数平均分给 8 个班。", hint: "“平均分”要用除法，不是加法。", steps: ["先求总数：3箱每箱24个", "球的总数：3×24", "平均分8班：3×24÷8"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "8 ＋ 24 ÷ 4", options: ["小雨原有8颗糖，24颗糖平均分给4人，她又得到其中一份，求现在有几颗。", "小雨有8颗糖，又得到24颗，然后把全部糖平均分给4人。"], correct: 0, explain: "24 ÷ 4 是平均分后的一份，再和原来的 8 颗合起来。", hint: "算式里只有24参加平均分，8没有被除以4。", wrongHints: ["", "这个故事应列成(8＋24)÷4，因为全部糖都参加平均分。"], steps: ["除法小队：24颗平均分4份", "8是原来单独拥有的", "故事结构：原有8，再加24÷4所得的一份"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "72 ÷ 8 × 3", options: ["把72张卡片平均分成8组，其中3组一共有多少张？", "72张卡片平均分给8×3个小朋友，求每人多少张。"], correct: 0, explain: "乘除同级从左往右：先求每组 72 ÷ 8 张，再求 3 组的数量。", hint: "先把算式读成：72平均分8份，取其中3份。", wrongHints: ["", "这个故事把8×3当成总人数，需要括号：72÷(8×3)。"], steps: ["先平均分：72÷8，求一组", "再取3组：一组数量×3", "故事顺序：平均分8组，再求3组"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "45 － 18 ÷ 3", options: ["原有45本书，把18本平均放在3层，拿走其中一层的书，求还剩多少本。", "从45本书中拿走18本，再把剩下的平均放在3层。"], correct: 0, explain: "18 ÷ 3 是一层的数量，45 减去的是这一层，而不是全部 18 本。", hint: "先解释18÷3代表什么，再看45减去了谁。", wrongHints: ["", "这个故事的顺序是(45－18)÷3，与原算式不同。"], steps: ["除法小队：18本平均放3层", "拿走其中一层：18÷3本", "求剩下：45－18÷3"] }
      ],
      3: [
        { question: "这个故事应该怎样列式？", story: "每个礼盒需要 <strong>6 颗红星</strong>和 <strong>4 颗蓝星</strong>，做 <strong>5 个</strong>礼盒，共需要多少颗？", options: ["(6 ＋ 4) × 5", "6 ＋ 4 × 5"], correct: 0, explain: "每盒先合计 6＋4＝10 颗，5 盒就是 (6＋4) × 5。", hint: "红星和蓝星是每一个礼盒都需要的。", steps: ["每盒：6颗红星加4颗蓝星", "括号表示每盒的总数：6＋4", "5个相同礼盒：(6＋4)×5"] },
        { question: "这个故事应该怎样列式？", story: "原有 <strong>90 元</strong>，买了 <strong>7 本</strong>每本 <strong>8 元</strong>的本子，又买一支 <strong>6 元</strong>的笔。还剩多少元？", options: ["90 － (7 × 8 ＋ 6)", "90 － 7 × 8 ＋ 6"], correct: 0, explain: "本子和笔都是花掉的钱，要先合起来，再从 90 元中减去。", hint: "6 元也是花掉的钱，不能在最后加回来。", steps: ["本子花费：7本每本8元，是7×8", "总花费：7×8再加6元", "求剩下：90－(7×8＋6)"] },
        { question: "这个故事应该怎样列式？", story: "甲筐有 <strong>30 个</strong>苹果，乙筐有 <strong>18 个</strong>，把两筐苹果平均分给 <strong>6 人</strong>。每人几个？", options: ["(30 ＋ 18) ÷ 6", "30 ＋ 18 ÷ 6"], correct: 0, explain: "要先合并两筐得到总数 48，再平均分给 6 人。", hint: "平均分的是两筐合起来的全部苹果。", steps: ["先合并两筐：30＋18", "括号表示参加平均分的总数", "平均分6人：(30＋18)÷6"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "(12 ＋ 8) × 3", options: ["每个礼包里有12张贴纸和8张卡片，做3个相同礼包，求一共多少件。", "原有12张贴纸，又买3包卡片，每包8张，求一共有多少张。"], correct: 0, explain: "括号说明每一份都有 12＋8，整个这样的组合重复 3 次。", hint: "括号里的12和8都要乘3，也就是每个礼包都有这两样。", wrongHints: ["", "这个故事是12＋8×3，12只出现一次，不符合括号。"], steps: ["括号整体：每份都有12和8", "括号外×3：这样的整份有3个", "故事结构：3个相同礼包，每个都有12＋8"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "72 ÷ (6 ＋ 3)", options: ["72块饼干平均分给6名男生和3名女生，求每人几块。", "72块饼干平均分给6名男生，每人再得到3块。"], correct: 0, explain: "括号里的 6＋3 是一起参加平均分的总人数。", hint: "除数是整个括号，所以6人和3人都参加平均分。", wrongHints: ["", "这个故事应列成72÷6＋3，3表示每人增加的数量。"], steps: ["参加人数：6名男生加3名女生", "括号表示总人数：6＋3", "72平均分给总人数：72÷(6＋3)"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "6 × (15 － 9) ＋ 4", options: ["每盒原有15颗珠子，拿走9颗；有6盒，另外还有4颗，求剩下总数。", "有6盒，每盒15颗，拿走9颗，再拿走4颗，求剩下多少。"], correct: 0, explain: "每一盒都先做 15－9，然后这样的盒子有 6 个，最后再加另外的 4 颗。", hint: "括号里的15－9会重复6次，4只在最后出现一次。", wrongHints: ["", "这个故事接近6×15－9－4，9并不是每盒都拿走。"], steps: ["每盒剩下：15－9", "6盒都这样：6×(15－9)", "另外4颗：6×(15－9)＋4"] }
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
  translationLens: document.querySelector("#translationLens"),
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
  elements.practiceTitle.textContent = question.question || group.title;
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
  } else if (question.scenario) {
    elements.promptArea.innerHTML = `
      <p class="scenario-instruction">先不要算答案，试着说一说每个数代表什么。</p>
      <div class="expression scenario-expression">${question.scenario}</div>`;
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

  renderTranslationLens(question);

  elements.answerArea.innerHTML = "";
  shuffle(question.options.map((option, index) => ({ option, index }))).forEach(({ option, index }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    if (question.scenario) button.classList.add("story-choice");
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
    if (state.mode === "story") revealTranslationSteps(question, 3);
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
    const storyHint = question.wrongHints?.[index] || question.hint;
    const retryText = state.mode === "story"
      ? storyHint
      : state.attempts >= 2 ? question.hint : "先别急着计算答案，看看运算符和括号。";
    showFeedback("try-again", "没关系，再观察一次", retryText);
    if (state.mode === "story") revealTranslationSteps(question, Math.min(state.attempts, 2));
    giveAudioFeedback("wrong", `再观察一次。${retryText}`);
  }
}

function showFeedback(type, title, text) {
  elements.feedback.className = `feedback show ${type}`;
  elements.feedbackTitle.textContent = title;
  elements.feedbackText.textContent = text;
}

function renderTranslationLens(question) {
  if (state.mode !== "story") {
    elements.translationLens.hidden = true;
    elements.translationLens.innerHTML = "";
    return;
  }
  elements.translationLens.hidden = false;
  elements.translationLens.innerHTML = `
    <div class="lens-step"><span>1</span><div><strong>找数量</strong><small>每个数字代表什么？</small></div></div>
    <div class="lens-step"><span>2</span><div><strong>组小队</strong><small>哪两个数量关系最紧？</small></div></div>
    <div class="lens-step"><span>3</span><div><strong>看问题</strong><small>最后要求总数、剩下还是每份？</small></div></div>`;
  elements.translationLens.dataset.hasSteps = String(Boolean(question.steps));
}

function revealTranslationSteps(question, count) {
  if (!question.steps) return;
  [...elements.translationLens.querySelectorAll(".lens-step")].forEach((step, index) => {
    if (index >= count) return;
    step.classList.add("revealed");
    step.querySelector("small").textContent = question.steps[index];
  });
}

function showHint() {
  if (state.answered) return;
  const question = currentQuestion();
  state.usedHint = true;
  showFeedback("hint", "提示卡", question.hint);
  if (state.mode === "story") revealTranslationSteps(question, 2);
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
  elements.translationLens.hidden = true;
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
let prerecordedAudio;

function stopSpeaking() {
  speechRequestId += 1;
  if (prerecordedAudio) {
    prerecordedAudio.pause();
    prerecordedAudio.currentTime = 0;
    prerecordedAudio = null;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function integerToChinese(value) {
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 0 || number > 9999) return String(value);
  if (number === 0) return "零";
  const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const units = ["", "十", "百", "千"];
  const source = String(number);
  let result = "";
  let pendingZero = false;

  [...source].forEach((character, index) => {
    const digit = Number(character);
    const unit = units[source.length - index - 1];
    if (digit === 0) {
      if (result && [...source.slice(index + 1)].some((item) => item !== "0")) pendingZero = true;
      return;
    }
    if (pendingZero) {
      result += "零";
      pendingZero = false;
    }
    const omitOne = digit === 1 && unit === "十" && result === "";
    result += `${omitOne ? "" : digits[digit]}${unit}`;
  });
  return result;
}

function speechFriendlyText(text) {
  return text
    // Pause after a complete expression before explanatory prose, while
    // keeping number-and-measure-word phrases such as “8 张” connected.
    .replace(/((?:\(?\d+\)?\s*[×*÷/＋+－\-=＝]\s*)+\(?\d+\)?)\s+(?![个只本张支颗块页天元人组份层盒包袋班次倍米厘米])(?=[\p{Script=Han}])/gu, "$1，")
    .replace(/\d+/g, integerToChinese)
    .replace(/[×*]/g, "，乘以，")
    .replace(/[÷/]/g, "，除以，")
    .replace(/[＝=]/g, "，等于，")
    .replace(/[＋+]/g, "，加，")
    .replace(/[－-]/g, "，减，")
    .replaceAll("(", "，括号里，")
    .replaceAll(")", "，括号结束，")
    .replace(/\s*，\s*/g, "，")
    .replace(/，{2,}/g, "，")
    .replace(/\s+/g, "")
    .trim();
}

function speechMarkup(text) {
  const escaped = speechFriendlyText(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return `<speak>${escaped
    .replace(/([，；：])/g, '$1<break time="120ms"/>')
    .replace(/([。！？])/g, '$1<break time="240ms"/>')}</speak>`;
}

function speak(text) {
  if (!state.sound || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return false;

  const requestId = ++speechRequestId;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(speechMarkup(text));
  const voices = window.speechSynthesis.getVoices();
  const chineseVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("zh"));
  const preferredVoice = chineseVoices.find((voice) => voice.localService && /zh[-_](cn|hans)/i.test(voice.lang))
    || chineseVoices.find((voice) => voice.localService)
    || chineseVoices[0];

  utterance.lang = preferredVoice?.lang || "zh-CN";
  if (preferredVoice) utterance.voice = preferredVoice;
  utterance.rate = 0.92;
  utterance.pitch = 1.02;
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
  if (playPrerecordedAudio(type, text)) return;
  if (!speak(text)) playTone(type);
}

function playPrerecordedAudio(type, text) {
  const source = window.ARITHMETIC_AUDIO?.[text];
  if (!source) return false;

  stopSpeaking();
  const requestId = speechRequestId;
  const audio = new Audio(source);
  let fallbackStarted = false;
  prerecordedAudio = audio;

  const fallback = () => {
    if (fallbackStarted || requestId !== speechRequestId || !state.sound) return;
    fallbackStarted = true;
    prerecordedAudio = null;
    if (!speak(text)) playTone(type);
  };

  audio.addEventListener("ended", () => {
    if (prerecordedAudio === audio) prerecordedAudio = null;
  }, { once: true });
  audio.addEventListener("error", fallback, { once: true });
  audio.play().catch(fallback);
  return true;
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
