import { Message } from "../message.js";
import { MessageType } from "../message-type.js";
export class ChangeValue extends Message {
    constructor(dto) {
        super(MessageType.ChangeValue);
        this.dto = dto;
    }
}
//# sourceMappingURL=change-value.js.map