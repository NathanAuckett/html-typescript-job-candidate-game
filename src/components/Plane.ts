import { Component } from "../engine/Component.js";
import { Sprite } from "../engine/components/Sprite.js";
import { Parachuter } from "./Parachuter.js";

export class Plane extends Component {
    sprite: Sprite;
    spriteElement: HTMLImageElement;
    spriteScale: number;

    spd: number;

    parachutersMax: number;
    parachutersPool: Parachuter[];
    
    dropFrequencyMin: number;
    dropFrequencyMax: number;
    dropLogic: Function;

    constructor(gameManager, x, y){
        super(gameManager);
        this.x = x;
        this.y = y;
        
        this.spriteElement = document.getElementById("plane") as HTMLImageElement;
        this.spriteScale = 0.5;
        this.width = this.spriteElement.width * this.spriteScale;
        this.height = this.spriteElement.height * this.spriteScale - 40;
        this.sprite = gameManager.componentAdd(new Sprite(gameManager, this.spriteElement, this.x, this.y, this.spriteElement.width, this.spriteElement.height, this.spriteScale, this.spriteScale));

        this.spd = 2;

        this.parachutersMax = 10;
        this.parachutersPool = [];
        this.dropFrequencyMin = 200;
        this.dropFrequencyMax = 2500;

        this.dropLogic = function(){
            if (this.x > this.width * 2 && this.x < this.gameManager.width - this.width * 2){
                if (this.parachutersPool.length < this.parachutersMax){
                    this.parachutersPool.push(gameManager.componentAdd(new Parachuter(gameManager, this.x + this.width / 2, this.y + this.height)));
                }
                else{
                    for (const parachuter of this.parachutersPool){
                        if (!parachuter.active){
                            parachuter.reset(this.x + this.width / 2, this.y + this.height);
                            break;
                        }
                    }
                }
                this.dropInterval = setTimeout(() => {this.dropLogic()}, this.dropFrequencyMax - this.dropFrequencyMin * Math.random());
            }
            else{
                this.dropInterval = setTimeout(() => {this.dropLogic()}, 500 * Math.random());
            }
        }

        setTimeout(() => {
            this.dropLogic();
        }, this.dropFrequencyMin + this.dropFrequencyMax - this.dropFrequencyMax * Math.random());
    }

    step(){
        this.x -= this.spd;
        if (this.x < -this.width){
            this.x = this.gameManager.width + 200;
        }

        this.sprite.setPosition(this.x, this.y);
    }

    draw(){}
}