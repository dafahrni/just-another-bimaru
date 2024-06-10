import { CellBlock } from "./cell-block.js";
import { CellValue } from "./cell-value.js";
import { Cell } from "./cell.js";
import { Position } from "./position.js";
export class CellBlockFactory {
    static parse(text) {
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
        return new CellBlock(c[4], [
            c[0],
            c[1],
            c[2],
            c[5],
            c[8],
            c[7],
            c[6],
            c[3],
        ]);
    }
    static from(centerCell, field) {
        // a b c
        // h . d
        // g f e
        const neighborCoordinates = [
            { x: (x) => x - 1, y: (y) => y - 1 }, // a
            { x: (x) => x, y: (y) => y - 1 }, // north
            { x: (x) => x + 1, y: (y) => y - 1 }, // c
            { x: (x) => x + 1, y: (y) => y }, // east
            { x: (x) => x + 1, y: (y) => y + 1 }, // e
            { x: (x) => x, y: (y) => y + 1 }, // south
            { x: (x) => x - 1, y: (y) => y + 1 }, // g
            { x: (x) => x - 1, y: (y) => y }, // west
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
//# sourceMappingURL=cell-block-factory.js.map