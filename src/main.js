import { GameManager } from "./GameManager.js";
import { Player } from "./Player.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 500;

    const gameManager = new GameManager(canvas);

    gameManager.componentAdd(new Player(gameManager, canvas.width / 2 - 50, canvas.height - 100));
    
    gameManager.update();
});