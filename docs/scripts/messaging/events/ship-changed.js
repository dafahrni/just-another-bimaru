import { Message } from "../message.js";
import { MessageType } from "../message-type.js";
export class ShipChanged extends Message {
    constructor(dto) {
        super(MessageType.ShipChanged);
        this.dto = dto;
    }
}
//# sourceMappingURL=ship-changed.js.map