import { User } from "./user";

export class UserHandler {
    private users: Array<User> = new Array();

    public constructor() {
        $.ajax({
            url: "assets/json/users.json"
        }).done(function (result: any) {
            for (let user of result["users"]){
                this.users.push(new User(user["email"],user["username"],user["password"]));
            }
        }.bind(this));
    }

    public getPasswordByUsername(username: string) {
        for (let user of this.users){
            if (user.getUsername() == username){
                return user.getPassword();
            }
        }
    }
}