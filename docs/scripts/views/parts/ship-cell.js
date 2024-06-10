import { CellBase } from "./cell-base.js";
export class ShipCell extends CellBase {
    constructor(size, hasBorder = true) {
        super(size);
        this.symbol = "";
        this.isSelected = false;
        this.cell = document.createElementNS(this.svgNamespace, "rect");
        this.cell.setAttribute("class", hasBorder ? "cell" : "cell-borderless");
        this.cell.setAttribute("width", `${this.size}`);
        this.cell.setAttribute("height", `${this.size}`);
        this.tile.appendChild(this.cell);
        this.selectCellType(".");
    }
    get selectedCellType() {
        return this.symbol;
    }
    selectCell(isSelected) {
        this.isSelected = isSelected;
        if (isSelected)
            this.cell.classList.add("selected");
        else
            this.cell.classList.remove("selected");
    }
    selectCellType(newSymbol) {
        if (newSymbol === this.symbol)
            return;
        // alles löschen ausser den Hintergrund
        Array.from(this.tile.children)
            .filter((child) => !child.classList.contains("cell"))
            .forEach((child) => this.tile.removeChild(child));
        this.symbol = newSymbol;
        switch (newSymbol) {
            case "^":
                this.appendShip(0);
                break;
            case ">":
                this.appendShip(1);
                break;
            case "v":
                this.appendShip(2);
                break;
            case "<":
                this.appendShip(3);
                break;
            case "□":
                this.appendMidPiece();
                break;
            case "o":
                this.appendSubmarine();
                break;
            case "s":
                this.appendDot();
                break;
            case "~":
                this.appendWater();
                break;
            case ".":
            default:
                break;
        }
        // Grösse anpassen
        Array.from(this.tile.children)
            .filter((child) => !child.classList.contains("cell"))
            .forEach((child) => this.scale(child));
    }
    setFix(fix) {
        if (fix)
            this.tile.classList.add("semi-transparent");
        else
            this.tile.classList.remove("semi-transparent");
    }
    createShipPart(type) {
        const part = document.createElementNS(this.svgNamespace, type);
        part.setAttribute("class", "ship");
        part.setAttribute("pointer-events", "none");
        return part;
    }
    appendShip(n) {
        // Rechteck erstellen
        const part1 = this.createShipPart("rect");
        part1.setAttribute("x", "10");
        part1.setAttribute("y", "48");
        part1.setAttribute("width", "80");
        part1.setAttribute("height", "42");
        this.tile.appendChild(part1);
        // Bogen erstellen
        const part2 = this.createShipPart("path");
        part2.setAttribute("d", "M10,50 A40,40 0 0,1 90,50");
        this.tile.appendChild(part2);
        const degree = 90 * (n % 4);
        this.tile.setAttribute("transform", `rotate(${degree})`);
    }
    appendMidPiece() {
        const midPiece = document.createElementNS(this.svgNamespace, "rect");
        midPiece.setAttribute("class", "ship");
        midPiece.setAttribute("pointer-events", "none");
        midPiece.setAttribute("x", "10");
        midPiece.setAttribute("y", "10");
        midPiece.setAttribute("width", "80");
        midPiece.setAttribute("height", "80");
        this.tile.appendChild(midPiece);
        const degree = 0;
        this.tile.setAttribute("transform", `rotate(${degree})`);
    }
    appendSubmarine() {
        const submarine = this.createShipPart("circle");
        submarine.setAttribute("cx", "50");
        submarine.setAttribute("cy", "50");
        submarine.setAttribute("r", "40");
        this.tile.appendChild(submarine);
        const degree = 0;
        this.tile.setAttribute("transform", `rotate(${degree})`);
    }
    appendDot() {
        const dot = this.createShipPart("circle");
        dot.setAttribute("cx", "50");
        dot.setAttribute("cy", "50");
        dot.setAttribute("r", "10");
        this.tile.appendChild(dot);
        const degree = 0;
        this.tile.setAttribute("transform", `rotate(${degree})`);
    }
    appendWater() {
        let h2o = document.createElementNS(this.svgNamespace, "rect");
        h2o.setAttribute("class", "water");
        h2o.setAttribute("pointer-events", "none");
        h2o.setAttribute("x", "10");
        h2o.setAttribute("y", "10");
        h2o.setAttribute("width", "80");
        h2o.setAttribute("height", "80");
        this.tile.appendChild(h2o);
        // upper wave line
        h2o = document.createElementNS(this.svgNamespace, "path");
        h2o.setAttribute("class", "wave");
        h2o.setAttribute("pointer-events", "none");
        h2o.setAttribute("d", "M20 30 Q 35 10, 50 30 Q 65 50, 80 30");
        this.tile.appendChild(h2o);
        // middle wave line
        h2o = document.createElementNS(this.svgNamespace, "path");
        h2o.setAttribute("class", "wave");
        h2o.setAttribute("pointer-events", "none");
        h2o.setAttribute("d", "M20 50 Q 35 30, 50 50 Q 65 70, 80 50");
        this.tile.appendChild(h2o);
        // lower wave line
        h2o = document.createElementNS(this.svgNamespace, "path");
        h2o.setAttribute("class", "wave");
        h2o.setAttribute("pointer-events", "none");
        h2o.setAttribute("d", "M20 70 Q 35 50, 50 70 Q 65 90, 80 70");
        this.tile.appendChild(h2o);
        const degree = 0;
        this.tile.setAttribute("transform", `rotate(${degree})`);
    }
}
//# sourceMappingURL=ship-cell.js.map