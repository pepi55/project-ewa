import { Controller } from "./Controller";
import { QuestionHandler } from "../components/QuestionHandler";
import { Button } from "../components/Button/button";
import { MenuItem } from "../components/MenuItem";
import { LoginService } from "../components/LoginService";
import { Question2 } from "../components/question2";



export class TestController extends Controller {
    
    

    protected setup(): void {
        let questionHandler: QuestionHandler = new QuestionHandler();
        let questions = questionHandler.getQuestionsWithId();
        console.log("in Testcontroller: ",questions);
        //Test
        let testButton: Button = new Button("Save");
        let testButton2: Button = new Button("Test");
        
        testButton2.setOnClick(() =>{
            for(let index = 0; index < questions.length; index++){
            
                let temp : Question2 = new Question2(questions[index].getQuestion(), questions[index].getId());
                
                $('#test').append(temp.getView());
            }
    
        })
        

        // let question2: Question2 = new Question2("Test", 1);
        // $('#test').append(question2.getView());

        testButton.setOnClick(() => {
            let formData = $('#testForm').serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});
            console.log(formData);
            // TODO: Post to endpoint 

        });

        $("#save-button").append(testButton.getView()).append(testButton2.getView());







        //Menu dingen
        let logoutItem: MenuItem = new MenuItem("Logout");
        let profileItem: MenuItem = new MenuItem("Profile");
        let menuItem: MenuItem = new MenuItem("Menu");
        let coursesItem: MenuItem = new MenuItem("Courses");
        let adminItem: MenuItem = new MenuItem("Admin");
        let testItem: MenuItem = new MenuItem("Test");
        let resultItem: MenuItem = new MenuItem("Results");

        logoutItem.setOnClick(() => {
            LoginService.getInstance().logout();
            window.location.href = "/servlet/index.html";
        })
        profileItem.setOnClick(() => { window.location.href = "/servlet/views/profile.html"; })
        menuItem.setOnClick(() => { window.location.href = "/servlet/views/menu.html"; })
        coursesItem.setOnClick(() => { window.location.href = "/servlet/views/userCourses.html"; })
        adminItem.setOnClick(() => { window.location.href = "/servlet/views/adminCourses.html"; })
        testItem.setOnClick(() => { window.location.href = "/servlet/views/test.html" })
        resultItem.setOnClick(() => { window.location.href = "/servlet/views/result.html" })


        $("#on-page")
            .append(logoutItem.getView())
            .append(profileItem.getView());

        $("#on-bar")
            .append(menuItem.getView())
            .append(coursesItem.getView())
            .append(testItem.getView())
            .append(resultItem.getView())
            .append(adminItem.getView())
            .append(logoutItem.getView())
            .append(profileItem.getView());
    }


}


// export class TestController extends Controller {
//     private questions: QuestionHandler;

//     protected setup(): void {
//         var self = this;
//         let saveButton = new Button("Save");
//         saveButton.setOnClick((e: any) => {
//             window.location.href = "/servlet/views/result.html";
//         })
//         $("#save-button").append(saveButton.getView());

//         function init(): string{
//             let question;
//             let url="http://localhost:8080/servlet/services/rest/areas/1/competencies/1/questions";
//             let promise = fetch(url)
//             promise.then(function(resp){
//                 return resp.json();
//             }).then(function(json) {question = json});

//             promise.catch(function(err){question = "helaas"})
//             return question;

//         }

//         this.questions = new QuestionHandler(function(){

//             let retrievedQuestions = self.questions.getQuestions()
//             console.log(retrievedQuestions);
//             let question: questions = new questions(retrievedQuestions);

//             $("#testid").append(init())


//         });

//     }    
// }