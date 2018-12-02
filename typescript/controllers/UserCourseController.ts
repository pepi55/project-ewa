import { Controller } from "./Controller";
import { Button } from "../components/button/Button";
import { API } from "../coursesAPIs/EnumRepo";
import { ApiService } from "../coursesAPIs/ApiService";
import { Card } from "../components/Card";

export class userCourseController extends Controller {
    protected setup(): void {
        this.setAdminMenuButton();
        this.setCards();
    }

    private setAdminMenuButton() {
        let menuButton : Button = new Button("admin");
        menuButton.setOnClick((e : any) => {
            window.location.href = "adminCourses.html";
        });
        $("#menuButton").append(menuButton.getView());
    }

    //getting and setting cards from DB
    private setCards() {
            let DB = new ApiService(API.DB);
            DB.setPath("courses");
            DB.getParent((object : any) => {
                let cards : Card[] = object.map((course : any) => new Card(undefined,undefined,undefined,undefined,undefined,course));
                cards.forEach(element => {
                    $("#cardsContainer").append(element.getCardView());
                });
        });
    }
}
