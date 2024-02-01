import { CellLine } from "../../js/models/cell-line.js";
import { Cell } from "../../js/models/cell.js";
import { expect } from "chai";

describe("#isHorizontalReturnsTrue()", () => {
  it("should return true when ...", () => {
    let text = "3 | . . . ~ . .";
    let line = CellLine.parse(text);
    let cells = line.getCells();

    expect(Cell.isHorizontal(cells)).to.be.true;
  });
});
