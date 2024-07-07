import { Component } from "../Component.js";
export class Collider extends Component {
    constructor(gameManager, x, y, width, height, drawDebug = false) {
        super(gameManager, x, y);
        this.width = width;
        this.height = height;
        this.drawDebug = drawDebug;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    collide(otherCollider, x = this.x, y = this.y) {
        this.x = x;
        this.y = y;
        if (otherCollider instanceof Collider) {
            return !(this.x + this.width < otherCollider.x ||
                this.x > otherCollider.x + otherCollider.width ||
                this.y + this.height < otherCollider.y ||
                this.y > otherCollider.y + otherCollider.height);
        }
        else {
            console.log("Input object is not an instance of Collider");
            return false;
        }
    }
    draw() {
        if (this.drawDebug) {
            this.ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
