import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
import { Controller } from "./Controller";
import { AdminButton } from "../components/AdminButton";
import { Button } from "../components/button/Button";
import { TableRowCard } from "../components/TableRowCard";
import { TableCards } from "../components/TableCards";
import { dropDownMenu } from "../components/dropDownmenu";
declare var componentHandler : any;
declare var getmdlSelect : any;

export class AdminEditTestController extends Controller {

    //INPUT FROM USER
    
    //questions
    private tableRows : TableRowCard[] = [];
    private selectedQuestions : string[] = [];
    private selectedQuestionsId : number = 0;

    //competencies
    private tableRowsComp : TableRowCard[] = [];
    private selectedCompetencies : string[] = [];
    private selectedCompetenciesId : number = 0;

    //FROM DB
    //competencies
    private competencyNames : string[] = [];
    private competencyIds : number[] = [];
    //areas
    //used for adding competencies
    private areaNames : string[] = [];
    //used for adding questions
    private areaIds : number[] = [];
    

    protected setup(): void {
           
        this.getCompetencies();
        this.addNewQuestionsButton();
        this.addNewCompetenciesButton();
        
    }

    //FOR BOTH ADDING COMPETENCIES AND QUESTIONS

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
                this.setSelectQuestionsWithCompetencyTable();
                this.setSelectCompetenciesWithAreaTable();
            } else {
                console.log("Something went wrong!");
            }
 
        });
 
        
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

    private getEmptyTableView(text : string) {
        return `<br><br><br><div class="mdl-typography--display-1-color-contrast" style="font-size: 150%; text-align: center;">${text}</div>`;
    }

    //ADDING QUESTIONS 

    private addNewQuestionsButton() {
        let addButton : Button = new Button("Add");

        addButton.setOnClick((e : any) => {
            let atleastOneFieldIsFilld : boolean = false;

            var questionInput = (document.getElementById("questionInput") as HTMLInputElement).value;      

            //question input check
            if (questionInput != null && questionInput != "" && questionInput.length > 5) {
                atleastOneFieldIsFilld = true;
                let tableQuestionCard : any = {
                    "courseId" : this.selectedQuestionsId,
                    "title" : questionInput
                };
                let tableRow = new TableRowCard(tableQuestionCard, this.selectedQuestionsId++);
                this.tableRows.push(tableRow);
                this.selectedQuestions.push(questionInput);
            
            }

            if (!atleastOneFieldIsFilld) {
                window.alert("Please fill in a question or competency..");
                return;
            }

            let tableQuest = new TableCards(this.tableRows);
            $("#table4").empty();
            $("#table4").append(tableQuest.getTableView());
            componentHandler.upgradeDom();
            
        });

        $("#questionButton").append(addButton.getView());


    }

    private setSelectQuestionsWithCompetencyTable() {
        let competenciesMenu : dropDownMenu = new dropDownMenu("Competency", this.competencyNames);
        $("#competencySelectorAndSelectAllRows").append(competenciesMenu.getMenuView());
        componentHandler.upgradeDom();
        getmdlSelect.init(".getmdl-select");
        
        $("#table4").append(this.getEmptyTableView("This box is empty. Go fill it with some new questions!!"));

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

        //get selected competeny and area
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
                
                let failedBool : boolean = this.sendQuestionToDB(areaId, competencyId, this.selectedQuestions[i]);
                
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
                this.selectedQuestions.splice(i, 1);
            }
        }

        for( var i = this.tableRows.length-1; i >= 0 ; i--) {
            if (this.tableRows[i] === deletedElement) {
                this.tableRows.splice(i, 1); 
                this.selectedQuestions.splice(i, 1);
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
            window.alert("Please select a question..");
            return;
        }

        for( var i = 0; i < this.tableRows.length; i++) {
            if (this.tableRows[i] === deletedElement) {
                this.tableRows.splice(i, 1); 
                this.selectedQuestions.splice(i, 1);
            }
        }

        for( var i = this.tableRows.length-1; i >= 0 ; i--) {
            if (this.tableRows[i] === deletedElement) {
                this.tableRows.splice(i, 1); 
                this.selectedQuestions.splice(i, 1);
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

    private sendQuestionToDB(areaId : number, competencyId : number, question : string) : any {
            let data : any = {
                "question" : question
            };

            let DBOptions : any = {
                headers: {
                    //headerinfo
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            };

            let DB = new ApiService(API.DB);
            DB.setPath("areas/" + areaId + "/competencies/" + competencyId + "/questions");
            DB.setOptions(DBOptions);
            DB.post(<T>(object : any) => {
                //check if POST is succeeded
                if (object.statusCode != 201) {
                    return true;
                }
                return false;
            });
    }

    //ADDING COMPETENCIES

    private addNewCompetenciesButton() {
        let addButton : Button = new Button("Add");

        addButton.setOnClick((e : any) => {
            let atleastOneFieldIsFilld : boolean = false;
  
            var competencyInput = (document.getElementById("competencyInput") as HTMLInputElement).value;      

            //competency input check
            if (competencyInput != null && competencyInput != "" && competencyInput.length > 5) {
                atleastOneFieldIsFilld = true;
                let tableCompetencyCard : any = {
                    "courseId" : this.selectedCompetenciesId,
                    "title" : competencyInput
                };
                let tableRow = new TableRowCard(tableCompetencyCard, this.selectedCompetenciesId++);
                this.tableRowsComp.push(tableRow);
                this.selectedCompetencies.push(competencyInput);
            
            }


            if (!atleastOneFieldIsFilld) {
                window.alert("Please fill in a question or competency..");
                return;
            }

            let tableComp = new TableCards(this.tableRowsComp);
            $("#table5").empty();
            $("#table5").append(tableComp.getTableView());
            componentHandler.upgradeDom();
            
        });

        $("#competencyButton").append(addButton.getView());


    }

    private setSelectCompetenciesWithAreaTable() {
        let areasMenu : dropDownMenu = new dropDownMenu("Area", this.areaNames);
        $("#competencySelectorAndSelectAllRows2").append(areasMenu.getMenuView());
        componentHandler.upgradeDom();
        getmdlSelect.init(".getmdl-select");

        $("#table5").append(this.getEmptyTableView("This box is empty. Go fill it with some new competencies!!"));

        this.addContainerButtonsComp(); 

    }

    private addContainerButtonsComp() {
        let saveButton : Button = new Button("Save");
        let deleteButton : Button = new Button("Delete");
        let button : AdminButton = new AdminButton("accept", 9999);

        saveButton.setOnClick((e : any) => {
            this.saveButtonComp();
        });

        deleteButton.setOnClick((e : any) => {
            this.deleteButtonComp();
        });

        button.setOnClick((e : any) => {
            this.selectAllSelectButtons("competencySelectorAndSelectAllRows2", 1, "table5");
        });

        $("#competencySelectorAndSelectAllRows2").append(button.getView());
        
        $("#tableCardsButtons2").append(deleteButton.getView());
        $("#tableCardsButtons2").append(saveButton.getView());
        componentHandler.upgradeDom();
        
        
    }

    private saveButtonComp() {
        let deletedElement : TableRowCard = new TableRowCard("DeletedElement", -10); 

        //get selected competeny and area
        let areaName : string = "";
        let areaId : number = 0;

        var inputs = document.getElementById("competencySelectorAndSelectAllRows2").getElementsByTagName("input");
        //loop through inputs
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].getAttribute("name") === "Area") {
                if (inputs[i].getAttribute("value").length === 0) {
                    window.alert("Please select a area..");
                    return;
                }
                console.log(inputs[i].getAttribute("value"));
                areaName = inputs[i].getAttribute("value");  
            }     
        }

        for(var i = 0; i < this.areaNames.length; i++) {
            if(areaName === this.areaNames[i]) {
                areaId = i+1;
            }     
        }

        //get selected courses
        let failed : number = 0;
        let atleastOneCardChecked : boolean = false;
        var checkBoxes = document.getElementById("table5").getElementsByTagName("label");
        //loop through checkboxes
        for(var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].classList.contains("is-checked")) {
                atleastOneCardChecked = true;
                this.tableRowsComp[i] = deletedElement;
                
                let failedBool : boolean = this.sendCompetencyToDB(areaId, this.selectedCompetencies[i]);
                
                if (failedBool) {
                    failed++;
                }  

            }
        }

        if (!atleastOneCardChecked) {
            window.alert("Please select a card..");
            return;
        }

        for( var i = 0; i < this.tableRowsComp.length; i++) {
            if (this.tableRowsComp[i] === deletedElement) {
                this.tableRowsComp.splice(i, 1); 
                this.selectedCompetencies.splice(i, 1);
            }
        }

        for( var i = this.tableRowsComp.length-1; i >= 0 ; i--) {
            if (this.tableRowsComp[i] === deletedElement) {
                this.tableRowsComp.splice(i, 1); 
                this.selectedCompetencies.splice(i, 1);
            }         
        }        

        if (failed > 0) {
            window.alert(failed + " have failed saving");
        } else {
            window.alert("Course(s) added succesfully!!");
        }

        let table = new TableCards(this.tableRowsComp);
        $("#table5").empty();
        if (this.tableRowsComp.length === 0) {
            $("#table5").append(this.getEmptyTableView("This box is empty. Go fill it with some new competencies!!"));

        } else {
            $("#table5").append(table.getTableView());
        }

        componentHandler.upgradeDom();

    }

    private deleteButtonComp() {
        let deletedElement : TableRowCard = new TableRowCard("DeletedElement", -10); 

        //get selected courses
        let atleastOneCardChecked : boolean = false;
        var checkBoxes = document.getElementById("table5").getElementsByTagName("label");
        //loop through checkboxes
        for(var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].classList.contains("is-checked")) {
                atleastOneCardChecked = true;
                this.tableRowsComp[i] = deletedElement;                
            }
        }

        if (!atleastOneCardChecked) {
            window.alert("Please select a question..");
            return;
        }

        for( var i = 0; i < this.tableRowsComp.length; i++) {
            if (this.tableRowsComp[i] === deletedElement) {
                this.tableRowsComp.splice(i, 1); 
                this.selectedCompetencies.splice(i, 1);
            }
        }

        for( var i = this.tableRowsComp.length-1; i >= 0 ; i--) {
            if (this.tableRowsComp[i] === deletedElement) {
                this.tableRowsComp.splice(i, 1); 
                this.selectedCompetencies.splice(i, 1);
            }         
        }

        let table = new TableCards(this.tableRowsComp);
        $("#table5").empty();

        if (this.tableRowsComp.length === 0) {
            $("#table5").append(this.getEmptyTableView("This box is empty. Go fill it with some new competencies!!"));

        } else {
            $("#table5").append(table.getTableView());
        }

        componentHandler.upgradeDom();

    }

    private sendCompetencyToDB(areaId : number, competency : string) : any {
        let data : any = {
            "name" : competency
        };

        let DBOptions : any = {
            headers: {
                //headerinfo
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        };

        let DB = new ApiService(API.DB);
        DB.setPath("areas/" + areaId + "/competencies/");
        DB.setOptions(DBOptions);
        DB.post(<T>(object : any) => {
            //check if POST is succeeded
            if (object.statusCode != 201) {
                return true;
            }
            return false;
        });
    }
}