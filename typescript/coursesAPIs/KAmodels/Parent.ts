import { Child } from "./Child";

export class Parent {
    description : string;
    children? : Child[];
    ka_url : string;
    title : string;
    icon : string;

    constructor(mainResponse : any) {
        this.title = mainResponse.title;
        this.description = mainResponse.description;
        this.ka_url = mainResponse.ka_url;
        this.icon = mainResponse.icon;
        this.children = mainResponse.children.map((child : any) => new Child(child));
    }
    
}