export class MessageQueue {
    constructor() {
        this.messages = [];
    }
    publish(message) {
        this.messages.push(message);
    }
    consume() {
        return this.messages.shift();
    }
}
//# sourceMappingURL=message-queue.js.map