import { ValueDto } from "../../controllers/dtos/value-dto.js";
import { Message } from "../message.js";
import { MessageType } from "../message-type.js";

export class ChangeValue extends Message {
  dto!: ValueDto;

  constructor(dto: ValueDto) {
    super(MessageType.ChangeValue);
    this.dto = dto;
  }
}
