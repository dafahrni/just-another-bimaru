export class GameModel {
  constructor(rowShipCount, colShipCount) {
    this.rowShipCount = rowShipCount;
    this.colShipCount = colShipCount;
    this.cells = Array.from({ length: this.size }, () => new Cell());
  }

  get rows() {
    return this.rowShipCount.length;
  }

  get rowLabels() {
    return this.rowShipCount;
  }

  get cols() {
    return this.colShipCount.length;
  }

  get colLabels() {
    return this.colShipCount;
  }

  get size() {
    return this.rows * this.cols;
  }

  readCell(index) {
    return this.isValid(index) ? this.cells[index].value : "!";
  }

  changeCell(index) {
    if (!this.isValid(index)) {
      return false;
    }
    const cell = this.cells[index];
    if (!cell.isEmpty) {
      return false;
    }
    console.info(this.asText);
    return true;
  }

  toggle() {
    const ch = this.tile.getAttribute("ch");
    //const sequence = ["_", "~", "."];
    const sequence = ["_", "~", ".", "^", ">", "v", "<", "□", "o"];
    let i = (sequence.indexOf(ch) + 1) % sequence.length;
    this.selectCellType(sequence[i]);
  }

  resetCells() {
    this.cells.forEach((c) => c.reset());
    console.info(this.asText);
  }
  
  checkForWinner() {
    return false;
  }

  toString() {
    return `text: ${this.asText}`;
  }

  get asText() {
    let text = "";
    let count = 0;
    for (const cell of this.cells) {
      count++;
      text += cell.value;
      text = count % this.side == 0 ? text + "\n" : text + " ";
    }
    return text.slice(0, -1);
  }

  isValid(index) {
    if (index < 0 || index >= this.size) {
      console.error(
        `Index ${index} outside of intervall [0..${this.size - 1}]`
      );
      return false;
    }
    return true;
  }
}

class Cell {
  constructor() {
    this.val = "_";
  }

  get isEmpty() {
    return this.value === "_";
  }

  get value() {
    return this.val;
  }

  reset() {
    this.val = "_";
  }

  toString() {
    return `value: ${this.value}, isEmpty: ${this.isEmpty}`;
  }
}
