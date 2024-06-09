import { CellDto } from "../../controllers/dtos/cell-dto.js";
import { Message } from "../message.js";
import { MessageType } from "../message-type.js";

export class ChangeCell extends Message {
  dto!: CellDto;

  constructor(dto: CellDto) {
    super(MessageType.ChangeCell);
    this.dto = dto;
  }
}
