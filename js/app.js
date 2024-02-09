import { GameView } from "./views/game-view.js";
import { GameModel } from "./models/game-model.js";
import { GameController} from "./controllers/game-controller.js";

const model = new GameModel();
const view = new GameView(model);
const controller = new GameController(model, view);
controller.run();

// TODO: merge Game and GameModel
// TODO: create API with node.js and use Unit Tests in Postman
// TODO: detect when game is won
// TODO: change ship parts according to neighborhood
// TODO: change neighbors when placing a ship (take it from solver)
// TODO: implement scaling according to screen size
// TODO: document message flow of cell selection between view and model
// TODO: make use of src folder
// TODO: simplify naming (make it consistent, use same name for same things!)
//       - e.g. Grid, Field, Board, Bimaru
//       - e.g. Tile, Parent, Cell, CellElement, ShipCell
