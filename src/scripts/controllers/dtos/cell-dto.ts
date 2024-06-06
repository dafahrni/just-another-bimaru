import { BlockDto } from "./block-dto.js";
import { LineDto } from "./line-dto.js";
import { ValueDto } from "./value-dto.js";

export class CellDto {
  value!: ValueDto;
  posX!: number;
  posY!: number;
  isFix!: boolean;
  block!: BlockDto;
  row!: LineDto;
  col!: LineDto;
}
