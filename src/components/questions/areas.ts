import { Area } from "../area";
import { RadioButtons } from "../radiobutton/radiobuttons";
import { JsonMainQuestion } from "../../models/JsonMainQuestion";

export class Areas {
    private areas: Array<Area>;

    public constructor(areas: Array<Area>) {
        this.areas = areas;
    }

    public getView(): string {

        var div = $("<div>");

        for (var i = 0; i < this.areas.length; i++) {
            var table = $("<table>");
            var area: Area = this.areas[i];

            //Setup the header with main question text
            var header = $("<tr>");
            //header.append($("<td>"));
            var mainQuestion: string;
            mainQuestion = "How confident are you in the following areas?";
            header.append(
                $("<td>")
                    .attr("colspan", 6)
                    .html(mainQuestion)
            );

            table.append(header);

            //Setup the answers
            var answers = $("<tr>");
            //answers.append($("<td>"));
            //var answer: Array<String> = ['Not confident at all', 'Slightly confident','Somewhat confident', 'Fairly confident', 'Completely confident','<td>'];
            var answer1: String ='<td>' + 'Not confident at all' +'<td>'+ 'Slightly confident' + '<td>' + 'Somewhat confident' + '<td>' + 'Fairly confident' + '<td>' + 'Completely confident';
           

                answers.append(
                    $("<td>").html(answer1)
                );

            table.append(answers);

            //Setup the questions
            
            for (var i2 = 0; i2 < area.areas.length; i2++) {
                var uniqueName = "uniqueArea_" + i + "_" + i2;

                var uniqueArea = area.areas[i2];

                var row = $("<tr>");

                row.append(
                    $("<td>").html(uniqueArea.area)
                );

                for (var i3 = 0; i3 < 5; i3++) {
                    var controlView: string;

                    let radiobutton = new RadioButtons(uniqueName, i3);
                    controlView = radiobutton.getView();



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