import { Component } from "../engine/Component.js";

export class ScoreKeeper extends Component{
    score: number;
    lives: number;

    constructor(gameManager){
        super(gameManager);

        this.score = 0;
        this.lives = 3;
    }

    draw(){
        this.ctx.fillStyle = "black";
        this.gameManager.ctx.font = "50px Arial";
        this.gameManager.ctx.fillText(`Score: ${this.score}`, 10, 50);
        this.gameManager.ctx.fillText(` Lives: ${this.lives}`, 10, 100);
    }
}