export class Component {
    constructor(gameManager) {
        this.game = gameManager;
        this.id = gameManager.giveID();
        this.ctx = gameManager.ctx;
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 10;
    }

    step(){

    }

    draw(){
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}