import { ShipCell } from "./ship-cell.js";
import { CellLabel } from "./cell-label.js";

import { LineDto } from "../models/dtos/line-dto.js";
import { LineState } from "../models/board/parts/cell-line.js";
import { CellDto } from "../models/dtos/cell-dto.js";
import { Broker } from "../models/messaging/broker.js";
import { LabelsDto } from "../models/dtos/labels-dto.js";
import { ChangeCell, MessageType, NewGame } from "../models/messaging/message.js";

export class Bimaru {

  private rows: number;
  private cells: ShipCell[];
  private selectedCell: ShipCell | null;
  private notifySelectionChanged: any;
  private labels: CellLabel[];
  private notifyLabelClick: any;
  private broker: Broker = Broker.get();
  
  constructor() {
    this.rows = -1;
    this.cells = [];
    this.selectedCell = null;
    this.notifySelectionChanged = null;
    this.labels = [];
    this.notifyLabelClick = null;
  }

  init() {
    const message = this.broker.consume(MessageType.NewGame);
    const dto = (message as NewGame)?.dto;
    if (!dto) return;

    this.rows = dto.size.rows;
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

    this.selectedCell = this.cells[index];

    if (this.notifySelectionChanged) {
      this.notifySelectionChanged(index);
    }
  }

  updateSelectedTile() {
    if (this.selectedCell) {
      this.updateCell(this.selectedCell);
    }
  }

  updateAll() {
    this.cells.forEach((cell) => this.updateCell(cell));
    this.selectedCell = null;
  }

  updateCell(shipCell: ShipCell, dto: CellDto | null = null) {
    if (dto === null) {
      const type = ChangeCell;
      const message = this.broker.consume(MessageType.ChangeCell);
      if (message === undefined) {
        console.error(`Message of ${type} is undefined.`);
        return;
      } else {
        dto = (message as ChangeCell).dto;
      }
    }

    const ch = dto.value.symbol;
    const isFix = dto.isFix;
    shipCell.selectCellType(ch);
    shipCell.setFix(isFix);

    const neighbors = dto.block.neighbors;
    neighbors.forEach((value) => {
      const ch = value.symbol;
      const i = value.index;
      const shipCell = this.cells[i];
      shipCell.selectCellType(ch);
    });

    const x = dto.posX;
    const y = dto.posY;
    const rowLabel = this.labels[y];
    const colLabel = this.labels[x + this.rows];
    if (!rowLabel || !colLabel)
      throw new Error("Some error in index calculation!");
    this.updateLineTargetLabel(dto.row, rowLabel);
    this.updateLineTargetLabel(dto.col, colLabel);
  }

  updateLineTargetLabel(dto: LineDto, label: CellLabel) {
    if (dto.state === LineState.isFull) {
      // if line is complete -> mark with '√'
      label.changeText("✔️");
    } else if (dto.state === LineState.isCrowded) {
      // if line has too many ships -> mark with '!'
      label.changeText("❗");
    } else if (dto.state === LineState.hasShipsToPlace) {
      label.changeText(`${dto.targetAmount}`);
    }
  }
}
