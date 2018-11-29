export class Child {
    description : string;
    translated_title : string;
    url : string;
    node_slug : string;

    constructor(child : any) {
        this.description = child.description;
        this.translated_title = child.translated_title;
        this.url = child.url;
        this.node_slug = child.node_slug;

    }
}