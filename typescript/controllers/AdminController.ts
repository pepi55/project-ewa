import { ApiService } from "../coursesAPIs/ApiService";
import { API, PRICE, SUBCATS, ORDERING } from "../coursesAPIs/EnumRepo";
import { Results } from "../coursesAPIs/UDYmodels/Results";
import { Controller } from "./Controller";
import { Card } from "../components/Card";
import { AdminButton } from "../components/AdminButton";
import { Button } from "../components/button/Button";
import { TableRowCard } from "../components/TableRowCard";
import { TableCards } from "../components/TableCards";
import { TableCompetencies } from "../components/TableCompetencies";
import { TableRowCompetency } from "../components/TableRowCompetency";
import { Parent } from "../coursesAPIs/KAmodels/Parent";
import { dropDownMenu } from "../components/dropDownmenu";
declare var componentHandler : any;
declare var getmdlSelect : any;

export class adminCourseController extends Controller {

    //
    private tableRows : TableRowCard[] = [];
    //cards for setting the competency
    private selectedCards : Card[] = [];
    //ids for incrementing on tablesrows
    private savedCoursesId : number = 0;
    private selectedCoursesId : number = 0;
    //comptenciestable
    private tableCompetencies : TableCompetencies;
    //courses with competencies
    private arraySelectedComptencies : string[] = [];

    //parameters for API's
    private enumParameters : any = {};
    private tempParameters : string[] = ["1", "50", "Entrepreneurship", "price-free", "relevance"];


    protected setup(): void {
        this.enumParameters = {
            page : 1,
            pageSize : 50,
            search : "",
            category : "",
            subCategory : SUBCATS.entrepreneurship,
            price : PRICE.priceFree,
            ordering : ORDERING.relevance
        };

        // this.tempParameters = ;

        //add functionality to buttons
        this.setCompetenciespage();
        this.setSavedCoursesTable();
        this.getCompetencies();
        this.setFilter();
        this.setBackAndNextButtons();
        
        //manages courses on page
        this.setCourses();
        
    }
    
    private setCompetenciespage() {
        let buttonAdd : Button = new Button("add competencies");
        let buttonDelete : Button = new Button("delete");


        buttonAdd.setOnClick((e : any) => {
            if(this.selectedCards.length === 0) {
                window.alert("select cards please...");
            } else {
                this.addCompetencyToCourse();
            }
        });

        buttonDelete.setOnClick((e : any) => {
            this.deleteSelectedCards();
        });


        $("#tableButtons").append(buttonAdd.getView());
        $("#tableButtons").append(buttonDelete.getView());
        
        
    }

    private getCompetencies() {
        let competencyId : number = 0;
        let tableRows : TableRowCompetency[] = [];
        let DB = new ApiService(API.DB);
        DB.setPath("areas");
        //getting the courses from DB
        DB.getParent((object : any) => {
            //TODO: fix deze shit
            if (object.errorMessage == null) {
                object.map((mainResponse: any) =>
                mainResponse.competencies.map((mainResponse: any) => tableRows.push(new TableRowCompetency(mainResponse, competencyId++))));
                this.tableCompetencies = new TableCompetencies(tableRows);
            } else {
                console.log("Something went wrong!");
            }
 
        });
    }

    //DE JUISTE MOET GESELECTEERD ZIJN WANNEER JE OP BACK KLIKT
    private addCompetencyToCourse() {
        let buttonBack : Button = new Button("Return to courses");
        let buttonBackCompetency : Button = new Button("Back");
        let buttonNextCompetency : Button = new Button("Next");
        let buttonSaveCompetency : Button = new Button("Save");
        let cardCount = 0;
        let saveComptency : boolean = false;

        //setup
        let card = this.selectedCards[cardCount];
        $("#competencyCard").append(card.getCardView());
        $("#table3").append(this.tableCompetencies.getTableView());
        componentHandler.upgradeDom();

        //setting buttons
        buttonBack.setOnClick((e : any) => {
            this.switchToMainView();
        });

        buttonBackCompetency.setOnClick((e : any) => {
            //remove the last saved competency
            if(saveComptency) {
                this.saveSelectedCompetency(this.selectedCards[cardCount]);
                saveComptency = false;
            }
            
            console.log("deleted element with id: " + this.arraySelectedComptencies.pop());
            $("#competencyCard").empty();
            $("#table3").empty();

            let card = this.selectedCards[--cardCount];

            if(cardCount === 0) {
                $("#backButton").css("display", "none");
                componentHandler.upgradeDom();
                
            } else {
                $("#backButton").css("display", "block");
                componentHandler.upgradeDom();
            }

            //limit
            if(cardCount < (this.selectedCards.length)) {
                
                $("#saveButton").css("display", "none");
                $("#nextButton").css("display", "block");
                componentHandler.upgradeDom();
                
            }

            $("#competencyCard").append(card.getCardView());
            $("#table3").append(this.tableCompetencies.getTableView());
            // this.setSelectedRadioButton(cardCount);
            componentHandler.upgradeDom();
        });

        buttonNextCompetency.setOnClick((e : any) => {
            saveComptency = true;
            this.saveSelectedCompetency(this.selectedCards[cardCount]);
            $("#competencyCard").empty();
            $("#table3").empty();
            
            let card = this.selectedCards[++cardCount];

            //limit
            if(cardCount === (this.selectedCards.length - 1)) {
                
                $("#saveButton").css("display", "block");
                $("#nextButton").css("display", "none");
                $("#backButton").css("display", "block");
                componentHandler.upgradeDom();
                
            } else {
                //hide saveButton
                $("#saveButton").css("display", "none");
                //show nextButton and backButton
                $("#nextButton").css("display", "block");
                $("#backButton").css("display", "block");
                componentHandler.upgradeDom();
            }

            $("#competencyCard").append(card.getCardView());
            $("#table3").append(this.tableCompetencies.getTableView());
            //this.setSelectedRadioButton(cardCount);
            componentHandler.upgradeDom();
            
        });

        buttonSaveCompetency.setOnClick((e : any) => {
            this.saveSelectedCompetency(this.selectedCards[cardCount]);
            
            let numberOfFailed : number = this.saveSelectedCourses();

            this.switchToMainView();

            if (numberOfFailed > 0) {
                window.alert(numberOfFailed + " have failed saving");
            } else {
                window.alert("Course(s) added succesfully!!");
            }
        });


        $("#saveButton").append(buttonSaveCompetency.getView());
        $("#saveButton").css("display", "none");
        $("#backButton").append(buttonBackCompetency.getView());
        $("#backButton").css("display", "none");
        $("#nextButton").append(buttonNextCompetency.getView());
        $("#nextButton").css("display", "none");

        //if only one card needs competency
        if(this.selectedCards.length == 1) {
            $("#saveButton").css("display", "");
        } else {
            $("#nextButton").css("display", "");
        }



        $("#returnButton").append(buttonBack.getView());
        componentHandler.upgradeDom();


        $("#tableButtons").css("display", "none");
        $("#mainContainer").css("display", "none");
        $("#linkContainer").css("display", "block");

    }

    private switchToMainView() {
        $("#backButton").empty();
        $("#nextButton").empty();
        $("#saveButton").empty();
        $("#returnButton").empty();
        $("#competencyCard").empty();
        $("#table3").empty();

        $("#tableButtons").css("display", "");
        $("#mainContainer").css("display", "");
        $("#linkContainer").css("display", "none");
        //clearing table
        this.arraySelectedComptencies = [];
        this.selectedCards = [];
        this.tableRows = [];
        $("#table2").empty();

    }

    //KAN HANDIG ZIJN BIJ UPDATEN VAN COURSES
    // private setSelectedRadioButton(cardCount : number) {
    //     var radioButtons = document.getElementById("table3").getElementsByTagName("label");
    //     //loop through checkboxes
    //     console.log("cardCount" + cardCount);
    //     console.log("arrayselectedComptencies" + this.arraySelectedComptencies);
    //     for(var i = 0; i < radioButtons.length; i++) {
    //         if(this.arraySelectedComptencies[cardCount] != null) {
    //             console.log("gevonden in de lijst!");
    //             if(radioButtons[i].getAttribute("value") === this.arraySelectedComptencies[cardCount]) {
    //                 console.log("set checked");
    //                 radioButtons[i].classList.add("is-checked");
    //                 $("#table3").empty();
    //                 componentHandler.upgradeDom();

    //             }
    //         }
    //     }
    // }

    private saveSelectedCourses() {
        let failed : number = 0;
        for (let i = 0; i < this.arraySelectedComptencies.length; i++) {
            let data : any = {
                "title" : this.selectedCards[i].getTitle(),
                "description" : this.selectedCards[i].getDescription(),
                "image" : this.selectedCards[i].getPicture(),
                "url" : this.selectedCards[i].getUrl(),
            };

            let DBOptions : any = {
                headers: {
                    //headerinfo
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
    
            };
    


            let DB = new ApiService(API.DB);
            DB.setPath("areas/1/competencies/" + this.arraySelectedComptencies[i] + "/courses");
            DB.setOptions(DBOptions);
            DB.post(<T>(object : any) => {
                //check if POST is succeeded
                if (object.statusCode != 201) {
                    failed++;
                }
            });
            
      
        }
        return failed;
    }

    private saveSelectedCompetency(card : Card) {
        var radioButtons = document.getElementById("table3").getElementsByTagName("label");
        //loop through checkboxes
        for(var i = 0; i < radioButtons.length; i++) {
            if(radioButtons[i].classList.contains("is-checked")) {
                //console.log("added competency");
                this.arraySelectedComptencies.push(radioButtons[i].getAttribute("value"))
                
            }
        }
    }

    private deleteSelectedCards() {
        var checkBoxes = document.getElementById("table2").getElementsByTagName("label");
        //loop through checkboxes
        for(var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].classList.contains("is-checked")) {
                //loopthrough selectedCards
                for(var j = 0; j < this.selectedCards.length; j++) {
                    if ("tableId" + this.selectedCards[j].getcardId().toString() == checkBoxes[i].getAttribute("value")) {
                        //remove the selectedcard from array
                        this.selectedCards.splice(j,1);
                        this.tableRows.splice(j,1);
                        //remove the row
                        var tableRows = document.getElementById("table2").getElementsByTagName("li");
                        for(var l = 0; l < tableRows.length; l++) {
                            if (tableRows[l].getAttribute("id") == checkBoxes[i].getAttribute("value")) {
                                tableRows[l].parentNode.removeChild(tableRows[l]);
                            }
                        }
                    }
                }
            }
        }
        componentHandler.upgradeDom();
    }

    // private setUserMenuButton() {
    //     //set navigation-button to acces userpage
    //     let menuButton : Button = new Button("user");
    //     menuButton.setOnClick((e : any) => {
    //         window.location.href = "userCourses.html";
    //     });

    //     $("#menuButton").append(menuButton.getView());

    // }

    private setCourses() {
        $("#cardsContainer").empty();
        $("#spinner").css("display", "");
        let cardId : number = 0;

        //setting courses from Udemy
        let Udemy = new ApiService(API.Udemy);        

        Udemy.setQueryParameters(this.enumParameters.page,this.enumParameters.pageSize,this.enumParameters.search,
            this.enumParameters.category,this.enumParameters.subCategory,this.enumParameters.price,this.enumParameters.ordering);
        Udemy.getParent(<T>(object : T) => {
            let results = new Results(object);
            
            //setting buttons
            if (results.next != null) {
                $("#nextCardsButton").css("display", "");
            } else {
                $("#nextCardsButton").css("display", "none");
            }

            if (results.previous != null) {
                $("#backCardsButton").css("display", "");
            } else {
                $("#backCardsButton").css("display", "none");
            }

            

            results.courses.forEach(element => {
                let acceptCourseButton : AdminButton = new AdminButton("accept");

                let card = new Card(cardId, element.title, "https://www.udemy.com" + element.url, undefined, element.image_480x270);
                //acceptCourseButton = this.setAddFunction(acceptCourseButton,card);

                acceptCourseButton = this.addCourseToList(acceptCourseButton, card);
                $("#cardsContainer").append(card.getCardView());
                componentHandler.upgradeDom();
                $("#" + cardId).append(acceptCourseButton.getView());
                componentHandler.upgradeDom();
                cardId++;
            });
        });


        //setting courses from KhanAcademy
        let KA = new ApiService(API.KhanAcademy);
        KA.setPath("entrepreneurship2");
        KA.getParent(<T>(object : T) => {
            let acceptCourseButton : AdminButton = new AdminButton("accept");
            let parent = new Parent(object);

            let card = new Card(cardId, parent.title, parent.ka_url, parent.description, parent.icon);

            acceptCourseButton = this.addCourseToList(acceptCourseButton, card);
            $("#cardsContainer").append(card.getCardView());
            componentHandler.upgradeDom();
            $("#" + cardId).append(acceptCourseButton.getView());
            componentHandler.upgradeDom();
            cardId++;
            // let children : any = parent.children;
            
            // for (let index = 0; index < children.length; index++) {
            //     console.log("the specific page: " + children[index].url);   
            // }
        });

        $("#spinner").css("display", "none");

    }

    private setFilter() {
        let names : string[] = ["Page size", "Subcategory", "Price", "Sorting"];
        let pageSizeMenu : dropDownMenu = new dropDownMenu(names[0], ["10", "20", "25", "50"]);
        let subCatMenu : dropDownMenu = new dropDownMenu(names[1], [SUBCATS.entrepreneurship]);
        let priceMenu : dropDownMenu = new dropDownMenu(names[2], [PRICE.priceFree, PRICE.pricePaid]);
        let OrderingMenu : dropDownMenu = new dropDownMenu(names[3], [ORDERING.highToLow, 
            ORDERING.highestRated, ORDERING.lowToHigh, ORDERING.mostReviewed, ORDERING.newest, ORDERING.relevance]);

        let applyButton : Button = new Button("Apply");

        applyButton.setOnClick((e : any) => {
            this.tempParameters  = ["1"];
            var inputs = document.getElementById("filter").getElementsByTagName("input");
            //loop through inputs
            for(var i = 0; i < inputs.length; i++) {
                for (let j = 0; j < names.length; j++) {
                    if(inputs[i].getAttribute("name") === names[j]) {
                        this.tempParameters.push(inputs[i].getAttribute("value"));
                        
                    }
                }
                
            }

            this.setParameters(true);
            this.setCourses();
            
        });


        $("#filter").append(pageSizeMenu.getMenuView(), subCatMenu.getMenuView(), priceMenu.getMenuView(), OrderingMenu.getMenuView(), applyButton.getView());
        componentHandler.upgradeDom();
        getmdlSelect.init("#filter");

    }

    private setParameters(resetPage : boolean) {

            if (parseInt(this.tempParameters[1]) > 0) {
                this.enumParameters.pageSize = parseInt(this.tempParameters[1]);
            } else if (this.tempParameters[1] === "") {
                //defaultvalue
                this.enumParameters.pageSize = 50;
            }

            if (this.tempParameters[2] === "Entrepreneurship") {
                this.enumParameters.subCategory = SUBCATS.entrepreneurship;
            } else if (this.tempParameters[2] === "") {
                //defaultvalue
                this.enumParameters.subCategory = SUBCATS.entrepreneurship;
            }

            if (this.tempParameters[3] === "price-free") {
                this.enumParameters.price = PRICE.priceFree;
            } else if (this.tempParameters[3] === "price-paid") {
                this.enumParameters.price = PRICE.pricePaid;
            } else if (this.tempParameters[3] === "") {
                //defaultvalue
                this.enumParameters.price = PRICE.priceFree;
            }

            if (this.tempParameters[4] === "price-high-to-low") {
                this.enumParameters.ordering = ORDERING.highToLow;
            } else if (this.tempParameters[4] === "price-low-to-high") {
                this.enumParameters.ordering = ORDERING.lowToHigh;
            } else if (this.tempParameters[4] === "newest") {
                this.enumParameters.ordering = ORDERING.newest;
            } else if (this.tempParameters[4] === "highest-rated") {
                this.enumParameters.ordering = ORDERING.highestRated;
            } else if (this.tempParameters[4] === "most-reviewed") {
                this.enumParameters.ordering = ORDERING.mostReviewed;
            } else if (this.tempParameters[4] === "relevance") {
                this.enumParameters.ordering = ORDERING.relevance;
            } else if (this.tempParameters[4] === "") {
                //defaultvalue
                this.enumParameters.ordering = ORDERING.relevance;
            }

            if (resetPage) {
                this.enumParameters.page = 1;
            } else {
                if (parseInt(this.tempParameters[0]) > 0) {
                    this.enumParameters.page = parseInt(this.tempParameters[0]);
                } else if (this.tempParameters[0] === null) {
                    //defaultvalue
                    this.enumParameters.page = 1;
                }
            }
            
            this.enumParameters.search = "";
            this.enumParameters.category = "";
        
    }

    private setBackAndNextButtons() {
        let backButton : Button = new Button("< Back");
        let nextButton : Button = new Button("Next >");

        nextButton.setOnClick((e : any) => {
            let page : number = parseInt(this.tempParameters[0]);
            page++;
            this.tempParameters[0] = page.toString();
            this.setParameters(false);
            this.setCourses();
            
        });

        backButton.setOnClick((e : any) => {
            let page : number = parseInt(this.tempParameters[0]);
            page--;
            this.tempParameters[0] = page.toString();
            this.setParameters(false);
            this.setCourses();
            
        });

        $("#backCardsButton").append(backButton.getView());
        $("#nextCardsButton").append(nextButton.getView());
    }

    //add course to list for adding competency
    private addCourseToList(acceptCourseButton : AdminButton, card : Card) {
        let tableCard : any = {
            "courseId" : card.getcardId(),
            "title" : card.getTitle(),
        };


        acceptCourseButton.setOnClick((e: any) => {
            let tableRow = new TableRowCard(tableCard, this.selectedCoursesId++);
            this.selectedCards.push(card);
            this.tableRows.push(tableRow);
            let table = new TableCards(this.tableRows);
            $("#table2").empty();
            $("#table2").append(table.getTableView());

            componentHandler.upgradeDom();
        });

        return acceptCourseButton;
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
    private setSavedCoursesTable() {
        let refreshButton : Button = new Button("refresh");
        let tableRows : TableRowCard[];
        let table = new TableCards(tableRows);
        
        refreshButton.setOnClick((e : any) => {
            $("#table1").empty();
            tableRows = [];
            let DB = new ApiService(API.DB);
            DB.setPath("areas");
            //getting the courses from DB
            DB.getParent((object : any) => {
                //mapping all courses to tableRows   
                if (object.errorMessage == null) {
                    object.map((mainResponse: any) =>
                    mainResponse.competencies.map((mainResponse: any) => 
                    mainResponse.courses.map((mainResponse: any) => tableRows.push(new TableRowCard(mainResponse, this.savedCoursesId++)))));
                    table = new TableCards(tableRows);
                } else {
                    console.log("Something went wrong!");
                }

                $("#table1").append(refreshButton.getView(), table.getTableView());
                componentHandler.upgradeDom();

            });
        });

        $("#table1").append(refreshButton.getView(), table.getTableView());
        componentHandler.upgradeDom();
    }
}
