import { Controller } from "controller";
import { Questions } from "../components/questions/questions";
import { QuestionHandler } from "../components/questionhandler";
import { Button } from "components/Button/button";

export class TestController extends Controller {
    private questions: QuestionHandler;
    
    protected setup(): void {
        var self = this;
        let saveButton = new Button("Save");

        saveButton.setOnClick((e: any) => {
            window.location.href = "/views/results.html";
        })

        this.questions = new QuestionHandler(function(){
            let retrievedQuestions = self.questions.getMainQuestions()
            let question: Questions = new Questions(retrievedQuestions);

            $("#testid").html(question.getView());
            $("save-button").append(saveButton.getView());

        });
    }    
}