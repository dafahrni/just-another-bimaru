import { Field } from "../board/field.js";

export class SolverResult {

    private solutions: Field[];

    constructor() {
        this.solutions = [];
    }

    add(solution: Field) {
        this.solutions.push(solution);
    }

    getSolutions() {
        return this.solutions;
    }
}
