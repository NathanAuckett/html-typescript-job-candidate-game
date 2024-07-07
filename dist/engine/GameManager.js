export class GameManager {
    ctx;
    width;
    height;
    componentIDCount = 0;
    components = [];
    namedCompMap = new Map();
    fpsLimit = 60;
    frameExpectedMs = 1000 / this.fpsLimit;
    frameTimeCurrent = window.performance.now();
    frameTimeLast = this.frameTimeCurrent;
    constructor(canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
    }
    //Run component step logic
    step() {
        for (const comp of this.components) {
            comp.step();
        }
    }
    //Run component draw logic
    draw() {
        for (const comp of this.components) {
            comp.draw();
        }
    }
    //Run game update loop
    update() {
        this.frameTimeCurrent = performance.now();
        const elapsedTime = this.frameTimeCurrent - this.frameTimeLast;
        if (elapsedTime >= this.frameExpectedMs) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.step();
            this.draw();
            this.frameTimeLast = this.frameTimeCurrent - (elapsedTime % this.frameExpectedMs);
        }
        requestAnimationFrame(() => { this.update(); });
    }
    //Gives a new id and increments id counter
    getNewID() {
        return ++this.componentIDCount;
    }
    //Adds a new component to the game manager
    componentAdd(component, name = "") {
        this.components.push(component);
        if (name !== "") {
            this.namedCompMap.set(name, component);
        }
    }
    //Gets array of all components that are instances of X class
    componentGetInstancesOf(componentClass) {
        const results = [];
        for (const comp of this.components) {
            if (comp instanceof componentClass) {
                results.push(comp);
            }
        }
        return results;
    }
    componentGetFirstInstanceOf(componentClass) {
        for (const comp of this.components) {
            if (comp instanceof componentClass) {
                return comp;
            }
        }
        return -1;
    }
    componentGetNamed(name) {
        return this.namedCompMap.get(name);
    }
    //Removes a component from the game manager
    componentRemove(componentID) {
        if (this.components.length > 2) { //Binary search
            let minI = 0;
            let maxI = this.components.length - 1;
            let currentI;
            let currentID;
            while (minI <= maxI) {
                currentI = Math.floor((minI + maxI) / 2);
                currentID = this.components[currentI].id;
                if (currentID < componentID) {
                    minI = currentI + 1;
                }
                else if (currentID > componentID) {
                    maxI = currentI - 1;
                }
                else {
                    break;
                }
            }
            const componentName = this.components[currentI].componentName;
            if (componentName) {
                this.namedCompMap.delete(componentName);
            }
            this.components.splice(currentI, 1);
            return true;
        }
        else if (this.components.length == 2) { //only 2 components, one or the other
            if (this.components[0].id === componentID) {
                this.components.splice(0, 1);
                return true;
            }
            else if (this.components[1].id === componentID) {
                this.components.splice(1, 1);
                return true;
            }
            return false;
        }
        else if (this.components.length == 1) { //single component
            if (this.components[0].id === componentID) {
                this.components.splice(0, 1);
                return true;
            }
            return false;
        }
        else { //there are no components
            console.log("Failed to remove component as components array is empty");
            return false;
        }
    }
}
