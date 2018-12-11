export class Question{
    public question: string;
    public questions: Array<Question>;

   

    public constructor(question: string, questions: Array<Question>){
        this.question = question;
        this.questions = questions;
        
    }

    
    
}