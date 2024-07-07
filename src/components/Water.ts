import { Component } from "../engine/Component.js";
import { Sprite } from "../engine/components/Sprite.js";

export class Water extends Component{
    sprite: Sprite;
    
    heightBoat: number;
    heightParachuterSink: number;

    constructor(gameManager){
        super(gameManager);

        const image = new Image();
        image.src = "../../resources/sea.png";

        this.width = image.width * 0.8;
        this.height = image.height * 0.3;
        this.y = gameManager.height - this.height;

        this.sprite = new Sprite(gameManager, image, this.x, this.y)
        gameManager.componentAdd(this.sprite);
        
        this.heightBoat = gameManager.height - this.height / 2 - 20;
        this.heightParachuterSink = gameManager.height - this.height / 2;
        
        this.y = gameManager.height - this.height;
    }
}