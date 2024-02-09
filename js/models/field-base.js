import { Cell } from "./cell.js";
import { CellLine } from "./cell-line.js";
import { CellBlock } from "./cell-block.js";
import { Position } from "./position.js";

export class FieldBase {

  constructor(labels) {
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
        const block = CellBlock.from(cell, this);
        cell.setBlock(block);
      }
    }
  }

  setPredefinedCells(predefinedCells = null) {
    predefinedCells = predefinedCells
      ? predefinedCells
      : this.cells.filter((cell) => cell.isPredefinedCellCandidate());
    
    predefinedCells.forEach((predefinedCell) => {
      const pos = predefinedCell.getPos();
      this.setFixCellValue(pos.getX(), pos.getY(), predefinedCell.getValue());
    });
  }

  setFixCellValue(x, y, value) {
    this.setCellValue(x, y, value, true);
  }

  setCellValue(x, y, value, isFix = false) {
    let cell = this.getCell(x, y);
    if (cell != null) {
      cell.setValue(value);
      if (isFix) {
        cell.setFix();
      }
    }
  }

  getCellValue(x, y) {
    const cell = this.getCell(x, y);
    return cell.getValue();
  }

  getCell(x, y) {
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

  getRow(y) {
    let cells = [];
    for (let x = 0; x < this.sizeX; x++) {
      const cell = this.getCell(x, y);
      cells.push(cell);
    }
    return new CellLine(this.labels.ofRow(y), cells);
  }

  getCol(x) {
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

  asText() {
    return this.asText(false);
  }

  asText(withCheckMarks) {
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
