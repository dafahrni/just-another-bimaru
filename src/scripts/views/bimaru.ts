import { ShipCell } from "./ship-cell.js";
import { CellLabel } from "./cell-label.js";

import { Broker } from "../models/messaging/broker.js";
import { LabelsDto } from "../models/dtos/labels-dto.js";
import { MessageType, NewGame } from "../models/messaging/message.js";

export class Bimaru {

  private cells: ShipCell[];
  private notifySelectionChanged: any;
  private labels: CellLabel[];
  private notifyLabelClick: any;
  private broker: Broker = Broker.get();
  
  constructor() {
    this.cells = [];
    this.notifySelectionChanged = null;
    this.labels = [];
    this.notifyLabelClick = null;
  }

  init() {
    const message = this.broker.consume(MessageType.NewGame);
    const dto = (message as NewGame)?.dto;
    if (!dto) return;

    this.setupHtml(dto.labels);
  }

  bindLabelClick(handler: any) {
    this.notifyLabelClick = handler;
  }

  bindSelectionChanged(handler: any) {
    this.notifySelectionChanged = handler;
  }

  setupHtml(label: LabelsDto) {
    const { colLabels, rowLabels } = label;
    const cols = colLabels.length;
    const rows = rowLabels.length;
    const grid: HTMLElement | null = document.getElementById("root");
    if (!grid) throw new Error("Root node is missing in HTML.");

    // reset data and remove all tiles and labels
    this.cells.length = 0;
    this.labels.length = 0;
    const childrenToRemove = Array
      .from(grid.children)
      .filter(child =>
        child.classList.contains("tile") || 
        child.classList.contains("label")
      );
    childrenToRemove.forEach(child => grid.removeChild(child));

    const templateColumns = `repeat(${cols + 1}, 1fr)`;
    grid.style.gridTemplateColumns = templateColumns;
    grid.addEventListener("click", this.labelSelected.bind(this));
    grid.addEventListener("click", this.tileSelected.bind(this));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = new ShipCell();
        grid.appendChild(cell.getTile());
        this.cells.push(cell);
      }
      const shipCount = rowLabels[row];
      const label = new CellLabel(shipCount);
      grid.appendChild(label.getTile());
      this.labels.push(label); // defines index of row labels
    }

    for (let col = 0; col < cols; col++) {
      const shipCount = colLabels[col];
      const label = new CellLabel(shipCount);
      grid.appendChild(label.getTile());
      this.labels.push(label); // defines index of col labels
    }
  }

  labelSelected(event: any) {
    const selectedLabel = event.target.closest(".label");
    if (!selectedLabel) {
      return;
    }

    const index = this.labels
      .map(label => label.getTile())
      .indexOf(selectedLabel);

    if (this.notifyLabelClick) {
      // index consists of row labels first and col label second
      // important for code used in GameModel.fillLineWithWater
      this.notifyLabelClick(index);
    }
  }

  tileSelected(event: any) {
    const selectedTile = event.target.closest(".tile");
    if (!selectedTile) {
      return;
    }

    const index = this.cells
      .map(cell => cell.getTile())
      .indexOf(selectedTile);

    if (this.notifySelectionChanged) {
      this.notifySelectionChanged(index);
    }
  }

  getCells() {
    return this.cells;
  }

  getLabels() {
    return this.labels;
  }
}
