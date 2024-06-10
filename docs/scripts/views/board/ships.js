import { Broker } from "../../messaging/broker.js";
import { CellLabel } from "../parts/cell-label.js";
import { ShipCell } from "../parts/ship-cell.js";
import { MessageType } from "../../messaging/message-type.js";
export class Ships {
    constructor() {
        this.broker = Broker.get();
        this.labels = {};
        this.editMode = false;
        this.size = -1;
        this.broker.register(MessageType.SizeChanged, (m) => this.init(m));
        this.broker.register(MessageType.ShipChanged, (m) => this.update(m));
    }
    init(message) {
        const sizeChanged = message;
        if (!sizeChanged)
            return;
        this.editMode = sizeChanged.editMode;
        this.size = sizeChanged.size * 0.5;
        const dto = sizeChanged.dto;
        this.setupHtml(dto.statistics, this.size);
    }
    update(message) {
        const shipChanged = message;
        if (!shipChanged)
            return;
        this.updateLabel(shipChanged.dto);
    }
    updateLabel(ship) {
        const key = `${ship.size}`;
        if (key in this.labels) {
            const label = this.labels[key];
            const value = `${ship.currentAmount}/${ship.targetAmount}`;
            label.changeText(value);
        }
    }
    setupHtml(dto, cellSize) {
        const ships = document.getElementById("ships");
        if (!ships)
            throw new Error("Ships node is missing in HTML.");
        // reset data and remove all tiles and labels
        const childrenToRemove = Array.from(ships.children).filter((child) => child.classList.contains("set"));
        childrenToRemove.forEach((child) => ships.removeChild(child));
        for (let row = dto.length - 1; row >= 0; row--) {
            const ship = dto[row];
            if (ship.targetAmount < 1)
                continue;
            const set = document.createElement("div");
            set.classList.add("set");
            this.appendLabel(ship, cellSize, set);
            if (ship.size == 1) {
                this.appendShip('o', cellSize, set);
            }
            else {
                this.appendShip('<', cellSize, set);
                for (let col = 2; col < ship.size; col++) {
                    this.appendShip('□', cellSize, set);
                }
                this.appendShip('>', cellSize, set);
            }
            ships.append(set);
        }
    }
    appendLabel(ship, cellSize, set) {
        const value = `${ship.currentAmount}/${ship.targetAmount}`;
        const label = new CellLabel(cellSize, value);
        set.appendChild(label.getTile());
        const key = `${ship.size}`;
        this.labels[key] = label;
    }
    appendShip(symbol, cellSize, set) {
        const cell = new ShipCell(cellSize, true);
        cell.selectCellType(symbol);
        set.appendChild(cell.getTile());
    }
}
//# sourceMappingURL=ships.js.map