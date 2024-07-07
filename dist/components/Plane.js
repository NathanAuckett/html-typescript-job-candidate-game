import { Component } from "../engine/Component.js";
import { Sprite } from "../engine/components/Sprite.js";
import { Parachuter } from "./Parachuter.js";
export class Plane extends Component {
    sprite;
    spriteElement = document.getElementById("plane");
    spriteScale = 0.5;
    spd = 2;
    gameOver = false;
    parachutersMax = 5;
    parachutersPool = [];
    dropFrequencyMin = 200;
    dropFrequencyMax = 2000;
    constructor(gameManager, x, y) {
        super(gameManager);
        this.x = x;
        this.y = y;
        this.width = this.spriteElement.width * this.spriteScale;
        this.height = this.spriteElement.height * this.spriteScale - 40;
        this.sprite = new Sprite(gameManager, this.spriteElement, this.x, this.y, this.spriteElement.width, this.spriteElement.height, this.spriteScale, this.spriteScale);
        gameManager.componentAdd(this.sprite);
        this.fillParachuterPool();
        setTimeout(() => {
            this.dropLogic();
        }, this.dropFrequencyMin + this.dropFrequencyMax - this.dropFrequencyMax * Math.random());
    }
    step() {
        this.x -= this.spd;
        if (this.x < -this.width) {
            if (!this.gameOver) {
                this.x = this.gameManager.width + 200;
            }
        }
        this.sprite.setPosition(this.x, this.y);
    }
    dropLogic() {
        if (!this.gameOver) {
            if (this.x > this.width * 2 && this.x < this.gameManager.width - this.width * 2) {
                for (const parachuter of this.parachutersPool) {
                    if (!parachuter.active) {
                        parachuter.reset(this.x + this.width / 2, this.y + this.height);
                        break;
                    }
                }
                setTimeout(() => { this.dropLogic(); }, this.dropFrequencyMax - this.dropFrequencyMin * Math.random());
            }
            else {
                setTimeout(() => { this.dropLogic(); }, 500 * Math.random());
            }
        }
        else {
            setTimeout(() => { this.dropLogic(); }, 2000); //awaiting restart
        }
    }
    fillParachuterPool() {
        for (let i = 0; i < this.parachutersMax; i++) {
            const parachuter = new Parachuter(this.gameManager, 0, -200);
            parachuter.active = false;
            this.parachutersPool.push(parachuter);
            this.gameManager.componentAdd(parachuter);
        }
    }
}
