import { Message } from "../message.js";
import { MessageType } from "../message-type.js";
export class TileChanged extends Message {
    constructor(index, editMode) {
        super(MessageType.TileChanged);
        this.index = index;
        this.editMode = editMode;
    }
}
//# sourceMappingURL=tile-changed.js.map