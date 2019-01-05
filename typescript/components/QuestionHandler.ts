import { Question } from "./Question"
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
import { Competentie } from "./Competentie";
import { QuestionScreen } from "./QuestionScreen";
declare var componentHandler: any;

export class QuestionHandler {
    private competenties: Array<Competentie> = new Array();

    public constructor() {
        this.getCompetentiesFromDatabase();
    }

    private getCompetentiesFromDatabase() {
        let DB = new ApiService(API.DB);
        let i = 0;

        DB.setPath("areas");
        DB.getParent((object: any) => {
            if (object.errorMessage == null) {
                object.map((mainResponse: any) =>
                    mainResponse.competencies.map((mainResponse: any) => {
                        let tempQuestions = new Array<Question>();
                        mainResponse.questions.map((mainResponse: any) => tempQuestions.push(new Question(mainResponse.id, mainResponse.question)))
                        this.competenties.push(new Competentie(mainResponse.id, mainResponse.name, tempQuestions))
                        for (let question of tempQuestions){
                            let questionScreen = new QuestionScreen(mainResponse.name, question.getId(), question.getQuestion());
                            $("#test-area").append(questionScreen.getView(i));
                            i++;
                        }
                    }));
                    $(".disabled-button").removeClass("disabled-button")
                    componentHandler.upgradeDom();
            } else {
                console.log("Something went wrong!");
            }
        });
    }

    public getCompetenties() {
        return this.competenties;
    }

    public getCompetentieById(id: number){
        return this.competenties[id];
    }

    public getCompetentieByCompetentieId(id: number){
        for (let competentie of this.competenties){
            if (competentie.getCompetentieId() == id){
                return competentie;
            }
        }
        return null;
    }

    public getQuestionLength(){
        let temp = 0
        for (let competencie of this.competenties){
            temp += +competencie.getQuestions().length;
        }
        return temp;
    }

    public sendCompetentieScore(){
        
    }
}
