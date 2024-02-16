import { Message, MessageType } from "./message";

export class MessageQueue {
    
    private messages: Message[] = [];

    publish(message: Message): void {
        this.messages.push(message);
    }

    consume(): Message | undefined {
        return this.messages.shift();
    }
}