import { MenuItem } from "../components/MenuItem";
import { LoginService } from "../components/LoginService";
import { UserRole } from "../components/UserRole";

export class Menu {

    private onBar: string[] = [];
    private onPage: string[] = [];

    constructor(role: UserRole) {
        //general
        let logoutItem: MenuItem = new MenuItem("Logout");
        logoutItem.setOnClick((e: any) => {
            LoginService.getInstance().logout();
            window.location.href = "/servlet/index.html";
        });

        let profileItem: MenuItem = new MenuItem("Profile");
        profileItem.setOnClick((e: any) => { window.location.href = "/servlet/views/profile.html"; })

        //admin & teachers
        let newCoursesItem: MenuItem = new MenuItem("Courses");
        newCoursesItem.setOnClick((e: any) => { window.location.href = "/servlet/views/newCourses.html"; })

        let savedCoursesItem: MenuItem = new MenuItem("Saved courses");
        savedCoursesItem.setOnClick((e: any) => { window.location.href = "/servlet/views/savedCourses.html"; })

        let AdminTestItem: MenuItem = new MenuItem("Test");
        AdminTestItem.setOnClick((e: any) => { window.location.href = "/servlet/views/adminTest.html"; })

        //students
        let StudentCoursesItem: MenuItem = new MenuItem("My Courses");
        StudentCoursesItem.setOnClick((e: any) => { window.location.href = "/servlet/views/studentCourses.html"; })

        let StudentResultsItem: MenuItem = new MenuItem("My Results");
        StudentResultsItem.setOnClick((e: any) => { window.location.href = "/servlet/views/studentResults.html"; })

        let StudentTestItem: MenuItem = new MenuItem("Test");
        StudentTestItem.setOnClick((e: any) => { window.location.href = "/servlet/views/studentTest.html"; })

        //teachers
        let teacherClassItem: MenuItem = new MenuItem("My Classes");
        teacherClassItem.setOnClick((e: any) => { window.location.href = "/servlet/views/teacherClass.html"; })

        //admins
        let adminApproveItem: MenuItem = new MenuItem("New Approvals");
        adminApproveItem.setOnClick((e: any) => { window.location.href = "/servlet/views/adminApprove.html"; })

        let teacherEditClassItem: MenuItem = new MenuItem("Edit Classes");
        teacherEditClassItem.setOnClick((e: any) => { window.location.href = "/servlet/views/teacherEditClass.html"; })

        //setting buttons for the menu
        switch (role) {
            case UserRole.ADMIN:
                //onbar
                this.onBar.push(newCoursesItem.getView());
                this.onBar.push(savedCoursesItem.getView());
                this.onBar.push(AdminTestItem.getView());
                this.onBar.push(adminApproveItem.getView());

                //onpage
                this.onPage.push(newCoursesItem.getView());
                this.onPage.push(savedCoursesItem.getView());
                this.onPage.push(AdminTestItem.getView());
                this.onPage.push(adminApproveItem.getView());
                break;

            case UserRole.USER:
                //onbar
                this.onBar.push(StudentCoursesItem.getView());
                this.onBar.push(StudentTestItem.getView());
                this.onBar.push(StudentResultsItem.getView());

                //onpage
                this.onPage.push(StudentCoursesItem.getView());
                this.onPage.push(StudentTestItem.getView());
                this.onPage.push(StudentResultsItem.getView());
                break;

            case UserRole.TEACHER:
                //onbar
                this.onBar.push(teacherClassItem.getView());
                this.onBar.push(teacherEditClassItem.getView());
                this.onBar.push(newCoursesItem.getView());
                this.onBar.push(savedCoursesItem.getView());


                //onpage
                this.onPage.push(teacherClassItem.getView());
                this.onPage.push(teacherEditClassItem.getView());
                this.onPage.push(newCoursesItem.getView());
                this.onPage.push(savedCoursesItem.getView());
                break;

            default:
                console.log("Error: role is undefined");
                break;
        }

        //for all users
        this.onPage.push(profileItem.getView());
        this.onPage.push(logoutItem.getView());

        this.onBar.push(profileItem.getView());
        this.onBar.push(logoutItem.getView());

        //this.menuButtonsOnPage = this.menuButtons;
    }

    public getOnBar() {
        return this.onBar;
    }

    public getOnPage() {
        return this.onPage;
    }
}