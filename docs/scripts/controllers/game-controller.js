import { DtoFactory } from "../models/dtos/dto-factory.js";
import { Broker } from "../models/messaging/broker.js";
import { Message } from "../models/messaging/message.js";
import { CellRelations } from "./cell-relations.js";
export class GameController {
    constructor(model, view) {
        this.broker = Broker.get();
        this.model = model;
        this.view = view;
        this.view.bindSelectionChanged((i) => this.nextMove(i));
        this.view.bindLabelClick((i) => this.fillLineWithWater(i));
        this.view.bindRestartGameClick(() => this.restartGame());
        this.cells = new CellRelations(model, view);
    }
    init() {
        this.model.resetCells();
        const dto = DtoFactory.mapGame(this.model);
        this.broker.publish(Message.newGame(dto));
        this.view.init();
        this.cells.updateAll();
    }
    run() {
        // main wird regelmässig aufgerufen
        setInterval(() => this.view.main(), 100);
    }
    nextMove(index) {
        if (this.model.changeCell(index)) {
            this.cells.updateCell(index);
            this.view.cellWasUpdated();
        }
        else {
            this.view.wrongMove();
            return;
        }
        if (this.model.checkForWinner()) {
            this.view.gameIsWon();
            this.init();
        }
    }
    fillLineWithWater(index) {
        this.model.fillLineWithWater(index);
        this.cells.updateAll();
        this.view.lineWasUpdated();
    }
    restartGame() {
        this.init();
    }
}
//# sourceMappingURL=game-controller.js.map