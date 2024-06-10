export class RestorePoint {
    constructor(fieldText, slotsLeft, shipSizeToPlace) {
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
//# sourceMappingURL=restore-point.js.map