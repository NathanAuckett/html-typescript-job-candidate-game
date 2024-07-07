import { GameManager } from "./GameManager.js";

export class Component {
    readonly componentName: string;
    readonly gameManager: GameManager;
    readonly id: number;
    readonly ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(gameManager, name = "") {
        this.gameManager = gameManager;
        this.componentName = name;
        this.id = gameManager.getNewID();
        this.ctx = gameManager.ctx;
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 10;
        
    }

    step(){}

    draw(){
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}