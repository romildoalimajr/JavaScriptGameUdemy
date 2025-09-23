const rgbDisplay = document.getElementById("rgbDisplay");
const choicesContainer = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

let correctColor = "";
let gameOver = false;

function getRandomColor(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

function randomize(array){
    return array.sort(() => Math.random() - 0.5);
}

function generateChoices(correct, total = 6){
    const choices = [correct];
    while(choices.length < total){
        const color = getRandomColor();
        if(!choices.includes(color)) choices.push(color);
    }
    return randomize(choices);
}

function showFeedback(message, color){
    feedback.textContent = message;
    feedback.style.color = color;
}

function disableAllBoxes(){
    document.querySelectorAll(".color-box").forEach((el) => {
        el.style.pointerEvents = "nome";
    });
}

function enableAllBoxes(){
    document.querySelectorAll(".color-box").forEach((el) => {
        el.style.pointerEvents = "auto";
    });
}

function handleBoxClick(selectedColor){
    if(gameOver) return;

    if(selectedColor !== correctColor){
        showFeedback("Try again!", "#FF0000");
        return;
    }

    // Correct Answer
    showFeedback("Correct!", "#98FB98");
    disableAllBoxes();
    gameOver = true;
}

function createColorBox(color){
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;
    box.onclick = () => handleBoxClick(color);
    return box;
}

function resetGameState(){
    feedback.textContent = "";
    feedback.style.color = "";
    choicesContainer.innerHTML = "";
    gameOver = false;
}

function renderChoices(choices){
    choices.forEach((color) => {
        const box = createColorBox(color);
        choicesContainer.appendChild(box);
    });
}

function renderGame(){
    resetGameState();
    correctColor = getRandomColor();
    rgbDisplay.textContent = correctColor;

    const choices = generateChoices(correctColor, 6)
    renderChoices(choices);
}

nextBtn.onclick = () => {
    enableAllBoxes();
    renderGame();
};

renderGame();

