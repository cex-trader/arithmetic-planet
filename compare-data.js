/* 自编题：所有时间均为用时长短，距离均从同一地点出发，不涉及时刻或方向。 */
(function (root) {
  'use strict';
  const stages = [
    { title: '一句话，找关系', note: '先说谁大谁小，再决定加减。', skill: '求的量比已知量大，就加；比已知量小，就减。' },
    { title: '两步，接住中间量', note: '先用小数练方法，不急着算。', skill: '第二句和谁比，第二步就接着谁的量算。' },
    { title: '方法不变，仔细计算', note: '遇到进位、退位，拿纸列竖式。', skill: '先列对两步算式，再分别计算；个位对个位。' },
    { title: '换个说法，也能懂', note: '出现“多”不一定用加法。', skill: '先把话改说成“要求的量比已知量大／小”。' },
    { title: '自己走完六步', note: '收起提示，自己列式，再检查。', skill: '找所求 → 找比较对象 → 判大小 → 求中间量 → 求结果 → 代回检查。' }
  ];
  const contexts = [
    { name: '楼高', names: ['A楼', 'B楼', 'C楼'], unit: '米', intro: n => `A楼高${n}米。`, sentence: (a,b,plus,n) => `${a}比${b}${plus ? '高' : '矮'}${n}米。`, ask: a => `${a}高多少米？`, quantity: '高度' },
    { name: '距离', names: ['小林家', '小雨家', '小乐家'], unit: '米', intro: n => `小林家离学校${n}米。`, sentence: (a,b,plus,n) => `${a}离学校的距离比${b}${plus ? '远' : '近'}${n}米。`, ask: a => `${a}离学校多少米？`, quantity: '离校距离' },
    { name: '用时', names: ['小林', '小雨', '小乐'], unit: '分钟', intro: n => `做同样的手工，小林用了${n}分钟。`, sentence: (a,b,plus,n) => `${a}的用时比${b}${plus ? '多' : '少'}${n}分钟。`, ask: a => `${a}用了多少分钟？`, quantity: '用时' },
    { name: '数量', names: ['小林', '小雨', '小乐'], unit: '张', intro: n => `小林有${n}张卡片。`, sentence: (a,b,plus,n) => `${a}的卡片比${b}${plus ? '多' : '少'}${n}张。`, ask: a => `${a}有多少张卡片？`, quantity: '卡片数' }
  ];
  // 已知量、第一差量、第二差量、第一步方向、第二步方向。
  const sets = [
    [[60,20,0,-1,1],[40,15,0,1,1],[80,30,0,-1,1],[35,12,0,1,1],[72,18,0,-1,1],[46,24,0,1,1]],
    [[60,20,10,-1,1],[40,10,20,1,-1],[50,20,10,1,1],[90,20,30,-1,-1],[80,30,20,-1,1],[30,20,10,1,-1]],
    [[126,48,27,-1,1],[238,56,79,1,-1],[156,67,48,1,1],[302,85,68,-1,-1],[183,57,86,-1,1],[267,85,96,1,-1]],
    [[90,25,18,-1,1],[45,17,23,1,-1],[128,39,47,-1,-1],[76,28,19,1,1],[160,45,28,-1,1],[185,67,39,1,-1]],
    [[145,38,26,-1,1],[268,76,89,1,-1],[58,27,16,1,1],[230,65,78,-1,-1],[320,85,47,-1,1],[186,59,68,1,-1]]
  ];
  const questions = sets.flatMap((rows, stage) => rows.map(([base,d1,d2,s1,s2], i) => {
    const c = contexts[(stage + i) % 4];
    const count = stage === 0 ? 1 : 2;
    const reverse = stage >= 3;
    const values = [base, base+s1*d1, base+s1*d1+s2*d2];
    const steps = [d1,d2].slice(0,count).map((diff,j) => {
      const sign = [s1,s2][j];
      const target = c.names[j+1], ref = c.names[j];
      const flipped = reverse && (j === 0 || i % 2 === 0);
      return { target, ref, diff, sign, known: values[j], answer: values[j+1],
        sentence: flipped ? c.sentence(ref,target,sign < 0,diff) : c.sentence(target,ref,sign > 0,diff) };
    });
    return { id:`${stage}-${i}`, stage, topic:c.name, names:c.names, unit:c.unit, quantity:c.quantity, intro:c.intro(base), base, steps, ask:c.ask(c.names[count]), target:c.names[count] };
  }));
  function checkStep(step, input) {
    if (input.ref !== step.ref) return 'reference';
    if (input.size !== (step.sign > 0 ? '大' : '小')) return 'relation';
    if (input.op !== (step.sign > 0 ? '+' : '-')) return 'operation';
    if (!/^\d+$/.test(String(input.answer).trim())) return 'empty';
    if (Number(input.answer) !== step.answer) return 'calculation';
    return 'correct';
  }
  const api = { stages, questions, checkStep };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CompareTraining = api;
})(typeof window !== 'undefined' ? window : globalThis);
