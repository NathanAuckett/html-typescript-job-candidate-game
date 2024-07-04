import { Component } from "./Component.js";

import { InputManager } from "./InputManager.js";

export class Player extends Component {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;

        this.hspd = 0;
        this.vspd = 0;
        this.grav = 0.5;
        this.jumpPower = 15;

        this.grounded = false;

        this.inputManager = new InputManager();
    }

    step(){
        if (!this.grounded){
            this.vspd += this.grav;

            if (this.y + this.vspd >= this.game.height - this.height){
                this.y = this.game.height - this.height;
                this.vspd = 0;
                this.grounded = true;
            }
        }
        else{
            if (this.inputManager.check(" ")){
                this.vspd = -this.jumpPower;
                this.grounded = false;
            }
        }

        this.x += this.hspd;
        this.y += this.vspd;
    }

    draw(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}