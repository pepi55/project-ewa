export class dropDownMenu {

    private title : string;
    private items : string[];
    private number : number = 0;

    constructor(title : string, items : string[]) {
        this.title = title;
        this.items = items;
    }

    public getMenuView() : string {
        //setting the view with data and returning it
        const mainStart : string = `<!-- Select with floating label and arrow -->
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select">
            <input type="text" value="" class="mdl-textfield__input" id="${this.title}" readonly>
            <input type="hidden" value="" name="${this.title}">
            <i class="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
            <label for="sample4" class="mdl-textfield__label">${this.title}</label>
            <ul for="sample4" class="mdl-menu mdl-menu--bottom-left mdl-js-menu" style="max-height: 300px; overflow-y: scroll;">`;

        

        const mainEnd : string = `</ul></div>`;

        let itemsview : string = ``;
        for (let i = 0; i < this.items.length; i++) {
            itemsview += `<li class="mdl-menu__item" data-val="${this.items[i]}">${this.items[i]}</li>`;
            
        }
        
        return mainStart + itemsview + mainEnd;


    }
        
}