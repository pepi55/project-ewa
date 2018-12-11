import { Controller } from "./Controller";
import { QuestionHandler } from "../components/QuestionHandler";
import { Button } from "../components/Button/button";
import { questions } from "../components/questions/questions";


export class TestController extends Controller {
    private questions: QuestionHandler;
    
    protected setup(): void {
        var self = this;
        let saveButton = new Button("Save");
        saveButton.setOnClick((e: any) => {
            window.location.href = "/views/result.html";
        })
        $("#save-button").append(saveButton.getView());
        


        this.questions = new QuestionHandler(function(){

            let retrievedQuestions = self.questions.getQuestions()
            console.log(retrievedQuestions);
            let question: questions = new questions(retrievedQuestions);

            $("#testid").html(question.getView());
           

        });
        
    }    
}