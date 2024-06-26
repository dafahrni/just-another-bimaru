import { LabelsDto } from "./labels-dto.js";
import { ShipSetDto } from "./ship-set-dto.js";
import { SizeDto } from "./size-dto.js";
import { ValueDto } from "./value-dto.js";

export class GameDto {
  size!: SizeDto;
  labels!: LabelsDto;
  values!: ValueDto[];
  statistics!: ShipSetDto[];
}
