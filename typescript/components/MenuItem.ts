export class MenuItem {
    private text: string;
    private link: string;
    private onClickCallback: Function;

    public constructor(text: string) {
        this.text = text;
    }

    public setOnClick(callback: Function): void {
        this.onClickCallback = callback;
    }

    public getView(): string {
        const template: string = `<div class="mdl-navigation__link">${this.text}</div>`;

        return $(template)
            .on(
                "click",
                (e: any) => this.onClickCallback(e)
            );
    }
}