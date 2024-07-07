import { Component } from "../engine/Component.js";
import { Sprite } from "../engine/components/Sprite.js";
import { Parachuter } from "./Parachuter.js";
export class Plane extends Component {
    sprite;
    spriteScale = 0.5;
    spd = 2;
    parachutersMax = 10;
    parachutersPool = [];
    dropFrequencyMin = 200;
    dropFrequencyMax = 2000;
    constructor(gameManager, x, y) {
        super(gameManager);
        this.x = x;
        this.y = y;
        const image = new Image();
        image.src = "../../resources/plane.png";
        this.width = image.width * this.spriteScale;
        this.height = image.height * this.spriteScale - 40;
        this.sprite = new Sprite(gameManager, image, this.x, this.y, image.width, image.height, this.spriteScale, this.spriteScale);
        gameManager.componentAdd(this.sprite);
        setTimeout(() => {
            this.dropLogic();
        }, this.dropFrequencyMin + this.dropFrequencyMax - this.dropFrequencyMax * Math.random());
    }
    step() {
        this.x -= this.spd;
        if (this.x < -this.width) {
            this.x = this.gameManager.width + 200;
        }
        this.sprite.setPosition(this.x, this.y);
    }
    dropLogic() {
        if (this.x > this.width * 2 && this.x < this.gameManager.width - this.width * 2) {
            if (this.parachutersPool.length < this.parachutersMax) {
                const parachuter = new Parachuter(this.gameManager, this.x + this.width / 2, this.y + this.height);
                this.gameManager.componentAdd(parachuter);
                this.parachutersPool.push(parachuter);
            }
            else {
                for (const parachuter of this.parachutersPool) {
                    if (!parachuter.active) {
                        parachuter.reset(this.x + this.width / 2, this.y + this.height);
                        break;
                    }
                }
            }
            setTimeout(() => { this.dropLogic(); }, this.dropFrequencyMax - this.dropFrequencyMin * Math.random());
        }
        else {
            setTimeout(() => { this.dropLogic(); }, 500 * Math.random());
        }
    }
}
