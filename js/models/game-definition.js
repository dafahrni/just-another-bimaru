import { Cell } from "./cell.js";
import { CellValue } from "./cell-value.js";
import { Labels } from "./labels.js";
import { Position } from "./position.js";
import { ShipStatistics } from "./ship-statistics.js";

export class GameDefinition {
  static default(index = 0) {
    return [
      new GameDefinition(
      new Labels(
        [2, 3, 2, 3, 4, 2, 2, 2],
        [5, 1, 3, 1, 4, 1, 2, 3],
      ),
      [
        new Cell(new Position(7, 1), CellValue.single),
        new Cell(new Position(4, 3), CellValue.center),
      ]
    ),
    new GameDefinition(
      new Labels(
        [1, 6, 1, 1, 2, 0, 3, 1, 3, 2],
        [1, 2, 3, 3, 0, 4, 1, 3, 2, 1],
      ),
      [
        new Cell(new Position(8, 3), CellValue.center),
        new Cell(new Position(1, 7), CellValue.north),
        new Cell(new Position(8, 8), CellValue.south),
      ]
    )][index];
  }

  static create() {
    return new GameDefinition(
      new Labels(Array(10), Array(10)),
      []
    );
  }

  static from(labels, predefinedCells) {
    return new GameDefinition(
      labels,
      predefinedCells,
      this.createDefaultShips()
    );
  }

  constructor(labels, predefinedCells, ships) {
    this.labels = labels;
    this.predefinedCells = predefinedCells;
    this.ships = ships;
  }

  getLabels() {
    return this.labels;
  }

  getShips() {
    return this.ships;
  }

  getPredefinedCells() {
    return this.predefinedCells;
  }

  static createDefaultShips() {
    return ShipStatistics.createDefault();
  }

  static isValid(labels, ships) {
    let colLabelSum = 0;
    labels.ofColums().forEach((label) => {
      colLabelSum += label;
    });
    let rowLabelSum = 0;
    labels.ofRows().forEach((label) => {
      rowLabelSum += label;
    });
    let shipSum = 0;
    ships.forEach((ship) => {
      shipSum += ship.getSize() * ship.getTargetAmount();
    });
    return colLabelSum == rowLabelSum && rowLabelSum == shipSum;
  }
}
