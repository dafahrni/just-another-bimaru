import { ShipSetDto } from "../../controllers/dtos/ship-set-dto.js";
import { Message } from "../message.js";
import { MessageType } from "../message-type.js";

export class ShipChanged extends Message {
  dto: ShipSetDto;

  constructor(dto: ShipSetDto) {
    super(MessageType.ShipChanged);
    this.dto = dto;
  }
}
