export class ShipSet {

  static parse(text) {
    let shipInfos = Array.from(text.split(","));
    let shipSets = [];
    for (let i = 0; i < shipInfos.length; i++) {
      let splits = shipInfos[i].split("|");
      let shipSize = parseInt(splits[0]);
      let shipAmount = parseInt(splits[1]);
      shipSets.push(new ShipSet(shipSize, shipAmount));
    }
    return shipSets;
  }

  constructor(shipSize, shipAmount) {
    this.size = shipSize;
    this.targetAmount = shipAmount;
    this.currentAmount = 0;
  }
  
  getSize() {
    return this.size;
  }

  getTargetAmount() {
    return this.targetAmount;
  }

  getCurrentAmount() {
    return this.currentAmount;
  }

  shipsLeft() {
    return this.targetAmount - this.currentAmount;
  }

  moreShipsLeft() {
    return this.shipsLeft() > 0;
  }

  incrementAmount() {
    this.currentAmount++;

    if (this.currentAmount > this.targetAmount)
      console.warn("Current amount exceeds target amount.");
  }

  resetAmount() {
    this.currentAmount = 0;
  }

  asText() {
    return `size ${this.size} ship: ${this.getCurrentAmount()} pcs.`;
  }
}
