export class GameManager {
    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');

        this.componentIDCount = -1;
        this.components = [];

        this.FPSLimit = 60;
        this.frameExpectedMs = 1000 / this.FPSLimit;
        this.frameTimeCurrent = window.performance.now();
        this.frameTimeLast = this.frameTimeCurrent;
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
        return component.id;
    }

    componentRemove(componentID){ //this doesn't work
        if (this.components.length > 2){
            let minI = 0;
            let maxI = this.components.length - 1;
            let currentI
            let currentID;

            while (minI <= maxI){
                currentI = Math.floor((minI + maxI) / 2);
                console.log(currentI);
                componentID = this.components[currentI].id;

                if (currentID < componentID){
                    minI = currentI + 1;
                }
                else if (currentID > componentID){
                    maxI = currentI - 1;
                }
                else{
                    console.log("end", currentI);
                    break;
                }
            }

            this.components.splice(currentI, 1);
            
        }
        else if (this.components.length == 2){
            if (this.components[0].id == componentID){
                this.components.splice(0, 1);
            }
            else if (this.components[1].id == componentID){
                delete
                this.components.splice(1, 1);
            }
        }
        else if (this.components.length == 1){
            this.components.splice(0, 1);
        }
        else{
            console.log("Failed to remove component as components array is empty");
        }
        
    }

}
