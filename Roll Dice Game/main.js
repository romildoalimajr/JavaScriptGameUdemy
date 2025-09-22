const roll1Btn = document.getElementById("roll1");
const roll2Btn = document.getElementById("roll2");
const result1Span = document.getElementById("result1");
const result2Span = document.getElementById("result2");
const winnerH3 = document.getElementById("winner");

let player1Roll = null;
let player2Roll = null;

roll1Btn.disabled = false;
roll2Btn.disabled = false;

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetGame(){
    player1Roll = null;
    player2Roll = null;
    result1Span.textContent = "-";
    result2Span.textContent = "-";
    winnerH3.textContent = "";
    roll1Btn.disabled = false;
    roll2Btn.disabled = false;
}

function decideWinnerAndReset(){
    if(player1Roll > player2Roll){
        winnerH3.textContent = "Player 1 wins!...";
    }else if(player2Roll > player1Roll){
        winnerH3.textContent = "Player 2 wins!...";
    }else{
        winnerH3.textContent = "It's a tie!...";
    }

    roll1Btn.disabled = true;
    roll2Btn.disabled = true;

    setTimeout(resetGame, 3000);
}

function handleRoll(playerNumber){
    const roll = getRandomNumber(1,6);

    if(playerNumber === 1){
        player1Roll = roll;
        result1Span.textContent = roll;
        roll1Btn.disabled = true;
        roll2Btn.disabled = false;
    }else {
        player2Roll = roll;
        result2Span.textContent = roll;
        roll2Btn.disabled = true;
        roll1Btn.disabled = false;
    }

    winnerH3.textContent = "";

    if(player1Roll !== null && player2Roll !== null){
        decideWinnerAndReset();
    }
}

roll1Btn.addEventListener("click", () => handleRoll(1));
roll2Btn.addEventListener("click", () => handleRoll(2));




