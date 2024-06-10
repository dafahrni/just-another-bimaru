export class SolverResult {
    constructor() {
        this.solutions = [];
    }
    add(solution) {
        this.solutions.push(solution);
    }
    getSolutions() {
        return this.solutions;
    }
}
//# sourceMappingURL=solver-result.js.map