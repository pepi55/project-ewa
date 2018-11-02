import { User } from "./user";

export class UserHandler {
    private users: Array<User> = new Array();

    public constructor() {
        let url = "http://127.0.0.1:8080/servlet/LoginAPIServlet";
        let promise = fetch(url);
        promise.then(function(result){
            return result.json();
        }).then(function(json:any){
            for (let user of json){
                this.users.push(new User(user["firstName"], user["lastName"],user["username"],user["password"],user["role"]));
            }
        }.bind(this))
    }

    public getPasswordByUsername(username: string) {
        for (let user of this.users){
            if (user.getUsername() == username){
                return user.getPassword();
            }
        }
    }
}