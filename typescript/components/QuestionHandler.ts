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
        return this.questions[0]["areas"];
    }
}

/*
export class QuestionHandler {
    private questions: Array<Question>;

    public constructor(callBack: any){
        $.ajax({
            url: "http://localhost:8080/servlet/services/rest/areas/1/competencies/1/questions", //URL van Api           
        }).done(function(result: Array<Question>){
            this.questions = result;

            callBack();
        }.bind(this))
    }
   
    public getQuestions(){
        return this.questions;
    }
}
*/
    
    
