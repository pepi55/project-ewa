import { MainController } from "./controllers/maincontroller";
import { LoginController } from "./controllers/logincontroller";
import { adminCourseController } from "./controllers/adminCourseController";
import { userCourseController } from "./controllers/userCourseController";
import { TestController} from "./controllers/testcontroller";

export class App {
    public main(type: any): void {
        if (type == "main"){
            let controller: MainController = new MainController();
        } else if (type == "login") {
            let controller: LoginController = new LoginController();
        } else if (type == "adminCourses") {
            let controller : adminCourseController = new adminCourseController();
        } else if (type == "userCourses") {
            let controller : userCourseController = new userCourseController();
        } else if (type == "test"){
            let controller: TestController = new TestController();
        }
    }
}

module.exports = function app(type : string) {
    console.log("rerouting.....")
    let app = new App();
    app.main(type);
}
