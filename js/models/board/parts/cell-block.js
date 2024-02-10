import { CellValue } from "./cell-value.js";

export class CellBlock {

  constructor(centerCell, neighborsMap) {
    this.center = centerCell;
    this.neighbors = neighborsMap;
  }

  getCenterCell() {
    return this.center;
  }
  
  getNeighborCells() {
    return Object.entries(this.neighbors).map((e) => e[1]);
  }

  getCornerCells() {
    return Object.entries(this.neighbors)
      .filter((e) => ["a", "c", "e", "g"].includes(e[0]))
      .map((e) => e[1]);
  }

  getSideCells() {
    return Object.entries(this.neighbors)
      .filter((e) => ["b", "d", "f", "h"].includes(e[0]))
      .map((e) => e[1]);
  }

  setSides(values) {
    const sides = this.getSideCells();
    for (let i = 0; i < sides.length; i++) {
      sides[i].setValue(values[i]);
    }
  }
  
  getCells() {
    const nb = this.neighbors;
    const cntr = this.center;
    const cells = [
      nb.a, nb.b, nb.c,
      nb.h, cntr, nb.d,
      nb.g, nb.f, nb.e,
    ];
    return cells;
  }

  setCellValue(cellKey, value) {
    const cell = this.neighbors[cellKey];
    cell.setValue(value);
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
    const north = this.neighbors.b;
    const east = this.neighbors.d;
    const south = this.neighbors.f;
    const west = this.neighbors.h;
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
    const north = this.neighbors.b;
    const east = this.neighbors.d;
    const south = this.neighbors.f;
    const west = this.neighbors.h;
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
