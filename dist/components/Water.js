import { Component } from "../engine/Component.js";
import { Sprite } from "../engine/components/Sprite.js";
export class Water extends Component {
    sprite;
    spriteElement;
    heightBoat;
    heightParachuterSink;
    constructor(gameManager) {
        super(gameManager);
        this.spriteElement = document.getElementById("water");
        this.width = this.spriteElement.width * 0.8;
        this.height = this.spriteElement.height * 0.3;
        this.heightBoat = gameManager.height - this.height / 2 - 20;
        this.heightParachuterSink = gameManager.height - this.height / 2;
        this.x = 0;
        this.y = gameManager.height - this.height;
        this.sprite = gameManager.componentAdd(new Sprite(gameManager, this.spriteElement, this.x, this.y, this.spriteElement.width, this.spriteElement.height));
    }
    draw() { }
}
