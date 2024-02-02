export class Slot {
  constructor(cells) {
    this.cells = cells;
  }

  get size() {
    return this.cells.length;
  }

  getCells() {
    return this.cells;
  }

  split(shipSize) {
    var slots = [];
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
    return `size ${this.size} slots ${this.slots}`;
  }

  toString() {
    return this.asText();
  }
}
