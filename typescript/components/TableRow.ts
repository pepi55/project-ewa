export class TableRow {
    private cardId : string;
    private title : string;

    constructor(mainResponse : any) {
        this.cardId = mainResponse.courseId;
        this.title = mainResponse.title;
    }

    public getRowView() : string {

        if (this.title == null) {
            this.title = "no title for you!";
        }
        
        const row : string = `<tr><td><label class="mdl-checkbox mdl-js-checkbox 
        mdl-js-ripple-effect mdl-data-table__select mdl-js-ripple-effect--ignore-events 
        is-upgraded" data-upgraded=",MaterialCheckbox,MaterialRipple"><input type="checkbox" 
        class="mdl-checkbox__input"><span class="mdl-checkbox__focus-helper"></span><span 
        class="mdl-checkbox__box-outline"><span class="mdl-checkbox__tick-outline"></span></span>
        <span class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center" 
        data-upgraded=",MaterialRipple"><span class="mdl-ripple"></span></span></label>
        </td><td class="mdl-data-table__cell--non-numeric">${this.title}</td>
        <td>${this.cardId}</td><td>1</td></tr>`;
        return row;
    }

}