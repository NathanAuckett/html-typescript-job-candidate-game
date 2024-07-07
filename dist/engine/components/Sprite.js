import { Component } from "../Component.js";
export class Sprite extends Component {
    imageResource;
    xScale;
    yScale;
    visible;
    constructor(gameManager, imageResource, x, y, width = undefined, height = undefined, xScale = 1, yScale = 1, visible = true) {
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
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(x = this.x, y = this.y) {
        if (this.visible) {
            this.x = x;
            this.y = y;
            if (this.xScale && this.yScale && this.width && this.height) {
                this.ctx.drawImage(this.imageResource, this.x, this.y, this.width * this.xScale, this.height * this.yScale);
            }
            else if (this.width && this.height) {
                this.ctx.drawImage(this.imageResource, this.x, this.y, this.width, this.height);
            }
            else {
                this.ctx.drawImage(this.imageResource, this.x, this.y);
            }
        }
    }
}
