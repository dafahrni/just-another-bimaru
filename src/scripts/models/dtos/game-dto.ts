import { LabelsDto } from "./labels-dto.js";
import { SizeDto } from "./size-dto.js";
import { ValueDto } from "./value-dto.js";

export class GameDto {

    public size!: SizeDto;
    public labels!: LabelsDto;
    public values!: ValueDto[];

}
