import { Controller } from "./Controller";
import { QuestionHandler } from "../components/QuestionHandler";
import { Button } from "../components/Button/button";
import { Result } from "../components/Result";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
import { LoginService } from "../components/LoginService";
import { ResultComparer } from "../components/ResultComparer";
declare var componentHandler: any;

export class TestController extends Controller {
    private questionHandler: QuestionHandler = new QuestionHandler;
    private currentScreen: number = 0;
    private newResults: Array<Result>;
    private oldResults: Array<Result>;
    private comparer: ResultComparer = new ResultComparer();

    protected setup(): void {
        let backButton: Button = new Button("Back");
        let nextButton: Button = new Button("Next");

        backButton.setOnClick(() => this.updateScreen(this.currentScreen - 1));
        nextButton.setOnClick(() => this.updateScreen(this.currentScreen + 1));

        $("#back_button").html(backButton.getView());
        $("#button_area2").html(nextButton.getView());

        this.getOldData();
    }

    /**
     * hides and shows the screens in the test
     * @param screen screen you want to show
     */
    private updateScreen(screen: number) {
        if (screen <= 0) {
            $("#back_button").addClass("disabled-button");
        } else if (screen >= this.questionHandler.getQuestionLength() - 1) {
            let completeButton: Button = new Button("Complete");
            completeButton.setOnClick(() => this.getDataFromTest());
            $("#next_button").addClass("disabled-button");
            $("#button_area2").html(completeButton.getView());
        } else {
            let nextButton: Button = new Button("Next");
            nextButton.setOnClick(() => this.updateScreen(this.currentScreen + 1));
            $("#back_button").removeClass("disabled-button");
            $("#button_area2").html(nextButton.getView());
        }

        if (screen >= 0 && screen < this.questionHandler.getQuestionLength()) {
            $("#screen-" + screen).css("display", "block");
            $("#screen-" + this.currentScreen).css("display", "none");
            this.currentScreen = screen;

            componentHandler.upgradeDom();
        }
    }

    /**
     * get data out of the text and puts it into the new results Array
     */
    private getDataFromTest() {
        let missing = 0;
        this.newResults = new Array();
        let z = 0;
        let x = this.questionHandler.getCompetencieById(z).getQuestionLength(); // sets x to amount of questions the first competencie has
        for (let i = 0; i <= this.questionHandler.getQuestionLength(); i++) {

            // if x is 0 get the length of the next competencie
            if (x <= 0) {
                this.newResults.push(new Result(this.questionHandler.getCompetencieById(z).getCompetencieId(), this.questionHandler.getCompetencieById(z).getScore()))
                z++;
                if (i < this.questionHandler.getQuestionLength()) {
                    x = this.questionHandler.getCompetencieById(z).getQuestionLength();
                }
            }
            if (i < this.questionHandler.getQuestionLength()) {
                missing = 0;

                // gets all the radio buttons from the question
                let tempOptions = document.getElementsByName('options-' + i);
                for (let y = 0; y <= tempOptions.length; y++) {
                    if (y == 5) {
                        missing++;
                        break;
                    }

                    // gets the checked radiobutton and adds the value to the competencie
                    if (tempOptions[y]["checked"] == true) {
                        this.questionHandler.getCompetencieById(z).addScore(tempOptions[y]["value"])
                        break;
                    }
                }
                x--;
            }

            // if a questions is not filled in then send an error message
            if (missing > 0) {
                window.alert("Not everything is filled in");
                break;
            }
        }

        // if nothing is missing then show result screen and store the new data
        if (missing == 0) {
            this.comparer.setCompetencies(this.questionHandler.getCompetencies());
            this.comparer.setNewResults(this.newResults);
            $(".container").html(this.comparer.getView());

            this.storeData();
        }
    }

    /**
     * stores the new scores into the database
     */
    private storeData() {
        this.removeOldData();
        for (let competencie of this.newResults) {
            let DBOptions: any = {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(competencie)
            };
            let DB = new ApiService(API.DB);
            DB.setPath("users/" + LoginService.getInstance().getUserName() + "/results");
            DB.setOptions(DBOptions);
            DB.post(<T>(object: any) => {
                if (object.statusCode == 201) {
                    console.log("Result added");
                } else {
                    window.alert("Something went wronk");
                }
            });
        }
    }

    /**
     * removes previous scores from the database
     */
    private removeOldData() {
        let DB = new ApiService(API.DB);
        DB.setPath("users/" + LoginService.getInstance().getUserName() + "/results");
        DB.delete(<T>(object: any) => {
            console.log(object);
            if (object.statusCode == 200) {
                console.log("denied")
            }
        })
    }

    /**
     * get previous scores from the database
     */
    private getOldData() {
        let url = "http://localhost:8080/servlet/services/rest/users/" + LoginService.getInstance().getUserName() + "/results";
        let promise = fetch(url);
        promise.then(function (result) {
            return result.json();
        }).then(function (json: any) {
            this.oldResults = new Array();
            for (let score of json) {
                this.oldResults.push(new Result(score.competencieId, score.competencieScore));
            }
            this.comparer.setOldResults(this.oldResults);
            componentHandler.upgradeDom();

        }.bind(this))
    }
}