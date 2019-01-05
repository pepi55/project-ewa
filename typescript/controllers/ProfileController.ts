import { Controller } from "./Controller";
import { Menu } from "./Menu";
import { LoginService } from "../components/loginService";
import { CardButton } from "../components/CardButton";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";

export class ProfileController extends Controller {

    protected setup(): void {
        let user = LoginService.getInstance().getUser();

        let cardButton = new CardButton();
        cardButton.setOnClick((e: any) => {
            let DB = new ApiService(API.DB);
            DB.setPath("users/"+user.getUsername());
            DB.delete(<T>(object: any) =>{
                console.log(object);
                if (object.statusCode == 200){
                    LoginService.getInstance().logout();
                }
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