import { Question } from "./Question"

export class QuestionHandler {
    private questions: Array<Question>;

    public constructor(callBack: any){
        $.ajax({
            url: "../json/questions.json", //URL van Api           
        }).done(function(result: Array<Question>){
            this.questions = result;

            callBack();
        }.bind(this))
    }
   
    public getQuestions(){
        return this.questions;
    }
}
    
    
