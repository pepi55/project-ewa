export class User{
    private id: number;
    private firstName: string;
    private lastName: string;
    private username: string;
    private password: string;
    private role: number;

    public constructor(id: number, firstName:string, lastName:string, username:string, password:string, role: number){
        this.id = id;
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

    public getFirstName(){
        return this.firstName;
    }

    public getLastName(){
        return this.lastName;
    }

    public getId(){
        return this.id;
    }

    public getRole(){
        return this.role;
    }
}