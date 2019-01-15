import { TableRowCard } from "./TableRowCard";
import { AdminButton } from "./AdminButton";

export class TableCards {
    private bodyHTML : string = "";


    constructor(body? : TableRowCard[]) {

        this.setBodyHTML(body);
    }

    private setBodyHTML(body : TableRowCard[]) {
        if (body != null) {
            body.forEach(element => {
                this.bodyHTML += element.getRowView();
            });
        }
        
    }

    public getTableView() : string {
        //setting the view with data and returning it
        const table : string = `<ul class="demo-list-control mdl-list">${this.bodyHTML}</ul>`;
    
        return table;
    }

}