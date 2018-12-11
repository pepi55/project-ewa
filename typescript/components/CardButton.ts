export class CardButton {
    private onClickCallback: Function;

    public constructor() {}

    public setOnClick(callback: Function): void {
        this.onClickCallback = callback;
    }

    public getView(): string {
        const template: string = `<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Delete everything</a>`;

        return $(template)
            .on(
                "click",
                (e: any) => this.onClickCallback(e)
            );
    }
}