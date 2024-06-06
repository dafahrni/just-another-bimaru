import { ILabels } from "./ILabels.js";
import { ICell } from "./ICell.js";
import { IShipSet } from "./IShipSet.js";

export interface IConfig {
  labels: ILabels;
  predefinedCells: ICell[];
  shipSets: IShipSet[];
}
