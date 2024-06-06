import { Field } from "./field.js";
import { FieldFactory } from "./field-factory.js";
import { ShipStatistics } from "./ship-statistics.js";
import { Cell } from "../parts/cell.js";
import { ShipSet } from "../parts/ship-set.js";

export class Game {
  field: Field;
  cells: Cell[];
  statistics: ShipStatistics;

  constructor(field: Field | null = null) {
    this.field = field ? field : FieldFactory.default();
    this.cells = this.field.getCells();
    this.field.setPredefinedCells();
    this.statistics = ShipStatistics.createDefault();
  }

  initStatistics(shipSets: ShipSet[]) {
    this.statistics.init(shipSets);
  }

  getStatistics() {
    return this.statistics;
  }

  placeShip(size: number) {
    // for solver only (must not be used for playing!!)

    // find slots with given size
    const slots = this.field.getSlotsOfSize(size);
    if (!slots || slots.length < 1) return;

    // place ship on first suitable slot
    slots[0].placeShip();

    // set determined cells
    this.setDeterminedCells();
  }

  getSizeOfBiggestShipToPlace() {
    return this.statistics.getSizeOfBiggestShipToPlace();
  }

  solutionFound() {
    const solutionFound = !this.statistics.moreShipsToPlace();
    return solutionFound;
  }

  setDeterminedCells() {
    // for solver only (must not be used for playing!!)
    do {
      this.resetDirtyFlags();
      this.setEmptyCellsOfAllFullLinesToWater();
      this.setPossibleBlockParts();
      this.correctCenters();
      this.updateStatistics();
    } while (this.isDirty());
  }

  resetDirtyFlags() {
    this.cells.forEach((cell) => cell.resetDirtyFlag());
  }

  setEmptyCellsOfAllFullLinesToWater() {
    this.field.setEmptyCellsOfAllFullLinesToWater();
  }

  setPossibleBlockParts() {
    const shipBlocks = this.cells
      .filter((cell) => cell.isShip())
      .map((cell) => cell.getBlock());

    shipBlocks.forEach((block) => {
      block.setPossibleParts();
    });
  }

  correctCenters() {
    const emptyBlocks = this.cells
      .filter((cell) => cell.isEmpty())
      .map((cell) => cell.getBlock());

    emptyBlocks.forEach((block) => {
      block.correctCenter();
    });
  }

  updateStatistics() {
    return this.statistics.update(this.field);
  }

  isDirty() {
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      if (cell.getDirtyFlag()) return true;
    }
    return false;
  }

  asText() {
    return this.field.asTextWithCheckMarks();
  }

  toString() {
    return this.asText();
  }
}
