export class RestorePoint {

    RestorePoint(fieldText, slotsLeft, shipSizeToPlace) {
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
