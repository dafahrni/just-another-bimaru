import { Message } from "./message.js";

export type MessageCallback<T extends Message> = (message: T) => void;
