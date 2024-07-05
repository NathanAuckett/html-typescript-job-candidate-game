import { Component } from "./Component.js";
import { InputManager } from "./InputManager.js";
import { Collider } from "./Collider.js";
import { Parachuter } from "./Parachuter.js";

export class Boat extends Component {
    constructor(gameManager, x, y) {
        super(gameManager);
        this.x = x;
        this.y = y;
        this.width = 128;
        this.height = 32;

        this.hspd = 0;
        this.vspd = 0;
        this.accel = 0.15;
        this.maxSpd = 10;

        this.grounded = false;

        this.inputManager = new InputManager();
        this.collider = gameManager.componentAdd(new Collider(gameManager, this.x, this.y, this.width, this.height));
    }

    step(){
        //Control
        const dir = this.inputManager.check("ArrowRight") - this.inputManager.check("ArrowLeft");
        this.hspd += this.accel * dir;
        if (this.hspd > this.maxSpd){
            this.hspd = this.maxSpd;
        }
        if (this.hspd < -this.maxSpd){
            this.hspd = -this.maxSpd;
        }
        //Deceleration
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

        //Prevent leaving edges of canvas
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

        //Collision check with parachuters
        const parachuters = this.gameManager.plane.parachutersPool;
        for (const parachuter of parachuters){
            if (parachuter.active && this.collider.collide(parachuter.collider, this.x, this.y)){
                parachuter.active = false;
                this.gameManager.scoreKeeper.score ++;
            }
        }
    }

    draw(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}