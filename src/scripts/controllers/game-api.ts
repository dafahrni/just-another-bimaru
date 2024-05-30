import { CellDto } from "./dtos/cell-dto.js";
import { LabelsDto } from "./dtos/labels-dto.js";
import { GameDto } from "./dtos/game-dto.js";
import { GameModel } from "../models/game-model.js";
import { DtoFactory } from "./dtos/dto-factory.js";
import { FieldFactory } from "../models/board/field-factory.js";
import { GameDefinition } from "../models/board/game-definition.js";

export class GameApi {

    private model: GameModel;

    constructor(model?: GameModel) {
        this.model = model ? model : new GameModel();
    }

    // TODO: remove these lines
    applySomeMoves() {
        this.model.fillLineWithWater(0);
        this.model.fillLineWithWater(2);
        this.model.fillLineWithWater(4);
        this.model.fillLineWithWater(6);
        this.model.setCell(3, '<');
        this.model.setCell(4, '□');
        this.model.setCell(5, '>');
        this.model.setCell(10, '~');
    }

    editConfig(size: number) {
        const field = FieldFactory.from(size, size);
        const config = GameDefinition.extract(field, false);
        this.model = new GameModel(config);
    }

    saveConfig() {
        this.model.safeConfig();
    }

    playGame() {
        const config = this.model.loadConfig();
        this.model = new GameModel(config);
    }

    getGame(): GameDto {
        return DtoFactory.mapGame(this.model);
    }

    getLabels(): LabelsDto {
        const labels = this.model.getLabels();
        return DtoFactory.mapLabels(labels);
    }

    getCell(index: number): CellDto {
        let cell = this.model.getCell(index);
        return DtoFactory.mapCell(cell);
    }

    setCell(index: number) {
        this.model.setCell(index);
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

    increaseTargetValue(index: number) {
        this.model.increaseTargetValue(index);
    }
}