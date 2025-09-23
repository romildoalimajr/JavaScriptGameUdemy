const spinBtn = document.querySelector("#spinBtn");

const symbols = ["🍊", "🎃", "🍒", "🍇", "✨", "💰"];

const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
];

let spinning = false;
let intervals = [];

function setReelSymbol(index, symbol) {
    reels[index].textContent = symbol;
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function stopReelSpin(index) {
    clearInterval(intervals[index]);
    setReelSymbol(index, getRandomSymbol());
}

function setMessage(msg) {
    document.getElementById("message").textContent = msg;
}

function startReelSpin(index) {
    intervals[index] = setInterval(() => {
        setReelSymbol(index, getRandomSymbol());
    }, 100);
}

function checkWin() {
    const [r1, r2, r3] = reels.map((reel) => reel.textContent);
    const win = r1 === r2 && r2 === r3;
    setMessage(win ? "🎉 You win! 🎉" : "😢 Try again!");
}

function clearMessage() {
    setMessage("");
}

function disableSpinButton() {
    spinBtn.disabled = true;
}

function enableSpinButton() {
    spinBtn.disabled = false;
}

function spin() {
    if (spinning) return;

    spinning = true;
    clearMessage();
    disableSpinButton();
    intervals = [];

    reels.forEach((_, i) => startReelSpin(i));

    reels.forEach((_, i) => {
        setTimeout(() => {
            stopReelSpin(i);

            // corrigido: length em vez de lenght
            if (i === reels.length - 1) {
                setTimeout(() => {
                    checkWin();
                    spinning = false;
                    enableSpinButton();
                }, 200);
            }
        }, 1000 + i * 300);
    });
}

function initializeReels() {
    reels.forEach((_, i) => {
        setReelSymbol(i, getRandomSymbol());
    });
}

spinBtn.addEventListener("click", spin);
initializeReels();
