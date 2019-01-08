import { Result } from "./Result";
import { Competencie } from "./Competencie";
import { ProgressBar } from "./ProgressBar";

export class ResultComparer {
    private competencies: Array<Competencie>;
    private newResults: Array<Result>;
    private oldResults: Array<Result>;

    public constructor() {
        this.newResults = new Array();
    }

    public setNewResults(newResults: Array<Result>) {
        this.newResults = this.getSortedArray(newResults)
    }

    public setOldResults(oldResults: Array<Result>) {
        this.oldResults = new Array();
        this.oldResults = this.getSortedArray(oldResults)
    }

    public setCompetencies(competencies: Array<Competencie>) {
        this.competencies = new Array();
        this.competencies = competencies;
    }

    private getSortedArray(toSrot: Array<Result>) {
        let temparray: Array<Result> = new Array;
        for (let result of toSrot) {
            let i = 0;
            for (let result2 of temparray) {
                if (result2.getCompetencieId() > result.getCompetencieId()) {
                    temparray.splice(i, 0, result);
                    break;
                } else i++;
            }
            if (temparray.length == i) {
                temparray.splice(i, 0, result);
            }
        }
        return temparray;
    }

    private getListItem(text: string, progressbar: string) {
        const string = `
        <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--6-col">
                <span class="mdl-list__item-primary-content spanthing" >
                    ${text}
                </span>
            </div>
            <div class="mdl-cell mdl-cell--6-col">
                ${progressbar}
            </div>
        </div>`;
        return string;
    }

    private getCompetencieById(id: number) {
        for (let i = 0; i < this.competencies.length; i++) {
            console.log(this.competencies[i].getCompetencieId());
            if (this.competencies[i].getCompetencieId() == id) {
                return this.competencies[i];
            }
        }
    }

    private getResultList() {
        let string = `
        <div class="mdl-card__supporting-text">
            <div style="margin:auto; width: 500px;" class="mdl-grid">
                <div style="display: inline-block;" class="mdl-cell mdl-cell--4-col">
                    <p style="margin-left: 12px; margin-bottom: 0px;">
                        New progress
                    </p>
                    <div id="mainProgressBar" class="mdl-progress mdl-js-progress is-upgraded" data-upgraded=",MaterialProgress" style="width:100%; display: inline-block;">
                        <div class="progressbar bar bar1" style="width: 100%;">
                        </div>
                    </div>
                </div>
                <div style="display: inline-block;" class="mdl-cell mdl-cell--4-col">
                    <p style="margin-left: 12px; margin-bottom: 0px;">
                        Old progress
                    </p>
                    <div id="mainProgressBar" class="mdl-progress mdl-js-progress is-upgraded" data-upgraded=",MaterialProgress" style="width:100%; display: inline-block;">
                        <div class="bufferbar bar bar2" style="width: 100%;">
                        </div>
                    </div>
                </div>
                <div style="display: inline-block;" class="mdl-cell mdl-cell--4-col">
                    <p style="margin-left: 12px; margin-bottom: 0px;">
                        Maximum progress
                    </p>
                    <div id="mainProgressBar" class="mdl-progress mdl-js-progress is-upgraded" data-upgraded=",MaterialProgress" style="width:100%; display: inline-block;">
                        <div class="auxbar bar bar3" style="width: 100%;">
                        </div>
                    </div>
                </div>
            </div>
        <div class="mdl-grid">
        `;
        console.log(this.newResults);
        for (let i = 0; i < this.newResults.length; i++) {
            let tempBar = new ProgressBar(this.newResults[i].getCompetencieScore() - this.getCompetencieById(this.newResults[i].getCompetencieId()).getQuestionLength(), this.getCompetencieById(this.newResults[i].getCompetencieId()).getQuestionLength() * 4)

            if (this.oldResults.length != 0 && i < this.oldResults.length){
                tempBar.addOldProgress(this.oldResults[i].getCompetencieScore() - this.getCompetencieById(this.newResults[i].getCompetencieId()).getQuestionLength())
            }

            string += this.getListItem(
                this.getCompetencieById(this.newResults[i].getCompetencieId()).getCompetencieText()
                ,tempBar.getView());
        }
        string += `
        </div>
        `;
        return string;
    }

    public getView() {
        const string = `
        <div class="mdl-grid" id="mainPageTitle">
            <div class="mdl-cell mdl-cell--2-col teacher-button">
            </div>
            <div class="mdl-cell mdl-cell--8-col" id="result-area" style="position: relative; height: 700px;">
                <div class="card-wide mdl-card mdl-shadow--2dp"style="position: absolute; width: 100%; box-shadow: none !important;">
                    <div class="mdl-card__title" style="height: 65px;">
                        <h2 class="mdl-card__title-text">Your Results</h2>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        ${this.getResultList()}
                    </div>
                </div>
            </div>
            <div class="mdl-cell mdl-cell--2-col">
            </div>
        </div>`
    return string;
    }
}