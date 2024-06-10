import { FieldFactory } from "./board/field-factory.js";
import { Game } from "./board/game.js";
import { Configuration } from "./board/configuration.js";
import { CellValue } from "./parts/cell-value.js";
export class GameModel {
    constructor(config, index) {
        this.config = config ? config : Configuration.default(2);
        this.configIndex = config && index != null && index >= 0 ? index : -1;
        this.field = FieldFactory.createWith(this.config);
        this.labels = this.field.getLabels();
        this.cells = this.field.getCells();
        this.game = new Game(this.field);
        this.game.initStatistics(this.config.getShipSets());
    }
    extractConfig() {
        const config = Configuration.extract(this.field);
        return config;
    }
    getConfig() {
        return this.config;
    }
    getConfigIndex() {
        return this.configIndex;
    }
    initStatistics(shipSets) {
        this.game.initStatistics(shipSets);
    }
    getUpdatedStatistics() {
        this.game.updateStatistics();
        return this.game.getStatistics();
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
    getCell(index) {
        if (this.isValid(index))
            return this.cells[index];
        else
            throw new Error(`No cell with index ${index} available.`);
    }
    fillLineWithWater(labelIndex) {
        // index depends on label creation in Bimaru.setupHtml
        const index = labelIndex;
        const sizeX = this.labels.cols;
        const sizeY = this.labels.rows;
        if (index < 0 || index >= sizeX + sizeY)
            return;
        const line = index < sizeY
            ? this.field.getRow(index)
            : this.field.getCol(index - sizeY);
        line.changeEmptyToWater();
    }
    increaseTargetValue(labelIndex) {
        // index depends on label creation in Bimaru.setupHtml
        const index = labelIndex;
        const sizeX = this.labels.cols;
        const sizeY = this.labels.rows;
        if (index < 0 || index >= sizeX + sizeY)
            return;
        if (index < sizeY)
            this.labels.increaseRowTarget(index);
        else
            this.labels.increaseColTarget(index - sizeY);
    }
    setTargetValue(labelIndex, value) {
        // index depends on label creation in Bimaru.setupHtml
        const index = labelIndex;
        const sizeX = this.labels.cols;
        const sizeY = this.labels.rows;
        if (index < 0 || index >= sizeX + sizeY)
            return;
        if (index < sizeY)
            this.labels.setRowTarget(index, value);
        else
            this.labels.setColTarget(index - sizeY, value);
    }
    setCell(index, symbol) {
        if (!this.isValid(index))
            return;
        const cell = this.cells[index];
        const nextValue = symbol ? CellValue.from(symbol) : cell.getNextValue();
        cell.setValue(nextValue);
    }
    changeCell(index) {
        if (!this.isValid(index))
            return false;
        const cell = this.cells[index];
        if (!cell.tryChangeValue())
            return false;
        console.info(this.field.asTextWithCheckMarks());
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
            console.error(`Index ${index} outside of intervall [0..${this.size - 1}]`);
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=game-model.js.map