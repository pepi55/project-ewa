import { TableRow } from "./TableRow";

export class TableRowList {
    rows : TableRow[];

    constructor(mainResponse : any) {
        this.rows = mainResponse[0].courses.map((course : any) => new TableRow(course));

        
    }
}