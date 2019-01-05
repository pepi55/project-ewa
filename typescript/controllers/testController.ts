import { Controller } from "./Controller";
import { QuestionHandler } from "../components/QuestionHandler";
import { Button } from "../components/Button/button";
import { MenuController } from "./Menucontroller";
import { Result } from "../components/Result";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
import { LoginService } from "../components/LoginService";
import { resultComparer } from "../components/resultComparer";
declare var componentHandler: any;

export class TestController extends Controller {
    private questionHandler: QuestionHandler = new QuestionHandler;
    private menu: MenuController = new MenuController();
    private currentScreen: number = 1;
    private newResults: Array<Result>;
    private oldResults: Array<Result>;
    private comparer: resultComparer;

    protected setup(): void {
        let testButton: Button = new Button("getTest");

        testButton.setOnClick((e: any) => {

        });
        // $("#test-button").append(testButton.getView());

        let backButton: Button = new Button("Back");
        let nextButton: Button = new Button("Next");
        let completeButton: Button = new Button("Complete");

        backButton.setOnClick(() => this.updateScreen(this.currentScreen - 1));
        nextButton.setOnClick(() => this.updateScreen(this.currentScreen + 1));
        completeButton.setOnClick(() => {
            // this.getOldData();
            // this.removeOldData();
            this.getDataFromTest();
        });

        $("#back_button").append(backButton.getView());
        $("#next_button").append(nextButton.getView());
        $("#next_button").append(completeButton.getView());

        /** temp button */
        let tempButton: Button = new Button("temp");
        tempButton.setOnClick(() => this.storeData());
        $("#next_button").append(tempButton.getView());
    }

    private updateScreen(screen: number) {
        console.log(screen);
        console.log(this.questionHandler.getQuestionLength())
        if (screen > 0 && screen < this.questionHandler.getQuestionLength()) {
            $("#screen-" + screen).css("display", "block");
            $("#screen-" + this.currentScreen).css("display", "none");
            this.currentScreen = screen;
            componentHandler.upgradeDom();
        }
    }

    private getDataFromTest() {
        this.newResults = new Array();
        let z = 0;
        let x = this.questionHandler.getCompetentieById(z).getQuestionLength();
        for (let i = 0; i < this.questionHandler.getQuestionLength(); i++) {
            if (x <= 0) {
                this.newResults.push(new Result(this.questionHandler.getCompetentieById(z).getCompetentieId(), this.questionHandler.getCompetentieById(z).getScore()))
                z++;
                x = this.questionHandler.getCompetentieById(z).getQuestionLength();
            }
            let tempOptions = document.getElementsByName('options-1');
            for (let y = 0; y < tempOptions.length; y++) {
                if (tempOptions[y]["checked"] == true) {
                    this.questionHandler.getCompetentieById(z).addScore(tempOptions[y]["value"])
                }
            }
            x--;
        }
        this.getOldData();
    }

    private storeData() {
        for (let competentie of this.newResults) {
            competentie.log();

            let DBOptions: any = {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(competentie)
            };

            let DB = new ApiService(API.DB);
            DB.setPath("users/" + LoginService.getInstance().getUserName() + "/results");
            DB.setOptions(DBOptions);
            DB.post(<T>(object: any) => {
                console.log("Posting result to backend...");
                console.log(object);

                if (object.statusCode == 201) {
                    console.log("User added");
                } else {
                    window.alert("Something went wronk");
                }
            });
        }
    }

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

    private getOldData() {
        this.oldResults = new Array();
        let url = "http://localhost:8080/servlet/services/rest/users/" + LoginService.getInstance().getUserName() + "/results";
        let promise = fetch(url);
        promise.then(function (result) {
            return result.json();
        }).then(function (json: any) {
            for (let score of json) {
                this.oldResults.push(new Result(score.competencieId, score.competencieScore));
            }
            console.log("firsts")
            console.log(this.newResults)
            console.log(this.oldResults)

            console.log("second")
            this.comparer = new resultComparer();
            this.comparer.setNewResults(this.newResults);
            this.comparer.setOldResults(this.oldResults);
        }.bind(this))
    }

}