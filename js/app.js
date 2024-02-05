import { GameView } from "./views/game-view.js";
import { GameModel } from "./models/game-model.js";
import { GameController} from "./controllers/game-controller.js";

const model = new GameModel();
const view = new GameView(model);
const controller = new GameController(model, view);
controller.run();

// TODO: change chip type according to placed water
// TODO: implement consistent naming (avoid different names for basically the same thing!)
//       - e.g. Grid, Field, Board, Bimaru
//       - e.g. Tile, Parent, Cell, CellElement, ShipCell
