export class CellBase {
  protected svgNamespace: string;
  protected factor: number;
  protected size: number;
  protected tile: any;

  constructor(size: number) {
    this.svgNamespace = "http://www.w3.org/2000/svg";
    this.factor = size / 100;
    this.size = size;

    this.tile = document.createElementNS(this.svgNamespace, "svg");
    this.tile.setAttribute("class", "tile");
    this.tile.setAttribute("width", `${this.size}`);
    this.tile.setAttribute("height", `${this.size}`);
  }

  getTile(): HTMLElement {
    return this.tile;
  }

  scale(part: any) {
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
