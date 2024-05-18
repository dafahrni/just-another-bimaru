import { CellDto } from "./dtos/cell-dto.js";
import { GameDto } from "./dtos/game-dto.js";
import { GameModel } from "../models/game-model.js";
import { DtoFactory } from "./dtos/dto-factory.js";

export class GameApi {

    private model: GameModel;

    constructor(model?: GameModel) {
        this.model = model ? model : new GameModel();
    }

    getGame(): GameDto {
        return DtoFactory.mapGame(this.model);
    }

    getCell(index: number): CellDto {
        let cell = this.model.getCell(index);
        return DtoFactory.mapCell(cell);
    }

    resetCells() {
        this.model.resetCells();
    }

    changeCell(index: number) {
        return this.model.changeCell(index);
    }

    checkForWinner() {
        return this.model.checkForWinner();
    }
    
    fillLineWithWater(index: number) {
        this.model.fillLineWithWater(index);
    }
}