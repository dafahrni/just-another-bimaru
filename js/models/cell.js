import { Position } from "./position.js";
import { CellValue } from "./cell-value.js";
import { CellBlock } from "./cell-block.js";

export class Cell {
  static outer() {
    return new Cell(new Position(-1, -1), CellValue.outer);
  }

  constructor(pos, value = CellValue.empty) {
    if (!pos) throw new Error("Argument 'pos' must not be null!");
    if (!value) throw new Error("Argument 'value' must not be null!");
    this.x = pos.getX();
    this.y = pos.getY();
    this.pos = pos;
    this.value = value;
    this.isDirty = false;
  }

  asText() {
    return this.value.getSymbol() + " (" + this.pos.asText() + ")";
  }

  toString() {
    return this.asText();
  }

  static isHorizontal(cells) {
    if (cells.length <= 0) return false;

    let y = cells[0].getY();
    for (let i = 1; i < cells.length; i++)
      if (y != cells[i].getY()) return false;

    return true;
  }

  static isVertical(cells) {
    if (cells.length <= 0) return false;

    let x = cells[0].getX();
    for (let i = 1; i < cells.length; i++)
      if (x != cells[i].getX()) return false;

    return true;
  }

  getPos() {
    return this.pos;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    // used for object creation in Field class, unit testing, solver ...
    if (this.isFix) return;
    if (this.value.isSameAs(CellValue.outer)) return;
    if (this.value.isSameAs(value)) return;
    
    this.value = value;
    this.isDirty = true;
  }

  tryChangeValue() {
    // used for player of the game
    if (this.isFix) return false;

    if (this.isEmpty()) {
      this.value = CellValue.water;
    } else if (this.isWater()) {
      this.value = CellValue.ship;
    } else if (this.isShip()) {
      this.value = CellValue.empty;
    } else {
      throw new Error("Unexpected value: " + this.value);
    }

    // TODO: move the following lines to the caller of this method
    //field.setPossibleBlockParts();
    //field.updateStatistics();

    return true;
  }

  reset() {
    this.value = CellValue.empty;
  }

  setFix(isfix = true) {
    this.isFix = isfix;
  }

  isShip() {
    return this.value.isShip();
  }

  isWater() {
    return this.value.isWater();
  }

  isEmpty() {
    return this.value.isEmpty();
  }

  getX() {
    return this.pos.getX();
  }

  getY() {
    return this.pos.getY();
  }

  getIsFix() {
    return this.isFix;
  }

  asSymbol() {
    return this.value.getSymbol();
  }

  getDirtyFlag() {
    return this.isDirty;
  }

  resetDirtyFlag() {
    if (this.isDirty) this.isDirty = false;
  }
}
