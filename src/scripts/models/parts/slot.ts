import { CellValue } from "./cell-value.js";
import { Cell } from "./cell.js";

export class Slot {
  cells: Cell[];

  constructor(cells: Cell[]) {
    this.cells = cells;
  }

  get size() {
    return this.cells.length;
  }

  placeShip() {
    const cells = this.getCells();
    cells.forEach((cell) => {
      cell.setValue(CellValue.ship);
    });
  }

  getCells() {
    return this.cells;
  }

  split(shipSize: number) {
    var slots: Slot[] = [];
    var count = this.size - shipSize + 1;
    if (count < 1) return slots;

    for (let i = 0; i < count; i++) {
      let before = i - 1;
      if (before >= 0 && this.cells[before].isShip()) continue;
      let after = i + shipSize;
      if (after < this.size && this.cells[after].isShip()) continue;
      var subCells = Array.from(this.cells).slice(i, i + shipSize);
      slots.push(new Slot(subCells));
    }
    return slots;
  }

  asText() {
    return `size: ${this.size}, cells: ${this.cells.join(", ")}`;
  }

  toString() {
    return this.asText();
  }
}
