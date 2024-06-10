export class CellBase {
    constructor(size) {
        this.svgNamespace = "http://www.w3.org/2000/svg";
        this.factor = size / 100;
        this.size = size;
        this.tile = document.createElementNS(this.svgNamespace, "svg");
        this.tile.setAttribute("class", "tile");
        this.tile.setAttribute("width", `${this.size}`);
        this.tile.setAttribute("height", `${this.size}`);
    }
    getTile() {
        return this.tile;
    }
    scale(part) {
        const factor = this.factor;
        const attr = part.attributes["transform"];
        const attrValue = !attr
            ? `scale(${factor})`
            : attr.value.includes("scale")
                ? `${attr.value}`
                : `scale(${factor}) ${attr.value}`;
        part.setAttribute("transform", attrValue);
    }
}
//# sourceMappingURL=cell-base.js.map