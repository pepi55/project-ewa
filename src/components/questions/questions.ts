import { Question } from "../question";
import { RadioButtons } from "../radiobutton/radiobuttons";
import { CheckBox } from "../radiobutton/checkbox";
import { JsonMainQuestion } from "../../models/JsonMainQuestion";

export class Questions{
    private questions: Array<JsonMainQuestion>;

    public constructor(questions: Array<JsonMainQuestion>){
        this.questions = questions;
    }

    public getView() : string {

        var div = $("<div>");

        for(var i = 0; i < this.questions.length; i++) {
            var table = $("<table>");
            var question: JsonMainQuestion = this.questions[i];

            //Setup the header with main question text
            var header = $("<tr>");
            header.append(
                $("<td>")
                    .attr("colspan", question.answers.length + 1)
                    .html(question.mainQuestion)
            );

            table.append(header);

            //Setup the answers
            var answers = $("<tr>");
            answers.append($("<td>"));

            for(var i2 = 0; i2 < question.answers.length; i2++) {
                var answer = question.answers[i2];

                answers.append(
                    $("<td>").html(answer)
                );
            }     
            
            table.append(answers);
            
            //Setup the questions
            for(var i2 = 0; i2 < question.subQuestions.length; i2++) {
                var uniqueName = "subQuestion_" + i + "_" + i2;
                
                var subQuestion = question.subQuestions[i2];

                var row = $("<tr>");

                row.append(
                    $("<td>").html(subQuestion.question)
                );

                for(var i3 = 0; i3 < question.answers.length; i3++) {
                    var controlView: string;

                    switch(subQuestion.type) {
                        case "radio":
                            let radiobutton = new RadioButtons(uniqueName, i3);
                            controlView = radiobutton.getView();
                            break;
        
                        case "checkbox":
                            let checkbox = new CheckBox(uniqueName, i3);
                            controlView = checkbox.getView();
                            break;

                        default:
                            controlView = "Unknown";
                            break;
                    }
    
                    row.append(
                        $("<td>").html(controlView)
                    );
                }

                table.append(row);
            }
            div.append(table);
        }

        return $(div).html();
           
    }
}