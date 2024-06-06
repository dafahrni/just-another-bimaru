import { CellBase } from "./cell-base.js";

export class CellLabel extends CellBase {

  text: any;
  
  constructor(size: number, shipCount: number) {
    super(size);

    this.tile.setAttribute("class", "label");
    
    // SVG-text erstellen
    this.text = document.createElementNS(this.svgNamespace, "text");
    const text = this.text;
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("class", "label");

    this.changeText(`${shipCount}`);

    // Text Positionierung
    var textWidth = text.getComputedTextLength();
    var textHeight = this.factor * 32;
    var centerX = this.tile.getAttribute("width") / 2 - textWidth / 2;
    var centerY = this.tile.getAttribute("height") / 2 + textHeight / 2;
    text.setAttribute("x", centerX - 2);
    text.setAttribute("y", centerY - 2);
    text.setAttribute("font-size", textHeight);
    text.setAttribute("pointer-events", "none");

    this.tile.appendChild(text);
  }

  changeText(content: string) {
    this.text.textContent = content;
  }
}
