import { GameDto } from "../../controllers/dtos/game-dto.js";
import { Message } from "../message.js";
import { MessageType } from "../message-type.js";

export class SizeChanged extends Message {
  dto: GameDto;
  size: number;
  editMode: boolean;

  constructor(dto: GameDto, size: number, editMode: boolean) {
    super(MessageType.SizeChanged);
    this.dto = dto;
    this.size = size;
    this.editMode = editMode;
  }
}
