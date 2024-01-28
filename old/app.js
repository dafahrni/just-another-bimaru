import { GameView } from "./views/game-view.js";
import { GameModel } from "./models/game-model.js";
import  { GameController} from "./controllers/game-controller.js";

const model = new GameModel(4);
const view = new GameView(model);
const controller = new GameController(model, view);
controller.run();
