import { GameApi } from "./game-api.js";
import { Broker } from "../messaging/broker.js";
import { Message } from "../messaging/message.js";
import { GameView } from "../views/game-view.js";
import { CellRelations } from "./cell-relations.js";

export class GameController {

  private model: GameApi;
  private view: GameView;
  private cells: CellRelations;
  private broker: Broker = Broker.get();
  
  constructor(model: GameApi, view: GameView) {
    this.model = model;
    this.view = view;
    this.view.bindSelectionChanged((i: number, m: boolean) => this.nextMove(i, m));
    this.view.bindLabelClick((i: number, m: boolean) => this.fillLineWithWater(i, m));
    this.view.bindRestartGameClick(() => this.restartGame());
    this.view.bindEditGameClick((m: boolean) => this.editGame(m));

    this.cells = new CellRelations(model, view);
  }

  init(editMode: boolean = false) {
    const dto = this.model.getGame();
    this.broker.publish(Message.newGame(dto));

    this.view.init(editMode);
    this.cells.updateAll(editMode);
  }

  run() {
    // main is being called regularly
    setInterval(() => this.view.main(), 100);
  }

  nextMove(index: number, editMode: boolean) {
    if (editMode) {
      this.model.setCell(index);
      this.cells.updateCell(index);
      this.view.cellWasUpdated();
      return;
    }

    if (this.model.changeCell(index)) {
      this.cells.updateCell(index);
      this.view.cellWasUpdated();
    } else {
      this.view.wrongMove();
      return;
    }

    if (this.model.checkForWinner()) {
      this.view.gameIsWon(() => this.executeRestartGame());
    }
  }

  fillLineWithWater(index: number, editMode: boolean) {
    if (editMode)
      this.model.increaseTargetValue(index);
    else
      this.model.fillLineWithWater(index);
    
    this.cells.updateAll(editMode);
    this.view.lineWasUpdated();
  }

  restartGame() {
    this.view.stopGame(() => this.executeRestartGame());
  }

  editGame(editMode: boolean) {
    if (!editMode)
      this.view.stopGame(() => this.executeGrizSizeRequest());
    else 
      this.view.safeConfig(() => this.executeSaveConfig());
  }

  executeRestartGame() {
    this.model.playGame();
    this.init(false);
  }

  executeGrizSizeRequest() {
    this.view.changeMenu();
    this.view.requestGridSize(() => this.executeEditConfig());
  }

  executeEditConfig() {
    const size = this.view.getGridSize();
    this.model.editConfig(size);
    this.init(true);
  }

  executeSaveConfig() {
    this.view.changeMenu();
    this.model.saveConfig();
    this.model.playGame();
    this.init(false);
  }
}
