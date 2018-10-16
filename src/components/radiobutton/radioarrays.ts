import { RadioButtons } from "./radiobuttons";
import { CheckBox } from "./checkbox";


export class RadioArrays{
    
        private name: string;
        private type: string;
    
    public constructor(name: string, type: string){
    this.name=name;
    this.type=type;
    }
    
    public getView(index: number){
        
        var template: string = "";
        for (let i = 1; i <= index; i++) {
            if(this.type=="radio"){
            template += "<td>" + new RadioButtons(this.name, i).getView() + "</td>";
        }
        else{
            template += "<td>" + new CheckBox(this.name, i).getView() + "</td>";
        }
    }

       
            
    return template;
    }
    
    }