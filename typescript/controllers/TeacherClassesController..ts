import { Controller } from "./Controller";
import { API } from "../coursesAPIs/EnumRepo";
import { ApiService } from "../coursesAPIs/ApiService";
import { Card } from "../components/Card";
import { CardsScrollTable } from "../components/CardsScrollTable";
import { Button } from "../components/button/Button";
import { LoginService } from "../components/LoginService";
declare var componentHandler : any;

export class TeacherClassesController extends Controller {

    protected setup(): void {
        this.setSavedClassrooms();
    }

    private setSavedClassrooms() : any {
        let cardId = 0;
        let numberOfScrollTables : number = 10000;

        let teacherName : string = LoginService.getInstance().getUserName();

        let DB = new ApiService(API.DB);
        DB.setPath("classrooms");
        //getting the courses from DB
        DB.getParent((object : any) => {
            //TODO: fix deze shit
            if (object.errorMessage == null) {
                object.forEach(mainResponse => {
                    let cards : Card[] = [];
                    //get all courses of specific competency

                    mainResponse.students.forEach(mainResponse => {

                        let card = new Card(cardId++, mainResponse.firstName + " " + mainResponse.lastName, undefined, 
                        "Firstname: " + mainResponse.firstName + "<br/>Lastname: " + mainResponse.lastName + "<br/>Username: " + mainResponse.username + "<br/>E-mail: " + mainResponse.email + 
                        "<br/>Role: " + mainResponse.role, "https://png.pngtree.com/svg/20170602/avatar_107646.png");
                        card.removeShareButton();
                        card.setBackgroundSize(35);
                        cards.push(card);
                        
                    });
                    
                    let tempTeacher : any = mainResponse.teacher;
                    if (tempTeacher != null && teacherName === tempTeacher.username) {
                        let table = new CardsScrollTable(cards, "Class " + mainResponse.id, numberOfScrollTables);

                        if (cards.length === 0) {
                            table.addEmptyScrollTable(this.getEmptyTableView("This classroom is empty. Go get some students!!"));
                        }

                        $("#cardsContainer").append(table.getCardsScrollTableView());
                        componentHandler.upgradeDom();

                        //adding checkbutton
                        cards.forEach(element => {
                            let acceptCourseButton : Button = new Button("Show results");
                            //prevent errors
                            acceptCourseButton.setOnClick((e: any) => {
                            });
                            $("#" + element.getcardId()).append(acceptCourseButton.getView());
                            componentHandler.upgradeDom();
                        });

                        
                        numberOfScrollTables++;

                    }
                    
                });

                if (numberOfScrollTables === 10000) {
                    $("#mainPageTitle").html("You don't have any classrooms!!! Go make some new classrooms by clicking on the EDIT CLASSES-tab!");
                    $("#footerForSmallPage").css({"position" : "absolute", "bottom" : "0", "width" : "-webkit-fill-available"});
                }
            } else {
                $("#mainPageTitle").html("There are no classrooms in the database!! Go make some new classrooms by clicking on the EDIT CLASSES-tab!");
                $("#footerForSmallPage").css({"position" : "absolute", "bottom" : "0", "width" : "-webkit-fill-available"});
                console.log("Something went wrong!");
            }
 
        });
 
        
    }

    private getEmptyTableView(text : string) {
        return `<br><br><br><div class="mdl-typography--display-1-color-contrast" style="font-size: 150%; text-align: center;">${text}</div>`;
    }
}