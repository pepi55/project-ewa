// import { Question } from "../question";
// import { RadioButtons } from "../radiobutton/radiobuttons";


// export class questions {
//     private questions: Array<Question>;

//     public constructor(questions: Array<Question>) {
//         this.questions = questions;
//     }


//     public getView(): string {
//         console.log(this.questions);
//         console.log(this.questions.length);
//         var div = $("<div>");
        
       
//         for (var i = 0; i < this.questions.length; i++) {
//             var table = $("<table>");
//             var question: Question = this.questions[i];

//             //Setup the header with main question text
//             var header = $("<tr>");
//             //header.append($("<td>"));
//             var mainQuestion: string;
//             mainQuestion = "How confident are you in the following questions?";
//             header.append(
//                 $("<td>")
//                     .attr("colspan", 6)
//                     .html(mainQuestion)
//             );

//             table.append(header);

//             //Setup the answers
//             var answers = $("<tr>");
//             //answers.append($("<td>"));
//             //var answer: Array<String> = ['Not confident at all', 'Slightly confident','Somewhat confident', 'Fairly confident', 'Completely confident','<td>'];
//             var answer1: String ='<td>' + 'Not confident at all' +'<td>'+ 'Slightly confident' + '<td>' + 'Somewhat confident' + '<td>' + 'Fairly confident' + '<td>' + 'Completely confident';
           

//                 answers.append(
//                     $("<td>").html(answer1)
//                 );

//             table.append(answers);

//             //Setup the questions
            
//             for (var i2 = 0; i2 < question.question.length; i2++) {
//                 var uniqueName = "uniquequestion_" + i + "_" + i2;

//                 var uniquequestion = question.questions[i2];

//                 var row = $("<tr>");

//                 row.append(
//                     $("<td>").html(uniquequestion.question)
//                 );

//                 for (var i3 = 0; i3 < 5; i3++) {
//                     var controlView: string;

//                     let radiobutton = new RadioButtons(uniqueName, i3);
//                     controlView = radiobutton.getView();



//                     row.append(
//                         $("<td>").html(controlView)
//                     );
//                 }

//                 table.append(row);
//             }
//             div.append(table);
//         }

//         return $(div).html();

//     }
// }