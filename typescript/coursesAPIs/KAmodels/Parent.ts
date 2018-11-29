import { Child } from "./Child";

export class Parent {
    description : string;
    children? : Child[];
    ka_url: string;;

    constructor(mainResponse : any) {
        this.description = mainResponse.description;
        this.ka_url = mainResponse.ka_url;
        this.children = mainResponse.children.map((child : any) => new Child(child));
    }
    
}