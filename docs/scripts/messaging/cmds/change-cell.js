import { Message } from "../message.js";
import { MessageType } from "../message-type.js";
export class ChangeCell extends Message {
    constructor(dto) {
        super(MessageType.ChangeCell);
        this.dto = dto;
    }
}
//# sourceMappingURL=change-cell.js.map