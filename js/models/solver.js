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
    let statistics = field.getShipStatistics();
    do {
      field.resetDirtyFlags();
      Solver.setEmptyCellsOfAllFullLinesToWater(field);
      Solver.setPossibleBlockParts(field);
      statistics.update(field);
    } while (field.isDirty());
  }

  static placeShip(slot) {
    slot.getCells().foreach((cell) => cell.setValue("s"));
  }

  static setPossibleBlockParts(field) {
    let blocks = field.getShipBlocks();
    Array.from(blocks).forEach((block) => {
      block.setCornersToWater();
      block.setCenterWhenShipHasDirection();
      block.setSidesWhenShipHasDirection();
    });
  }

  static getSlotsOfSize(size, field) {
    let slots = [];
    getSlotsOfAllNoneWaterCells(size, field).foreach((slot) => {
      newSlots = Array.from(slot.split(size));
      slots.addAll(newSlots);
    });
    return slots;
  }

  static getSlotsOfAllNoneWaterCells(size, field) {
    let slots = [];
    for (let y = 0; y < field.getSizeY(); y++) {
      let row = field.getRow(y);
      if (row.getAmountLeft() >= size) slots.addAll(row.findSlots());
    }
    for (let x = 0; x < field.getSizeX(); x++) {
      let col = field.getCol(x);
      if (col.getAmountLeft() >= size) slots.addAll(col.findSlots());
    }
    return slots;
  }

  static setEmptyCellsOfAllFullLinesToWater(field) {
    // iterate rows
    for (let y = 0; y < field.getSizeY(); y++) {
      let line = field.getRow(y);
      if (line.isFull() && line.hasEmptyCells()) {
        Solver.changeEmptyToWater(line);
      }
    }

    // iterate columns
    for (let x = 0; x < field.getSizeX(); x++) {
      let line = field.getCol(x);
      if (line.isFull() && line.hasEmptyCells()) {
        Solver.changeEmptyToWater(line);
      }
    }
  }

  static changeEmptyToWater(line) {
    line.getCells().foreach((cell) => {
      if (cell.isEmpty()) {
        cell.setValue(CellValue.water);
      }
    });
  }
}
