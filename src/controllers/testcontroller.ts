import { Controller } from "controller";
import { Questions } from "../components/questions/questions";
import { QuestionHandler } from "../components/questionhandler";

export class TestController extends Controller {
    private questions: QuestionHandler;
    
    protected setup(): void {
        var self = this;

        this.questions = new QuestionHandler(function(){
            let retrievedQuestions = self.questions.getMainQuestions()
            let question: Questions = new Questions(retrievedQuestions);

            $("#testid").html(question.getView());
        });
    }    
}