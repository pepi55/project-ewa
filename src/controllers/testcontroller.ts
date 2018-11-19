import { Controller } from "controller";
import { AreaHandler } from "../components/areahandler";
import { Button } from "components/Button/button";
import { Areas } from "../components/questions/areas";

export class TestController extends Controller {
    private areas: AreaHandler;
    
    protected setup(): void {
        var self = this;
        

        this.areas = new AreaHandler(function(){
            let retrievedAreas = self.areas.getAreas()
            let area: Areas = new Areas(retrievedAreas);

            let saveButton = new Button("Save");

        saveButton.setOnClick((e: any) => {
            window.location.href = "/views/results.html";
        })

            $("#testid").html(area.getView());
            $("#save-button").append(saveButton.getView());

        });
    }    
}