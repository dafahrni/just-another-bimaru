import { Cell } from "../parts/cell.js";
import { CellLine } from "../parts/cell-line.js";
import { Position } from "../parts/position.js";
import { CellBlockFactory } from "../parts/cell-block-factory.js";
export class FieldBase {
    constructor(labels) {
        this.cols = labels.cols;
        this.rows = labels.rows;
        this.labels = labels;
        this.cells = [];
        let index = 0;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const cell = new Cell(new Position(x, y));
                this.cells.push(cell);
                cell.setIndex(index);
                index += 1;
            }
        }
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const cell = this.getCell(x, y);
                const block = CellBlockFactory.from(cell, this);
                cell.setBlock(block);
            }
        }
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const cell = this.getCell(x, y);
                cell.setCol(this.getCol(x));
                cell.setRow(this.getRow(y));
            }
        }
    }
    setPredefinedCells(predefinedCells = null) {
        predefinedCells = predefinedCells
            ? predefinedCells
            : this.cells.filter((cell) => cell.isPredefinedCellCandidate());
        predefinedCells.forEach((predefinedCell) => {
            const pos = predefinedCell.getPos();
            this.setCellValueFix(pos.getX(), pos.getY(), predefinedCell.getValue());
        });
    }
    setCellValueFix(x, y, value) {
        this.setCellValue(x, y, value, true);
    }
    setCellValue(x, y, value, isFix = false) {
        let cell = this.getCell(x, y);
        if (cell != null) {
            cell.setValue(value);
            if (isFix) {
                cell.setFix();
            }
        }
    }
    getCell(x, y) {
        const pos = new Position(x, y);
        const matchingCells = this.cells.filter((c) => c.getPos().isSameAs(pos));
        if (matchingCells.length > 0) {
            return matchingCells[0];
        }
        else {
            return Cell.outer();
        }
    }
    getCells() {
        return this.cells;
    }
    getCellsWithFixedValue() {
        return this.cells.filter((cell) => cell.getIsFix());
    }
    getNoneEmptyCells() {
        return this.cells.filter((cell) => !cell.isEmpty());
    }
    getRow(y) {
        let cells = [];
        for (let x = 0; x < this.cols; x++) {
            const cell = this.getCell(x, y);
            cells.push(cell);
        }
        return new CellLine(this.labels.ofRow(y), cells);
    }
    getCol(x) {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            const cell = this.getCell(x, y);
            cells.push(cell);
        }
        return new CellLine(this.labels.ofCol(x), cells);
    }
    getLabels() {
        return this.labels;
    }
    getSizeX() {
        return this.labels.cols;
    }
    getSizeY() {
        return this.labels.rows;
    }
    asTextWithCheckMarks() {
        return this.asText(true);
    }
    asText(withCheckMarks = false) {
        let text = "";
        for (let y = 0; y < this.rows; y++) {
            let row = this.getRow(y);
            let line = (withCheckMarks && row.isFull() ? "√" : this.labels.ofRow(y)) + " | ";
            for (let x = 0; x < this.cols; x++) {
                let cell = this.getCell(x, y);
                line += cell.asSymbol() + " ";
            }
            text += line + "\n";
        }
        text += "   ";
        for (let x = 0; x < this.cols; x++) {
            let col = this.getCol(x);
            text +=
                " " + (withCheckMarks && col.isFull() ? "√" : this.labels.ofCol(x));
        }
        return text;
    }
    toString() {
        return this.asText();
    }
}
//# sourceMappingURL=field-base.js.map