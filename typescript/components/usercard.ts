import { User } from "./User";

/**
 * class for displaying users in a small card
 * mainly used for the admin approve page
 */
export class UserCard {
    private user: User;
    private amount: number;

    public constructor(user: User, amount: number) {
        this.user = user;
        this.amount = amount;
    }

    public getView(): string {
        const template: string = `<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card" id="newUser${this.amount}">
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">New ${this.user.getRoleName()}</h2>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <p>${this.user.getWholeName()}</p>
                        <p>${this.user.getEmail()}</p>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <p id="button_area${this.amount}"></p>
                    </div>
                </div>`

        return template;
    }
}
