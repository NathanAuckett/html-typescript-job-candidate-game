import { GameManager } from "./GameManager.js";
import { Boat } from "./Boat.js";
import { Plane } from "./Plane.js";
import { Water } from "./Water.js";
import { ScoreKeeper } from "./ScoreKeeper.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 500;

    const gameManager = new GameManager(canvas);

    gameManager.water = gameManager.componentAdd(new Water(gameManager));
    gameManager.componentAdd(new Boat(gameManager, canvas.width / 2 - 50, canvas.height - 48));
    gameManager.plane = gameManager.componentAdd(new Plane(gameManager, canvas.width - 200, 32));
    gameManager.scoreKeeper = gameManager.componentAdd(new ScoreKeeper(gameManager));
    
    gameManager.update();
});