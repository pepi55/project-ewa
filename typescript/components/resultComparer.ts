import { Result } from "./Result";

export class resultComparer {
    private newResults: Array<Result>
    private oldResults: Array<Result>

    public constructor(){
        this.newResults = new Array();
        this.oldResults = new Array();
    }

    public setNewResults(newResults: Array<Result>){
        this.newResults = this.getSortedArray(newResults)
    }

    public setOldResults(oldResults: Array<Result>){
        this.oldResults = this.getSortedArray(oldResults)
    }

    private getSortedArray(toSrot: Array<Result>){
        let temparray: Array<Result> = new Array;
        for (let result of toSrot){
            let i = 0;
            for (let result2 of temparray){
                if (result2.getCompetencieId() > result.getCompetencieId()){
                    temparray.splice(i, 0, result);
                    break;
                } else i++;
            }
            if (temparray.length == i){
                temparray.splice(i, 0, result);
            }
        }
        console.log(temparray);
        return temparray;
    }
}