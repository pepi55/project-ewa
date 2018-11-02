export class CheckBox{
    private id: number;
        private name: string;
    
    public constructor(name: string, id: number){
    this.name=name;
    this.id=id;
    }
    
    public getView(){
        const template: string =  `<input type="checkbox" class="mdl-radio__button" name="${this.name}" value="${this.id}">`;
    
    return template;
    }
    
    }