import { CellDto } from "../controllers/dtos/cell-dto.js";
import { GameDto } from "../controllers/dtos/game-dto.js";
import { ShipSetDto } from "../controllers/dtos/ship-set-dto.js";
import { ValueDto } from "../controllers/dtos/value-dto.js";
import { ChangeCell } from "./cmds/change-cell.js";
import { ChangeValue } from "./cmds/change-value.js";
import { NewGame } from "./cmds/new-game.js";
import { LabelChanged } from "./events/label-changed.js";
import { ShipChanged } from "./events/ship-changed.js";
import { SizeChanged } from "./events/size-changed.js";
import { TileChanged } from "./events/tile-changed.js";

export class MessageFactory {

  /* commands */
  
  static newGame(dto: GameDto, editMode: boolean) {
    return new NewGame(dto, editMode);
  }

  static changeCell(dto: CellDto) {
    return new ChangeCell(dto);
  }

  static changeValue(dto: ValueDto) {
    return new ChangeValue(dto);
  }

  /* events */

  static sizeChanged(dto: GameDto, editMode: boolean, size: number) {
    return new SizeChanged(dto, size, editMode);
  }

  static shipChanged(dto: ShipSetDto) {
    return new ShipChanged(dto);
  }

  static tileChanged(index: number, editMode: boolean) {
    return new TileChanged(index, editMode);
  }

  static labelChanged(index: number, editMode: boolean) {
    return new LabelChanged(index, editMode);
  }
}
