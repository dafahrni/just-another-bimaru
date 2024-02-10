import { CellValue } from "./cell-value.js";

export class CellBlock {

  constructor(centerCell, neighborCells) {
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

  setSides(values) {
    const sides = this.getSideCells();
    for (let i = 0; i < sides.length; i++) {
      sides[i].setValue(values[i]);
    }
  }
  
  getCells() {
    return this.cells;
  }

  setPossibleParts() {
    this.setCornersToWater();
    this.setCenterWhenShipHasDirection();
    this.setSidesWhenShipHasDirection();
  }

  setCornersToWater() {
    if (!this.center.isShip()) return;

    const corners = this.getCornerCells();
    const emptyCorners = corners.filter(cell => cell.isEmpty());
    emptyCorners.forEach((corner) => {
      corner.setValue(CellValue.water);
    });
  }

  setCenterWhenShipHasDirection() {
    if (!this.center.isShip()) return;

    // get sides
    const ss = this.getSideCells();
    const north = ss[0]
    const east = ss[1];
    const south = ss[2];
    const west = ss[3];
    if (
      north.isWater() &&
      east.isWater() &&
      !south.isWater() &&
      west.isWater()
    ) {
      this.center.setValue(CellValue.north);
    } else if (
      north.isWater() &&
      east.isWater() &&
      south.isWater() &&
      !west.isWater()
    ) {
      this.center.setValue(CellValue.east);
    } else if (
      !north.isWater() &&
      east.isWater() &&
      south.isWater() &&
      west.isWater()
    ) {
      this.center.setValue(CellValue.south);
    } else if (
      north.isWater() &&
      !east.isWater() &&
      south.isWater() &&
      west.isWater()
    ) {
      this.center.setValue(CellValue.west);
    } else if (
      north.isWater() &&
      east.isWater() &&
      south.isWater() &&
      west.isWater()
    ) {
      this.center.setValue(CellValue.single);
    } else if (
      (north.isWater() && south.isWater()) ||
      (east.isWater() && west.isWater())
    ) {
      this.center.setValue(CellValue.center);
    } else {
      // do nothing
    }
  }

  setSidesWhenShipHasDirection() {
    if (!this.center.isShip()) return;

    // get sides
    const ss = this.getSideCells();
    const north = ss[0]
    const east = ss[1];
    const south = ss[2];
    const west = ss[3];
    switch (this.center.asSymbol()) {
      case "s":
      case "□":
        if (north.isWater() || south.isWater()) {
          this.setSides([CellValue.water, CellValue.ship, CellValue.water, CellValue.ship]);
        } else
        if (east.isWater() || west.isWater()) {
          this.setSides([CellValue.ship, CellValue.water, CellValue.ship, CellValue.water]);
        }
        break;
      case "^":
        this.setSides([CellValue.water, CellValue.water, CellValue.ship, CellValue.water]);
        break;
      case ">":
        this.setSides([CellValue.water, CellValue.water, CellValue.water, CellValue.ship]);
        break;
      case "v":
        this.setSides([CellValue.ship, CellValue.water, CellValue.water, CellValue.water]);
        break;
      case "<":
        this.setSides([CellValue.water, CellValue.ship, CellValue.water, CellValue.water]);
        break;
      case "o":
        this.setSides([CellValue.water, CellValue.water, CellValue.water, CellValue.water]);
        break;
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
    text = text.substring(0, text.length - 2);
    return text;
  }

  toString() {
    return this.asText();
  }
}
