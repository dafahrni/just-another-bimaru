import { Message } from "./message.js";

export class MessageQueue {
    
    messages: Message[] = [];

    publish(message: Message): void {
        this.messages.push(message);
    }

    consume(): Message | undefined {
        return this.messages.shift();
    }
}