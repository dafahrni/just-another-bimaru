import { expect } from "chai";
import { CellBlockFactory } from "../../../../src/scripts/models/parts/cell-block-factory.js";

describe("CellBlock", () => {
  describe("#getCenterCell()", () => {
    it("should return expected symbol", () => {
      let testee = CellBlockFactory.parse(
        ". ^ . \n" +
        "< □ > \n" +
        ". v o ");
      
      let center = testee.getCenterCell();

      expect(center.asSymbol()).to.be.equal("□");
    });
  });
  
  describe("#asText()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        ". ^ . \n" +
        "< □ > \n" +
        ". v o ");
      
      let text = testee.asText();

      expect(text).to.be.equal(
        ". ^ . \n" +
        "< □ > \n" +
        ". v o ");
    });
  });

  describe("#setCenter()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        "x s . \n" +
        "x s . \n" +
        "x s . "); 

      testee.setCenter();
      
      expect(testee.asText()).to.be.equal(
        "x s . \n" +
        "x □ . \n" +
        "x s . ");
    });
  });

  describe("#setSidesToWater()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        "x s . \n" +
        "x □ . \n" +
        "x s . "); 

      testee.setSidesToWater();
      
      expect(testee.asText()).to.be.equal(
        "x s . \n" +
        "x □ ~ \n" +
        "x s . ");
    });
  });

  describe("#setCenter()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        ". . . \n" +
        "s s s \n" +
        ". . . "); 

      testee.setCenter();
      
      expect(testee.asText()).to.be.equal(
        ". . . \n" +
        "s □ s \n" +
        ". . . ");
    });
  });

  describe("#setSidesToWater()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        ". . . \n" +
        "s □ s \n" +
        ". . . "); 

      testee.setSidesToWater();
      
      expect(testee.asText()).to.be.equal(
        ". ~ . \n" +
        "s □ s \n" +
        ". ~ . ");
    });
  });

  describe("#setCenter()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        ". ~ . \n" +
        "~ s ~ \n" +
        ". ~ . "); 

      testee.setCenter();
      
      expect(testee.asText()).to.be.equal(
        ". ~ . \n" +
        "~ o ~ \n" +
        ". ~ . ");
    });
  });

  describe("#setSidesToWater()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        ". . . \n" +
        ". o . \n" +
        ". . . "); 

      testee.setSidesToWater();
      
      expect(testee.asText()).to.be.equal(
        ". ~ . \n" +
        "~ o ~ \n" +
        ". ~ . ");
    });
  });

  describe("#setCenter()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        "x . . \n" +
        "x s s \n" +
        "x . . "); 

      testee.setCenter();
      
      expect(testee.asText()).to.be.equal(
        "x . . \n" +
        "x < s \n" +
        "x . . ");
    });
  });
  
  describe("#setSidesToWater()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        "x . . \n" +
        "x < s \n" +
        "x . . "); 

      testee.setSidesToWater();
      
      expect(testee.asText()).to.be.equal(
        "x ~ . \n" +
        "x < s \n" +
        "x ~ . ");
    });
  });

  describe("#correctCenter()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        "~ ~ x \n" +
        "< . x \n" +
        "~ ~ x "); 

      testee.correctCenter();
      
      expect(testee.asText()).to.be.equal(
        "~ ~ x \n" +
        "< > x \n" +
        "~ ~ x ");
    });
  });

  describe("#correctCenter()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        "~ ~ ~ \n" +
        "~ . □ \n" +
        "~ ~ ~ "); 

      testee.correctCenter();
      
      expect(testee.asText()).to.be.equal(
        "~ ~ ~ \n" +
        "~ < □ \n" +
        "~ ~ ~ ");
    });
  });

  describe("#correctSides()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        "~ . . \n" +
        "> s . \n" +
        "~ . . "); 

      testee.correctSides();
      
      expect(testee.asText()).to.be.equal(
        "~ . . \n" +
        "s s . \n" +
        "~ . . ");
    });
  });

  describe("#correctSides()", () => {
    it("should return expected text", () => {
      let testee = CellBlockFactory.parse(
        "~ . ~ \n" +
        ". □ . \n" +
        "~ ~ ~ "); 

      testee.correctSides();
      
      expect(testee.asText()).to.be.equal(
        "~ . ~ \n" +
        "s □ s \n" +
        "~ ~ ~ ");
    });
  });
});
