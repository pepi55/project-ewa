import { Menu } from "./controllers/Menu";
import { LoginController } from "./controllers/Logincontroller";
import { AdminCourseController } from "./controllers/AdminController";
import { UserCourseController } from "./controllers/UserCourseController";
import { LoginService } from "./components/LoginService";
import { ProfileController } from "./controllers/ProfileController";
import { AdminSavedCoursesController } from "./controllers/AdminsavedCoursesController";
declare var componentHandler : any;

export class App {

    //private menu : Menu;

    public main(type: any): void {
        if (!LoginService.getInstance().isLoggedIn() && type != "login") {
            window.location.href = "/servlet/index.html";
            return
        } else {
            //setting menu by role        
            let role : string = LoginService.getInstance().getUserRole();
            console.log("setting menu for role: " + role + "...");
            let menu : Menu = new Menu(role);
            $("#onPage").append(menu.getOnPage());
            $("#onBar").append(menu.getOnBar());
            componentHandler.upgradeDom();
        }
    


        if (type == "login") {
            let controller: LoginController = new LoginController();
        } else if (type == "adminCourses") {
            let controller : AdminCourseController = new AdminCourseController();
        } else if (type == "userCourses") {
            let controller : UserCourseController = new UserCourseController();
        } else if (type == "profile") {
            let controller : ProfileController = new ProfileController();
        } else if (type == "AdminSavedCoursesController") {
            let controller : AdminSavedCoursesController = new AdminSavedCoursesController();
        }
    }
}

module.exports = function app(type : string) {
    console.log("rerouting.....")
    let app = new App();
    app.main(type);
}
