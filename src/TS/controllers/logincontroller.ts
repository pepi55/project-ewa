import { Controller } from "./controller";
import { Button } from "../components/button/button";
import { UserHandler } from "../components/userhandler";

export class LoginController extends Controller {
    private userHandler: UserHandler = new UserHandler();

    protected setup(): void {
        $.get("/views/login.html").done(function (data: any) {
            $("#window").append(data);
        });
        $.get("/views/signup.html").done(function (data: any) {
            $("#window").append(data);
        });
        let loginButton: Button = new Button("Login");
        let signupButton: Button = new Button("Sign up");
        let backButton: Button = new Button("Back");
        loginButton.setOnClick((e: any) => {
            this.userHandler.getPasswordByUsername("test");
            if (this.userHandler.getPasswordByUsername((document.getElementById("username") as HTMLInputElement).value) == (document.getElementById("password") as HTMLInputElement).value) {
                window.location.href = "views/menu.html";
            } else {
                $("#errorbox").html("Username and password don't match. Please try again.")
            }
        })
        let onSignup = 0;
        signupButton.setOnClick((e: any) => {
            if (onSignup == 0) {
                $("#login").css("display", "none");
                $(".login_buttons").css("display", "none");
                $("#signup").css("display", "block");
                $("#back-button").css("display", "block");
            } else {
                if ((document.getElementById("signup_password") as HTMLInputElement).value == (document.getElementById("signup_repassword") as HTMLInputElement).value) {

                }
            }
        })
        backButton.setOnClick((e: any) => {
            $("#login").css("display", "block");
            $(".login_buttons").css("display", "inline-block");
            $("#signup").css("display", "none");
            $("#back-button").css("display", "none");
        })
        $("#login-button").append(loginButton.getView());
        $("#signup-button").append(signupButton.getView());
        $("#back-button").append(backButton.getView());
    }
}