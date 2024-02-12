import { GameModel } from "../models/game-model.js";
import { Bimaru } from "./bimaru.js";
import { ModalDialog } from "./modal-dialog.js";

export class GameView {
  
  private model: GameModel;
  private board: Bimaru;
  private dialog: ModalDialog;
  private ressources: any;
  
  constructor(model: GameModel) {
    this.model = model;
    this.board = new Bimaru(model);
    this.board.updateAll();
    this.dialog = new ModalDialog();
    this.ressources = {
      click: new Audio("assets/click.mp3"),
      clack: new Audio("assets/clack.mp3"),
      wrong: new Audio("assets/buzz.mp3"),
      bell: new Audio("assets/success.mp3"),
      draw: new Audio("assets/draw.mp3"),
    };
  }

  main() {
  }

  bindLabelClick(handler: any) {
    this.board.bindLabelClick(handler);
  }

  bindSelectionChanged(handler: any) {
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

  showAlert(message: string, performAfterHiding: () => void) {
    this.dialog.showAlert(message, performAfterHiding);
  }

  playSound(key: string) {
    if (key in this.ressources) {
      this.ressources[key].play();
    }
  }
}
