import { LineState } from "../../models/parts/cell-line.js";
import { ValueDto } from "./value-dto.js";

export class LineDto {
  targetAmount!: number;
  values!: ValueDto[];
  state!: LineState;
}
