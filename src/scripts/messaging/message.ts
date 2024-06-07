import { CellDto } from "../controllers/dtos/cell-dto.js";
import { GameDto } from "../controllers/dtos/game-dto.js";
import { ShipSetDto } from "../controllers/dtos/ship-set-dto.js";

export enum MessageType {
  NewGame,
  SizeChanged,
  //RestartGame,
  ChangeCell,
  //FillLineWithWater,
  ShipChanged,
}

export type MessageCallback<T extends Message> = (message: T) => void;

export class Message {
  type: MessageType;
  timestamp: number;

  /* commands */

  static newGame(dto: GameDto, editMode: boolean) {
    return new NewGame(dto, editMode);
  }

  static changeCell(dto: CellDto) {
    return new ChangeCell(dto);
  }

  /* events */

  static sizeChanged(dto: GameDto, editMode: boolean, size: number) {
    return new SizeChanged(dto, size, editMode);
  }

  static shipChanged(dto: ShipSetDto) {
    return new ShipChanged(dto);
  }

  constructor(type: MessageType) {
    this.type = type;
    this.timestamp = Date.now();
  }

  getType() {
    return this.type;
  }

  getTimestamp() {
    return this.timestamp;
  }
}

export class NewGame extends Message {
  dto: GameDto;
  editMode: boolean;

  constructor(dto: GameDto, editMode: boolean) {
    super(MessageType.NewGame);
    this.dto = dto;
    this.editMode = editMode;
  }
}

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

export class ShipChanged extends Message {
  dto: ShipSetDto;

  constructor(dto: ShipSetDto) {
    super(MessageType.ShipChanged);
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
