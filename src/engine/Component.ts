import { GameManager } from "./GameManager.js";

export class Component {
    readonly componentName: string;
    readonly gameManager: GameManager;
    readonly id: number;
    readonly ctx: CanvasRenderingContext2D;
    
    x: number = 0;
    y: number = 0;
    width: number = 10;
    height: number = 10;
    drawDebug: boolean;

    constructor(gameManager: GameManager, x: number = this.x, y: number = this.y, name: string= "", drawDebug = false){
        this.x = x;
        this.y = y;
        this.gameManager = gameManager;
        this.componentName = name;
        this.id = gameManager.getNewID();
        this.ctx = gameManager.ctx;
        this.drawDebug = drawDebug;
    }

    step(){}

    draw(){
        if (this.drawDebug){
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}