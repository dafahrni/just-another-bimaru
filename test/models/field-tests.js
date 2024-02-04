import { CellValue } from "../../js/models/cell-value.js";
import { Field } from "../../js/models/field.js";
import { Solver } from "../../js/models/solver.js";
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

  describe("#symbolsToTheEastAre()", () => {
    it("should return true when invoked with <□>", () => {
      let testee = Field.parse(fieldText);
      let cell = testee.getCell(0, 0);

      let result = testee.symbolsToTheEastAre(cell, "<□>");

      expect(result).to.be.true;
    });
  });

  describe("#getAmount()", () => {
    const testCases = [
      { shipSize: 0, expectedError: Error },
      { shipSize: 5, expectedError: Error },
    ];
    testCases.forEach((tc) => {
      it(`should throw ${tc.expectedException} when invoked with ${tc.shipSize}`, () => {
        // given
        let testee = Field.parse(fieldText);
        //console.log(testee.toString());
        Solver.setDeterminedCells(testee);
        //console.log(testee.toString());
        let statistics = testee.getShipStatistics();

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

  describe("#symbolsToTheSouthAre()", () => {
    it("should return true when invoked with ^v", () => {
      let testee = Field.parse(fieldText2);
      let cell = testee.getCell(0, 2);

      let result = testee.symbolsToTheSouthAre(cell, "^v");

      expect(result).to.be.true;
    });
  });

  describe("#getShipStatistics()", () => {
    it("should return expected ship amounts", () => {
      // given
      let testee = Field.parse(fieldText2);
      console.log(testee.toString());
      Solver.setDeterminedCells(testee);
      console.log(testee.toString());

      // when
      let statistics = testee.getShipStatistics();

      // then
      expect(statistics.getAmount(1)).to.be.equal(1);
      expect(statistics.getAmount(2)).to.be.equal(0);
      expect(statistics.getAmount(3)).to.be.equal(1);
      expect(statistics.getAmount(4)).to.be.equal(0);
    });
  });
});
