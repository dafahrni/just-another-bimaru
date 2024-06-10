import { MessageQueue } from "./message-queue.js";
export class Broker {
    constructor() {
        this.subscribers = new Map();
        this.queues = new Map();
    }
    static get() {
        if (!Broker.instance) {
            Broker.instance = new Broker();
        }
        return Broker.instance;
    }
    register(messageType, callback) {
        var _a;
        if (!this.subscribers.has(messageType)) {
            this.subscribers.set(messageType, []);
        }
        (_a = this.subscribers.get(messageType)) === null || _a === void 0 ? void 0 : _a.push(callback);
    }
    publish(message) {
        var _a, _b;
        const type = message.getType();
        if (this.subscribers.has(type)) {
            (_a = this.subscribers.get(type)) === null || _a === void 0 ? void 0 : _a.forEach((callback) => callback(message));
        }
        if (!this.queues.has(type)) {
            this.queues.set(type, new MessageQueue());
        }
        (_b = this.queues.get(type)) === null || _b === void 0 ? void 0 : _b.publish(message);
    }
    consume(type) {
        var _a;
        if (this.queues.has(type)) {
            return (_a = this.queues.get(type)) === null || _a === void 0 ? void 0 : _a.consume();
        }
        return undefined;
    }
}
//# sourceMappingURL=broker.js.map