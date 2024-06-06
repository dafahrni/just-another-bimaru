import { Slot } from "../parts/slot.js";

export class RestorePoint {
  fieldText: string;
  slotsLeft: Slot[];
  shipSizeToPlace: number;

  constructor(fieldText: string, slotsLeft: Slot[], shipSizeToPlace: number) {
    this.fieldText = fieldText;
    this.slotsLeft = slotsLeft;
    this.shipSizeToPlace = shipSizeToPlace;
  }

  getFieldText() {
    return this.fieldText;
  }

  getSlotsLeft() {
    return this.slotsLeft;
  }

  getShipSizeToPlace() {
    return this.shipSizeToPlace;
  }
}
