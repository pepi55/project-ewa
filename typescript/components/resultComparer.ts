import { Result } from "./Result";
import { Competentie } from "./Competentie";

export class ResultComparer {
    private competenties: Array<Competentie>
    private newResults: Array<Result>
    private oldResults: Array<Result>

    public constructor() {
        this.competenties = new Array();
        this.newResults = new Array();
        this.oldResults = new Array();
    }

    public setNewResults(newResults: Array<Result>) {
        this.newResults = this.getSortedArray(newResults)
    }

    public setOldResults(oldResults: Array<Result>) {
        this.oldResults = this.getSortedArray(oldResults)
    }

    public setCompetenties(competenties: Array<Competentie>) {
        this.competenties = competenties;
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
        console.log(temparray);
        return temparray;
    }

    private getListItem(text: string) {
        const string = `
        <li class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                ${text}
            </span>
        </li>`;
        return string;
    }

    private getCompetentieNameById(id: number) {
        for (let competentie of this.competenties) {
            if (competentie.getCompetentieId() == id) {
                return competentie.getCompetentieText();
            }
        }
    }

    private getResultList() {
        let string = `<div class="mdl-card__supporting-text">
        <ul class="list-item mdl-list">
        `;
        for (let result of this.newResults) {
            string += this.getListItem(this.getCompetentieNameById(result.getCompetencieId()));
        }
        string += `
        </ul>
        <ul class="list-item mdl-list">
        `;
        for (let result of this.newResults) {
            string += this.getListItem(result.getCompetencieScore().toString());
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
            <div class="mdl-cell mdl-cell--8-col" id="result-area" style="position: relative; height: 630px;">
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