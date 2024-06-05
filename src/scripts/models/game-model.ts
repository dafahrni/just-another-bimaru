import { FieldFactory } from "./board/field-factory.js";
import { Field } from "./board/field.js";
import { Game } from "./board/game.js";
import { GameDefinition } from "./board/game-definition.js";
import { ShipSet } from "./board/parts/ship-set.js";
import { Cell } from "./board/parts/cell.js";
import { Labels } from "./board/parts/labels.js";
import { CellValue } from "./board/parts/cell-value.js";

export class GameModel {

  field: Field;
  labels: Labels;
  cells: Cell[];
  game: Game;
  config: GameDefinition;
  configIndex: number;
  
  constructor(config?: GameDefinition, index?: number | null) {
    this.config = config 
      ? config 
      : GameDefinition.default(2);
    this.configIndex = config && index != null && index >= 0 
      ? index
      : -1;
    this.field = FieldFactory.createWith(this.config);
    this.labels = this.field.getLabels();
    this.cells = this.field.getCells();
    this.game = new Game(this.field);
    this.game.initStatistics(this.config.getShipSets());
  }

  extractConfig() {
    const config = GameDefinition.extract(this.field);
    return config;
  }

  getConfig() {
    return this.config;
  }

  getConfigIndex() {
    return this.configIndex;
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

  fillLineWithWater(labelIndex: number) {
    // index depends on label creation in Bimaru.setupHtml
    const index = labelIndex; 
    const sizeX = this.labels.cols;
    const sizeY = this.labels.rows;
    if (index < 0 || index >= sizeX+sizeY) 
      return;

    const line = index < sizeY
      ? this.field.getRow(index)
      : this.field.getCol(index - sizeY);
    line.changeEmptyToWater();
  }

  increaseTargetValue(labelIndex: number) {
    // index depends on label creation in Bimaru.setupHtml
    const index = labelIndex; 
    const sizeX = this.labels.cols;
    const sizeY = this.labels.rows;
    if (index < 0 || index >= sizeX+sizeY) 
      return;

    if (index < sizeY)
      this.labels.increaseRowTarget(index)
    else
      this.labels.increaseColTarget(index - sizeY);
  }

  setCell(index: number, symbol: string | null = null) {
    if (!this.isValid(index))
      return;

    const cell = this.cells[index];
    const nextValue = symbol 
      ? CellValue.from(symbol)
      : cell.getNextValue();

    cell.setValue(nextValue);
  }

  changeCell(index: number) {
    if (!this.isValid(index))
      return false;

    const cell = this.cells[index];
    if (!cell.tryChangeValue())
      return false;

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
