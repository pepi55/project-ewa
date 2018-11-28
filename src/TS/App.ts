import { MainController } from "./controllers/MainController"
import { LoginController } from "./controllers/LoginController";
import { adminCourseController } from "./controllers/AdminCourseController";
import { userCourseController } from "./controllers/UserCourseController";

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
        }
    }
}

module.exports = function app(type : string) {
    console.log("rerouting.....")
    let app = new App();
    app.main(type);
}
