import { Controller } from "./Controller";
import { LoginService } from "../components/LoginService";
import { Result } from "../components/Result";
import { ResultComparer } from "../components/ResultComparer";
import { QuestionHandler } from "../components/QuestionHandler";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
import { Competencie } from "../components/Competencie";
import { Question } from "../components/Question";
import { Button } from "../components/button/Button";
declare var componentHandler: any;

export class ResultController extends Controller {
    private results: Array<Result>;
    private competencies: Array<Competencie>;
    private comparer: ResultComparer;
    private questionHandler: QuestionHandler;

    protected setup(): void {
        let loadButton = new Button("Load results");
        loadButton.setOnClick(() => {
            this.comparer.setCompetencies(this.competencies);
            this.getData();
            $(".android-card-container").remove();
        });

        this.comparer = new ResultComparer();
        this.competencies = new Array()
        let DB = new ApiService(API.DB);
        let i = 0;

        DB.setPath("areas");
        DB.getParent((object: any) => {
            if (object.errorMessage == null) {
                object.map((mainResponse: any) =>
                    mainResponse.competencies.map((mainResponse: any) => {
                        let tempQuestions = new Array<Question>();
                        mainResponse.questions.map((mainResponse: any) => tempQuestions.push(new Question(mainResponse.id, mainResponse.question)))
                        this.competencies.push(new Competencie(mainResponse.id, mainResponse.name, tempQuestions))
                    }));
            } else {
                console.log("Something went wrong!");
            }
        });

        $(".android-card-container").append(loadButton.getView());
    }

    private getData() {
        this.results = new Array();
        let tempArray: Array<Result> = new Array();
        this.comparer.setOldResults(tempArray);

        let DB = new ApiService(API.DB);
        DB.setPath("users/" + LoginService.getInstance().getUserName() + "/results");
        DB.getParent((object: any) => {
            console.log(object)
            if (object.errorMessage == null) {
                object.map((mainResponse: any) => {
                    this.results.push(new Result(mainResponse.competencieId, mainResponse.competencieScore));
                })
            } 
            this.comparer.setNewResults(this.results);
            $(".container").html(this.comparer.getView());
            componentHandler.upgradeDom();
            if (object.errorMessage == "No results found") {
                $(".container").html("You haven't made the test yet!! Go make the test by clicking on the TEST-tab, so you'll see what you're capable of!");

                console.log("Something went wrong!");
            };
        })
    }
}