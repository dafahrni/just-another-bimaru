import { FieldFactory } from "../../js/models/board/field-factory.js";
import { GameModel } from "../../js/models/game-model.js";
import { expect } from "chai";

describe("GameModel", () => {
  
  describe("#rowCount()", () => {
    it("should return expected row labels", () => {
      const cols = 3;
      const rows = 4;
      let testee = new GameModel(FieldFactory.from(cols, rows));

      expect(testee.rows).to.be.equal(rows);
    });
  });
});
