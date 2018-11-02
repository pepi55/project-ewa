import { JsonSubQuestion } from "./JsonSubQuestion";

export class JsonMainQuestion {
    public mainQuestion: string;
    public answers : Array<string>;
    public subQuestions: Array<JsonSubQuestion>;
}