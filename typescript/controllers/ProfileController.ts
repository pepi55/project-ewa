import { Controller } from "./Controller";
import { MenuController } from "./menucontroller";
import { LoginService } from "../components/loginService";
import { User } from "../components/User";

export class ProfileController extends Controller {

    protected setup(): void {
        let menuController = new MenuController();

        let user = LoginService.getInstance().getUser();
        console.log(user)
        $("#profile_id").html(user.getId());
        $("#profile_email").html(user.getEmail());
        $("#profile_username").html(user.getUsername());
        $("#profile_firstname").html(user.getFirstName());
        $("#profile_lastname").html(user.getLastName());
        $("#profile_role").html(user.getRoleName());
    }
}