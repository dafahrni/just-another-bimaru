import { GameDto } from "../../controllers/dtos/game-dto.js";
import { Message } from "../message.js";
import { MessageType } from "../message-type.js";

export class NewGame extends Message {
  dto: GameDto;
  editMode: boolean;

  constructor(dto: GameDto, editMode: boolean) {
    super(MessageType.NewGame);
    this.dto = dto;
    this.editMode = editMode;
  }
}
