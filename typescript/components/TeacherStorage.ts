export class TeacherStorage{
    private static teacherStorage: TeacherStorage;
    public id: string;

    public static getInstance(): TeacherStorage{
        if (!this.teacherStorage){
            this.teacherStorage = new TeacherStorage;
        }
        return this.teacherStorage;
    }

    public constructor(){
        let id = localStorage.getItem("studentId");
        if (id){
            this.id = JSON.parse(id);
        }
    }

    public setStudentId(id: string):void {
        this.id = id;
        localStorage.setItem("studentId",JSON.stringify(id));
    }   

    public getStudentId(){
        return this.id;
    }

    public emptyId(){
        localStorage.removeItem("studentId");
    }

    public checkIfStored(){
        let id = localStorage.getItem("studentId");
        if (id){
            return true;
        }
        else return false;
    }
}