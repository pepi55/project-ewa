export class TableRowCompetency {
    private name : string;
    private competencyId : number;
    private cardId : number;
    private elementCount : number;

    constructor(mainResponse : any, elementCount : number) {
        console.log("comp: " + mainResponse.name);
        console.log("compId: " + mainResponse.id);
        this.name = mainResponse.name;
        this.competencyId = mainResponse.id;
        this.elementCount = elementCount;

    }

    public getRowView() : string {

        if (this.name == null) {
            this.name = "no title for you!";
        }

        const row : string = `<li class="mdl-list__item" id="${this.elementCount}"><span class="mdl-list__item-primary-content">
        ${this.name}</span><span class="mdl-list__item-secondary-action">
        <label class="demo-list-radio mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-option-${this.elementCount}" value="${this.competencyId}">
        <input type="radio" id="list-option-${this.elementCount}" class="mdl-radio__button" name="options" value="1" checked /></label></span></li>`;

        return row;
    }

}