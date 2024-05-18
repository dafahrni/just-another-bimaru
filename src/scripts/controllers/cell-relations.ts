import { LineState } from "../models/board/parts/cell-line.js";
import { LineDto } from "./dtos/line-dto.js";
import { GameApi } from "./game-api.js";
import { CellLabel } from "../views/cell-label.js";
import { GameView } from "../views/game-view.js";
import { ShipCell } from "../views/ship-cell.js";

export class CellRelations {

  private model: GameApi;
  private cells: ShipCell[];
  private labels: CellLabel[];

  constructor(model: GameApi, view: GameView) {
    this.model = model;
    this.cells = view.getCells();
    this.labels = view.getLabels();
  }

  updateAll() {
    for (let i = 0; i < this.cells.length; i++) {
        this.updateCell(i);   
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
        console.warn(`Neighbor with symbol '${ch}' and index '${i}' was ignorred`);
      } else {
        const cell: ShipCell = this.cells[i];
        cell.selectCellType(ch);  
      }
    });

    // update labels
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
