import { Cell } from "./cell.js";
import { CellBlock } from "./cell-block.js";
import { Position } from "./position.js";
import { Labels } from "./labels.js";
import { ShipStatistics } from "./ship-statistics.js";

export class Field {
  static parse(text) {
    let lines = text.replace(" ", "").split("\n");
    let sizeY = lines.length - 1;
    let lastLine = lines[sizeY];
    let sizeX = lastLine.length();
    let colLabels = new let[sizeX]();
    let rowLabels = new let[sizeY]();
    let labels = new Labels(colLabels, rowLabels);
    let field = new Field(labels);
    for (let x = 0; x < sizeX; x++) {
      colLabels[x] = int.parse("" + lastLine.charAt(x));
    }
    for (let y = 0; y < sizeY; y++) {
      let row = lines[y];
      let line = row.split("\\|");
      rowLabels[y] = int.parse(line[0]);
      for (let x = 0; x < sizeX; x++) {
        let symbol = line[1].charAt(x);
        field.setCellValue(x, y, symbol);
      }
    }
    return field;
  }

  static from(sizeX, sizeY) {
    return Field(new Labels(new let[sizeX](), new let[sizeY]()));
  }

  constructor(labels) {
    this.shipStatistics = ShipStatistics.createDefault();
    this.sizeX = labels.getSizeX();
    this.sizeY = labels.getSizeY();
    this.labels = labels;
    this.cells = [];

    for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
        this.cells.add(new Cell(new Position(x, y)));
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
    return this.getCell(new Position(x, y)).getValue();
  }

  getLabels() {
    return this.labels;
  }

  setCellValue(x, y, symbol) {
    const cell = this.getCell(new Position(x, y));
    cell.setValue(symbol);
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
    let pos = new Position(x, y);
    return this.cells
      .filter((c) => c.getPos().equals(pos))
      .findFirst()
      .orElse(Cell.outer());
  }

  static updateShipStatistics(shipStatistics, cells) {
    // this only works for default ShipStatus objects (i.e. 1:4, 2:3, 3:2, 4:1)
    // TODO make this work for any kind of ShipStatus (e.g. 2:1, 3-6:2, 7:1)
    shipStatistics.resetAmountOfSize(1);
    shipStatistics.resetAmountOfSize(2);
    shipStatistics.resetAmountOfSize(3);
    shipStatistics.resetAmountOfSize(4);

    cells.forEach((cell) => {
      if (cell.asSymbol() == "o") shipStatistics.incrementAmountOfSize(1);

      let block = new CellBlock(cell, this);
      if (block.symbolsToTheEastAre("<>") || block.symbolsToTheSouthAre("^v"))
        shipStatistics.incrementAmountOfSize(2);
      if (block.symbolsToTheEastAre("<□>") || block.symbolsToTheSouthAre("^□v"))
        shipStatistics.incrementAmountOfSize(3);
      if (
        block.symbolsToTheEastAre("<□□>") ||
        block.symbolsToTheSouthAre("^□□v")
      )
        shipStatistics.incrementAmountOfSize(4);
    });
  }

  getShipStatistics() {
    return this.shipStatistics;
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
    let cells = new Cell[this.sizeX]();
    for (let x = 0; x < cells.length; x++) {
      cells[x] = this.getCell(new Position(x, y));
    }
    return new CellLine(this.labels.ofRow(y), cells);
  }

  getCol(x) {
    let cells = new Cell[this.sizeY]();
    for (let y = 0; y < cells.length; y++) {
      cells[y] = this.getCell(new Position(x, y));
    }
    return new CellLine(labels.ofCol(x), cells);
  }

  getSizeX() {
    return this.labels.getSizeX();
  }

  getSizeY() {
    return this.labels.getSizeY();
  }

  getCells() {
    return this.cells.toArray(new Cell[this.cells.size()]());
  }

  getShipBlocks() {
    return this.cells
      .filter((cell) => cell.isShip())
      .map((cell) => new CellBlock(cell, this));
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
}
