import { Cell } from "./cell.js";
import { Slot } from "./slot.js";

export class CellLine {

    static from(targetAmount, cellCount) {
        let emptyCells = new Cell[cellCount];
        for (let x = 0; x < cells.length; x++) {
            emptyCells[x] = new Cell(new Position(x, 0), CellValue.empty);
        }
        return new CellLine(targetAmount, emptyCells);
    }

    static parse(text) {
        let line = text.replace(/\s/g, "").split("|");
        let label = parseInt(line[0]);
        let cellValues = line[1];
        let sizeX = cellValues.length;
        let cells = Array.from({ length: sizeX }, () => ({}));
        for (let x = 0; x < sizeX; x++) {
            let symbol = cellValues[x];
            cells[x] = Cell.from(x, 0, symbol);
        }
        return new CellLine(label, cells);
    }

    constructor(targetAmount, cells) {
        this.targetAmount = targetAmount;
        this.cells = cells;
    }

    getTargetAmount() {
        return this.targetAmount;
    }

    getCurrentAmount() {
        let currentAmount = 0;
        this.cells.forEach(cell => {
            if (cell.isShip()) {
                currentAmount += 1;
            }
        });
        return currentAmount;
    }

    getAmountLeft() { return this.targetAmount - this.getCurrentAmount(); }

    isFull() {
        return this.targetAmount == this.getCurrentAmount();
    }

    hasEmptyCells() {
        this.cells.forEach(cell => {
            if (cell.isEmpty()) {
                return true;
            }
        });
        return false;
    }

    getCells() {
        return this.cells;
    }

    asText() {
        let text = this.targetAmount + " |";
        this.cells.forEach(cell => {
            text += " " + cell.getValue().getSymbol();
        });
        return text;
    }

    findSlots() {
        let slots = [];
        if (this.isFull())
            return slots;

        let tempCells = [];
        this.cells.forEach(cell => {
            if (cell.isWater()) {
                CellLine.addToSlots(slots, tempCells);
            } else {
                tempCells.add(cell);
            }
        });
        CellLine.addToSlots(slots, tempCells);
        return slots;
    }

    findSlots(minShipSize) {
        return this.findSlots().filter(s => s.size() >= minShipSize);
    }

    findSlots2(minShipSize) {
        slots = [];
        this.findSlots(minShipSize).forEach(slot => {
            slots.add(slot);
        });
        return slots;
    }

    static addToSlots(slots, tempCells) {
        if (tempCells.size() <= 0)
            return;

        let cells = tempCells;
        let newSlot = new Slot(cells);
        slots.add(newSlot);
        tempCells.clear();
    }
}