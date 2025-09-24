const playerBoardEl = document.getElementById("player-board");
const aiBoardEl = document.getElementById("ai-board");
const statusEl = document.getElementById("status");
const resetButton = document.getElementById("reset-button");
const commentaryEl = document.querySelector("#commentary");

const gridSize = 10;
const numShips = 2;

let playerShipPositions = [];
let aiShipPositions = [];
let gameOver = false;

// --- Render Board Labels ---
function renderLabels(prefix) {
  const rowContainer = document.getElementById(`${prefix}-labels-row`);
  const colContainer = document.getElementById(`${prefix}-labels-col`);

  for (let i = 0; i < gridSize; i++) {
    const label = document.createElement("div");
    label.textContent = String.fromCharCode(65 + i);
    rowContainer.appendChild(label);
  }

  const spacer = document.createElement("div");
  colContainer.appendChild(spacer);

  for (let i = 0; i < gridSize; i++) {
    const label = document.createElement("div");
    label.textContent = i;
    colContainer.appendChild(label);
  }
}

// --- Initialize Board ---
function initBoard(boardEl, isAI = false) {
  boardEl.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    if (isAI) {
      cell.addEventListener("click", playerTurn);
    }
    boardEl.appendChild(cell);
  }
}

// --- Ship Placement ---
function placeMultipleShips() {
  const positions = new Set();
  while (positions.size < numShips) {
    positions.add(Math.floor(Math.random() * gridSize * gridSize));
  }
  return Array.from(positions);
}

function isCellTried(cell) {
  return cell.classList.contains("hit") || cell.classList.contains("miss");
}

// --- Modular Helpers ---
function getRandomAvailableIndex(boardEl) {
  let index, cell;
  do {
    index = Math.floor(Math.random() * gridSize * gridSize);
    cell = boardEl.children[index];
  } while (isCellTried(cell));
  return { index, cell };
}

function markHit(cell, coord, isPlayer = false) {
  cell.classList.add("hit");
  const message = isPlayer
    ? ` Enemy fired at ${coord} and hit!`
    : `You fired at ${coord} and hit!`;
  commentaryEl.textContent = message;
}

function markMiss(cell, coord, isPlayer = false) {
  cell.classList.add("miss");
  const message = isPlayer
    ? ` Enemy fired at ${coord} and missed.`
    : `You fired at ${coord} and missed.`;
  commentaryEl.textContent = message;
}

function checkWinCondition(positions, isPlayer = false) {
  if (positions.length === 0) {
    statusEl.textContent = isPlayer ? "💥 You lose!" : "🔥 You win!";
    gameOver = true;
    return true;
  }
  return false;
}

// --- Coordinate Helper ---
function indexToCoordString(index) {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  return String.fromCharCode(65 + col) + row;
}

// --- AI Turn ---
function aiTurn() {
  if (gameOver) return;

  const { index, cell } = getRandomAvailableIndex(playerBoardEl);
  const coord = indexToCoordString(index);

  if (playerShipPositions.includes(index)) {
    markHit(cell, coord, true);
    playerShipPositions = playerShipPositions.filter((pos) => pos !== index);
    checkWinCondition(playerShipPositions, true);
  } else {
    markMiss(cell, coord, true);
  }
}

// --- Player Attacks AI ---
function playerTurn(event) {
  if (gameOver) return;

  const index = parseInt(event.target.dataset.index);
  const cell = event.target;

  if (isCellTried()) return;

  const coord = indexToCoordString(index);
  const isHit = aiShipPositions.includes(index);

  if (!isHit) {
    markMiss(cell, coord);
    aiTurn();
    return;
  }

  // It's a hit
  markHit(cell, coord);
  aiShipPositions = aiShipPositions.filter((pos) => pos !== index);
  checkWinCondition(aiShipPositions);
}

// --- Start Game ---
function startGame() {
  gameOver = false;
  statusEl.textContent = "";
  commentaryEl.textContent = "";

  initBoard(playerBoardEl);
  initBoard(aiBoardEl, true);

  playerShipPositions = placeMultipleShips();
  aiShipPositions = placeMultipleShips();

  playerShipPositions.forEach((pos) => {
    playerBoardEl.children[pos].classList.add("ship");
  });
}

// --- Init ---
resetButton.addEventListener("click", startGame);
renderLabels("player");
renderLabels("ai");
startGame();
