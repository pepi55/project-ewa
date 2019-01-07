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
import { StudentSavedCoursesController } from "./controllers/StudentSavedCoursesController";
import { TeacherClassesController } from "./controllers/TeacherClassesController.";
import { TeacherEditClassController } from "./controllers/TeacherEditClassController";
import { AdminApprove } from "./controllers/AdminApprove";

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

        let controller : any;

        switch (type) {
            case "login":
                controller = new LoginController();
                break;

            case "adminCourses":
                controller = new AdminCourseController();
                break;

            case "userCourses":
                controller = new UserCourseController();
                break;

            case "profile":
                controller = new ProfileController();
                break;

            case "test":
                controller = new TestController();
                break;

            case "result":
                controller = new ResultController();
                break;

            case "AdminSavedCoursesController":
                controller = new AdminSavedCoursesController();
                break;

            case "adminEditTestController":
                controller = new AdminEditTestController();
                break;

            case "studentSavedCoursesController":
                controller = new StudentSavedCoursesController();
                break;

            case "adminApprove":
                controller = new AdminApprove();
                break;

            case "teacherClassesController":
                controller = new TeacherClassesController();
                break;

            case "teacherEditClassController":
                controller = new TeacherEditClassController();
                break;

            default:
                break;
        }
    }
}

module.exports = function app(type : string) {
    console.log("rerouting.....")
    let app = new App();
    app.main(type);
}
