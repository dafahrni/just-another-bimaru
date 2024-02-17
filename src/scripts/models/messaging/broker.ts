import { MessageType, MessageCallback, Message } from "./message";
import { MessageQueue } from "./message-queue";

export class Broker {

  private subscribers: Map<MessageType, MessageCallback<any>[]> = new Map();
  private queues: Map<MessageType, MessageQueue> = new Map();

  private static instance: Broker;

  static get(): Broker {
      if (!Broker.instance) {
        Broker.instance = new Broker();
      }
      return Broker.instance;
  }

  subscribe<T extends Message>(messageType: MessageType, callback: MessageCallback<T>) {
    if (!this.subscribers.has(messageType)) {
      this.subscribers.set(messageType, []);
    }
    this.subscribers.get(messageType)?.push(callback);
  }

  publish<T extends Message>(message: T) {
    const type = message.getType();
    if (this.subscribers.has(type)) {
      this.subscribers.get(type)?.forEach((callback) => callback(message));
    }

    this.queues.get(type)?.publish(message);
  }

  consume(type: MessageType): Message | undefined {
    if (this.queues.has(type)) {
        return this.queues.get(type)?.consume();
    }
    return undefined;
  }
}
