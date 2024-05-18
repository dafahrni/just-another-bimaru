import { CellValue } from "./cell-value.js";
import { Cell } from "./cell.js";

export class CellBlock {
  
  private center: Cell;
  private neighbors: Cell[];
  private cells: Cell[];

  constructor(centerCell: Cell, neighborCells: Cell[]) {
    this.center = centerCell;
    this.neighbors = neighborCells;

    const ns = this.neighbors;
    const cnter = this.center;
    this.cells = [
      ns[0], ns[1], ns[2],
      ns[7], cnter, ns[3],
      ns[6], ns[5], ns[4],
    ];
  }

  getCenterCell() {
    return this.center;
  }
  
  getNeighborCells() {
    return this.neighbors;
  }

  getCornerCells() {
    const ns = this.neighbors;
    return [ns[0], ns[2], ns[4], ns[6]];
  }

  getSideCells() {
    const ns = this.neighbors;
    return [ns[1], ns[3], ns[5], ns[7]];
  }

  getSideCellMap() {
    const ns = this.neighbors;
    const cellMap = {
      "n": ns[1],
      "e": ns[3],
      "s": ns[5],
      "w": ns[7],
    };
    return cellMap;
  }
  
  getCells() {
    return this.cells;
  }

  setPossibleParts() {
    // for solver only (must not be used for playing!!)
    this.setCornersToWater();
    this.setCenter();
    this.setSidesToWater();
  }

  setCornersToWater() {
    if (!this.center.isShip()) return;

    const corners = this.getCornerCells();
    const emptyCorners = corners.filter(cell => cell.isEmpty());
    
    this.setCellValuesTo(emptyCorners, CellValue.water);
  }

  setCellValuesTo(cells: Cell[], value: CellValue) {
    cells.forEach(cell => cell.setValue(value));
  }

  setCenter() {
    if (!this.center.isShip()) return;

    // get sides cells
    const side = this.getSideCellMap();
    const sides = this.getSideCells();
    const center = this.center;
    if (sides.some(c => c.hasSymbol('o'))) {
      center.reset();
    } else if (side["n"].isWater() && (side["s"].hasSymbol("sv") ||
               side["s"].hasSymbol("□") && (side["w"].isWater() || side["e"].isWater()))) {
      center.setValue(CellValue.north);
    } else if (side["e"].isWater() && (side["w"].hasSymbol("s<") ||
               side["w"].hasSymbol("□") && (side["n"].isWater() || side["s"].isWater()))) {
      center.setValue(CellValue.east);
    } else if (side["s"].isWater() && (side["n"].hasSymbol("s^") ||
               side["n"].hasSymbol("□") && (side["w"].isWater() || side["e"].isWater()))) {
      center.setValue(CellValue.south);
    } else if (side["w"].isWater() && (side["e"].hasSymbol("s>") ||
               side["e"].hasSymbol("□") && (side["n"].isWater() || side["s"].isWater()))) {
      center.setValue(CellValue.west);
    } else if (sides.every(c => c.isWater())) {
      center.setValue(CellValue.single);
    } else if (
      (side["n"].isShip() && side["s"].isShip()) ||
      (side["e"].isShip() && side["w"].isShip()) 
    ) {
      center.setValue(CellValue.center);
    }
  }

  setSidesToWater() {
    if (!this.center.isShip()) return;

    // get sides cells
    const side = this.getSideCellMap();
    const center = this.center;
    if (center.hasSymbol("s") || center.hasSymbol("□")) {
      if (side["n"].isShip() && side["s"].isShip()) {
        this.setCellValuesTo([side["e"], side["w"]], CellValue.water);
      } else
      if (side["e"].isShip() && side["w"].isShip()) {
        this.setCellValuesTo([side["n"], side["s"]], CellValue.water);
      }
    } else if (center.hasSymbol("^")) {
      this.setCellValuesTo([side["n"], side["e"], side["w"]], CellValue.water);
    } else if (center.hasSymbol(">")) {
      this.setCellValuesTo([side["n"], side["e"], side["s"]], CellValue.water);
    } else if (center.hasSymbol("v")) {
      this.setCellValuesTo([side["e"], side["s"], side["w"]], CellValue.water);
    } else if (center.hasSymbol("<")) {
      this.setCellValuesTo([side["n"], side["s"], side["w"]], CellValue.water);
    } else if (center.hasSymbol("o")) {
      this.setCellValuesTo(this.getSideCells(), CellValue.water);
    }
  }

  correctCenterAfterUserSelection() {
    if (!this.center.isShip()) return;

    this.correctCenter();
  }

  correctCenter() {
    // get sides cells
    const side = this.getSideCellMap();
    const center = this.center;
    if (center.isWater()) {
      // do nothing
    } else if (side["s"].isWater() && (
               side["n"].hasSymbol("s^") || 
               side["n"].hasSymbol("□") && (
               side["w"].isWater() || side["e"].isWater()))) {
      center.setValue(CellValue.south);
    } else if (side["w"].isWater() && (
               side["e"].hasSymbol("s>") || 
               side["e"].hasSymbol("□") && (
               side["n"].isWater() || side["s"].isWater()))) {
      center.setValue(CellValue.west);
    } else if (side["n"].isWater() && (
               side["s"].hasSymbol("sv") || 
               side["s"].hasSymbol("□") && (
               side["w"].isWater() || side["e"].isWater()))) {
      center.setValue(CellValue.north);
    } else if (side["e"].isWater() && (
               side["w"].hasSymbol("s<") || 
               side["w"].hasSymbol("□") && (
               side["n"].isWater() || side["s"].isWater()))) {
      center.setValue(CellValue.east);
    } 

    if (center.isEmpty()) {
      if (
        side["n"].hasSymbol("^") ||
        side["e"].hasSymbol(">") ||
        side["s"].hasSymbol("v") ||
        side["w"].hasSymbol("<")
      ) {
        center.setValue(CellValue.ship);
      }
    }

    this.correctSides();
  }

  correctSides() {
    if (!this.center.isShip()) return;

    // get sides cells
    const side = this.getSideCellMap();
    const center = this.center;

    // reset surrounding ships, eventually
    if ((
      side["n"].hasSymbol("v") ||
      side["n"].hasSymbol("o")))
      side["n"].setValue(CellValue.ship);
    if ((
      side["e"].hasSymbol("<") ||
      side["e"].hasSymbol("o")))
      side["e"].setValue(CellValue.ship);
    if ((
      side["s"].hasSymbol("^") ||
      side["s"].hasSymbol("o")))
      side["s"].setValue(CellValue.ship);
    if ((
      side["w"].hasSymbol(">") ||
      side["w"].hasSymbol("o")))
      side["w"].setValue(CellValue.ship);

    if (center.hasSymbol("□")) {
      if (side["n"].isWater() || side["s"].isWater()) {
        this.setCellValuesTo([side["e"], side["w"]], CellValue.ship);
      } else
      if (side["e"].isShip() || side["w"].isShip()) {
        this.setCellValuesTo([side["n"], side["s"]], CellValue.ship);
      }
    } 
  }

  asText() {
    let text = "";
    let i = 0;
    const cells = this.getCells();
    cells.forEach(cell => { 
      text += `${cell.asSymbol()} ${(i % 3 === 2 ? "\n" : "")}`;  
      i += 1;
    });
    text = text.substring(0, text.length - 1);
    return text;
  }

  toString() {
    return this.asText();
  }
}
