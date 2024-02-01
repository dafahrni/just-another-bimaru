export class CellValue {
  static get empty() {
    return new CellValue(".", "empty");
  }
  static get water() {
    return new CellValue("~", "water");
  }
  static get center() {
    return new CellValue("□", "center");
  }
  static get north() {
    return new CellValue("^", "north");
  }
  static get east() {
    return new CellValue(">", "east");
  }
  static get south() {
    return new CellValue("v", "south");
  }
  static get west() {
    return new CellValue("<", "west");
  }
  static get single() {
    return new CellValue("o", "single");
  }
  static get ship() {
    return new CellValue("s", "ship");
  }
  static get outer() {
    return new CellValue("x", "outer");
  }

  static get all() {
    return [
      CellValue.empty,
      CellValue.water,
      CellValue.center,
      CellValue.north,
      CellValue.east,
      CellValue.south,
      CellValue.west,
      CellValue.single,
      CellValue.ship,
    ];
  }

  constructor(symbol, name) {
    this.symbol = symbol;
    this.name = name;
  }

  getSymbol() {
    return this.symbol;
  }

  getName() {
    return this.name;
  }

  isShip() {
    return (
      this.name != empty.name &&
      this.name != water.name &&
      this.name != outer.name
    );
  }

  isEmpty() {
    return this.name == empty.name;
  }

  isWater() {
    return this.name == water.name || this.name == outer.name;
  }

  isSameAs(value) {
    return this.name == value.name;
  }

  asText() {
    return `$(getSymbol())`;
  }
}
