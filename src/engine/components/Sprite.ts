import { Component } from "../Component.js";
import { GameManager } from "../GameManager.js";


export class Sprite extends Component {
    imagePath: string;
    image: HTMLImageElement;
    xScale: number;
    yScale: number;
    visible: boolean;

    constructor(
        gameManager: GameManager,
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number | undefined = undefined,
        height: number| undefined = undefined,
        xScale = 1,
        yScale = 1,
        visible = true
    ){
        super(gameManager, x, y);
        this.image = image;
        this.width = width;
        this.height = height;
        this.xScale = xScale;
        this.yScale = yScale;
        this.visible = visible;
    }

    setPosition(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    draw(x: number = this.x, y: number = this.y){
        if (this.visible){
            this.x = x;
            this.y = y;

            if (this.xScale && this.yScale && this.width && this.height){
                this.ctx.drawImage(this.image, this.x, this.y, this.width * this.xScale, this.height * this.yScale);
            }
            else if (this.width && this.height){
                this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
            else{
                this.ctx.drawImage(this.image, this.x, this.y);
            }
        }
    }
}