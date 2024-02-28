import { MenuView } from "./menu-view.js";
import { Bimaru } from "./bimaru.js";
import { ModalDialog } from "./modal-dialog.js";

export class GameView {
  
  private menu: MenuView;
  private board: Bimaru;
  private dialog: ModalDialog;
  private ressources: any;

  constructor() {
    this.board = new Bimaru();
    this.dialog = new ModalDialog();
    this.ressources = {
      click: new Audio("assets/click.mp3"),
      clack: new Audio("assets/clack.mp3"),
      wrong: new Audio("assets/buzz.mp3"),
      bell: new Audio("assets/success.mp3"),
      draw: new Audio("assets/draw.mp3"),
      music: new Audio("assets/music.mp3"),
    };
    this.menu = new MenuView(this.ressources["music"]);
  }

  init() {
    this.board.init();
  }

  main() {
  }

  bindLabelClick(handler: any) {
    this.board.bindLabelClick(handler);
  }

  bindSelectionChanged(handler: any) {
    this.board.bindSelectionChanged(handler);
  }

  bindRestartGameClick(handler: any) {
    this.menu.bindRestartGameClick(handler);
  }

  wrongMove() {
    this.playSound("wrong");
  }

  lineWasUpdated() {
    this.playSound("clack");
  }

  cellWasUpdated() {
    this.playSound("click");
  }

  gameIsWon() {
    this.playSound("bell");
    this.showAlert(`Alle Schiffe gefunden!`, () => {
      // TODO: consider to make this parameter optional
      // do nothing afting hiding
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

  getCells() {
    return this.board.getCells();
  }

  getLabels() {
    return this.board.getLabels();
  }
}
