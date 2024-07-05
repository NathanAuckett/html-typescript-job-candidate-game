import { GameManager } from "./GameManager.js";
import { Player } from "./Player.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 500;

    const gameManager = new GameManager(canvas);

    gameManager.componentAdd(new Player(gameManager, 0, 100));
    gameManager.componentAdd(new Player(gameManager, 0, 300));
    
    gameManager.update();
});