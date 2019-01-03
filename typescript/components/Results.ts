export class Results{
    private competentieNames: Array<string>;
    private competentieResults: Array<number>;

    public constructor(){
        this.competentieNames = new Array();
        this.competentieResults = new Array();
    }

    public addCompetentieName(name: string){
        this.competentieNames.push(name);
    }

    public addCompetentieResult(result: number){
        this.competentieResults.push(result);
    }

    public log(){
        console.log(this.competentieNames)
        console.log(this.competentieResults);
    }
}