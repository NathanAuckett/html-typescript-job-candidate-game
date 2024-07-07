import { Component } from "../engine/Component.js";
export class GameOver extends Component {
    gameOver = false;
    gameOverMessage = 'Game Over!';
    constructor(gameManager) {
        super(gameManager);
    }
    draw() {
        if (this.gameOver) {
            //Red overlay
            this.ctx.fillStyle = "rgba(255, 0, 0, 0.6)";
            this.ctx.fillRect(0, 0, this.gameManager.width, this.gameManager.height);
            //Draw text
            this.ctx.fillStyle = "black";
            this.ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
            this.ctx.shadowBlur = 2;
            this.ctx.shadowOffsetX = 5;
            this.ctx.shadowOffsetY = 5;
            this.ctx.font = "60px arial";
            this.ctx.fillText(this.gameOverMessage, this.gameManager.width / 2 - this.ctx.measureText(this.gameOverMessage).width / 2, this.gameManager.height / 2);
            this.ctx.font = "30px arial";
            this.ctx.fillText('Press R to restart', this.gameManager.width / 2 - this.ctx.measureText('Press R to restart').width / 2, this.gameManager.height - 100);
            //Reset shadow to prevent it showing on other components
            this.ctx.shadowColor = "black";
            this.ctx.shadowBlur = 0;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
        }
    }
}
