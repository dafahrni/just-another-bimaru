import { Cell } from "./parts/cell.js";
import { CellValue } from "./parts/cell-value.js";
import { Labels } from "./parts/labels.js";
import { Position } from "./parts/position.js";

export class GameDefinition {
  static default(index = 0) {
    const definitions = [
      new GameDefinition(
        new Labels(
          [2, 3, 2, 3, 4, 2, 2, 2], 
          [5, 1, 3, 1, 4, 1, 2, 3]),
        [
          new Cell(new Position(7, 1), CellValue.single),
          new Cell(new Position(4, 3), CellValue.center),
        ]
      ),
      new GameDefinition(
        new Labels(
          [1, 6, 1, 1, 2, 0, 3, 1, 3, 2],
          [1, 2, 3, 3, 0, 4, 1, 3, 2, 1]
        ),
        [
          new Cell(new Position(8, 3), CellValue.center),
          new Cell(new Position(1, 7), CellValue.north),
          new Cell(new Position(8, 8), CellValue.south),
        ]
      ),
      new GameDefinition(
        new Labels([1, 2, 1], [0, 3, 0, 1]), [
        new Cell(new Position(0, 2), CellValue.water),
      ]),
    ];
    return 0 <= index && index < definitions.length
      ? definitions[index]
      : definitions[0];
  }

  static create() {
    return new GameDefinition(new Labels(Array(10), Array(10)), []);
  }

  static extract(field) {
    return GameDefinition(field.getLabels(), field.getCellsWithFixedValue());
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
