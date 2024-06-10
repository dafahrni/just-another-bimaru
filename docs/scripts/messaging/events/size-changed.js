import { Message } from "../message.js";
import { MessageType } from "../message-type.js";
export class SizeChanged extends Message {
    constructor(dto, size, editMode) {
        super(MessageType.SizeChanged);
        this.dto = dto;
        this.size = size;
        this.editMode = editMode;
    }
}
//# sourceMappingURL=size-changed.js.map