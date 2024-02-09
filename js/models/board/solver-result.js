export class SolverResult {

    constructor() {
        this.solutions = [];
    }

    add(solution) {
        this.solutions.add(solution);
    }

    getSolutions() {
        return this.solutions;
    }
}
