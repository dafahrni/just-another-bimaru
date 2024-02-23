import { CellBlock } from "./cell-block.js";
import { CellValue } from "./cell-value.js";
import { Cell } from "./cell.js";
import { Position } from "./position.js";
import { FieldBase } from "../field-base.js";

export class CellBlockFactory {

  static parse(text: string) {
    const lines = text.replace(/ /g, "").split("\n");
    const sizeY = lines.length;
    const sizeX = lines[0].length;
    const cells = [];
    for (let y = 0; y < sizeY; y++) {
      let row = lines[y];
      for (let x = 0; x < sizeX; x++) {
        let symbol = row[x];
        let value = CellValue.from(symbol);
        cells.push(new Cell(new Position(x, y), value));
      }
    }
    const c = cells;
    return new CellBlock(c[4], [ c[0], c[1], c[2], c[5], c[8], c[7], c[6], c[3] ]);
  }

  static from(centerCell: Cell, field: FieldBase) {
    // a b c
    // h . d
    // g f e
    const neighborCoordinates = [
      { x: (x: number) => x - 1, y: (y: number) => y - 1 }, // a
      { x: (x: number) => x    , y: (y: number) => y - 1 }, // north
      { x: (x: number) => x + 1, y: (y: number) => y - 1 }, // c
      { x: (x: number) => x + 1, y: (y: number) => y     }, // east
      { x: (x: number) => x + 1, y: (y: number) => y + 1 }, // e
      { x: (x: number) => x    , y: (y: number) => y + 1 }, // south
      { x: (x: number) => x - 1, y: (y: number) => y + 1 }, // g
      { x: (x: number) => x - 1, y: (y: number) => y     }, // west
    ];

    const cx = centerCell.getX();
    const cy = centerCell.getY();

    const neighborCells = neighborCoordinates.map((coord) => {
      const x = coord.x(cx);
      const y = coord.y(cy);
      return field.getCell(x, y);
    });

    return new CellBlock(centerCell, neighborCells);
  }
}
