import { ShipCell } from "./ship-cell.js";
import { CellLabel } from "./cell-label.js";
import { Cell } from "../models/cell.js";

export class Bimaru {
  constructor(model) {
    this.model = model;
    this.cells = [];
    this.tiles = [];
    this.selectedTile = null;
    this.notifySelectionChanged = null;
    this.labels = [];
    this.notifyLabelClick = null;
    this.setupHtml(model.rows, model.cols);
  }

  bindLabelClick(handler) {
    this.notifyLabelClick = handler;
  }

  bindSelectionChanged(handler) {
    this.notifySelectionChanged = handler;
  }

  updateSelectedTile() {
    if (this.selectedTile) {
      this.update(this.selectedTile);
    }
  }

  updateAll() {
    this.tiles.forEach((tile) => this.update(tile));
    this.selectedTile = null;
  }

  setupHtml(rows, cols) {
    const grid = document.getElementById("root");
    const templateColumns = `repeat(${cols + 1}, 1fr)`;
    grid.style.gridTemplateColumns = templateColumns;
    grid.addEventListener("click", this.labelSelected.bind(this));
    grid.addEventListener("click", this.tileSelected.bind(this));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = new ShipCell();
        grid.appendChild(cell.tile);
        this.tiles.push(cell.tile);
        this.cells.push(cell);
      }
      const shipCount = this.model.rowLabels[row];
      const label = new CellLabel(shipCount);
      grid.appendChild(label.tile);
      this.labels.push(label.tile); // defines index of row labels
    }

    for (let col = 0; col < cols; col++) {
      const shipCount = this.model.colLabels[col];
      const label = new CellLabel(shipCount);
      grid.appendChild(label.tile);
      this.labels.push(label.tile); // defines index of col labels
    }
  }

  labelSelected(event) {
    const selectedLabel = event.target.closest(".label");
    if (!selectedLabel) {
      return;
    }

    if (this.notifyLabelClick) {
      // index consists of row labels first and col label second
      // important for code used in GameModel.fillLineWithWater
      const index = this.labels.indexOf(selectedLabel);
      this.notifyLabelClick(index);
    }
  }

  tileSelected(event) {
    const selectedTile = event.target.closest(".tile");
    if (!selectedTile) {
      return;
    }

    this.selectedTile = selectedTile;

    if (this.notifySelectionChanged) {
      const index = this.tiles.indexOf(selectedTile);
      this.notifySelectionChanged(index);
    }
  }

  update(tile) {
    const index = this.tiles.indexOf(tile);

    // read cell from model
    const cell = this.model.readCell(index);
    const ch = cell.asSymbol();
    const isFix = cell.getIsFix();

    // write cell to view
    const shipCell = this.cells[index];
    if (!(shipCell instanceof ShipCell))
      throw new Error("Instance must be of type 'ShipCell'!");
    shipCell.selectCellType(ch);
    shipCell.setFix(isFix);

    // read neighbors from model
    const block = cell.getBlock();
    const neighbors = block
      .getNeighborCells()
      .filter((cell) => cell.asSymbol() != "x")
      .map((cell) => {
        if (!(cell instanceof Cell))
          throw new Error("Instance must be of type 'Cell'!");
        const index = cell.getIndex();
        const ch = cell.asSymbol();
        return [index, ch];
      });

    // write neighbors to view
    neighbors.forEach((data) => {
      const index = data[0];
      const ch = data[1];
      const shipCell = this.cells[index];
      if (!(shipCell instanceof ShipCell))
        throw new Error("Instance must be of type 'ShipCell'!");
      shipCell.selectCellType(ch);
    });
  }
}
