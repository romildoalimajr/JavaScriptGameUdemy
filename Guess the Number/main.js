const input = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts-left");

let secretNumber;
let attemptsLeft = 10;

function startGame(){
    secretNumber = Math.floor(Math.random() * 101);
    attemptsLeft = 10;
    attemptsDisplay.textContent = attemptsLeft;
    message.textContent = "";
    input.disabled = false;
    submitBtn.disabled = false;
    restartBtn.style.display = "none";
    input.value = "";
    input.focus();
}

function checkGuess(){
    const userInput = input.value.trim();

    if(userInput === ""){
        message.textContent = "Input cannot be empty. Please enter a number!...";
        return;
    }

    const guess = Number(userInput);

    if(isNaN(guess) || guess < 0 || guess > 100){
        message.textContent = "Please enter a number between 0 and 100!...";
        return;
    }

    attemptsLeft --;
    attemptsDisplay.textContent = attemptsLeft;

    let feedback = `You entered: ${guess}.`;

    if(guess === secretNumber){
        feedback += `Correct! The number was ${secretNumber}.`;
        message.textContent = feedback;
        endGame();
    }else if(attemptsLeft === 0){
        feedback += `Game Over! The number was ${secretNumber}.`;
        message.textContent = feedback;
        endGame();
    }else if(guess < secretNumber){
        feedback += "Too low. Try again!...";
        message.textContent = feedback;
    }else{
        feedback += "Too high. Try again!...";
        message.textContent = feedback;
    }

    input.value = "";
    input.focus();
}

function endGame(){
    input.disabled = true;
    submitBtn.disabled = true;
    restartBtn.style.display = "inline-block";
}

submitBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", startGame);
input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") checkGuess();
});

startGame();
