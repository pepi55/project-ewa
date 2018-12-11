import { Controller } from "./Controller";
import { QuestionHandler } from "../components/QuestionHandler";
import { Button } from "../components/Button/button";
import { questions } from "../components/questions/questions";

export class TestController extends Controller {
    private areas: QuestionHandler;
    
    protected setup(): void {
        var self = this;
        

        this.areas = new QuestionHandler(function(){
            let retrievedAreas = self.areas.getQuestions()
            let question: questions = new questions(retrievedAreas);

            let saveButton = new Button("Save");

        saveButton.setOnClick((e: any) => {
            window.location.href = "/views/results.html";
        })

            $("#testid").html(question.getView());
            $("#save-button").append(saveButton.getView());

        });
    }    
}