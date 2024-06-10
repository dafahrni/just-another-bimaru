export class Message {
    constructor(type) {
        this.type = type;
        this.timestamp = Date.now();
    }
    getType() {
        return this.type;
    }
    getTimestamp() {
        return this.timestamp;
    }
}
//# sourceMappingURL=message.js.map