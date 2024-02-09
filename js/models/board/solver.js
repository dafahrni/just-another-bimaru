import { GameDefinition } from "./game-definition.js";
import { RestorePoint } from "./restore-point.js";
import { SolverResult } from "./solver-result.js";
import { Field } from "./field.js";

export class Solver {
  static default() {
    return new Solver(GameDefinition.default());
  }

  constructor(game) {
    this.cells = [];
    this.field = new Field(game.getLabels());
    this.field.setPredefinedCells(game.getPredefinedCells());
  }

  solve() {
    let restorePoints = [];

    while (true) {
      this.field.setDeterminedCells();

      let slots = [];
      let size = this.field.getSizeOfBiggestShipToPlace();
      let restorePoint = this.peek(this.restorePoints);
      if (restorePoint == null || restorePoint.getShipSizeToPlace() > size) {
        // next level -> create slots
        slots = field.getSlotsOfSize(size);
      } else {
        // same level -> continue
        slots = restorePoint.getSlotsLeft();
      }

      let remainingSlots = slots;
      if (remainingSlots.length > 0) {
        let nextslot = remainingSlots[0];
        // create restore point (to return in case of placement does not lead to success)
        remainingSlots.remove(nextslot);
        restorePoints.push(
          new RestorePoint(field.asText(), remainingSlots, size)
        );
        nextslot.placeShip();
      }

      if (field.solutionFound()) break;
    }

    let result = new SolverResult();
    result.push(field);
    return result;
  }

  peek(stack) {
    // accessing top element of stack without removing it
    return stack[stack.length - 1];
  }
}
