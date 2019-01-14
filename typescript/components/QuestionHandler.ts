import { Question } from "./Question"
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
import { Competencie } from "./Competencie";
import { QuestionScreen } from "./QuestionScreen";
declare var componentHandler: any;

/**
* @author Luc Maerten
* 
* class for getting the competenties and the questions in it
* also sets the screen for the questions in the test class
*/

export class QuestionHandler {
    private competencies: Array<Competencie>;

    public constructor() {
        this.getCompetenciesFromDatabase()
    }

    /**
     * gets the competenties from the database and punts them in the Array<Competencie>
     */
    private getCompetenciesFromDatabase() {
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
                        for (let question of tempQuestions) {
                            let questionScreen = new QuestionScreen(mainResponse.name, question.getId(), question.getQuestion());
                            $("#test-area").append(questionScreen.getView(i));
                            i++;
                        }
                    }));
                $("#button_area2").removeClass("disabled-button");
                componentHandler.upgradeDom();
            } else {
                console.log("Something went wrong!");
            }
        });
    }

    public getCompetencies() {
        return this.competencies;
    }

    public getCompetencieById(id: number) {
        return this.competencies[id];
    }

    /**
     * gets the competencie with a simular id as given.
     * @param id of the compentcie
     */
    public getCompetencieByCompetencieId(id: number) {
        for (let competencie of this.competencies) {
            if (competencie.getCompetencieId() == id) {
                return competencie;
            }
        }
        return null;
    }

    /**
     * gets the total length of all the questions
     */
    public getQuestionLength() {
        let temp = 0
        for (let competencie of this.competencies) {
            temp += +competencie.getQuestions().length;
        }
        return temp;
    }
}
