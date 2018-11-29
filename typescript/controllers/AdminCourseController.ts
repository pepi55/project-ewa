import { ApiService } from "../coursesAPIs/ApiService";
import { API, PRICE, SUBCATS } from "../coursesAPIs/EnumRepo";
import { Results } from "../coursesAPIs/UDYmodels/Results";
import { Controller } from "./Controller";
import { Card } from "../components/Card";
import { AdminButton } from "../components/AdminButton";
import request = require("request");
import { TableRowList } from "../components/TableRowList";
import { Button } from "../components/button/Button";

export class adminCourseController extends Controller {

    protected setup(): void {
        let menuButton : Button = new Button("user");
        menuButton.setOnClick((e : any) => {
            window.location.href = "userCourses.html";
        });

        $("#menuButton").append(menuButton.getView());
        this.setRefreshButton();

        let i : number = 0;
        console.log("calling the courses APIs...");
        let Udemy = new ApiService(API.Udemy);

        Udemy.setQueryParameters(2,50,undefined,undefined,SUBCATS.entrepreneurship,PRICE.priceFree,undefined);
        Udemy.getParent(<T>(object : T) => {
            let results = new Results(object);
            let cardId : number = 0;
            //console.log("aantal courses: " + results.count);
            results.courses.forEach(element => {
                let declineCourseButton : AdminButton = new AdminButton("decline");
                let acceptCourseButton : AdminButton = new AdminButton("accept");

                let card = new Card(cardId, element.title, element.url, undefined, element.image_480x270);
                acceptCourseButton = this.setAddFunction(acceptCourseButton,card);

                $("#cardsContainer").append(card.getCardView());
                $("#" + cardId).append(acceptCourseButton.getView(), declineCourseButton.getView());
                cardId++;
            });
        });
    }

    private setAddFunction(acceptCourseButton : AdminButton, card : Card) {
        let data : any = {
            "title" : card.getTitle(),
            "description" : card.getDescription(),
            "image" : card.getPicture(),
            "url" : card.getUrl()
        };

        let DBOptions : any = {
            headers: {
                //headerinfo
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),

        };

        acceptCourseButton.setOnClick((e: any) => {
            console.log("sending course to DB....");
            let DB = new ApiService(API.DB);
            DB.setPath("courses");
            console.log(DBOptions);
            DB.setOptions(DBOptions);
            DB.post(<T>(object : any) => {
                console.log(object);
                if (object.statusCode == 201) {
                    window.alert("Course added succesfully!!");
                } else {
                    window.alert("something went wrong.");
                }
            });
         });

        return acceptCourseButton;
    }

    private setRefreshButton() {
        let refreshButton : AdminButton = new AdminButton("refresh");

        refreshButton.setOnClick((e : any) => {
            console.log("cleaning table...");
            $("#selectedCardsTable").empty();

            let DB = new ApiService(API.DB);
            DB.setPath("courses");
            console.log("getting courses....");
            DB.getParent(<T>(object : T) => {
                let rows : TableRowList = new TableRowList(object);
                console.log("setting view...");
                rows.rows.forEach(element => {
                    $("#selectedCardsTable").append(element.getRowView());
                });
            });
        });

        $("#selectedCardsTableHead").append(refreshButton.getView());
    }
}
