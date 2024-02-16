import { BlockDto } from "./BlockDto";
import { LineDto } from "./LineDto";
import { ValueDto } from "./ValueDto";

export class CellDto {

    public value!: ValueDto;
    public posX!: number;
    public posY!: number;
    public isFix!: boolean;
    public block!: BlockDto;
    public row!: LineDto;
    public col!: LineDto;
    
}
