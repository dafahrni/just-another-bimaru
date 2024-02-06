import { ShipSet } from "./ship-set.js";

export class ShipStatistics {
  static createDefault() {
    return new ShipStatistics(ShipSet.parse("1|4,2|3,3|2,4|1"));
  }

  constructor(shipSets) {
    this.shipSets = shipSets;
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

  getSizeOfBiggestShipToPlace() {
    this.shipSets.sort(set => set.getSize()).reverse();
    for (let i = 0; i < this.shipSets.length; i++) {
      const set = this.shipSets[i];
      if (set.moreShipsLeft()) {
        return set.getSize();
      }
    }
    return -1;
  }

  moreShipsToPlace() {
    return this.getSizeOfBiggestShipToPlace() >= 0;
  }

  update(field) {
    // this only works for default ShipStatus objects (i.e. 1:4, 2:3, 3:2, 4:1)
    // TODO make this work for any kind of ShipStatus (e.g. 2:1, 3-6:2, 7:1)
    this.resetAmountOfSize(1);
    this.resetAmountOfSize(2);
    this.resetAmountOfSize(3);
    this.resetAmountOfSize(4);

    Array.from(field.getCells()).forEach((cell) => {
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
      } else {
        // do nothing
      }
    });
  }
}
