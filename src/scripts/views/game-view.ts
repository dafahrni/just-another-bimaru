import { Bimaru } from "./board/bimaru.js";
import { Ships } from "./board/ships.js";
import { ModalDialog } from "./forms/modal-dialog.js";
import { SideView } from "./forms/side-view.js";
import { MenuView } from "./forms/menu-view.js";
import { ConfigView } from "./forms/config-view.js";
import { ValueView } from "./forms/value-view.js";
import { ValueConfig } from "./forms/value-config.js";

export class GameView {
  board: Bimaru;
  ships: Ships;
  ressources: any;
  dialog: ModalDialog;
  sides: SideView;
  menu: MenuView;
  config: ConfigView;
  gridSize: ValueView;
  targetValue: ValueView;
  shipSelection: ValueView;
  
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
    this.sides = new SideView();
    this.menu = new MenuView(this.ressources["music"]);
    this.config = new ConfigView();
    this.gridSize = new ValueView(new ValueConfig("grid-size", "Grid Size", 6, 12));
    this.targetValue = new ValueView(new ValueConfig("target-value", "Target Value", 0, 9));
    this.shipSelection = new ValueView(new ValueConfig("ship-selection", "Ship Selection", 0, 9));
  }

  main() {}

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
