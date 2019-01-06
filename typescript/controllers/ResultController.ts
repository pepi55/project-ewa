import { Controller } from "./Controller";
import { LoginService } from "../components/LoginService";
import { Result } from "../components/Result";
import { ResultComparer } from "../components/ResultComparer";
import { QuestionHandler } from "../components/QuestionHandler";
import { ApiService } from "../coursesAPIs/ApiService";
import { API } from "../coursesAPIs/EnumRepo";
declare var componentHandler: any;

export class ResultController extends Controller {
    private results: Array<Result>;
    private comparer: ResultComparer;
    private questionHandler: QuestionHandler;

    protected setup(): void {
        this.getData()
    }

    private getData() {
        this.results = new Array();
        this.comparer = new ResultComparer();
        this.questionHandler = new QuestionHandler();
        this.comparer.setCompetenties(this.questionHandler.getCompetenties());

        let DB = new ApiService(API.DB);
        let i = 0;

        DB.setPath("users/" + LoginService.getInstance().getUserName() + "/results");
        DB.getParent((object: any) => {
            if (object.errorMessage == null) {
                object.map((mainResponse: any) => {
                    this.results.push(new Result(mainResponse.competencieId, mainResponse.competencieScore));
                })
            };
            this.comparer.setNewResults(this.results);
            $(".container").html(this.comparer.getView());
            componentHandler.upgradeDom();
        })
    }
}