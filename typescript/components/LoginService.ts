import { User } from "./User";

/**
 * service for storing the logged in user
 */
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
        }
    }

    /**
     * stores the given user in the local storage
     * @param user 
     */
    public login(user: User):void {
        this.user = user;
        localStorage.setItem("loggedInUser",JSON.stringify(user));
    }   
    
    /**
     * checks if a user is logged in
     */
    public isLoggedIn(): boolean{
        return !!this.user;
    }

    public getUserName() {
        if (this.isLoggedIn()) {
            return this.user.getUsername();
        }
        return null;
    }

    /**
     * clears all the storage and sends you back to the login screen
     */
    public logout(){
        if (this.isLoggedIn()) {
            this.user = null
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