import { User } from "./User";

export class LoginService{
    private static instance: LoginService;
    public user: User;

    public static getInstance(): LoginService{
        if (!this.instance){
            this.instance = new LoginService;
        }
        return this.instance;
    }

    public constructor(){
        let id = localStorage.getItem("loggedInUser");
        if (id){
            let userdata = JSON.parse(id);
            this.user = new User(userdata.firstName,userdata.lastName,userdata.username,userdata.password,userdata.email,userdata.role);
            //this.user.setId(userdata.id);
        }
    }

    public login(user: User):void {
        this.user = user;
        localStorage.setItem("loggedInUser",JSON.stringify(user));
    }   
    
    public isLoggedIn(): boolean{
        return !!this.user;
    }

    public getUserId(): number{
        if (this.isLoggedIn()) {
            //return this.user.getId();
        }
        return null;
    }

    public getUserName() {
        if (this.isLoggedIn()) {
            return this.user.getUsername();
        }
        return null;
    }

    public logout(){
        if (this.isLoggedIn()) {
            localStorage.clear();
            window.location.href = "/servlet/index.html";
        }
    }

    public getUser(){
        if (this.isLoggedIn()) {
            return this.user;
        } 
    }

    public getUserRole() {
        if (this.isLoggedIn()) {
            return this.user.getRoleName();
        }
        return null;
    }

}