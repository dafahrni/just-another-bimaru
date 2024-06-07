import { MenuView } from "./forms/menu-view.js";
import { ConfigView } from "./forms/config-view.js";
import { Bimaru } from "./board/bimaru.js";
import { ModalDialog } from "./forms/modal-dialog.js";
import { SideView } from "./forms/side-view.js";
import { Ships } from "./board/ships.js";

export class GameView {
  menu: MenuView;
  config: ConfigView;
  sides: SideView;
  board: Bimaru;
  ships: Ships;
  dialog: ModalDialog;
  ressources: any;

  constructor() {
    this.board = new Bimaru();
    this.ships = new Ships();
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
    this.config = new ConfigView();
    this.sides = new SideView();
  }

  main() {}

  bindLabelClick(handler: any) {
    this.board.bindLabelClick(handler);
  }

  bindSelectionChanged(handler: any) {
    this.board.bindSelectionChanged(handler);
  }

  bindRestartGameClick(handler: any) {
    this.menu.bindRestartGameClick(handler);
  }

  bindEditGameClick(handler: any) {
    this.menu.bindEditGameClick(handler);
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

  gameIsWon(action: () => void) {
    this.playSound("bell");
    this.dialog.showInfo(`Alle Schiffe gefunden!`, action);
  }

  stopGame(action: () => void) {
    this.dialog.confirmAction(`Laufendes Spiel beenden?`, action);
  }

  changeMenu() {
    this.menu.changeEditMode();
  }

  requestGridSize(action: () => void) {
    this.dialog.requestAmount(`Bitte Grösse festlegen`, action);
  }

  getGridSize() {
    return this.dialog.getValue();
  }

  safeConfig(action: () => void) {
    this.dialog.confirmAction(`Konfiguration übernehmen?`, action);
  }

  nextConfig(action: () => void) {
    this.dialog.confirmAction(`Nächste Konfiguration anzeigen?`, action);
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
