const difficultyConfig = {
  teaching: { label: "教学", clues: 51, reward: 3 },
  easy: { label: "容易", clues: 44, reward: 5 },
  medium: { label: "中等", clues: 36, reward: 8 },
  hard: { label: "困难", clues: 30, reward: 12 }
};

const state = {
  level: "teaching",
  puzzle: [],
  solution: [],
  board: [],
  fixed: [],
  hinted: [],
  selected: null,
  hints: 0,
  mistakes: 0,
  complete: false,
  stars: Number(localStorage.getItem("mathPlanetStars")) || 0
};

const elements = {
  board: document.querySelector("#sudokuBoard"),
  numberPad: document.querySelector("#numberPad"),
  filledCount: document.querySelector("#filledCount"),
  hintCount: document.querySelector("#hintCount"),
  starCount: document.querySelector("#starCount"),
  eraseButton: document.querySelector("#eraseButton"),
  hintButton: document.querySelector("#sudokuHintButton"),
  newGameButton: document.querySelector("#newGameButton"),
  announcement: document.querySelector("#gameAnnouncement"),
  dialog: document.querySelector("#completeDialog"),
  completeText: document.querySelector("#completeText"),
  closeDialogButton: document.querySelector("#closeDialogButton"),
  dialogNewGameButton: document.querySelector("#dialogNewGameButton")
};

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pattern(row, column) {
  return (row * 3 + Math.floor(row / 3) + column) % 9;
}

function createSolvedGrid() {
  const groups = shuffle([0, 1, 2]);
  const stacks = shuffle([0, 1, 2]);
  const rows = groups.flatMap((group) => shuffle([0, 1, 2]).map((row) => group * 3 + row));
  const columns = stacks.flatMap((stack) => shuffle([0, 1, 2]).map((column) => stack * 3 + column));
  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  return rows.flatMap((row) => columns.map((column) => numbers[pattern(row, column)]));
}

function candidatesFor(board, index) {
  if (board[index]) return [];
  const row = Math.floor(index / 9);
  const column = index % 9;
  const used = new Set();
  for (let i = 0; i < 9; i += 1) {
    used.add(board[row * 9 + i]);
    used.add(board[i * 9 + column]);
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxColumn = Math.floor(column / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r += 1) {
    for (let c = boxColumn; c < boxColumn + 3; c += 1) used.add(board[r * 9 + c]);
  }
  return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((number) => !used.has(number));
}

function countSolutions(source, limit = 2) {
  const board = [...source];
  let count = 0;

  function solve() {
    if (count >= limit) return;
    let bestIndex = -1;
    let bestCandidates = null;
    for (let index = 0; index < 81; index += 1) {
      if (board[index] !== 0) continue;
      const candidates = candidatesFor(board, index);
      if (candidates.length === 0) return;
      if (!bestCandidates || candidates.length < bestCandidates.length) {
        bestIndex = index;
        bestCandidates = candidates;
        if (candidates.length === 1) break;
      }
    }
    if (bestIndex === -1) {
      count += 1;
      return;
    }
    for (const number of bestCandidates) {
      board[bestIndex] = number;
      solve();
      board[bestIndex] = 0;
      if (count >= limit) return;
    }
  }

  solve();
  return count;
}

function createPuzzle(solution, targetClues) {
  const puzzle = [...solution];
  let clues = 81;
  for (const index of shuffle([...Array(81).keys()])) {
    if (clues <= targetClues) break;
    const value = puzzle[index];
    puzzle[index] = 0;
    if (countSolutions(puzzle) !== 1) puzzle[index] = value;
    else clues -= 1;
  }
  return puzzle;
}

function validSavedGame(saved) {
  return saved
    && difficultyConfig[saved.level]
    && [saved.puzzle, saved.solution, saved.board, saved.hinted].every((list) => Array.isArray(list) && list.length === 81);
}

function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem("sudokuGame"));
    if (!validSavedGame(saved)) return false;
    Object.assign(state, saved, {
      fixed: saved.puzzle.map(Boolean),
      selected: null,
      stars: Number(localStorage.getItem("mathPlanetStars")) || 0
    });
    return true;
  } catch (_) {
    return false;
  }
}

function saveGame() {
  localStorage.setItem("sudokuGame", JSON.stringify({
    level: state.level,
    puzzle: state.puzzle,
    solution: state.solution,
    board: state.board,
    hinted: state.hinted,
    hints: state.hints,
    mistakes: state.mistakes,
    complete: state.complete
  }));
}

function newGame(level = state.level) {
  state.level = level;
  state.solution = createSolvedGrid();
  state.puzzle = createPuzzle(state.solution, difficultyConfig[level].clues);
  state.board = [...state.puzzle];
  state.fixed = state.puzzle.map(Boolean);
  state.hinted = Array(81).fill(false);
  state.selected = state.puzzle.findIndex((value) => value === 0);
  state.hints = 0;
  state.mistakes = 0;
  state.complete = false;
  saveGame();
  updateDifficultyButtons();
  render();
  announce(`已生成一道${difficultyConfig[level].label}数独`);
}

function buildBoard() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 81; index += 1) {
    const row = Math.floor(index / 9);
    const column = index % 9;
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "sudoku-cell";
    cell.dataset.index = String(index);
    cell.setAttribute("role", "gridcell");
    cell.setAttribute("aria-rowindex", String(row + 1));
    cell.setAttribute("aria-colindex", String(column + 1));
    if (column === 2 || column === 5) cell.classList.add("box-right");
    if (row === 2 || row === 5) cell.classList.add("box-bottom");
    if (column === 8) cell.classList.add("last-column");
    if (row === 8) cell.classList.add("last-row");
    cell.addEventListener("click", () => selectCell(index));
    fragment.appendChild(cell);
  }
  elements.board.appendChild(fragment);
}

function buildNumberPad() {
  const fragment = document.createDocumentFragment();
  for (let number = 1; number <= 9; number += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "number-button";
    button.dataset.number = String(number);
    button.innerHTML = `<span>${number}</span><small></small>`;
    button.setAttribute("aria-label", `填写数字 ${number}`);
    button.addEventListener("click", () => placeNumber(number));
    fragment.appendChild(button);
  }
  elements.numberPad.appendChild(fragment);
}

function render() {
  const selectedValue = state.selected === null ? 0 : state.board[state.selected];
  const selectedRow = state.selected === null ? -1 : Math.floor(state.selected / 9);
  const selectedColumn = state.selected === null ? -1 : state.selected % 9;
  const selectedBox = state.selected === null ? -1 : Math.floor(selectedRow / 3) * 3 + Math.floor(selectedColumn / 3);

  [...elements.board.children].forEach((cell, index) => {
    const row = Math.floor(index / 9);
    const column = index % 9;
    const box = Math.floor(row / 3) * 3 + Math.floor(column / 3);
    const value = state.board[index];
    cell.textContent = value || "";
    cell.classList.toggle("fixed", state.fixed[index]);
    cell.classList.toggle("hinted", state.hinted[index]);
    cell.classList.toggle("selected", index === state.selected);
    cell.classList.toggle("related", state.selected !== null && index !== state.selected && (row === selectedRow || column === selectedColumn || box === selectedBox));
    cell.classList.toggle("same-number", Boolean(selectedValue) && value === selectedValue && index !== state.selected);
    cell.setAttribute("aria-selected", String(index === state.selected));
    cell.setAttribute("aria-label", `第 ${row + 1} 行第 ${column + 1} 列，${value ? `数字 ${value}${state.fixed[index] ? "，题目给定" : "，已填写"}` : "空格"}`);
  });

  for (let number = 1; number <= 9; number += 1) {
    const button = elements.numberPad.querySelector(`[data-number="${number}"]`);
    const count = state.board.filter((value) => value === number).length;
    button.disabled = count === 9 || state.complete;
    button.querySelector("small").textContent = `还差${9 - count}`;
  }

  const filled = state.board.filter(Boolean).length;
  elements.filledCount.textContent = `${filled} / 81`;
  elements.hintCount.textContent = String(state.hints);
  elements.starCount.textContent = String(state.stars);
  elements.eraseButton.disabled = state.selected === null || state.fixed[state.selected] || !state.board[state.selected] || state.complete;
  elements.hintButton.disabled = state.complete;
}

function selectCell(index) {
  state.selected = index;
  render();
  announce(elements.board.children[index].getAttribute("aria-label"));
}

function directConflict(index, number) {
  const row = Math.floor(index / 9);
  const column = index % 9;
  for (let i = 0; i < 9; i += 1) {
    if (state.board[row * 9 + i] === number) return "同一行";
    if (state.board[i * 9 + column] === number) return "同一列";
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxColumn = Math.floor(column / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r += 1) {
    for (let c = boxColumn; c < boxColumn + 3; c += 1) {
      if (state.board[r * 9 + c] === number) return "同一个小宫格";
    }
  }
  return "";
}

function placeNumber(number) {
  if (state.selected === null) {
    announce("请先选择棋盘里的一个空格");
    return;
  }
  const index = state.selected;
  if (state.fixed[index] || state.complete) return;
  if (state.board[index] === number) return;
  const conflict = directConflict(index, number);
  if (number !== state.solution[index]) {
    state.mistakes += 1;
    const cell = elements.board.children[index];
    cell.classList.remove("wrong");
    void cell.offsetWidth;
    cell.classList.add("wrong");
    const reason = conflict
      ? `${number} 已经出现在${conflict}里，所以不能填在这里。`
      : `${number} 暂时没有直接重复，但继续推理会走不通。换个数字试试。`;
    announce(reason);
    window.setTimeout(() => cell.classList.remove("wrong"), 320);
    saveGame();
    return;
  }

  state.board[index] = number;
  state.hinted[index] = false;
  saveGame();
  announce(`填写 ${number}，正确`);
  render();
  if (state.board.every(Boolean)) finishGame();
}

function eraseSelected() {
  if (state.selected === null || state.fixed[state.selected] || state.complete) return;
  state.board[state.selected] = 0;
  state.hinted[state.selected] = false;
  saveGame();
  render();
  announce("已擦除当前格");
}

function useHint() {
  if (state.complete) return;
  let index = state.selected;
  if (index === null || state.fixed[index] || state.board[index]) {
    const empty = state.board.map((value, i) => value === 0 ? i : -1).filter((i) => i >= 0);
    if (!empty.length) return;
    index = empty[Math.floor(Math.random() * empty.length)];
  }
  state.selected = index;
  state.board[index] = state.solution[index];
  state.hinted[index] = true;
  state.hints += 1;
  const row = Math.floor(index / 9) + 1;
  const column = index % 9 + 1;
  saveGame();
  render();
  announce(`提示：第 ${row} 行第 ${column} 列填 ${state.solution[index]}`);
  if (state.board.every(Boolean)) finishGame();
}

function finishGame() {
  if (state.complete) return;
  state.complete = true;
  const config = difficultyConfig[state.level];
  const reward = Math.max(1, config.reward - Math.floor(state.hints / 2));
  state.stars += reward;
  localStorage.setItem("mathPlanetStars", String(state.stars));
  saveGame();
  render();
  elements.completeText.textContent = `完成${config.label}数独，使用 ${state.hints} 次提示，获得 ${reward} 颗星！`;
  elements.dialog.showModal();
  announce("恭喜完成数独挑战");
}

function announce(text) {
  elements.announcement.textContent = "";
  window.requestAnimationFrame(() => { elements.announcement.textContent = text; });
}

function updateDifficultyButtons() {
  document.querySelectorAll(".difficulty-button").forEach((button) => {
    const active = button.dataset.level === state.level;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function moveSelection(rowChange, columnChange) {
  if (state.selected === null) state.selected = 0;
  else {
    const row = Math.floor(state.selected / 9);
    const column = state.selected % 9;
    const nextRow = (row + rowChange + 9) % 9;
    const nextColumn = (column + columnChange + 9) % 9;
    state.selected = nextRow * 9 + nextColumn;
  }
  render();
  elements.board.children[state.selected].focus({ preventScroll: true });
}

document.querySelectorAll(".difficulty-button").forEach((button) => {
  button.addEventListener("click", () => newGame(button.dataset.level));
});
elements.eraseButton.addEventListener("click", eraseSelected);
elements.hintButton.addEventListener("click", useHint);
elements.newGameButton.addEventListener("click", () => newGame());
elements.closeDialogButton.addEventListener("click", () => elements.dialog.close());
elements.dialogNewGameButton.addEventListener("click", () => {
  elements.dialog.close();
  newGame();
});
elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog) elements.dialog.close();
});

document.addEventListener("keydown", (event) => {
  if (elements.dialog.open) return;
  if (/^[1-9]$/.test(event.key)) {
    placeNumber(Number(event.key));
    event.preventDefault();
  } else if (event.key === "Backspace" || event.key === "Delete") {
    eraseSelected();
    event.preventDefault();
  } else if (event.key === "ArrowUp") moveSelection(-1, 0);
  else if (event.key === "ArrowDown") moveSelection(1, 0);
  else if (event.key === "ArrowLeft") moveSelection(0, -1);
  else if (event.key === "ArrowRight") moveSelection(0, 1);
});

buildBoard();
buildNumberPad();
if (!loadGame()) newGame("teaching");
else {
  updateDifficultyButtons();
  render();
}
