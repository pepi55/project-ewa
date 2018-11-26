import { Controller } from "./controller";
import { Button } from "../components/button/button";
import { API } from "../coursesAPIs/EnumRepo";
import { ApiService } from "../coursesAPIs/ApiService";
import { Card } from "../components/Card";
import { DBCoursesList } from "../components/DBCoursesList";

export class userCourseController extends Controller {
    protected setup(): void {

        let menuButton : Button = new Button("admin");
        menuButton.setOnClick((e : any) => {
            window.location.href = "adminCourses.html";
        });
        $("#menuButton").append(menuButton.getView());

        this.setCards();
    }

    private setCards() {
            
            let DB = new ApiService(API.DB);
            DB.setPath("courses");
            console.log("getting courses....");
            DB.getParent(<T>(object : T) => {
                console.log(object)
                let courses : DBCoursesList = new DBCoursesList(object);
                console.log("setting view...");
                courses.courses.forEach(element => {
                    let card = new Card(element.courseId, element.title, element.url, element.description, element.image);
                    $("#cardsContainer").append(card.getCardView());

                });
        });

    }

}