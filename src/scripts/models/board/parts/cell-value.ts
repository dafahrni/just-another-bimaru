export class CellValue {
  
  private symbol: string;
  private name: string;

  static get empty() { return new CellValue(".", "empty"); }
  static get water() { return new CellValue("~", "water"); }
  static get center() { return new CellValue("□", "center"); }
  static get north() { return new CellValue("^", "north"); }
  static get east() { return new CellValue(">", "east"); }
  static get south() { return new CellValue("v", "south"); }
  static get west() { return new CellValue("<", "west"); }
  static get single() { return new CellValue("o", "single"); }
  static get ship() { return new CellValue("s", "ship"); }
  static get outer() { return new CellValue("x", "outer"); }

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
      CellValue.outer,
    ];
  }
  
  static from(symbol: string) {
    const validSymbols = CellValue.all.map((v) => v.getSymbol());
    if (!validSymbols.includes(symbol)) 
      throw new Error(`Symbol ${symbol} is invalid.`);

    const values = CellValue.all.filter((v) => v.getSymbol() === symbol);
    if (!values || values.length != 1)
      throw new Error("Exactly 1 value must alway be found here.");

    const value = values[0];
    if (!value) 
      throw new Error("Value must be defined here.");

    return value;
  }

  constructor(symbol: string, name: string) {
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
      this.name != CellValue.empty.name &&
      this.name != CellValue.water.name &&
      this.name != CellValue.outer.name
    );
  }

  isPredefinedCellCandidate() {
    return (
      this.name != CellValue.empty.name &&
      this.name != CellValue.outer.name
    );
  }

  isEmpty() {
    return this.name == CellValue.empty.name;
  }

  isWater() {
    return (
      this.name == CellValue.water.name ||
      this.name == CellValue.outer.name
    );
  }

  isSameAs(value: CellValue) {
    return this.name == value.name;
  }

  asText() {
    return `${this.symbol}`;
  }

  toString() {
    return this.asText();
  }
}
