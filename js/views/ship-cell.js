import { CellBase } from "./cell-base.js";

export class ShipCell extends CellBase {

  constructor() {
    super();
    
    this.cell = document.createElementNS(this.svgNamespace, "rect");
    this.cell.setAttribute("class", "cell");
    this.cell.setAttribute("width", this.size);
    this.cell.setAttribute("height", this.size);
    this.tile.appendChild(this.cell);

    this.cell.addEventListener("click", (event) => this.cellClickHandler(event));

    this.tile.setAttribute("ch", "_");
    this.selectCellType("_");
  }

  cellClickHandler(event) {
    const cell = event.target;
    if (!cell.classList.contains("cell")) {
      return;
    }

    const tile = cell.parentNode;
    if (!tile.classList.contains("tile")) {
      return;
    }

    this.toggle();
  }

  toggle() {
    const ch = this.tile.getAttribute("ch");
    const sequence = ["_", "~", "."];
    //const sequence = ["_", "~", ".", "^", ">", "v", "<", "□", "o"];
    let i = (sequence.indexOf(ch) + 1) % sequence.length;
    this.selectCellType(sequence[i]);
  }

  selectCellType(ch) {
    // alles löschen ausser den Hintergrund
    Array.from(this.tile.children)
      .filter((child) => !child.classList.contains("cell"))
      .forEach((child) => this.tile.removeChild(child));

    let part;
    switch (ch) {
      case "^":
        this.appendShip(0);
        break;
      case ">":
        this.appendShip(1);
        break;
      case "v":
        this.appendShip(2);
        break;
      case "<":
        this.appendShip(3);
        break;
      case "□":
        part = this.createMidPiece();
        this.tile.appendChild(part);
        break;
      case "o":
        this.appendSubmarine();
        break;
      case ".":
        this.appendDot();
        break;
      case "~":
        part = this.createWater();
        this.tile.appendChild(part);
        break;
      case "_":
      default:
        break;
    }

    this.tile.setAttribute("ch", ch);

    // Grösse anpassen
    Array.from(this.tile.children)
      .filter((child) => !child.classList.contains("cell"))
      .forEach((child) => this.scale(child));
  }

  createShipPart(type) {
    const part = document.createElementNS(this.svgNamespace, type);
    part.setAttribute("class", "ship");
    part.setAttribute("pointer-events", "none");
    return part;
  }

  appendShip(n) {
    // Rechteck erstellen
    const part1 = this.createShipPart("rect");
    part1.setAttribute("x", "10");
    part1.setAttribute("y", "48");
    part1.setAttribute("width", "80");
    part1.setAttribute("height", "42");
    this.tile.appendChild(part1);

    // Bogen erstellen
    const part2 = this.createShipPart("path");
    part2.setAttribute("d", "M10,50 A40,40 0 0,1 90,50");
    this.tile.appendChild(part2);

    const degree = 90 * (n % 4);
    this.tile.setAttribute("transform", `rotate(${degree})`);
  }

  createMidPiece() {
    const midPiece = document.createElementNS(this.svgNamespace, "rect");
    midPiece.setAttribute("class", "ship");
    midPiece.setAttribute("pointer-events", "none");
    midPiece.setAttribute("x", "10");
    midPiece.setAttribute("y", "10");
    midPiece.setAttribute("width", "80");
    midPiece.setAttribute("height", "80");
    return midPiece;
  }

  appendSubmarine() {
    const submarine = this.createShipPart("circle");
    submarine.setAttribute("cx", "50");
    submarine.setAttribute("cy", "50");
    submarine.setAttribute("r", "40");
    this.tile.appendChild(submarine);
  }

  appendDot() {
    const dot = this.createShipPart("circle");
    dot.setAttribute("cx", "50");
    dot.setAttribute("cy", "50");
    dot.setAttribute("r", "10");
    this.tile.appendChild(dot);
  }

  createWater() {
    const h2o = document.createElementNS(this.svgNamespace, "rect");
    h2o.setAttribute("class", "water");
    h2o.setAttribute("pointer-events", "none");
    h2o.setAttribute("x", "10");
    h2o.setAttribute("y", "10");
    h2o.setAttribute("width", "80");
    h2o.setAttribute("height", "80");
    return h2o;
  }
}
