export default class WordService {
    constructor() {
        this.words = [];
    }

    async loadWords() {
        const response = await fetch("words.txt");
        const text = await response.text();
        this.words = text
            .split("\n")
            .map((w) => w.trim())
            .filter((w) => w.length > 0);
    }

    getRandomWords(count = 25) {
        const shuffled = [...this.words].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    compareWord(inputWord, correctWord) {
        console.log(`We are comparing ${inputWord} to ${correctWord}`);
        return inputWord === correctWord;
    }
}