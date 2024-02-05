import { GameView } from "./views/game-view.js";
import { GameModel } from "./models/game-model.js";
import { GameController} from "./controllers/game-controller.js";

const model = new GameModel();
const view = new GameView(model);
const controller = new GameController(model, view);
controller.run();

// TODO: change neighbors when placing a ship (take it from solver)
// TODO: change repository name to just-another-bimaru
// TODO: implement scaling according to screen size
// TODO: document message flow of cell selection between view and model
// TODO: make use of src folder
// TODO: change chip type according to placed water
// TODO: simplify naming (make it consistent, use same name for same things!)
//       - e.g. Grid, Field, Board, Bimaru
//       - e.g. Tile, Parent, Cell, CellElement, ShipCell
