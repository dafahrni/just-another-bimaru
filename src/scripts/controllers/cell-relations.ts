import { Cell } from "../models/board/parts/cell.js";
import { LineState } from "../models/board/parts/cell-line.js";
import { DtoFactory } from "../models/dtos/dto-factory.js";
import { LineDto } from "../models/dtos/line-dto.js";
import { GameModel } from "../models/game-model.js";
import { CellLabel } from "../views/cell-label.js";
import { GameView } from "../views/game-view.js";
import { ShipCell } from "../views/ship-cell.js";

export class CellRelations {

  private rows: number;
  private models: Cell[];
  private cells: ShipCell[];
  private labels: CellLabel[];

  constructor(model: GameModel, view: GameView) {
    this.rows = model.rows;
    this.models = model.getCells();
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

    const model: Cell = this.models[i];
    const cell: ShipCell = this.cells[i];
    const dto = DtoFactory.mapCell(model);

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
