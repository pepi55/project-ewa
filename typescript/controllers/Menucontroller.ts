import { Controller } from "./Controller";
import { MenuItem } from "../components/MenuItem";
import { LoginService } from "../components/LoginService";

export class MenuController extends Controller {

    protected setup(): void {
        let logoutItem: MenuItem = new MenuItem("Logout");
        let profileItem: MenuItem = new MenuItem("Profile");
        let menuItem: MenuItem = new MenuItem("Menu");
        let coursesItem: MenuItem = new MenuItem("Courses");
        let adminItem: MenuItem = new MenuItem("Admin");
        let testItem: MenuItem = new MenuItem("Test");
        let resultItem: MenuItem = new MenuItem("Results");

        logoutItem.setOnClick((e: any) => {
            LoginService.getInstance().logout();
            window.location.href = "/servlet/index.html";
        })
        profileItem.setOnClick((e: any) => {window.location.href = "/servlet/views/profile.html";})
        menuItem.setOnClick((e: any) => {window.location.href = "/servlet/views/menu.html";})
        coursesItem.setOnClick((e: any) => {window.location.href = "/servlet/views/userCourses.html";})
        adminItem.setOnClick((e: any) => {window.location.href = "/servlet/views/adminCourses.html";})
        testItem.setOnClick((e: any) => {window.location.href = "/servlet/views/test.html"})
        resultItem.setOnClick((e: any) => {window.location.href = "/servlet/views/result.html"})
        

        $("#on-page")
        .append(logoutItem.getView())
        .append(profileItem.getView());
        
        $("#on-bar")
        .append(menuItem.getView())
        .append(coursesItem.getView())
        .append(testItem.getView())
        .append(resultItem.getView())
        .append(adminItem.getView())
        .append(logoutItem.getView())
        .append(profileItem.getView());
        
    }
}