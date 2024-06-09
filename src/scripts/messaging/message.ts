import { MessageType } from "./message-type.js";

export class Message {
  type: MessageType;
  timestamp: number;

  constructor(type: MessageType) {
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
