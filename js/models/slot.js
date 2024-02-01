export class Slot {

    constructor(cells) {
        this.cells = cells;
    }

    size() {
        return this.cells.length;
    }

    getCells() {
        return this.cells;
    }

    split(shipSize) {
        var count = this.size() - shipSize + 1;
        if (count < 1)
            return new Slot[0];

        if (count == 1)
            return Array.from(this.cells).forEach(cell => new Slot(cell));

        var slots = [];
        for (let i = 0; i < count; i++) {
            let before = i - 1;
            if (before >= 0 && this.cells[before].isShip())
                continue;
            let after = i + shipSize;
            if (after < size() && this.cells[after].isShip())
                continue;
            var subCells = Arrays.from(this.cells)
                    .skip(i)
                    .limit(shipSize);
            slots.add(new Slot(subCells));
        }
        return Array.from(slots);
    }
}