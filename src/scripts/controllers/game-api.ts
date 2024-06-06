import { CellDto } from "./dtos/cell-dto.js";
import { LabelsDto } from "./dtos/labels-dto.js";
import { GameDto } from "./dtos/game-dto.js";
import { GameModel } from "../models/game-model.js";
import { DtoFactory } from "./dtos/dto-factory.js";
import { FieldFactory } from "../models/board/field-factory.js";
import { Configuration } from "../models/board/configuration.js";
import { IRepoFactory, RepoFactory } from "../models/repos/repo-factory.js";
import { IRepo } from "../models/repos/repo.js";

export class GameApi {
  model: GameModel;
  configs: IRepo<Configuration>;
  repoFactory: IRepoFactory;

  constructor(model?: GameModel, repoFactory?: IRepoFactory) {
    this.model = model ? model : new GameModel();
    this.repoFactory = repoFactory ? repoFactory : new RepoFactory();
    this.configs = this.repoFactory.configs;
  }

  // TODO: remove these lines
  applySomeMoves() {
    this.model.fillLineWithWater(0);
    this.model.fillLineWithWater(2);
    this.model.fillLineWithWater(4);
    this.model.fillLineWithWater(6);
    this.model.setCell(3, "<");
    this.model.setCell(4, "□");
    this.model.setCell(5, ">");
    this.model.setCell(10, "~");
  }

  editConfig(size: number) {
    const field = FieldFactory.from(size, size);
    const config = Configuration.extract(field, false);
    this.model = new GameModel(config, -1);
  }

  saveConfig() {
    const config = this.model.extractConfig();
    this.configs.add(config);
  }

  selectConfig() {
    const config = this.model.getConfig();
    this.model = new GameModel(config);
  }

  selectNextConfig() {
    const length = this.configs.length;
    let index = this.model.getConfigIndex() + 1;
    index = index >= 0 && index < length ? index : 0;
    const config = this.configs.get(index);
    this.model = new GameModel(config, index);
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
