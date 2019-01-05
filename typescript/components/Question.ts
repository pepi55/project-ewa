export class Question{
    private id: number;
    private question: string;
    //private competencyId : number;


    public constructor(id:number, question:string){
        this.id = id;
        this.question = question;
        //this.competencyId = competencyId;
        
    }

    //Getters
    public getId(){
        return this.id;
    }

    public getQuestion(){
        return this.question;
    }

    // public getCompetencyId(){
    //     return this.competencyId;
    // }

  

    //Setters
    public setId(id : number){
        this.id = id;
    }

    public setQuestion(question : string){
        this.question = question;
    }

    // public setCompetencyId(competencyId : number){
    //     this.competencyId = competencyId;
    // }

   

    public checkQuestionData() : boolean {
        let result : boolean = false;
        
        if (this.id != null && this.question != null ) {
            result = true;
        }
        return result;
    }

}






// export class Question{
//     public question: string;
//     public questions: Array<Question>;

   

//     public constructor(question: string, questions: Array<Question>){
//         this.question = question;
//         this.questions = questions;
        
//     }

    
    
// }
// /*
// export class Question{
//     public question: string;
//     public score int: int;

//     public constructor(question: string, score: int){
//         this.question = question;
//         this.score = score;
        
//     }
// }
//  */