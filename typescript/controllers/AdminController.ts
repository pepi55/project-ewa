import { ApiService } from "../coursesAPIs/ApiService";
import { API, PRICE, SUBCATS } from "../coursesAPIs/EnumRepo";
import { Results } from "../coursesAPIs/UDYmodels/Results";
import { Controller } from "./Controller";
import { Card } from "../components/Card";
import { AdminButton } from "../components/AdminButton";
import { Button } from "../components/button/Button";
import { TableRow } from "../components/TableRow";

export class adminCourseController extends Controller {

    protected setup(): void {
        //add functionality to buttons
        this.setUserMenuButton();
        this.setRefreshButton();
        
        //manages courses on page
        this.setCourses();
        
    }

    private setUserMenuButton() {
        //set navigation-button to acces userpage
        let menuButton : Button = new Button("user");
        menuButton.setOnClick((e : any) => {
            window.location.href = "userCourses.html";
        });

        $("#menuButton").append(menuButton.getView());

    }

    private setCourses() {
        //setting courses
        let Udemy = new ApiService(API.Udemy);
        Udemy.setQueryParameters(2,50,undefined,undefined,SUBCATS.entrepreneurship,PRICE.priceFree,undefined);
        Udemy.getParent(<T>(object : T) => {
            let results = new Results(object);
            let cardId : number = 0;
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

    //getting coursedata ready for sending to DB
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

        //onclick to send course to DB
        acceptCourseButton.setOnClick((e: any) => {
            let DB = new ApiService(API.DB);
            DB.setPath("courses");
            DB.setOptions(DBOptions);
            DB.post(<T>(object : any) => {
                //check if POST is succeeded
                if (object.statusCode == 201) {
                    window.alert("Course added succesfully!!");
                } else {
                    window.alert("something went wrong.");
                }
            });
         });

        return acceptCourseButton;
    }

    //setting the refresh button for the selected courses table
    private setRefreshButton() {
        let refreshButton : AdminButton = new AdminButton("refresh");

        refreshButton.setOnClick((e : any) => {
            $("#selectedCardsTable").empty();
            let DB = new ApiService(API.DB);
            DB.setPath("courses");
            //getting the courses from DB
            DB.getParent((object : any) => {
                //mapping all courses to tableRows
                let tableRows : TableRow[];
                tableRows = object.map((course : any) => new TableRow(course));
                tableRows.forEach(element => {
                    $("#selectedCardsTable").append(element.getRowView());
                });
            });
        });

        $("#selectedCardsTableHead").append(refreshButton.getView());
    }
}
