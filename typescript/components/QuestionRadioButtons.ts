export class QuestionRadioButtos {

    public constructor() {

    }

    public getView(screenNumber: number) {
        const view = `
        <p>
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-${screenNumber}-1">
        <input type="radio" id="option-${screenNumber}-1" class="mdl-radio__button" name="options-${screenNumber}" value="5">
        <span class="mdl-radio__label">Completely confident</span>
        </label>
        </p>
        <p>
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-${screenNumber}-2">
        <input type="radio" id="option-${screenNumber}-2" class="mdl-radio__button" name="options-${screenNumber}" value="4">
        <span class="mdl-radio__label">Fairly confident</span>
        </label>
        </p>
        <p>
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-${screenNumber}-3">
        <input type="radio" id="option-${screenNumber}-3" class="mdl-radio__button" name="options-${screenNumber}" value="3" checked>
        <span class="mdl-radio__label">Somewhat confident</span>
        </label>
        </p>
        <p>
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-${screenNumber}-4">
        <input type="radio" id="option-${screenNumber}-4" class="mdl-radio__button" name="options-${screenNumber}" value="2">
        <span class="mdl-radio__label">Slightly confident</span>
        </label>
        </p>
        <p>
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-${screenNumber}-5">
        <input type="radio" id="option-${screenNumber}-5" class="mdl-radio__button" name="options-${screenNumber}" value="1">
        <span class="mdl-radio__label">Not confident at all</span>
        </label>
        </p>
        `
        return view;
    }
}