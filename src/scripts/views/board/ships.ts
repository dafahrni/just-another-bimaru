import { Broker } from "../../messaging/broker.js";
import { ShipSetDto } from "../../controllers/dtos/ship-set-dto.js";
import { CellLabel } from "../parts/cell-label.js";
import { ShipCell } from "../parts/ship-cell.js";
import { Message, MessageType, ShipChanged, SizeChanged } from "../../messaging/message.js";

export class Ships {
  broker: Broker = Broker.get();
  labels: { [key: string]: CellLabel };
  editMode: boolean;
  size: number;

  constructor() {
    this.labels = {};
    this.editMode = false;
    this.size = -1;
    this.broker.register(MessageType.SizeChanged, (m) => this.init(m));
    this.broker.register(MessageType.ShipChanged, (m) => this.update(m));
  }

  init(message: Message) {
    const sizeChanged = message as SizeChanged;
    if (!sizeChanged) return;
    
    this.editMode = sizeChanged.editMode;
    this.size = sizeChanged.size * 0.5;
    const dto = sizeChanged.dto;

    this.setupHtml(dto.statistics, this.size);
  }

  update(message: Message) {
    const shipChanged = message as ShipChanged;
    if (!shipChanged) return;
    
    this.updateLabel(shipChanged.dto);
  }

  updateLabel(ship: ShipSetDto) {
    const key = `${ship.size}`;
    if (key in this.labels) {
      const label = this.labels[key];
      const value = `${ship.currentAmount}/${ship.targetAmount}`;
      label.changeText(value);
    } 
  }

  setupHtml(dto: ShipSetDto[], size: number) {
    const ships: HTMLElement | null = document.getElementById("ships");
    if (!ships) throw new Error("Ships node is missing in HTML.");

    // reset data and remove all tiles and labels
    const childrenToRemove = Array.from(ships.children).filter(
      (child) =>
        child.classList.contains("set")
    );
    childrenToRemove.forEach((child) => ships.removeChild(child));
  
    for (let row = dto.length - 1; row >= 0; row--) {
      const ship = dto[row];
      if (ship.targetAmount < 1) continue;
      const set = document.createElement("div");
      set.classList.add("set");
      const value = `${ship.currentAmount}/${ship.targetAmount}`;
      const label = new CellLabel(size, value);
      set.appendChild(label.getTile());
      const key = `${ship.size}`;
      this.labels[key] = label;
      if (ship.size == 1) {
        const cell = new ShipCell(size);
        cell.selectCellType('o');
        set.appendChild(cell.getTile());
      } else  {
        let cell = new ShipCell(size);
        cell.selectCellType('<');
        set.appendChild(cell.getTile());
        for (let col = 2; col < ship.size; col++) {
          cell = new ShipCell(size);
          cell.selectCellType('□');        
          set.appendChild(cell.getTile());
        }
        cell = new ShipCell(size);
        cell.selectCellType('>');
        set.appendChild(cell.getTile());
      }
      ships.append(set);
    }
  }

  createShip(dto: ShipSetDto) {

  }
}
