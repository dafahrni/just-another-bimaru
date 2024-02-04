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

    const neigborsMap = {};

    Object.entries(neighbors).map(([key, value]) => {
      const x = value.x(cx);
      const y = value.y(cy);
      neigborsMap[key] = field.getCell(x, y);
    });

    return new CellBlock(centerCell, neigborsMap);
  }

  constructor(centerCell, neighborsMap) {
    if (neighborsMap instanceof Field)
      throw new Error("Argument 'neighborsMap' must not be of type 'Field'.");
    this.center = centerCell;
    this.neighbors = neighborsMap;
  }

  getNeighbors() {
    return Object.entries(this.neighbors).map(([k, v]) => v);
  }

  getCorners() {
    return Object.entries(this.neighbors)
      .filter(([k, v]) => ["a", "c", "e", "g"].includes(k))
      .map(([k, v]) => v);
  }

  getSides() {
    return Object.entries(this.neighbors)
      .filter(([k, v]) => ["b", "d", "f", "h"].includes(k))
      .map(([k, v]) => v);
  }

  setCenterWhenShipHasDirection() {
    if (!this.center.isShip()) return;

    // get sides
    const north = this.neighbors.b;
    const east = this.neighbors.d;
    const south = this.neighbors.f;
    const west = this.neighbors.h;
    if (north.isWater() && east.isWater() && !south.isWater() && west.isWater())
      this.center.setValue(CellValue.north);
    if (north.isWater() && east.isWater() && south.isWater() && !west.isWater())
      this.center.setValue(CellValue.east);
    if (!north.isWater() && east.isWater() && south.isWater() && west.isWater())
      this.center.setValue(CellValue.south);
    if (north.isWater() && !east.isWater() && south.isWater() && west.isWater())
      this.center.setValue(CellValue.west);
    if (north.isWater() && east.isWater() && south.isWater() && west.isWater())
      this.center.setValue(CellValue.single);
    if (
      (north.isWater() && south.isWater()) ||
      (east.isWater() && west.isWater())
    )
      this.center.setValue(CellValue.center);
  }

  setSidesWhenShipHasDirection() {
    if (!this.center.isShip()) return;

    // get sides
    const north = this.neighbors.b;
    const east = this.neighbors.d;
    const south = this.neighbors.f;
    const west = this.neighbors.h;
    switch (this.center.getValue().getSymbol()) {
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

    const corners = this.getCorners();
    corners.forEach((corner) => {
      if (corner != null) {
        corner.setValue(CellValue.water);
      }
    });
  }
}
