import { GameView } from "./views/game-view.js";
import { GameModel } from "./models/game-model.js";
import { GameController} from "./controllers/game-controller.js";

const rowShipCount = [1, 2, 1, 0, 1, 2];
const colShipCount = [3, 0, 1, 0, 0, 1];
const model = new GameModel(
    rowShipCount,
    colShipCount);
const view = new GameView(model);
const controller = new GameController(model, view);
controller.run();

// TODO: Model erweitern
// TODO: Unit Testing
