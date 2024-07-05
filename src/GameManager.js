export class GameManager {
    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');

        this.componentIDCount = -1;
        this.components = [];

        //Limit game fps
        this.fpsLimit = 120;
        this.frameExpectedMs = 1000 / this.fpsLimit;
        this.frameTimeCurrent = window.performance.now();
        this.frameTimeLast = this.frameTimeCurrent;
        
        //Track browser FPS
        this.frameCounter = 0;
        this.fpsTrackCurrent = window.performance.now();
        this.fpsTrackLast = this.fpsTrackCurrent;
        this.fps = 0;
    }

    step(){
        for (const comp of this.components){
            comp.step();
        }
    }

    draw(){
        for (const comp of this.components){
            comp.draw();
        }
    }

    update(){
        //Track browser fps
        this.frameCounter ++;
        //console.log(this.frameCounter);
        if (window.performance.now() - this.fpsTrackLast >= 1000){
            this.fps = this.frameCounter;
            this.frameCounter = 0;
            this.fpsTrackLast = window.performance.now();
        }
        
        //Update game at max fps
        this.frameTimeCurrent = window.performance.now();
        if (this.frameTimeCurrent - this.frameTimeLast >= this.frameExpectedMs){
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.step();
            this.draw();
            this.frameTimeLast = this.frameTimeCurrent;
        }
        
        requestAnimationFrame(() => {this.update()});
    }

    giveID(){
        this.componentIDCount ++;
        return this.componentIDCount;
    }

    componentAdd(component){
        this.components.push(component);
        return component;
    }

    componentGetInstancesOf(componentClass){
        const results = [];
        for (const comp of this.components){
            if (comp instanceof componentClass){
                results.push(comp);
            }
        }
        return results;
    }

    componentRemove(componentID){
        if (this.components.length > 2){ //Binary search
            let minI = 0;
            let maxI = this.components.length - 1;
            let currentI
            let currentID;

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
            this.components.splice(currentI, 1);
            return true
        }
        else if (this.components.length == 2){
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
        else if (this.components.length == 1){
            if (this.components[0].id === componentID){
                this.components.splice(0, 1);
                return true
            }
            return false
        }
        else{
            console.log("Failed to remove component as components array is empty");
            return false
        }
    }
}
