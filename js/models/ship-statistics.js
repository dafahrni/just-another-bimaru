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
        this.shipSets.forEach(set => { text += set.toString() + "\n"; });
        return text;
    }

    incrementAmountOfSize(shipSize) {
        let shipSet = this.getSet(shipSize);
        shipSet.incrementAmount();
    }

    resetAmountOfSize(shipSize) {
        let shipSet = getSet(shipSize);
        shipSet.resetAmount();
    }

    getShipSets() {
        return this.shipSets;
    }

    getSet(size) {
        return Arrays.from(this.shipSets).filter(s => s.getSize() == size).findFirst().get();
    }

    getSizeOfBiggestShipToPlace() {
        // TODO: Comparator.comparingInt korrekt implementieren
        Array.sort(shipSets, ShipSet.getSize).reversed();
        Array.from(this.shipSets).forEach(set => { 
            if (set.moreShipsLeft())
                return set.getSize();    
        });
        return -1;
    }

    moreShipsToPlace() {
        return this.getSizeOfBiggestShipToPlace() >= 0;
    }
}
