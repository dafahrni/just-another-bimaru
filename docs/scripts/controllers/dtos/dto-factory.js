import { BlockDto } from "./block-dto.js";
import { LineDto } from "./line-dto.js";
import { ValueDto } from "./value-dto.js";
import { CellDto } from "./cell-dto.js";
import { GameDto } from "./game-dto.js";
import { LabelsDto } from "./labels-dto.js";
import { SizeDto } from "./size-dto.js";
import { ShipSetDto } from "./ship-set-dto.js";
export class DtoFactory {
    static mapGame(model) {
        const labels = model.getLabels();
        const statistics = model.getUpdatedStatistics();
        const dto = new GameDto();
        dto.size = DtoFactory.mapSize(labels);
        dto.labels = DtoFactory.mapLabels(labels);
        dto.values = DtoFactory.mapCellsToValue(model.getCells());
        dto.statistics = DtoFactory.mapShips(statistics.getShipSets());
        return dto;
    }
    static mapSize(labels) {
        const dto = new SizeDto();
        dto.cols = labels.cols;
        dto.rows = labels.rows;
        return dto;
    }
    static mapLabels(labels) {
        const dto = new LabelsDto();
        dto.rowLabels = labels.ofRows();
        dto.colLabels = labels.ofCols();
        return dto;
    }
    static mapCell(cell) {
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
    static mapBlock(block) {
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
    static mapLine(line) {
        const dto = new LineDto();
        dto.targetAmount = line.getTargetAmount();
        dto.values = DtoFactory.mapCellsToValue(line.getCells());
        dto.state = line.state;
        return dto;
    }
    static mapCellsToValue(cells) {
        const dto = cells.map((cell) => DtoFactory.mapValue(cell.asSymbol()));
        return dto;
    }
    static mapValue(symbol, index = null) {
        const dto = new ValueDto();
        dto.symbol = symbol;
        dto.index = index != null ? index : -1;
        return dto;
    }
    static mapShips(sets) {
        return sets.map((s) => new ShipSetDto(s.getSize(), s.getTargetAmount(), s.getCurrentAmount()));
    }
}
//# sourceMappingURL=dto-factory.js.map