import { Cell } from "./cell.js";
import { CellValue } from "./cell-value.js";
import { Slot } from "./slot.js";
import { Position } from "./position.js";

export class CellLine {
  static from(targetAmount, cellCount) {
    let emptyCells = Array.from({ length: cellCount }, () => ({}));
    for (let x = 0; x < cellCount; x++) {
      emptyCells[x] = new Cell(new Position(x, 0), CellValue.empty);
    }
    return new CellLine(targetAmount, emptyCells);
  }

  static parse(text) {
    let line = text.replace(/\s/g, "").split("|");
    let label = parseInt(line[0]);
    let cellValues = line[1];
    let sizeX = cellValues.length;
    let cells = Array.from({ length: sizeX }, () => ({}));
    for (let x = 0; x < sizeX; x++) {
      let symbol = cellValues[x];
      cells[x] = Cell.from(x, 0, symbol);
    }
    return new CellLine(label, cells);
  }

  constructor(targetAmount, cells) {
    this.targetAmount = targetAmount;
    this.cells = cells;
  }

  getTargetAmount() {
    return this.targetAmount;
  }

  getCurrentAmount() {
    let currentAmount = 0;
    this.cells.forEach((cell) => {
      if (cell.isShip()) {
        currentAmount += 1;
      }
    });
    return currentAmount;
  }

  getAmountLeft() {
    return this.targetAmount - this.getCurrentAmount();
  }

  isFull() {
    return this.targetAmount == this.getCurrentAmount();
  }

  hasEmptyCells() {
    this.cells.forEach((cell) => {
      if (cell.isEmpty()) {
        return true;
      }
    });
    return false;
  }

  getCells() {
    return this.cells;
  }

  asText() {
    let text = this.targetAmount + " |";
    this.cells.forEach((cell) => {
      text += " " + cell.getValue().getSymbol();
    });
    return text;
  }

  toString() {
    return this.asText();
  }

  findSlots(minShipSize = null) {
    let slots = [];
    if (this.isFull()) return slots;

    let tempCells = [];
    this.cells.forEach((cell) => {
      if (cell.isWater()) {
        slots = CellLine.addToSlots(slots, tempCells);
        tempCells = [];
      } else {
        tempCells.push(cell);
      }
    });

    slots = CellLine.addToSlots(slots, tempCells);

    return minShipSize 
        ? slots.filter((s) => s.size >= minShipSize) 
        : slots;
  }

  static addToSlots(slots, tempCells) {
    if (tempCells.size <= 0) return;

    let cells = tempCells;
    let newSlot = new Slot(cells);
    slots.push(newSlot);
    return slots;
  }
}
