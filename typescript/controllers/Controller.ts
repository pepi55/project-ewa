export abstract class Controller {
    pathToViews : string = "/servlet/views/";
    constructor() {
        this.setup();
    }
    
    protected abstract setup(): void;
}