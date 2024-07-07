import { Component } from "../engine/Component.js";
import { Collider } from "../engine/components/Collider.js";
import { Sprite } from "../engine/components/Sprite.js";
export class Parachuter extends Component {
    sprite;
    spriteElement = document.getElementById("parachuter");
    spriteScale = 0.5;
    xStart;
    vspd = 0;
    hspd = 0;
    grav = 0.05;
    fallSpdMin = 1;
    fallSpdMax = 2.5;
    maxFallSpd = this.fallSpdMin + this.fallSpdMax - this.fallSpdMax * Math.random();
    swaySpd = 0.02;
    swayRangeMin = 16;
    swayRangeMax = 64;
    swayRange = this.swayRangeMin + this.swayRangeMax - this.swayRangeMax * Math.random();
    sway = 360 * Math.random();
    active = true;
    collider;
    constructor(gameManager, x, y) {
        super(gameManager, x, y);
        this.xStart = x;
        this.width = this.spriteElement.width * this.spriteScale;
        this.height = this.spriteElement.height * this.spriteScale;
        this.sprite = new Sprite(gameManager, this.spriteElement, this.x, this.y, this.spriteElement.width, this.spriteElement.height, this.spriteScale, this.spriteScale);
        this.collider = new Collider(gameManager, this.x, this.y, this.width, this.height);
        gameManager.componentAdd(this.sprite);
        gameManager.componentAdd(this.collider);
    }
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.xStart = x;
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
}
