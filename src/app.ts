import { MainController } from "controllers/maincontroller";
import { LoginController } from "./controllers/logincontroller";
import { TestController } from "./controllers/testcontroller";

export class App {
    
    public static main(type: any): void {
        console.log(type)
        if (type == "main"){
            let controller: MainController = new MainController();
        } else if (type == "login") {
            let controller: LoginController = new LoginController();
        }
        else if (type == "test") {
            console.log("i")
            let controller: TestController = new TestController();
        }

        
        
    }
}