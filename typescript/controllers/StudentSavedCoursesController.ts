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
                        //console.log(mainResponse.name);
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
                            //console.log(mainResponse.question);
                            maxScore += 5;
                        });

                        let competencyScore : number = 0;
                        for (let i = 0; i < this.competencyIds.length; i++) {
                            if(this.competencyIds[i] === mainResponse.id) {
                                competencyScore = this.competencyScores[i];
                            }
                            
                        }
 
                        //nog extra check van of de totaal aantalpunten van de questions groter is dan die van wat behaald is bij de competency
                        if (cards.length > 0 && competencyScore != maxScore) {
                            let table = new CardsScrollTable(cards, mainResponse.name, numberOfScrollTables);
                            $("#cardsContainer").append(table.getCardsScrollTableView());
                            componentHandler.upgradeDom();

                            //adding checkbutton
                            cards.forEach(element => {
                                let followCourseButton : Button = new Button("Follow!");
                                //prevent errors
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
                if (numberOfScrollTables === 10000) {
                    $("#footerForSmallPage").css({"position" : "absolute", "bottom" : "0", "width" : "-webkit-fill-available"});
                }
                this.setProgressBar(this.calculateProgress());
                
                 
            } else {
                console.log("Something went wrong!");
            }

        });
        
    }

    private getUserScores() {
        
        let DB = new ApiService(API.DB);
        DB.setPath("users/" + LoginService.getInstance().getUserName() + "/results");
        DB.getParent((object : any) => {

            if (object.errorMessage == null) {
                
                object.forEach(mainResponse => {
                    this.competencyIds.push(mainResponse.competencieId);
                    this.competencyScores.push(mainResponse.competencieScore);
                });
                
                this.setSavedCourses(); 
            } else {
                $("#progressDiv").css("display", "none");
                $("#mainPageTitle").html("You haven't made the test yet!! Go make the test by clicking on the TEST-tab, so you'll see what you're capable of!");
                $("#footerForSmallPage").css({"position" : "absolute", "bottom" : "0", "width" : "-webkit-fill-available"});

                console.log("Something went wrong!");
            }
            
        }); 
    }

    private calculateProgress() : number {
        return (100 / this.totalCompetencies) * this.numberOfGoodCompetencies;
    }

    private setProgressBar(progress : number) {
        $(".bar1").css("width", progress + "%");

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
        } else if (progress > 100) {
            $("#footerForSmallPage").css({"position" : "absolute", "bottom" : "0", "width" : "100%"});
            text = "You're a master!";
        }
        $("#extraText").html(text);
    }
}