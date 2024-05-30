import { expect } from "chai";
import { FieldFactory } from "../../../src/scripts/models/board/field-factory.js";
import { GameModel } from "../../../src/scripts/models/game-model.js";
import { GameApi } from "../../../src/scripts/controllers/game-api.js";
import { GameDefinition } from "../../../src/scripts/models/board/game-definition.js";

describe("GameApi", () => {
  describe("#changeCell()", () => {
    it("should return false", () => {
      let testee = createTestee(
        "1 | . . . \n" +
        "2 | . . o \n" +
        "0 | . . . \n" +
        "3 | . . . \n" +
        "    3 1 2"
      );

      expect(testee.changeCell(5)).to.be.false;
    });
  });

  describe("#changeCell()", () => {
    it("should turn it to water '~'", () => {
      let testee = createTestee(
        "1 | . . . \n" +
        "2 | . . o \n" +
        "0 | . . . \n" +
        "3 | . . . \n" +
        "    3 1 2"
      );

      testee.changeCell(3);

      expect(testee.getCell(3).value["symbol"]).to.be.equal('~');
    });
  });

  describe("#changeCell() twice", () => {
    it("should turn it to ship 's'", () => {
      let testee = createTestee(
        "1 | . . . \n" +
        "2 | . . o \n" +
        "0 | . . . \n" +
        "3 | . . . \n" +
        "    3 1 2"
      );

      testee.changeCell(3);
      testee.changeCell(3);

      expect(testee.getCell(3).value["symbol"]).to.be.equal('s');
    });
  });

  describe("#changeCell() three times", () => {
    it("should result in empty cell '.'", () => {
      let testee = createTestee(
        "1 | . . . \n" +
        "2 | . . o \n" +
        "0 | . . . \n" +
        "3 | . . . \n" +
        "    3 1 2"
      );

      testee.changeCell(3);
      testee.changeCell(3);
      testee.changeCell(3);

      expect(testee.getCell(3).value["symbol"]).to.be.equal('.');
    });
  });

  describe("#changeCell() with neigbor 'o'", () => {
    it("should turn it to water '~'", () => {
      let testee = createTestee(
        "1 | . . . \n" +
        "2 | . . o \n" +
        "0 | . . . \n" +
        "3 | . . . \n" +
        "    3 1 2"
      );

      testee.changeCell(2);

      expect(testee.getCell(2).value["symbol"]).to.be.equal('~');
    });
  });

  describe("#changeCell() with neigbor 'o' twice", () => {
    it("should result in empty cell '.'", () => {
      let testee = createTestee(
        "1 | . . . \n" +
        "2 | . . o \n" +
        "0 | . . . \n" +
        "3 | . . . \n" +
        "    3 1 2"
      );
      testee.changeCell(2);
      testee.changeCell(2);
      
      expect(testee.getCell(2).value["symbol"]).to.be.equal('.');
    });
  });

  describe("#changeCell() with neigbor '□'", () => {
    it("should turn it to water '~'", () => {
      let testee = createTestee(
        "1 | . . . \n" +
        "1 | . . □ \n" +
        "2 | . . . \n" +
        "1 | . . . \n" +
        "    2 0 3"
      );

      testee.changeCell(2);

      expect(testee.getCell(2).value["symbol"]).to.be.equal('~');
    });
  });

  describe("#changeCell() with neigbor '□' twice", () => {
    it("should turn it to north '^'", () => {
      let testee = createTestee(
        "1 | . . . \n" +
        "1 | . . □ \n" +
        "2 | . . . \n" +
        "1 | . . . \n" +
        "    2 0 3"
      );

      testee.changeCell(2);
      testee.changeCell(2);
      
      expect(testee.getCell(2).value["symbol"]).to.be.equal('^');
    });
  });

  describe("#changeCell() with neigbor '□' three times", () => {
    it("should result in empty cell '.'", () => {
      let testee = createTestee(
        "1 | . . . \n" +
        "1 | . . □ \n" +
        "2 | . . . \n" +
        "1 | . . . \n" +
        "    2 0 3"
      );

      testee.changeCell(2);
      testee.changeCell(2);
      testee.changeCell(2);

      expect(testee.getCell(2).value["symbol"]).to.be.equal('.');
    });
  });
});

function createTestee(text: string) {
  const config = GameDefinition.extract(FieldFactory.parse(text));
  return new GameApi(new GameModel(config));
}
