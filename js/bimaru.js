import { ShipCell } from "./ship-cell.js";

export class Bimaru {

  static generateBimaru(rows, cols) {
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {      
        const tile = ShipCell.create();
        const grid = document.getElementById("root")
        grid.appendChild(tile);
      }
    }
  }
}
