import { DBCourse } from './DBCourse';

export class DBCoursesList {
    courses : DBCourse[];
    
    constructor(mainResponse : any) {
        this.courses = mainResponse[0].courses.map((course : any) => new DBCourse(course));
    }
}