import { DtoFactory } from "./dtos/dto-factory.js";
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
    this.view.bindSelectionChanged((i: number) => this.nextMove(i));
    this.view.bindLabelClick((i: number) => this.fillLineWithWater(i));
    this.view.bindRestartGameClick(() => this.restartGame());

    this.cells = new CellRelations(model, view);
  }

  init() {
    this.model.resetCells();

    const dto = this.model.getGame();
    this.broker.publish(Message.newGame(dto));

    this.view.init();
    this.cells.updateAll();
  }

  run() {
    // main wird regelmässig aufgerufen
    setInterval(() => this.view.main(), 100);
  }

  nextMove(index: number) {
    if (this.model.changeCell(index)) {
      this.cells.updateCell(index);
      this.view.cellWasUpdated();
    } else {
      this.view.wrongMove();
      return;
    }

    if (this.model.checkForWinner()) {
      this.view.gameIsWon();

      this.init();
    }
  }

  fillLineWithWater(index: number) {
    this.model.fillLineWithWater(index);
    this.cells.updateAll();
    this.view.lineWasUpdated();
  }

  restartGame() {
    this.init();
  }
}
