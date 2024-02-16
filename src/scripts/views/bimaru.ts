import { ShipCell } from "./ship-cell.js";
import { CellLabel } from "./cell-label.js";

// TODO: avoid dependency on models, maybe use DTOs 
import { Cell } from "../models/board/parts/cell.js";
import { GameModel } from "../models/game-model.js";
import { LineState } from "../models/board/parts/cell-line.js";

export class Bimaru {

  private model: GameModel;
  private cells: ShipCell[];
  private selectedCell: ShipCell | null;
  private notifySelectionChanged: any;
  private labels: CellLabel[];
  private notifyLabelClick: any;
  
  constructor(model: GameModel) {
    this.model = model;
    this.cells = [];
    this.selectedCell = null;
    this.notifySelectionChanged = null;
    this.labels = [];
    this.notifyLabelClick = null;
    this.setupHtml(model.rows, model.cols);
  }

  bindLabelClick(handler: any) {
    this.notifyLabelClick = handler;
  }

  bindSelectionChanged(handler: any) {
    this.notifySelectionChanged = handler;
  }

  updateSelectedTile() {
    if (this.selectedCell) {
      this.update(this.selectedCell);
    }
  }

  updateAll() {
    this.cells.forEach((cell) => this.update(cell));
    this.selectedCell = null;
  }

  setupHtml(rows: number, cols: number) {
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
      const shipCount = this.model.rowLabels[row];
      const label = new CellLabel(shipCount);
      grid.appendChild(label.getTile());
      this.labels.push(label); // defines index of row labels
    }

    for (let col = 0; col < cols; col++) {
      const shipCount = this.model.colLabels[col];
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

  update(shipCell: ShipCell) {
    // TODO: analyse and move interactions between view and its model to controller (!!)
    const index = this.cells.indexOf(shipCell);

    // read cell from model
    const cell = this.model.getCell(index);
    const ch = cell.asSymbol();
    const isFix = cell.getIsFix();

    // write cell to view
    shipCell.selectCellType(ch);
    shipCell.setFix(isFix);

    // read neighbors from model
    const block = cell.getBlock();
    const neighbors = block
      .getNeighborCells()
      .filter((cell: Cell) => cell.asSymbol() != "x")
      .map((cell: Cell) => {
        if (!(cell instanceof Cell))
          throw new Error("Instance must be of type 'Cell'!");
        const i = cell.getIndex();
        const ch = cell.asSymbol();
        return [i, ch];
      });

    // write neighbors to view
    neighbors.forEach((data: any[]) => {
      const i = data[0];
      const ch = data[1];
      const shipCell = this.cells[i];
      shipCell.selectCellType(ch);
    });

    const row = cell.getRow();
    const col = cell.getCol();
    const pos = cell.getPos();
    const x = pos.getX();
    const y = pos.getY();
    const sizeY = col.size;
    const rowLabel = this.labels[y];
    const colLabel = this.labels[x + sizeY];
    if (!rowLabel || !colLabel)
      throw new Error("Some error in index calculation!");
    this.updateLineTargetLabel(row.getTargetAmount(), row.state, rowLabel);
    this.updateLineTargetLabel(col.getTargetAmount(), col.state, colLabel);
  }

  updateLineTargetLabel(amount: number, state: LineState, label: CellLabel) {
    if (state === LineState.isFull) {
      // if line is complete -> mark with '√'
      label.changeText("✔️");
    } else if (state === LineState.isCrowded) {
      // if line has too many ships -> mark with '!'
      label.changeText("⚠️");
    } else if (state === LineState.hasShipsToPlace) {
      label.changeText(`${amount}`);
    }
  }
}
