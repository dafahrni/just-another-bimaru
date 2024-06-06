import { LineState } from "../models/parts/cell-line.js";
import { LineDto } from "./dtos/line-dto.js";
import { CellDto } from "./dtos/cell-dto.js";
import { GameApi } from "./game-api.js";
import { GameView } from "../views/game-view.js";
import { ShipCell } from "../views/parts/ship-cell.js";
import { CellLabel } from "../views/parts/cell-label.js";

export class CellRelations {
  model: GameApi;
  cells: ShipCell[];
  labels: CellLabel[];
  editMode: boolean = false;

  constructor(model: GameApi, view: GameView) {
    this.model = model;
    this.cells = view.getCells();
    this.labels = view.getLabels();
  }

  updateAll(editMode: boolean) {
    this.editMode = editMode;
    if (this.editMode) this.updateLabels();

    for (let i = 0; i < this.cells.length; i++) this.updateCell(i);
  }

  updateLabels() {
    const dto = this.model.getLabels();
    const rows = dto.rowLabels.length;
    for (let i = 0; i < this.labels.length; i++) {
      const targetAmount =
        i < rows ? dto.rowLabels[i] : dto.colLabels[i - rows];
      this.labels[i].changeText(`${targetAmount}`);
    }
  }

  updateCell(i: number) {
    if (i < 0) {
      console.warn(`Cell with index '${i}' was ignorred`);
      return;
    }

    const cell: ShipCell = this.cells[i];
    const dto = this.model.getCell(i);

    // update cell
    const ch = dto.value.symbol;
    const isFix = dto.isFix;
    cell.selectCellType(ch);
    cell.setFix(isFix);

    // update neighbors
    const neighbors = dto.block.neighbors;
    neighbors.forEach((value) => {
      const ch = value.symbol;
      const i = value.index;
      if (i < 0) {
        console.warn(
          `Neighbor with symbol '${ch}' and index '${i}' was ignorred`
        );
      } else {
        const cell: ShipCell = this.cells[i];
        cell.selectCellType(ch);
      }
    });

    this.updateLabelsOfCell(dto);
  }

  updateLabelsOfCell(dto: CellDto) {
    if (this.editMode) return;

    const x = dto.posX;
    const y = dto.posY;
    const rows = dto.col.values.length;
    const rowLabel = this.labels[y];
    const colLabel = this.labels[x + rows];
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
