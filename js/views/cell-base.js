export class CellBase {

  constructor(factor = 0.4) {
    this.svgNamespace = "http://www.w3.org/2000/svg";
    this.factor = factor;
    this.size = factor * 100;
    
    this.tile = document.createElementNS(this.svgNamespace, "svg");
    this.tile.setAttribute("class", "tile");
    this.tile.setAttribute("width", this.size);
    this.tile.setAttribute("height", this.size);
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
