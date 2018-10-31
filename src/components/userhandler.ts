import { User } from "./user";

export class UserHandler {
    private users: Array<User> = new Array();

    public constructor() {
        $.ajax({
            url: "http://127.0.0.1:8080/servlet/QuestionsAPIServlet",
            success: function (result: any) {
                console.log(result)
                for (let user of result){
                    this.users.push(new User(user["firstName"], user["lastName"],user["username"],user["password"]));
                }
            }.bind(this),
            fail: function(xhr: any, textStatus: any, errorThrown: any){
                console.log('request failed');
            }
        })
    }

    public getPasswordByUsername(username: string) {
        for (let user of this.users){
            if (user.getUsername() == username){
                return user.getPassword();
            }
        }
    }
}