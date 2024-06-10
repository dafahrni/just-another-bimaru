import { ChangeCell } from "./cmds/change-cell.js";
import { ChangeValue } from "./cmds/change-value.js";
import { NewGame } from "./cmds/new-game.js";
import { LabelChanged } from "./events/label-changed.js";
import { ShipChanged } from "./events/ship-changed.js";
import { SizeChanged } from "./events/size-changed.js";
import { TileChanged } from "./events/tile-changed.js";
export class MessageFactory {
    /* commands */
    static newGame(dto, editMode) {
        return new NewGame(dto, editMode);
    }
    static changeCell(dto) {
        return new ChangeCell(dto);
    }
    static changeValue(dto) {
        return new ChangeValue(dto);
    }
    /* events */
    static sizeChanged(dto, editMode, size) {
        return new SizeChanged(dto, size, editMode);
    }
    static shipChanged(dto) {
        return new ShipChanged(dto);
    }
    static tileChanged(index, editMode) {
        return new TileChanged(index, editMode);
    }
    static labelChanged(index, editMode) {
        return new LabelChanged(index, editMode);
    }
}
//# sourceMappingURL=message-factory.js.map