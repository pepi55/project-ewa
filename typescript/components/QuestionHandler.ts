import { Question } from "./Question"


export class QuestionHandler{
    private questions: Array<Question> = new Array();

    public constructor(){
        let url = "http://localhost:8080/servlet/services/rest/areas/1/competencies/";
        let promise = fetch(url);
        promise.then(function(result){
            console.log(result);
            return result.json();
        }).then(function(json:any){
            console.log(json);

           console.log("Json + question filter :",json["questions"]);
           
        })
        console.log(this.questions);
    }

    public getQuestionById(id: number){
        for (let question of this.questions){
            if (question.getId() == id){
                return question.getQuestion();
            }
        }
    }

    public getAllQuestions() {
        let onlyQuestions: string[];
        for(let i = 0; i > this.questions.length; i++){
            onlyQuestions[i] = this.questions[i].getQuestion();
        }
        return onlyQuestions; 
    }
}




// export class QuestionHandler {
//     private questions: Array<Question>;

//     public constructor(callBack: any){
//         $.ajax({
//             url: "../json/questions.json", //URL van Api           
//         }).done(function(result: Array<Question>){
//             this.questions = result;

//             callBack();
//         }.bind(this))
//     }
   
//     public getQuestions(){
//         return this.questions[0]["questions"];
//     }
// }

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
    
    
