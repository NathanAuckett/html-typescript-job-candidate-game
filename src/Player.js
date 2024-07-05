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
        this.accel = 0.2;
        this.maxSpd = 10;

        this.grounded = false;

        this.inputManager = new InputManager();
        this.collider = gameManager.componentAdd(new Collider(gameManager, this.x, this.y, this.width, this.height));
    }

    step(){
        const dir = this.inputManager.check("ArrowRight") - this.inputManager.check("ArrowLeft");
        this.hspd += this.accel * dir;
        if (this.hspd > this.maxSpd){
            this.hspd = this.maxSpd;
        }
        if (this.hspd < -this.maxSpd){
            this.hspd = -this.maxSpd;
        }

        if (dir == 0){
            if (this.hspd > 0){
                this.hspd -= this.accel;
                if (this.hspd < 0){
                    this.hspd = 0;
                }
            }
            else if (this.hspd < 0){
                this.hspd += this.accel;
                if (this.hspd > 0){
                    this.hspd = 0;
                }
            }
        }

        if (this.x + this.hspd < 0){
            this.x = 0;
            this.hspd = 0;
        }
        if (this.x + this.hspd > this.gameManager.width - this.width){
            this.x = this.gameManager.width - this.width;
            this.hspd = 0;
        }

        this.x += this.hspd;
        this.y += this.vspd;

        //Collision check
        // const players = this.gameManager.componentGetInstancesOf(Player);
        // for (const player of players){
        //     if (player.id != this.id && this.collider.collide(player.collider, this.x, this.y)){
        //         console.log("Collision!");
        //     }
        // }
    }

    draw(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}