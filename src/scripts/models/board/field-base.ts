import { Cell } from "./parts/cell";
import { CellLine } from "./parts/cell-line";
import { Position } from "./parts/position";
import { CellBlockFactory } from "./parts/cell-block-factory";
import { Labels } from "./parts/labels";
import { CellValue } from "./parts/cell-value";

export class FieldBase {

  sizeX: number;
  sizeY: number;
  labels: Labels;
  cells: Cell[];

  constructor(labels: Labels) {
    this.sizeX = labels.sizeX;
    this.sizeY = labels.sizeY;
    this.labels = labels;
    this.cells = [];

    let index = 0;
    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0; x < this.sizeX; x++) {
        const cell = new Cell(new Position(x, y));
        this.cells.push(cell);
        cell.setIndex(index);
        index += 1;
      }
    }

    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0; x < this.sizeX; x++) {
        const cell = this.getCell(x, y);
        const block = CellBlockFactory.from(cell, this);
        cell.setBlock(block);
      }
    }
  }

  setPredefinedCells(predefinedCells: Cell[] | null = null) {
    predefinedCells = predefinedCells
      ? predefinedCells
      : this.cells.filter((cell) => cell.isPredefinedCellCandidate());
    
    predefinedCells.forEach((predefinedCell) => {
      const pos = predefinedCell.getPos();
      this.setFixCellValue(pos.getX(), pos.getY(), predefinedCell.getValue());
    });
  }

  setFixCellValue(x: number, y: number, value: CellValue) {
    this.setCellValue(x, y, value, true);
  }

  setCellValue(x: number, y: number, value: CellValue, isFix = false) {
    let cell = this.getCell(x, y);
    if (cell != null) {
      cell.setValue(value);
      if (isFix) {
        cell.setFix();
      }
    }
  }

  getCellValue(x: number, y: number) {
    const cell = this.getCell(x, y);
    return cell.getValue();
  }

  getCell(x: number, y: number) {
    const pos = new Position(x, y);
    const matchingCells = this.cells.filter((c) => c.getPos().isSameAs(pos));
    if (matchingCells.length > 0) {
      return matchingCells[0];
    } else {
      return Cell.outer();
    }
  }

  getCells() {
    return this.cells;
  }

  getCellsWithFixedValue() {
    return this.cells.filter(cell => cell.getIsFix());
  }

  getRow(y: number) {
    let cells = [];
    for (let x = 0; x < this.sizeX; x++) {
      const cell = this.getCell(x, y);
      cells.push(cell);
    }
    return new CellLine(this.labels.ofRow(y), cells);
  }

  getCol(x: number) {
    let cells = [];
    for (let y = 0; y < this.sizeY; y++) {
      const cell = this.getCell(x, y);
      cells.push(cell);
    }
    return new CellLine(this.labels.ofCol(x), cells);
  }

  getLabels() {
    return this.labels;
  }

  getSizeX() {
    return this.labels.sizeX;
  }

  getSizeY() {
    return this.labels.sizeY;
  }

  asTextWithCheckMarks() {
    return this.asText(true);
  }

  asText(withCheckMarks: boolean = false) {
    let text = "";
    for (let y = 0; y < this.sizeY; y++) {
      let row = this.getRow(y);
      let line =
        (withCheckMarks && row.isFull() ? "√" : this.labels.ofRow(y)) + " | ";
      for (let x = 0; x < this.sizeX; x++) {
        let value = this.getCellValue(x, y);
        line += value.getSymbol() + " ";
      }
      text += line + "\n";
    }
    text += "   ";
    for (let x = 0; x < this.sizeX; x++) {
      let col = this.getCol(x);
      text +=
        " " + (withCheckMarks && col.isFull() ? "√" : this.labels.ofCol(x));
    }
    return text;
  }

  toString() {
    return this.asText();
  }
}
