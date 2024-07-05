import { Component } from "./Component.js";
import { Collider } from "./Collider.js";

export class Parachuter extends Component{
    constructor(gameManager, x, y){
        super(gameManager);
        this.gameManager = gameManager;
        this.x = x;
        this.xStart = x;
        this.y = y;
        this.width = 8;
        this.height = 32;

        this.vspd = 0;
        this.hspd = 0;

        this.grav = 0.05;
        this.fallSpdMin = 1;
        this.fallSpdMax = 2.5;
        this.maxFallSpd = this.fallSpdMin + this.fallSpdMax - this.fallSpdMax * Math.random();

        this.swayRangeMin = 16;
        this.swayRangeMax = 64;
        this.swayRange = this.swayRangeMin + this.swayRangeMax - this.swayRangeMax * Math.random();
        this.sway = 360 * Math.random();
        this.swaySpd = 0.02;

        this.active = true;

        this.collider = gameManager.componentAdd(new Collider(gameManager, this.x, this.y, this.width, this.height));
    }

    reset(x, y){
        this.x = x;
        this.xStart = x;
        this.y = y;
        this.vspd = 0;
        this.hspd = 0;
        this.sway = 360 * Math.random();
        this.swayRange = this.swayRangeMin + this.swayRangeMax - this.swayRangeMax * Math.random();
        this.maxFallSpd = this.fallSpdMin + this.fallSpdMax - this.fallSpdMax * Math.random();
        this.collider.setPosition(this.x, this.y);
        this.active = true;
    }

    step(){
        if (this.active){
            if (this.vspd < this.maxFallSpd){
                this.vspd += this.grav;
                if (this.vspd > this.maxFallSpd){
                    this.vspd = this.maxFallSpd
                }
            }

            this.sway += this.swaySpd;
            this.sway = this.sway % 360;
            this.x = this.xStart + this.swayRange * Math.sin(this.sway);

            this.y += this.vspd;

            this.collider.setPosition(this.x, this.y);

            if (this.y + this.height * 0.5 > this.gameManager.height - this.gameManager.water.height){
                this.gameManager.scoreKeeper.lives --;
                this.active = false;
            }
        }
    }

    draw(){
        if (this.active){
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}