import { Cell } from "../../models/parts/cell.js";
import { CellBlock } from "../../models/parts/cell-block.js";
import { CellLine } from "../../models/parts/cell-line.js";
import { BlockDto } from "./block-dto.js";
import { LineDto } from "./line-dto.js";
import { ValueDto } from "./value-dto.js";
import { CellDto } from "./cell-dto.js";
import { GameDto } from "./game-dto.js";
import { LabelsDto } from "./labels-dto.js";
import { Labels } from "../../models/parts/labels.js";
import { SizeDto } from "./size-dto.js";
import { GameModel } from "../../models/game-model.js";

export class DtoFactory {
  static mapGame(model: GameModel) {
    const labels = model.getLabels();

    const dto = new GameDto();
    dto.size = DtoFactory.mapSize(labels);
    dto.labels = DtoFactory.mapLabels(labels);
    dto.values = DtoFactory.mapCellsToValue(model.getCells());
    return dto;
  }

  static mapSize(labels: Labels) {
    const dto = new SizeDto();
    dto.cols = labels.cols;
    dto.rows = labels.rows;
    return dto;
  }

  static mapLabels(labels: Labels) {
    const dto = new LabelsDto();
    dto.rowLabels = labels.ofRows();
    dto.colLabels = labels.ofCols();
    return dto;
  }

  static mapCell(cell: Cell) {
    const dto = new CellDto();
    dto.value = DtoFactory.mapValue(cell.asSymbol());
    dto.posX = cell.getX();
    dto.posY = cell.getY();
    dto.isFix = cell.getIsFix();
    dto.block = DtoFactory.mapBlock(cell.getBlock());
    dto.row = DtoFactory.mapLine(cell.getRow());
    dto.col = DtoFactory.mapLine(cell.getCol());
    return dto;
  }

  static mapBlock(block: CellBlock) {
    const dto = new BlockDto();
    const center = block.getCenterCell();
    const ch = center.asSymbol();
    const i = center.getIndex();
    dto.center = DtoFactory.mapValue(ch, i);
    dto.neighbors = block
      .getNeighborCells()
      .filter((cell) => cell.asSymbol() != "x")
      .map((cell) => {
        const ch = cell.asSymbol();
        const i = cell.getIndex();
        return DtoFactory.mapValue(ch, i);
      });
    return dto;
  }

  static mapLine(line: CellLine) {
    const dto = new LineDto();
    dto.targetAmount = line.getTargetAmount();
    dto.values = DtoFactory.mapCellsToValue(line.getCells());
    dto.state = line.state;
    return dto;
  }

  static mapCellsToValue(cells: Cell[]): ValueDto[] {
    const dto = cells.map((cell) => DtoFactory.mapValue(cell.asSymbol()));
    return dto;
  }

  static mapValue(symbol: string, index: number | null = null) {
    const dto = new ValueDto();
    dto.symbol = symbol;
    dto.index = index != null ? index : -1;
    return dto;
  }
}
