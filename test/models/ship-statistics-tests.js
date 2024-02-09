import { FieldFactory } from "../../js/models/field-factory.js";
import { Game } from "../../js/models/game.js";
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
      let game = new Game(FieldFactory.parse(fieldText));
      game.setDeterminedCells();
      let testee = game.getStatistics();

      // when + then
      expect(testee.getAmount(1)).to.be.equal(1);
      expect(testee.getAmount(2)).to.be.equal(0);
      expect(testee.getAmount(3)).to.be.equal(1);
      expect(testee.getAmount(4)).to.be.equal(0);
    });
  });
  
  describe("#getAmount()", () => {
    const testCases = [
      { shipSize: 0, expectedError: Error },
      { shipSize: 5, expectedError: Error },
    ];
    testCases.forEach((tc) => {
      it(`should throw error when invoked with ${tc.shipSize}`, () => {
        // given
        let game = new Game(FieldFactory.parse(fieldText));
        game.setDeterminedCells();
        let testee = game.getStatistics();        

        // when + then
        expect(() => testee.getAmount(tc.shipSize)).to.throw(
          tc.expectedException
        );
      });
    });
  });
});
