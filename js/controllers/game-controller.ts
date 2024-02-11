import { GameModel } from "../models/game-model";
import { GameView } from "../views/game-view";

export class GameController {

  model: GameModel;
  view: GameView;
  
  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.view.bindSelectionChanged((i: number) => this.nextMove(i));
    this.view.bindLabelClick((i: number) => this.fillLineWithWater(i));
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
    }
  }

  run() {
    // main wird regelmässig aufgerufen
    setInterval(() => this.view.main(), 100);
  }
}
