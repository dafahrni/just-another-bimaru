import { LineState } from "../board/parts/cell-line";
import { ValueDto } from "./ValueDto";

export class LineDto {

  public targetAmount!: number;
  public values!: ValueDto[];
  public state!: LineState;
}