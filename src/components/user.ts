export class User{
    private firstName: string;
    private lastName: string;
    private username: string;
    private password: string;
    private role: number;

    public constructor(firstName:string, lastName:string, username:string, password:string, role: number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public getUsername(){
        return this.username;
    }

    public getPassword(){
        return this.password;
    }
}