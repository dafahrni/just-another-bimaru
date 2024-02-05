export class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindSelectionChanged((i) => this.nextMove(i));
    this.view.bindLabelClick((i) => this.fillLineWithWater(i));
  }

  fillLineWithWater(index) {
    this.model.fillLineWithWater(index);
    this.view.updateBoard();
  }

  nextMove(index) {
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
