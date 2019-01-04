import { Controller } from "./Controller";
import { QuestionHandler } from "../components/QuestionHandler";
import { Button } from "../components/Button/button";
import { MenuController } from "./Menucontroller";
import { Result } from "../components/Result";
declare var componentHandler: any;

export class TestController extends Controller {
    private questionHandler: QuestionHandler = new QuestionHandler;
    private menu: MenuController = new MenuController();
    private currentScreen: number = 1;
    private results: Array<Result>;

    protected setup(): void {
        this.results = new Array();
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
            let z = 0;
            let x = this.questionHandler.getCompetentieById(z).getQuestionLength();
            for (let i = 0; i < this.questionHandler.getQuestionLength(); i++) {
                if (x <= 0) {
                    this.results.push(new Result(this.questionHandler.getCompetentieById(z).getCompetentieId(), this.questionHandler.getCompetentieById(z).getScore()))
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
        });

        $("#back_button").append(backButton.getView());
        $("#next_button").append(nextButton.getView());
        $("#next_button").append(completeButton.getView());

        /** temp button */
        let tempButton: Button = new Button("temp");
        tempButton.setOnClick(() => {
            for (let competentie of this.results) {
                competentie.log();
            }
        })
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

}