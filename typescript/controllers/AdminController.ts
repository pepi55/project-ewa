import { ApiService } from "../coursesAPIs/ApiService";
import { API, PRICE, SUBCATS, ORDERING } from "../coursesAPIs/EnumRepo";
import { Results } from "../coursesAPIs/UDYmodels/Results";
import { Controller } from "./Controller";
import { Card } from "../components/Card";
import { AdminButton } from "../components/AdminButton";
import { Button } from "../components/button/Button";
import { TableRowCard } from "../components/TableRowCard";
import { TableCards } from "../components/TableCards";
import { Parent } from "../coursesAPIs/KAmodels/Parent";
import { dropDownMenu } from "../components/dropDownmenu";
declare var componentHandler : any;
declare var getmdlSelect : any;

export class AdminCourseController extends Controller {

    private tableRows : TableRowCard[] = [];
    //cards for setting the competency
    private selectedCards : Card[] = [];
    private cards : Card[] = [];
    private selectedCoursesId : number = 0;
    //competencies
    private competencyNames : string[] = [];
    private competencyIds : number[] = [];
    //areas
    private areaNames : string[] = [];
    private areaIds : number[] = [];

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

        this.getCompetencies();
        this.setFilter();
        
        this.setBackAndNextButtons();
        
        //manages courses on page
        this.setCourses();
        this.addNewCoursesButtons();
        
    }

    private getEmptyTableView(text : string) {
        return `<br><br><br><div class="mdl-typography--display-1-color-contrast" style="font-size: 150%; text-align: center;">${text}</div>`;
    }

    private getCompetencies() : any {
        let DB = new ApiService(API.DB);
        DB.setPath("areas");
        //getting the courses from DB
        DB.getParent((object : any) => {
            //TODO: fix deze shit
            if (object.errorMessage == null) {
                object.forEach(mainResponse => {
                    let areaId = mainResponse.id;
                    this.areaNames.push(mainResponse.name);
                    mainResponse.competencies.forEach(mainResponse => {
                        this.areaIds.push(areaId);
                        console.log(mainResponse.name);
                        this.competencyNames.push(mainResponse.name);
                        this.competencyIds.push(mainResponse.id);                
                    });
                });
                this.setSelectCoursesWithCompetencyTable();
            } else {
                console.log("Something went wrong!");
            }
 
        });
 
        
    }
   
    private setCourses() {
        $("#cardsContainer").empty();
        $("#spinner").css("display", "");
        this.cards = [];
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
                let acceptCourseButton : AdminButton = new AdminButton("accept", cardId);
                //prevent errors
                acceptCourseButton.setOnClick((e: any) => {
                });
                let card = new Card(cardId, element.title, "https://www.udemy.com" + element.url, undefined, element.image_480x270);
                this.cards.push(card);

                $("#cardsContainer").append(card.getCardView());
                $("#" + cardId).append(acceptCourseButton.getView());
                componentHandler.upgradeDom();
                cardId++;
            });
        });

        //setting courses from KhanAcademy
        let KA = new ApiService(API.KhanAcademy);
        KA.setPath("entrepreneurship2");
        KA.getParent(<T>(object : T) => {
            let acceptCourseButton : AdminButton = new AdminButton("accept", cardId);
            //prevent errors
            acceptCourseButton.setOnClick((e: any) => {
            });
            let parent = new Parent(object);
            let card = new Card(cardId, parent.title, parent.ka_url, parent.description, parent.icon);
            this.cards.push(card);

            $("#cardsContainer").append(card.getCardView());
            $("#" + cardId).append(acceptCourseButton.getView());
            componentHandler.upgradeDom();
            cardId++;
        });

        $("#spinner").css("display", "none");


    }

    private addNewCoursesButtons() {
        let addButton : Button = new Button("Add");

        addButton.setOnClick((e : any) => {
            this.tableRows = [];
            this.selectedCards = [];
            let atleastOneCardChecked : boolean = false;

            var checkBoxes = document.getElementById("cardsContainer").getElementsByTagName("label");
            //loop through checkboxes
            for(var i = 0; i < checkBoxes.length; i++) {
                if(checkBoxes[i].classList.contains("is-checked")) {
                    atleastOneCardChecked = true;
                    let tableCard : any = {
                        "courseId" : this.cards[i].getcardId(),
                        "title" : this.cards[i].getTitle(),
                    };
                    let tableRow = new TableRowCard(tableCard, this.selectedCoursesId++);
                    this.tableRows.push(tableRow);
                    this.selectedCards.push(this.cards[i]);
                    

                }
            }

            if (!atleastOneCardChecked) {
                window.alert("Please select a card..");
                return;
            }

            let table = new TableCards(this.tableRows);
            $("#table4").empty();
            $("#table4").append(table.getTableView());

            componentHandler.upgradeDom();

            
        });

        let selectButton : AdminButton = new AdminButton("accept", 10001);

        selectButton.setOnClick((e : any) => {
            this.selectAllSelectButtons("cardsContainerButtons", 0, "cardsContainer");
            
            
        });

        $("#cardsContainerButtons").append(addButton.getView());

        $("#cardsContainerButtons").append(selectButton.getView());

    }

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
        componentHandler.upgradeDom();
    }

    private setSelectCoursesWithCompetencyTable() {
        let competenciesMenu : dropDownMenu = new dropDownMenu("Competency", this.competencyNames);
        $("#competencySelectorAndSelectAllRows").append(competenciesMenu.getMenuView());
        componentHandler.upgradeDom();
        getmdlSelect.init(".getmdl-select");  
        
        $("#table4").append(this.getEmptyTableView("This box is empty. Go fill it with some new Courses!!"));

        this.addContainerButtons(); 

    }

    private addContainerButtons() {
        let saveButton : Button = new Button("Save");
        let deleteButton : Button = new Button("Delete");
        let button : AdminButton = new AdminButton("accept", 1000);

        saveButton.setOnClick((e : any) => {
            this.saveButton();
        });

        deleteButton.setOnClick((e : any) => {
            this.deleteButton();
        });

        button.setOnClick((e : any) => {
            this.selectAllSelectButtons("competencySelectorAndSelectAllRows", 1, "table4");
        });

        $("#competencySelectorAndSelectAllRows").append(button.getView());
        
        $("#tableCardsButtons").append(deleteButton.getView());
        $("#tableCardsButtons").append(saveButton.getView());
        componentHandler.upgradeDom();
        
        
    }

    private saveButton() {
        let deletedElement : TableRowCard = new TableRowCard("DeletedElement", -10); 

        //get selected competeny
        let competencyName : string = "";
        let competencyId : number = 0;
        let areaId : number = 0;
        var inputs = document.getElementById("competencySelectorAndSelectAllRows").getElementsByTagName("input");
        //loop through inputs
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].getAttribute("name") === "Competency") {
                if (inputs[i].getAttribute("value").length === 0) {
                    window.alert("Please select a competency..");
                    return;
                }
                console.log(inputs[i].getAttribute("value"));
                competencyName = inputs[i].getAttribute("value");  
            }     
        }

        for(var i = 0; i < this.competencyNames.length; i++) {
            if(competencyName === this.competencyNames[i]) {
                competencyId = this.competencyIds[i];
                areaId = this.areaIds[i];
            }     
        }

        //get selected courses
        let failed : number = 0;
        let atleastOneCardChecked : boolean = false;
        var checkBoxes = document.getElementById("table4").getElementsByTagName("label");
        //loop through checkboxes
        for(var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].classList.contains("is-checked")) {
                atleastOneCardChecked = true;
                this.tableRows[i] = deletedElement;
                
                let failedBool : boolean = this.sendCardToDB(areaId, competencyId, this.selectedCards[i]);
                
                if (failedBool) {
                    failed++;
                }  

            }
        }

        if (!atleastOneCardChecked) {
            window.alert("Please select a card..");
            return;
        }

        for( var i = 0; i < this.tableRows.length; i++) {
            if (this.tableRows[i] === deletedElement) {
                this.tableRows.splice(i, 1); 
                this.selectedCards.splice(i, 1);
            }
        }

        for( var i = this.tableRows.length-1; i >= 0 ; i--) {
            if (this.tableRows[i] === deletedElement) {
                this.tableRows.splice(i, 1); 
                this.selectedCards.splice(i, 1);
            }         
        }        

        if (failed > 0) {
            window.alert(failed + " have failed saving");
        } else {
            window.alert("Course(s) added succesfully!!");
        }

        let table = new TableCards(this.tableRows);
        $("#table4").empty();
        if (this.tableRows.length === 0) {
            $("#table4").append(this.getEmptyTableView("This box is empty. Go fill it with some new questions!!"));

        } else {
            $("#table4").append(table.getTableView());
        }

        componentHandler.upgradeDom();

    }

    private deleteButton() {
        let deletedElement : TableRowCard = new TableRowCard("DeletedElement", -10); 

        //get selected courses
        let atleastOneCardChecked : boolean = false;
        var checkBoxes = document.getElementById("table4").getElementsByTagName("label");
        //loop through checkboxes
        for(var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].classList.contains("is-checked")) {
                atleastOneCardChecked = true;
                this.tableRows[i] = deletedElement;                
            }
        }

        if (!atleastOneCardChecked) {
            window.alert("Please select a card..");
            return;
        }

        for( var i = 0; i < this.tableRows.length; i++) {
            if (this.tableRows[i] === deletedElement) {
                this.tableRows.splice(i, 1); 
                this.selectedCards.splice(i, 1);
            }
        }

        for( var i = this.tableRows.length-1; i >= 0 ; i--) {
            if (this.tableRows[i] === deletedElement) {
                this.tableRows.splice(i, 1); 
                this.selectedCards.splice(i, 1);
            }         
        }

        let table = new TableCards(this.tableRows);
        $("#table4").empty();
        if (this.tableRows.length === 0) {
            $("#table4").append(this.getEmptyTableView("This box is empty. Go fill it with some new questions!!"));

        } else {
            $("#table4").append(table.getTableView());
        }

        componentHandler.upgradeDom();

    }

    private sendCardToDB(areaId : number, competencyId : number, selectedCard : Card) : any {
            let data : any = {
                "title" : selectedCard.getTitle(),
                "description" : selectedCard.getDescription(),
                "image" : selectedCard.getPicture(),
                "url" : selectedCard.getUrl(),
            };

            let DBOptions : any = {
                headers: {
                    //headerinfo
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            };

            let DB = new ApiService(API.DB);
            DB.setPath("areas/" + areaId + "/competencies/" + competencyId + "/courses");
            DB.setOptions(DBOptions);
            DB.post(<T>(object : any) => {
                //check if POST is succeeded
                if (object.statusCode != 201) {
                    return true;
                }
                return false;
            });
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


        $("#filter").append(pageSizeMenu.getMenuView(), subCatMenu.getMenuView(), priceMenu.getMenuView(), OrderingMenu.getMenuView());
        $("#cardsContainerButtons").append(applyButton.getView());
        componentHandler.upgradeDom();
        getmdlSelect.init(".getmdl-select");

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
        let backButton : Button = new Button("Back");
        let nextButton : Button = new Button("Next");

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
}