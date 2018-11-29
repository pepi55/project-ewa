export class Course {

    title : string;
    url : string;
    image_480x270 : string;


    constructor(mainResponse : any) {
        this.title = mainResponse.title;
        this.url = mainResponse.url;
        this.image_480x270 = mainResponse.image_480x270;
    }

    
}