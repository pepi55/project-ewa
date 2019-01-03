import { Controller } from "./Controller";
import { MenuItem } from "../components/MenuItem";
import { LoginService } from "../components/LoginService";
import { User } from "../components/User";
import { UserCard } from "../components/UserCard";
import { Button } from "../components/button/Button";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
declare var componentHandler: any;

export class MenuController extends Controller {

    protected setup(): void {
        let logoutItem: MenuItem = new MenuItem("Logout");
        let profileItem: MenuItem = new MenuItem("Profile");
        let menuItem: MenuItem = new MenuItem("Menu");
        let coursesItem: MenuItem = new MenuItem("Courses");
        let adminItem: MenuItem = new MenuItem("Admin");
        let testItem: MenuItem = new MenuItem("Test");

        logoutItem.setOnClick((e: any) => {
            LoginService.getInstance().logout();
        })
        profileItem.setOnClick((e: any) => { window.location.href = "/servlet/views/profile.html"; })
        menuItem.setOnClick((e: any) => { window.location.href = "/servlet/views/menu.html"; })
        coursesItem.setOnClick((e: any) => { window.location.href = "/servlet/views/userCourses.html"; })
        adminItem.setOnClick((e: any) => { window.location.href = "/servlet/views/adminCourses.html"; })
        testItem.setOnClick((e: any) => {window.location.href = "/servlet/views/test.html"})

        $("#on-page")
            .append(logoutItem.getView())
            .append(profileItem.getView());
        $("#on-bar")
            .append(menuItem.getView())
            .append(coursesItem.getView())
            .append(testItem.getView())
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
                let i = 0;
                for (let user of json) {
                    let newuser = new User(user["email"], user["firstName"], user["lastName"], user["username"], user["password"], user["role"]);
                    $("#admin_approve").append(new UserCard(newuser, i).getView());
                    componentHandler.upgradeDom();
                    let acceptButton = new Button("Accept");
                    acceptButton.setOnClick((e: any) => {
                        let url = "http://localhost:8080/servlet/services/rest/users/" + user["username"] + "?approve=true";
                        let promise = fetch(url);
                        promise.then(function (result) {
                            return result.json();
                        }).then(function (json: any) {
                            for (let user of json) {
                                if (user["approved"] == true) {
                                    window.alert("approved?");
                                    $("#newUser" + i).remove();
                                    console.log("removed #newUser" + i)
                                    componentHandler.upgradeDom();

                                    // Ghetto fix
                                    location.reload();
                                }
                            }
                        }.bind(this))
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
                                componentHandler.upgradeDom();

                                // Ghetto fix
                                location.reload();
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
}