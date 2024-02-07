import { CellValue } from "../../js/models/cell-value.js";
import { Field } from "../../js/models/field.js";
import { expect } from "chai";

describe("Field", () => {
  describe("#setFixCellValue()", () => {
    it("should change cell value", () => {
      let value = CellValue.center;
      let testee = Field.from(3, 2);

      testee.setFixCellValue(2, 1, value);

      expect(testee.getCellValue(2, 1)).to.be.equal(value);
    });
  });

  const fieldText =
    "0 | . . . \n" +
    "3 | < □ > \n" +
    "0 | ~ . . \n" +
    "1 | . o . \n" +
    "    1 2 1";

  describe("#parse()", () => {
    it("should create expected field", () => {
      let expected = fieldText;

      let testee = Field.parse(expected);

      expect(testee.asText()).to.be.equal(expected);
    });
  });

  describe("#getRow()", () => {
    it("should create expected row", () => {
      let testee = Field.parse(fieldText);

      let row = testee.getRow(0);

      expect(row.asText()).to.be.equal("0 | . . .");
    });
  });

  describe("#getCol()", () => {
    it("should create expected col", () => {
      let testee = Field.parse(fieldText);

      let col = testee.getCol(1);

      expect(col.asText()).to.be.equal("2 | . □ . o");
    });
  });

  describe("#getAmount()", () => {
    const testCases = [
      { shipSize: 0, expectedError: Error },
      { shipSize: 5, expectedError: Error },
    ];
    testCases.forEach((tc) => {
      it(`should throw error when invoked with ${tc.shipSize}`, () => {
        // given
        let testee = Field.parse(fieldText);
        testee.setDeterminedCells();
        let statistics = testee.getStatistics();

        // when + then
        expect(() => statistics.getAmount(tc.shipSize)).to.throw(
          tc.expectedException
        );
      });
    });
  });

  const fieldText2 =
    "3 | < □ > \n" +
    "0 | . . . \n" +
    "1 | ^ . . \n" +
    "2 | v . o \n" +
    "    3 1 2";

  describe("#symbolsToTheEastAre()", () => {
    it("should return true when invoked with <□>", () => {
      let testee = Field.parse(fieldText2);
      let cell = testee.getCell(0, 0);

      let result = testee.symbolsToTheEastAre(cell, "<□>");

      expect(result).to.be.true;
    });
  });

  describe("#symbolsToTheSouthAre()", () => {
    it("should return true when invoked with ^v", () => {
      let testee = Field.parse(fieldText2);
      let cell = testee.getCell(0, 2);

      let result = testee.symbolsToTheSouthAre(cell, "^v");

      expect(result).to.be.true;
    });
  });
});
