export abstract class Controller {

    constructor() {
        this.setup();
    }
    
    protected abstract setup(): void;
}