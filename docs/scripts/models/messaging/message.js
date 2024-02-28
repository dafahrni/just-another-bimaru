export var MessageType;
(function (MessageType) {
    MessageType[MessageType["NewGame"] = 0] = "NewGame";
    //RestartGame,
    MessageType[MessageType["ChangeCell"] = 1] = "ChangeCell";
    //FillLineWithWater,
})(MessageType || (MessageType = {}));
export class Message {
    static newGame(dto) {
        return new NewGame(dto);
    }
    static changeCell(dto) {
        return new ChangeCell(dto);
    }
    constructor(type) {
        this.type = type;
        this.timestamp = Date.now();
    }
    getType() { return this.type; }
    getTimestamp() { return this.timestamp; }
}
export class NewGame extends Message {
    constructor(dto) {
        super(MessageType.NewGame);
        this.dto = dto;
    }
}
export class ChangeCell extends Message {
    constructor(dto) {
        super(MessageType.ChangeCell);
        this.dto = dto;
    }
}
//# sourceMappingURL=message.js.map