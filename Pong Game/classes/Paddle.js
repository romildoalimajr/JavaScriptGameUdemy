import { CONFIG } from "../config.js";
import { ctx, height } from "../dom.js";

export class Paddle {
    constructor(x, color) {
        this.width = 23;
        this.height = 100;
        this.x = x;
        this.y = (height - this.height) / 2;
        this.color = color;
    }

    move(up) {
        if (up && this.y > 0) {
            this.y -= CONFIG.paddleSpeed;
        } else if (!up && this.y < height - this.height) this.y += CONFIG.paddleSpeed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = CONFIG.paddleBorder;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}