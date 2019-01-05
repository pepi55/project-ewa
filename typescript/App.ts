import { Menu } from "./controllers/Menu";
import { LoginController } from "./controllers/Logincontroller";
import { AdminCourseController } from "./controllers/AdminController";
import { UserCourseController } from "./controllers/UserCourseController";
import { LoginService } from "./components/LoginService";
import { ProfileController } from "./controllers/ProfileController";
import { TestController } from "./controllers/testController";
import { ResultController } from "./controllers/ResultController";
import { AdminSavedCoursesController } from "./controllers/AdminsavedCoursesController";
import { UserRole } from "./components/UserRole";
import { AdminEditTestController } from "./controllers/AdminEditTestController";

declare var componentHandler : any;


export class App {

    //private menu : Menu;

    public main(type: any): void {
        if (!LoginService.getInstance().isLoggedIn() && type != "login") {
            window.location.href = "/servlet/index.html";
            return
        } else {
            //setting menu by role        
            let role : UserRole = UserRole[LoginService.getInstance().getUserRole()];
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
        } else if (type == "test") {
            let controller : TestController = new TestController();
        } else if (type == "result") {
            let controller : ResultController = new ResultController();
        }  
        } else if (type == "AdminSavedCoursesController") {
            let controller : AdminSavedCoursesController = new AdminSavedCoursesController();
        } else if (type == "adminEditTestController") {
            let controller : AdminEditTestController = new AdminEditTestController();
        }
    }
}

module.exports = function app(type : string) {
    console.log("rerouting.....")
    let app = new App();
    app.main(type);
}
