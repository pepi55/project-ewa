import { JsonMainQuestion } from "../models/JsonMainQuestion";

export class QuestionHandler{
    private mainQuestions: Array<JsonMainQuestion>;

    public constructor(callBack: any){
        $.ajax({
            url: "/assets/json/questions.json", //URL van Api           
        }).done(function(result: Array<JsonMainQuestion>){
            this.mainQuestions = result;

            callBack();
        }.bind(this))
    }
   
    public getMainQuestions(){
        return this.mainQuestions;
    }
}