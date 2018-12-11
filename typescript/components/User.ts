export class User {
    private firstName: string;
    private lastName: string;
    private username: string;
    private password: string;
    private email: string;
    private role: number;

    public constructor(firstName:string, lastName:string, username:string, password:string, email:string, role: number) {
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

    public getRoleName(){
        if (this.role == 0){
            return "Student";
        } else if(this.role == 1){
            return "Teacher";
        } else{
            return "Admin";
        }
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

    public setRole(role : number) {
        this.role = role;
    }

    public checkUserData() : boolean {
        let result : boolean = false;

        /*
        console.log("checking user data...");
        console.log(this.username);
        console.log(this.password);
        console.log(this.firstName);
        console.log(this.lastName);
        console.log(this.email);
        console.log(this.role);
         */

        if (this.firstName != null && this.lastName != null && this.email != null && this.username != null && this.password != null && this.role != null) {
            result = true;
        }

        return result;
    }
}