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
import { TeacherStorage } from "../components/TeacherStorage";
declare var componentHandler: any;

/**
 * @author Luc Maerten
 * 
 * class for controlling the results
 */
export class ResultController extends Controller {
    private results: Array<Result>;
    private competencies: Array<Competencie>;
    private comparer: ResultComparer;
    private questionHandler: QuestionHandler;
    private timer: any;

    protected setup(): void {
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
                this.comparer.setCompetencies(this.competencies);
                this.getData();
                $(".android-card-container").remove();
            } else {
                console.log("Something went wrong!");
            }
        });
    }

    private getData() {
        this.results = new Array();
        let tempArray: Array<Result> = new Array();
        this.comparer.setOldResults(tempArray);

        let DB = new ApiService(API.DB);
        let username = LoginService.getInstance().getUserName();
        console.log(TeacherStorage.getInstance().checkIfStored())

        // override username if teacher is viewing a student
        if (TeacherStorage.getInstance().checkIfStored()) {
            username = TeacherStorage.getInstance().getStudentId();
        }
        DB.setPath("users/" + username + "/results");
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
                this.comparer.setNewResults(this.results);
                $(".container").html(this.comparer.getView());
                componentHandler.upgradeDom();
                this.timer = null;

                if (object.errorMessage == "No results found") {
                    $("#mainPageTitle").html(`<div class="android-more-section"><div class="android-section-title mdl-typography--display-1-color-contrast" id="mainPageTitle">You haven't made the test yet. Go make the test by clicking on the TEST-tab, so you'll see what you're capable of.</div></div>`);
                    $("#footerForSmallPage").css({ "position": "absolute", "bottom": "0", "width": "-webkit-fill-available" });
                    $(".page-content").css({ "background-color": "white" });
                };

                if (TeacherStorage.getInstance().checkIfStored()) {
                    $("#mainPageTitle").html(`<div class="android-more-section teacher-button"><div class="android-section-title mdl-typography--display-1-color-contrast" id="mainPageTitle">This student hasn't made the test yet</div></div>`);
                    $("#footerForSmallPage").css({ "position": "absolute", "bottom": "0", "width": "-webkit-fill-available" });
                    $(".page-content").css({ "background-color": "white" });
                }
            };

            /* if a teacher is viewing student results display a back button to return*/
            if (TeacherStorage.getInstance().checkIfStored()) {
                let backButton = new Button("Back");
                backButton.setOnClick(() => {
                    window.location.href = "teacherClass.html";
                });
                $(".teacher-button").append(backButton.getView())
                $(".mdl-card__title-text").html("Results of " + TeacherStorage.getInstance().getStudentId());
                TeacherStorage.getInstance().emptyId();
            }
        })
    }
}