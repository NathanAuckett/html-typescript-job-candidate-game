export class Component {
    componentName;
    gameManager;
    id;
    ctx;
    x = 0;
    y = 0;
    width = 10;
    height = 10;
    drawDebug;
    constructor(gameManager, x = 0, y = 0, name = "", drawDebug = false) {
        this.x = x;
        this.y = y;
        this.gameManager = gameManager;
        this.componentName = name;
        this.id = gameManager.getNewID();
        this.ctx = gameManager.ctx;
        this.drawDebug = drawDebug;
    }
    step() { }
    draw() {
        if (this.drawDebug) {
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
