import { Bimaru } from "./bimaru.js";

export class GameView {
  constructor(model) {
    this.model = model;
    this.board = new Bimaru(model);
    this.board.updateAll();
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

  playSound(key) {
    if (key in this.ressources) {
      this.ressources[key].play();
    }
  }
}
