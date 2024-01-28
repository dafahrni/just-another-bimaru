const factor = 0.5;

const ressources = {
  click: new Audio("resources/click.mp3"),
  clack: new Audio("resources/clack.mp3"),
  wrong: new Audio("resources/buzz.mp3"),
  bell: new Audio("resources/success.mp3"),
  draw: new Audio("resources/draw.mp3"),
};

export class ShipCell {
  static create() {
    const size = factor * 100;
    const svgNamespace = "http://www.w3.org/2000/svg";
    const tile = document.createElementNS(svgNamespace, "svg");
    tile.setAttribute("ch", "_");
    tile.setAttribute("class", "tile");
    tile.setAttribute("width", size);
    tile.setAttribute("height", size);

    const cell = document.createElementNS(svgNamespace, "rect");
    cell.setAttribute("class", "cell");
    cell.setAttribute("width", size);
    cell.setAttribute("height", size);
    tile.appendChild(cell);

    cell.addEventListener("click", ShipCell.cellClickHandler);

    ShipCell.selectCellType(tile, "_");

    return tile;
  }

  static cellClickHandler(event) {
    const cell = event.target;
    if (!cell.classList.contains("cell")) {
      return;
    }

    const tile = cell.parentNode;
    if (!tile.classList.contains("tile")) {
      return;
    }

    // Inhalt wechseln
    ShipCell.toggle(tile);

    ShipCell.playSound("click");
  }

  static playSound(key) {
    if (key in ressources) {
      ressources[key].play();
    }
  }

  static toggle(tile) {
    const ch = tile.getAttribute("ch");
    //const sequence = ["_", "~", "."];
    const sequence = ["_", "~", ".", "^", ">", "v", "<", "□", "o"];
    let i = (sequence.indexOf(ch) + 1) % sequence.length;
    ShipCell.selectCellType(tile, sequence[i]);
    return tile;
  }

  static selectCellType(tile, ch) {
    // alles löschen ausser den Hintergrund
    Array.from(tile.children)
      .filter((child) => !child.classList.contains("cell"))
      .forEach((child) => tile.removeChild(child));

    let part;
    switch (ch) {
      case "^":
        ShipCell.appendShip(tile, 0);
        break;
      case ">":
        ShipCell.appendShip(tile, 1);
        break;
      case "v":
        ShipCell.appendShip(tile, 2);
        break;
      case "<":
        ShipCell.appendShip(tile, 3);
        break;
      case "□":
        part = ShipCell.createMidPiece();
        tile.appendChild(part);
        break;
      case "o":
        ShipCell.appendSubmarine(tile);
        break;
      case ".":
        ShipCell.appendDot(tile);
        break;
      case "~":
        part = ShipCell.createWater();
        tile.appendChild(part);
        break;
      case "_":
      default:
        break;
    }

    tile.setAttribute("ch", ch);

    // Grösse anpassen
    Array.from(tile.children)
      .filter((child) => !child.classList.contains("cell"))
      .forEach((child) => ShipCell.scale(child));

    return tile;
  }

  static scale(part) {
    const attr = part.attributes["transform"];
    const attrValue = !attr
      ? `scale(${factor})`
      : attr.value.includes("scale")
      ? `${attr.value}`
      : `scale(${factor}) ${attr.value}`;
    part.setAttribute("transform", attrValue);
  }

  static createShipPart(type) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const part = document.createElementNS(svgNamespace, type);
    part.setAttribute("class", "ship");
    part.setAttribute("pointer-events", "none");
    return part;
  }

  static appendShip(tile, n) {
    // Rechteck erstellen
    const part1 = ShipCell.createShipPart("rect");
    part1.setAttribute("x", "10");
    part1.setAttribute("y", "48");
    part1.setAttribute("width", "80");
    part1.setAttribute("height", "42");
    tile.appendChild(part1);

    // Bogen erstellen
    const part2 = ShipCell.createShipPart("path");
    part2.setAttribute("d", "M10,50 A40,40 0 0,1 90,50");
    tile.appendChild(part2);

    const degree = 90 * (n % 4);
    tile.setAttribute("transform", `rotate(${degree})`);

    return tile;
  }

  static createMidPiece() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const midPiece = document.createElementNS(svgNamespace, "rect");
    midPiece.setAttribute("class", "ship");
    midPiece.setAttribute("pointer-events", "none");
    midPiece.setAttribute("x", "10");
    midPiece.setAttribute("y", "10");
    midPiece.setAttribute("width", "80");
    midPiece.setAttribute("height", "80");
    return midPiece;
  }

  static appendSubmarine(tile) {
    const submarine = ShipCell.createShipPart("circle");
    submarine.setAttribute("cx", "50");
    submarine.setAttribute("cy", "50");
    submarine.setAttribute("r", "40");
    tile.appendChild(submarine);
    return tile;
  }

  static appendDot(tile) {
    const dot = ShipCell.createShipPart("circle");
    dot.setAttribute("cx", "50");
    dot.setAttribute("cy", "50");
    dot.setAttribute("r", "10");
    tile.appendChild(dot);
    return tile;
  }

  static createWater() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const h2o = document.createElementNS(svgNamespace, "rect");
    h2o.setAttribute("class", "water");
    h2o.setAttribute("pointer-events", "none");
    h2o.setAttribute("x", "10");
    h2o.setAttribute("y", "10");
    h2o.setAttribute("width", "80");
    h2o.setAttribute("height", "80");
    return h2o;
  }
}
