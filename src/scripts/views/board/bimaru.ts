import { ShipCell } from "../parts/ship-cell.js";
import { CellLabel } from "../parts/cell-label.js";
import { Broker } from "../../messaging/broker.js";
import { LabelsDto } from "../../controllers/dtos/labels-dto.js";
import { MessageFactory } from "../../messaging/message-factory.js";
import { MessageType } from "../../messaging/message-type.js";
import { NewGame } from "../../messaging/cmds/new-game.js";

export class Bimaru {
  cells: ShipCell[];
  labels: CellLabel[];
  broker: Broker = Broker.get();
  editMode: boolean;
  boundLabelSelected: any = null;
  boundTileSelected: any = null;

  constructor() {
    this.cells = [];
    this.labels = [];
    this.editMode = false;
    this.broker.register(MessageType.NewGame, (msg: NewGame) => this.init(msg));
  }

  init(msg: NewGame) {
    this.editMode = msg.editMode;

    const size = this.setupHtml(msg.dto.labels);
    this.broker.publish(MessageFactory.sizeChanged(
      msg.dto, 
      msg.editMode, 
      size));
  }

  setupHtml(labels: LabelsDto) {
    const { colLabels, rowLabels } = labels;
    const cols = colLabels.length;
    const rows = rowLabels.length;
    const size = this.calculateCellSize(rows);
    const field: HTMLElement | null = document.getElementById("field");
    if (!field) throw new Error("Field node is missing in HTML.");

    // reset data and remove all tiles and labels
    this.cells.length = 0;
    this.labels.length = 0;
    const childrenToRemove = Array.from(field.children).filter(
      (child) =>
        child.classList.contains("tile") || child.classList.contains("label")
    );
    childrenToRemove.forEach((child) => field.removeChild(child));

    const templateColumns = `repeat(${cols + 1}, 1fr)`;
    field.style.gridTemplateColumns = templateColumns;

    // Remove existing event listeners if they exist
    field.removeEventListener("click", this.boundLabelSelected);
    field.removeEventListener("click", this.boundTileSelected);

    // Bind and store the bound functions
    this.boundLabelSelected = this.labelSelected.bind(this);
    this.boundTileSelected = this.tileSelected.bind(this);

    // Add the new event listeners
    field.addEventListener("click", this.boundLabelSelected);
    field.addEventListener("click", this.boundTileSelected);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = new ShipCell(size);
        field.appendChild(cell.getTile());
        this.cells.push(cell);
      }
      const value = rowLabels[row];
      const label = new CellLabel(size, `${value}`);
      field.appendChild(label.getTile());
      this.labels.push(label); // defines index of row labels
    }

    for (let col = 0; col < cols; col++) {
      const value = colLabels[col];
      const label = new CellLabel(size, `${value}`);
      field.appendChild(label.getTile());
      this.labels.push(label); // defines index of col labels
    }

    return size;
  }

  labelSelected(event: any) {
    const selectedLabel = event.target.closest(".label");
    if (!selectedLabel) {
      return;
    }

    const index = this.labels
      .map((label) => label.getTile())
      .indexOf(selectedLabel);

    // index consists of row labels first and col label second
    // important for code used in GameModel.fillLineWithWater
    this.broker.publish(MessageFactory.labelChanged(index, this.editMode));
  }

  tileSelected(event: any) {
    const selectedTile = event.target.closest(".tile");
    if (!selectedTile) {
      return;
    }

    const index = this.cells
      .map((cell) => cell.getTile())
      .indexOf(selectedTile);

    this.broker.publish(MessageFactory.tileChanged(index, this.editMode));
  }

  getCells() {
    return this.cells;
  }

  getLabels() {
    return this.labels;
  }

  calculateCellSize(rows: number) {
    const vmin = Math.min(window.innerWidth, window.innerHeight);
    const cellSize = (0.9 * vmin) / (rows + 2);
    return Math.round(cellSize);
  }
}
