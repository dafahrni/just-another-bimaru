import { ShipSet } from "./parts/ship-set.js";

export class ShipStatistics {

  static createDefault() {
    return new ShipStatistics();
  }

  constructor(shipSets) {
    this.init(shipSets)
  }

  init(shipSets) {
    this.shipSets = shipSets
      ? shipSets
      : ShipSet.parse("1|4,2|3,3|2,4|1");
  }

  getAmount(shipSize) {
    let shipSet = this.getSet(shipSize);
    return shipSet.getCurrentAmount();
  }

  asText() {
    let text = "";
    this.shipSets.forEach((set) => {
      text += set.toString() + "\n";
    });
    return text;
  }

  incrementAmountOfSize(shipSize) {
    let shipSet = this.getSet(shipSize);
    shipSet.incrementAmount();
  }

  resetAmountOfSize(shipSize) {
    let shipSet = this.getSet(shipSize);
    shipSet.resetAmount();
  }

  getShipSets() {
    return this.shipSets;
  }

  getSet(size) {
    return this.shipSets.filter((shipSet) => shipSet.getSize() == size)[0];
  }

  moreShipsToPlace() {
    const moreShipsToPlace = this.getSizeOfBiggestShipToPlace() > 0;
    return moreShipsToPlace;
  }

  getSizeOfBiggestShipToPlace() {
    this.shipSets.sort(set => set.getSize()).reverse();
    for (let i = 0; i < this.shipSets.length; i++) {
      const set = this.shipSets[i];
      if (set.moreShipsLeft()) {
        return set.getSize();
      }
    }
    return 0;
  }

  update(field) {
    // this only works for default ShipStatus objects (i.e. 1:4, 2:3, 3:2, 4:1)
    // TODO make this work for any kind of ShipStatus (e.g. 2:1, 3-6:2, 7:1)
    this.resetAmountOfSize(1);
    this.resetAmountOfSize(2);
    this.resetAmountOfSize(3);
    this.resetAmountOfSize(4);

    const cells = field.getCells();
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (cell.asSymbol() == "o") {
        this.incrementAmountOfSize(1);
      } else if (
        field.symbolsToTheEastAre(cell, "<>") ||
        field.symbolsToTheSouthAre(cell, "^v")
      ) {
        this.incrementAmountOfSize(2);
      } else if (
        field.symbolsToTheEastAre(cell, "<□>") ||
        field.symbolsToTheSouthAre(cell, "^□v")
      ) {
        this.incrementAmountOfSize(3);
      } else if (
        field.symbolsToTheEastAre(cell, "<□□>") ||
        field.symbolsToTheSouthAre(cell, "^□□v")
      ) {
        this.incrementAmountOfSize(4);
      }
    }
  }
}
