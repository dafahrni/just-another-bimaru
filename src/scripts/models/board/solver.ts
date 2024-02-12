import { GameDefinition } from "./game-definition.js";
import { RestorePoint } from "./restore-point.js";
import { SolverResult } from "./solver-result.js";
import { Game } from "./game.js";
import { Field } from "./field.js";
import { Cell } from "./parts/cell.js";
import { Slot } from "./parts/slot.js";

export class Solver {

  private cells: Cell[];
  private field: Field;
  private game: Game;
  private restorePoints: RestorePoint[];

  static default() {
    return new Solver(GameDefinition.default());
  }

  constructor(definition: GameDefinition) {
    this.cells = [];
    this.field = new Field(definition.getLabels());
    this.field.setPredefinedCells(definition.getPredefinedCells());
    this.game = new Game(this.field);
    this.restorePoints = [];
  }

  solve() {
    this.restorePoints = [];

    while (true) {
      this.game.setDeterminedCells();

      let slots = [];
      let size = this.game.getSizeOfBiggestShipToPlace();
      let restorePoint = this.peek(this.restorePoints);
      if (restorePoint == null || restorePoint.getShipSizeToPlace() > size) {
        // next level -> create slots
        slots = this.field.getSlotsOfSize(size);
      } else {
        // same level -> continue
        slots = restorePoint.getSlotsLeft();
      }

      let remainingSlots = slots;
      if (remainingSlots.length > 0) {
        let nextslot = remainingSlots[0];
        // create restore point (to return in case of placement does not lead to success)
        this.removeIn(nextslot, remainingSlots);
        this.restorePoints.push(
          new RestorePoint(this.field.asText(), remainingSlots, size)
        );
        nextslot.placeShip();
      }

      if (this.game.solutionFound()) break;
    }

    let result = new SolverResult();
    result.add(this.field);
    return result;
  }

  peek(stack: RestorePoint[]) {
    // accessing top element of stack without removing it
    return stack[stack.length - 1];
  }

  removeIn(slot: Slot, slots: Slot[]) {
    // remove slot in slots
    slots.splice(slots.indexOf(slot), 1);
  }
}
