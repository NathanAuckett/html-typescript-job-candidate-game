import { Component } from "../engine/Component.js";

export class Water extends Component{
    constructor(gameManager){
        super(gameManager);
        this.width = gameManager.width;
        this.height = 32;
        this.x = 0;
        this.y = gameManager.height - this.height;
    }

    draw(){
        this.ctx.fillStyle = "aqua";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}