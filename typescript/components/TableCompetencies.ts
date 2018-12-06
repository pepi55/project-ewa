import { TableRowCompetency } from "./TableRowCompetency";

export class TableCompetencies {
    private bodyHTML : string = "";
    private buttons : string = "";

    constructor(body? : TableRowCompetency[]) {
        this.setBodyHTML(body);
    }

    private setBodyHTML(body : TableRowCompetency[]) {
        body.forEach(element => {
            this.bodyHTML += element.getRowView();
        })
    }

    public getTableView() : string {

    const table : string = `<ul class="demo-list-control mdl-list">${this.bodyHTML}</ul>`;
    
    return table;
    }

}