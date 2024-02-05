import { Bimaru } from "./bimaru.js";
import { ModalDialog } from "./modal-dialog.js";

export class GameView {
  constructor(model) {
    this.model = model;
    this.board = new Bimaru(model);
    this.board.updateAll();
    this.dialog = new ModalDialog();
    this.ressources = {
      click: new Audio("resources/click.mp3"),
      clack: new Audio("resources/clack.mp3"),
      wrong: new Audio("resources/buzz.mp3"),
      bell: new Audio("resources/success.mp3"),
      draw: new Audio("resources/draw.mp3"),
    };
  }

  main() {
  }

  bindLabelClick(handler) {
    this.board.bindLabelClick(handler);
  }

  bindSelectionChanged(handler) {
    this.board.bindSelectionChanged(handler);
  }

  wrongMove() {
    this.playSound("wrong");
  }

  updateBoard() {
    this.playSound("clack");
    this.board.updateAll();
  }

  updateTile() {
    this.playSound("click");
    this.board.updateSelectedTile();
  }

  gameIsWon() {
    this.playSound("bell");
    this.showAlert(`Alle Schiffe gefunden!`, () => {
      this.model.resetCells();
      this.board.updateAll();
    });
  }

  showAlert(message, performAfterHiding) {
    this.dialog.showAlert(message, performAfterHiding);
  }

  playSound(key) {
    if (key in this.ressources) {
      this.ressources[key].play();
    }
  }
}
