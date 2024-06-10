import { Message } from "../message.js";
import { MessageType } from "../message-type.js";
export class NewGame extends Message {
    constructor(dto, editMode) {
        super(MessageType.NewGame);
        this.dto = dto;
        this.editMode = editMode;
    }
}
//# sourceMappingURL=new-game.js.map