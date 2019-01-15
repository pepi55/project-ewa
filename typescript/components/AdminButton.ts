export class AdminButton {
    private onClickCallback: Function;
    private type : string;
    private id : number;

    constructor(type : string, id? : number) {
        this.type = type;
        this.id = id;
    }

    public setOnClick(callback: Function): void {
        this.onClickCallback = callback;
    }

    public getId() {
        return this.id;
    }

    public getView(): string {
        //setting the view with data and returning it
        let template : string = "";

        if (this.type == "accept") {
            template = `<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-${this.id}" style="width: 0%;">
            <input type="checkbox" id="checkbox-${this.id}" class="mdl-checkbox__input">
            </label>`;
        }

        if (this.type == "decline") {
            template = `<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" >
            <i class="material-icons">clear</i>
            </button>`;
        }

        if (this.type == "refresh") {
            template = `<!-- Colored icon button --><button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"><i class="material-icons">refresh</i></button>`;
        }

        return $(template)
            .on(
                "click",
                (e: any) => this.onClickCallback(e)
            );
    }

}