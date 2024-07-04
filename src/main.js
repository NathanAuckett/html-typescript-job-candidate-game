import { GameManager } from "./GameManager.js";
import { Player } from "./Player.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 500;

    const gameManager = new GameManager(canvas);

    gameManager.addComponent(new Player(gameManager, 100, 100));
    gameManager.addComponent(new Player(gameManager, 300, 300));
    
    gameManager.update();
});