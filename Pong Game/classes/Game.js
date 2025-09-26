import { CONFIG } from "../config.js";
import { startBtn, resetBtn, scoreText, width, height, ctx } from "../dom.js";
import { Paddle } from "./Paddle.js";
import { Ball } from "./Ball.js";

let intervalID;

export class Game {
    constructor() {
        this.paddle1 = new Paddle(CONFIG.paddlePadding, CONFIG.paddle1Color)
        this.paddle2 = new Paddle(
            width - 25 - CONFIG.paddlePadding,
            CONFIG.paddle2Color
        );
        this.ball = new Ball();
        this.player1Score = 0;
        this.player2Score = 0;
        this.initControls();
    }

    updateScore() {
        scoreText.textContent = `${this.player1Score.toString().padStart(2, " ")}`;
    }

    loop() {
        intervalID = setTimeout(() => {
            this.clearBoard();
            this.drawCenterLine();
            this.paddle1.draw();
            this.paddle2.draw();
            this.ball.move();
            this.ball.draw();
            this.ball.checkWallCollision();
            this.ball.checkPaddleCollision(this.paddle1, this.paddle2, (scorer) => {
                if (scorer === 1) {
                    this.player1Score++;
                } else {
                    this.player2Score++;
                }
                this.updateScore();
            });
            this.loop();
        }, CONFIG.tickRate);
    }

    clearBoard() {
        ctx.fillStyle = CONFIG.boardColor;
        ctx.fillRect(0, 0, width, height);
    }

    drawCenterLine() {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 15]);
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
        ctx.restore();
    }

    start() {
        document.getElementById("introduction").style.display = "none";
        document.getElementById("gameContainer").style.display = "block";
        this.ball.reset();
        this.loop();
    }

    reset() {
        this.player1Score = 0;
        this.player2Score = 0;
        this.updateScore();
        this.paddle1 = new Paddle(CONFIG.paddlePadding, CONFIG.paddle1Color)
        this.paddle2 = new Paddle(
            width - 25 - CONFIG.paddlePadding,
            CONFIG.paddle2Color
        );
        this.ball = new Ball();
        clearTimeout(intervalID);
        this.start();
    }

    initControls() {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "w":
                case "W":
                    this.paddle1.move(true);
                    break;
                case "s":
                case "S":
                    this.paddle1.move(false);
                    break;
                case "ArrowUp":
                    this.paddle2.move(true);
                    break;
                case "ArrowDown":
                    this.paddle2.move(false);
                    break;
            }
        });

        startBtn.addEventListener("click", () => this.start());
        resetBtn.addEventListener("click", () => this.reset());
    }
}
