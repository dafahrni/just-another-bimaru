import { CellDto } from "../dtos/CellDto";
import { GameDto } from "../dtos/GameDto";

export enum MessageType {
  NewGame,
  RestartGame,
  ChangeCell,
  FillLineWithWater
}

export type MessageCallback<T extends Message> = (message: T) => void;

export class Message {

  private type: MessageType;
  private timestamp: number;

  constructor(type: MessageType) {
    this.type = type;
    this.timestamp = Date.now();
  }

  getType() { return this.type; }
  getTimestamp() { return this.timestamp; }
}

export class NewGameMessage extends Message {

  public dto: GameDto;

  constructor(dto: GameDto) {
    super(MessageType.NewGame);
    this.dto = dto;
  }
}

export class RestartGameMessage extends Message {

  constructor() {
    super(MessageType.RestartGame);
  }
}

export class ChangeCellMessage extends Message {

  public dto!: CellDto;

  constructor(dto: CellDto) {
    super(MessageType.ChangeCell);
    this.dto = dto;
  }
}

