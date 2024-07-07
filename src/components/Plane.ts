import { Component } from "../engine/Component.js";
import { Parachuter } from "./Parachuter.js";

export class Plane extends Component {
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
        this.width = 128;
        this.height = 64;

        this.spd = 2;

        this.parachutersMax = 10;
        this.parachutersPool = [];

        this.dropFrequencyMin = 200;
        this.dropFrequencyMax = 2500;

        this.dropLogic = function(){
            if (this.x > this.width && this.x < this.gameManager.width - this.width){
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
    }
    draw(){
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}