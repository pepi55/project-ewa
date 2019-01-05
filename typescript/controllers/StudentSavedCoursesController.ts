import { Controller } from "./Controller";
import { API } from "../coursesAPIs/EnumRepo";
import { ApiService } from "../coursesAPIs/ApiService";
import { Card } from "../components/Card";
import { CardsScrollTable } from "../components/CardsScrollTable";
import { Button } from "../components/button/Button";
declare var componentHandler : any;

export class StudentSavedCoursesController extends Controller {

    private totalCompetencies : number = 0;
    private numberOfGoodCompetencies : number = 0;

    protected setup(): void {
        this.setSavedCourses();

    }

    private setSavedCourses() {
        let numberOfScrollTables : number = 10000;
        let DB = new ApiService(API.DB);
        
    
        DB.setPath("areas");
        //getting the courses from DB
        DB.getParent((object : any) => {
            //mapping all courses to tableRows   
            if (object.errorMessage == null) {
                
                object.forEach(mainResponse => {
                    mainResponse.competencies.forEach(mainResponse => {
                        this.totalCompetencies++;
                        console.log(mainResponse.name);
                        let cards : Card[] = [];
                        //get all courses of specific competency
                        mainResponse.courses.forEach(mainResponse => {
                            let card : Card = new Card(undefined,undefined,undefined,undefined,undefined,mainResponse);
                            card.removeShareButton();
                            cards.push(card);
                        });

                        //nog extra check van of de totaal aantalpunten van de questions groter is dan die van wat behaald is bij de competency
                        if (cards.length > 0) {
                            let table = new CardsScrollTable(cards, mainResponse.name, numberOfScrollTables);
                            $("#cardsContainer").append(table.getCardsScrollTableView());
                            componentHandler.upgradeDom();

                            //adding checkbutton
                            cards.forEach(element => {
                                let followCourseButton : Button = new Button("Follow!");
                                //prevent errors
                                followCourseButton.setOnClick((e: any) => {
                                    document.getElementById("iframeCourse").setAttribute("src", element.getUrl());
                                    $("#mainDiv").html("").css("display", "none");
                                    $("#firstname_error").html("").css("display", "visible");
                                });
                                $("#" + element.getcardId()).append(followCourseButton.getView());
                                componentHandler.upgradeDom();
                            });

                        
                            numberOfScrollTables++;

                        } else {
                            this.numberOfGoodCompetencies++;
                        }    

                        
                           
                    });
                    this.setProgressBar(this.calculateProgress());
                });
                
                 
            } else {
                console.log("Something went wrong!");
            }

        });
        
    }

    private calculateProgress() : number {
        return (100 / this.totalCompetencies) * this.numberOfGoodCompetencies;
    }

    private setProgressBar(progress : number) {
        document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
            this.MaterialProgress.setProgress(progress);
        });

        this.setExtraText(progress);
    }

    private setExtraText(progress : number) {
        let text : string = "";
        if (progress < 30) {
            text = "Do you need some help with the courses?";
        } else if (progress > 30 && progress < 55) {
            text = "You should start working on your competencies!!";
        } else if (progress > 55 && progress < 80) {
            text = "You're making progress!";
        } else if (progress > 80) {
            text = "Wow you're a pro!";
        }
        $("#extraText").html(text);
    }
}