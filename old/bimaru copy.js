import { ShipCell } from "./ship-cell.js";
import { createShipEle } from "./ship-cell-other.js";

const svgNamespace = "http://www.w3.org/2000/svg";

export class Bimaru {
  static createLabels(svg, ships, cellSize, svgWidth) {
    // Schiffslabels erstellen
    for (let i = 0; i < ships.length; i++) {
      const label = document.createElementNS(svgNamespace, "text");
      const x = svgWidth - 25;
      const y = (ships[i].y + 0.5 * ships[i].height) * cellSize;
      label.setAttribute("class", "ship-label");
      label.setAttribute("x", x); // Rechts neben dem Spielfeld
      label.setAttribute("y", y);
      label.textContent = i + 1; // Nummer des Schiffs
      svg.appendChild(label);
    }
  }

  static cellClickHandler(event) {
    // Überprüfen, ob die Zelle bereits ausgewählt ist
    const isSelected = event.target.classList.contains("selected");

    // Zellenklasse umschalten (auswählen/deselektieren)
    if (isSelected) {
      event.target.classList.remove("selected");
    } else {
      event.target.classList.add("selected");
    }
  }

  // Funktion zum Erstellen eines Bimaru-Spielfelds als SVG
  static generateBimaruSVG(rows, cols, ships) {
    const radius = 20;
    const cellSize = 2 * radius;
    const svgWidth = cols * cellSize;
    const svgHeight = rows * cellSize;
    const gap = 3;

    // SVG-Element erstellen
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    // Zellen erstellen
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = document.createElementNS(svgNamespace, "rect");
        cell.setAttribute("class", "cell");
        cell.setAttribute("width", cellSize);
        cell.setAttribute("height", cellSize);
        cell.setAttribute("x", col * cellSize);
        cell.setAttribute("y", row * cellSize);

        // Event-Handler für Klick hinzufügen
        cell.addEventListener("click", this.cellClickHandler);

        //const se = ShipCell.createShipEle();
        //cell.appendChild(se);

        svg.appendChild(cell);
      }
    }

    // Schiffe platzieren
    for (const ship of ships) {
      const se = createShipEle(ship, gap, radius, cellSize);
      svg.appendChild(se);
    }

    //this.createLabels(svg, ships, cellSize, svgWidth);

    // SVG zum Dokument hinzufügen
    document.body.appendChild(svg);
  }

  static generateBimaru(rows, cols, ships, radius = 20) {
    const cellSize = 2 * radius;
    const svgWidth = cols * cellSize;
    const svgHeight = rows * cellSize;
    const gap = 3;

    // SVG-Element erstellen
    //const svg = document.createElementNS(svgNamespace, "svg");
    //svg.setAttribute("width", svgWidth);
    //svg.setAttribute("height", svgHeight);

    // Zellen erstellen
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        //const cell = ShipCell.createCell();
        //cell.setAttribute("width", cellSize);
        //cell.setAttribute("height", cellSize);
        //cell.setAttribute("x", col * cellSize);
        //cell.setAttribute("y", row * cellSize);
        //svg.appendChild(cell);
        
        const tile = ShipCell.create();
        const grid = document.getElementById("grid1")
        grid.appendChild(tile);
      }
    }
  }

  static generateCells() {
    this.generateBimaru(2, 3, null, 50);
  }
}

// Funktion zum Erstellen des Rasters von Zellen
function createGrid() {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "grid");
  svg.setAttribute("width", "300");
  svg.setAttribute("height", "300");
  //document.body.appendChild(svg);
  const grid = document.getElementById("grid2");
  grid.appendChild(svg);

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var cell = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      cell.setAttribute("class", "cell");
      cell.setAttribute("x", j * 100);
      cell.setAttribute("y", i * 100);
      cell.setAttribute("width", "100");
      cell.setAttribute("height", "100");
      cell.setAttribute("fill", "white");
      svg.appendChild(cell);

      // Eventlistener für Klickereignisse hinzufügen
      cell.addEventListener("click", function (event) {
        const cell = event.target;
        if (!cell.classList.contains("cell")) {
          return;
        }
        // Markiere das ausgewählte Element
        cell.classList.toggle("selected");
        // Ändere den Inhalt des ausgewählten Elements
        if (cell.classList.contains("selected")) {
          // zufällige Auswahl zwischen Rechteck und Kreis
          var randomShape = Math.random() > 0.5 ? "rect" : "circle";
          var shape = document.createElementNS(
            "http://www.w3.org/2000/svg",
            randomShape
          );
          shape.setAttribute("pointer-events", "none");
          const x = cell.x.baseVal['value'];
          const y = cell.y.baseVal['value'];
          if (randomShape == "rect") {
            shape.setAttribute("x", x + 25);
            shape.setAttribute("y", y + 25);
            shape.setAttribute("width", "50");
            shape.setAttribute("height", "50");
          } else {
            shape.setAttribute("cx", x + 50);
            shape.setAttribute("cy", y + 50);
            shape.setAttribute("r", 25);
          }
          shape.setAttribute("fill", "black");
          svg.appendChild(shape);
        } else {
          // Entferne den Inhalt des nicht ausgewählten Elements
          svg.removeChild(svg.lastChild);
        }
      });
    }
  }
}

// Raster erstellen, wenn das Dokument geladen wurde
document.addEventListener("DOMContentLoaded", function () {
  createGrid();
});

// Beispiel: Bimaru-Spielfeld mit Schiffen erstellen
const bimaruShips = [
  { x: 1, y: 1, width: 3, height: 1 },
  { x: 5, y: 3, width: 1, height: 2 },
  { x: 2, y: 5, width: 2, height: 1 },
  { x: 1, y: 3, width: 1, height: 1 },
];

//createGrid();

Bimaru.generateCells();

//Bimaru.generateBimaru(8, 8);

//Bimaru.generateBimaruSVG(8, 8, bimaruShips);

/* ShipCell.createShip("<");
ShipCell.createShip(">");
ShipCell.createShip("^");
ShipCell.createShip("v");
 */
