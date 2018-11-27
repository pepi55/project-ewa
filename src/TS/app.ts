import { MenuController } from "./controllers/menucontroller";
import { LoginController } from "./controllers/logincontroller";
import { adminCourseController } from "./controllers/adminCourseController";
import { userCourseController } from "./controllers/userCourseController";
import { LoginService } from "./components/loginService";


export class App {
    
    public main(type: any): void {
        if (!LoginService.getInstance().isLoggedIn() && type != "login") {
            window.location.href = "/index.html";
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
        }
    }
}

module.exports = function app(type : string) {
    console.log("rerouting.....")
    let app = new App();
    app.main(type);
}