import { ApiRepo } from './ApiRepo';
import {API, SUBCATS, ORDERING, PRICE} from './EnumRepo';
import * as request from 'request';

export class ApiService {

    private URLGET : string;
    private URLPOSTAUTH : string;
    private OPTIONS : any;
    private repo = new ApiRepo();
    private api : API;
    private queryParam : string;

    constructor(api :API) {
        this.api = api;
        this.OPTIONS = this.repo.getOptions(api);
        this.URLPOSTAUTH = this.repo.getAuthUrl(api);
        this.URLGET = this.repo.getGETUrl(api);
        this.queryParam = "";
        

    }

    public setQueryParameters(page : number, page_size : number, search? : string, category? : string, subcategory? : SUBCATS, price? : PRICE, ordering? : ORDERING) : void {
        let space = "&";
        let pageString = "page=" + page + space;
        let page_sizeString = "page_size=" + page_size + space;

        let searchString = "";
        let categoryString = "";
        let subcategoryString = "";
        let priceString = "";
        let orderingString = "";

        if(search != null) {
            searchString = "search=" + search + space; 
        }
        if(category != null) {
            categoryString = "category=" + category + space;
        }
        if(subcategory != null) {
            subcategoryString = "subcategory=" + subcategory + space;
        }
        if(price != null) {
            priceString = "price=" + price + space;
        }
        if(ordering != null) {
            orderingString = "ordering=" + ordering + space;
        }

        let notSlicedString : string = "?" +  pageString + page_sizeString + searchString + categoryString + subcategoryString + priceString + orderingString;
        let slicedString = notSlicedString.slice(0, -1);
        this.queryParam = slicedString;

    }

    public getParent(callBack : <T> (parent : T) => any) : void {

        request.get(this.URLGET + this.queryParam, this.OPTIONS, (error : any, response : any, body : any) => {
            callBack(response.body);
        });


     }

    // //for EDX
    public postAuthentication() {
        request.post(this.URLPOSTAUTH, this.OPTIONS, (error : any, response : any, body : any) => {
            //this.repo.setAccessToken(body);
            //console.log(this.repo.getAccessToken());
            console.log(body);
        });
    }


}