import { MainController } from "controllers/maincontroller";
import { LoginController } from "./controllers/logincontroller";

export class App {
    
    public static main(type: any): void {
        console.log(type)
        if (type == "main"){
            let controller: MainController = new MainController();
        } else if (type == "login") {
            let controller: LoginController = new LoginController();
        }
    }
}