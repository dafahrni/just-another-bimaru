import { GameView } from "./views/game-view.js";
import { GameModel } from "./models/game-model.js";
import { GameController} from "./controllers/game-controller.js";

const model = new GameModel();
const view = new GameView(model);
const controller = new GameController(model, view);
controller.run();

// TODO: create API with source for game definitions
// TODO: persist game definitions on local store
// TODO: create game definition editor
// TODO: play sound during the game (can be turned on/off)
// TODO: consider to correct ships when water is placed
// TODO: merge Game and GameModel
// TODO: create API with node.js and use Unit Tests in Postman
// TODO: implement scaling according to screen size
// TODO: document message flow of cell selection between view and model
// TODO: simplify naming (make it consistent, use same name for same things!)
//       - e.g. Grid, Field, Board, Bimaru
//       - e.g. Tile, Parent, Cell, CellElement, ShipCell
