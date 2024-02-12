import { GameView } from "./views/game-view.js";
import { GameModel } from "./models/game-model.js";
import { GameController} from "./controllers/game-controller.js";

export class App {
    
    private model: GameModel;
    private view: GameView;
    private controller: GameController;

    constructor() {
        this.model = new GameModel();
        this.view = new GameView(this.model);
        this.controller = new GameController(this.model, this.view);
    }

    public run(): void {
        this.controller.run();
    }
}

new App();

// F E A T U R E S
// ---------------
// TODO: allocate player name and date with the game
// TODO: keep history of game (e.g. to navigate between the moves or for speed analysis)
// TODO: create API with source for game definitions
// TODO: persist game definitions on local store
// TODO: check edited game with solver if valid
// TODO: create game definition editor
// TODO: play sound during the game (can be turned on/off)
// TODO: consider to correct ships when water is placed
// TODO: create API with node.js and use Unit Tests in Postman
// TODO: implement scaling according to screen size

// I S S U E S
// -----------
// TODO: usage of ship rotation also rotates water tiles accidentally
// TODO: placement of water tiles does not correct ships with direction
// TODO: placement of tiles should be as free as possible (keep the flow in the game)
// TODO: placement of lines with water only when line is fullfilled (has √ mark)

// I M P R O V E M E N T S
// -----------------------
// TODO: enable debugging in TS files with source mapping
// TODO: document message flow of cell selection between view and model
// TODO: merge Game and GameModel
// TODO: simplify naming (make it consistent, use same name for same things!)
//       - e.g. Grid, Field, Board, Bimaru
//       - e.g. Tile, Parent, Cell, CellElement, ShipCell
