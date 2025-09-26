export function clearBoard(ctx, boardBackground, gameWidth, gameHeight) {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

export function drawFood(ctx, foodPosX, foodPosY, unitSize) {
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🍊", foodPosX + unitSize / 2, foodPosY + unitSize / 2);
}

export function drawSnake(ctx, snakeBody, unitSize) {
    snakeBody.forEach((part, index) => {
        const gradientFactor = index / snakeBody.length;
        const red = Math.round(34 + gradientFactor * (144 - 34));
        const green = Math.round(139 + gradientFactor * (238 - 139));
        const blue = Math.round(34 + gradientFactor * (144 - 34));

        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.strokeStyle = ctx.fillStyle;

        ctx.fillRect(part.x, part.y, unitSize, unitSize);
        ctx.strokeRect(part.x, part.y, unitSize, unitSize);
    });
}

export function displayGameOver(ctx, gameWidth, gameHeight) {
    ctx.font = "62px Brush Script MT";
    ctx.textAlign = "center"
    ctx.fillStyle = " #490000";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);

}