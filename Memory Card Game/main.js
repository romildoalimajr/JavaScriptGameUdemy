import Card from "./Card.js";
import CardManager from "./CardManager.js";

//const boardElement = document.getElementById("board");
const cardManager = new CardManager();
const rows = 4;
const columns = 5;
let matches = 0;
let errors = 0;
let board = [];
let card1Selected = null;
let card2Selected = null;
let inputLocked = false;

function showGameCompletedMessage(){
    alert(`🎉Congratulations! You matched all cards with ${errors} errors.`);
}

function handleCardMatchCheck(){
    if(!card1Selected.equals(card2Selected)){
        card1Selected.hide();
        card2Selected.hide();
        errors++;
        document.getElementById("errors").innerText = errors;
    } else{
        card1Selected.markAsMatched();
        card2Selected.markAsMatched();
        matches++;
        document.getElementById("matches").innerText = matches;
    }

    card1Selected = null;
    card2Selected = null;
    inputLocked = false;

    const totalPairs = (rows * columns) / 2;
    if(matches === totalPairs){
        setTimeout(showGameCompletedMessage, 300);
    }
}

function selectCard(card) {
    if(inputLocked || card.isRevealed() || card === card1Selected) return;
    card.reveal();
    if(!card1Selected){
        card1Selected = card;
        return;
    }
    if(!card2Selected){
        card2Selected = card;
        inputLocked = true;
        setTimeout(handleCardMatchCheck, 750);
    }
}

function createCard(row, col){
    const type = cardManager.drawCard();
    return new Card(row, col, type, selectCard);
}

function createRow(row, boardElement){
    const rowList = [];
    for(let col = 0; col < columns; col++){
        const card = createCard(row, col);
        rowList.push(card);
        boardElement.append(card.element);
    }
    return rowList;
}

function buildBoard(boardElement){
    for(let row = 0; row < rows; row++){
        const rowList = createRow(row, boardElement);
        board.push(rowList);
    }
}

function startGame(){
    const boardElement = document.getElementById("board");
    board = [];
    buildBoard(boardElement);
}

function resetGame(){
    matches = 0;
    errors = 0;
    card1Selected = null;
    card2Selected = null;
    inputLocked = false;
    document.getElementById("matches").innerText = matches;
    document.getElementById("errors").innerText = errors;
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    cardManager.shuffle();
    startGame();
}

document.getElementById("resetButton").addEventListener("click", resetGame);
window.onload = () => {
    cardManager.shuffle();
    startGame();
}