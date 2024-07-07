import { Component } from "../engine/Component.js";
import { InputManager } from "../engine/components/InputManager.js";
import { Collider } from "../engine/components/Collider.js";
import { Plane } from "./Plane.js";
import { ScoreKeeper } from "./ScoreKeeper.js";
import { Sprite } from "../engine/components/Sprite.js";
import { GameManager } from "../engine/GameManager.js";
import { GameOver } from "./GameOver.js";

export class Boat extends Component {
    sprite: Sprite;
    spriteElement: HTMLImageElement = document.getElementById("boat") as HTMLImageElement;
    spriteScale: number = 0.5;

    hspd: number = 0;
    vspd: number = 0;
    readonly accel: number = 0.3;
    readonly decel: number = 0.15;
    readonly maxSpd: number = 10;
    private mouseX: number = 0;
    private followMouse: boolean = false;
    gameOver: boolean = false;

    inputManager: InputManager;
    collider: Collider;
    
    constructor(gameManager: GameManager, x: number, y: number) {
        super(gameManager, x, y);

        this.width = this.spriteElement.width * this.spriteScale;
        this.height = this.spriteElement.height * this.spriteScale - 40;

        this.sprite = new Sprite(
            gameManager, 
            this.spriteElement, 
            this.x, this.y, 
            this.spriteElement.width, 
            this.spriteElement.height, 
            this.spriteScale, 
            this.spriteScale
        );

        this.inputManager = new InputManager(gameManager);
        this.collider = new Collider(gameManager, this.x, this.y, this.spriteElement.width * this.spriteScale - 10, this.height);

        gameManager.componentAdd(this.sprite);
        gameManager.componentAdd(this.inputManager);
        gameManager.componentAdd(this.collider);
    }

    step(){
        let mouseDown = false;
        let left = 0;
        let right = 0;
        
        //Control
        if (!this.gameOver){
            mouseDown = this.inputManager.check("mouse0");
            left = this.inputManager.check("ArrowLeft") == true ? 1 : 0;
            right = this.inputManager.check("ArrowRight") == true ? 1 : 0;
        }
        else{
            //Restart game
            if (this.inputManager.check("r")){
                const gameOverUI = this.gameManager.componentGetNamed("gameOver") as GameOver;
                gameOverUI.gameOver = false;
                const plane = this.gameManager.componentGetNamed("plane") as Plane;
                plane.gameOver = false;
                const scoreKeeper = this.gameManager.componentGetNamed("scoreKeeper") as ScoreKeeper;
                scoreKeeper.score = 0;
                scoreKeeper.lives = scoreKeeper.startingLives;
                this.gameOver = false;
            }
        }

        //Mouse control
        if (mouseDown){
            this.followMouse = true;
            this.mouseX = this.inputManager.getMouseMoveData().layerX;
        }
        else if (left || right){
            this.followMouse = false;
        }
        
        if (this.followMouse && Math.abs(this.mouseX - this.x - this.width / 2) > 0.1){ //Mouse control
            const dir = Math.sign(this.mouseX - this.x - this.width / 2);
            this.hspd = Math.min(this.maxSpd, Math.abs(this.mouseX - this.x - this.width / 2) * 0.025) * dir;
        }
        else{ //Keyboard control
            const dir = right - left;

            //Acceleration
            this.hspd += this.accel * dir;
            if (this.hspd > this.maxSpd){
                this.hspd = this.maxSpd;
            }
            if (this.hspd < -this.maxSpd){
                this.hspd = -this.maxSpd;
            }

            //Deceleration
            if (this.hspd > 0){
                this.hspd -= this.decel;
                if (this.hspd < 0){
                    this.hspd = 0;
                }
            }
            else if (this.hspd < 0){
                this.hspd += this.decel;
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

        //Update position
        this.x += this.hspd;
        this.y += this.vspd;

        //Collision check with parachuters
        const plane = this.gameManager.componentGetNamed("plane") as Plane;
        for (const parachuter of plane.parachutersPool){
            if (parachuter.active && this.collider.collide(parachuter.collider, this.x, this.y)){
                parachuter.active = false;
                parachuter.sprite.visible = false;
                const scoreKeeper = this.gameManager.componentGetNamed("scoreKeeper") as ScoreKeeper;
                scoreKeeper.score ++
            }
        }

        //Position our sprite
        this.sprite.setPosition(this.x, this.y - 35);
    }
}