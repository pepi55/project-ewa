import { TableRowCard } from "./TableRowCard";

export class TableCards {
    private bodyHTML : string = "";
    private buttons : string = "";

    constructor(body? : TableRowCard[], buttons? : string) {
        this.buttons = buttons;
        this.setBodyHTML(body);
    }

    private setBodyHTML(body : TableRowCard[]) {
        body.forEach(element => {
            this.bodyHTML += element.getRowView();
        })
    }

    public getTableView() : string {

    const table : string = `<ul class="demo-list-control mdl-list">${this.bodyHTML}</ul>`;
    
    return table;
    }

}