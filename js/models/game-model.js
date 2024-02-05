import { Field } from "./field.js";
import { Labels } from "./labels.js";

export class GameModel {
  constructor() {
    this.field = Field.default();
    this.labels = this.field.getLabels();
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

  readCell(index) {
    return this.isValid(index) ? this.cells[index] : "!";
  }

  fillLineWithWater(index) {
    const sizeX = this.labels.sizeX;
    const sizeY = this.labels.sizeY;
    if (index < 0 || index >= sizeX+sizeY) 
      return;

    const line = index < sizeY
      ? this.field.getRow(index)
      : this.field.getCol(index - sizeY);
    line.changeEmptyToWater();
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
    return this.field.solutionFound();
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
