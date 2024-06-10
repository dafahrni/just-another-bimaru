import { CellBase } from "./cell-base.js";
export class CellLabel extends CellBase {
    constructor(size, value) {
        super(size);
        this.tile.setAttribute("class", "label");
        this.text = document.createElementNS(this.svgNamespace, "text");
        const text = this.text;
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("class", "label");
        this.changeText(`${value}`);
        var textWidth = text.getComputedTextLength();
        var textHeight = Math.round(size * 0.5);
        var centerX = this.tile.getAttribute("width") / 2 - textWidth / 2;
        var centerY = this.tile.getAttribute("height") / 2 + textHeight / 2;
        text.setAttribute("x", centerX - 2);
        text.setAttribute("y", centerY - 2);
        text.setAttribute("font-size", textHeight);
        text.setAttribute("pointer-events", "none");
        this.tile.appendChild(text);
    }
    changeText(content) {
        this.text.textContent = content;
    }
}
//# sourceMappingURL=cell-label.js.map