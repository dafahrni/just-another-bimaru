import { Broker } from "../messaging/broker.js";
import { CellRelations } from "./cell-relations.js";
import { MessageFactory } from "../messaging/message-factory.js";
import { MessageType } from "../messaging/message-type.js";
export class GameController {
    constructor(api, view) {
        this.broker = Broker.get();
        this.api = api;
        this.view = view;
        this.broker.register(MessageType.TileChanged, (msg) => this.nextMove(msg));
        this.broker.register(MessageType.LabelChanged, (msg) => this.fillLineWithWater(msg));
        this.view.bindRestartGameClick(() => this.restartGame());
        this.view.bindEditGameClick((m) => this.editConfig(m));
        this.cells = new CellRelations(api, view);
    }
    init(editMode = false) {
        const dto = this.api.getGame();
        this.broker.publish(MessageFactory.newGame(dto, editMode));
        this.cells.updateAll(editMode);
    }
    run() {
        // main is being called regularly
        setInterval(() => this.view.main(), 100);
    }
    nextMove(msg) {
        const index = msg.index;
        const editMode = msg.editMode;
        if (editMode) {
            const symbol = this.view.getSelectedSymbol();
            this.api.setCell(index, symbol);
            // TODO: remove the 'old' way
            //this.api.setCell(index);
            this.cells.updateCell(index);
            this.view.cellWasUpdated();
            return;
        }
        if (this.api.changeCell(index)) {
            this.cells.updateCell(index);
            const sets = this.api.getShips().filter(s => s.targetAmount > 0);
            sets.forEach(set => this.broker.publish(MessageFactory.shipChanged(set)));
            this.view.cellWasUpdated();
        }
        else {
            this.view.wrongMove();
            return;
        }
        if (this.api.checkForWinner()) {
            this.view.gameIsWon(() => this.executeSelectConfig());
        }
    }
    fillLineWithWater(msg) {
        const index = msg.index;
        const editMode = msg.editMode;
        if (editMode) {
            const value = this.view.getSelectedTargetValue();
            this.api.setTargetValue(index, value);
            // TODO: remove the 'old' way
            //this.api.increaseTargetValue(index);
        }
        else
            this.api.fillLineWithWater(index);
        this.cells.updateAll(editMode);
        this.view.lineWasUpdated();
    }
    restartGame() {
        this.view.stopGame(() => this.executeSelectConfig());
    }
    editConfig(editMode) {
        if (!editMode)
            this.view.stopGame(() => this.executeGrizSizeRequest());
        else
            this.view.safeConfig(() => this.executeSaveConfig());
    }
    executeSelectConfig() {
        this.api.selectNextConfig();
        this.init(false);
        this.view.nextConfig(() => this.executeSelectConfig());
    }
    executeGrizSizeRequest() {
        this.view.changeToEditMode();
        this.view.showConfigView();
        this.view.requestGridSize(() => this.executeEditConfig());
    }
    executeEditConfig() {
        const size = this.view.getRequestedGridSize();
        this.api.editConfig(size);
        this.init(true);
    }
    executeSaveConfig() {
        this.view.changeToEditMode();
        this.api.saveConfig();
        this.api.selectConfig();
        this.init(false);
    }
}
//# sourceMappingURL=game-controller.js.map