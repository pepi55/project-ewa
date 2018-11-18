export class CardButton {
    private onClickCallback: Function;
    private type: string;

    constructor(type : string) {
        this.type = type;
    }

    public setOnClick(callback: Function): void {
        this.onClickCallback = callback;
    }

    public getView(): string {
        let template : string = "";

        if (this.type == "accept") {
            template = `<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" >
            <i class="material-icons">add</i>
            </button>`;
        }

        if (this.type == "decline") {
            template = `<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" >
            <i class="material-icons">clear</i>
            </button>`;
        }

        return $(template)
            .on(
                "click",
                (e: any) => this.onClickCallback(e)
            );
    }

}