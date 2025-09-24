export default class CardManager {
    constructor() {
        this.originalCards = [
            "fire",
            "island",
            "king",
            "lightning-bolt",
            "lion",
            "mountain",
            "rabbit",
            "sheep",
            "snowflake",
            "candy",
        ]

        this.deck = [];
    }

    shuffle() {
        const pairedCards = [...this.originalCards, ...this.originalCards];

        for (let i = pairedCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairedCards[i], pairedCards[j]] = [pairedCards[j], pairedCards[i]];
        }

        this.deck = pairedCards;
    }

    drawCard() { 
        return this.deck.pop();
    }

    hasCardsLeft(){
        return this.deck.length > 0;
    }
}