import { Slot } from "../board/parts/slot.js";

export class RestorePoint {

    private fieldText: string;
    private slotsLeft: Slot[];
    private shipSizeToPlace: number;

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
