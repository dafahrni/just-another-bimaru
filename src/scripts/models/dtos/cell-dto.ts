import { BlockDto } from "./block-dto.js";
import { LineDto } from "./line-dto.js";
import { ValueDto } from "./value-dto.js";

export class CellDto {

    public value!: ValueDto;
    public posX!: number;
    public posY!: number;
    public isFix!: boolean;
    public block!: BlockDto;
    public row!: LineDto;
    public col!: LineDto;
    
}
