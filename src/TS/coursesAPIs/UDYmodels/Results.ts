import { Course } from "./Course";  

export class Results {
    count : number;
    next : string;
    previous : string;
    courses : Course[];

    constructor(mainResponse : any) {
        this.count = mainResponse.count;
        this.next = mainResponse.next;
        this.previous = mainResponse.previous;
        // let tempCourses : Course[] = mainResponse.results;
    
        // for (let index = 0; index < tempCourses.length; index++) {
        //     this.courses[index] =  new Course(tempCourses[index]);
        // }
        this.courses = mainResponse.results.map((course : any) => new Course(course));
        
    }
    
}