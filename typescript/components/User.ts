import { UserRole } from "./UserRole";

export class User {
    private firstName: string;
    private lastName: string;
    private username: string;
    private password: string;
    private email: string;
    private role: UserRole;

    public constructor(firstName:string, lastName:string, username:string, password:string, email:string, role?: UserRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public getEmail(){
        return this.email;
    }

    public getFirstName(){
        return this.firstName;
    }

    public getLastName(){
        return this.lastName;
    }

    public getRole(){
        return this.role;
    }

    public getRoleName() {
        let roleName : string = this.role;
        return roleName;
    }

    public setFirstName(firstName : string) {
        this.firstName = firstName;
    }

    public setLastName(lastName : string) {
        this.lastName = lastName;
    }

    public setUsername(username : string) {
        this.username = username;
    }

    public getUsername() {
        return this.username;
    }

    public setPassword(password : string) {
        this.password = password;
    }

    public getPassword() {
        return this.password;
    }

    public setEmail(email : string) {
        this.email = email;
    }

    public setRole(role : UserRole) {
        this.role = role;
    }

    public checkUserData() : boolean {
        let result : boolean = false;

        if (this.firstName != null && this.lastName != null && this.email != null && this.username != null && this.password != null && this.role != null) {
            result = true;
        }

        return result;
    }

    public getWholeName(){
        return this.firstName + " " + this.lastName;
    }
}