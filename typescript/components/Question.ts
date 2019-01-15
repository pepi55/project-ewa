/**
* @author Luc Maerten
* 
* class for a question
*/

export class Question{
    private id: number;
    private question: string;

    public constructor(id:number, question:string){
        this.id = id;
        this.question = question;
    }

    public getId(){
        return this.id;
    }

    public getQuestion(){
        return this.question;
    }
}