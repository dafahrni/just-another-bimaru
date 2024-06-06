import { expect } from "chai";
import { FieldFactory } from "../../../src/scripts/models/board/field-factory.js";
import { ShipSet } from "../../../src/scripts/models/parts/ship-set.js";
import { GameModel } from "../../../src/scripts/models/game-model.js";
import { GameDefinition } from "../../../src/scripts/models/board/game-definition.js";

describe("GameModel", () => {
  describe("#rows", () => {
    it("should return expected value", () => {
      const cols = 3;
      const rows = 4;
      const config = GameDefinition.extract(FieldFactory.from(cols, rows));
      let testee = new GameModel(config);

      expect(testee.rows).to.be.equal(rows);
    });
  });

  describe("#checkForWinner()", () => {
    it("should return true", () => {
      let testee = createTestee(
        "0 | ~ ~ ~ \n" +
        "3 | < □ > \n" +
        "0 | ~ ~ ~ \n" +
        "1 | ~ o ~ \n" +
        "    1 2 1"
      );
      testee.initStatistics(ShipSet.parse("1|1,2|0,3|1,4|0"));
      testee.updateStatistics();

      expect(testee.checkForWinner()).to.be.true;
    });
  });
});

function createTestee(text: string) {
  const config = GameDefinition.extract(FieldFactory.parse(text));
  return new GameModel(config);
}
