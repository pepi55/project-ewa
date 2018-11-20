import { Controller } from "controller";
import { Button } from "components/button/button";
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
                onSignup++;
            } else {
                if ((document.getElementById("signup_email") as HTMLInputElement).value == ""){
                    $("#email_error").html("*Fill in email").css("display", "block");    
                } else {
                    $("#email_error").html("").css("display", "none");    
                }
                if ((document.getElementById("signup_username") as HTMLInputElement).value == ""){
                    $("#username_error").html("*Fill in username").css("display", "block");
                } else {
                    $("#username_error").html("").css("display", "none"); 
                }
                if ((document.getElementById("signup_firstname") as HTMLInputElement).value == ""){
                    $("#firstname_error").html("*Fill in first name").css("display", "block");    
                } else {
                    $("#firstname_error").html("").css("display", "none");    
                }
                if ((document.getElementById("signup_lastname") as HTMLInputElement).value == ""){
                    $("#lastname_error").html("*Fill in last name").css("display", "block");
                } else {
                    $("#lastname_error").html("").css("display", "none");   
                }
                if ((document.getElementById("signup_birthdate") as HTMLInputElement).value == ""){
                    $("#birthdate_error").html("*Fill in date of birth").css("display", "block");
                } else {
                    $("#birthdate_error").html("").css("display", "none");   
                }
                if ((document.getElementById("signup_adres") as HTMLInputElement).value == ""){
                    $("#adres_error").html("*Fill in adres").css("display", "block");    
                } else {
                    $("#adres_error").html("").css("display", "none");    
                }
                if ((document.getElementById("signup_housenumber") as HTMLInputElement).value == ""){
                    $("#housenumber_error").html("*Fill in house number").css("display", "block");    
                } else {
                    $("#housenumber_error").html("").css("display", "none");    
                }
                if ((document.getElementById("signup_postalcode") as HTMLInputElement).value == ""){
                    $("#postalcode_error").html("*Fill in postal code").css("display", "block");    
                } else {
                    $("#postalcode_error").html("").css("display", "none");    
                }
                if ((document.getElementById("signup_phone") as HTMLInputElement).value == ""){
                    $("#phone_error").html("*Fill in phone number").css("display", "block");
                } else {
                    $("#phone_error").html("").css("display", "none");   
                }
                if ((document.getElementById("signup_password") as HTMLInputElement).value == ""){
                    $("#password_error").html("*Fill in password").css("display", "block");    
                } else {
                    $("#password_error").html("").css("display", "none");    
                }
                if ((document.getElementById("signup_password") as HTMLInputElement).value == (document.getElementById("signup_repassword") as HTMLInputElement).value) {
                    $("#repassword_error").html("").css("display", "none");
                } else{
                    $("#repassword_error").html("Password don't match").css("display", "block");    
                }
            }
        })
        backButton.setOnClick((e: any) => {
            $("#login").css("display", "block");
            $(".login_buttons").css("display", "inline-block");
            $("#signup").css("display", "none");
            $("#back-button").css("display", "none");
            onSignup--;
        })
        $("#login-button").append(loginButton.getView());
        $("#signup-button").append(signupButton.getView());
        $("#back-button").append(backButton.getView());
    }
}