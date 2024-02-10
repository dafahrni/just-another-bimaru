import { FieldFactory } from "./board/field-factory.js";
import { Game } from "./board/game.js";
import { GameDefinition } from "./board/game-definition.js";

export class GameModel {
  constructor(field = null) {
    const index = 0;
    const definition = GameDefinition.default(index);
    this.field = field 
      ? field
      : FieldFactory.createWith(definition);
    this.labels = this.field.getLabels();
    this.cells = this.field.getCells();

    // TODO: remove this line after merger of Game and GameView classes
    this.game = new Game(this.field);
    this.game.initStatistics(definition.getShipSets());
  }

  initStatistics(shipSets) {
    this.game.initStatistics(shipSets);
  }

  updateStatistics() {
    this.game.updateStatistics();
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
    // index depends on label creation in Bimaru.setupHtml 
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
    const shipIsOk = this.canPlaceShip(cell);
    if (!cell.tryChangeValue(shipIsOk))
      return false;

    console.info(this.field.asTextWithCheckMarks());
    return true;
  }

  canPlaceShip(cell) {
    // check col
    const x = cell.getX();
    const col = this.field.getCol(x);
    if (col.isFull()) return false;
    
    // check row
    const y = cell.getY();
    const row = this.field.getRow(y);
    if (row.isFull()) return false;

    return true;
  }

  resetCells() {
    this.cells.forEach((c) => c.reset());
    console.info(this.asText);
  }
  
  checkForWinner() {
    this.game.updateStatistics();
    const solutionFound = this.game.solutionFound();
    return solutionFound;
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
