import { Component } from "../Component.js";
import { GameManager } from "../GameManager.js";


export class Sprite extends Component {
    imageResource: CanvasImageSource;
    xScale: number;
    yScale: number;
    visible: boolean;

    constructor(
        gameManager:GameManager,
        imageResource: CanvasImageSource,
        x:number,
        y:number,
        width:number | undefined = undefined,
        height:number|undefined = undefined,
        xScale = 1,
        yScale = 1,
        visible = true
    ){
        super(gameManager);
        this.imageResource = imageResource;
        this.x = x;
        this.y = y;
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

    draw(x = this.x, y = this.y){
        if (this.visible){
            this.x = x;
            this.y = y;

            if (this.xScale && this.yScale && this.width && this.height){
                this.ctx.drawImage(this.imageResource, this.x, this.y, this.width * this.xScale, this.height * this.yScale);
            }
            else if (this.width && this.height){
                this.ctx.drawImage(this.imageResource, this.x, this.y, this.width, this.height);
            }
            else{
                this.ctx.drawImage(this.imageResource, this.x, this.y);
            }
        }
    }
}