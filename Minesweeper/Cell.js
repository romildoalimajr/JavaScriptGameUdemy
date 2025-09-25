export default class Cell {
    constructor(row, col, board) {
        this.row = row;
        this.col = col;
        this.board = board;
        this.mine = false;
        this.revealed = false;
        this.flagged = false;

        this.element = document.createElement("div");
        this.element.classList.add("cell");
        this.element.dataset.row = row;
        this.element.dataset.col = col;
        this.element.addEventListener("click", () => this.reveal());
        this.element.addEventListener("contextmenu", (e) => this.toggleFlag(e));
    }

    reveal() {
        if (this.board.gameOver || this.revealed || this.flagged) return;

        this.revealed = true;
        this.element.classList.add("revealed");

        if (this.mine) {
            this.element.textContent = "💣";
            this.board.endGame(false);
            return;
        }

        const count = this.board.countAdjacentMines(this.row, this.col);
        if (count > 0) {
            this.element.textContent = count;
        } else {
            this.board.revealNeighbors(this.row, this.col);
        }

        this.board.checkWin();
    }

    toggleFlag(event) {
        event.preventDefault();
        if (this.board.gameOver || this.revealed) return;
        this.flagged = !this.flagged;
        this.element.classList.toggle("flagged");
        this.element.textContent = this.flagged ? "🚩" : "";
    }
}