import {
    clearBoard,
    drawFood,
    drawSnake,
    displayGameOver,
} from "./renderer.js";

const container = document.querySelector("#gameContainer");
const intro = document.querySelector("#introduction");
const gameCanvas = document.querySelector("#gameBoard");
const context = gameCanvas.getContext("2d");
const gameWidth = gameCanvas.width;
const gameHeight = gameCanvas.height;
const scoreDisplay = document.querySelector("#scoreDisplay");
const startButton = document.querySelector("#startButton");
const resetButton = document.querySelector("#resetButton");
const boardBackground = "white";
const unitSize = 25;

const LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;

let snakeBody = [];
let isGameRunning = false;
let snakeXSpeed = unitSize;
let snakeYSpeed = 0;
let foodPosX;
let foodPosY;
let score = 0;
let gameLoopTimeoutId;

function showGameContainer() {
    container.style.display = "block";
}

function hideIntroduction() {
    intro.style.display = "none";
}

function initializeSnake(length) {
    return Array.from({ length }, (_, i) => ({
        x: unitSize * (length - 1 - i),
        y: 0,
    }));
}

function isWallColision() {
    const head = snakeBody[0];
    return (
        head.x < 0 || head.x >= gameWidth || head.y < 0 || head.y >= gameHeight
    );
}

function isSelfCollision() {
    const [head, ...body] = snakeBody;
    return body.some((segment) => segment.x === head.x && segment.y === head.y);
}

function checkCollisions() {
    if (isWallColision() || isSelfCollision()) {
        isGameRunning = false;
    }
}

function hasSnakeEatenFood(head) {
    return head.x === foodPosX && head.y === foodPosY;
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score;
}

function increaseScore() {
    score += 1;
    updateScoreDisplay();
}

function getNextHeadPosition() {
    return {
        x: snakeBody[0].x + snakeXSpeed,
        y: snakeBody[0].y + snakeYSpeed,
    };
}

function randomUnit(min, max) {
    return Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
}

function placeNewFood() {
    foodPosX = randomUnit(0, gameWidth - unitSize);
    foodPosY = randomUnit(0, gameHeight - unitSize);
}

function moveSnake() {
    if (!isGameRunning) return;

    const head = getNextHeadPosition();
    snakeBody.unshift(head);

    if (hasSnakeEatenFood(head)) {
        increaseScore();
        placeNewFood();
    } else {
        snakeBody.pop();
    }
}

function updateGame() {
    moveSnake();
    checkCollisions();
}

function renderGame() {
    clearBoard(context, boardBackground, gameWidth, gameHeight);
    drawFood(context, foodPosX, foodPosY, unitSize);
    drawSnake(context, snakeBody, unitSize);
}

function scheduleNextTick() {
    if (!isGameRunning) {
        const gameBoard = document.querySelector("#gameBoard");
        gameBoard.classList.add("blurred");
        displayGameOver(context, gameWidth, gameHeight);
        return;
    }

    gameLoopTimeoutId = setTimeout(() => {
        updateGame();
        renderGame();
        scheduleNextTick();
    }, 75);
}

function changeDirection(event) {
    const key = event.keyCode;
    const goingUp = snakeYSpeed === -unitSize;
    const goingDown = snakeYSpeed === unitSize;
    const goingRight = snakeXSpeed === unitSize;
    const goingLeft = snakeXSpeed === -unitSize;

    switch (true) {
        case key === LEFT && !goingRight:
            snakeXSpeed = -unitSize;
            snakeYSpeed = 0;
            break;

        case key === UP && !goingDown:
            snakeXSpeed = 0;
            snakeYSpeed = -unitSize;
            break;

        case key === RIGHT && !goingLeft:
            snakeXSpeed = unitSize;
            snakeYSpeed = 0;
            break;

        case key === DOWN && !goingUp:
            snakeXSpeed = 0;
            snakeYSpeed = unitSize;
            break;
    }
}

function startGame(){
    const gameBoard = document.querySelector("#gameBoard");
    gameBoard.classList.remove("blurred");
    showGameContainer();
    hideIntroduction();
    isGameRunning = true;
    score = 0;
    snakeXSpeed = unitSize;
    snakeYSpeed = 0;
    updateScoreDisplay();
    snakeBody = initializeSnake(5);
    placeNewFood();
    renderGame();
    scheduleNextTick();
}

function resetGame(){
    clearTimeout(gameLoopTimeoutId);
    startGame();
}

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);
startButton.addEventListener("click", startGame);


