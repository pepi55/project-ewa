import { Controller } from "controller";
import { Button } from "components/button/button";

export class MainController extends Controller {

        protected setup(): void {
            $("#window").append()
            let myCoursesButton: Button = new Button("My courses");
            let resultsButton: Button = new Button("Results");
            let usersButton: Button = new Button("Users");
            let profileButton: Button = new Button("Profile");
            let takeTestButton: Button = new Button("Take test");
            let logOutButton: Button = new Button("Log out");

            myCoursesButton.setOnClick((e: any) =>{
                window.location.href = "#";
            })
            resultsButton.setOnClick((e: any) => {
                window.location.href = "#";
            })
            usersButton.setOnClick((e: any) => {
                window.location.href = "#";
            })
            profileButton.setOnClick((e: any) => {
                window.location.href = "#";
            })
            takeTestButton.setOnClick((e: any) => {
                window.location.href = "testpage.html";
            })
    
            logOutButton.setOnClick((e: any) => {
                window.location.href = "/index.html";
            })

            $("#mycourses-button").append(myCoursesButton.getView());
            $("#results-button").append(resultsButton.getView());
            $("#profile-button").append(profileButton.getView());
            $("#users-button").append(usersButton.getView());
            $("#taketest-button").append(takeTestButton.getView());
            $("#logout-button").append(logOutButton.getView());
        }
        
    }