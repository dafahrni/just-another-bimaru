import { CellBlock } from "./cell-block.js";
import { CellValue } from "./cell-value.js";
import { Cell } from "./cell.js";
import { Position } from "./position.js";

export class CellBlockFactory {

  static parse(text) {
    const lines = text.replace(/ /g, "").split("\n");
    const sizeY = lines.length - 1;
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

  static from(centerCell, field) {
    // a b c
    // h . d
    // g f e
    const neighborCordinates = {
      a: { x: (x) => x - 1, y: (y) => y - 1 }, // a
      b: { x: (x) => x + 0, y: (y) => y - 1 }, // north
      c: { x: (x) => x + 1, y: (y) => y - 1 }, // c
      d: { x: (x) => x + 1, y: (y) => y - 0 }, // east
      e: { x: (x) => x + 1, y: (y) => y + 1 }, // e
      f: { x: (x) => x - 0, y: (y) => y + 1 }, // south
      g: { x: (x) => x - 1, y: (y) => y + 1 }, // g
      h: { x: (x) => x - 1, y: (y) => y + 0 }, // west
    };
/*
    // 0 1 2
    // 3 4 5
    // 6 7 8
    const coordinates = [
      { x: (x) => x - 1, y: (y) => y - 1 }, // 0
      { x: (x) => x    , y: (y) => y - 1 }, // 1
      { x: (x) => x + 1, y: (y) => y - 1 }, // 2
      { x: (x) => x - 1, y: (y) => y     }, // 3
      { x: (x) => x    , y: (y) => y     }, // 4
      { x: (x) => x + 1, y: (y) => y     }, // 5
      { x: (x) => x - 1, y: (y) => y + 1 }, // 6
      { x: (x) => x    , y: (y) => y + 1 }, // 7
      { x: (x) => x + 1, y: (y) => y + 1 }, // 8
    ];
*/
    const cx = centerCell.getX();
    const cy = centerCell.getY();

    const neighborsMap = {};

    Object.entries(neighborCordinates).map(([key, value]) => {
      const x = value.x(cx);
      const y = value.y(cy);
      neighborsMap[key] = field.getCell(x, y);
    });

    return new CellBlock(centerCell, neighborsMap);
  }
}
