import { Component } from "../engine/Component.js";
export class ScoreKeeper extends Component {
    score = 0;
    startingLives = 3;
    lives = this.startingLives;
    constructor(gameManager) {
        super(gameManager);
    }
    draw() {
        this.ctx.fillStyle = "black";
        this.gameManager.ctx.font = "50px Arial";
        this.gameManager.ctx.fillText(`Score: ${this.score}`, 10, 50);
        this.gameManager.ctx.fillText(` Lives: ${this.lives}`, 10, 100);
    }
}
