import { Broker } from "../../messaging/broker.js";
import { ShipCell } from "../parts/ship-cell.js";
import { ValueConfig } from "./value-config.js";
import { ValueView } from "./value-view.js";

export class ShipSelection extends ValueView {
  broker: Broker = Broker.get();
  cells: ShipCell[];
  selectedCell: ShipCell | null;
  symbol: string;

  constructor(cfg: ValueConfig) {
    super(cfg);
    this.cells = [];
    this.selectedCell = null;
    this.symbol = "~";
    const size = 50;
    this.extendHtml(size);
    this.registerForValueChanges((i: number) => this.mapIndex(i));
    this.changeTile(0);
  }

  get selectedSymbol(): string {
    return this.symbol;
  }

  extendHtml(cellSize: number) {
    const selection = document.getElementById("ship-selection");
    if (!selection)
      throw new Error("Node 'ship-selection' is missing in HTML.");

    const gap = document.createElement("br");
    selection.append(gap);

    const ships = document.createElement("div");
    ships.classList.add("ships");

    ships.append(this.createLine("~ ^ □", cellSize));
    ships.append(this.createLine("< ~ >", cellSize));
    ships.append(this.createLine("o v .", cellSize));

    ships.addEventListener("click", this.tileSelected.bind(this));

    selection.append(ships);
  }

  tileSelected(event: any) {
    const selectedTile = event.target.closest(".tile");
    if (!selectedTile) {
      return;
    }

    const index: number = this.cells
      .map((cell) => cell.getTile())
      .indexOf(selectedTile);

    this.changeTile(index);
  }

  mapIndex(index: number) {
    const map = "01258763";
    if (index >= 0 && index < map.length) {
      const mappedIndex = Number(map[index]);
      this.changeTile(mappedIndex);
    }
  }

  mapInverse(index: number) {
    const map = "0127_3654";
    if (index !== 4 && index >= 0 && index < map.length) {
      const mappedIndex = Number(map[index]);
      return mappedIndex;
    }
    return 0;
  }

  changeTile(index: number) {
    // un-select
    if (this.selectedCell) this.selectedCell.selectCell(false);

    if (index === 4) return; // ignore center cell for selection

    const cell = this.cells[index];
    this.selectedValue = this.mapInverse(index);

    // select
    this.selectedCell = cell;
    cell.selectCell(true);

    // change center
    this.symbol = cell.selectedCellType;
    const center = this.cells[4];
    center.selectCellType(this.symbol);
  }

  createLine(symbols: string, cellSize: number) {
    const line = document.createElement("div");
    line.classList.add("set");
    symbols.split(" ").forEach((ch) => this.appendShip(ch, cellSize, line));
    return line;
  }

  appendShip(symbol: string, cellSize: number, set: HTMLElement) {
    const cell = new ShipCell(cellSize, true);
    cell.selectCellType(symbol);
    set.appendChild(cell.getTile());
    this.cells.push(cell);
  }
}
