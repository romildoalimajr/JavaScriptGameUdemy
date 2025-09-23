const wordEL = document.getElementById("word");
const wrongGuessesEL = document.getElementById("wrong-guesses");
const remainingEL = document.getElementById("remaining");
const keyboardEL = document.getElementById("keyboard");
const resetBtn = document.getElementById("reset-btn");

const words = [
    "javascript",
    "hangman",
    "programming",
    "developer",
    "interface",
    "computer",
    "software",
    "algorithm",
    "kalangos",
    "romildo",
    "junior",
];

let selectedWord = "";
let guessedLetters = new Set();
let wrongGuesses = new Set();
const maxWrong = 8;

function pickRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function isGameWon(word, guessedLetters) {
    return word.split("").every((char) => guessedLetters.has(char));
}

function isGameOver(wrongGuesses, maxWrong) {
    return wrongGuesses.size >= maxWrong;
}

function getDisplayWord(word, guessedLetters) {
    return word
        .split("")
        .map((char) => (guessedLetters.has(char) ? char : "-"))
        .join("");
}

function renderWord(word, guessedLetters) {
    wordEL.textContent = getDisplayWord(word, guessedLetters);
}

function renderWrongGuesses(wrongGuesses) {
    wrongGuessesEL.textContent = Array.from(wrongGuesses).join(", ");
}

function renderRemainingGuesses(wrongGuesses, maxWrong) {
    remainingEL.textContent = maxWrong - wrongGuesses.size;
}

function disableAllKeys() {
    const keys = keyboardEL.querySelectorAll(".key");
    keys.forEach((key) => {
        key.ariaDisabled = true;
        key.classList.add("disabled");
    });
}

function disableKeyButton(button) {
    button.disabled = true;
    button.classList.add("disabled");
}

function handleCorrectGuess(letter, guessedletters, word) {
    guessedLetters.add(letter);
    renderWord(word, guessedLetters);
    if (isGameWon(word, guessedLetters)) {
        alert("Congratulations!... You Won!...");
        disableAllKeys();
    }
}

function handleWrongGuess(letter, wrongGuesses, word, maxWrong) {
    wrongGuesses.add(letter);
    renderWrongGuesses(wrongGuesses);
    renderRemainingGuesses(wrongGuesses, maxWrong);

    if (isGameOver(wrongGuesses, maxWrong)) {
        alert(`You lost!... The word was "${word}".`);
        disableAllKeys();
    }
}

function handleGuess(letter, button, word, guessedLetters, wrongGuesses, maxWrong) {
    if (guessedLetters.has(letter) || wrongGuesses.has(letter)) return;

    if (word.includes(letter)) {
        handleCorrectGuess(letter, guessedLetters, word);
    } else {
        handleWrongGuess(letter, wrongGuesses, word, maxWrong);
    }
    disableKeyButton(button);
}

function createKeyboard(onKeyPress) {
    const layout = [

        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],

        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ç"],

        ["z", "x", "c", "v", "b", "n", "m"],

    ];

    keyboardEL.innerHTML = "";

    layout.forEach((row) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("key-row");

        row.forEach((letter) => {
            const keyBtn = document.createElement("button");
            keyBtn.classList.add("key");
            keyBtn.textContent = letter;
            keyBtn.addEventListener("click", () => onKeyPress(letter, keyBtn));
            rowDiv.appendChild(keyBtn);
        });

        keyboardEL.appendChild(rowDiv);
    });
}

function initGame(){
    selectedWord = pickRandomWord(words);
    guessedLetters = new Set();
    wrongGuesses = new Set();

    renderWord(selectedWord, guessedLetters);
    renderWrongGuesses(wrongGuesses);
    renderRemainingGuesses(wrongGuesses, maxWrong);

    createKeyboard((letter, button) => handleGuess(
        letter, button, selectedWord, guessedLetters, wrongGuesses, maxWrong,
    ));
}

resetBtn.addEventListener("click", initGame);
initGame();


