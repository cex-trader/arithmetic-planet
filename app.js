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

const secondGradeQuestionSets = {
  order: {
    title: "先观察，哪个答案最有道理？",
    label: "规律观察任务",
    levels: {
      1: [
        { prompt: "2，4，6，8，？", options: ["10", "9", "12"], correct: 0, explain: "每次都增加 2，所以 8 后面是 10。", hint: "看看相邻两个数之间相差几。" },
        { prompt: "5，10，15，20，？", options: ["25", "22", "30"], correct: 0, explain: "每次都增加 5，所以接下来是 25。", hint: "从 5 到 10、从 10 到 15，各增加了多少？" },
        { prompt: "30，27，24，21，？", options: ["18", "19", "17"], correct: 0, explain: "每次都减少 3，所以 21 再减 3 是 18。", hint: "这列数越来越小，找一找每次少几个。" },
        { prompt: "1，3，6，10，？", options: ["15", "14", "16"], correct: 0, explain: "依次增加 2、3、4，下一次要增加 5，所以是 15。", hint: "把每相邻两个数的差写出来：2、3、4……" }
      ],
      2: [
        { prompt: "38 ＋ 27", options: ["先算 38＋2，再加25", "先算 38＋20，再减7"], correct: 0, explain: "从 27 中拿出 2 给 38，先凑成 40，再加 25 更容易。", hint: "38 离整十数 40 还差几？", solution: ["把 27 拆成 2 和 25", "38 ＋ 2 ＝ 40", "40 ＋ 25 ＝ 65"] },
        { prompt: "64 － 29", options: ["先算 64－30，再加1", "先算 64－20，再加9"], correct: 0, explain: "29 接近 30，先减 30 会多减 1，所以最后要加回 1。", hint: "把 29 看成 30，想想多减了还是少减了。", solution: ["把 29 看成 30－1", "64 － 30 ＝ 34", "34 ＋ 1 ＝ 35"] },
        { prompt: "25 ＋ 18 ＋ 5", options: ["先算 25＋5", "先算 18＋5"], correct: 0, explain: "25 和 5 能凑成 30，再加 18，计算更简便。", hint: "哪两个数合起来正好是整十数？", solution: ["交换加数位置，先把 25 和 5 放在一起", "25 ＋ 5 ＝ 30", "30 ＋ 18 ＝ 48"] },
        { prompt: "46 ＋ 19", options: ["先加20，再减1", "先加10，再减9"], correct: 0, explain: "19 比 20 少 1，先加 20，再减去多加的 1。", hint: "19 最接近哪个整十数？", solution: ["把 19 看成 20－1", "46 ＋ 20 ＝ 66", "66 － 1 ＝ 65"] }
      ],
      3: [
        { prompt: "3，6，5，10，9，18，？", options: ["17", "19", "36"], correct: 0, explain: "规律是乘 2、减 1 交替进行：18 后面要减 1，得到 17。", hint: "把变化分成两种动作：×2、－1、×2、－1……" },
        { prompt: "△ ＋ △ ＝ 16", options: ["△＝8", "△＝6", "△＝4"], correct: 0, explain: "两个相同的数合起来是 16，每个数就是 16 的一半：8。", hint: "想一想：几加几等于 16？两个加数必须相同。" },
        { prompt: "○ ＋ 7 ＝ 20", options: ["○＝13", "○＝27", "○＝12"], correct: 0, explain: "用总数 20 减去已知的 7，得到 ○＝13。", hint: "一个加数＝和－另一个加数。" },
        { prompt: "4 × □ ＝ 24", options: ["□＝6", "□＝8", "□＝20"], correct: 0, explain: "想乘法口诀：四六二十四，所以方框里是 6。", hint: "24 里面有几个 4？" }
      ]
    }
  },
  calculate: {
    title: "想清楚方法，结果是多少？",
    label: "巧算任务",
    levels: {
      1: [
        { prompt: "36 ＋ 27", options: ["63", "53", "73", "61"], correct: 0, explain: "先算 36＋20＝56，再算 56＋7＝63。", hint: "把 27 拆成 20 和 7。" },
        { prompt: "72 － 38", options: ["34", "44", "36", "40"], correct: 0, explain: "先算 72－30＝42，再算 42－8＝34。", hint: "把 38 拆成 30 和 8，分两次减。" },
        { prompt: "6 × 4", options: ["24", "20", "26", "18"], correct: 0, explain: "6 个 4 合起来是 24，也可以用口诀四六二十四。", hint: "画 6 组，每组放 4 个点。" },
        { prompt: "35 ÷ 5", options: ["7", "6", "8", "5"], correct: 0, explain: "因为 5 × 7＝35，所以 35 ÷ 5＝7。", hint: "想一想：5 乘几等于 35？" }
      ],
      2: [
        { prompt: "48 ＋ 26 ＋ 2", options: ["76", "74", "78", "72"], correct: 0, explain: "先让 48 和 2 凑成 50，再加 26，得到 76。", hint: "先找能凑成整十数的两个数。", solution: ["交换加数位置：48＋2＋26", "48 ＋ 2 ＝ 50", "50 ＋ 26 ＝ 76"] },
        { prompt: "83 － 27 － 3", options: ["53", "59", "50", "57"], correct: 0, explain: "27 和 3 合起来是 30，83－30＝53。", hint: "连续减去两个数，可以先想一共减了多少。", solution: ["先算一共要减多少", "27 ＋ 3 ＝ 30", "83 － 30 ＝ 53"] },
        { prompt: "8 × 5 ＋ 6", options: ["46", "88", "40", "54"], correct: 0, explain: "先算 8 × 5＝40，再加 6 得 46。", hint: "先求 8 组、每组 5 个一共有多少。" },
        { prompt: "42 ÷ 6 ＋ 9", options: ["16", "14", "15", "18"], correct: 0, explain: "先算 42 ÷ 6＝7，再算 7＋9＝16。", hint: "先用六七四十二求出除法。" }
      ],
      3: [
        { prompt: "100 － 46 ＋ 8", options: ["62", "46", "54", "64"], correct: 0, explain: "从左往右：100－46＝54，54＋8＝62。", hint: "加减法是同一级，要从左往右算。" },
        { prompt: "7 × (12 － 8)", options: ["28", "76", "36", "20"], correct: 0, explain: "先算括号里的 12－8＝4，再算 7 × 4＝28。", hint: "括号像任务盒，要先完成盒子里面的计算。" },
        { prompt: "(18 ＋ 12) ÷ 5", options: ["6", "20", "8", "5"], correct: 0, explain: "先算 18＋12＝30，再把 30 平均分成 5 份，每份是 6。", hint: "先把括号里的两个数合起来。" },
        { prompt: "6 × 8 － 19", options: ["29", "37", "31", "27"], correct: 0, explain: "先算 6 × 8＝48，再算 48－19＝29。", hint: "先求 6 个 8 的总数。" }
      ]
    }
  },
  story: {
    title: "读懂故事里的数量关系",
    label: "情景推理任务",
    levels: {
      1: [
        { question: "这个故事应该怎样列式？", story: "小羽有 <strong>28 张</strong>贴纸，又得到 <strong>15 张</strong>，送给同学 <strong>9 张</strong>。还剩多少张？", options: ["28 ＋ 15 － 9", "28 － 15 ＋ 9"], correct: 0, explain: "先把得到的 15 张加上，再把送出的 9 张减去。", hint: "得到会让数量变多，送出会让数量变少。", steps: ["找变化：得到15张、送出9张", "先合起来：28＋15", "再求剩下：28＋15－9"] },
        { question: "这个故事应该怎样列式？", story: "有 <strong>6 个</strong>小组，每组 <strong>4 人</strong>。一共有多少人？", options: ["6 × 4", "6 ＋ 4"], correct: 0, explain: "6 个相同的 4 要用乘法，列式为 6 × 4。", hint: "“每组一样多”而且有好几组，可以用乘法。", steps: ["每份：每组4人", "份数：一共有6组", "求总数：6×4"] },
        { question: "这个故事应该怎样列式？", story: "把 <strong>32 本</strong>书平均放到 <strong>4 层</strong>书架上，每层放几本？", options: ["32 ÷ 4", "32 － 4"], correct: 0, explain: "把 32 平均分成 4 份，要用除法。", hint: "看到“平均放”，想一想是在平均分。", steps: ["总数：32本书", "平均分：放到4层", "求每份：32÷4"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "45 － 18", options: ["原有45颗糖，吃了18颗，求还剩多少颗。", "原有45颗糖，又买来18颗，求一共有多少颗。"], correct: 0, explain: "减法表示从原来的 45 颗中去掉 18 颗。", hint: "算式里的数量最后是变多还是变少？", wrongHints: ["", "“又买来”会让数量变多，应该用加法。"], steps: ["原来：45颗", "变化：吃掉18颗", "求剩下：45－18"] }
      ],
      2: [
        { question: "这个故事应该怎样列式？", story: "有 <strong>5 盒</strong>蜡笔，每盒 <strong>8 支</strong>，画画用掉 <strong>7 支</strong>。还剩多少支？", options: ["5 × 8 － 7", "5 × (8 － 7)"], correct: 0, explain: "先求 5 盒的总数，再从总数里减去用掉的 7 支。", hint: "7 支是总共用掉的，不是每盒都用掉 7 支。", steps: ["先求总数：5盒每盒8支", "总数：5×8", "求剩下：5×8－7"] },
        { question: "这个故事应该怎样列式？", story: "妈妈买了 <strong>3 袋</strong>苹果，每袋 <strong>6 个</strong>，又买了 <strong>5 个</strong>梨。一共买了多少个水果？", options: ["3 × 6 ＋ 5", "3 × (6 ＋ 5)"], correct: 0, explain: "3 袋苹果一共 3 × 6 个，再加另外的 5 个梨。", hint: "梨只有 5 个，并不是每袋都有 5 个。", steps: ["苹果：3袋每袋6个", "苹果总数：3×6", "加上5个梨：3×6＋5"] },
        { question: "这个故事应该怎样列式？", story: "把 <strong>36 块</strong>饼干平均分给 <strong>6 人</strong>，每人吃掉 <strong>2 块</strong>。每人还剩几块？", options: ["36 ÷ 6 － 2", "36 ÷ (6 － 2)"], correct: 0, explain: "先求每人分到 36 ÷ 6＝6 块，再减去每人吃掉的 2 块。", hint: "先完成平均分，再看每个人手里的变化。", steps: ["平均分：36块分给6人", "每人得到：36÷6", "每人剩下：36÷6－2"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "7 × 5 ＋ 4", options: ["7组每组5人，另外来了4人，求总人数。", "7组每组有5名男生和4名女生，求总人数。"], correct: 0, explain: "4 没有参加乘法，表示 7 组之外另外的 4 人。", hint: "算式里只有 5 重复了 7 次，4 只出现一次。", wrongHints: ["", "每组都有5人和4人，应列成7×(5＋4)。"], steps: ["乘法小队：7组每组5人", "另外4人不在每组中", "求总数：7×5＋4"] }
      ],
      3: [
        { question: "这个故事应该怎样列式？", story: "一根绳子长 <strong>90 米</strong>，第一次用去 <strong>28 米</strong>，第二次用去 <strong>32 米</strong>。还剩多少米？", options: ["90 － (28 ＋ 32)", "90 － 28 ＋ 32"], correct: 0, explain: "两次用去的都要从 90 米里减掉，可以先求一共用去多少。", hint: "把两次用去的长度看成一个整体。", steps: ["两次用去：28米和32米", "一共用去：28＋32", "求剩下：90－(28＋32)"] },
        { question: "这个故事应该怎样列式？", story: "合唱队原有 <strong>24 人</strong>，又来了 <strong>12 人</strong>，现在平均站成 <strong>4 排</strong>。每排几人？", options: ["(24 ＋ 12) ÷ 4", "24 ＋ 12 ÷ 4"], correct: 0, explain: "参加平均分的是合起来的所有人，所以要先算 24＋12。", hint: "先确定一共有多少人，再平均排队。", steps: ["先求总人数：24＋12", "所有人参加平均分", "每排人数：(24＋12)÷4"] },
        { question: "这个故事应该怎样列式？", story: "每张桌子坐 <strong>4 人</strong>，<strong>7 张</strong>桌子坐满后还有 <strong>3 人</strong>。一共有多少人？", options: ["4 × 7 ＋ 3", "4 × (7 ＋ 3)"], correct: 0, explain: "7 张桌子坐 4 × 7 人，另外还有 3 人，只需要加一次。", hint: "3 人不在那 7 张桌子的每一张上。", steps: ["桌边人数：7张每张4人", "坐桌人数：4×7", "加另外3人：4×7＋3"] },
        { question: "哪个故事和这个算式意思一样？", scenario: "(20 ＋ 16) ÷ 4", options: ["把20个红球和16个蓝球合起来，平均装4盒，求每盒几个。", "20个红球不动，把16个蓝球平均装4盒，求一共有几个。"], correct: 0, explain: "括号表示两种球先合起来，然后全部平均装进 4 盒。", hint: "除以 4 的是括号里的整个总数。", wrongHints: ["", "这个故事应列成20＋16÷4，20没有参加平均分。"], steps: ["合并两种球：20＋16", "括号表示全部都要分", "平均装4盒：(20＋16)÷4"] }
      ]
    }
  },
  transfer: {
    title: "两道题的想法一样吗？",
    label: "变式发现任务",
    levels: {
      1: [
        { compare: ["6 ＋ 6 ＋ 6", "3 × 6"], options: ["一样：都是3个6", "不一样：一个加一个乘"], correct: 0, explain: "3 个相同的 6 连加，可以写成 3 × 6，意思相同。", hint: "数一数第一道题里一共有几个 6。" },
        { compare: ["4 × 5", "5 × 4"], options: ["结果一样，表示方法不同", "结果不一样"], correct: 0, explain: "两题结果都是 20；一题是 4 个 5，另一题是 5 个 4。", hint: "分别用乘法口诀算一算。" },
        { compare: ["24 ÷ 4", "24 － 4"], options: ["不一样：平均分和拿走不同", "一样：都是去掉4"], correct: 0, explain: "除法是把 24 平均分成 4 份；减法只是从 24 中拿走 4。", hint: "一个是平均分，一个是总数变少。" }
      ],
      2: [
        { compare: ["38 ＋ 20 ＋ 2", "38 ＋ 22"], options: ["一样：把22拆成20和2", "不一样：数的个数不同"], correct: 0, explain: "22 可以拆成 20 和 2，所以两道题的结果相同。", hint: "把右边的 22 拆一拆。" },
        { compare: ["65 － 30 ＋ 1", "65 － 29"], options: ["一样：多减1再加回1", "不一样：一个有加法"], correct: 0, explain: "29 接近 30；先减 30 会多减 1，因此加回 1，结果相同。", hint: "比较 29 和 30，相差多少？" },
        { compare: ["5 × 6 ＋ 4", "5 × (6 ＋ 4)"], options: ["不一样：4是否重复5次", "一样：都有5、6、4"], correct: 0, explain: "第一题只加一个 4；第二题括号里的 4 也要重复 5 次。", hint: "问一问：两道题中的 4 各出现了几次？" }
      ],
      3: [
        { compare: ["8 × 4 － 4", "7 × 4"], options: ["一样：8个4拿走1个4", "不一样：一个有减法"], correct: 0, explain: "8 个 4 减去 1 个 4，正好还剩 7 个 4，所以结果相同。", hint: "把减去的 4 看成减去 1 个 4。" },
        { compare: ["72 ÷ 8", "72 ÷ 9"], options: ["除数越大，每份越少", "除数越大，每份越多"], correct: 0, explain: "同样的 72 平均分，分成的份数越多，每一份就越少。", hint: "想象把同一盒糖分给 8 人和 9 人。" },
        { compare: ["46 ＋ 19", "46 ＋ 20 － 1"], options: ["一样：先凑整再调整", "不一样：第二题多减了1"], correct: 0, explain: "把 19 看成 20－1，先加整十数再减 1，两题结果相同。", hint: "19 可以写成哪两个数的差？" }
      ]
    }
  }
};

const gradeContent = {
  2: {
    questions: secondGradeQuestionSets,
    welcomeEyebrow: "二年级 · 今日探险任务",
    welcomeDescription: "先找数量之间的关系，再选择更聪明的算法。",
    thought: "你发现规律了吗？",
    levelNames: ["热身", "熟练", "思考"],
    ruleLabel: "二年级思维小口诀",
    rule: "先看数量关系，再选加减乘除；能凑整时，计算会更轻松。"
  },
  3: {
    questions: questionSets,
    welcomeEyebrow: "三年级 · 今日探险任务",
    welcomeDescription: "别急着算答案，先找出藏在算式里的“小队”。",
    thought: "先算哪一块？",
    levelNames: ["基础", "混合", "挑战"],
    ruleLabel: "三年级运算小口诀",
    rule: "有括号先算括号；没有括号，先乘除、后加减；同一级，从左往右。"
  }
};

const missionContent = {
  2: {
    order: ["找规律", "观察数与形怎样变化", "观察"],
    calculate: ["聪明计算", "拆分、凑整再计算", "方法"],
    story: ["情景推理", "找数量关系再列式", "理解"],
    transfer: ["变式发现", "比较相同与不同", "进阶"]
  },
  3: {
    order: ["找第一步", "圈出最先计算的部分", "入门"],
    calculate: ["一步步算", "先找顺序，再算结果", "熟练"],
    story: ["情景翻译", "算式和故事双向理解", "理解"],
    transfer: ["变式挑战", "找出变化与不变", "进阶"]
  }
};

const savedGrade = Number(localStorage.getItem("mathPlanetGrade"));

const state = {
  grade: savedGrade === 3 ? 3 : 2,
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
  streak: Number(localStorage.getItem("mathPlanetStreak")) || 0
};

const elements = {
  gradeControl: document.querySelector(".grade-control"),
  missionGrid: document.querySelector("#missionGrid"),
  welcomeEyebrow: document.querySelector("#welcomeEyebrow"),
  welcomeDescription: document.querySelector("#welcomeDescription"),
  thoughtBubble: document.querySelector("#thoughtBubble"),
  missionNote: document.querySelector("#missionNote"),
  levelControl: document.querySelector(".level-control"),
  ruleLabel: document.querySelector("#ruleLabel"),
  ruleText: document.querySelector("#ruleText"),
  modeLabel: document.querySelector("#modeLabel"),
  practiceTitle: document.querySelector("#practiceTitle"),
  promptArea: document.querySelector("#promptArea"),
  translationLens: document.querySelector("#translationLens"),
  solutionProcess: document.querySelector("#solutionProcess"),
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

function activeQuestionSets() {
  return gradeContent[state.grade].questions;
}

function currentQuestion() {
  return getQuestions()[state.index];
}

function startRound() {
  state.roundQuestions = shuffle(activeQuestionSets()[state.mode].levels[state.level]);
  state.index = 0;
  state.roundStartStars = state.stars;
  state.firstTryCorrect = 0;
}

function renderQuestion() {
  const group = activeQuestionSets()[state.mode];
  const questions = getQuestions();
  const question = currentQuestion();
  state.answered = false;
  state.attempts = 0;
  state.usedHint = false;

  elements.modeLabel.textContent = group.label;
  elements.practiceTitle.textContent = question.question || group.title;
  elements.questionNumber.textContent = `第 ${state.index + 1} / ${questions.length} 题`;
  elements.progressFill.style.width = `${((state.index + 1) / questions.length) * 100}%`;
  elements.feedback.className = "feedback";
  elements.feedbackTitle.textContent = "";
  elements.feedbackText.textContent = "";
  elements.solutionProcess.hidden = true;
  elements.solutionProcess.open = false;
  elements.solutionProcess.replaceChildren();
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
    renderSolutionProcess(question, state.attempts === 0);
    if (state.mode === "story") revealTranslationSteps(question, 3);
    elements.nextButton.disabled = false;
    if (state.index === getQuestions().length - 1) {
      elements.nextButtonLabel.textContent = "完成本轮";
    }
    elements.hintButton.disabled = true;
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
      : state.attempts >= 2
        ? question.hint
        : state.grade === 2
          ? "先别急着算，看看数字之间的规律和数量关系。"
          : "先别急着计算答案，看看运算符和括号。";
    showFeedback("try-again", "没关系，再观察一次", retryText);
    if (state.mode === "story") revealTranslationSteps(question, Math.min(state.attempts, 2));
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

function appendTextElement(parent, tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function normalizeMathExpression(text) {
  return String(text)
    .replace(/[＋+]/g, "+")
    .replace(/[－−]/g, "-")
    .replace(/[×*]/g, "*")
    .replace(/[÷/]/g, "/")
    .replace(/\s+/g, "");
}

function parseMathExpression(text) {
  const source = normalizeMathExpression(text);
  const tokens = source.match(/\d+|[()+\-*/]/g);
  if (!tokens || tokens.join("") !== source) return null;
  let position = 0;

  function primary() {
    const token = tokens[position];
    if (/^\d+$/.test(token || "")) {
      position += 1;
      return { value: Number(token) };
    }
    if (token === "(") {
      position += 1;
      const node = addition();
      if (tokens[position] !== ")") throw new Error("括号不完整");
      position += 1;
      return node;
    }
    throw new Error("算式不完整");
  }

  function multiplication() {
    let node = primary();
    while (tokens[position] === "*" || tokens[position] === "/") {
      const operator = tokens[position];
      position += 1;
      node = { operator, left: node, right: primary() };
    }
    return node;
  }

  function addition() {
    let node = multiplication();
    while (tokens[position] === "+" || tokens[position] === "-") {
      const operator = tokens[position];
      position += 1;
      node = { operator, left: node, right: multiplication() };
    }
    return node;
  }

  try {
    const tree = addition();
    return position === tokens.length ? tree : null;
  } catch (_) {
    return null;
  }
}

function formatMathNumber(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function calculateTree(node, steps) {
  if (Object.prototype.hasOwnProperty.call(node, "value")) return node.value;
  const left = calculateTree(node.left, steps);
  const right = calculateTree(node.right, steps);
  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
  };
  const symbols = { "+": "＋", "-": "－", "*": "×", "/": "÷" };
  const result = operations[node.operator](left, right);
  steps.push({
    left,
    right,
    operator: node.operator,
    result,
    text: `${formatMathNumber(left)} ${symbols[node.operator]} ${formatMathNumber(right)} ＝ ${formatMathNumber(result)}`
  });
  return result;
}

function expressionOperations(expression) {
  const tree = parseMathExpression(expression);
  if (!tree) return [];
  const steps = [];
  calculateTree(tree, steps);
  return steps;
}

function expressionSolution(expression) {
  return expressionOperations(expression).map((step) => step.text);
}

function splitExplanation(text) {
  return text.split(/[，；。]/).map((part) => part.trim()).filter(Boolean).slice(0, 4);
}

function solutionExpressions(question) {
  if (question.compare) return question.compare;
  if (question.scenario) return [question.scenario];
  if (question.story) {
    const correctOption = question.options[question.correct];
    return parseMathExpression(correctOption) ? [correctOption] : [];
  }
  return parseMathExpression(question.prompt) ? [question.prompt] : [];
}

function operationFromText(text) {
  const match = String(text).match(/(-?\d+(?:\.\d+)?)\s*([＋+－−×*÷/])\s*(-?\d+(?:\.\d+)?)\s*[＝=]\s*(-?\d+(?:\.\d+)?)/);
  if (!match) return null;
  const operatorMap = { "＋": "+", "+": "+", "－": "-", "−": "-", "×": "*", "*": "*", "÷": "/", "/": "/" };
  return { left: Number(match[1]), operator: operatorMap[match[2]], right: Number(match[3]), result: Number(match[4]), text };
}

function appendBarSegment(bar, value, className = "") {
  const segment = appendTextElement(bar, "span", `bar-segment${className ? ` ${className}` : ""}`, formatMathNumber(value));
  segment.style.flexGrow = String(Math.max(Math.abs(value), 1));
  return segment;
}

function renderOperationModel(parent, operation) {
  if (!operation) return;
  const model = appendTextElement(parent, "div", "math-model", "");
  const { left, right, result } = operation;

  if (operation.operator === "+") {
    appendTextElement(model, "p", "model-caption", `${formatMathNumber(left)} 和 ${formatMathNumber(right)} 拼起来`);
    const bar = appendTextElement(model, "div", "bar-model", "");
    appendBarSegment(bar, left);
    appendBarSegment(bar, right, "secondary");
    appendTextElement(model, "div", "bar-total", `合起来是 ${formatMathNumber(result)}`);
    return;
  }

  if (operation.operator === "-") {
    appendTextElement(model, "p", "model-caption", `${formatMathNumber(left)} 分成“剩下”和“去掉”`);
    const bar = appendTextElement(model, "div", "bar-model", "");
    appendBarSegment(bar, Math.max(result, 0), "secondary");
    appendBarSegment(bar, right, "removed").setAttribute("aria-label", `去掉 ${formatMathNumber(right)}`);
    appendTextElement(model, "div", "bar-total", `剩下 ${formatMathNumber(result)}`);
    return;
  }

  const isDivision = operation.operator === "/";
  const groupCount = isDivision ? right : (right <= 10 ? right : left);
  const groupValue = isDivision ? result : (right <= 10 ? left : right);
  const visibleCount = Math.min(Math.max(Math.round(groupCount), 1), 8);
  const caption = isDivision
    ? `${formatMathNumber(left)} 平均分成 ${formatMathNumber(right)} 份，每份 ${formatMathNumber(result)}`
    : `${formatMathNumber(groupCount)} 组，每组 ${formatMathNumber(groupValue)}`;
  appendTextElement(model, "p", "model-caption", caption);
  const groups = appendTextElement(model, "div", "group-model", "");
  for (let index = 0; index < visibleCount; index += 1) {
    appendTextElement(groups, "span", "group-block", formatMathNumber(groupValue));
  }
  if (groupCount > visibleCount) appendTextElement(groups, "span", "group-more", `… 共 ${formatMathNumber(groupCount)} 份`);
  appendTextElement(model, "div", "bar-total", isDivision ? `每份是 ${formatMathNumber(result)}` : `一共是 ${formatMathNumber(result)}`);
}

function renderSequenceModel(parent, question) {
  if (!question.prompt?.includes("，")) return;
  const tokens = question.prompt.split("，").map((token) => token.trim());
  const row = appendTextElement(parent, "div", "sequence-model", "");
  tokens.forEach((token, index) => {
    appendTextElement(row, "span", `sequence-number${token.includes("？") ? " unknown" : ""}`, token);
    if (index >= tokens.length - 1) return;
    const current = Number(token);
    const next = Number(tokens[index + 1]);
    let change = "继续";
    if (Number.isFinite(current) && Number.isFinite(next)) {
      if (/乘\s*2/.test(question.explain) && next === current * 2) change = "×2";
      else change = next >= current ? `＋${next - current}` : `－${current - next}`;
    } else {
      const previous = Number(tokens[index - 1]);
      if (Number.isFinite(previous) && Number.isFinite(current)) {
        if (/乘\s*2.*减\s*1/.test(question.explain)) change = "－1";
        else change = current >= previous ? `再＋${current - previous}` : `再－${previous - current}`;
      }
    }
    appendTextElement(row, "span", "sequence-change", change);
  });
}

function renderSymbolModel(parent, question) {
  if (!/[△○□]/.test(question.prompt || "")) return;
  const model = appendTextElement(parent, "div", "symbol-model", "");
  appendTextElement(model, "span", "symbol-card", question.prompt);
  appendTextElement(model, "span", "symbol-arrow", "→").setAttribute("aria-hidden", "true");
  appendTextElement(model, "span", "symbol-card answer", question.options[question.correct]);
}

function createSolutionColumn(parent, title, expression, question) {
  const column = appendTextElement(parent, "div", "solution-column", "");
  if (title) appendTextElement(column, "p", "solution-column-title", title);
  appendTextElement(column, "div", "solution-equation", expression);

  const calculatedOperations = expressionOperations(expression);
  const calculatedSteps = question.solution || calculatedOperations.map((step) => step.text);
  const explanationEquations = splitExplanation(question.explain).filter((step) => step.includes("＝"));
  const steps = !question.solution && explanationEquations.length >= calculatedSteps.length
    ? explanationEquations
    : calculatedSteps;
  const usesCalculatedOperations = steps === calculatedSteps && !question.solution;
  const list = appendTextElement(column, "ol", "solution-steps", "");
  steps.forEach((step, index) => {
    const item = appendTextElement(list, "li", "solution-step", "");
    appendTextElement(item, "span", "solution-step-number", String(index + 1));
    const body = appendTextElement(item, "div", "solution-step-body", "");
    appendTextElement(body, "span", "solution-step-text", step);
    renderOperationModel(body, operationFromText(step) || (usesCalculatedOperations ? calculatedOperations[index] : null));
  });
}

function renderSolutionProcess(question, collapsed = true) {
  const container = elements.solutionProcess;
  container.replaceChildren();
  container.hidden = false;
  container.open = !collapsed;
  const heading = appendTextElement(container, "summary", "solution-heading", "");
  appendTextElement(heading, "span", "", "✓");
  appendTextElement(heading, "h3", "", "一步一步这样解");
  const content = appendTextElement(container, "div", "solution-content", "");

  const expressions = solutionExpressions(question);
  if (expressions.length) {
    const columns = appendTextElement(content, "div", expressions.length > 1 ? "solution-columns" : "", "");
    expressions.forEach((expression, index) => {
      const title = expressions.length > 1 ? (index === 0 ? "左边算式" : "右边算式") : (question.story ? "先列出算式" : "原算式");
      createSolutionColumn(columns, title, expression, question);
    });
  } else {
    renderSequenceModel(content, question);
    renderSymbolModel(content, question);
    const list = appendTextElement(content, "ol", "solution-steps", "");
    const steps = question.solution || splitExplanation(question.explain);
    steps.forEach((step, index) => {
      const item = appendTextElement(list, "li", "solution-step", "");
      appendTextElement(item, "span", "solution-step-number", String(index + 1));
      const body = appendTextElement(item, "div", "solution-step-body", "");
      appendTextElement(body, "span", "solution-step-text", step);
    });
  }
  appendTextElement(content, "p", "solution-conclusion", `所以：${question.explain}`);
}

function showHint() {
  if (state.answered) return;
  const question = currentQuestion();
  state.usedHint = true;
  showFeedback("hint", "提示卡", question.hint);
  if (state.mode === "story") revealTranslationSteps(question, 2);
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
  elements.solutionProcess.hidden = true;
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

function updateGradeContent() {
  const content = gradeContent[state.grade];
  elements.welcomeEyebrow.textContent = content.welcomeEyebrow;
  elements.welcomeDescription.textContent = content.welcomeDescription;
  elements.thoughtBubble.textContent = content.thought;
  elements.missionNote.textContent = `${state.grade === 2 ? "二" : "三"}年级 · 每题都要说出“为什么”`;
  elements.ruleLabel.textContent = content.ruleLabel;
  elements.ruleText.textContent = content.rule;
  elements.levelControl.setAttribute("aria-label", `${state.grade === 2 ? "二" : "三"}年级题目难度`);

  document.querySelectorAll(".grade-button").forEach((button) => {
    const active = Number(button.dataset.grade) === state.grade;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  document.querySelectorAll(".level-button").forEach((button, index) => {
    button.textContent = content.levelNames[index];
  });

  document.querySelectorAll(".mission-card").forEach((card) => {
    const [title, description, badge] = missionContent[state.grade][card.dataset.mode];
    card.querySelector(".mission-copy strong").textContent = title;
    card.querySelector(".mission-copy small").textContent = description;
    card.querySelector(".mission-badge").textContent = badge;
  });
}

function switchGrade(grade) {
  const nextGrade = Number(grade);
  if (!gradeContent[nextGrade] || nextGrade === state.grade) return;
  state.grade = nextGrade;
  state.level = 1;
  localStorage.setItem("mathPlanetGrade", String(state.grade));
  updateGradeContent();
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

elements.missionGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".mission-card");
  if (card) switchMode(card.dataset.mode);
});

elements.gradeControl.addEventListener("click", (event) => {
  const button = event.target.closest(".grade-button");
  if (button) switchGrade(button.dataset.grade);
});

document.querySelectorAll(".level-button").forEach((button) => {
  button.addEventListener("click", () => switchLevel(button.dataset.level));
});

elements.hintButton.addEventListener("click", showHint);
elements.nextButton.addEventListener("click", nextQuestion);
updateGradeContent();
saveProgress();
startRound();
renderQuestion();
