import { Message } from "../message.js";
import { MessageType } from "../message-type.js";

export class TileChanged extends Message {
  index!: number;
  editMode!: boolean;

  constructor(index: number, editMode: boolean) {
    super(MessageType.TileChanged);
    this.index = index;
    this.editMode = editMode;
  }
}
