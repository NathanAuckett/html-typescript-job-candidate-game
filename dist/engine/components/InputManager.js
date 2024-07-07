import { Component } from "../Component.js";
export class InputManager extends Component {
    keys = [];
    constructor(gameManager) {
        super(gameManager);
        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', (e) => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
        });
    }
    check(key) {
        return this.keys.indexOf(key) > -1;
    }
}
