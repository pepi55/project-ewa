export class Card {
    private cardId : number;
    private title : string;
    private url : string;
    private description? : string;
    private picture? : string;

    constructor(cardId : number, title : string, url : string, description? : string, picture? : string) {
        this.cardId = cardId;
        this.title = title;
        this.url = url;
        this.description = description;
        this.picture = picture;
    }

    public getcardId() {
        return this.cardId;
    }

    public getTitle() {
        return this.title;
    }

    public getUrl() {
        return this.url;
    }

    public getDescription() {
        return this.description;
    }

    public getPicture() {
        return this.picture;
    }


    public getCardView() : string {

        if (this.description == null || this.description == "") {
            this.description = "no description for you!";
        }
        if (this.picture == null || this.picture == "") {
            //picture setten hiero
            this.picture = "";
        }
        
        const mainStart : string = `<!--card--> <div class="mdl-cell mdl-cell--4-col"> <div class="demo-card-wide mdl-card mdl-shadow--2dp">`;
        const title : string = `<div class="mdl-card__title" style="height: 176px; background: url(${this.picture}) no-repeat center; background-size: 100%;"> <h2 class="mdl-card__title-text">${this.title}</h2></div>`;
        const supportingText : string = `<div class="mdl-card__supporting-text">${this.description}</div>`;
        const button : string = `<div class="mdl-card__actions mdl-card--border" id="${this.cardId}"></div>`;
        //deze knop voor om de naar site te gaan
        const sharebutton = `<div class="mdl-card__menu"><a href="https://www.udemy.com${this.url}"><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i class="material-icons">play_arrow</i></button></a></div>`;
        const mainEnd : string = `</div></div>`;
        return mainStart + title + supportingText + button + sharebutton + mainEnd;
    }
        
}