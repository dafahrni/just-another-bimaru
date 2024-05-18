import { expect } from "chai";
import { FieldFactory } from "../../../../src/scripts/models/board/field-factory.js";
import { CellValue } from "../../../../src/scripts/models/board/parts/cell-value.js";

describe("FieldBase", () => {

  const fieldText =
    "0 | . . . \n" +
    "3 | < □ > \n" +
    "0 | ~ . . \n" +
    "1 | . o . \n" +
    "    1 2 1";
  
  describe("#setPredefinedCells()", () => {
    it("should create field with ", () => {
      let testee = FieldFactory.parse(fieldText);

      testee.setPredefinedCells();

      const fixedCells = testee.getCellsWithFixedValue();
      expect(fixedCells.length).to.be.equal(5);
    });
  });

  describe("#setFixCellValue()", () => {
    it("should change cell value", () => {
      let value = CellValue.center;
      let testee = FieldFactory.from(3, 2);

      testee.setFixCellValue(2, 1, value);

      let cell = testee.getCell(2, 1);
      expect(cell.getValue()).to.be.equal(value);
    });
  });

  describe("#getRow()", () => {
    it("should create expected row", () => {
      let testee = FieldFactory.parse(fieldText);

      let row = testee.getRow(0);

      expect(row.asText()).to.be.equal("0 | . . .");
    });
  });

  describe("#getCol()", () => {
    it("should create expected col", () => {
      let testee = FieldFactory.parse(fieldText);

      let col = testee.getCol(1);

      expect(col.asText()).to.be.equal("2 | . □ . o");
    });
  });
});
