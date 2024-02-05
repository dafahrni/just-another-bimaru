import { Cell } from "./cell.js";
import { CellLine } from "./cell-line.js";
import { CellValue } from "./cell-value.js";
import { CellBlock } from "./cell-block.js";
import { Position } from "./position.js";
import { Labels } from "./labels.js";
import { ShipStatistics } from "./ship-statistics.js";

export class Field {
  static parse(text) {
    let lines = text.replace(/ /g, "").split("\n");
    let sizeY = lines.length - 1;
    let lastLine = lines[sizeY];
    let sizeX = lastLine.length;
    let colLabels = Array(sizeX);
    let rowLabels = Array(sizeY);
    let labels = new Labels(colLabels, rowLabels);
    let field = new Field(labels);
    for (let x = 0; x < sizeX; x++) {
      colLabels[x] = parseInt("" + lastLine[x]);
    }
    for (let y = 0; y < sizeY; y++) {
      let row = lines[y];
      let line = row.split("|");
      rowLabels[y] = parseInt(line[0]);
      for (let x = 0; x < sizeX; x++) {
        let symbol = line[1][x];
        let value = CellValue.from(symbol);
        field.setCellValue(x, y, value);
      }
    }
    return field;
  }

  static from(sizeX, sizeY) {
    return new Field(new Labels(Array(sizeX).fill(0), Array(sizeY).fill(0)));
  }

  constructor(labels) {
    this.shipStatistics = ShipStatistics.createDefault();
    this.sizeX = labels.sizeX;
    this.sizeY = labels.sizeY;
    this.labels = labels;
    this.cells = [];

    for (let y = 0; y < this.sizeY; y++) {
      for (let x = 0; x < this.sizeX; x++) {
        this.cells.push(new Cell(new Position(x, y)));
      }
    }
  }

  setPredefinedCells(predefinedCells) {
    predefinedCells.array.forEach((predefinedCell) => {
      const pos = predefinedCell.getPos();
      setFixCellValue(pos.getX(), pos.getY(), predefinedCell.getValue());
    });
  }

  initShips(status) {
    this.shipStatistics = status;
  }

  getCellValue(x, y) {
    return this.getCell(x, y).getValue();
  }

  getLabels() {
    return this.labels;
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

  getCell(x, y) {
    const pos = new Position(x, y);
    const matchingCells = this.cells.filter((c) => c.getPos().isSameAs(pos));
    if (matchingCells.length > 0) {
      return matchingCells[0];
    } else {
      return Cell.outer();
    }
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

  getSizeX() {
    return this.labels.sizeX;
  }

  getSizeY() {
    return this.labels.sizeY;
  }

  getCells() {
    return this.cells;
  }

  getShipBlocks() {
    return this.cells
      .filter((cell) => cell.isShip())
      .map((cell) => CellBlock.from(cell, this));
  }

  isDirty() {
    this.cells.forEach((cell) => {
      if (cell.getDirtyFlag()) return true;
    });

    return false;
  }

  resetDirtyFlags() {
    this.cells.forEach((cell) => cell.resetDirtyFlag());
  }

  getSizeOfBiggestShipToPlace() {
    return this.shipStatistics.getSizeOfBiggestShipToPlace();
  }

  solutionFound() {
    return this.shipStatistics.noMoreShipsToPlace();
  }

  getShipStatistics() {
    return this.shipStatistics;
  }

  symbolsToTheEastAre(cell, symbols) {
    let easternSymbols = this.symbolsToTheEast(cell, symbols.length);
    return easternSymbols == symbols;
  }

  symbolsToTheSouthAre(cell, symbols) {
    let southernSymbols = this.symbolsToTheSouth(cell, symbols.length);
    return southernSymbols == symbols;
  }

  symbolsToTheEast(cell, quantity) {
    const x = cell.getX();
    const y = cell.getY();
    let symbols = "" + cell.asSymbol();
    for (let i = 1; i < quantity; i++) {
      const nextCell = this.getCell(x + i, y);
      symbols += nextCell.asSymbol();
    }
    return symbols;
  }

  symbolsToTheSouth(cell, quantity) {
    const x = cell.getX();
    const y = cell.getY();
    let symbols = "" + cell.asSymbol();
    for (let i = 1; i < quantity; i++) {
      const nextCell = this.getCell(x, y + i);
      symbols += nextCell.asSymbol();
    }
    return symbols;
  }
}
