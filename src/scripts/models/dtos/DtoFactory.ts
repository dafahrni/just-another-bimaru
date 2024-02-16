import { Cell } from "../board/parts/cell";
import { CellBlock } from "../board/parts/cell-block";
import { CellLine } from "../board/parts/cell-line";
import { BlockDto } from "./BlockDto";
import { LineDto } from "./LineDto";
import { ValueDto } from "./ValueDto";
import { CellDto } from "./CellDto";
import { GameModel } from "../game-model";
import { GameDto } from "./GameDto";
import { LabelsDto } from "./LabelsDto";
import { Labels } from "../board/parts/labels";
import { SizeDto } from "./SizeDto";

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
    dto.block = DtoFactory.mapBlock(cell.getBlock());
    dto.row = DtoFactory.mapLine(cell.getRow());
    dto.col = DtoFactory.mapLine(cell.getCol());
    return dto;
  }

  static mapBlock(block: CellBlock) {
    const dto = new BlockDto();
    dto.center = DtoFactory.mapValue(block.getCenterCell().asSymbol());
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
    dto.index = index ? index : -1;
    return dto;
  }
}
