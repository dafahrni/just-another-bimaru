import { CellBase } from "./cell-base.js";

export class CellLabel extends CellBase {
  
  constructor(shipCount) {
    super();

    this.tile.setAttribute("class", "label");
    
    // SVG-text erstellen
    this.text = document.createElementNS(this.svgNamespace, "text");
    const text = this.text;
    text.setAttribute("class", "label");
    text.textContent = shipCount;

    // Text Positionierung
    var textWidth = text.getComputedTextLength();
    var textHeight = this.factor * 24;
    var centerX = this.tile.getAttribute("width") / 2 - textWidth / 2;
    var centerY = this.tile.getAttribute("height") / 2 + textHeight / 2;
    text.setAttribute("x", centerX - 2);
    text.setAttribute("y", centerY - 2);
    text.setAttribute("font-size", textHeight);

    this.tile.appendChild(text);

    text.addEventListener("click", this.labelClickHandler);
  }

  labelClickHandler(event) {
    // Zeile mit Wasser füllen
  }
}