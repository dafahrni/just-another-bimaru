import { FieldFactory } from "./field-factory.js";
import { ShipStatistics } from "./ship-statistics.js";

export class Game {
  
  constructor(field = null) {
    this.field = field ? field : FieldFactory.default();
    this.cells = this.field.getCells();
    this.field.setPredefinedCells();
    this.statistics = ShipStatistics.createDefault();
  }

  initStatistics(shipSets) {
    this.statistics.init(shipSets);
  }

  getStatistics() {
    return this.statistics;
  }

  placeShip(size) {
    // find slots with given size
    const slots = this.field.getSlotsOfSize(size);
    if (slots || slots.length < 1) return;

    // place ship on first suitable slot
    slots[0].placeShip();
    // set determined cells
    this.setDeterminedCells(field);
  }

  getSizeOfBiggestShipToPlace() {
    return this.statistics.getSizeOfBiggestShipToPlace();
  }

  solutionFound() {
    const solutionFound = !this.statistics.moreShipsToPlace();
    return solutionFound;
  }

  setDeterminedCells() {
    do {
      this.resetDirtyFlags();
      this.setEmptyCellsOfAllFullLinesToWater();
      this.setPossibleBlockParts();
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
    const shipCells = this.cells.filter((cell) => cell.isShip());
    const shipBlocks = shipCells.map((cell) => cell.getBlock());

    shipBlocks.forEach((block) => {
      block.setPossibleParts();
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
