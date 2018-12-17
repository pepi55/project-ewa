import { User } from "./User";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";

export class ObjectInserter {

    public constructor() {
        let admin = new User("admin", "admin", "admin", "admin", "admin", 2);
        let teacher = new User("teacher", "teacher", "teacher", "teacher", "teacher", 1);
        let student = new User("student", "student", "student", "student", "student", 0);

        let DBOptions: any = {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(admin)
        };

        let DB = new ApiService(API.DB);
        DB.setPath("users");
        DB.setOptions(DBOptions);
        DB.post(<T>(object: any) => {
            console.log("Posting user to backend...");
            console.log(object);

            if (object.statusCode == 201) {
                window.alert("Admin added");

                // Ghetto fix
                location.reload();
            } else {
                window.alert("Something went wronk");
            }
        });

        DBOptions = {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teacher)
        };

        DB = new ApiService(API.DB);
        DB.setPath("users");
        DB.setOptions(DBOptions);
        DB.post(<T>(object: any) => {
            console.log("Posting user to backend...");
            console.log(object);

            if (object.statusCode == 201) {
                window.alert("Teaher added");

                // Ghetto fix
                location.reload();
            } else {
                window.alert("Something went wronk");
            }
        });

        DBOptions = {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        };

        DB = new ApiService(API.DB);
        DB.setPath("users");
        DB.setOptions(DBOptions);
        DB.post(<T>(object: any) => {
            console.log("Posting user to backend...");
            console.log(object);

            if (object.statusCode == 201) {
                window.alert("Student added");

                // Ghetto fix
                location.reload();
            } else {
                window.alert("Something went wronk");
            }
        });
    }
}