import { Card } from "./Card";

export class CardsScrollTable {
    private competencyName : string;
    private bodyHTML : string = "";
    private id : number = 0;

    constructor(cards : Card[], competencyName : string, id : number) {
        this.setBodyHTML(cards);
        this.competencyName = competencyName;
        this.id = id;

    }

    private setBodyHTML(cards) {
        if (cards != null) {
            cards.forEach(card => {
                this.bodyHTML += card.getCardView();
            });
        }
        
    }

    public addEmptyScrollTable(html : string) {
        this.bodyHTML = html;
    }

    public getCardsScrollTableView() : string {
        //setting the view with data and returning it
        const mainStart : string = `<!--cards--> <div class="mdl-cell mdl-cell--12-col mdl-shadow--3dp">`;
        const competencyName : string = `<div class="mdl-card__title"><h2 class="mdl-card__title-text">${this.competencyName}</h2><div id="checkBoxSelectAll${this.id}" style="margin-left: 1%;"></div></div>`;
        const cards : string = `<div class="mdl-grid" id="tableCards${this.id}" style="overflow: auto; height: 350px;">${this.bodyHTML}</div>`;
        const mainEnd : string = `</div>`;

        return mainStart + competencyName + cards + mainEnd;
    }
        
}