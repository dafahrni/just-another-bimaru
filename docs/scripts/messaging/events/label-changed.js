import { Message } from "../message.js";
import { MessageType } from "../message-type.js";
export class LabelChanged extends Message {
    constructor(index, editMode) {
        super(MessageType.LabelChanged);
        this.index = index;
        this.editMode = editMode;
    }
}
//# sourceMappingURL=label-changed.js.map