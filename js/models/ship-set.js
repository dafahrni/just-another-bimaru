export class ShipSet {
  constructor(shipSize, shipAmount) {
    this.size = shipSize;
    this.targetAmount = shipAmount;
    this.currentAmount = 0;
  }

  static parse(text) {
    let shipInfos = text.split(",");
    let ships = new ShipSet[shipInfos.length]();
    for (let i = 0; i < shipInfos.length; i++) {
      let splits = shipInfos[i].split("\\|");
      let shipSize = Integer.parseInt(splits[0]);
      let shipAmount = Integer.parseInt(splits[1]);
      ships[i] = new ShipSet(shipSize, shipAmount);
    }
    return ships;
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

  noMoreShipsLeft() {
    return shipsLeft() <= 0;
  }

  incrementAmount() {
    if (this.currentAmount < this.targetAmount) {
      this.currentAmount++;
    }
    // TODO probably un-comment the following line
    // throw new Exception("amount cannot be increased");
  }

  resetAmount() {
    this.currentAmount = 0;
  }

  asText() {
    return `size ${this.size} ship: ${this.getCurrentAmount()} pcs.`;
  }
}
