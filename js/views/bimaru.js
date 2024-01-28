import { ShipCell } from "./ship-cell.js";
import { CellLabel } from "./cell-label.js";

export class Bimaru {
  constructor(model) {
    this.model = model;
    this.tiles = [];
    this.selectedTile = null;
    this.notifySelectionChanged = null;
    this.setupHtml(model.rows, model.cols);
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
    grid.addEventListener("click", this.tileSelected.bind(this));

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const tile = new ShipCell().tile;
        grid.appendChild(tile);
        this.tiles.push(tile);
      }
      const shipCount = this.model.rowLabels[row];
      const label = new CellLabel(shipCount).tile;
      grid.appendChild(label);
    }

    for (let col = 0; col < cols; col++) {
      const shipCount = this.model.colLabels[col];
      const label = new CellLabel(shipCount).tile;
      grid.appendChild(label);
    }
  }

  tileSelected(event) {
    const selectedTile = event.target.closest(".tile");
    if (!selectedTile) {
      return;
    }

    this.selectedTile = selectedTile;

    if (this.notifySelectionChanged) {
      const index = this.tiles.indexOf(this.selectedTile);
      this.notifySelectionChanged(index);
    }
  }

  update(tile) {
    const index = this.tiles.indexOf(tile);
    const value = this.model.readCell(index);
    //const svg = this.generateSvg(value);
    //tile.replaceChild(svg, tile.firstChild);
  }
}
