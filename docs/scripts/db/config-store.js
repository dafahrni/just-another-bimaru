import { Configuration } from "../models/board/configuration.js";
import { Cell } from "../models/parts/cell.js";
import { CellValue } from "../models/parts/cell-value.js";
import { Labels } from "../models/parts/labels.js";
import { Position } from "../models/parts/position.js";
import { ShipSet } from "../models/parts/ship-set.js";
import { StoreBase } from "./store-base.js";
import { ShipSetEntity } from "./entities/IShipSet.js";
import { CellEntity } from "./entities/ICell.js";
import { FieldFactory } from "../models/board/field-factory.js";
export class ConfigStore extends StoreBase {
    constructor() {
        super("config");
    }
    mapToEntity(config) {
        const labels = config.getLabels();
        const field = FieldFactory.createWith(config);
        const cells = field
            .getCellsWithFixedValue()
            .map((c) => new CellEntity(c.getIndex(), c.asSymbol()));
        const shipSets = config
            .getShipSets()
            .map((s) => new ShipSetEntity(s.getSize(), s.getTargetAmount()));
        return {
            labels: {
                colLabels: labels.ofCols(),
                rowLabels: labels.ofRows(),
            },
            predefinedCells: cells,
            shipSets: shipSets,
        };
    }
    mapFromEntity(config) {
        const labels = config === null || config === void 0 ? void 0 : config.labels;
        const cols = labels === null || labels === void 0 ? void 0 : labels.colLabels.length;
        return new Configuration(new Labels(labels.colLabels, labels.rowLabels), config.predefinedCells.map((c) => this.mapFromCell(c, cols)), config.shipSets.map((s) => new ShipSet(s.size, s.targetAmount)));
    }
    mapFromCell(c, cols) {
        const x = c.index % cols;
        const y = Math.floor(c.index / cols);
        const cell = new Cell(new Position(x, y), CellValue.from(c.symbol));
        cell.setIndex(c.index);
        return cell;
    }
}
//# sourceMappingURL=config-store.js.map