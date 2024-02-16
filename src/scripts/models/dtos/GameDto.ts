import { LabelsDto } from "./LabelsDto";
import { SizeDto } from "./SizeDto";
import { ValueDto } from "./ValueDto";

export class GameDto {

    public size!: SizeDto;
    public labels!: LabelsDto;
    public values!: ValueDto[];

}
