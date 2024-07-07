import { Component } from "../Component.js";
import { GameManager } from "../GameManager.js";

export class InputManager extends Component{
    private keys: string[] = [];
    private lastMouseButtonDown:MouseEvent = <MouseEvent>{};
    private lastMouseButtonUp:MouseEvent = <MouseEvent>{};
    private mouseMoveData:MouseEvent;

    constructor(gameManager: GameManager){
        super(gameManager);

        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            const index = this.keys.indexOf(e.key);
            if (index > -1){
                this.keys.splice(index, 1);
            }
        });

        window.addEventListener('mousedown', (e) => {
            const butStr = `mouse${e.button}`;
            if (this.keys.indexOf(butStr) === -1){
                this.keys.push(butStr);
                this.lastMouseButtonDown = e;
            }
        });

        window.addEventListener('mouseup', (e) => {
            const butStr = `mouse${e.button}`;
            const index = this.keys.indexOf(butStr); 
            if (index > -1){
                this.keys.splice(index, 1);
                this.lastMouseButtonUp = e;
            }
        });

        window.addEventListener('mousemove', (e) => {
            this.mouseMoveData = e;
        });
    }

    check(key: string){
        return this.keys.indexOf(key) > -1;
    }

    getLastMouseButtonDown(){
        return this.lastMouseButtonDown;
    }

    getLastMouseButtonUp(){
        return this.lastMouseButtonUp;
    }

    getMouseMoveData(){
        return this.mouseMoveData;
    }
}