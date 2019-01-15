import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
import { Controller } from "./Controller";
import { AdminButton } from "../components/AdminButton";
import { Button } from "../components/button/Button";
import { TableRowCard } from "../components/TableRowCard";
import { TableCards } from "../components/TableCards";
import { dropDownMenu } from "../components/dropDownmenu";
import { User } from "../components/User";
import { LoginService } from "../components/LoginService";
declare var componentHandler : any;
declare var getmdlSelect : any;

export class TeacherEditClassController extends Controller {

    //INPUT FROM USER
    
    //pickTable
    private pickTableRowsStudents : TableRowCard[] = [];
    private pickStudents : User[] = [];

    //linkTable
    private linkTableRowsStudents : TableRowCard[] = [];
    private linkStudents : User[] = [];

    //FROM DB
    //classrooms
    private classroomIds : number[] = [];
    //with the word "class" in front of the id
    private classRoomIdsForView : string[] = [];
    //just the id
    private classroomIdsForAddingToDB : number[] = [];

    //students
    //used for adding to a classroom
    private students : User[] = [];

    private studentsWithoutClassroom : User[] = [];

    private selectedStudentId : number = 0;
    

    protected setup(): void {   
        this.addAddClassroomButton();
        this.getClassroomsAndStudents();
        $("#table5").append(this.getEmptyTableView("This box is empty. Go select a classroom in the dropdownmenu!!"));
        $("#table4").append(this.getEmptyTableView("This box is empty. Go select a classroom in the dropdownmenu!!"));
    }

    //SETTING TABLES

    private setPickStudentTable() {
        //sets dropdownmenu for picking students
        let tempClassroom : string[] = [];
        for (let i = 0; i < this.classRoomIdsForView.length; i++) {
            tempClassroom.push(this.classRoomIdsForView[i]);
        }
        tempClassroom.push("Students without a classroom");
        tempClassroom.push("All students with a classroom");

        let classroomMenu : dropDownMenu = new dropDownMenu("Classroom", tempClassroom);
        $("#competencySelectorAndSelectAllRows2").empty();
        $("#tableCardsButtons2").empty();
        $("#competencySelectorAndSelectAllRows2").append(classroomMenu.getMenuView());
        componentHandler.upgradeDom();
        getmdlSelect.init(".getmdl-select");
        
        this.addContainerButtonPick(); 

    }

    private setLinkStudentTable() {
        //sets dropdownmenu for linking students
        let tempClassroom : string[] = [];
        for (let i = 0; i < this.classRoomIdsForView.length; i++) {
            tempClassroom.push(this.classRoomIdsForView[i]);
        }

        let classroomMenu : dropDownMenu = new dropDownMenu("Classroom", tempClassroom);
        $("#competencySelectorAndSelectAllRows").empty();
        $("#tableCardsButtons").empty();

        $("#competencySelectorAndSelectAllRows").append(classroomMenu.getMenuView());
        componentHandler.upgradeDom();
        getmdlSelect.init(".getmdl-select");
        
        this.addContainerButtonLink(); 
    }
    
    //ADD BUTTONS TO TABLEVIEWS

    //sets buttons for picking students table
    private addContainerButtonPick() {
        let updateTableButton : Button = new Button("Show");
        let addToLinkTableButton : Button = new Button("Link student(s)");
        let deleteButton : Button = new Button("Delete student(s) from classroom");
        let button : AdminButton = new AdminButton("accept", 8888);

        addToLinkTableButton.setOnClick((e : any) => {
            this.addToLinkTable();
        });

        updateTableButton.setOnClick((e : any) => {
            this.updatePickTable();
        });

        deleteButton.setOnClick((e : any) => {
            this.deleteLinkStudentToClassroom();
        });

        button.setOnClick((e : any) => {
            this.selectAllSelectButtons("competencySelectorAndSelectAllRows2", 1, "table5");
        });


        
        $("#competencySelectorAndSelectAllRows2").append(updateTableButton.getView());
        $("#competencySelectorAndSelectAllRows2").append(button.getView());
        $("#tableCardsButtons2").append(deleteButton.getView());
        $("#tableCardsButtons2").append(addToLinkTableButton.getView());
        componentHandler.upgradeDom();
        
    }

    //adds Add classroom button
    private addAddClassroomButton() {
        let addClassroomButton : Button = new Button("Add classroom");

        addClassroomButton.setOnClick((e : any) => {
            let failed : boolean = this.addClassroom();

            if (failed) {
                window.alert("New classroom could not be added to the database..");
            } else {
                window.alert("New classroom is added to the database! (refresh page)");
            }
        });

        $("#addClassRoomButton").append(addClassroomButton.getView());
        componentHandler.upgradeDom();
    }

    //sets buttons for linking students table
    private addContainerButtonLink() {
        let saveButton : Button = new Button("Link student(s)");
        let deleteButton : Button = new Button("Delete");
        let button : AdminButton = new AdminButton("accept", 7777);

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
        $("#tableCardsButtons").append(saveButton.getView());
        $("#tableCardsButtons").append(deleteButton.getView());
        componentHandler.upgradeDom();
        
        
    }

    //TABLE UPDATES AND SWITCHES
    //adds students from pick students table to link studentstable
    private addToLinkTable() {
        let deletedElement : TableRowCard = new TableRowCard("DeletedElement", -10);
        this.linkStudents = [];
        this.linkTableRowsStudents = [];
        let atleastOneCardChecked : boolean = false;

        var checkBoxes = document.getElementById("table5").getElementsByTagName("label");

        //loop through checkboxes and get all students that are checked
        for(var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].classList.contains("is-checked")) {
                atleastOneCardChecked = true;
                this.linkStudents.push(this.pickStudents[i]);
                this.linkTableRowsStudents.push(this.pickTableRowsStudents[i]);
                this.pickTableRowsStudents[i] = deletedElement;
            }
        }

        if (!atleastOneCardChecked) {
            window.alert("Please select a student..");
            return;
        }

        //remove students from list
        for( var i = 0; i < this.pickTableRowsStudents.length; i++) {
            if (this.pickTableRowsStudents[i] === deletedElement) {
                this.pickTableRowsStudents.splice(i, 1); 
                this.pickStudents.splice(i, 1);
            }
        }

        for( var i = this.pickTableRowsStudents.length-1; i >= 0 ; i--) {
            if (this.pickTableRowsStudents[i] === deletedElement) {
                this.pickTableRowsStudents.splice(i, 1); 
                this.pickStudents.splice(i, 1);
            }         
        }  

        //reseting pick students table
        let table2 = new TableCards(this.pickTableRowsStudents);
        $("#table5").empty();
        if (this.pickTableRowsStudents.length === 0) {
            $("#table5").append(this.getEmptyTableView("This box is empty. Go fill it with some new questions!!"));

        } else {
            $("#table5").append(table2.getTableView());
        }

        let table = new TableCards(this.linkTableRowsStudents);
        $("#table4").empty();
        $("#table4").append(table.getTableView());

        componentHandler.upgradeDom();


    }

    //updates the pick students table
    private updatePickTable() {
        this.pickStudents = [];
        this.pickTableRowsStudents = [];

        let classroomId : number = 0;

        //get the input from dropdownmenu
        var inputs = document.getElementById("competencySelectorAndSelectAllRows2").getElementsByTagName("input");
        //loop through inputs
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].getAttribute("name") === "Classroom") {
                if (inputs[i].getAttribute("value").length === 0) {
                    window.alert("Please select a classroom...");
                    return;
                } else if (inputs[i].getAttribute("value") === "All students with a classroom") {
                    classroomId = -1;
                } else if (inputs[i].getAttribute("value") === "Students without a classroom") {
                    classroomId = -2;
                } else {
                    let classroom : string = inputs[i].getAttribute("value");
                    for (let j = 0; j < this.classRoomIdsForView.length; j++) {
                        if (this.classRoomIdsForView[j] === classroom) {
                            classroomId = this.classroomIdsForAddingToDB[j];
                        }
                        
                    }
                }         

            }     
        }

        if (classroomId === -2) {
            //students without a classroom
            for (let j = 0; j < this.studentsWithoutClassroom.length; j++) {
                let tableStudent : any = {
                    "courseId" : this.studentsWithoutClassroom[j].getUsername(),
                    "title" : this.studentsWithoutClassroom[j].getFirstName() + " " + this.studentsWithoutClassroom[j].getLastName(),
                };

                let tableRow = new TableRowCard(tableStudent, this.selectedStudentId++);
                this.pickStudents.push(this.studentsWithoutClassroom[j]);
                this.pickTableRowsStudents.push(tableRow);
            }
        } else {
            //loop through checkboxes
            for(var i = 0; i < this.classroomIds.length; i++) {
                let tableStudent : any = {
                    "courseId" : this.students[i].getUsername(),
                    "title" : this.students[i].getFirstName() + " " + this.students[i].getLastName(),
                };
                if(this.classroomIds[i] === classroomId) {
                    //students with this classroomid
                    let tableRow = new TableRowCard(tableStudent, this.selectedStudentId++);
                    this.pickStudents.push(this.students[i]);
                    this.pickTableRowsStudents.push(tableRow);
                    

                } else if (classroomId == -1) {
                    //all students with a classroom
                    let tableRow = new TableRowCard(tableStudent, this.selectedStudentId++);
                    this.pickStudents.push(this.students[i]);
                    this.pickTableRowsStudents.push(tableRow);
                }
            }

        }       

        let table = new TableCards(this.pickTableRowsStudents);
        $("#table5").empty();
        if (this.pickTableRowsStudents.length === 0) {
            $("#table5").append(this.getEmptyTableView("This box is empty. This means that there are NO students without a classroom or this classroom is just empty!!"));

        } else {
            $("#table5").append(table.getTableView());
        }
        componentHandler.upgradeDom();
    }

    //SAVE AND DELETE BUTTONS
    //link students to a classroom and save in DB
    private saveButton() {
        let deletedElement : TableRowCard = new TableRowCard("DeletedElement", -10); 

        //get selected classroomid
        let classroomId : number = 0;
 
        var inputs = document.getElementById("competencySelectorAndSelectAllRows").getElementsByTagName("input");
        //loop through inputs
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].getAttribute("name") === "Classroom") {
                if (inputs[i].getAttribute("value").length === 0) {
                    window.alert("Please select a classroom..");
                    return;
                }

                let classroom : string = inputs[i].getAttribute("value");
                for (let j = 0; j < this.classRoomIdsForView.length; j++) {
                    if (this.classRoomIdsForView[j] === classroom) {
                        classroomId = this.classroomIdsForAddingToDB[j];
                    }
                    
                }
            }     
        }

        //get selected students
        let failed : number = 0;
        let atleastOneCardChecked : boolean = false;
        var checkBoxes = document.getElementById("table4").getElementsByTagName("label");
        //loop through checkboxes
        for(var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].classList.contains("is-checked")) {
                atleastOneCardChecked = true;
                this.linkTableRowsStudents[i] = deletedElement;
                //link the student to the classroom
                let failedBool2 : boolean = this.addOrDeleteStudentToClassroom(classroomId, this.linkStudents[i]);

                if (failedBool2) {
                    failed++;
                }  

            }
        }

        if (!atleastOneCardChecked) {
            window.alert("Please select a student..");
            return;
        }

        //remove the students from list
        for( var i = 0; i < this.linkTableRowsStudents.length; i++) {
            if (this.linkTableRowsStudents[i] === deletedElement) {
                this.linkTableRowsStudents.splice(i, 1); 
                this.linkStudents.splice(i, 1);
            }
        }

        for( var i = this.linkTableRowsStudents.length-1; i >= 0 ; i--) {
            if (this.linkTableRowsStudents[i] === deletedElement) {
                this.linkTableRowsStudents.splice(i, 1); 
                this.linkStudents.splice(i, 1);
            }         
        }        

        //feedback
        if (failed > 0) {
            window.alert(failed + " have failed saving (refresh page)");
        } else {
            window.alert("student(s) added to classroom succesfully!! (refresh page)");
        }


        let table = new TableCards(this.linkTableRowsStudents);
        $("#table4").empty();
        if (this.linkTableRowsStudents.length === 0) {
            $("#table4").append(this.getEmptyTableView("This box is empty. Go fill it with some new questions!!"));

        } else {
            $("#table4").append(table.getTableView());
        }

        componentHandler.upgradeDom();

    }

    //delete the link from students to a classroom and save in DB
    private deleteLinkStudentToClassroom() {
        let deletedElement : TableRowCard = new TableRowCard("DeletedElement", -10); 

        //get selected classroomid
        let classroomId : number = 0;
    
        var inputs = document.getElementById("competencySelectorAndSelectAllRows2").getElementsByTagName("input");
        //loop through inputs
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].getAttribute("name") === "Classroom") {
                if (inputs[i].getAttribute("value").length === 0) {
                    window.alert("Please select a classroom..");
                    return;
                } else if (inputs[i].getAttribute("value") === "All students with a classroom") {
                    window.alert("This function is not yet implemented for all students...");
                    return;
                } else if (inputs[i].getAttribute("value") === "Students without a classroom") {
                    window.alert("Student can't be deleted because it doesn't have a classroom");
                    return;
                }
                let classroom : string = inputs[i].getAttribute("value");
                for (let j = 0; j < this.classRoomIdsForView.length; j++) {
                    if (this.classRoomIdsForView[j] === classroom) {
                        classroomId = this.classroomIdsForAddingToDB[j];
                    }
                    
                }
            }     
        }

        //get selected students
        let failed : number = 0;
        let atleastOneCardChecked : boolean = false;
        var checkBoxes = document.getElementById("table5").getElementsByTagName("label");
        //loop through checkboxes
        for(var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].classList.contains("is-checked")) {
                atleastOneCardChecked = true;
                this.pickTableRowsStudents[i] = deletedElement;
                //deletes the student that is linked to a classroom
                let failedBool : boolean = this.addOrDeleteStudentToClassroom(classroomId, this.pickStudents[i]);
                
                if (failedBool) {
                    failed++;
                }  

            }
        }

        if (!atleastOneCardChecked) {
            window.alert("Please select a student..");
            return;
        }

        //remove the deleted students from list
        for( var i = 0; i < this.pickTableRowsStudents.length; i++) {
            if (this.pickTableRowsStudents[i] === deletedElement) {
                this.pickTableRowsStudents.splice(i, 1); 
                this.pickStudents.splice(i, 1);
            }
        }

        for( var i = this.pickTableRowsStudents.length-1; i >= 0 ; i--) {
            if (this.pickTableRowsStudents[i] === deletedElement) {
                this.pickTableRowsStudents.splice(i, 1); 
                this.pickStudents.splice(i, 1);
            }         
        }        

        //feedback
        if (failed > 0) {
            window.alert(failed + " have failed deleting (refresh page)");
        } else {
            window.alert("student(s) deleted from classroom succesfully!! (refresh page)");
        }

        let table = new TableCards(this.pickTableRowsStudents);
        $("#table5").empty();
        if (this.pickTableRowsStudents.length === 0) {
            $("#table5").append(this.getEmptyTableView("This box is empty. Go fill it with some new students!!"));

        } else {
            $("#table5").append(table.getTableView());
        }

        componentHandler.upgradeDom();

    }

    //deletes the student from list
    private deleteButton() {
        let deletedElement : TableRowCard = new TableRowCard("DeletedElement", -10); 

        //get selected students
        let atleastOneCardChecked : boolean = false;
        var checkBoxes = document.getElementById("table4").getElementsByTagName("label");
        //loop through checkboxes
        for(var i = 0; i < checkBoxes.length; i++) {
            if(checkBoxes[i].classList.contains("is-checked")) {
                atleastOneCardChecked = true;
                this.linkTableRowsStudents[i] = deletedElement;                
            }
        }

        if (!atleastOneCardChecked) {
            window.alert("Please select a student..");
            return;
        }


        //remove the deleted students from list
        for( var i = 0; i < this.linkTableRowsStudents.length; i++) {
            if (this.linkTableRowsStudents[i] === deletedElement) {
                this.linkTableRowsStudents.splice(i, 1); 
                this.linkStudents.splice(i, 1);
            }
        }

        for( var i = this.linkTableRowsStudents.length-1; i >= 0 ; i--) {
            if (this.linkTableRowsStudents[i] === deletedElement) {
                this.linkTableRowsStudents.splice(i, 1); 
                this.linkStudents.splice(i, 1);
            }         
        }

        let table = new TableCards(this.linkTableRowsStudents);
        $("#table4").empty();
        if (this.linkTableRowsStudents.length === 0) {
            $("#table4").append(this.getEmptyTableView("This box is empty. Go fill it with some new students!!"));

        } else {
            $("#table4").append(table.getTableView());
        }

        componentHandler.upgradeDom();

    }

    //DB CALLS
    //adds the student to a classroom or removes it from a classroom
    private addOrDeleteStudentToClassroom(classroomId : number, student : User) : any {
        let DB = new ApiService(API.DB);
        DB.setPath("classrooms/" + classroomId + "?userid=" + student.getUsername());
        DB.getParent(<T>(object : any) => {
            //check if POST is succeeded
            if (object.statusCode != 201) {
                return true;
            }
            return false;
        });
    }

    //adds classroom with this teacher as a teacher
    private addClassroom() : any {
        let data : any = {};

        let DBOptions : any = {
            headers: {
                //headerinfo
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        };

        let DB = new ApiService(API.DB);
        DB.setPath("classrooms");
        DB.setOptions(DBOptions);
        DB.post(<T>(object : any) => {
            //adds the teacher to this classroom
            let classroomId : number = JSON.parse(object.body).id;
            this.addOrDeleteStudentToClassroom(classroomId, LoginService.getInstance().getUser());
            
            //check if POST is succeeded
            if (object.statusCode != 201) {
                return true;
            }
            return false;
        });

    }

    //gets and sets the students with the classroomids
    private getClassroomsAndStudents() : any {

        let DB = new ApiService(API.DB);
        DB.setPath("classrooms");
        //getting the classrooms from DB
        DB.getParent((object : any) => {
            if (object.errorMessage == null) {
                object.forEach(mainResponse => {
                    //setting the ids and students
                    this.classRoomIdsForView.push("Class " + mainResponse.id);
                    this.classroomIdsForAddingToDB.push(mainResponse.id);
                    let classroomId : number = mainResponse.id;
                    mainResponse.students.forEach(mainResponse => { 
                        this.classroomIds.push(classroomId);
                        this.students.push(new User(mainResponse.firstName, mainResponse.lastName, mainResponse.username, mainResponse.password, mainResponse.email));
                    });
                });
                this.getAllStudents();
                this.setPickStudentTable();
                this.setLinkStudentTable();
            } else {
                $("#table5").append(this.getEmptyTableView("This box is empty. This means that there are NO classrooms!! Go make a classroom by doing step 1."));
                $("#table4").append(this.getEmptyTableView("This box is empty. This means that there are NO classrooms!! Go make a classroom by doing step 1."));
                console.log("Something went wrong!");
            }
 
        });
 
        
    }

    //gets and sets students that dont have a classroom
    private getAllStudents() {
        let DB = new ApiService(API.DB);
        DB.setPath("users");
        //getting the users from DB
        DB.getParent((object : any) => {
            if (object.errorMessage == null) {
                object.forEach(mainResponse => {
                    let role : string = mainResponse.role;
                    if (role === "USER") {
                        let student = new User(mainResponse.firstName, mainResponse.lastName, mainResponse.username, mainResponse.password, mainResponse.email);
                        let hasClassroom : boolean = false;
                        //check if student has a classroom
                        for (let i = 0; i < this.students.length; i++) {
                           if (this.students[i].getUsername() === student.getUsername()) {
                               hasClassroom = true;
                           }
                            
                        }

                        if (!hasClassroom) {
                            console.log("added user without classroom");
                            //add to exceptional list
                            this.studentsWithoutClassroom.push(student);
                        }
                    }
                    
                });
            } else {
                console.log("Something went wrong!");
            }
 
        });
    }

    //GENERAL CODE

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
        componentHandler.upgradeDom();
    }

    //text for in tables when the table is empty
    private getEmptyTableView(text : string) {
        return `<br><br><br><div class="mdl-typography--display-1-color-contrast" style="font-size: 150%; text-align: center;">${text}</div>`;
    }

}