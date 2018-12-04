import { MenuController } from "./controllers/Menucontroller";
import { LoginController } from "./controllers/Logincontroller";
import { AdminCourseController } from "./controllers/AdminController";
import { UserCourseController } from "./controllers/UserCourseController";
import { LoginService } from "./components/LoginService";
import { ProfileController } from "./controllers/ProfileController";


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
            let controller : AdminCourseController = new AdminCourseController();
        } else if (type == "userCourses") {
            let controller : UserCourseController = new UserCourseController();
        } else if (type == "profile") {
            let controller : ProfileController = new ProfileController();
        }
    }
}

module.exports = function app(type : string) {
    console.log("rerouting.....")
    let app = new App();
    app.main(type);
}
