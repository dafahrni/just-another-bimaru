import { LineState } from "../../models/board/parts/cell-line.js";
import { ValueDto } from "./value-dto.js";

export class LineDto {

  public targetAmount!: number;
  public values!: ValueDto[];
  public state!: LineState;
}