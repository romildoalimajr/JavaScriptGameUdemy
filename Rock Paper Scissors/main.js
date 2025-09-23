const buttons = document.querySelectorAll(".choices button");
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const winnerDisplay = document.getElementById("winner");

const choices = ["rock", "paper", "scissors"];

function getComputerChoice(){
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getWinner(user, computer){
    if(user === computer) return "It is a tie!";

    const winConditions = {
        rock: "scissors",
        paper: 'rock',
        scissors: "paper",
    };

    return winConditions[user] === computer ? "You win!..." : "Computer wins!...";
}

function handleUserChoice(event){
    const userChoice = event.currentTarget.getAttribute("data-choice");
    const computerChoice = getComputerChoice();
    const winner = getWinner(userChoice, computerChoice);

    updateUI(userChoice, computerChoice, winner);
}

function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function updateUI(userChoice, computerChoice, winner){
    userChoiceDisplay.textContent = `Your choice.: ${capitalize(userChoice)}`;
    computerChoiceDisplay.textContent = `Computer choice.: ${capitalize(computerChoice)}`;

    winnerDisplay.textContent = `Result.: ${winner}`;
}

buttons.forEach((button) => {
    button.addEventListener("click", handleUserChoice);
});