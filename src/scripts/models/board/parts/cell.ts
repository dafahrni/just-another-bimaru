import { Position } from "./position.js";
import { CellValue } from "./cell-value.js";
import { CellBlock } from "./cell-block.js";
import { CellLine } from "./cell-line.js";

export class Cell {

  private pos: Position;
  private value: CellValue;
  private isFix: boolean;
  private isDirty: boolean;
  private block: CellBlock | null;
  private index: number;
  private row: CellLine | null;
  private col: CellLine | null;

  static isHorizontal(cells: Cell[]) {
    if (cells.length <= 0) return false;

    let y = cells[0].getY();
    for (let i = 1; i < cells.length; i++)
      if (y != cells[i].getY()) return false;

    return true;
  }

  static isVertical(cells: Cell[]) {
    if (cells.length <= 0) return false;

    let x = cells[0].getX();
    for (let i = 1; i < cells.length; i++)
      if (x != cells[i].getX()) return false;

    return true;
  }
  
  static outer() {
    return new Cell(new Position(-1, -1), CellValue.outer);
  }

  constructor(pos: Position, value = CellValue.empty) {
    if (!pos) throw new Error("Argument 'pos' must not be null!");
    if (!value) throw new Error("Argument 'value' must not be null!");
    this.pos = pos;
    this.value = value;
    this.isFix = false;
    this.isDirty = false;
    this.block = null;
    this.index = -1;
    this.row = null;
    this.col = null;
  }

  setIndex(index: number) {
    this.index = index;
  }

  getIndex() {
    return this.index;
  }
  
  setBlock(block: CellBlock) {
    this.block = block;
  }

  getBlock(): CellBlock {
    const block = this.block;
    if (block) return block; 
    throw new Error("Block is expected to be defined here!");
  }

  setRow(row: CellLine) {
    this.row = row;
  }

  getRow() {
    const row = this.row;
    if (row) return row; 
    throw new Error("Row is expected to be defined here!");
  }
  
  setCol(col: CellLine) {
    this.col = col;
  }

  getCol() {
    const col = this.col;
    if (col) return col; 
    throw new Error("Col is expected to be defined here!");
  }

  getPos(): Position {
    return this.pos;
  }

  getValue(): CellValue {
    return this.value;
  }

  setValue(value: CellValue) {
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

    // use state machine to change cell value
    if (this.isEmpty()) {
      this.value = CellValue.water;
      this.block?.correctCenterAfterUserSelection();
    } else if (this.isWater()) {
      this.value = CellValue.ship;
      this.block?.setCenter();
    } else if (this.isShip()) {
      this.value = CellValue.empty;
    } else {
      throw new Error("Unexpected value: " + this.value);
    }

    return true;
  }

  hasShipInCorner() {
    if (!this.block) return;
    const corners = this.block.getCornerCells();
    for (let i = 0; i < corners.length; i++) {
      if (corners[i].isShip()) return true;
    }
    return false;
  }

  reset() {
    if (this.isFix) return;
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

  isPredefinedCellCandidate() {
    return this.value.isPredefinedCellCandidate();
  }

  asSymbol() {
    return this.value.getSymbol();
  }

  hasSymbol(symbol: string) {
    return symbol.includes(this.asSymbol());
  }

  getDirtyFlag() {
    return this.isDirty;
  }

  resetDirtyFlag() {
    if (this.isDirty) this.isDirty = false;
  }

  asText() {
    return `${this.asSymbol()} (${this.pos}, ${this.index})`;
  }

  toString() {
    return this.asText();
  }
}
