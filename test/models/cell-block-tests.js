import { FieldFactory } from "../../js/models/field-factory.js";
import { expect } from "chai";

describe("CellBlock", () => {
  describe("#asText()", () => {
    it("should return expected text", () => {
      // given
      let field = FieldFactory.parse(
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
