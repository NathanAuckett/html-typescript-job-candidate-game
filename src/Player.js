import { Component } from "./Component.js";
import { InputManager } from "./InputManager.js";
import { Collider } from "./Collider.js";

export class Player extends Component {
    constructor(gameManager, x, y) {
        super(gameManager);
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
        this.collider = gameManager.componentAdd(new Collider(gameManager, this.x, this.y, this.width, this.height));
    }

    step(){
        if (!this.grounded){ // In Air
            this.vspd += this.grav;

            if (this.y + this.vspd >= this.gameManager.height - this.height){
                this.y = this.gameManager.height - this.height;
                this.vspd = 0;
                this.grounded = true;
            }
        }
        else{ // On ground
            if (this.inputManager.check(" ")){
                this.vspd = -this.jumpPower;
                this.grounded = false;
            }
        }

        //Collision check
        const players = this.gameManager.componentGetInstancesOf(Player);
        for (const player of players){
            if (player.id != this.id && this.collider.collide(player.collider, this.x, this.y)){
                console.log("Collision!");
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