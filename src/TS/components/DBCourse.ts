export class DBCourse {
    courseId : number;
    title : string;
    description : string;
    image : string;
    url : string;

    constructor(mainResponse : any) {
        this.courseId = mainResponse.courseId;
        this.title = mainResponse.title;;
        this.description = mainResponse.description;
        this.image = mainResponse.image;
        this.url = mainResponse.url;
    }
}