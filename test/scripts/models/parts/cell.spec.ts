import { expect } from "chai";
import { Cell } from "../../../../src/scripts/models/parts/cell.js";
import { CellLine } from "../../../../src/scripts/models/parts/cell-line.js";

describe("Cell", () => {
  describe("#isHorizontalReturnsTrue()", () => {
    it("should return true", () => {
      let text = "3 | . . . ~ . .";
      let line = CellLine.parse(text);
      let cells = line.getCells();

      expect(Cell.isHorizontal(cells)).to.be.true;
    });
  });

  describe("#isShip()", () => {
    it("should return true", () => {
      // given
      let text = "7 | □ ^ > v < o s";
      let line = CellLine.parse(text);
      let cells = line.getCells();

      // when + then
      expect(cells[0].isShip()).to.be.true;
      expect(cells[1].isShip()).to.be.true;
      expect(cells[2].isShip()).to.be.true;
      expect(cells[3].isShip()).to.be.true;
      expect(cells[4].isShip()).to.be.true;
      expect(cells[5].isShip()).to.be.true;
      expect(cells[6].isShip()).to.be.true;
    });
  });

  describe("#isShip()", () => {
    it("should return false", () => {
      // given
      let text = "0 | . ~ x";
      let line = CellLine.parse(text);
      let cells = line.getCells();

      // when + then
      expect(cells[0].isShip()).to.be.false;
      expect(cells[1].isShip()).to.be.false;
      expect(cells[2].isShip()).to.be.false;
    });
  });
});
