import { User } from "./User";

export class UserHandler {
    private users: Array<User> = new Array();

    public constructor() {
        let url = "http://127.0.0.1:8080/servlet/services/rest/users";
        let promise = fetch(url);
        promise.then(function(result){
            return result.json();
        }).then(function(json:any){
            console.log(json);
            for (let user of json){
                console.log(user)
                let newuser = new User(user["email"],user["firstName"],user["lastName"],user["username"],user["password"],user["role"]); 
                //newuser.setId(user["id"]);
                this.users.push(newuser);
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

    public getUserByUsername(username: String){
        for (let user of this.users){
            if (user.getUsername() == username){
                return user;
            }
        }
    }

    public getRoleByUsername(username : string) {
        for (let user of this.users){
            if (user.getUsername() == username){
                return user.getRoleName();
            }
        }
    }
}
