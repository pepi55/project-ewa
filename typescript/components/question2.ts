export class Question2 {
    private question: string;
    private questionId: Number;
    

    public constructor(question: string, questionId: Number) {
        this.question = question;
        this.questionId = questionId;
    }

    

    public getView(): string {
        let template: string = `<tr><td>${this.question}</td>`;
        const values = [1, 2, 3, 4, 5];
        for (let value of values) {
            template += `<td><input type="radio" class="mdl-radio__button" name="question_${this.questionId}" value="${value}"></td>`;
        }
        template += "</tr>";
        
        return $(template)
           
    }
}