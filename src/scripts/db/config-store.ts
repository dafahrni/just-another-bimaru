import { Configuration } from "../models/board/configuration.js";
import { Cell } from "../models/parts/cell.js";
import { CellValue } from "../models/parts/cell-value.js";
import { Labels } from "../models/parts/labels.js";
import { Position } from "../models/parts/position.js";
import { ShipSet } from "../models/parts/ship-set.js";
import { IRepo } from "../models/repos/repo.js";
import { StoreBase } from "./store-base.js";
import { ShipSetEntity } from "./entities/IShipSet.js";
import { CellEntity } from "./entities/ICell.js";
import { IConfig } from "./entities/IConfig.js";

export class ConfigStore
  extends StoreBase<Configuration, IConfig>
  implements IRepo<Configuration>
{
  constructor() {
    super("config");
  }

  mapToEntity(config: Configuration): IConfig {
    const labels = config.getLabels();
    const cells = config
      .getPredefinedCells()
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

  mapFromEntity(config: IConfig): Configuration {
    const labels = config?.labels;
    const cols = labels?.colLabels.length;
    return new Configuration(
      new Labels(labels.colLabels, labels.rowLabels),
      config.predefinedCells.map(
        (c) =>
          new Cell(
            new Position(c.index % cols, c.index / cols),
            CellValue.from(c.symbol)
          )
      ),
      config.shipSets.map((s) => new ShipSet(s.size, s.targetAmount))
    );
  }
}
