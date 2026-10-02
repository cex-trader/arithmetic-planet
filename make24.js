const TARGET = 24;
const MIN_CARD = 1;
const MAX_CARD = 10;

const state = {
  bank: [],
  puzzle: null,
  challenge: 0,
  stars: Number(localStorage.getItem("mathPlanetStars")) || 0,
  lastKey: ""
};

const elements = {
  bankCount: document.querySelector("#bankCount"),
  cards: document.querySelector("#playingCards"),
  label: document.querySelector("#challengeLabel"),
  title: document.querySelector("#challengeTitle"),
  revealButton: document.querySelector("#revealButton"),
  revealLabel: document.querySelector("#revealButton span"),
  nextButton: document.querySelector("#nextPuzzleButton"),
  solutions: document.querySelector("#solutions"),
  solutionCount: document.querySelector("#solutionCount"),
  solutionList: document.querySelector("#solutionList"),
  starCount: document.querySelector("#starCount"),
  announcement: document.querySelector("#gameAnnouncement"),
  game: document.querySelector(".make24-game")
};

function gcd(a, b) {
  let left = Math.abs(a);
  let right = Math.abs(b);
  while (right) [left, right] = [right, left % right];
  return left || 1;
}

function fraction(numerator, denominator = 1) {
  if (denominator < 0) return fraction(-numerator, -denominator);
  const divisor = gcd(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor };
}

function addValue(a, b) {
  return fraction(a.numerator * b.denominator + b.numerator * a.denominator, a.denominator * b.denominator);
}

function subtractValue(a, b) {
  return fraction(a.numerator * b.denominator - b.numerator * a.denominator, a.denominator * b.denominator);
}

function multiplyValue(a, b) {
  return fraction(a.numerator * b.numerator, a.denominator * b.denominator);
}

function divideValue(a, b) {
  return fraction(a.numerator * b.denominator, a.denominator * b.numerator);
}

function leaf(number) {
  return { op: "number", number, value: fraction(number), key: String(number) };
}

function operation(op, left, right) {
  let children = [left, right];
  if (op === "+" || op === "*") {
    children = children.flatMap((child) => child.op === op ? child.children : [child]);
    children.sort((a, b) => a.key.localeCompare(b.key, "en", { numeric: true }));
  }

  let value;
  if (op === "+") value = children.reduce((total, child) => addValue(total, child.value), fraction(0));
  else if (op === "*") value = children.reduce((total, child) => multiplyValue(total, child.value), fraction(1));
  else if (op === "-") value = subtractValue(left.value, right.value);
  else value = divideValue(left.value, right.value);

  const key = `${op}(${children.map((child) => child.key).join(",")})`;
  return { op, children, value, key };
}

function precedence(node) {
  if (node.op === "number") return 3;
  return node.op === "+" || node.op === "-" ? 1 : 2;
}

function formatExpression(node, parentOp = "", position = 0) {
  if (node.op === "number") return String(node.number);
  const symbols = { "+": " ＋ ", "-": " － ", "*": " × ", "/": " ÷ " };
  let text = node.children.map((child, index) => formatExpression(child, node.op, index)).join(symbols[node.op]);
  const childPrecedence = precedence(node);
  const parentPrecedence = parentOp === "+" || parentOp === "-" ? 1 : parentOp ? 2 : 0;
  const needsParentheses = parentOp && (
    childPrecedence < parentPrecedence
    || (position > 0 && (parentOp === "-" || parentOp === "/") && childPrecedence === parentPrecedence)
  );
  if (needsParentheses) text = `(${text})`;
  return text;
}

function solutionSignature(node) {
  if (node.op === "number") return `N${node.number}`;

  if (node.op === "+" || node.op === "-") {
    const terms = [];
    function collectTerms(current, sign) {
      if (current.op === "+") current.children.forEach((child) => collectTerms(child, sign));
      else if (current.op === "-") {
        collectTerms(current.children[0], sign);
        collectTerms(current.children[1], -sign);
      } else terms.push(`${sign > 0 ? "+" : "-"}${solutionSignature(current)}`);
    }
    collectTerms(node, 1);
    return `A(${terms.sort().join(",")})`;
  }

  const factors = [];
  function collectFactors(current, inverted) {
    if (current.op === "*") current.children.forEach((child) => collectFactors(child, inverted));
    else if (current.op === "/") {
      collectFactors(current.children[0], inverted);
      collectFactors(current.children[1], !inverted);
    } else factors.push(`${inverted ? "/" : "*"}${solutionSignature(current)}`);
  }
  collectFactors(node, false);
  return `M(${factors.sort().join(",")})`;
}

function possibleMerges(left, right) {
  const results = [operation("+", left, right), operation("*", left, right)];
  results.push(operation("-", left, right), operation("-", right, left));
  if (right.value.numerator !== 0) results.push(operation("/", left, right));
  if (left.value.numerator !== 0) results.push(operation("/", right, left));
  const unique = new Map();
  results.forEach((result) => unique.set(result.key, result));
  return [...unique.values()];
}

function solveCards(numbers) {
  const answers = new Map();
  const visited = new Set();

  function search(nodes) {
    const stateKey = nodes.map((node) => node.key).sort().join("|");
    if (visited.has(stateKey)) return;
    visited.add(stateKey);

    if (nodes.length === 1) {
      const [node] = nodes;
      if (node.value.numerator === TARGET * node.value.denominator) {
        answers.set(solutionSignature(node), `${formatExpression(node)} ＝ ${TARGET}`);
      }
      return;
    }

    for (let first = 0; first < nodes.length - 1; first += 1) {
      for (let second = first + 1; second < nodes.length; second += 1) {
        const rest = nodes.filter((_, index) => index !== first && index !== second);
        for (const merged of possibleMerges(nodes[first], nodes[second])) search([...rest, merged]);
      }
    }
  }

  search(numbers.map(leaf));
  return [...answers.values()].sort((a, b) => a.length - b.length || a.localeCompare(b, "zh-CN", { numeric: true }));
}

function hasSolution(numbers) {
  const visited = new Set();

  function search(nodes) {
    const stateKey = nodes
      .map((node) => `${node.value.numerator}/${node.value.denominator}`)
      .sort()
      .join("|");
    if (visited.has(stateKey)) return false;
    visited.add(stateKey);
    if (nodes.length === 1) return nodes[0].value.numerator === TARGET * nodes[0].value.denominator;

    for (let first = 0; first < nodes.length - 1; first += 1) {
      for (let second = first + 1; second < nodes.length; second += 1) {
        const rest = nodes.filter((_, index) => index !== first && index !== second);
        for (const merged of possibleMerges(nodes[first], nodes[second])) {
          if (search([...rest, merged])) return true;
        }
      }
    }
    return false;
  }

  return search(numbers.map(leaf));
}

function buildQuestionBank() {
  const bank = [];
  for (let a = MIN_CARD; a <= MAX_CARD; a += 1) {
    for (let b = a; b <= MAX_CARD; b += 1) {
      for (let c = b; c <= MAX_CARD; c += 1) {
        for (let d = c; d <= MAX_CARD; d += 1) {
          const cards = [a, b, c, d];
          if (hasSolution(cards)) bank.push({ cards, key: cards.join("-") });
        }
      }
    }
  }
  return bank;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

function announce(message) {
  elements.announcement.textContent = "";
  window.requestAnimationFrame(() => { elements.announcement.textContent = message; });
}

function renderCards(cards) {
  const fragment = document.createDocumentFragment();
  shuffle(cards).forEach((number, index) => {
    const card = document.createElement("div");
    card.className = `number-card card-color-${index + 1}`;
    card.innerHTML = `<span class="card-corner" aria-hidden="true">${number}</span><strong>${number}</strong><span class="card-dot" aria-hidden="true"></span>`;
    card.setAttribute("aria-label", `数字牌 ${number}`);
    fragment.appendChild(card);
  });
  elements.cards.replaceChildren(fragment);
}

function renderSolutions(solutions) {
  const fragment = document.createDocumentFragment();
  solutions.forEach((solution, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<span class="solution-number">${index + 1}</span><span class="solution-expression"></span>`;
    item.querySelector(".solution-expression").textContent = solution;
    fragment.appendChild(item);
  });
  elements.solutionCount.textContent = String(solutions.length);
  elements.solutionList.replaceChildren(fragment);
}

function hideSolutions() {
  elements.solutions.hidden = true;
  elements.revealButton.setAttribute("aria-expanded", "false");
  elements.revealLabel.textContent = "查看全部答案";
}

function newPuzzle() {
  let next;
  do next = state.bank[Math.floor(Math.random() * state.bank.length)];
  while (state.bank.length > 1 && next.key === state.lastKey);
  state.puzzle = { ...next, solutions: solveCards(next.cards) };
  state.lastKey = next.key;
  state.challenge += 1;
  elements.label.textContent = `第 ${state.challenge} 次挑战`;
  renderCards(next.cards);
  renderSolutions(state.puzzle.solutions);
  hideSolutions();
  announce(`新题目：数字 ${next.cards.join("、")}，请算出24`);
}

function revealSolutions() {
  const willShow = elements.solutions.hidden;
  elements.solutions.hidden = !willShow;
  elements.revealButton.setAttribute("aria-expanded", String(willShow));
  elements.revealLabel.textContent = willShow ? "收起全部答案" : "查看全部答案";
  if (willShow) {
    announce(`已显示全部 ${state.puzzle.solutions.length} 种解法`);
    elements.solutions.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  } else {
    announce("已收起答案");
  }
}

function initialize() {
  elements.starCount.textContent = String(state.stars);
  state.bank = buildQuestionBank();
  elements.bankCount.textContent = `${state.bank.length} 组题`;
  elements.game.setAttribute("aria-busy", "false");
  elements.revealButton.disabled = false;
  elements.nextButton.disabled = false;
  newPuzzle();
}

elements.revealButton.addEventListener("click", revealSolutions);
elements.nextButton.addEventListener("click", () => {
  newPuzzle();
  elements.title.focus({ preventScroll: true });
});

window.requestAnimationFrame(() => window.setTimeout(initialize, 0));
