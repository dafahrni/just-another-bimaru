import { CellDto } from "../controllers/dtos/cell-dto.js";
import { GameDto } from "../controllers/dtos/game-dto.js";

export enum MessageType {
  NewGame,
  //RestartGame,
  ChangeCell,
  //FillLineWithWater,
}

export type MessageCallback<T extends Message> = (message: T) => void;

export class Message {

  static newGame(dto: GameDto) {
    return new NewGame(dto);
  }

  static changeCell(dto: CellDto) {
    return new ChangeCell(dto);
  }

  type: MessageType;
  timestamp: number;

  constructor(type: MessageType) {
    this.type = type;
    this.timestamp = Date.now();
  }

  getType() { return this.type; }
  getTimestamp() { return this.timestamp; }
}

export class NewGame extends Message {

  dto: GameDto;

  constructor(dto: GameDto) {
    super(MessageType.NewGame);
    this.dto = dto;
  }
}

export class ChangeCell extends Message {

  dto!: CellDto;

  constructor(dto: CellDto) {
    super(MessageType.ChangeCell);
    this.dto = dto;
  }
}

