import { Controller } from "./Controller";
import { QuestionHandler } from "../components/QuestionHandler";
import { Button } from "../components/Button/button";
import { MenuController } from "./Menucontroller";
import { Result } from "../components/Result";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
import { LoginService } from "../components/LoginService";
import { ResultComparer } from "../components/ResultComparer";
declare var componentHandler: any;

export class TestController extends Controller {
    private questionHandler: QuestionHandler = new QuestionHandler;
    private menu: MenuController = new MenuController();
    private currentScreen: number = 1;
    private newResults: Array<Result>;
    private oldResults: Array<Result>;
    private comparer: ResultComparer;

    protected setup(): void {
        let backButton: Button = new Button("Back");
        let nextButton: Button = new Button("Next");

        backButton.setOnClick(() => this.updateScreen(this.currentScreen - 1));
        nextButton.setOnClick(() => this.updateScreen(this.currentScreen + 1));

        $("#back_button").html(backButton.getView());
        $("#button_area2").html(nextButton.getView());
    }

    private updateScreen(screen: number) {
        if (screen <= 0){
            $("#back_button").addClass("disabled-button");
        } else if (screen >= this.questionHandler.getQuestionLength()){
            $("#next_button").addClass("disabled-button");
            let completeButton: Button = new Button("Complete");
            completeButton.setOnClick(() => this.getDataFromTest());
            $("#button_area2").html(completeButton.getView());
        } else{
            let nextButton: Button = new Button("Next");
            nextButton.setOnClick(() => this.updateScreen(this.currentScreen + 1));
            $("#button_area2").html(nextButton.getView());
        }

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
            let tempOptions = document.getElementsByName('options-'+i);
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
        this.removeOldData();
        for (let competentie of this.newResults) {
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
                if (object.statusCode == 201) {
                    console.log("Result added");
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

            this.comparer = new ResultComparer();
            this.comparer.setCompetenties(this.questionHandler.getCompetenties());
            this.comparer.setNewResults(this.newResults);
            this.comparer.setOldResults(this.oldResults);

            $(".container").html(this.comparer.getView());
            componentHandler.upgradeDom();

        }.bind(this))
        this.storeData();
    }

}