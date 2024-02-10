import { CellBlockFactory } from "../../../../js/models/board/parts/cell-block-factory.js";
import { expect } from "chai";

describe("CellBlock", () => {
  describe("#getCenterCell()", () => {
    it("should return expected symbol", () => {
      let testee = CellBlockFactory.parse(
        ". ^ . \n" +
        "< □ > \n" +
        ". v o \n");
      
      let center = testee.getCenterCell();

      expect(center.asSymbol()).to.be.equal("□");
    });
  });
  
  describe("#asText()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        ". ^ . \n" +
        "< □ > \n" +
        ". v o \n");
      
      let text = testee.asText();

      expect(text).to.be.equal(
        ". ^ . \n" +
        "< □ > \n"+
        ". v o");
    });
  });

  describe("#asText()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        ". s . \n" +
        ". s . \n" +
        ". s . \n"); 

      testee.setCenterWhenShipHasDirection();
      
      expect(testee.asText()).to.be.equal(
        ". s . \n" +
        ". □ . \n"+
        ". s .");
    });
  });
});
