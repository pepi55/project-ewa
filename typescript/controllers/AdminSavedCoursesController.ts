import { Controller } from "./Controller";
import { API } from "../coursesAPIs/EnumRepo";
import { ApiService } from "../coursesAPIs/ApiService";
import { Card } from "../components/Card";
import { AdminButton } from "../components/AdminButton";
import { CardsScrollTable } from "../components/CardsScrollTable";
import { Button } from "../components/button/Button";
declare var componentHandler : any;

export class AdminSavedCoursesController extends Controller {

    protected setup(): void {
        this.setSavedCourses();

        this.addSavedCoursesButtons();
    }

    //adds buttons for editing the saved courses
    private addSavedCoursesButtons() {
        let editButton : Button = new Button("Edit");
        let deleteButton : Button = new Button("Delete");
        let button : AdminButton = new AdminButton("accept", 2000);

        editButton.setOnClick((e : any) => {
            window.alert("this functionality is not yet implemented..");
        });

        deleteButton.setOnClick((e : any) => {
            window.alert("this functionality is not yet implemented..");
        });

        button.setOnClick((e : any) => {
            this.selectAllSelectButtons("cardsButtons", 0, "cardsContainer");
        });

        $("#cardsButtons").append(button.getView());
        $("#cardsButtons").append(editButton.getView());
        $("#cardsButtons").append(deleteButton.getView());
        
        componentHandler.upgradeDom();
    }

    //sets the tables with all the cards and competencies
    private setSavedCourses() {
        let selectedButtonId = 0;
        let numberOfScrollTables : number = 10000;

        let DB = new ApiService(API.DB);
        DB.setPath("areas");
        //getting the courses from DB
        DB.getParent((object : any) => {
            //mapping all courses to tableRows   
            if (object.errorMessage == null) {
                
                object.forEach(mainResponse => {
                    mainResponse.competencies.forEach(mainResponse => {
                        let cards : Card[] = [];
                        //get all courses of specific competency
                        mainResponse.courses.forEach(mainResponse => {
                            cards.push(new Card(undefined,undefined,undefined,undefined,undefined,mainResponse));
                        });

                        let table = new CardsScrollTable(cards, mainResponse.name, numberOfScrollTables);
                        let checkButton : AdminButton = new AdminButton("accept", numberOfScrollTables);
                        //checkbutton for selecting all selectbuttons in table
                        checkButton.setOnClick((e : any) => {
                            let numberOfTables : number = checkButton.getId();
                            this.selectAllSelectButtons("checkBoxSelectAll" + numberOfTables, 0, "tableCards" + numberOfTables);
                        });

                        if (cards.length === 0) {
                            table.addEmptyScrollTable(this.getEmptyTableView("This box is empty. Go fill it with some new courses!!"));
                        }

                        //append the table and the corresponding checkbox
                        $("#cardsContainer").append(table.getCardsScrollTableView());
                        $("#checkBoxSelectAll" + numberOfScrollTables).append(checkButton.getView());
                        componentHandler.upgradeDom();

                        //adding checkbuttons for each card
                        cards.forEach(element => {
                            let acceptCourseButton : AdminButton = new AdminButton("accept", selectedButtonId++);
                            //prevent errors
                            acceptCourseButton.setOnClick((e: any) => {});
                            $("#" + element.getcardId()).append(acceptCourseButton.getView());
                            componentHandler.upgradeDom();
                        });

                        
                        numberOfScrollTables++;
                           
                    });
                });
                
                 
            } else {
                console.log("Something went wrong!");
            }

        });
        
    }

    //selects all selectbuttons in the specified table
    private selectAllSelectButtons(ownCheckBox : string, element : number, checkboxesList : string) {
        var OwnCheckbox = document.getElementById(ownCheckBox).getElementsByTagName("label");
        var checkBoxes = document.getElementById(checkboxesList).getElementsByTagName("label");

        if(!OwnCheckbox[element].classList.contains("is-checked")) {
            //loop through checkboxes
            for(var i = 0; i < checkBoxes.length; i++) {
                if(!checkBoxes[i].classList.contains("is-checked")) {
                    checkBoxes[i].classList.add("is-checked");
                }
            }
        } else {
            //loop through checkboxes
            for(var i = 0; i < checkBoxes.length; i++) {
                if(checkBoxes[i].classList.contains("is-checked")) {
                    checkBoxes[i].classList.remove("is-checked");
                }
            }

        }
    }

    //text for in tables when the table is empty
    private getEmptyTableView(text : string) {
        return `<br><br><br><div class="mdl-typography--display-1-color-contrast" style="font-size: 150%; text-align: center;">${text}</div>`;
    }
}