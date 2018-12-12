import { Controller } from "./Controller";
import { MenuController } from "./menucontroller";
import { LoginService } from "../components/loginService";
import { User } from "../components/User";
import { CardButton } from "../components/CardButton";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";

export class ProfileController extends Controller {

    protected setup(): void {
        let menuController = new MenuController();
        let user = LoginService.getInstance().getUser();

        let cardButton = new CardButton();
        cardButton.setOnClick((e: any) => {
            let DBOptions : any = {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            };

            let DB = new ApiService(API.DB);
            DB.setPath("users");
            DB.setOptions(DBOptions);
            DB.delete(<T>(Object: any) =>{

            })
        });

        $("#profile_email").html(user.getEmail());
        $("#profile_username").html(user.getUsername());
        $("#profile_firstname").html(user.getFirstName());
        $("#profile_lastname").html(user.getLastName());
        $("#profile_role").html(user.getRoleName());

        $(".mdl-card__actions").html(cardButton.getView());
    }
}