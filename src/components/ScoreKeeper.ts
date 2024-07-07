import { Component } from "../engine/Component.js";
import { GameManager } from "../engine/GameManager.js";

export class ScoreKeeper extends Component{
    score: number = 0;
    startingLives = 3;
    lives: number = this.startingLives;

    constructor(gameManager: GameManager){
        super(gameManager);
    }

    draw(){
        this.ctx.fillStyle = "black";
        this.gameManager.ctx.font = "50px Arial";
        this.gameManager.ctx.fillText(`Score: ${this.score}`, 10, 50);
        this.gameManager.ctx.fillText(` Lives: ${this.lives}`, 10, 100);
    }
}