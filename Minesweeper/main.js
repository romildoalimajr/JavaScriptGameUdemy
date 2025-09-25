import Board from "./Board.js";

const board = new Board(10, 10, 15);
board.startGame();
document
    .getElementById("reset-button")
    .addEventListener("click", () => board.startGame());