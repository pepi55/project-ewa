export class AdminButton {
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

        if (this.type == "refresh") {
            template = `
            <div style="text-align: right;">
            <!-- Colored icon button -->
            <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
              <i class="material-icons">refresh</i>
            </button>
            </div>`;
        }

        return $(template)
            .on(
                "click",
                (e: any) => this.onClickCallback(e)
            );
    }

}