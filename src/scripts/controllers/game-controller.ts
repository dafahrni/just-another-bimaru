import { DtoFactory } from "../models/dtos/dto-factory.js";
import { GameModel } from "../models/game-model.js";
import { Broker } from "../models/messaging/broker.js";
import { Message } from "../models/messaging/message.js";
import { GameView } from "../views/game-view.js";

export class GameController {

  private model: GameModel;
  private view: GameView;
  private broker: Broker = Broker.get();
  
  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.view.bindSelectionChanged((i: number) => this.nextMove(i));
    this.view.bindLabelClick((i: number) => this.fillLineWithWater(i));

    const dto = DtoFactory.mapGame(this.model);
    this.broker.publish(Message.newGame(dto));
  }

  fillLineWithWater(index: number) {
    this.model.fillLineWithWater(index);
    this.view.updateBoard();
  }

  nextMove(index: number) {
    if (this.model.changeCell(index)) {
      this.view.updateTile();
    } else {
      this.view.wrongMove();
      return;
    }

    if (this.model.checkForWinner()) {
      this.view.gameIsWon();
      this.model.resetCells(); // TODO: remove this line

      const dto = DtoFactory.mapGame(this.model);
      this.broker.publish(Message.newGame(dto));
    }
  }

  init() {
    this.view.init();
  }

  run() {
    // main wird regelmässig aufgerufen
    setInterval(() => this.view.main(), 100);
  }
}
