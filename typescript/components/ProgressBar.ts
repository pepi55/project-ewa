export class ProgressBar{
    private newProgress: number;
    private oldProgress: number;
    private maxProgress: number;

    public constructor(newProgress: number, maxProgress: number){
        this.newProgress = newProgress;
        this.maxProgress = maxProgress;
        this.oldProgress = 0;
    }

    public addOldProgress(oldProgress: number){
        this.oldProgress = oldProgress;
    }

    public getView(){
        let multiplier = 100 / this.maxProgress;
        const view = `
        <div id="mainProgressBar" class="mdl-progress mdl-js-progress is-upgraded" data-upgraded=",MaterialProgress">
            <div class="progressbar bar bar1" style="width: ${(this.newProgress * multiplier)}%;">
            </div>
            <div class="bufferbar bar bar2" style="width: ${(this.oldProgress * multiplier)}%;">
            </div>
            <div class="auxbar bar bar3" style="width: 100%;">
            </div>
        </div>`
        return view;
    }
}