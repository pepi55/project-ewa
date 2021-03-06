export class TableRowCard {
    private title : string;
    private cardId : number;
    private elementCount : number;

    constructor(mainResponse : any, elementCount : number) {
        this.title = mainResponse.title;
        this.cardId = mainResponse.courseId;
        this.elementCount = elementCount;

    }

    public getRowView() : string {
        //setting the view with data and returning it
        if (this.title == null) {
            this.title = "no title for you!";
        }

        const row : string = `<li class="mdl-list__item" id="tableId${this.cardId}"><span class="mdl-list__item-primary-content">
        ${this.title}</span><span class="mdl-list__item-secondary-action">
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${this.elementCount}" value="tableId${this.cardId}">
        <input type="checkbox" id="list-checkbox-${this.elementCount}" class="mdl-checkbox__input" checked /></label></span></li><hr>`;

        
        return row;
    }

}