import { Component } from "../Component.js";
export class Sprite extends Component {
    imagePath;
    image;
    xScale;
    yScale;
    visible;
    constructor(gameManager, image, x, y, width = undefined, height = undefined, xScale = 1, yScale = 1, visible = true) {
        super(gameManager, x, y);
        this.image = image;
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
                this.ctx.drawImage(this.image, this.x, this.y, this.width * this.xScale, this.height * this.yScale);
            }
            else if (this.width && this.height) {
                this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
            else {
                this.ctx.drawImage(this.image, this.x, this.y);
            }
        }
    }
}
