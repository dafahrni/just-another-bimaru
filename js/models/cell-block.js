import { CellValue } from "./cell-value.js";
import { Field } from "./field.js";

export class CellBlock {
  static from(centerCell, field) {
    // a b c
    // h . d
    // g f e
    const neighbors = {
      a: { x: (x) => x - 1, y: (y) => y - 1 }, // a
      b: { x: (x) => x + 0, y: (y) => y - 1 }, // north
      c: { x: (x) => x + 1, y: (y) => y - 1 }, // c
      d: { x: (x) => x + 1, y: (y) => y - 0 }, // east
      e: { x: (x) => x + 1, y: (y) => y + 1 }, // e
      f: { x: (x) => x - 0, y: (y) => y + 1 }, // south
      g: { x: (x) => x - 1, y: (y) => y + 1 }, // g
      h: { x: (x) => x - 1, y: (y) => y + 0 }, // west
    };

    const cx = centerCell.getX();
    const cy = centerCell.getY();

    const neighborsMap = {};

    Object.entries(neighbors).map(([key, value]) => {
      const x = value.x(cx);
      const y = value.y(cy);
      neighborsMap[key] = field.getCell(x, y);
    });

    return new CellBlock(centerCell, neighborsMap);
  }

  constructor(centerCell, neighborsMap) {
    if (neighborsMap instanceof Field)
      throw new Error("Argument 'neighborsMap' must not be of type 'Field'.");
    this.center = centerCell;
    this.neighbors = neighborsMap;
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
        break;
      case "□":
        if (north.isWater() || south.isWater()) {
          this.setNorth(CellValue.water);
          this.setEast(CellValue.ship);
          this.setSouth(CellValue.water);
          this.setWest(CellValue.ship);
          break;
        }
        if (east.isWater() || west.isWater()) {
          this.setNorth(CellValue.ship);
          this.setEast(CellValue.water);
          this.setSouth(CellValue.ship);
          this.setWest(CellValue.water);
        }
        break;
      case "^":
        this.setNorth(CellValue.water);
        this.setEast(CellValue.water);
        this.setSouth(CellValue.ship);
        this.setWest(CellValue.water);
        break;
      case ">":
        this.setNorth(CellValue.water);
        this.setEast(CellValue.water);
        this.setSouth(CellValue.water);
        this.setWest(CellValue.ship);
        break;
      case "v":
        this.setNorth(CellValue.ship);
        this.setEast(CellValue.water);
        this.setSouth(CellValue.water);
        this.setWest(CellValue.water);
        break;
      case "<":
        this.setNorth(CellValue.water);
        this.setEast(CellValue.ship);
        this.setSouth(CellValue.water);
        this.setWest(CellValue.water);
        break;
      case "o":
        this.setNorth(CellValue.water);
        this.setEast(CellValue.water);
        this.setSouth(CellValue.water);
        this.setWest(CellValue.water);
        break;
    }
  }

  setNorth(value) {
    const cell = this.neighbors.b;
    cell.setValue(value);
  }

  setEast(value) {
    const cell = this.neighbors.d;
    cell.setValue(value);
  }

  setSouth(value) {
    const cell = this.neighbors.f;
    cell.setValue(value);
  }

  setWest(value) {
    const cell = this.neighbors.h;
    cell.setValue(value);
  }

  setCornersToWater() {
    if (!this.center.isShip()) return;

    const corners = this.getCornerCells();
    corners.forEach((corner) => {
      if (corner != null) {
        corner.setValue(CellValue.water);
      }
    });
  }
}
