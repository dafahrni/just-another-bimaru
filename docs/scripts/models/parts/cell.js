import { Position } from "./position.js";
import { CellValue } from "./cell-value.js";
export class Cell {
    static isHorizontal(cells) {
        if (cells.length <= 0)
            return false;
        let y = cells[0].getY();
        for (let i = 1; i < cells.length; i++)
            if (y != cells[i].getY())
                return false;
        return true;
    }
    static isVertical(cells) {
        if (cells.length <= 0)
            return false;
        let x = cells[0].getX();
        for (let i = 1; i < cells.length; i++)
            if (x != cells[i].getX())
                return false;
        return true;
    }
    static outer() {
        return new Cell(new Position(-1, -1), CellValue.outer);
    }
    constructor(pos, value = CellValue.empty) {
        if (!pos)
            throw new Error("Argument 'pos' must not be null!");
        if (!value)
            throw new Error("Argument 'value' must not be null!");
        this.pos = pos;
        this.value = value;
        this.isFix = false;
        this.isDirty = false;
        this.block = null;
        this.index = -1;
        this.row = null;
        this.col = null;
    }
    setIndex(index) {
        this.index = index;
    }
    getIndex() {
        return this.index;
    }
    setBlock(block) {
        this.block = block;
    }
    getBlock() {
        const block = this.block;
        if (block)
            return block;
        throw new Error("Block is expected to be defined here!");
    }
    setRow(row) {
        this.row = row;
    }
    getRow() {
        const row = this.row;
        if (row)
            return row;
        throw new Error("Row is expected to be defined here!");
    }
    setCol(col) {
        this.col = col;
    }
    getCol() {
        const col = this.col;
        if (col)
            return col;
        throw new Error("Col is expected to be defined here!");
    }
    getPos() {
        return this.pos;
    }
    getValue() {
        return this.value;
    }
    getNextValue() {
        return this.value.getNext();
    }
    setValue(value) {
        // used for object creation in Field class, unit testing, solver ...
        if (this.isFix)
            return;
        if (this.value.isSameAs(CellValue.outer))
            return;
        if (this.value.isSameAs(value))
            return;
        this.value = value;
        this.isDirty = true;
    }
    tryChangeValue() {
        var _a, _b;
        // used for player of the game
        if (this.isFix)
            return false;
        // use state machine to change cell value
        if (this.isEmpty()) {
            this.value = CellValue.water;
            (_a = this.block) === null || _a === void 0 ? void 0 : _a.correctCenterAfterUserSelection();
        }
        else if (this.isWater()) {
            this.value = CellValue.ship;
            (_b = this.block) === null || _b === void 0 ? void 0 : _b.setCenter();
        }
        else if (this.isShip()) {
            this.value = CellValue.empty;
        }
        else {
            throw new Error("Unexpected value: " + this.value);
        }
        return true;
    }
    hasShipInCorner() {
        if (!this.block)
            return;
        const corners = this.block.getCornerCells();
        for (let i = 0; i < corners.length; i++) {
            if (corners[i].isShip())
                return true;
        }
        return false;
    }
    reset() {
        if (this.isFix)
            return;
        this.value = CellValue.empty;
    }
    setFix(isfix = true) {
        this.isFix = isfix;
    }
    isShip() {
        return this.value.isShip();
    }
    isWater() {
        return this.value.isWater();
    }
    isEmpty() {
        return this.value.isEmpty();
    }
    getX() {
        return this.pos.getX();
    }
    getY() {
        return this.pos.getY();
    }
    getIsFix() {
        return this.isFix;
    }
    isPredefinedCellCandidate() {
        return this.value.isPredefinedCellCandidate();
    }
    asSymbol() {
        return this.value.getSymbol();
    }
    hasSymbol(symbol) {
        return symbol.includes(this.asSymbol());
    }
    getDirtyFlag() {
        return this.isDirty;
    }
    resetDirtyFlag() {
        if (this.isDirty)
            this.isDirty = false;
    }
    asText() {
        return `${this.asSymbol()} (${this.pos}, ${this.index})`;
    }
    toString() {
        return this.asText();
    }
}
//# sourceMappingURL=cell.js.map