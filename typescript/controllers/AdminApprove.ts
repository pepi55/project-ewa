import { User } from "../components/User";
import { UserCard } from "../components/UserCard";
import { Button } from "../components/button/Button";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
import { Controller } from "./Controller";
declare var componentHandler: any;

/**
 * class for approving new admins / teachers
 */
export class AdminApprove extends Controller {

    protected setup(): void {
        // get all the unapproved users
        console.log("hallo?")
        let url = "http://127.0.0.1:8080/servlet/services/rest/users?approve=not_approved";
        let promise = fetch(url);
        promise.then(function (result) {
            return result.json();
        }).then(function (json: any) {
            let i = 0;
            for (let user of json) {
                let newuser = new User(user["email"], user["firstName"], user["lastName"], user["username"], user["password"], user["role"]);
                $("#admin_approve").append(new UserCard(newuser, i).getView());

                let acceptButton = new Button("Accept");
                acceptButton.setOnClick((e: any) => {
                    console.log("clicked")
                    let url = "http://localhost:8080/servlet/services/rest/users/" + user["username"] + "?approve=true";
                    let promise = fetch(url);
                    promise.then(function (result) {
                        return result.json();
                    }).then(function (json: any) {
                        console.log(json)
                    }.bind(this))
                    $("#newUser" + i).remove();
                    console.log("removed #newUser" + i)

                    //to fix
                    location.reload();
                })

                let denyButton = new Button("Deny");
                denyButton.setOnClick((e: any) => {
                    let DB = new ApiService(API.DB);
                    DB.setPath("users/" + user["username"]);
                    DB.delete(<T>(object: any) => {
                        console.log(object);
                        if (object.statusCode == 200) {
                            console.log("denied")
                            $("#newUser" + i).remove();
                            console.log("removed #newUser" + i)

                            //to fix
                            this.location.reload();
                        }
                    })
                })

                $("#button_area" + i).append(acceptButton.getView())
                    .append('<div style="width:20px; display: inline-block"></div>')
                    .append(denyButton.getView());
                i++;
            }
        });
        componentHandler.upgradeDom();
    }
}