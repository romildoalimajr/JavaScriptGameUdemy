import { CONFIG } from "../config.js";
import { ctx, width, height } from "../dom.js";

export class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.speed = 0;
        this.x = width / 2;
        this.y = height / 2;
        this.directionX = Math.random() > 0.5 ? 1 : -1;
        this.directionY = Math.random() * 2 - 1;

        setTimeout(() => {
            this.speed = CONFIG.initialBallSpeed;
        }, 1500);
    }
    move() {
        this.x += this.speed * this.directionX;
        this.y += this.speed * this.directionY;
    }

    draw() {
        ctx.fillStyle = CONFIG.ballColor;
        ctx.strokeStyle = CONFIG.ballBorderColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, CONFIG.ballRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    accelerate() {
        if (this.speed < CONFIG.maxBallSpeed) {
            this.speed += CONFIG.accelerationFactor;
        }
    }

    checkWallCollision() {
        if (this.y <= CONFIG.ballRadius || this.y >= height - CONFIG.ballRadius) {
            this.directionY *= -1;
        }
    }

    checkPaddleCollision(paddle1, paddle2, updateScore) {
        if (this.x <= 0) {
            updateScore(2);
            this.reset();
            return;
        }
        if (this.x >= width) {
            updateScore(1);
            this.reset();
            return;
        }

        if (this.x <= paddle1.x + paddle1.width + CONFIG.ballRadius &&
            this.y >= paddle1.y &&
            this.y <= paddle1.y + paddle1.height
        ) {
            this.x = paddle1.x + paddle1.width + CONFIG.ballRadius;
            this.directionX *= -1;
            this.accelerate();
        }

        if (this.x >= paddle2.x - CONFIG.ballRadius &&
            this.y >= paddle2.y &&
            this.y <= paddle2.y + paddle2.height
        ) {
            this.x = paddle2.x - CONFIG.ballRadius;
            this.directionX *= -1;
            this.accelerate();
        }
    }
}