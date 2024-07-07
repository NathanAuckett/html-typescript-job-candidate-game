import { Component } from "../engine/Component.js";
import { Collider } from "../engine/components/Collider.js";
import { Sprite } from "../engine/components/Sprite.js";
import { GameManager } from "../engine/GameManager.js";
import { Boat } from "./Boat.js";
import { GameOver } from "./GameOver.js";
import { Plane } from "./Plane.js";
import { ScoreKeeper } from "./ScoreKeeper.js";
import { Water } from "./Water.js";

export class Parachuter extends Component{
    sprite: Sprite;
    private spriteElement: HTMLImageElement = document.getElementById("parachuter") as HTMLImageElement;
    private spriteScale: number = 0.5;

    private vspd: number = 0;
    readonly grav: number = 0.05;
    readonly fallSpdMin: number = 1;
    readonly fallSpdMax: number = 2.5;
    maxFallSpd: number = this.fallSpdMin + this.fallSpdMax - this.fallSpdMax * Math.random();

    readonly swaySpd: number = 0.02;
    readonly swayRangeMin: number = 16;
    readonly swayRangeMax: number = 64;
    swayRange: number = this.swayRangeMin + this.swayRangeMax - this.swayRangeMax * Math.random();
    sway: number = 360 * Math.random();
    xStart: number;

    active: boolean = true;
    collider: Collider;
    
    constructor(gameManager: GameManager, x: number, y: number){
        super(gameManager, x, y);
        this.xStart = x;
        
        this.width = this.spriteElement.width * this.spriteScale;
        this.height = this.spriteElement.height * this.spriteScale;

        this.sprite = new Sprite(
			gameManager,
			this.spriteElement,
			this.x,
			this.y,
			this.spriteElement.width,
			this.spriteElement.height,
			this.spriteScale,
			this.spriteScale
		);
        this.collider = new Collider(gameManager, this.x, this.y, this.width, this.height);

        gameManager.componentAdd(this.sprite);
        gameManager.componentAdd(this.collider);
    }

    reset(x, y){
        this.x = x;
        this.y = y;
        this.xStart = x;
        this.vspd = 0;
        this.sway = 360 * Math.random();
        this.swayRange = this.swayRangeMin + this.swayRangeMax - this.swayRangeMax * Math.random();
        this.maxFallSpd = this.fallSpdMin + this.fallSpdMax - this.fallSpdMax * Math.random();
        this.collider.setPosition(this.x, this.y);
        this.sprite.visible = true;
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

            const water = this.gameManager.componentGetNamed("water") as Water;
            if (this.y + this.height * 0.5 > water.heightParachuterSink){
                this.active = false;
                this.sprite.visible = false;
                const scoreKeeper = this.gameManager.componentGetNamed("scoreKeeper") as ScoreKeeper;
                scoreKeeper.lives --;
                //Game Over
                if (scoreKeeper.lives < 0){
                    scoreKeeper.lives = 0; //Don't draw -1 to the screen
                    const gameOverUI = this.gameManager.componentGetNamed("gameOver") as GameOver;
                    gameOverUI.gameOver = true;
                    const boat = this.gameManager.componentGetNamed("boat") as Boat;
                    boat.gameOver = true;
                    const plane = this.gameManager.componentGetNamed("plane") as Plane;
                    plane.gameOver = true;
                }
            }

            this.sprite.setPosition(this.x, this.y);
        }
    }
}