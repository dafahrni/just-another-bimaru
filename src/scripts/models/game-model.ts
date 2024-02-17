import { FieldFactory } from "./board/field-factory.js";
import { Field } from "./board/field.js";
import { Game } from "./board/game.js";
import { GameDefinition } from "./board/game-definition.js";
import { ShipSet } from "./board/parts/ship-set.js";
import { Cell } from "./board/parts/cell.js";
import { Labels } from "./board/parts/labels.js";

import { DtoFactory } from "./dtos/DtoFactory.js";
export class GameModel {

  private field: Field;
  private labels: Labels;
  private cells: Cell[];
  private game: Game;
  
  constructor(field: Field | null = null) {
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

    const dto = DtoFactory.mapField(this.field);
  }

  initStatistics(shipSets: ShipSet[]) {
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

  getLabels() {
    return this.labels;
  }

  getCells() {
    return this.cells;
  }

  getCell(index: number) {
    if (this.isValid(index))
      return this.cells[index];
    else throw new Error(`No cell with index ${index} available.`);
  }

  fillLineWithWater(index: number) {
    // index depends on label creation in Bimaru.setupHtml 
    const sizeX = this.labels.cols;
    const sizeY = this.labels.rows;
    if (index < 0 || index >= sizeX+sizeY) 
      return;

    const line = index < sizeY
      ? this.field.getRow(index)
      : this.field.getCol(index - sizeY);
    line.changeEmptyToWater();
  }

  changeCell(index: number) {
    if (!this.isValid(index))
      return false;

    const cell = this.cells[index];
    if (!cell.tryChangeValue())
      return false;

    // send dto as message to update view
    const dto = DtoFactory.mapCell(cell);

    console.info(this.field.asTextWithCheckMarks());
    return true;
  }

  resetCells() {
    this.cells.forEach((c: Cell) => c.reset());
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

  isValid(index: number) {
    if (index < 0 || index >= this.size) {
      console.error(
        `Index ${index} outside of intervall [0..${this.size - 1}]`
      );
      return false;
    }
    return true;
  }
}
