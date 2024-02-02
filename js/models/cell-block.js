import { CellValue } from "./cell-value.js";
import { Cell } from "./cell.js";

export class CellBlock {
  constructor(center, field) {
    this.center = center;
    this.north = center.getNorth(field);
    this.east = center.getEast(field);
    this.south = center.getSouth(field);
    this.west = center.getWest(field);
    this.field = field;
  }

  setCornersToWater() {
    if (!this.center.isShip()) return;

    this.center.getCorners(field).forEach((corner) => {
      if (corner != null) {
        corner.setValue(CellValue.water);
      }
    });
  }

  setCenterWhenShipHasDirection() {
    if (!center.isShip()) return;

    if (this.north.isWater() && this.east.isWater() && !this.south.isWater() && this.west.isWater())
      center.setValue("^");
    if (this.north.isWater() && this.east.isWater() && this.south.isWater() && !this.west.isWater())
      center.setValue(">");
    if (!this.north.isWater() && this.east.isWater() && this.south.isWater() && this.west.isWater())
      center.setValue("v");
    if (this.north.isWater() && !this.east.isWater() && this.south.isWater() && this.west.isWater())
      center.setValue("<");
    if (this.north.isWater() && this.east.isWater() && this.south.isWater() && this.west.isWater())
      center.setValue("o");
    if ((this.east.isShip() && this.west.isShip()) || (this.north.isShip() && this.south.isShip()))
      center.setValue("□");
  }

  setSidesWhenShipHasDirection() {
    if (!center.isShip()) return;

    switch (center.getValue().getSymbol()) {
      case "□":
        if (north.isWater() || south.isWater()) {
          center.setNorth(field, CellValue.water);
          center.setEast(field, CellValue.ship);
          center.setSouth(field, CellValue.water);
          center.setWest(field, CellValue.ship);
          break;
        }
        if (west.isWater() || east.isWater()) {
          center.setNorth(field, CellValue.ship);
          center.setEast(field, CellValue.water);
          center.setSouth(field, CellValue.ship);
          center.setWest(field, CellValue.water);
        }
        break;
      case "^":
        center.setNorth(field, CellValue.water);
        center.setEast(field, CellValue.water);
        center.setSouth(field, CellValue.ship);
        center.setWest(field, CellValue.water);
        break;
      case ">":
        center.setNorth(field, CellValue.water);
        center.setEast(field, CellValue.water);
        center.setSouth(field, CellValue.water);
        center.setWest(field, CellValue.ship);
        break;
      case "v":
        center.setNorth(field, CellValue.ship);
        center.setEast(field, CellValue.water);
        center.setSouth(field, CellValue.water);
        center.setWest(field, CellValue.water);
        break;
      case "<":
        center.setNorth(field, CellValue.water);
        center.setEast(field, CellValue.ship);
        center.setSouth(field, CellValue.water);
        center.setWest(field, CellValue.water);
        break;
      case "o":
        center.setNorth(field, CellValue.water);
        center.setEast(field, CellValue.water);
        center.setSouth(field, CellValue.water);
        center.setWest(field, CellValue.water);
        break;
    }
  }

  symbolsToTheEastAre(symbols) {
    let easternSymbols = this.symbolsToTheEast(symbols.length());
    return easternSymbols.equals(symbols);
  }

  symbolsToTheSouthAre(symbols) {
    let southernSymbols = this.symbolsToTheSouth(symbols.length());
    return southernSymbols.equals(symbols);
  }

  symbolsToTheEast(quantity) {
    let cell = this.center;
    let symbols = "" + cell.asSymbol();
    for (let i = 0; i < quantity - 1; i++) {
      cell = cell.getEast(field);
      symbols += cell.asSymbol();
    }
    return symbols;
  }

  symbolsToTheSouth(iquantity) {
    let cell = center;
    let symbols = "" + cell.asSymbol();
    for (let i = 0; i < quantity - 1; i++) {
      cell = cell.getSouth(field);
      symbols += cell.asSymbol();
    }
    return symbols;
  }
}
