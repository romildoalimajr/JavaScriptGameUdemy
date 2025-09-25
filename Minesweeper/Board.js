import Cell from "./Cell.js";

export default class Board {
  constructor(rows, cols, mines) {
    this.rows = rows;
    this.cols = cols;
    this.totalMines = mines;
    this.cells = [];
    this.mineCoordinates = [];
    this.gameOver = false;
    this.container = document.getElementById("game");
    this.messageElement = document.getElementById("game-over-message");
  }

  createCell(row, col) {
    const cell = new Cell(row, col, this);
    this.container.appendChild(cell.element);
    return cell;
  }

  createCellRow(row) {
    const rowArray = [];
    for (let col = 0; col < this.cols; col++) {
      rowArray.push(this.createCell(row, col));
    }
    return rowArray;
  }

  placeMine(row, col) {
    this.cells[row][col].mine = true;
    this.mineCoordinates.push([row, col]);
  }

  placeMines() {
    let placed = 0;
    this.mineCoordinates = [];

    while (placed < this.totalMines) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);

      if (!this.cells[row][col].mine) {
        this.placeMine(row, col);
        placed++;
      }
    }
  }

  isInBounds(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  countAdjacentMines(centerRow, centerCol) {
    let mineCount = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const neighborRow = centerRow + rowOffset;
        const neighborCol = centerCol + colOffset;

        if (!this.isInBounds(neighborRow, neighborCol)) continue;
        if (this.cells[neighborRow][neighborCol].mine) {
          mineCount++;
        }
      }
    }

    return mineCount;
  }

  revealNeighbors(centerRow, centerCol) {
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        const neighborRow = centerRow + rowOffset;
        const neighborCol = centerCol + colOffset;

        if (!this.isInBounds(neighborRow, neighborCol)) continue;
        const neighborCell = this.cells[neighborRow][neighborCol];

        if (neighborCell.revealed || neighborCell.mine) continue;
        neighborCell.reveal();
      }
    }
  }

  revealAllMines() {
    for (const [row, col] of this.mineCoordinates) {
      const cell = this.cells[row][col];
      cell.element.textContent = "💣";
      cell.element.classList.add("revealed");
    }
  }

  startGame() {
    this.gameOver = false;
    this.messageElement.textContent = "";
    this.container.innerHTML = "";
    this.cells = [];

    for (let row = 0; row < this.rows; row++) {
      const rowArray = this.createCellRow(row);
      this.cells.push(rowArray);
    }
    this.placeMines();
  }

  endGame(won) {
    this.gameOver = true;
    this.messageElement.textContent = won
      ? "🎉 Congratulations! You won!"
      : "💥 Game Over! You hit a mine.";
    this.messageElement.style.color = won ? "green" : "red";
    this.messageElement.style.fontWeight = "bold";
    this.revealAllMines();
  }

  checkWin() {
    let revealed = 0;
    const totalCells = this.rows * this.cols;
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.revealed) revealed++;
      }
    }
    if (revealed === totalCells - this.totalMines) {
      this.endGame(true);
    }
  }
}
