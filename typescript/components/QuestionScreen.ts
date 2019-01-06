import { QuestionRadioButtos } from "./QuestionRadioButtons";

export class QuestionScreen {
    private competentieText: string;
    private questionId: number;
    private question: string;
    private buttons: QuestionRadioButtos;

    public constructor(competentieText: string, id: number, question: string) {
        this.competentieText = competentieText;
        this.questionId = id;
        this.question = question;
        this.buttons = new QuestionRadioButtos();
    }

    public getView(screenNumber: number) {
        let display;
        if (screenNumber != 0){display = "none";} else {display = "block"};
        const view = `<div id="screen-${screenNumber}" class="card-wide mdl-card mdl-shadow--2dp" style="display: ${display}; position: absolute; width: 100%; box-shadow: none !important;">
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">${this.competentieText}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    <h5>${this.question}</h5>
                </div>
                <div class="mdl-card__actions mdl-card--border">${this.buttons.getView(screenNumber)}</a></div>
            </div>`
        return view;
    }
}