import { ApiService } from "../coursesAPIs/ApiService";
import { Controller } from "./Controller";
import { Button } from "../components/button/Button";
import { UserHandler } from "../components/UserHandler";
import { User } from "../components/User";
import { API } from "../coursesAPIs/EnumRepo";

export class LoginController extends Controller {
    private userHandler: UserHandler = new UserHandler();

    protected setup(): void {
        $.get(this.pathToViews + "login.html").done(function (data: any) {
            $("#window").append(data);
        });

        $.get(this.pathToViews + "signup.html").done(function (data: any) {
            $("#window").append(data);
        });

        let loginButton: Button = new Button("Login");
        let signupButton: Button = new Button("Sign up");
        let backButton: Button = new Button("Back");

        loginButton.setOnClick((e: any) => {
            this.userHandler.getPasswordByUsername("test");

            if (this.userHandler.getPasswordByUsername((document.getElementById("username") as HTMLInputElement).value) == (document.getElementById("password") as HTMLInputElement).value) {
                window.location.href = this.pathToViews + "menu.html";
            } else {
                $("#errorbox").html("Username and password don't match. Please try again.")
            }
        })

        let onSignup = 0;
        let user: User = new User(null, null, null, null, null, null, null);

        signupButton.setOnClick((e: any) => {
            if (onSignup == 0) {
                $("#login").css("display", "none");
                $(".login_buttons").css("display", "none");
                $("#signup").css("display", "block");
                $("#back-button").css("display", "block");

                onSignup++;
            } else {
                if ((document.getElementById("signup_email") as HTMLInputElement).value == "") {
                    $("#email_error").html("*Fill in email").css("display", "block");
                } else {
                    $("#email_error").html("").css("display", "none");

                    let signup_email : string = (document.getElementById("signup_email") as HTMLInputElement).value;

                    //console.log(signup_email);
                    user.setEmail(signup_email);
                }

                if ((document.getElementById("signup_username") as HTMLInputElement).value == "") {
                    $("#username_error").html("*Fill in username").css("display", "block");
                } else {
                    $("#username_error").html("").css("display", "none");

                    let signup_username : string = (document.getElementById("signup_username") as HTMLInputElement).value;

                    //console.log(signup_username);
                    user.setUsername(signup_username);
                }

                if ((document.getElementById("signup_firstname") as HTMLInputElement).value == "") {
                    $("#firstname_error").html("*Fill in first name").css("display", "block");
                } else {
                    $("#firstname_error").html("").css("display", "none");

                    let signup_firstname : string = (document.getElementById("signup_firstname") as HTMLInputElement).value;

                    //console.log(signup_firstname);
                    user.setFirstName(signup_firstname);
                }

                if ((document.getElementById("signup_lastname") as HTMLInputElement).value == "") {
                    $("#lastname_error").html("*Fill in last name").css("display", "block");
                } else {
                    $("#lastname_error").html("").css("display", "none");

                    let signup_lastname : string = (document.getElementById("signup_lastname") as HTMLInputElement).value;

                    //console.log(signup_lastname);
                    user.setLastName(signup_lastname);
                }

                if ((document.getElementById("signup_password") as HTMLInputElement).value == "") {
                    $("#password_error").html("*Fill in password").css("display", "block");
                } else {
                    $("#password_error").html("").css("display", "none");
                }

                if ((document.getElementById("signup_password") as HTMLInputElement).value == (document.getElementById("signup_repassword") as HTMLInputElement).value) {
                    $("#repassword_error").html("*Passwords aren't the same").css("display", "none");

                    // FIXME: Update password check.
                    let signup_password : string = (document.getElementById("signup_password") as HTMLInputElement).value;

                    //console.log(signup_password);
                    user.setPassword(signup_password);
                } else {
                    $("#repassword_error").html("Password don't match").css("display", "block");
                }

                // Set user role.
                {
                    let element = (document.getElementById("signup_role") as HTMLSelectElement);
                    let signup_role = Number(element.options[element.selectedIndex].value);

                    //console.log(signup_role);
                    user.setRole(signup_role);
                }

                if (user.checkUserData()) {
                    let DBOptions : any = {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    };

                    let DB = new ApiService(API.DB);
                    DB.setPath("users");
                    DB.setOptions(DBOptions);
                    DB.post(<T>(object : any) => {
                        console.log("Posting user to backend...");
                        console.log(object);

                        if (object.statusCode == 201) {
                            window.alert("User added");

                            // Ghetto fix
                            location.reload();
                        } else {
                            window.alert("Something went wronk");
                        }
                    });
                }
            }
        });

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
