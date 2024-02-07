import { CellBlock } from "../../js/models/cell-block.js";
import { Field } from "../../js/models/field.js";
import { expect } from "chai";

describe("CellBlock", () => {
  describe("#asText()", () => {
    it("should return expected text", () => {
      // given
      let field = Field.parse(
        "1 | . ^ . \n" +
        "3 | < □ > \n" +
        "2 | . v o \n" +
        "    1 3 2"); 
      let center = field.getCell(1, 1);
      let testee = center.getBlock();
      
      // when + then
      expect(testee.asText()).to.be.equal(
        ". ^ . \n" +
        "< □ > \n"+
        ". v o");
    });
  });
});
