import { ElementBuilder } from "./element-builder.js";
import { SvgGenerator } from "./svg-generator.js";

export class Board {
    constructor(model) {
      this._tiles = Array(model.size);
      this._selectedTile = null;
      this._notifySelectionChanged = null;
      this._model = model;
      this._setupHtml();
    }
  
    bindSelectionChanged(handler) {
      this._notifySelectionChanged = handler;
    }
  
    updateSelectedTile() {
      if (this._selectedTile) {
        this._update(this._selectedTile);
      }
    }
  
    updateAll() {
      this._tiles.forEach((tile) => {
        this._update(tile);
      });
      this._selectedTile = null;
    }
  
    _setupHtml() {
      const root = document.getElementById("root");
      const container = new ElementBuilder("div")
        .setClass("game-container")
        .appendTo(root)
        .addListener("click", this._tileSelected.bind(this))
        .getResult();
      for (let i = 0; i < this._tiles.length; i++) {
        this._tiles[i] = new ElementBuilder("div")
          .setClass("tile")
          .setContent(this._generateSvg())
          .appendTo(container)
          .getResult();
      }
      const side = this._model.side;
      container.style.gridTemplateColumns = `repeat(${side}, 1fr)`;
    }
  
    _tileSelected(event) {
      const selectedTile = event.target.closest(".tile");
      if (!selectedTile) {
        return;
      }
  
      this._selectedTile = selectedTile;
  
      if (this._notifySelectionChanged) {
        const index = this._indexOf(this._selectedTile);
        this._notifySelectionChanged(index);
      }
    }
  
    _update(tile) {
      const index = this._indexOf(tile);
      const value = this._model.readCell(index);
      const svg = this._generateSvg(value);
      tile.replaceChild(svg, tile.firstChild);
    }
  
    _indexOf(tile) {
      return this._tiles.indexOf(tile);
    }
  
    _generateSvg(value = ".") {
      const generator = new SvgGenerator();
      const color = value === "X" ? "red" : "blue";
      switch (value) {
        case "X":
          return generator.generateX(color);
        case "O":
          return generator.generateO(color);
        default:
          return generator.generateDefault();
      }
    }
  }
