import WordService from "./WordService.js";

const wordDisplay = document.getElementById("word-display");
const inputBox = document.getElementById("input-box");
const timerEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const restartBtn = document.getElementById("restart-btn");

let wordService = new WordService();
let currentWords = [];
let currentWordIndex = 0;
let typedWordCount = 0;
let timerStarted = false;
let startTime, interval;

async function startTest() {
    try {
        if (wordService.words.length === 0) {
            await wordService.loadWords();
        }
        currentWords = wordService.getRandomWords();
        wordDisplay.innerHTML = currentWords
            .map((word, id) => `<span id="word-${id}">${word}</span>`)
            .join(" ");
        inputBox.value = "";
        timerEl.innerText = "0";
        wpmEl.innerText = "0";
        currentWordIndex = 0;
        timerStarted = false;
        clearInterval(interval);
        inputBox.disabled = false;
        highlightCurrentWord();
    } catch {
        wordDisplay.innerText = "Failed to load words.";
        inputBox.disabled = true;
    }
}

function highlightCurrentWord() {
    currentWords.forEach((_, index) => {
        const span = document.getElementById(`word-${index}`);
        if (span) {
            span.classList.remove("highlight");
        }
    });

    const currentSpan = document.getElementById(`word-${currentWordIndex}`);
    if (currentSpan) {
        currentSpan.classList.add("highlight");
    }
}

function startTimer() {
    startTime = new Date();
    interval = setInterval(() => {
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        timerEl.innerText = elapsed;
    }, 1000);
}

function calculateWPM() {
    const elapsedMinutes = (new Date() - startTime) / 1000 / 60;
    const wpm = Math.round(typedWordCount / elapsedMinutes);
    wpmEl.innerText = isFinite(wpm) ? wpm : 0;
}

function markWord(index, isCorrect) {
    const span = document.getElementById(`word-${index}`);
    if (span) {
        span.classList.add(isCorrect ? "correct" : "incorrect");
    }
}

function handleSpaceKey(e) {
    e.preventDefault();

    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
    const currentInput = inputBox.value.trim();
    const correctWord = currentWords[currentWordIndex];

    const isCorrect = wordService.compareWord(currentInput, correctWord);
    markWord(currentWordIndex, isCorrect);

    currentWordIndex++;
    typedWordCount++;
    highlightCurrentWord();

    inputBox.value = "";

    if (currentWordIndex >= currentWords.length) {
        clearInterval(interval);
        calculateWPM();
        inputBox.disabled = true;
    }
}

inputBox.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        handleSpaceKey(e);
    }
});

restartBtn.addEventListener("click", () => {
    inputBox.disabled = false;
    startTest();
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        startTest();
    }
});

startTest();


