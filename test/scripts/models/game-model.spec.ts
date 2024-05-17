import { expect } from "chai";
import { FieldFactory } from "../../../src/scripts/models/board/field-factory.js";
import { ShipSet } from "../../../src/scripts/models/board/parts/ship-set.js";
import { GameModel } from "../../../src/scripts/models/game-model.js";

describe("GameModel", () => {
  describe("#rows", () => {
    it("should return expected value", () => {
      const cols = 3;
      const rows = 4;
      let testee = new GameModel(FieldFactory.from(cols, rows));

      expect(testee.rows).to.be.equal(rows);
    });
  });

  describe("#checkForWinner()", () => {
    it("should return true", () => {
      let testee = new GameModel(FieldFactory.parse(
        "0 | ~ ~ ~ \n" +
        "3 | < □ > \n" +
        "0 | ~ ~ ~ \n" +
        "1 | ~ o ~ \n" +
        "    1 2 1"
      ));
      testee.initStatistics(ShipSet.parse("1|1,2|0,3|1,4|0"));
      testee.updateStatistics();

      expect(testee.checkForWinner()).to.be.true;
    });
  });
});
