import { Controller } from "./Controller";
import { API } from "../coursesAPIs/EnumRepo";
import { ApiService } from "../coursesAPIs/ApiService";
import { Card } from "../components/Card";
import { CardsScrollTable } from "../components/CardsScrollTable";
import { Button } from "../components/button/Button";
import { LoginService } from "../components/LoginService";
declare var componentHandler : any;

export class StudentSavedCoursesController extends Controller {

    private totalCompetencies : number = 0;
    private numberOfGoodCompetencies : number = 0;

    //user results
    private competencyIds : number[] = [];
    private competencyScores : number[] = [];

    protected setup(): void {
        this.getUserScores();

    }

    //sets the courses that the user needs to work on
    private setSavedCourses() {
        let numberOfScrollTables : number = 10000;
        let DB = new ApiService(API.DB);
    
        DB.setPath("areas");
        //getting the courses from DB
        DB.getParent((object : any) => {
            //mapping all courses to tables   
            if (object.errorMessage == null) {
                
                object.forEach(mainResponse => {
                    mainResponse.competencies.forEach(mainResponse => {
                        this.totalCompetencies++;
                        let cards : Card[] = [];
                        //get all courses of specific competency
                        mainResponse.courses.forEach(mainResponse => {
                            let card : Card = new Card(undefined,undefined,undefined,undefined,undefined,mainResponse);
                            card.removeShareButton();
                            cards.push(card);
                        });

                        let maxScore : number = 0;
                        //get all questions of specific competency
                        mainResponse.questions.forEach(mainResponse => {
                            //increase maxscore by 5 because each question max value is 5 points
                            maxScore += 5;
                        });

                        //get the competencyscore that is linked to the competency
                        let competencyScore : number = 0;
                        for (let i = 0; i < this.competencyIds.length; i++) {
                            if(this.competencyIds[i] === mainResponse.id) {
                                competencyScore = this.competencyScores[i];
                            }
                            
                        }
 
                        //if the user score is not the same as the max score, he will get this competency to work on it
                        if (cards.length > 0 && competencyScore != maxScore) {
                            // add the cards to a table
                            let table = new CardsScrollTable(cards, mainResponse.name, numberOfScrollTables);
                            $("#cardsContainer").append(table.getCardsScrollTableView());
                            componentHandler.upgradeDom();

                            //adding checkbuttons to each card
                            cards.forEach(element => {
                                let followCourseButton : Button = new Button("Follow!");
                                followCourseButton.setOnClick((e: any) => {
                                    window.open(element.getUrl(), "_blank");
                                });
                                $("#" + element.getcardId()).append(followCourseButton.getView());
                                componentHandler.upgradeDom();
                            });

                        
                            numberOfScrollTables++;

                        } else {
                            if (competencyScore === maxScore) {
                                console.log("mastered competency : " + mainResponse.name);
                                this.numberOfGoodCompetencies++;
                                
                            } 
                            if (cards.length === 0) {
                                console.log("there are no cards for competency: " + mainResponse.name);
                            }
                            
                        }    

                        
                           
                    });
                    
                });
                //if there are no tables set to the page, the view gets adjusted
                if (numberOfScrollTables === 10000) {
                    $("#footerForSmallPage").css({"position" : "absolute", "bottom" : "0", "width" : "-webkit-fill-available"});
                }
                this.setProgressBar(this.calculateProgress());
                
                 
            } else {
                console.log("Something went wrong!");
            }

        });
        
    }

    //gets the user score per competency
    private getUserScores() {
        
        let DB = new ApiService(API.DB);
        //sets path by username
        DB.setPath("users/" + LoginService.getInstance().getUserName() + "/results");
        DB.getParent((object : any) => {

            if (object.errorMessage == null) {
                
                object.forEach(mainResponse => {
                    //sets each competencyid and competencyscore
                    this.competencyIds.push(mainResponse.competencieId);
                    this.competencyScores.push(mainResponse.competencieScore);
                });
                
                this.setSavedCourses(); 
            } else {
                //when there is no progress saved in the DB, the view gets adjusted
                $("#progressDiv").css("display", "none");
                $("#mainPageTitle").html("You haven't made the test yet!! Go make the test by clicking on the TEST-tab, so you'll see what you're capable of!");
                $("#footerForSmallPage").css({"position" : "absolute", "bottom" : "0", "width" : "-webkit-fill-available"});

                console.log("Something went wrong!");
            }
            
        }); 
    }

    //for calculating progress
    private calculateProgress() : number {
        return (100 / this.totalCompetencies) * this.numberOfGoodCompetencies;
    }

    //sets the progressbar
    private setProgressBar(progress : number) {
        $(".bar1").css("width", progress + "%");

        this.setExtraText(progress);
    }

    //sets motivational text that reflects the progress
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
        } else if (progress > 100) {
            $("#footerForSmallPage").css({"position" : "absolute", "bottom" : "0", "width" : "100%"});
            text = "You're a master!";
        }
        $("#extraText").html(text);
    }
}