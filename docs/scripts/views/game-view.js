import { Bimaru } from "./board/bimaru.js";
import { Ships } from "./board/ships.js";
import { ModalDialog } from "./forms/modal-dialog.js";
import { SideView } from "./forms/side-view.js";
import { MenuView } from "./forms/menu-view.js";
import { ConfigView } from "./forms/config-view.js";
import { ValueView } from "./forms/value-view.js";
import { ValueConfig } from "./forms/value-config.js";
import { ShipSelection } from "./forms/ship-selection.js";
export class GameView {
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
        this.shipSelection = new ShipSelection(new ValueConfig("ship-selection", "Ship Selection", 0, 7));
    }
    main() { }
    bindRestartGameClick(handler) {
        this.menu.bindRestartGameClick(handler);
    }
    bindEditGameClick(handler) {
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
    gameIsWon(action) {
        this.playSound("bell");
        this.dialog.showInfo(`All ships found!`, action);
    }
    stopGame(action) {
        this.dialog.confirmAction(`End running game?`, action);
    }
    changeToEditMode() {
        this.menu.changeEditMode();
    }
    requestGridSize(action) {
        this.dialog.requestAmount(`Define grid size`, action);
    }
    getRequestedGridSize() {
        return this.dialog.getValue();
    }
    safeConfig(action) {
        this.dialog.confirmAction(`Confirm safe of configuration?`, action);
    }
    nextConfig(action) {
        this.dialog.confirmAction(`Display next configuration?`, action);
    }
    playSound(key) {
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
    getSelectedSymbol() {
        return this.shipSelection.selectedSymbol;
    }
    getSelectedTargetValue() {
        return this.targetValue.selectedValue;
    }
    showConfigView() {
        this.sides.moveLeft();
        this.sides.moveLeft();
    }
}
//# sourceMappingURL=game-view.js.map