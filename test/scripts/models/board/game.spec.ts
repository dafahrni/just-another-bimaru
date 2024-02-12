import { expect } from "chai";
import { Game } from "../../../../src/scripts/models/board/game.js";
import { FieldFactory } from "../../../../src/scripts/models/board/field-factory.js";

describe("Game", () => {
  
  describe("#setDeterminedCells()", () => {
    it("should produce expected field", () => {
      let testee = new Game(FieldFactory.parse(
        "0 | . . . \n" +
        "3 | < □ > \n" +
        "0 | ~ . . \n" +
        "1 | . o . \n" +
        "    1 2 1"
      ));
      
      testee.setDeterminedCells();

      expect(testee.asText()).to.be.equal(
        "√ | ~ ~ ~ \n" +
        "√ | < □ > \n" +
        "√ | ~ ~ ~ \n" +
        "√ | ~ o ~ \n" +
        "    √ √ √"        
      );
    });
  });

  describe("#setDeterminedCells()", () => {
    it("should produce expected field", () => {
      let testee = new Game(FieldFactory.parse(
        "1 | . . . . ^ \n" +
        "4 | < □ > . □ \n" +
        "1 | . . . . v \n" +
        "1 | . . . . . \n" +
        "    1 2 1 0 3"
      ));

      testee.setDeterminedCells();

      expect(testee.asText()).to.be.equal(
        "√ | ~ ~ ~ ~ ^ \n" +
        "√ | < □ > ~ □ \n" +
        "√ | ~ ~ ~ ~ v \n" +
        "1 | ~ . ~ ~ ~ \n" +
        "    √ 2 √ √ √"
      );
    });
  });

  describe("#setEmptyCellsOfAllFullLinesToWater()", () => {
    it("should produce expected field", () => {
      let testee = new Game(FieldFactory.parse(
        "1 | . . . . . . . . . . \n" +
        "2 | . . . . . . . . . . \n" +
        "3 | . . . . . . . . . . \n" +
        "3 | . . . . . . . . □ . \n" +
        "0 | . . . . . . . . . . \n" +
        "4 | . . . . . . . . . . \n" +
        "1 | . . . . . . . . . . \n" +
        "3 | . ^ . . . . . . . . \n" +
        "2 | . . . . . . . . v . \n" +
        "1 | . . . . . . . . . . \n" +
        "    1 6 1 1 2 0 3 1 3 2"
      ));

      testee.setEmptyCellsOfAllFullLinesToWater();

      expect(testee.asText()).to.be.equal(
        "1 | . . . . . ~ . . . . \n" +
        "2 | . . . . . ~ . . . . \n" +
        "3 | . . . . . ~ . . . . \n" +
        "3 | . . . . . ~ . . □ . \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "4 | . . . . . ~ . . . . \n" +
        "1 | . . . . . ~ . . . . \n" +
        "3 | . ^ . . . ~ . . . . \n" +
        "2 | . . . . . ~ . . v . \n" +
        "1 | . . . . . ~ . . . . \n" +
        "    1 6 1 1 2 √ 3 1 3 2"
      );
    });
  });

  describe("#setPossibleBlockParts()", () => {
    it("should produce expected field", () => {
      let testee = new Game(FieldFactory.parse(
        "1 | . . . . . ~ . . . . \n" +
        "2 | . . . . . ~ . . . . \n" +
        "3 | . . . . . ~ . . . . \n" +
        "3 | . . . . . ~ . . □ . \n" +
        "0 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "4 | . . . . . ~ . . . . \n" +
        "1 | . . . . . ~ . . . . \n" +
        "3 | . ^ . . . ~ . . . . \n" +
        "2 | . . . . . ~ . . v . \n" +
        "1 | . . . . . ~ . . . . \n" +
        "    1 6 1 1 2 0 3 1 3 2"
      ));

      testee.setPossibleBlockParts();

      expect(testee.asText()).to.be.equal(
        "1 | . . . . . ~ . . . . \n" +
        "2 | . . . . . ~ . . . . \n" +
        "3 | . . . . . ~ . ~ . ~ \n" +
        "3 | . . . . . ~ . . □ . \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "4 | . . . . . ~ . . . . \n" +
        "1 | ~ ~ ~ . . ~ . . . . \n" +
        "3 | ~ ^ ~ . . ~ . ~ . ~ \n" +
        "2 | ~ . ~ . . ~ . ~ v ~ \n" +
        "1 | . . . . . ~ . ~ ~ ~ \n" +
        "    1 6 1 1 2 √ 3 1 3 2"
      );
    });
  });

  describe("#setPossibleBlockParts()", () => {
    it("should produce expected field", () => {
      let testee = new Game(FieldFactory.parse(
        "1 | . . . . . ~ . . . . \n" +
        "2 | . . . . . ~ . . . . \n" +
        "3 | . . . . . ~ . ~ . ~ \n" +
        "3 | . . . . . ~ . . □ . \n" +
        "0 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "4 | . . . . . ~ . . . . \n" +
        "1 | ~ ~ ~ . . ~ . . . . \n" +
        "3 | ~ ^ ~ . . ~ . ~ . ~ \n" +
        "2 | ~ . ~ . . ~ . ~ v ~ \n" +
        "1 | . . . . . ~ . ~ ~ ~ \n" +
        "    1 6 1 1 2 0 3 1 3 2"
      ));

      testee.correctCenters();

      expect(testee.asText()).to.be.equal(
        "1 | . . . . . ~ . . . . \n" +
        "2 | . . . . . ~ . . . . \n" +
        "3 | . . . . . ~ . ~ . ~ \n" +
        "3 | . . . . . ~ . . □ > \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "4 | . . . . . ~ . . . . \n" +
        "1 | ~ ~ ~ . . ~ . . . . \n" +
        "3 | ~ ^ ~ . . ~ . ~ s ~ \n" +
        "√ | ~ s ~ . . ~ . ~ v ~ \n" +
        "√ | . v . . . ~ . ~ ~ ~ \n" +
        "    1 6 1 1 2 √ 3 1 √ 2"
      );
    });
  });
});

describe.skip("Skipped test", () => {
  describe("#setDeterminedCells()", () => {
    it("should produce expected field", () => {
      let testee = new Game(FieldFactory.parse(
        "1 | . . . . . . . . . . \n" +
        "2 | . . . . . . . . . . \n" +
        "3 | . . . . . . . . . . \n" +
        "3 | . . . . . . . . □ . \n" +
        "0 | . . . . . . . . . . \n" +
        "4 | . . . . . . . . . . \n" +
        "1 | . . . . . . . . . . \n" +
        "3 | . ^ . . . . . . . . \n" +
        "2 | . . . . . . . . v . \n" +
        "1 | . . . . . . . . . . \n" +
        "    1 6 1 1 2 0 3 1 3 2"
      ));

      testee.setDeterminedCells();

      expect(testee.asText()).to.be.equal(
        "1 | . . . . . ~ . ~ ~ . \n" +
        "2 | . . . . . ~ . ~ ~ . \n" +
        "3 | . . . . . ~ ~ ~ ~ ~ \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ < □ > \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "4 | . . . . . ~ . ~ ~ . \n" +
        "1 | ~ ~ ~ . . ~ . ~ ~ ~ \n" +
        "3 | ~ ^ ~ . . ~ . ~ ^ ~ \n" +
        "√ | ~ s ~ ~ ~ ~ ~ ~ v ~ \n" +
        "1 | ~ . ~ . . ~ . ~ ~ ~ \n" +
        "    1 6 1 1 2 √ 3 √ √ 2"
      );
    });
  });

  describe("#setDeterminedCells()", () => {
    it("should produce expected field", () => {
      let testee = new Game(FieldFactory.parse(
        "5 | . < . . . . . . . . \n" +
        "0 | . . . . . . . . . . \n" +
        "0 | . . . . . . . . . . \n" +
        "1 | . . . . . . . . . . \n" +
        "3 | . . . . . . o . . . \n" +
        "2 | . . . . . . . . . . \n" +
        "0 | . . . . . . . . . . \n" +
        "2 | . . . . . . . . . . \n" +
        "1 | v . . . . . . . . . \n" +
        "6 | . . . . < . . . . . \n" +
        "    2 1 3 1 4 1 3 2 0 3"
      ));

      testee.setDeterminedCells();

      expect(testee.asText()).to.be.equal(
        "5 | ~ < s . . ~ . . ~ . \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "1 | ~ ~ . . . ~ ~ ~ ~ . \n" +
        "3 | ~ ~ . . . ~ o ~ ~ . \n" +
        "2 | ~ ~ . . . ~ ~ ~ ~ . \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "2 | ^ ~ . . . ~ . . ~ . \n" +
        "√ | v ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "6 | ~ ~ . ~ < s . . ~ . \n" +
        "    √ √ 3 1 4 √ 3 2 √ 3"
      );
    });
  });

  describe("#setDeterminedCells()", () => {
    it("should produce expected field", () => {
      let testee = new Game(FieldFactory.parse(
        "6 | . . . . . . . . ~ . \n" +
        "0 | . . . . . . . . . . \n" +
        "1 | . . . . . . . . . . \n" +
        "0 | . . . . . . . . . . \n" +
        "2 | . . . . . . . . . . \n" +
        "3 | . . . . . . . . < . \n" +
        "0 | . . . . . . . . . . \n" +
        "2 | . . . . . . . . . . \n" +
        "3 | . ~ . . . . . . . . \n" +
        "3 | . . . . . . . . . . \n" +
        "    3 4 1 4 2 0 1 0 3 2"
      ));

      testee.setDeterminedCells();

      expect(testee.asText()).to.be.equal(
        "6 | . . . . . ~ . ~ ~ . \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "1 | . . . . . ~ . ~ . . \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "2 | . . . . . ~ . ~ ~ ~ \n" +
        "3 | . . . . . ~ . ~ < > \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "2 | . . . . . ~ . ~ . . \n" +
        "3 | . ~ . . . ~ . ~ . . \n" +
        "3 | . . . . . ~ . ~ . . \n" +
        "    3 4 1 4 2 √ 1 √ 3 2"
      );
    });
  });

  describe("#setDeterminedCells()", () => {
    it("should modify field as expected", () => {
      let testee = new Game(FieldFactory.parse(
        "3 | . . . . . . . . . . \n" +
        "0 | . . . . . . . . . . \n" +
        "7 | . . . . . . . ~ . . \n" +
        "0 | . . . . . . . . . . \n" +
        "0 | . . . . . . . . . . \n" +
        "2 | . . . . . . . . . . \n" +
        "1 | . . v . . . . . . . \n" +
        "4 | ^ . . . . . . . . . \n" +
        "1 | . . . . . . . . . . \n" +
        "2 | . . . . . . . o . . \n" +
        "    4 0 4 2 1 4 1 2 1 1"
      ));

      testee.setDeterminedCells();

      expect(testee.asText()).to.be.equal(
        "3 | . ~ . . . . . . . . \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "7 | . ~ . . . . . ~ . . \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "2 | . ~ ^ ~ . . . . . . \n" +
        "√ | ~ ~ v ~ ~ ~ ~ ~ ~ ~ \n" +
        "4 | ^ ~ ~ ~ . . . . . . \n" +
        "√ | s ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "2 | . ~ . . . . ~ o ~ . \n" +
        "    4 √ 4 2 1 4 1 2 1 1"
      );
    });
  });

  describe("#setDeterminedCells()", () => {
    it("should modify field as expected", () => {
      let testee = new Game(FieldFactory.parse(
        "4 | . . . . . . . . . . \n" +
        "0 | . . . . . . . . . . \n" +
        "1 | . . . . . . . . . . \n" +
        "1 | . . . . . . . . . . \n" +
        "2 | . . . . . . . . ^ . \n" +
        "3 | . . . . . . . . . . \n" +
        "3 | o . . . . □ . . . . \n" +
        "1 | . . . . . . . . . . \n" +
        "4 | . . . . . . . . . . \n" +
        "1 | . . o . . . . . . . \n" +
        "    1 0 3 1 0 7 1 1 5 1 "
      ));

      testee.setDeterminedCells();

      expect(testee.asText()).to.be.equal(
        "4 | ~ ~ . . ~ . . . . . \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "1 | ~ ~ . . ~ . . . . . \n" +
        "1 | ~ ~ . . ~ . . ~ ~ ~ \n" +
        "2 | ~ ~ . . ~ . ~ ~ ^ ~ \n" +
        "3 | ~ ~ . . ~ s ~ ~ s ~ \n" +
        "3 | o ~ . . ~ □ ~ ~ . ~ \n" +
        "√ | ~ ~ ~ ~ ~ s ~ ~ ~ ~ \n" +
        "4 | ~ ~ ^ ~ ~ . ~ . . . \n" +
        "√ | ~ ~ v ~ ~ ~ ~ ~ ~ ~ \n" +
        "    √ √ 3 1 √ 7 1 1 5 1"      );
    });
  });

  describe("#placeShip()", () => {
    it("should modify field as expected", () => {
      let testee = new Game(FieldFactory.parse(
        "4 | ~ ~ . . ~ . . . . . \n" +
        "0 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "1 | ~ ~ . . ~ . . . . . \n" +
        "1 | ~ ~ . . ~ . . ~ ~ ~ \n" +
        "2 | ~ ~ . . ~ . ~ ~ ^ ~ \n" +
        "3 | ~ ~ . . ~ s ~ ~ s ~ \n" +
        "3 | o ~ . . ~ □ ~ ~ . ~ \n" +
        "1 | ~ ~ ~ ~ ~ s ~ ~ ~ ~ \n" +
        "4 | ~ ~ ^ ~ ~ . ~ . . . \n" +
        "1 | ~ ~ v ~ ~ ~ ~ ~ ~ ~ \n" +
        "    1 0 3 1 0 7 1 1 5 1 "
      ));

      testee.placeShip(4);

      expect(testee.asText()).to.be.equal(
        "√ | ~ ~ ~ ~ ~ < □ □ > ~ \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "1 | ~ ~ . . ~ . ~ ~ . . \n" +
        "1 | ~ ~ . . ~ . ~ ~ ~ ~ \n" +
        "2 | ~ ~ . . ~ . ~ ~ ^ ~ \n" +
        "3 | ~ ~ . . ~ s ~ ~ s ~ \n" +
        "3 | o ~ . . ~ □ ~ ~ . ~ \n" +
        "√ | ~ ~ ~ ~ ~ s ~ ~ ~ ~ \n" +
        "4 | ~ ~ ^ ~ ~ . ~ ~ . . \n" +
        "√ | ~ ~ v ~ ~ ~ ~ ~ ~ ~ \n" +
        "    √ √ 3 1 √ 7 √ √ 5 1"
      );
    });
  });

  describe("#placeShip()", () => {
    it("should modify field as expected", () => {
      let testee = new Game(FieldFactory.parse(
        "4 | ~ ~ ~ ~ ~ < □ □ > ~ \n" +
        "0 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "1 | ~ ~ . . ~ . ~ ~ . . \n" +
        "1 | ~ ~ . . ~ . ~ ~ ~ ~ \n" +
        "2 | ~ ~ . . ~ . ~ ~ ^ ~ \n" +
        "3 | ~ ~ . . ~ s ~ ~ s ~ \n" +
        "3 | o ~ . . ~ □ ~ ~ . ~ \n" +
        "1 | ~ ~ ~ ~ ~ s ~ ~ ~ ~ \n" +
        "4 | ~ ~ ^ ~ ~ . ~ ~ . . \n" +
        "1 | ~ ~ v ~ ~ ~ ~ ~ ~ ~ \n" +
        "    1 0 3 1 0 7 1 1 5 1 "
      ));

      testee.placeShip(3);

      expect(testee.asText()).to.be.equal(
        "√ | ~ ~ ~ ~ ~ < □ □ > ~ \n" +
        "√ | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ \n" +
        "1 | ~ ~ . . ~ . ~ ~ . . \n" +
        "1 | ~ ~ . . ~ . ~ ~ ~ ~ \n" +
        "2 | ~ ~ . . ~ . ~ ~ ^ ~ \n" +
        "3 | ~ ~ . . ~ s ~ ~ s ~ \n" +
        "3 | o ~ . . ~ □ ~ ~ . ~ \n" +
        "√ | ~ ~ ~ ~ ~ s ~ ~ ~ ~ \n" +
        "4 | ~ ~ ^ ~ ~ . ~ ~ . . \n" +
        "√ | ~ ~ v ~ ~ ~ ~ ~ ~ ~ \n" +
        "    √ √ 3 1 √ 7 √ √ 5 1"
      );
    });
  });
});
