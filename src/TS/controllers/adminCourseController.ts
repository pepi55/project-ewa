import { ApiService } from "../coursesAPIs/ApiService";
import { API, PRICE, SUBCATS } from "../coursesAPIs/EnumRepo";
import { Results } from "../coursesAPIs/UDYmodels/Results";
import { Controller } from "./controller";
import { Card } from "../components/Card";
import { CardButton } from "../components/CardButton";

export class adminCourseController extends Controller {


    protected setup(): void {
        console.log("dcdasdadfgdfg");
        let cards : Card[];
        let i : number = 0;
        let Udemy = new ApiService(API.Udemy);
        Udemy.setQueryParameters(2,50,undefined,undefined,SUBCATS.entrepreneurship,PRICE.priceFree,undefined);
        Udemy.getParent(<T>(object : T) => {
            
            console.log(object)
            let results = new Results(object);
            let cardId : number = 0;
            //console.log("aantal courses: " + results.count);
            results.courses.forEach(element => {
                let declineCourseButton : CardButton = new CardButton("decline");
                let acceptCourseButton : CardButton = new CardButton("accept");
                acceptCourseButton.setOnClick((e: any) => {
                   console.log(element.title);
                })
                ;
                let card = new Card(("card" + cardId), element.title, element.url, undefined, element.image_480x270);
                $("#cardsContainer").append(card.getAdminView());
                $("#card" + cardId).append(acceptCourseButton.getView(), declineCourseButton.getView());
                cardId++;
            });
            
        });
        console.log(cards);

        //let backButton: Button = new Button("Back");
        //$("#cardsContainer").append(backButton.getView());
    }
}