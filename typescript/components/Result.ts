export class Result{
    private competencieId: number;
    private competencieScore: number;

    public constructor(id: number, score: number){
        this.competencieId = id;
        this.competencieScore = score;
    }
    
    public log(){
        console.log(this.competencieId)
        console.log(this.competencieScore);
    }
}