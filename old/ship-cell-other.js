const svgNamespace = "http://www.w3.org/2000/svg";

export function createShipEle(ship, gap, radius, cellSize) {
  const shipElement = document.createElementNS(svgNamespace, "rect");
  shipElement.setAttribute("class", "ship");
  shipElement.setAttribute("pointer-events", "none");
  shipElement.setAttribute("width", ship.width * cellSize - 2 * gap);
  shipElement.setAttribute("height", ship.height * cellSize - 2 * gap);
  shipElement.setAttribute("x", ship.x * cellSize + gap);
  shipElement.setAttribute("y", ship.y * cellSize + gap);
  shipElement.setAttribute("rx", radius - gap); // Radius für abgerundete Ecken
  shipElement.setAttribute("ry", radius - gap);

  return shipElement;
}

export function createShipEleNew(ship, gap, radius, cellSize) {
  // SVG-Element erstellen
  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("class", "ship");
  svg.setAttribute("pointer-events", "none");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  // Rechteck erstellen
  const part1 = document.createElementNS(svgNamespace, "rect");
  part1.setAttribute("x", "10");
  part1.setAttribute("y", "48");
  part1.setAttribute("width", "80");
  part1.setAttribute("height", "42");
  part1.setAttribute("fill", "organe");
  svg.appendChild(part1);

  // Bogen erstellen
  const part2 = document.createElementNS(svgNamespace, "path");
  part2.setAttribute("d", "M10,50 A40,40 0 0,1 90,50");
  svg.appendChild(part2);

  return svg;
}
