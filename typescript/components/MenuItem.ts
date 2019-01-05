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
        const template: string = `<a class="mdl-navigation__link mdl-typography--text-uppercase">${this.text}</a>`;
        

        return $(template)
            .on(
                "click",
                (e: any) => this.onClickCallback(e)
            );
    }
}