import { FullScreen } from "./full-screen.js";
import { ScreenLock } from "./screen-lock.js";
import { ModalDialog } from "./modal-dialog.js";
import { Board } from "./board.js";

export class GameView {
  constructor(model) {
    this._model = model;
    this._board = new Board(model);
    this._board.updateAll();
    this._dialog = new ModalDialog();
    this._fullScreen = new FullScreen();
    this._screenLock = new ScreenLock();
    this._ressources = {
      click: new Audio("resources/click.mp3"),
      clack: new Audio("resources/clack.mp3"),
      wrong: new Audio("resources/buzz.mp3"),
      bell: new Audio("resources/success.mp3"),
      draw: new Audio("resources/draw.mp3"),
    };
  }

  main() {
    if (this._fullScreen.isSupported) {
      if (this._fullScreen.isActivated) {
        if (this._screenLock.isSupported) {
          this._screenLock.showButton();
        } 
      } else {
        this._fullScreen.showButton();
        this._screenLock.hideButton();
      }
    }
  }

  bindSelectionChanged(handler) {
    this._board.bindSelectionChanged(handler);
  }

  wrongMove() {
    this._playSound("wrong");
  }

  updateBoard() {
    this._playSound(this._model.player === "X" ? "click" : "clack");
    this._board.updateSelectedTile();
  }

  gameIsWon() {
    this._playSound("bell");
    this._showAlert(`Spieler ${this._model.player} gewinnt!`, () => {
      this._model.resetCells();
      this._board.updateAll();
    });
  }

  gameIsDraw() {
    this._playSound("draw");
    this._showAlert("Unentschieden!", () => {
      this._model.resetCells();
      this._board.updateAll();
    });
  }

  _showAlert(message, performAfterHiding) {
    this._dialog.showAlert(message, performAfterHiding);
  }

  _playSound(key) {
    if (key in this._ressources) {
      this._ressources[key].play();
    }
  }
}
