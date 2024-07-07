import { GameManager } from "./engine/GameManager.js";
import { Boat } from "./components/Boat.js";
import { Plane } from "./components/Plane.js";
import { Water } from "./components/Water.js";
import { ScoreKeeper } from "./components/ScoreKeeper.js";
import { Sprite } from "./engine/components/Sprite.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = 800;
    canvas.height = 500;

    const gameManager = new GameManager(canvas);

    const background = new Image();
    background.src = "../resources/background.png";
    gameManager.componentAdd(new Sprite(gameManager, background, 0, 0, background.width, background.height, canvas.width / background.width, canvas.height / background.height));
    const water = new Water(gameManager);
    gameManager.componentAdd(water, "water");
    gameManager.componentAdd(new Boat(gameManager, canvas.width / 2 - 50, water.heightBoat));
    gameManager.componentAdd(new Plane(gameManager, canvas.width - 200, 32), "plane");
    gameManager.componentAdd(new ScoreKeeper(gameManager), "scoreKeeper");

    gameManager.update();
});