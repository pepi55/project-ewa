export class User{
    private firstName: string;
    private lastName: string;
    private username: string;
    private password: string;

    public constructor(firstName:string, lastName:string, username:string, password:string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }

    public getUsername(){
        return this.username;
    }

    public getPassword(){
        return this.password;
    }
}