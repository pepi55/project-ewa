export class Question{
    private question: string;
    private type: string;
    private answer: Array<string> = new Array<string>();

    public constructor(question: string, type: string, answer: Array<string>){
        this.question = question;
        this.answer = answer;
        this.type = type;
    }

    public getQuestion(): string {
        return this.question;
    }

    public getType(): string {
        return this.type;
    }

    public getAmountOfAnswers(): number {
        return this.answer.length;
    }

    public getAnswer(index: number): string {
        return this.answer[index];
    }
}