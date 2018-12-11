export class Question{
    public question: string;
    public questions: Array<Question>;

   

    public constructor(question: string, questions: Array<Question>){
        this.question = question;
        this.questions = questions;
        
    }

    
    
}
/*
export class Question{
    public question: string;
    public score int: int;

    public constructor(question: string, score: int){
        this.question = question;
        this.score = score;
        
    }
}
 */