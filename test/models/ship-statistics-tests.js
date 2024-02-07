import { Field } from "../../js/models/field.js";
import { expect } from "chai";

describe("ShipStatistics", () => {
  const fieldText =
    "0 | . . . \n" +
    "3 | < □ > \n" +
    "0 | ~ . . \n" +
    "1 | . o . \n" +
    "    1 2 1";
  
  describe("#getAmount()", () => {
    it("should return expected ship amounts", () => {
      // given
      let field = Field.parse(fieldText);
      field.setDeterminedCells(field);
      let testee = field.getStatistics();

      // when + then
      expect(testee.getAmount(1)).to.be.equal(1);
      expect(testee.getAmount(2)).to.be.equal(0);
      expect(testee.getAmount(3)).to.be.equal(1);
      expect(testee.getAmount(4)).to.be.equal(0);
    });
  });
});
