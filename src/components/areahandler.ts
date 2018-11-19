import { Area } from "./area";

export class AreaHandler{
    private areas: Array<Area>;

    public constructor(callBack: any){
        $.ajax({
            url: "/assets/json/questions.json", //URL van Api           
        }).done(function(result: Array<Area>){
            this.areas = result;

            callBack();
        }.bind(this))
    }
   
    public getAreas(){
        return this.areas;
    }
}