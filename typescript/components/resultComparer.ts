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
        console.log("lol1");
        console.log(this.competencies);
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

    private getListItem(text: string) {
        const string = `
        <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                ${text}
            </span></li>`;
        return string;
    }

    private getCompetencieById(id: number) {
        // console.log(this.competencies);
        // console.log(this.competencies.length);
        // console.log(this.competencies[0]);
        for (let i = 0; i < this.competencies.length; i++) {
            console.log(this.competencies[i].getCompetencieId());
            if (this.competencies[i].getCompetencieId() == id) {
                return this.competencies[i];
            }
        }
        //return this.competencies[0];
    }

    private getResultList() {
        let string = `
        <div class="mdl-card__supporting-text">
            <div style="margin:auto; width: 500px;">
                <div style="display: inline-block; width:160px;">
                <p style="margin-left: 12px; margin-bottom: 0px;">
                    New progress
                </p>
                <div id="mainProgressBar" class="mdl-progress mdl-js-progress is-upgraded" data-upgraded=",MaterialProgress" style="width:100%; display: inline-block;">
                    <div class="progressbar bar bar1" style="width: 100%;">
                    </div>
                </div>
            </div>
            <div style="display: inline-block; width:160px;">
                <p style="margin-left: 12px; margin-bottom: 0px;">
                    Old progress
                </p>
                <div id="mainProgressBar" class="mdl-progress mdl-js-progress is-upgraded" data-upgraded=",MaterialProgress" style="width:100%; display: inline-block;">
                    <div class="bufferbar bar bar2" style="width: 100%;">
                    </div>
                </div>
            </div>
            <div style="display: inline-block; width:160px;">
                <p style="margin-left: 12px; margin-bottom: 0px;">
                    Maximum progress
                </p>
                <div id="mainProgressBar" class="mdl-progress mdl-js-progress is-upgraded" data-upgraded=",MaterialProgress" style="width:100%; display: inline-block;">
                    <div class="auxbar bar bar3" style="width: 100%;">
                    </div>
                </div>
            </div>
        </div>
        </div>
        <ul class="list-item mdl-list" style="padding: 0px;>
        `;
        console.log(this.newResults);
        for (let i = 0; i < this.newResults.length; i++) {
            console.log(this.newResults[i]);
            string += this.getListItem(this.getCompetencieById(this.newResults[i].getCompetencieId()).getCompetencieText());
        }
        string += `
        </ul>
        <ul class="list-item mdl-list" style="padding: 0px;>
        `;
        for (let i = 0; i < this.newResults.length; i++) {
            let tempBar = new ProgressBar(this.newResults[i].getCompetencieScore() - this.getCompetencieById(this.newResults[i].getCompetencieId()).getQuestionLength(), this.getCompetencieById(this.newResults[i].getCompetencieId()).getQuestionLength() * 4)
            console.log(this.oldResults);
            if (this.oldResults.length != 0 && i < this.oldResults.length){
                tempBar.addOldProgress(this.oldResults[i].getCompetencieScore() - this.getCompetencieById(this.newResults[i].getCompetencieId()).getQuestionLength())
            }
            string += this.getListItem(tempBar.getView());
        }
        string += `
        </ul>
        </div>`;
        return string;
    }

    public getView() {
        const string = `<div class="mdl-grid">
            <div class="mdl-cell mdl-cell--2-col">
            </div>
            <div class="mdl-cell mdl-cell--8-col" id="result-area" style="position: relative; height: 700px;">
                <div class="card-wide mdl-card mdl-shadow--2dp"style="position: absolute; width: 100%; box-shadow: none !important;">
                <div class="mdl-card__title" style="height: 65px;">
                    <h2 class="mdl-card__title-text">Your Results</h2>
                </div>
                <div class="mdl-card__actions mdl-card--border">${this.getResultList()}</a></div>
            </div>
            </div>
            <div class="mdl-cell mdl-cell--2-col">
            </div>
        </div>`
    return string;
    }
}