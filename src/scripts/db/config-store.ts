import { GameDefinition } from "../models/board/game-definition.js";
import { Cell } from "../models/board/parts/cell.js";
import { CellValue } from "../models/board/parts/cell-value.js";
import { Labels } from "../models/board/parts/labels.js";
import { Position } from "../models/board/parts/position.js";
import { ShipSet } from "../models/board/parts/ship-set.js";
import { IRepo } from "../models/repos/repo.js";
import { StoreBase } from "./store-base.js";

interface ILabels {
  colLabels: number[];
  rowLabels: number[];
}

interface ICell {
  index: number;
  symbol: string;
}

interface IShipSet {
  size: number;
  targetAmount: number;
}

interface IConfig {
  labels: ILabels;
  predefinedCells: ICell[];
  shipSets: IShipSet[];
}

class CellImpl implements ICell {
  index: number;
  symbol: string;

  constructor(index: number, symbol: string) {
    this.index = index;
    this.symbol = symbol;
  }
}

class ShipSetImpl implements IShipSet {
  size: number;
  targetAmount: number;

  constructor(size: number, targetAmount: number) {
    this.size = size;
    this.targetAmount = targetAmount;
  }
}

export class ConfigStore
  extends StoreBase<GameDefinition, IConfig>
  implements IRepo<GameDefinition>
{
  constructor() {
    super("config");
  }

  mapToEntity(config: GameDefinition): IConfig {
    const labels = config.getLabels();
    const cells = config
      .getPredefinedCells()
      .map((c) => new CellImpl(c.getIndex(), c.asSymbol()));
    const shipSets = config
      .getShipSets()
      .map((s) => new ShipSetImpl(s.getSize(), s.getTargetAmount()));
    return {
      labels: {
        colLabels: labels.ofCols(),
        rowLabels: labels.ofRows(),
      },
      predefinedCells: cells,
      shipSets: shipSets,
    };
  }

  mapFromEntity(config: IConfig): GameDefinition {
    const labels = config?.labels;
    const cols = labels?.colLabels.length;
    return new GameDefinition(
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