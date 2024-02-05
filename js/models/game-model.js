import { Field } from "./field.js";
import { Labels } from "./labels.js";

export class GameModel {
  constructor() {
    const rowShipCount = [1, 2, 1, 0, 1, 2];
    const colShipCount = [3, 0, 1, 0, 0, 1];
    this.labels = new Labels(
      rowShipCount,
      colShipCount,
    );
    this.field = new Field(this.labels)
    this.cells = this.field.getCells();
  }

  get rows() {
    return this.rowLabels.length;
  }

  get rowLabels() {
    return this.labels.ofRows();
  }

  get cols() {
    return this.colLabels.length;
  }

  get colLabels() {
    return this.labels.ofCols();
  }

  get size() {
    return this.cells.length;
  }

  readCellValue(index) {
    return this.isValid(index) ? this.cells[index].value : "!";
  }

  changeCell(index) {
    if (!this.isValid(index))
      return false;

    const cell = this.cells[index];
    if (!cell.isEmpty)
      return false;
    
    if (!cell.tryChangeValue())
      return false;

    console.info(this.asText);
    return true;
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
    return this.field.asText();
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
