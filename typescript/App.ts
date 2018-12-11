import { MenuController } from "./controllers/Menucontroller";
import { LoginController } from "./controllers/LoginController";
import { adminCourseController } from "./controllers/AdminController";
import { userCourseController } from "./controllers/UserCourseController";
import { LoginService } from "./components/LoginService";
import { TestController } from "./controllers/testController";
import { ResultController } from "./controllers/ResultController";



export class App {
    public main(type: any): void {
        if (!LoginService.getInstance().isLoggedIn() && type != "login") {
            window.location.href = "/servlet/index.html";
            return
        }

        if (type == "main"){
            let controller: MenuController = new MenuController();
        } else if (type == "login") {
            let controller: LoginController = new LoginController();
        } else if (type == "adminCourses") {
            let controller : adminCourseController = new adminCourseController();
        } else if (type == "userCourses") {
            let controller : userCourseController = new userCourseController();
        } else if (type == "test") {
            let controller : TestController = new TestController();
        } else if (type == "result") {
            let controller : ResultController = new ResultController();
        }  
    }
}

module.exports = function app(type : string) {
    console.log("rerouting.....")
    let app = new App();
    app.main(type);
}
