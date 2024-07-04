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

    addComponent(component){
        this.components.push(component);
        return this.components.indexOf(component);
    }
}
