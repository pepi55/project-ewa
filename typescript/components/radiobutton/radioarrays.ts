import { RadioButtons } from "./radiobuttons";


export class RadioArrays{
    
        private name: string;
    
    public constructor(name: string){
    this.name=name;
    }
    
    public getView(index: number){
        
        var template: string = "";
        for (let i = 1; i <= index; i++) {
            template += "<td>" + new RadioButtons(this.name, i).getView() + "</td>";
        
    }

       
            
    return template;
    }
    
    }