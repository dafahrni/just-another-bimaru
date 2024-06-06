import { GameApi } from "./game-api.js";
import { Broker } from "../messaging/broker.js";
import { Message } from "../messaging/message.js";
import { GameView } from "../views/game-view.js";
import { CellRelations } from "./cell-relations.js";

export class GameController {
  api: GameApi;
  view: GameView;
  cells: CellRelations;
  broker: Broker = Broker.get();

  constructor(api: GameApi, view: GameView) {
    this.api = api;
    this.view = view;
    this.view.bindSelectionChanged((i: number, m: boolean) =>
      this.nextMove(i, m)
    );
    this.view.bindLabelClick((i: number, m: boolean) =>
      this.fillLineWithWater(i, m)
    );
    this.view.bindRestartGameClick(() => this.restartGame());
    this.view.bindEditGameClick((m: boolean) => this.editConfig(m));

    this.cells = new CellRelations(api, view);
  }

  init(editMode: boolean = false) {
    const dto = this.api.getGame();
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
      this.api.setCell(index);
      this.cells.updateCell(index);
      this.view.cellWasUpdated();
      return;
    }

    if (this.api.changeCell(index)) {
      this.cells.updateCell(index);
      this.view.cellWasUpdated();
    } else {
      this.view.wrongMove();
      return;
    }

    if (this.api.checkForWinner()) {
      this.view.gameIsWon(() => this.executeSelectConfig());
    }
  }

  fillLineWithWater(index: number, editMode: boolean) {
    if (editMode) this.api.increaseTargetValue(index);
    else this.api.fillLineWithWater(index);

    this.cells.updateAll(editMode);
    this.view.lineWasUpdated();
  }

  restartGame() {
    this.view.stopGame(() => this.executeSelectConfig());
  }

  editConfig(editMode: boolean) {
    if (!editMode) this.view.stopGame(() => this.executeGrizSizeRequest());
    else this.view.safeConfig(() => this.executeSaveConfig());
  }

  executeSelectConfig() {
    this.api.selectNextConfig();
    this.init(false);
    this.view.nextConfig(() => this.executeSelectConfig());
  }

  executeGrizSizeRequest() {
    this.view.changeMenu();
    this.view.requestGridSize(() => this.executeEditConfig());
  }

  executeEditConfig() {
    const size = this.view.getGridSize();
    this.api.editConfig(size);
    this.init(true);
  }

  executeSaveConfig() {
    this.view.changeMenu();
    this.api.saveConfig();
    this.api.selectConfig();
    this.init(false);
  }
}
