import { Component } from "../engine/Component.js";
import { Collider } from "../engine/components/Collider.js";
import { Sprite } from "../engine/components/Sprite.js";
export class Parachuter extends Component {
    sprite;
    spriteElement;
    spriteScale;
    xStart;
    vspd;
    hspd;
    grav;
    fallSpdMin;
    fallSpdMax;
    maxFallSpd;
    swayRangeMin;
    swayRangeMax;
    swayRange;
    sway;
    swaySpd;
    active;
    collider;
    constructor(gameManager, x, y) {
        super(gameManager);
        this.x = x;
        this.y = y;
        this.xStart = x;
        this.spriteElement = document.getElementById("parachuter");
        this.spriteScale = 0.5;
        this.width = this.spriteElement.width * this.spriteScale;
        this.height = this.spriteElement.height * this.spriteScale;
        this.sprite = gameManager.componentAdd(new Sprite(gameManager, this.spriteElement, this.x, this.y, this.spriteElement.width, this.spriteElement.height, this.spriteScale, this.spriteScale));
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
    reset(x, y) {
        this.x = x;
        this.xStart = x;
        this.y = y;
        this.vspd = 0;
        this.hspd = 0;
        this.sway = 360 * Math.random();
        this.swayRange = this.swayRangeMin + this.swayRangeMax - this.swayRangeMax * Math.random();
        this.maxFallSpd = this.fallSpdMin + this.fallSpdMax - this.fallSpdMax * Math.random();
        this.collider.setPosition(this.x, this.y);
        this.sprite.visible = true;
        this.active = true;
    }
    step() {
        if (this.active) {
            if (this.vspd < this.maxFallSpd) {
                this.vspd += this.grav;
                if (this.vspd > this.maxFallSpd) {
                    this.vspd = this.maxFallSpd;
                }
            }
            this.sway += this.swaySpd;
            this.sway = this.sway % 360;
            this.x = this.xStart + this.swayRange * Math.sin(this.sway);
            this.y += this.vspd;
            this.collider.setPosition(this.x, this.y);
            const water = this.gameManager.componentGetNamed("water");
            if (this.y + this.height * 0.5 > water.heightParachuterSink) {
                this.active = false;
                this.sprite.visible = false;
                const scoreKeeper = this.gameManager.componentGetNamed("scoreKeeper");
                scoreKeeper.lives--;
            }
            this.sprite.setPosition(this.x, this.y);
        }
    }
    draw() {
        // if (this.active){
        //     this.ctx.fillStyle = "green";
        //     this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // }
    }
}
