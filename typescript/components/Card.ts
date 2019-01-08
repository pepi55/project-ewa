export class Card {
    private cardId : number;
    private title : string;
    private url : string;
    private description? : string;
    private picture? : string;
    private userId : string;
    

    //for students
    private shareButton : string = "";

    //for teachers
    private backgroundSize : number = 100;

    constructor(cardId? : number, title? : string, url? : string, description? : string, picture? : string, DBResponse? : any) {
        this.cardId = cardId;
        this.title = title;
        this.url = url;
        this.description = description;
        this.picture = picture;
        if (DBResponse != null) {
            this.setDBCard(DBResponse);
        }

        this.shareButton = `<div class="mdl-card__menu"><a href="${this.url}"><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i class="material-icons">play_arrow</i></button></a></div>`;
    }

    public setUserId(userId : string){
        this.userId = userId;
    }

    public getUserId(){
        return this.userId;
    }

    private setDBCard(DBResponse : any) {
        this.cardId = DBResponse.courseId;
        this.title = DBResponse.title;
        this.url = DBResponse.url;
        this.description = DBResponse.description;
        this.picture = DBResponse.image;
    }

    public setBackgroundSize(size : number) {
        this.backgroundSize = size;
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

    public removeShareButton() {
        this.shareButton = "";
    }


    public getCardView() : string {

        if (this.description == null || this.description == "") {
            this.description = "No description available for this course! Click on the button to get more information about this course!";
        }
        if (this.picture == null || this.picture == "") {
            //picture setten hiero
            this.picture = "";
        }
        
        const mainStart : string = `<!--card--> <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">`;
        const title : string = `<div class="mdl-card__title" style="height: 176px; background: url(${this.picture}) no-repeat center; background-size: ${this.backgroundSize}%; color: black;"> <h2 class="mdl-card__title-text">${this.title}</h2></div>`;
        const supportingText : string = `<div class="mdl-card__supporting-text">${this.description}</div>`;
        const button : string = `<div class="mdl-card__actions mdl-card--border" style="text-align: center;"id="${this.cardId}"></div>`;
        const mainEnd : string = `</div>`;
        return mainStart + title + supportingText + button + this.shareButton + mainEnd;
    }
        
}