import { DBCourse } from './DBCourse';

export class DBCoursesList {
    courses : DBCourse[];
    
    constructor(mainResponse : any) {
        this.courses = mainResponse.map((course : any) => new DBCourse(course));
    }
}