import { Question } from "./Question";

export class Competencie{
    private id: number;
    private text: string;
    private questions: Array<Question>;
    private score: number = 0;

    constructor(id: number, text: string, questions: Array<Question>){
        this.id = id;
        this.text = text;
        this.questions = questions;
    }

    public getCompetencieText(){
        return this.text;
    }

    public getQuestions(){
        return this.questions
    }

    public addScore(score: number){
        this.score += +score;
    }

    public getScore(){
        return this.score;
    }

    public getQuestionLength(){
        return this.questions.length;
    }

    public getCompetencieId(){
        return this.id;
    }
}