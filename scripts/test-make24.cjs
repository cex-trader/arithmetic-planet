const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const nodes = new Map();
function element(selector) {
  if (!nodes.has(selector)) nodes.set(selector, {
    textContent: '', hidden: true, disabled: true, attributes: {}, listeners: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, callback) { this.listeners[name] = callback; },
    replaceChildren() {}, appendChild() {}, querySelector() { return element('expression'); },
    scrollIntoView() {}, focus() {}
  });
  return nodes.get(selector);
}
const context = vm.createContext({
  localStorage: { getItem: () => null },
  document: { querySelector: element, createDocumentFragment: () => element('fragment'), createElement: () => element('item') },
  window: { requestAnimationFrame: (callback) => callback(), setTimeout() {}, matchMedia: () => ({ matches: true }) }
});
vm.runInContext(fs.readFileSync(require.resolve('../make24.js'), 'utf8'), context);
const run = (source) => vm.runInContext(source, context);

// Independently parse the actual displayed text using ordinary arithmetic precedence.
function evaluateAnswer(answer, cards) {
  const [expression, target] = answer.split('＝');
  assert.equal(Number(target), 24);
  const tokens = expression.match(/\d+|[＋－×÷()]/g);
  assert.deepEqual(tokens.filter(token => /^\d+$/.test(token)).map(Number).sort((a, b) => a - b), cards);
  let index = 0;
  function primary() {
    const token = tokens[index++];
    if (token !== '(') { assert.match(token, /^\d+$/); return Number(token); }
    const value = sum();
    assert.equal(tokens[index++], ')');
    return value;
  }
  function combine(left, op, right) {
    if (op === '÷') assert.notEqual(right, 0, answer);
    const value = op === '＋' ? left + right : op === '－' ? left - right : op === '×' ? left * right : left / right;
    assert(value >= -1e-9 && Number.isFinite(value), `Negative or invalid intermediate: ${answer}`);
    return value;
  }
  function product() {
    let value = primary();
    while (tokens[index] === '×' || tokens[index] === '÷') {
      const op = tokens[index++];
      value = combine(value, op, primary());
    }
    return value;
  }
  function sum() {
    let value = product();
    while (tokens[index] === '＋' || tokens[index] === '－') {
      const op = tokens[index++];
      value = combine(value, op, product());
    }
    return value;
  }
  assert(Math.abs(sum() - 24) < 1e-9, answer);
  assert.equal(index, tokens.length);
}

// Numeric reference solver, independent of the application's expression trees and fractions.
function referenceSolvable(values) {
  if (values.length === 1) return Math.abs(values[0] - 24) < 1e-9;
  for (let i = 0; i < values.length; i++) for (let j = i + 1; j < values.length; j++) {
    const a = values[i], b = values[j];
    const rest = values.filter((_, k) => k !== i && k !== j);
    const candidates = [a + b, a * b, Math.abs(a - b)];
    if (b > 1e-9) candidates.push(a / b);
    if (a > 1e-9) candidates.push(b / a);
    if (candidates.some(value => referenceSolvable([...rest, value]))) return true;
  }
  return false;
}

let combinations = 0, totalAnswers = 0, solvable = 0;
for (let a = 1; a <= 10; a++) for (let b = a; b <= 10; b++)
  for (let c = b; c <= 10; c++) for (let d = c; d <= 10; d++) {
    const cards = [a, b, c, d];
    const answers = run(`solveCards(${JSON.stringify(cards)})`);
    const expected = referenceSolvable(cards);
    assert.equal(answers.length > 0, expected, `Answers: ${cards}`);
    assert.equal(run(`hasSolution(${JSON.stringify(cards)})`), expected, `Bank: ${cards}`);
    assert.equal(new Set(answers).size, answers.length);
    for (const answer of answers) evaluateAnswer(answer, cards);
    combinations++;
    totalAnswers += answers.length;
    if (expected) solvable++;
  }
assert(run('solveCards([3,3,8,8]).length') > 0, 'Fractional intermediate solution retained');
assert.equal(run('possibleMerges(leaf(1), leaf(5)).some(node => node.value.numerator < 0)'), false);

run('initialize()');
assert.equal(run('state.bank.length'), solvable);
const next = element('#nextPuzzleButton');
const reveal = element('#revealButton');
assert.equal(next.disabled, true);
assert.equal(reveal.disabled, false);
const firstKey = run('state.lastKey');
next.listeners.click();
assert.equal(run('state.challenge'), 1, 'Cannot skip the answer through the handler');
reveal.listeners.click();
assert.equal(element('#solutions').hidden, false);
assert.equal(next.disabled, false);
reveal.listeners.click();
assert.equal(element('#solutions').hidden, true);
assert.equal(next.disabled, false, 'Collapsing answers keeps next question unlocked');
next.listeners.click();
assert.equal(run('state.challenge'), 2);
assert.notEqual(run('state.lastKey'), firstKey);
assert.equal(element('#solutions').hidden, true);
assert.equal(reveal.attributes['aria-expanded'], 'false');
assert.equal(next.disabled, true, 'New question requires its own answer reveal');
console.log(`${combinations} combinations, ${solvable} solvable puzzles, ${totalAnswers} displayed answers: correct results, all cards used once, no negative intermediates; reveal/next flow passed.`);
