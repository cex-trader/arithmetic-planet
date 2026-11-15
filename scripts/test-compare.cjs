const assert = require('node:assert/strict');
const { stages, questions, checkStep } = require('../compare-data.js');
assert.equal(stages.length,5);
assert.equal(questions.length,30);
assert.equal(new Set(questions.map(q=>q.id)).size,30);
for (const q of questions) {
  assert.equal(q.steps.length,q.stage===0?1:2);
  let known=q.base;
  for (const [i,s] of q.steps.entries()) {
    assert.equal(s.known,known);
    assert.equal(s.ref,q.names[i]);
    assert.equal(s.target,q.names[i+1]);
    assert.equal(s.answer,known+s.sign*s.diff);
    assert(s.answer>0 && Number.isInteger(s.answer));
    const inverse=s.sentence.startsWith(s.ref);
    const positive=/高|远|多/.test(s.sentence);
    assert.equal(positive,inverse?s.sign<0:s.sign>0,`${q.id}: sentence direction`);
    const input={ref:s.ref,size:s.sign>0?'大':'小',op:s.sign>0?'+':'-',answer:String(s.answer)};
    assert.equal(checkStep(s,input),'correct');
    assert.equal(checkStep(s,{...input,ref:s.target}),'reference');
    assert.equal(checkStep(s,{...input,size:input.size==='大'?'小':'大'}),'relation');
    assert.equal(checkStep(s,{...input,op:input.op==='+'?'-':'+'}),'operation');
    assert.equal(checkStep(s,{...input,answer:String(s.answer+1)}),'calculation');
    assert.equal(checkStep(s,{...input,answer:''}),'empty');
    known=s.answer;
  }
}
for(let i=1;i<5;i++) {
 const combos=new Set(questions.filter(q=>q.stage===i).map(q=>q.steps.map(s=>s.sign).join(',')));
 assert.equal(combos.size,4,'Every two-step stage covers four operation combinations');
}
console.log('30 questions: arithmetic, sentence direction, reference chain and feedback checks passed.');
