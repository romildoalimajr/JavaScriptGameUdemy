const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function updateBoard(index){
    board[index] = currentPlayer;
}

function renderCell(cell, index){
    cell.textContent = board[index];
}

function makeMove(cell, index){
    updateBoard(index);
    renderCell(cell, index);
}

function isWinningMove(){
    return winningConditions.some(([a, b, c]) => {
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

function isDraw(){
    return board.every((cell) => cell !== "");
}

function updateStatus(){
    statusDiv.textContent = `It's ${currentPlayer}'s turn.`;
}

function switchPlayer(){
    currentPlayer = currentPlayer === "X" ? "0" : "X";
    updateStatus();
}

function endGame(message){
    isGameActive  = false;
    statusDiv.textContent = message;
}

function evaluateGame(){
    if(isWinningMove()){
        endGame(`Player ${currentPlayer} has won!...`);
    }else if(isDraw()){
        endGame("Game ended in a draw!...");
    }else{
        switchPlayer();
    }
}

function isValidMove(index){
    return board[index] === "" && isGameActive;
}

function handleCellClick(e){
    const clickedIndex = parseInt(e.target.getAttribute("data-index"));
    if(!isValidMove(clickedIndex)) return;
    makeMove(e.target, clickedIndex);
    evaluateGame();
}

function resetGame(){
    board = Array(9).fill("");
    isGameActive = true;
    currentPlayer = "X";
    cells.forEach((cell) => (cell.textContent = ""));
    updateStatus();
}

function attachEventListerns(){
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
    resetBtn.addEventListener("click", resetGame);
}

function initializeGame(){
    attachEventListerns();
    updateStatus();
}

initializeGame();