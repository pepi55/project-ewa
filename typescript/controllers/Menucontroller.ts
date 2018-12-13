import { Controller } from "./Controller";
import { MenuItem } from "../components/MenuItem";
import { LoginService } from "../components/LoginService";
import { User } from "../components/User";
import { UserCard } from "../components/UserCard";
import { Button } from "../components/button/Button";
declare var componentHandler: any;

export class MenuController extends Controller {

    protected setup(): void {
        let logoutItem: MenuItem = new MenuItem("Logout");
        let profileItem: MenuItem = new MenuItem("Profile");
        let menuItem: MenuItem = new MenuItem("Menu");
        let coursesItem: MenuItem = new MenuItem("Courses");
        let adminItem: MenuItem = new MenuItem("Admin");

        logoutItem.setOnClick((e: any) => {
            LoginService.getInstance().logout();
            window.location.href = "/servlet/index.html";
        })
        profileItem.setOnClick((e: any) => { window.location.href = "/servlet/views/profile.html"; })
        menuItem.setOnClick((e: any) => { window.location.href = "/servlet/views/menu.html"; })
        coursesItem.setOnClick((e: any) => { window.location.href = "/servlet/views/userCourses.html"; })
        adminItem.setOnClick((e: any) => { window.location.href = "/servlet/views/adminCourses.html"; })

        $("#on-page")
            .append(logoutItem.getView())
            .append(profileItem.getView());
        $("#on-bar")
            .append(menuItem.getView())
            .append(coursesItem.getView())
            .append(adminItem.getView())
            .append(logoutItem.getView())
            .append(profileItem.getView());

        if (LoginService.getInstance().getUser().getRole() == 1) {

        } else if (LoginService.getInstance().getUser().getRole() == 2) {
            console.log("in admin")
            let users: Array<User> = new Array();
            let url = "http://127.0.0.1:8080/servlet/services/rest/users?approve=not_approved";
            let promise = fetch(url);
            promise.then(function (result) {
                return result.json();
            }).then(function (json: any) {
                for (let user of json) {
                    let newuser = new User(user["email"], user["firstName"], user["lastName"], user["username"], user["password"], user["role"]);
                    $("#admin_approve").append(new UserCard(newuser).getView());
                    let acceptButton = new Button("Accept");
                    acceptButton.setOnClick((e: any) => {
                        let url = "http://localhost:8080/servlet/services/rest/users/"+user["username"]+"?approve=not_approved";
                        let promise = fetch(url);
                        promise.then(function (result) {
                            return result.json();
                        }).then(function (json: any) {
                            for (let user of json){
                                if (user["approved"] == "true"){
                                    window.alert("Hallo?");
                                }
                            }
                        }.bind(this))
                    })
                    let denyButton = new Button("Deny");
                    denyButton.setOnClick((e: any) => { console.log("deny") })

                    $("#button_area").append(acceptButton.getView());
                    $("#button_area").append('<div style="width:20px; display: inline-block"></div>');
                    $("#button_area").append(denyButton.getView());
                }
            });
            componentHandler.upgradeDom();
        }
    }
}