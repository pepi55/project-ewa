import { MainController } from "./controllers/maincontroller";
import { LoginController } from "./controllers/logincontroller";
import { adminCourseController } from "./controllers/adminCourseController";


export class App {
    
    public main(type: any): void {
        console.log("werkt app")
        if (type == "main"){
            let controller: MainController = new MainController();
        } else if (type == "login") {
            let controller: LoginController = new LoginController();
        } else if (type == "courses") {
            console.log("kak")
            let controller : adminCourseController = new adminCourseController();
        }
    }
}

module.exports = function app(type : string) {
    let app = new App();
    console.log("12343")
    console.log("index file wertk")
    app.main(type);
}