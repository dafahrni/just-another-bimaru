
export interface IShipSet {
  size: number;
  targetAmount: number;
}

export class ShipSetEntity implements IShipSet {
  size: number;
  targetAmount: number;

  constructor(size: number, targetAmount: number) {
    this.size = size;
    this.targetAmount = targetAmount;
  }
}
