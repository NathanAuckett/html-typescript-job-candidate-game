import { GameManager } from "./engine/GameManager.js";
import { Boat } from "./components/Boat.js";
import { Plane } from "./components/Plane.js";
import { Water } from "./components/Water.js";
import { ScoreKeeper } from "./components/ScoreKeeper.js";
window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 500;
    const gameManager = new GameManager(canvas);
    gameManager.componentAdd(new Water(gameManager), "water");
    gameManager.componentAdd(new Boat(gameManager, canvas.width / 2 - 50, canvas.height - 48));
    gameManager.componentAdd(new Plane(gameManager, canvas.width - 200, 32), "plane");
    gameManager.componentAdd(new ScoreKeeper(gameManager), "scoreKeeper");
    gameManager.update();
});
