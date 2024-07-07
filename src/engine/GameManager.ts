import { Component } from "./Component.js";

export class GameManager {
    readonly ctx: CanvasRenderingContext2D;
    readonly width: number;
    readonly height: number;

    private componentIDCount: number = 0;
    readonly components: Component[] = [];
    private namedCompMap: Map<string, Component> = new Map<string, Component>();

    readonly fpsLimit: number = 60;
    private frameExpectedMs: number = 1000 / this.fpsLimit;
    private frameTimeCurrent: number = window.performance.now();
    private frameTimeLast: number = this.frameTimeCurrent;

    constructor(canvas: HTMLCanvasElement){
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
    }

    //Run component step logic
    step(){
        for (const comp of this.components){
            comp.step();
        }
    }

    //Run component draw logic
    draw(){
        for (const comp of this.components){
            comp.draw();
        }
    }

    //Run game update loop
    update(){
        this.frameTimeCurrent = performance.now();
        const elapsedTime = this.frameTimeCurrent - this.frameTimeLast;
        
        if (elapsedTime >= this.frameExpectedMs){
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.step();
            this.draw();
            this.frameTimeLast = this.frameTimeCurrent - (elapsedTime % this.frameExpectedMs);
        }
        
        requestAnimationFrame(() => {this.update()});
    }

    //Gives a new id and increments id counter
    getNewID(){
        return ++this.componentIDCount;
    }

    //Adds a new component to the game manager
    componentAdd(component: Component, name = ""){
        this.components.push(component);
        if (name !== ""){
            this.namedCompMap.set(name, component);
        }
    }

    //Gets array of all components that are instances of X class
    componentGetInstancesOf(componentClass: typeof Component){
        const results: Component[] = [];
        for (const comp of this.components){
            if (comp instanceof componentClass){
                results.push(comp);
            }
        }
        return results;
    }

    componentGetFirstInstanceOf(componentClass: typeof Component){
        for (const comp of this.components){
            if (comp instanceof componentClass){
                return comp;
            }
        }
        return -1;
    }

    componentGetNamed(name: string){
        return this.namedCompMap.get(name);
    }

    //Removes a component from the game manager
    componentRemove(componentID: number){
        if (this.components.length > 2){ //Binary search
            let minI = 0;
            let maxI = this.components.length - 1;
            let currentI: number;
            let currentID: number;

            while (minI <= maxI){
                currentI = Math.floor((minI + maxI) / 2);
                currentID = this.components[currentI].id;

                if (currentID < componentID){
                    minI = currentI + 1;
                }
                else if (currentID > componentID){
                    maxI = currentI - 1;
                }
                else{
                    break;
                }
            }

            const componentName = this.components[currentI].componentName as string;
            if (componentName){
                this.namedCompMap.delete(componentName);
            }
            this.components.splice(currentI, 1);

            return true
        }
        else if (this.components.length == 2){ //only 2 components, one or the other
            if (this.components[0].id === componentID){
                this.components.splice(0, 1);
                return true
            }
            else if (this.components[1].id === componentID){
                this.components.splice(1, 1);
                return true
            }
            return false
        }
        else if (this.components.length == 1){ //single component
            if (this.components[0].id === componentID){
                this.components.splice(0, 1);
                return true
            }
            return false
        }
        else{ //there are no components
            console.log("Failed to remove component as components array is empty");
            return false
        }
    }
}
