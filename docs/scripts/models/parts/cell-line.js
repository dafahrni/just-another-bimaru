import { Cell } from "./cell.js";
import { CellValue } from "./cell-value.js";
import { Slot } from "./slot.js";
import { Position } from "./position.js";
export var LineState;
(function (LineState) {
    LineState[LineState["hasShipsToPlace"] = 0] = "hasShipsToPlace";
    LineState[LineState["isFull"] = 1] = "isFull";
    LineState[LineState["isCrowded"] = 2] = "isCrowded";
})(LineState || (LineState = {}));
export class CellLine {
    static from(targetAmount, cellCount) {
        let emptyCells = Array(cellCount);
        for (let x = 0; x < cellCount; x++) {
            emptyCells[x] = new Cell(new Position(x, 0), CellValue.empty);
        }
        return new CellLine(targetAmount, emptyCells);
    }
    static parse(text) {
        let line = text.replace(/ /g, "").split("|");
        let label = parseInt(line[0]);
        let cellValues = line[1];
        let size = cellValues.length;
        let cells = [];
        for (let x = 0; x < size; x++) {
            let symbol = cellValues[x];
            let pos = new Position(x, 0);
            let value = CellValue.from(symbol);
            cells.push(new Cell(pos, value));
        }
        return new CellLine(label, cells);
    }
    constructor(targetAmount, cells) {
        this.targetAmount = targetAmount;
        this.cells = cells;
    }
    get size() {
        return this.cells.length;
    }
    getTargetAmount() {
        return this.targetAmount;
    }
    getCurrentAmount() {
        let currentAmount = 0;
        this.cells.forEach((cell) => {
            if (cell.isShip()) {
                currentAmount += 1;
            }
        });
        return currentAmount;
    }
    getAmountLeft() {
        return this.targetAmount - this.getCurrentAmount();
    }
    isFull() {
        return this.targetAmount == this.getCurrentAmount();
    }
    get state() {
        const amount = this.getCurrentAmount();
        if (amount < this.targetAmount)
            return LineState.hasShipsToPlace;
        else if (amount === this.targetAmount)
            return LineState.isFull;
        else
            return LineState.isCrowded;
    }
    hasEmptyCells() {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].isEmpty())
                return true;
        }
        return false;
    }
    getCells() {
        return this.cells;
    }
    asText() {
        let text = this.targetAmount + " |";
        this.cells.forEach((cell) => {
            text += " " + cell.asSymbol();
        });
        return text;
    }
    toString() {
        return this.asText();
    }
    findSlots(minShipSize = null) {
        let slots = [];
        if (this.isFull())
            return slots;
        let tempCells = [];
        this.cells.forEach((cell) => {
            if (cell.isWater()) {
                slots = CellLine.addToSlots(slots, tempCells);
                tempCells = [];
            }
            else {
                tempCells.push(cell);
            }
        });
        slots = CellLine.addToSlots(slots, tempCells);
        return minShipSize
            ? slots.filter((s) => s.size >= minShipSize)
            : slots;
    }
    static addToSlots(slots, tempCells) {
        if (tempCells.length <= 0)
            return slots;
        let cells = tempCells;
        let newSlot = new Slot(cells);
        slots.push(newSlot);
        return slots;
    }
    changeEmptyToWater() {
        this.cells.forEach((cell) => {
            if (cell.isEmpty()) {
                cell.setValue(CellValue.water);
            }
        });
    }
}
//# sourceMappingURL=cell-line.js.map