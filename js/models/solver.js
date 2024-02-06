import { GameDefinition } from "./game-definition.js";
import { RestorePoint } from "./restore-point.js";
import { SolverResult } from "./solver-result.js";
import { Field } from "./field.js";
import { CellValue } from "./cell-value.js";

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
      this.setDeterminedCells(field);

      let slots = [];
      let size = this.field.getSizeOfBiggestShipToPlace();
      let restorePoint = this.restorePoints.peek();
      if (restorePoint == null || restorePoint.getShipSizeToPlace() > size) {
        // next level -> create slots
        slots = this.getSlotsOfSize(size, field);
      } else {
        // same level -> continue
        slots = restorePoint.getSlotsLeft();
      }

      let remainingSlots = slots;
      if (remainingSlots.size() > 0) {
        let nextslot = remainingSlots.get(0);
        // create restore point (to return in case of placement does not lead to success)
        remainingSlots.remove(nextslot);
        restorePoints.push(
          new RestorePoint(field.asText(), remainingSlots, size)
        );
        Solver.placeShip(nextslot);
      }

      if (field.solutionFound()) break;
    }

    let result = new SolverResult();
    result.push(field);
    return result;
  }

  static placeShip(slotSize, field) {
    // place ship
    let slots = Solver.getSlotsOfSize(slotSize, field);
    Solver.placeShip(slots.get(0));
    // set determined
    Solver.setDeterminedCells(field);
  }

  static setDeterminedCells(field) {
    do {
      field.resetDirtyFlags();
      field.setEmptyCellsOfAllFullLinesToWater();
      field.setPossibleBlockParts();
      field.updateStatistics();
    } while (field.isDirty());
  }

  static placeShip(slot) {
    slot.getCells().foreach((cell) => cell.setValue(CellValue.ship));
  }
}
