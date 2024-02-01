import { Position } from "./position.js";
import { CellValue } from "./cell-value.js";

export class Cell {
  static outer() {
    return new Cell(new Position(-1, -1), CellValue.outer);
  }

  static from(x, y, symbol) {
    let cell = new Cell(new Position(x, y), CellValue.empty);
    cell.setValue(symbol);
    return cell;
  }

  static createWith(pos) {
    this(pos, CellValue.empty);
  }

  constructor(pos, value) {
    this.x = pos.getX();
    this.y = pos.getY();
    this.pos = pos;
    this.value = value;
    this.isDirty = false;
  }

  asText() {
    return this.value.getSymbol() + " (" + this.pos.asText() + ")";
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

  setValue(symbol) {
    CellValue.all.forEach((value) => {
      if (value.getSymbol() == symbol) {
        if (this.isFix) return;
        if (this.value.isSameAs(CellValue.outer)) return;
        if (this.value.isSameAs(value)) return;
        this.value = value;
        this.isDirty = true;
      }
    });
  }

  tryChangeValue() {
    if (isFix) return false;

    if (isEmpty()) {
      this.value = CellValue.water;
    } else if (isWater()) {
      this.value = CellValue.ship;
    } else if (isShip()) {
      this.value = CellValue.empty;
    } else {
      throw new IllegalStateException("Unexpected value: " + this.value);
    }

    return true;
  }

  setFix(isfix = true) {
    this.isFix = isfix;
  }

  isShip() {
    return this.getValue().isShip();
  }

  isWater() {
    return this.getValue().isWater();
  }

  isEmpty() {
    return this.getValue().isEmpty();
  }

  getX() {
    return this.pos.getX();
  }

  getY() {
    return this.pos.getY();
  }

  static getNeighbors(field) {
    // a b c
    // h . d
    // g f e
    let cells = new Cell[4 + 4]();
    let corners = getCorners(field);
    let sides = getSides(field);
    for (let i = 0; i < 4; i++) {
      cells[2 * i] = corners[i];
      cells[2 * i + 1] = sides[i];
    }
    return cells;
  }

  static getCorners(field) {
    // a   c
    //   .
    // g   e
    return [
      field.getCell(x - 1, y - 1), // a
      field.getCell(x + 1, y - 1), // c
      field.getCell(x + 1, y + 1), // e
      field.getCell(x - 1, y + 1), // g
    ];
  }

  getSides(field) {
    //   b
    // h . d
    //   f
    return [
      Cell.getNorth(field), // b
      Cell.getEast(field), // d
      Cell.getSouth(field), // f
      Cell.getWest(field), // h
    ];
  }

  static setNorth(field, value) {
    let cell = Cell.getNorth(field);
    this.setCell(cell, value);
  }

  static setEast(field, value) {
    let cell = Cell.getEast(field);
    this.setCell(cell, value);
  }

  static setSouth(field, value) {
    let cell = Cell.getSouth(field);
    this.setCell(cell, value);
  }

  static setWest(field, value) {
    let cell = Cell.getWest(field);
    this.setCell(cell, value);
  }

  static setCell(cell, value) {
    if (cell != null && cell.getValue() == CellValue.empty) {
      cell.setValue(value);
    }
  }

  static getNorth(field) {
    //   b
    //   .
    //
    return field.getCell(x + 0, y - 1); // b
  }

  static getEast(field) {
    //
    //   . d
    //
    return field.getCell(x + 1, y - 0); // d
  }

  static getSouth(field) {
    //
    //   .
    //   f
    return field.getCell(x + 0, y + 1); // f
  }

  static getWest(field) {
    //
    // h .
    //
    return field.getCell(x - 1, y + 0); // h
  }

  getIsFix() {
    return this.isFix;
  }

  asSymbol() {
    return this.getValue().getSymbol();
  }

  getDirtyFlag() {
    return this.isDirty;
  }

  resetDirtyFlag() {
    if (this.isDirty) this.isDirty = false;
  }
}
