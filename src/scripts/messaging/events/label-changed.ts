import { Message } from "../message.js";
import { MessageType } from "../message-type.js";


export class LabelChanged extends Message {
  index!: number;
  editMode!: boolean;

  constructor(index: number, editMode: boolean) {
    super(MessageType.LabelChanged);
    this.index = index;
    this.editMode = editMode;
  }
}
