import { GameView } from "./views/game-view.js";
import { GameModel } from "./models/game-model.js";
import { GameController} from "./controllers/game-controller.js";

export class App {
    
    private model: GameModel;
    private view: GameView;
    private controller: GameController;

    constructor() {
        this.model = new GameModel();
        this.view = new GameView();
        this.controller = new GameController(this.model, this.view);
    }

    public init(): void {
        this.controller.init();
    }

    public run(): void {
        this.controller.run();
    }
}

new App().init();

// F E A T U R E S
// ---------------
// TODO: draw ships to find and keep statistics (4-1, 3-2, etc.)
// TODO: add splash screen with sound
// TODO: allocate player name and date with the game
// TODO: keep history of game (e.g. to navigate between the moves or for speed analysis)
// TODO: persist game definitions on local store
// TODO: check edited game with solver if valid
// TODO: create game definition editor
// TODO: play sound during the game (can be turned on/off)
// TODO: create API with source for game definitions
// TODO: create API with node.js and use Unit Tests in Postman
// TODO: implement scaling according to screen size
// TODO: provide VUI for accoustic game control

// I S S U E S
// -----------
// TODO: consider to correct ships when water is placed
// TODO: placement of water tiles does not correct ships with direction
// TODO: placement of tiles should be as free as possible (keep the flow in the game)

// I M P R O V E M E N T S
// -----------------------
// TODO: consider to provide DtoFactory as Singleton to avoid static dependencies
// TODO: document message flow of cell selection between view and model
// TODO: merge Game and GameModel
// TODO: simplify naming (make it consistent, use same name for same things!)
//       - e.g. Grid, Field, Board, Bimaru
//       - e.g. Tile, Parent, Cell, CellElement, ShipCell
//       - e.g. CellType, Symbol, ch, Value

// V I E W - C O N C E P T
// -----------------------
// The game-view containes all view elements, such as menu, options, board, edit-view etc.
// To enter e new GameDefinition, the edit-view requires some input forms and the board to 
// display the user's inputs in order to provide some sort of feedback to the user. 
// Those forms could be placed in a configuration-view on the right side of the screen 
// (similar to the menu-view on the left side).
// The board, therefore, must distinguish between game-mode and edit-mode.

// FUI (=flow of user interactions, wizard steps)
// 1. definition of grid size (offer: 8..12, default: 10)
// 2. entering of ship amounts (offer only default, readonly)
// 3. entering of row targets (offer: 0..8, default: 0)
// 4. entering of col targets (offer: 0..8, default: 0)
// 5. entering of predefined cells (select in grid)

// TODO: take-over swipe stuff from menu-view for config-view
// TODO: implement FUI (should be mix between modal dialog and selection in grid)
// TODO: use background color to avoid confusion between game and edit view
// TODO: use bread crumbs to show the steps of the during FUI in the wizard
// TODO: navigation between pages/views via button menu (access via slide)
// TODO: there should be only 1 MVC per page, every page consists of
//       - model, i.e. GameModel, EditModel
//       - view, i.e. GameView, EditView
//       - controller, i.e. GameCntr, EditCntr
