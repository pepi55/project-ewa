export class Button {
    private text: string;
    private onClickCallback: Function;

    public constructor(text: string) {
        this.text = text;
    }

    public setOnClick(callback: Function): void {
        this.onClickCallback = callback;
    }

    public getView(): string {
        const template: string = `<button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored">${this.text}</button>`;

        return $(template)
            .on(
                "click",
                (e: any) => this.onClickCallback(e)
            );
    }
}