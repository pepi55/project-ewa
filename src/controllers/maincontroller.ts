import { Controller } from "controller";
import { Button } from "components/button/button";

export class MainController extends Controller {

    protected setup(): void {
        $("#window").append()
        let profileButton: Button = new Button("Profile");
        let takeTestButton: Button = new Button("Take test");
        let resultsButton: Button = new Button("Results");
        let courseButton: Button = new Button("My courses");
        let logoutButton: Button = new Button("Log out")
        profileButton.setOnClick((e: any) => {
                window.location.href = "#";
        })
        takeTestButton.setOnClick((e: any) => {
            window.location.href = "../views/testpage.html";
        })
        resultsButton.setOnClick((e: any) => {
            window.location.href = "#";
        })
        courseButton.setOnClick((e: any) => {
            window.location.href = "#";
        })
        logoutButton.setOnClick((e: any) => {
            window.location.href = "../index.html";
        })

        $("#profile-button").append(profileButton.getView());
        $("#takeTest-button").append(takeTestButton.getView());
        $("#results-button").append(resultsButton.getView());
        $("#course-button").append(courseButton.getView());
        $("#logout-button").append(logoutButton.getView());
    }
}