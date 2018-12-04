import { Controller } from "./controller";
import { MenuItem } from "../components/menuItem";
import { LoginService } from "../components/loginService";

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
        profileItem.setOnClick((e: any) => {window.location.href = "/servlet/views/profile.html";})
        menuItem.setOnClick((e: any) => {window.location.href = "/servlet/views/menu.html";})
        coursesItem.setOnClick((e: any) => {window.location.href = "/servlet/views/userCourses.html";})
        adminItem.setOnClick((e: any) => {window.location.href = "/servlet/views/adminCourses.html";})

        $("#on-page")
        .append(logoutItem.getView())
        .append(profileItem.getView());
        $("#on-bar")
        .append(menuItem.getView())
        .append(coursesItem.getView())
        .append(adminItem.getView())
        .append(logoutItem.getView())
        .append(profileItem.getView());
        
    }
}