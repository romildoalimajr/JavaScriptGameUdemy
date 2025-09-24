const BACK_IMAGE_SRC = "image/back.png";

export default class Card {
    constructor(row, col, type, onClick) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.matched = false;

        this.element = document.createElement("img");
        this.element.id = `${row}-${col}`;
        this.element.classList.add("card");
        this.element.src = `image/${type}.png`;

        this.element.onerror = () => {
            throw new Error(`Image not found: image/${type}.png`);;
        };
        this.element.addEventListener("click", () => onClick(this));
        this.hideAfter(3000);
    }

    getId() {
        return `${this.row}-${this.col}`;
    }

    reveal() {
        if (!this.matched) {
            this.element.src = `image/${this.type}.png`;
        }
    }

    hide() {
        if (!this.matched) {
            this.element.src = BACK_IMAGE_SRC;
        }
    }

    hideAfter(ms) {
        setTimeout(() => this.hide(), ms);
    }

    markAsMatched() {
        this.matched = true;
    }

    isRevealed() {
        return !this.element.src.includes("back");
    }

    equals(otherCard) {
        return this.type === otherCard.type;
    }
}