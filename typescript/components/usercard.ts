import { User } from "./User";
import { Button } from "./button/Button";

export class UserCard {
    private user: User;

    public constructor(user: User) {
        this.user = user;
    }

    public getView(): string {

        const template: string = `<div class="card-wide mdl-card mdl-shadow--2dp"><div class="mdl-card__title"><h2 class="mdl-card__title-text">New ${this.user.getRoleName()}</h2></div><div class="mdl-card__supporting-text"><p>${this.user.getWholeName()}</p><p>${this.user.getEmail()}</p><p id="button_area"></p></div></div>`;

        return template;
    }
}
