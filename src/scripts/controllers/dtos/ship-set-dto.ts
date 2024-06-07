export class ShipSetDto {
  size!: number;
  targetAmount!: number;
  currentAmount!: number;

  constructor(size: number, targetAmount: number, currentAmount: number) {
    this.size = size;
    this.targetAmount = targetAmount;
    this.currentAmount = currentAmount;
  }
}
